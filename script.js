const cards = Array.from(document.querySelectorAll('.treaty-card'));
    const searchInput = document.getElementById('searchInput');

    function closeAllCards() {
      cards.forEach((card) => {
        card.classList.remove('active');
        const button = card.querySelector('.accordion-toggle');
        const content = card.querySelector('.accordion-content');
        button.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = '0px';
      });
    }

    function openCard(card) {
      const button = card.querySelector('.accordion-toggle');
      const content = card.querySelector('.accordion-content');
      card.classList.add('active');
      button.setAttribute('aria-expanded', 'true');
      content.style.maxHeight = `${content.scrollHeight}px`;
    }

    cards.forEach((card) => {
      card.querySelector('.accordion-toggle').addEventListener('click', () => {
        const isActive = card.classList.contains('active');
        closeAllCards();
        if (!isActive) {
          openCard(card);
        }
      });
    });

    document.querySelectorAll('.timeline a').forEach((link) => {
      link.addEventListener('click', (event) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        event.preventDefault();
        closeAllCards();
        openCard(target);
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      cards.forEach((card) => {
        const text = card.dataset.search.toLowerCase() + ' ' + card.textContent.toLowerCase();
        const match = query === '' || text.includes(query);
        card.classList.toggle('hidden', !match);
      });
    });