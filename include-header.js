async function loadHeader() {
  const host = document.getElementById("site-header");
  if (!host) return;

  const res = await fetch("partials/header.html", { cache: "no-store" });
  const html = await res.text();
  host.innerHTML = html;

  // Met le lien actif automatiquement
  const path = window.location.pathname.split("/").pop() || "index.html";
  const current = path === "" ? "index.html" : path;

  host.querySelectorAll(".terminal-nav .nav-link").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === current) a.classList.add("active");
  });
}

document.addEventListener("DOMContentLoaded", loadHeader);