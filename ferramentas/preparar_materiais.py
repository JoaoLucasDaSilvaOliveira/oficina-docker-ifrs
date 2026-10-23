#!/usr/bin/env python3
"""Autoria: gera guias, downloads por etapa e um site estático permitido.

Não faz parte dos comandos que os participantes executam na oficina.
Usa apenas a biblioteca padrão do Python.
"""
from pathlib import Path
import argparse
import json
import unicodedata
import shutil
import html
import re
import zipfile

ROOT = Path(__file__).resolve().parents[1]

def inline(text):
    text = html.escape(text)
    text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)
    text = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', text)
    def link(m):
        url=html.unescape(m.group(2))
        if not re.match(r'^(https?://|[A-Za-z0-9_./#-])',url):return m.group(1)
        if url.endswith('.md'):url=url[:-3]+'.html'
        return '<a href="'+html.escape(url,quote=True)+'">'+m.group(1)+'</a>'
    return re.sub(r'\[([^\]]+)\]\(([^)]+)\)',link,text)


def heading_id(title, used):
    title = re.sub(r'^\d+\.\s+', '', title)
    plain = unicodedata.normalize('NFKD', title).encode('ascii', 'ignore').decode('ascii')
    base = re.sub(r'[^a-z0-9]+', '-', plain.lower()).strip('-') or 'secao'
    used[base] = used.get(base, 0) + 1
    return base if used[base] == 1 else f'{base}-{used[base]}'


def guide_headings(source):
    used = {}
    fenced = False
    for line in source.splitlines():
        if line.startswith('```'):
            fenced = not fenced
            continue
        match = re.match(r'^(#{1,6})\s+(.+)', line) if not fenced else None
        if match:
            yield {'id': heading_id(match[2], used), 'title': match[2], 'level': len(match[1])}


def markdown(source):
    lines=source.splitlines();out=[];paragraph=[];items=[];kind=None;i=0;used_headings={}
    def flush():
        nonlocal paragraph,items,kind
        if paragraph:out.append('<p>'+inline(' '.join(paragraph))+'</p>');paragraph=[]
        if items:out.append('<'+kind+'>'+''.join('<li>'+inline(x)+'</li>' for x in items)+'</'+kind+'>');items=[];kind=None
    while i<len(lines):
        line=lines[i]
        if line.startswith('```'):
            flush();language=line[3:].strip();i+=1;code=[]
            while i<len(lines) and not lines[i].startswith('```'):code.append(lines[i]);i+=1
            out.append('<div class="guide-code"><div class="code-bar"><span>'+html.escape(language or 'texto')+'</span><button type="button" aria-label="Copiar este bloco">Copiar</button></div><pre><code>'+html.escape('\n'.join(code))+'</code></pre></div>')
        elif line.startswith('#'):
            flush();match=re.match(r'^(#{1,6})\s+(.+)',line)
            if match:level=len(match[1]);anchor=heading_id(match[2],used_headings);out.append(f'<h{level} id="{anchor}">'+inline(match[2])+f'</h{level}>')
        elif line.startswith('|') and i+1<len(lines) and re.match(r'^\|[\s:|\-]+\|?$',lines[i+1]):
            flush();heads=[x.strip() for x in line.strip().strip('|').split('|')];i+=2;rows=[]
            while i<len(lines) and lines[i].startswith('|'):
                rows.append([x.strip() for x in lines[i].strip().strip('|').split('|')]);i+=1
            out.append('<div class="table-scroll"><table><thead><tr>'+''.join('<th>'+inline(x)+'</th>' for x in heads)+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+inline(x)+'</td>' for x in row)+'</tr>' for row in rows)+'</tbody></table></div>');continue
        elif re.match(r'^(- |\d+\. )',line):
            newkind='ul' if line.startswith('- ') else 'ol'
            if kind and kind!=newkind:flush()
            if paragraph:flush()
            kind=newkind;items.append(re.sub(r'^(- |\d+\. )','',line))
        elif not line.strip():flush()
        else:
            if items:flush()
            paragraph.append(line)
        i+=1
    flush();return '\n'.join(out)

