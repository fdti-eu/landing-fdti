#!/usr/bin/env python3
"""Compare prerendered text, navigation, metadata and images against the pre-design build.
Create the reference once before modifying templates, then run after every build.
The snapshot hashes rendered content, not Svelte markup or whitespace formatting.
"""
import argparse
import hashlib
import json
import re
import subprocess
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SNAPSHOT = ROOT / 'scripts/design-content-baseline.json'

def digest(value):
    return hashlib.sha256(json.dumps(value, ensure_ascii=False, sort_keys=True).encode()).hexdigest()

class Content(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.ignored = 0
        self.body = False
        self.text = []
        self.links = []
        self.images = []
        self.meta = []
        self.feed(html)
    def handle_starttag(self, tag, pairs):
        a = dict(pairs)
        if tag == 'body': self.body = True
        if tag in ('script', 'style'): self.ignored += 1
        if tag == 'a': self.links.append([a.get('href'), a.get('target'), a.get('rel')])
        if tag == 'img': self.images.append([a.get('src'), a.get('alt'), a.get('title')])
        if tag == 'meta': self.meta.append(a)
        if tag == 'link' and a.get('rel') in ('canonical', 'alternate'): self.meta.append(a)
    def handle_endtag(self, tag):
        if tag in ('script', 'style'): self.ignored = max(0, self.ignored - 1)
        if tag == 'body': self.body = False
    def handle_data(self, value):
        if self.body and not self.ignored:
            self.text.extend(re.findall(r'\S+', value))
    def result(self):
        return {key: digest(value) for key, value in {
            'words_in_order': self.text,
            'links': sorted(self.links, key=str),
            'images': sorted(self.images, key=str),
            'metadata': sorted(self.meta, key=str)
        }.items()}

def collect(directory):
    return {str(path.relative_to(directory)): Content(path.read_text()).result()
            for path in sorted(directory.rglob('*.html'))}

parser = argparse.ArgumentParser()
parser.add_argument('--snapshot-from', type=Path)
args = parser.parse_args()
if args.snapshot_from:
    if SNAPSHOT.exists(): raise SystemExit('Reference already exists; refusing to overwrite it.')
    data = {'base_commit': subprocess.check_output(['git','rev-parse','HEAD'], cwd=ROOT, text=True).strip(), 'pages':collect(args.snapshot_from)}
    SNAPSHOT.write_text(json.dumps(data, indent=2)+'\n')
    print(f'Reference saved: {len(data["pages"])} pages')
else:
    baseline = json.loads(SNAPSHOT.read_text())
    current = collect(ROOT / 'build')
    errors = []
    expected = baseline['pages']
    if set(current) != set(expected): errors.append('Prerendered route set changed')
    for page, signatures in expected.items():
        for key, value in signatures.items():
            if current.get(page, {}).get(key) != value: errors.append(f'{page}: {key} changed')
    protected = ['src/locales', 'static', 'src/app.css', 'src/app.postcss', 'src/lib/data.ts', 'src/lib/jobs.ts', 'src/lib/llms.ts', 'src/lib/functions/seo.ts', 'src/lib/components/jobs/PrintableJobOffer.svelte', 'package.json', 'package-lock.json', 'svelte.config.js']
    diff = subprocess.run(['git','diff','--name-only',baseline['base_commit'],'--',*protected], cwd=ROOT, text=True,capture_output=True,check=True).stdout.strip()
    if diff: errors.append('Protected brand/content/configuration files changed: '+diff)
    if errors:
        print('\n'.join(errors)); raise SystemExit(1)
    print(f'PASS: {len(expected)} pages, texts in order, all link destinations, image sources/alts and SEO metadata unchanged.')
    print('PASS: original translations, data, logos/assets, fonts, brand tokens, dependencies and A4 template byte-identical.')
