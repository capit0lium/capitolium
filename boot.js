document.addEventListener("DOMContentLoaded", async () => {
  const bootEl = document.getElementById("boot");
  if (!bootEl) {
    // Si pas de boot sur la page, on lance direct le reveal
    document.body.classList.remove("booting");
    window.dispatchEvent(new Event("boot:done"));
    return;
  }

  const lines = [
    "[BOOT] initialisation de la session...",
    "[OK]   chargement des données...",
    "[OK]   mise en forme des données..."
  ];

  const cursor = document.createElement("span");
  cursor.className = "type-cursor";
  cursor.textContent = "█";

  const speed = 12;      // ms par caractère
  const linePause = 220; // pause entre lignes

  bootEl.textContent = "";
  bootEl.appendChild(cursor);

  const typeText = (text) =>
    new Promise((resolve) => {
      let i = 0;
      const tick = () => {
        if (i < text.length) {
          cursor.insertAdjacentText("beforebegin", text[i]);
          i++;
          setTimeout(tick, speed);
        } else resolve();
      };
      tick();
    });

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  for (const line of lines) {
    await typeText(line);
    cursor.insertAdjacentText("beforebegin", "\n");
    await sleep(linePause);
  }

  bootEl.remove();
  document.body.classList.remove("booting");

  // Boot terminé -> déclenche le reveal
  window.dispatchEvent(new Event("boot:done"));
});