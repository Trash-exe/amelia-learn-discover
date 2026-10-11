#!/bin/bash
# Build Amelia's Learn & Discover: index.html (videos + messages injected) and sw.js (cache version bump)
set -e
cd "$(dirname "$0")"
python3 - <<'P'
import json
t=open('src/tpl.html').read()
v=open('src/vids.json').read()
m=json.dumps([l.strip() for l in open('src/msgs.txt') if l.strip()],ensure_ascii=False)
open('index.html','w').write(t.replace('__VIDS__',v).replace('__MSGS__',m))
P
sed "s/__VER__/$(date +%Y%m%d%H%M%S)/" src/sw_tpl.js > sw.js
echo "built index.html + sw.js"
