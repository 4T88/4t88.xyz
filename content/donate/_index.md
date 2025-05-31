---
title: "donate"
---

<style>
.copy-btn {
  background: #232226;
  color: #dad6d6;
  border: 1px solid #444;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 1em;
  padding: 0.2em 0.9em;
  margin-left: 10px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  vertical-align: middle;
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
}
.copy-btn:hover {
  background: #444;
  color: #fff;
}
</style>

<div style="margin: 2em 0; display: flex; flex-direction: column; gap: 1.5em;">
  <div style="display: flex; align-items: center; background: #20201f; padding: 0.75em 1em; border-radius: 8px;">
    <strong style="min-width: 140px;">Ethereum (ETH):</strong>
    <span style="display:inline-block; width: 0.5em;"></span>
    <span id="eth-address" style="word-break: break-all; flex: 1;">0x2499518fB7f483B1b49EE7EC609c6d9Ad9C862Eb</span>
    <button class="copy-btn" onclick="const b=this;navigator.clipboard.writeText(document.getElementById('eth-address').textContent);b.innerHTML='✓';setTimeout(()=>{b.innerHTML='📋';},1200);">📋</button>
  </div>
  <div style="display: flex; align-items: flex-start; background: #20201f; padding: 0.75em 1em; border-radius: 8px; flex-wrap: wrap;">
    <strong style="min-width: 140px;">Monero (XMR):</strong>
    <span id="xmr-address" style="word-break: break-all; flex: 1;">47D5FnuuZj4bAcrcMgEZFs3LoHU82YTNaASKu9Tt5cfVQncJFu54M3mC1id2tLCx6QGGD3Ccr32rBVz6tL9U5qiKNePEgDb</span>
    <button class="copy-btn" onclick="const b=this;navigator.clipboard.writeText(document.getElementById('xmr-address').textContent);b.innerHTML='✓';setTimeout(()=>{b.innerHTML='📋';},1200);">📋</button>
  </div>
</div>
