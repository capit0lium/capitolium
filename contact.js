document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".terminal-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // empêche la redirection

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        form.outerHTML = `
          <div class="terminal-success reveal-block is-visible">
            <p>Votre message a bien été envoyé</p>
          </div>
        `;
      } else {
        throw new Error("Erreur Formspree");
      }
    } catch (error) {
      form.outerHTML = `
        <div class="terminal-error reveal-block is-visible">
          <p>ERREUR</p>
        </div>
      `;
    }
  });
});