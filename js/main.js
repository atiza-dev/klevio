// Klevio — lightweight client-side behavior for lead-capture forms
// and the mobile nav toggle. No backend exists yet: submissions are
// accepted client-side and swapped for a confirmation message so the
// flow is demonstrable end to end.

document.querySelectorAll(".nav-toggle").forEach((toggle) => {
  const nav = toggle.closest(".nav");
  const links = nav && nav.querySelector(".nav-links");
  if (!links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
});

document.querySelectorAll("form[data-lead-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const panel = form.closest(".form-panel") || form;
    const confirm = panel.parentElement.querySelector("[data-lead-confirm]");
    panel.classList.add("is-hidden");
    if (confirm) confirm.classList.remove("is-hidden");
  });
});

document.querySelectorAll("form[data-newsletter-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const input = form.querySelector("input");
    const button = form.querySelector("button");
    if (button) {
      const original = button.textContent;
      button.textContent = "✓";
      input.disabled = true;
      setTimeout(() => {
        button.textContent = original;
        input.value = "";
        input.disabled = false;
      }, 2500);
    }
  });
});
