(function () {
  const cards = Array.from(document.querySelectorAll('.treaty-card'));
  const searchInput = document.getElementById('searchInput');

  if (!cards.length) {
    return;
  }

  function closeAllCards() {
    cards.forEach((card) => {
      const button = card.querySelector('.accordion-toggle');
      const content = card.querySelector('.accordion-content');
      card.classList.remove('active');
      if (button) {
        button.setAttribute('aria-expanded', 'false');
      }
      if (content) {
        content.style.maxHeight = '0px';
      }
    });
  }

  function openCard(card) {
    const button = card.querySelector('.accordion-toggle');
    const content = card.querySelector('.accordion-content');
    card.classList.add('active');
    if (button) {
      button.setAttribute('aria-expanded', 'true');
    }
    if (content) {
      content.style.maxHeight = `${content.scrollHeight}px`;
    }
  }

  cards.forEach((card) => {
    const trigger = card.querySelector('.accordion-toggle');
    if (!trigger) {
      return;
    }

    trigger.addEventListener('click', () => {
      const isActive = card.classList.contains('active');
      closeAllCards();
      if (!isActive) {
        openCard(card);
      }
    });
  });

  document.querySelectorAll('.timeline a').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetSelector = link.getAttribute('href');
      const target = targetSelector ? document.querySelector(targetSelector) : null;
      if (!target) {
        return;
      }
      event.preventDefault();
      closeAllCards();
      openCard(target);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      cards.forEach((card) => {
        const text = `${card.dataset.search || ''} ${card.textContent || ''}`.toLowerCase();
        const match = query === '' || text.includes(query);
        card.classList.toggle('hidden', !match);
      });
    });
  }
})();
