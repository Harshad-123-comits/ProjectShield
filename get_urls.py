
import re
with open('paimana_dash.html', 'r', encoding='utf-8') as f:
    text = f.read()
matches = re.findall(r'<script.*?>\s*(.*?)\s*</script>', text, re.DOTALL)
for m in matches:
    if 'ajax' in m.lower():
        urls = re.findall(r'url\s*:\s*[\'\"]([^\'\"]+)[\'\"]', m)
        print('URLs found in inline script:', urls)

