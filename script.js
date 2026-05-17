document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const siteNav = document.querySelector("[data-site-nav]");

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      siteNav.classList.toggle("open");
    });
  }

  const searchInput = document.querySelector('[data-search="products"]');
  const categorySelect = document.querySelector('[data-filter="category"]');
  const cards = [...document.querySelectorAll("[data-product-card]")];

  if (searchInput && categorySelect && cards.length > 0) {
    const applyFilters = () => {
      const query = searchInput.value.trim().toLowerCase();
      const category = categorySelect.value;

      cards.forEach((card) => {
        const name = card.dataset.name.toLowerCase();
        const text = card.dataset.text.toLowerCase();
        const cardCategory = card.dataset.category;
        const matchesText = !query || name.includes(query) || text.includes(query);
        const matchesCategory = category === "all" || category === cardCategory;
        card.style.display = matchesText && matchesCategory ? "" : "none";
      });
    };

    searchInput.addEventListener("input", applyFilters);
    categorySelect.addEventListener("change", applyFilters);
  }

  document.querySelectorAll("[data-expand]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".product-card");
      const extra = card && card.querySelector(".product-extra");
      if (!extra) return;
      const open = !extra.hidden;
      extra.hidden = open;
      const expanded = !open;
      btn.setAttribute("aria-expanded", String(expanded));
      btn.textContent = expanded ? "Скрыть подробности" : "Подробнее о форме выпуска";
    });
  });

  const form = document.querySelector("[data-contact-form]");
  if (form) {
    const note = form.querySelector("[data-form-note]");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent("Сообщение с сайта TastyPHARM");
      const body = encodeURIComponent(
        `Имя: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`
      );
      window.location.href = `mailto:tastypharm@yandex.ru?subject=${subject}&body=${body}`;
      if (note) {
        note.hidden = false;
        note.textContent =
          "Открыта почтовая программа с заполненным письмом. Если окно не появилось, напишите на tastypharm@yandex.ru вручную.";
      }
    });
  }
});
