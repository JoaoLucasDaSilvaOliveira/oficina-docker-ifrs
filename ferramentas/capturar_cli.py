#!/usr/bin/env python3
"""Capture documentação da CLI local; executa apenas --help e versões.

Sem downloads, instalação de plugins ou operações sobre imagens/containers.
Execute no repositório: python ferramentas/capturar_cli.py
"""

from collections import deque
from datetime import datetime, timezone
import argparse
import json
import os
from pathlib import Path
import re
import subprocess


ROOT = Path(__file__).resolve().parents[1]
# A CLI esconde grupos Swarm no help raiz quando o daemon não é manager.
# Só entram na referência se o --help realmente existir nesta instalação.
CORE_GROUPS = ("config", "node", "secret", "service", "stack", "swarm", "checkpoint", "help")
# Subcomandos de Swarm também variam na listagem conforme o papel do daemon.
SWARM_COMMANDS = ("ca", "init", "inspect", "join", "join-token", "leave", "unlock", "unlock-key", "update")
COMMAND = re.compile(r"^  ([a-z][a-z0-9-]*)(?:\*)?\s+(.+?)\s*$")
SECTION = re.compile(r"^[A-Za-z][A-Za-z -]*:\s*$")
FLAG = re.compile(r"(?<![\w-])--?[A-Za-z0-9][A-Za-z0-9-]*")


def run(args):
    env = dict(os.environ, LC_ALL="C", NO_COLOR="1", COLUMNS="100")
    result = subprocess.run(args, capture_output=True, text=True, timeout=20, env=env)
    return result.returncode, result.stdout + result.stderr


def children(help_text):
    active = False
    found = []
    for line in help_text.splitlines():
        if SECTION.fullmatch(line):
            active = line.endswith("Commands:")
            continue
        if active:
            match = COMMAND.match(line)
            if match:
                found.append(match.groups())
            elif line and not line[0].isspace():
                active = False
    return found


def aliases(help_text):
    active = False
    found = []
    for line in help_text.splitlines():
        if SECTION.fullmatch(line):
            active = line == "Aliases:"
            continue
        if active and line.startswith("  "):
            for name in line.strip().split(","):
                name = name.strip()
                if re.fullmatch(r"docker(?: [a-z][a-z0-9-]*)+", name):
                    found.append(name.split())
        elif active and line.strip():
            active = False
    return found


def flags(help_text):
    found = {"--help"}
    active = False
    for line in help_text.splitlines():
        if SECTION.fullmatch(line):
            active = line.endswith("Options:") or line == "Flags:"
            continue
        if active and line.lstrip().startswith("-"):
            declaration = re.split(r"\s{2,}", line.strip(), maxsplit=1)[0]
            found.update(FLAG.findall(declaration))
    return sorted(found)


def description(help_text):
    """Primeiro parágrafo depois de Usage, sem confundir continuação de Usage."""
    match = re.search(r"Usage:[\s\S]*?\n\s*\n([^\n]+)", help_text)
    return match.group(1).strip() if match else "Ajuda da CLI Docker instalada."


def sanitize(text):
    home = str(Path.home())
    return text.replace(home, "$HOME") if home != "/" else text


def capture():
    queue = deque([(["docker"], "CLI Docker")])
    queue.extend((["docker", name], "") for name in CORE_GROUPS)
    queue.extend((["docker", "swarm", name], "") for name in SWARM_COMMANDS)
    seen = set()
    records = []
    skipped = []
    while queue:
        args, listed_description = queue.popleft()
        command = " ".join(args)
        if command in seen:
            continue
        seen.add(command)
        code, raw_help = run([*args, "--help"])
        # Plugins ausentes podem retornar a ajuda genérica da raiz com exit 0.
        root_fallback = len(args) > 1 and re.search(r"Usage:\s+docker \[OPTIONS\] COMMAND", raw_help)
        if code or "Usage:" not in raw_help or root_fallback:
            skipped.append(command)
            continue
        help_text = sanitize(raw_help.strip()) + "\n"
        records.append({
            "command": command,
            "description": listed_description or description(help_text),
            "help": help_text,
            "flags": flags(help_text),
        })
        queue.extend(([*args, child], desc) for child, desc in children(help_text))
        queue.extend((alias, "") for alias in aliases(help_text))
    records.sort(key=lambda record: (len(record["command"].split()), record["command"]))
    versions = {}
    for key, args in (
        ("docker", ["docker", "--version"]),
        ("compose", ["docker", "compose", "version"]),
        ("buildx", ["docker", "buildx", "version"]),
    ):
        code, output = run(args)
        if not code:
            versions[key] = output.strip()
    return records, versions, skipped


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=ROOT / "apresentacao/docker-reference.js")
    args = parser.parse_args()
    records, versions, skipped = capture()
    translations = json.loads((ROOT / 'ferramentas/descricoes-cli.pt-BR.json').read_text())
    missing = sorted({r['description'] for r in records} - translations.keys())
    if missing:
        raise ValueError('Traduza as novas descrições antes de publicar: ' + repr(missing))
    for record in records:
        record['descriptionOriginal'] = record['description']
        record['description'] = translations[record['description']]
    info = {
        "capturedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "versions": versions,
        "count": len(records),
        "scope": "Comandos e aliases disponíveis nesta CLI local, incluindo Docker Engine, Compose e Buildx instalados. Plugins não instalados e comandos experimentais indisponíveis não estão incluídos.",
        "unavailable": skipped,
    }
    version_label = " · ".join(versions.values())
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        "// Gerado por ferramentas/capturar_cli.py: somente help da CLI local.\n"
        + "window.OFICINA_DOCKER_VERSION = " + json.dumps(version_label, ensure_ascii=False) + ";\n"
        + "window.OFICINA_DOCKER_REFERENCE_INFO = " + json.dumps(info, ensure_ascii=False, indent=2) + ";\n"
        + "window.OFICINA_DOCKER_REFERENCE = " + json.dumps(records, ensure_ascii=False, indent=2) + ";\n"
    )
    roots = sum(len(record["command"].split()) == 2 for record in records)
    print(f"{len(records)} comandos: raiz + {roots} comandos/grupos diretos + {len(records)-roots-1} subcomandos.")
    print(json.dumps(info, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
