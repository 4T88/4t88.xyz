---
title: "home"
description: "about 4t88"
---

<b>who am i?</b>

<div style="margin-bottom:1.5em;line-height:1.7;">
  <p>
    hey! i'm <b>4T88</b>!<br>
    i made <a href="https://calcite.cc" target="_blank" rel="noopener"><b>calcite.cc</b></a>—it's a WIP open-source discord bot with a bunch of features for anyone to use.
  </p>
  <p>
    i mostly code in python, lua, and javascript, but i'm messing around with c and rust too.<br>
    always down to learn something new.
  </p>
  <p>
    sometimes i post random thoughts or updates on my <a href="/posts/">blog</a>. check it out if you're bored!
  </p>
</div>

<b>contact me</b>
<div class="contact-links" style="display:flex;gap:1.5em;flex-wrap:wrap;align-items:center;margin-bottom:2em;">
  <a href="mailto:contact@4t88.xyz">&gt; email</a>
  <a href="https://t.me/T480001">&gt; telegram</a>
  <a href="https://signal.me/#eu/SgtT32M3OvNqKcqsZQY0YyLgE8tBskPO3Ziv9EXUMgnyvgyUIG5HEIzYdN6UuqoA">&gt; signal</a>
  <a href="#" id="discord-link">&gt; discord</a>
</div>

<div id="discord-toast" style="display:none;position:fixed;bottom:5em;right:2em;background:#232226;color:#eaeaea;padding:1em 2em;border-radius:10px;box-shadow:0 0 16px #000a;z-index:9999;font-family:inherit;font-size:1.1em;opacity:0;transition:opacity 0.4s;">
  discord username copied to clipboard!
</div>
<script>
document.getElementById('discord-link').onclick = function(e) {
  e.preventDefault();
  navigator.clipboard.writeText('4t88');
  var toast = document.getElementById('discord-toast');
  toast.style.display = 'block';
  setTimeout(function() { toast.style.opacity = 1; }, 10);
  setTimeout(function() {
    toast.style.opacity = 0;
    setTimeout(function() { toast.style.display = 'none'; }, 400);
  }, 1800);
};
</script>