"""Valida os comandos entregues no ZIP, sem criar/remover containers."""
import json
import os
from pathlib import Path
import re
import shlex
import subprocess
import tempfile
import zipfile

ROOT = Path(__file__).resolve().parents[1]
with tempfile.TemporaryDirectory(prefix='oficina-ide-comandos-') as directory:
    work = Path(directory)
    with zipfile.ZipFile(ROOT / 'downloads/compose-ide.zip') as archive:
        archive.extractall(work)
    instructions = (work / 'README-IDE.md').read_text()
    blocks = re.findall(r'```bash\n(.*?)\n```', instructions, re.S)
    for number in [0, 1, 3]:
        command = blocks[number].replace('sudo docker rm -f ide\n', '').replace('sudo -E docker ', 'docker ')
        command = command.replace('cd "$HOME/oficina-docker"', 'cd ' + shlex.quote(directory))
        command = re.sub(r' up -d(?: --force-recreate)?', ' config --format json', command)
        model = json.loads(subprocess.check_output(['bash', '-c', command], text=True))
        service = model['services']['ide']
        assert service['user'] == f'{os.getuid()}:{os.getgid()}'
        assert f'uid={os.getuid()},gid={os.getgid()},mode=0700' in service['tmpfs'][0]
        mounts = {v['target']: v['source'] for v in service['volumes']}
        if number in [0, 1]:
            expected = os.environ.get('XAUTHORITY') or str(Path.home() / '.Xauthority')
            assert mounts['/tmp/oficina.xauth'] == expected
            assert service['hostname'] == subprocess.check_output(['hostname'], text=True).strip()
        assert ('/host-home' in mounts) == (number == 1)
        if number == 1:
            assert mounts['/host-home'] == str(Path.home())
        if number == 3:
            assert mounts['/tmp/runtime-aluno/wayland-0'].endswith(os.environ.get('WAYLAND_DISPLAY', ''))
    env = dict(os.environ)
    env.pop('XAUTHORITY', None)
    env.update(LOCAL_UID='12345', LOCAL_GID='23456')
    model = json.loads(subprocess.check_output(['docker', 'compose', '-f', str(work/'compose.ide.yaml'), 'config', '--format', 'json'], env=env, text=True))
    service = model['services']['ide']
    assert service['user'] == '12345:23456'
    assert service['volumes'][1]['source'] == str(Path.home()/'.Xauthority')
    assert 'uid=12345,gid=23456,mode=0700' in service['tmpfs'][0]
    for file in work.glob('*.yaml'):
        assert ':?' not in file.read_text(), file
print('ZIP: comandos completos X11, HOME e Wayland; fallback de autorização e UIDs distintos passaram.')
