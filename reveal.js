function runReveal() {
  const container = document.querySelector(".terminal-content");
  if (!container) return;

  const blocks = container.querySelectorAll(
    "pre, header, nav, nav a, section, h1, h2, h3, p, ul, ol, li, blockquote, hr, form, label, input, textarea, button"
  );

  blocks.forEach((b) => b.classList.add("reveal-block"));

  const baseDelay = 60;
  let i = 0;

  const tick = () => {
    if (i >= blocks.length) return;
    blocks[i].classList.add("is-visible");
    i++;
    setTimeout(tick, baseDelay);
  };

  tick();
}

window.addEventListener("boot:done", runReveal);