STYLE='''@font-face{font-family:Barlow;src:url(../apresentacao/assets/fonts/barlow-regular.ttf)}@font-face{font-family:Barlow;src:url(../apresentacao/assets/fonts/barlow-semibold.ttf);font-weight:600}*{box-sizing:border-box}body{margin:0;background:#f0f5fa;color:#102b43;font:18px/1.65 Barlow,system-ui,sans-serif}header{border-bottom:1px solid #d6e2ec;padding:18px max(25px,5vw);display:flex;justify-content:space-between;gap:20px;background:white}header a{font-size:14px;text-decoration:none}main{max-width:930px;margin:45px auto;padding:0 25px 70px}h1{font-size:44px;line-height:1.1;letter-spacing:-1px;margin:30px 0}h1,h2,h3,h4,h5,h6{scroll-margin-top:30px}h2{font-size:27px;line-height:1.3;margin:45px 0 18px;padding-top:20px;border-top:1px solid #d6e2ec}h3{font-size:23px}a{color:#175fe6}p,li{overflow-wrap:anywhere}li{margin:10px 0}code{font-size:.83em;font-family:ui-monospace,monospace;background:#e1eaf3;padding:2px 5px;border-radius:3px}pre{margin:0;padding:22px;overflow:auto;font:14px/1.8 ui-monospace,monospace}pre code{font:inherit;background:none;padding:0;color:inherit}.guide-code{margin:25px 0;background:#102b43;color:#d7e9fc;border-radius:6px;overflow:hidden}.code-bar{padding:7px 15px;border-bottom:1px solid #29465f;display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#b8d4eb}.code-bar button{background:transparent;color:#d7e9fc;border:0;min-height:40px;padding:8px 12px;cursor:pointer;border-radius:4px}.code-bar button:hover{background:#29465f}button:focus-visible,a:focus-visible{outline:3px solid #d15c26;outline-offset:3px}.table-scroll{overflow:auto}table{width:100%;border-collapse:collapse;font-size:16px;margin:25px 0}th,td{text-align:left;vertical-align:top;padding:14px 15px 14px 0;border-bottom:1px solid #d1dfea}th{color:#175fe6}footer{border-top:1px solid #d6e2ec;padding-top:22px;font-size:14px;color:#526a7b}@media(max-width:600px){body{font-size:17px}h1{font-size:36px}pre{font-size:12px;padding:16px}header{flex-direction:column;gap:3px}main{margin-top:25px}}@media print{body{background:white;font-size:11pt}header,.code-bar button{display:none}main{max-width:none;margin:0;padding:0}h1{font-size:25pt}h2{font-size:18pt;break-after:avoid}pre{white-space:pre-wrap;font-size:9pt}.guide-code{break-inside:avoid}table{font-size:10pt}a{color:inherit}}'''
SCRIPT='''document.querySelectorAll('.code-bar button').forEach(button=>button.addEventListener('click',async()=>{const text=button.closest('.guide-code').querySelector('code').textContent;try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(text);else{const input=document.createElement('textarea');input.value=text;document.body.append(input);input.select();if(!document.execCommand('copy'))throw Error();input.remove();}button.textContent='Copiado';setTimeout(()=>button.textContent='Copiar',1800);}catch{button.textContent='Selecione o texto';}}));'''

