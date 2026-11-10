'use strict';
const navigation = document.querySelector('.navigation');
if (window.matchMedia('(max-width: 720px)').matches) navigation.open = false;
document.querySelectorAll('.codehilite').forEach(block => {
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'copy'; button.textContent = 'Copy';
  button.setAttribute('aria-label', 'Copy code block');
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(block.querySelector('code').textContent);
      button.textContent = 'Copied';
    } catch {
      button.textContent = 'Select to copy';
    }
    setTimeout(() => { button.textContent = 'Copy'; }, 1800);
  });
  block.append(button);
});
if (window.mermaid) {
  mermaid.initialize({ startOnLoad: false, theme: 'default', securityLevel: 'strict' });
  let running = false;
  async function renderDiagrams() {
    if (running) return;
    const nodes = [...document.querySelectorAll('.mermaid:not([data-processed])')].filter(node => node.getClientRects().length);
    if (!nodes.length) return;
    running = true;
    try { await mermaid.run({ nodes }); } finally { running = false; }
    if ([...document.querySelectorAll('.mermaid:not([data-processed])')].some(node => node.getClientRects().length)) renderDiagrams();
  }
  document.querySelectorAll('details').forEach(panel => panel.addEventListener('toggle', renderDiagrams));
  renderDiagrams();
}
