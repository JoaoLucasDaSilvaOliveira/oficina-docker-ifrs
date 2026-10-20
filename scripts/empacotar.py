#!/usr/bin/env python3
"""Gera guias HTML e o ZIP de distribuição, sem bibliotecas externas."""
from pathlib import Path
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

def markdown(source):
    lines=source.splitlines();out=[];paragraph=[];items=[];kind=None;i=0
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
            if match:level=len(match[1]);out.append(f'<h{level}>'+inline(match[2])+f'</h{level}>')
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

STYLE='''@font-face{font-family:Barlow;src:url(../apresentacao/assets/fonts/barlow-regular.ttf)}@font-face{font-family:Barlow;src:url(../apresentacao/assets/fonts/barlow-semibold.ttf);font-weight:600}*{box-sizing:border-box}body{margin:0;background:#f0f5fa;color:#102b43;font:18px/1.65 Barlow,system-ui,sans-serif}header{border-bottom:1px solid #d6e2ec;padding:18px max(25px,5vw);display:flex;justify-content:space-between;gap:20px;background:white}header a{font-size:14px;text-decoration:none}main{max-width:930px;margin:45px auto;padding:0 25px 70px}h1{font-size:44px;line-height:1.1;letter-spacing:-1px;margin:30px 0}h2{font-size:27px;line-height:1.3;margin:45px 0 18px;padding-top:20px;border-top:1px solid #d6e2ec}h3{font-size:23px}a{color:#175fe6}p,li{overflow-wrap:anywhere}li{margin:10px 0}code{font-size:.83em;font-family:ui-monospace,monospace;background:#e1eaf3;padding:2px 5px;border-radius:3px}pre{margin:0;padding:22px;overflow:auto;font:14px/1.8 ui-monospace,monospace}pre code{font:inherit;background:none;padding:0;color:inherit}.guide-code{margin:25px 0;background:#102b43;color:#d7e9fc;border-radius:6px;overflow:hidden}.code-bar{padding:7px 15px;border-bottom:1px solid #29465f;display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#b8d4eb}.code-bar button{background:transparent;color:#d7e9fc;border:0;min-height:40px;padding:8px 12px;cursor:pointer;border-radius:4px}.code-bar button:hover{background:#29465f}button:focus-visible,a:focus-visible{outline:3px solid #d15c26;outline-offset:3px}.table-scroll{overflow:auto}table{width:100%;border-collapse:collapse;font-size:16px;margin:25px 0}th,td{text-align:left;vertical-align:top;padding:14px 15px 14px 0;border-bottom:1px solid #d1dfea}th{color:#175fe6}footer{border-top:1px solid #d6e2ec;padding-top:22px;font-size:14px;color:#526a7b}@media(max-width:600px){body{font-size:17px}h1{font-size:36px}pre{font-size:12px;padding:16px}header{flex-direction:column;gap:3px}main{margin-top:25px}}@media print{body{background:white;font-size:11pt}header,.code-bar button{display:none}main{max-width:none;margin:0;padding:0}h1{font-size:25pt}h2{font-size:18pt;break-after:avoid}pre{white-space:pre-wrap;font-size:9pt}.guide-code{break-inside:avoid}table{font-size:10pt}a{color:inherit}}'''
SCRIPT='''document.querySelectorAll('.code-bar button').forEach(button=>button.addEventListener('click',async()=>{const text=button.closest('.guide-code').querySelector('code').textContent;try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(text);else{const input=document.createElement('textarea');input.value=text;document.body.append(input);input.select();if(!document.execCommand('copy'))throw Error();input.remove();}button.textContent='Copiado';setTimeout(()=>button.textContent='Copiar',1800);}catch{button.textContent='Selecione o texto';}}));'''

def build():
    for path in sorted((ROOT/'docs').glob('*.md')):
        title=next(line[2:] for line in path.read_text().splitlines() if line.startswith('# '))
        document='<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+html.escape(title)+' · Oficina Docker</title><style>'+STYLE+'</style></head><body><header><a href="../apresentacao/">← Voltar aos slides</a><a href="'+path.name+'">Versão Markdown</a></header><main>'+markdown(path.read_text())+'<footer>Oficina Docker · Material de acompanhamento</footer></main><script>'+SCRIPT+'</script></body></html>'
        path.with_suffix('.html').write_text(document,encoding='utf-8')
    archive=ROOT/'downloads/oficina-docker.zip';archive.parent.mkdir(exist_ok=True)
    allowed_dirs={'apresentacao','docs','exemplos','infra','scripts','testes'}
    allowed_root={'README.md','ROTEIRO.md','REFERENCIAS.md','DESIGN.md','TESTES.md','Dockerfile','index.html','.env.example','.dockerignore','.gitignore'}
    with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
        for path in sorted(ROOT.rglob('*')):
            if not path.is_file():continue
            rel=path.relative_to(ROOT)
            if any(x in rel.parts for x in ['node_modules','__pycache__','.git','.runtime']):continue
            if path.name.startswith('.env') and path.name!='.env.example':continue
            if rel.parts[0] not in allowed_dirs and str(rel) not in allowed_root and not (len(rel.parts)==1 and path.name.startswith('compose') and path.suffix=='.yaml'):continue
            z.write(path,Path('oficina-docker')/rel)
        # A pasta privada é recriada pelos scripts; a distribuição leva só um marcador.
        z.writestr('oficina-docker/.runtime/.gitkeep','')
    print(f'Guias HTML gerados. ZIP: {archive.stat().st_size:,} bytes')
if __name__=='__main__':build()