SOURCE_IGNORES = {'.git', 'node_modules', 'dist', '.runtime', '.vscode', '__pycache__'}
WEB_EXTENSIONS = {'.html', '.css', '.js', '.json', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.ico', '.woff', '.woff2', '.ttf', '.txt', '.mp4', '.webm'}
COMPOSE_IDE = ['compose.ide.yaml', 'compose.ide.bind.yaml', 'compose.ide.wayland.yaml']
COMPOSE_MURAL = ['compose.app.yaml', 'compose.rede.yaml', 'compose.hub.yaml']


def source_files(folder):
    """Lista apenas arquivos do exemplo; nunca inclui dependências ou links."""
    for path in sorted(folder.rglob('*')):
        parts = path.relative_to(folder).parts
        if path.is_symlink() or any(part in SOURCE_IGNORES for part in parts):
            continue
        if any(part.startswith('.') and part != '.dockerignore' for part in parts):
            continue
        if path.is_file():
            yield path


def package_sources(folder):
    return [(path, str(path.relative_to(ROOT / 'exemplos'))) for path in source_files(folder)]


def write_zip(destination, files):
    with zipfile.ZipFile(destination, 'w', zipfile.ZIP_DEFLATED) as archive:
        for path, name in files:
            info = zipfile.ZipInfo(name, date_time=(2026, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o100644 << 16
            archive.writestr(info, path.read_bytes())


def build_guides():
    index = []
    for path in sorted((ROOT / 'docs').glob('*.md')):
        text = path.read_text(encoding='utf-8')
        title = next(line[2:] for line in text.splitlines() if line.startswith('# '))
        index.append({'id': path.stem, 'title': title, 'href': '../docs/' + path.with_suffix('.html').name, 'sections': [section for section in guide_headings(text) if section['level'] > 1]})
        document = '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + html.escape(title) + ' · Oficina Docker</title><style>' + STYLE + '</style><link rel="stylesheet" href="../apresentacao/flag-tooltips.css"><script defer src="../apresentacao/compose-reference.js"></script><script defer src="../apresentacao/docker-reference.js"></script><script defer src="../apresentacao/flag-tooltips.js"></script><script defer src="../apresentacao/guide-flags.js"></script></head><body><header><a href="../apresentacao/">← Voltar aos slides</a><a href="' + path.name + '">Versão Markdown</a></header><main>' + markdown(text) + '<footer>Oficina Docker · Material de acompanhamento</footer></main><script>' + SCRIPT + '</script></body></html>'
        path.with_suffix('.html').write_text(document, encoding='utf-8')
    (ROOT / 'apresentacao/guide-index.js').write_text('window.OFICINA_GUIDE_INDEX = ' + json.dumps(index, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')


def build_downloads():
    packages = {
        'go-soma.zip': package_sources(ROOT / 'exemplos/go-soma'),
        'go-receitas.zip': [(ROOT / 'exemplos/go-soma' / name, 'go-soma/' + name) for name in ['Dockerfile', 'Dockerfile.simples', '.dockerignore']],
        'vue-vite.zip': package_sources(ROOT / 'exemplos/vue-vite'),
        'compose-ide.zip': [(ROOT / 'compose' / name, name) for name in [*COMPOSE_IDE, 'README-IDE.md']],
        'compose-mural.zip': [(ROOT / 'compose' / name, name) for name in COMPOSE_MURAL],
        'receitas-dockerfile.zip': [(ROOT / 'exemplos/ide/Dockerfile', 'receitas/ide.Dockerfile')],
    }
    required = [ROOT / 'exemplos/go-soma/main.go', ROOT / 'exemplos/go-soma/Dockerfile', ROOT / 'exemplos/go-soma/Dockerfile.simples', ROOT / 'exemplos/vue-vite/package.json', ROOT / 'exemplos/vue-vite/package-lock.json', ROOT / 'exemplos/vue-vite/Dockerfile']
    missing = [str(path.relative_to(ROOT)) for path in required if not path.is_file()]
    if missing:
        raise SystemExit('Fontes necessárias ausentes: ' + ', '.join(missing))
    destination = ROOT / 'downloads'
    destination.mkdir(exist_ok=True)
    for name, files in packages.items():
        write_zip(destination / name, files)
    shutil.copyfile(ROOT / 'exemplos/go-soma/main.go', destination / 'main.go')
    for name in COMPOSE_IDE + COMPOSE_MURAL:
        shutil.copyfile(ROOT / 'compose' / name, destination / name)
    # Remover somente produtos públicos antigos conhecidos; não limpar o diretório todo.
    for name in ['compose-slides.zip', 'compose-oficina.zip', 'mural-go.zip', 'oficina-docker.zip', 'compose.yaml']:
        (destination / name).unlink(missing_ok=True)
    return {'main.go', *packages, *COMPOSE_IDE, *COMPOSE_MURAL}



DOWNLOAD_STEPS = {
    'go-source': ('main.go', 'Salvar em HOME/oficina-docker/go-soma/main.go.'),
    'go-project': ('go-receitas.zip', 'Extrair em HOME/oficina-docker; acrescenta somente as receitas em go-soma/ e preserva seu main.go.'),
    'go-complete': ('go-soma.zip', 'Recuperação opcional: contém o projeto completo. Pode substituir seu main.go; preserve suas alterações antes de extrair.'),
    'vue': ('vue-vite.zip', 'Extrair em HOME/oficina-docker; contém a pasta vue-vite/.'),
    'compose-ide': ('compose-ide.zip', 'Extrair os três YAMLs em HOME/oficina-docker.'),
    'compose-mural': ('compose-mural.zip', 'Extrair os três YAMLs em HOME/oficina-docker.'),
    'receitas': ('receitas-dockerfile.zip', 'Extrair em HOME/oficina-docker; contém receitas/ide.Dockerfile para leitura.'),
}


def command_block(command):
    text = command.get('text', '')
    context = command.get('context', 'Terminal do computador · Bash')
    return '<p class="command-context">' + html.escape(context) + '</p><div class="guide-code"><div class="code-bar"><span>' + html.escape(context) + '</span><button type="button" aria-label="Copiar este bloco">Copiar</button></div><pre><code>' + html.escape(text) + '</code></pre></div>'


def build_exercises():
    source = (ROOT / 'apresentacao/slides.js').read_text(encoding='utf-8')
    match = re.fullmatch(r'(?:\s*//[^\n]*\n)*\s*window\.OFICINA_SLIDES\s*=\s*(\[.*\]);\s*', source, re.S)
    if not match:
        raise SystemExit('Formato esperado: window.OFICINA_SLIDES = array JSON;')
    slides = json.loads(match[1])
    destination = ROOT / 'docs/exercicios'
    destination.mkdir(exist_ok=True)
    index = []
    for slide in slides:
        if not slide.get('commands'):
            continue
        identifier = slide['id']
        if not re.fullmatch(r'[a-z0-9-]+', identifier):
            raise SystemExit('Identificador de slide inválido: ' + identifier)
        title = slide['title']
        content = '<h1 id="exercicio">' + html.escape(title) + '</h1><p>' + html.escape(slide.get('lead', '')) + '</p>'
        # Somente conteúdo do aluno. Notas do apresentador nunca entram nestas páginas.
        body = slide.get('body', [])
        if isinstance(body, str):
            body = [body]
        for paragraph in body:
            content += '<p>' + inline(paragraph) + '</p>'
        if slide.get('downloads'):
            content += '<h2 id="arquivos">Arquivos desta etapa</h2><ul>'
            for item in slide['downloads']:
                filename, guidance = DOWNLOAD_STEPS[item]
                content += '<li><a download href="../../downloads/' + filename + '">' + filename + '</a> — ' + html.escape(guidance) + '</li>'
            content += '</ul>'
        used = {}
        for number, command in enumerate(slide['commands'], 1):
            label = command.get('label', 'Comandos do exercício')
            anchor = heading_id(label, used)
            content += '<section aria-labelledby="' + anchor + '"><h2 id="' + anchor + '">' + str(number) + '. ' + html.escape(label) + '</h2>' + command_block(command) + '</section>'
        visual = slide.get('visual', {})
        if visual.get('kind') == 'output' and visual.get('lines'):
            content += '<h2 id="resultado">Resultado esperado</h2><pre><code>' + html.escape('\n'.join(visual['lines'])) + '</code></pre>'
        guide = slide.get('guide')
        if guide:
            name, _, anchor = guide.partition('#')
            name = name.removesuffix('.html')
            if not re.fullmatch(r'[a-z0-9-]+', name):
                raise SystemExit('Guia inválido: ' + guide)
            content += '<p><a href="../' + name + '.html' + ('#' + html.escape(anchor, quote=True) if anchor else '') + '">Consultar o guia completo deste assunto</a></p>'
        if slide.get('source', '').startswith('https://'):
            content += '<p><a href="' + html.escape(slide['source'], quote=True) + '">Documentação de referência</a></p>'
        style = STYLE.replace('../apresentacao/', '../../apresentacao/')
        document = '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + html.escape(title) + ' · Exercício Docker</title><style>' + style + '</style><link rel="stylesheet" href="../../apresentacao/flag-tooltips.css"><script defer src="../../apresentacao/compose-reference.js"></script><script defer src="../../apresentacao/docker-reference.js"></script><script defer src="../../apresentacao/flag-tooltips.js"></script><script defer src="../../apresentacao/guide-flags.js"></script></head><body><header><a href="../../apresentacao/#/' + identifier + '">← Voltar ao slide</a><span>' + html.escape(slide.get('chapter', '')) + '</span></header><main>' + content + '</main><script>' + SCRIPT + '</script></body></html>'
        (destination / (identifier + '.html')).write_text(document, encoding='utf-8')
        index.append({'id': identifier, 'title': title, 'chapter': slide.get('chapter', ''), 'href': '../docs/exercicios/' + identifier + '.html'})
    keep = {entry['id'] + '.html' for entry in index}
    for path in destination.glob('*.html'):
        if path.name not in keep:
            path.unlink()
    with (ROOT / 'apresentacao/guide-index.js').open('a', encoding='utf-8') as output:
        output.write('window.OFICINA_EXERCISE_INDEX = ' + json.dumps(index, ensure_ascii=False, indent=2) + ';\n')
    print(str(len(index)) + ' páginas de exercício geradas a partir dos comandos dos slides.')


def build_site(destination, downloads):
    destination = destination.resolve()
    if destination == ROOT or ROOT in destination.parents and destination.name in {'apresentacao', 'docs', 'downloads', 'exemplos', 'ferramentas'}:
        raise SystemExit('Escolha uma pasta separada para --site-dir.')
    marker = destination / '.oficina-site'
    if destination.exists() and any(destination.iterdir()) and not marker.is_file():
        raise SystemExit('Destino não está vazio nem é um site gerado por esta ferramenta: ' + str(destination))
    if marker.is_file():
        shutil.rmtree(destination)
    destination.mkdir(parents=True, exist_ok=True)
    marker.write_text('Gerado por ferramentas/preparar_materiais.py\n', encoding='utf-8')
    shutil.copyfile(ROOT / 'index.html', destination / 'index.html')
    (destination / '.nojekyll').touch()
    # Allowlist: somente o frontend estático, guias públicos e downloads conhecidos.
    for folder, extensions in [('apresentacao', WEB_EXTENSIONS), ('docs', {'.html', '.md', '.txt'})]:
        for path in sorted((ROOT / folder).rglob('*')):
            relative = path.relative_to(ROOT)
            if folder == 'docs' and path.relative_to(ROOT / folder).parts[0] == 'autoria':
                continue
            if path.is_symlink() or any(part.startswith('.') or part in SOURCE_IGNORES for part in relative.parts):
                continue
            if path.is_file() and path.suffix.lower() in extensions:
                target = destination / relative
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(path, target)
    for name in sorted(downloads):
        target = destination / 'downloads' / name
        target.parent.mkdir(exist_ok=True)
        shutil.copyfile(ROOT / 'downloads' / name, target)
    marker.unlink()
    # Marcador seguro para permitir regeneração; não é servido pelo Pages como conteúdo.
    marker.touch()
    print('Site estático gerado em ' + str(destination))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--site-dir', type=Path, help='Gera uma pasta estática para preview ou GitHub Pages, sem publicar.')
    args = parser.parse_args()
    downloads = build_downloads()
    build_guides()
    build_exercises()
    if args.site_dir:
        build_site(args.site_dir, downloads)
    print('Guias HTML, ZIPs por etapa e main.go gerados. Nenhuma publicação executada.')


if __name__ == '__main__':
    main()
