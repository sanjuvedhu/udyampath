content = open('src/App.jsx').read()

old = '''  const handleApply = async () => {
    if (!user) return onAuthRequired();'''

new = '''  const handleApply = async () => {
    if (job.apply_url) { window.open(job.apply_url, "_blank"); return; }
    if (!user) return onAuthRequired();'''

if old in content:
    content = content.replace(old, new)
    open('src/App.jsx', 'w').write(content)
    print('Fixed!')
else:
    print('Not found - already fixed or different text')
