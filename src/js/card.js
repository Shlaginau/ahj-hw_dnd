export default class Card {
  constructor(modal, cardsContainer, addButton) {
    this.modal = modal;
    this.cardsContainer = cardsContainer;
    this.addButton = addButton;

    if (!this.modal || !this.cardsContainer || !this.addButton) {
      console.error('Error: Missing elements', {
        modal: this.modal,
        cardsContainer: this.cardsContainer,
        addButton: this.addButton
      });
      throw new Error('All elements must be provided: modal, cardsContainer, and addButton.');
    }

    this.input = this.modal.querySelector('.input-text');
    this.columnKey = this.cardsContainer.closest('.column').querySelector('.column-header').textContent.trim().toLowerCase().replace(/\s+/g, '');
    this.cardsData = JSON.parse(localStorage.getItem(this.columnKey)) || [];
    this.loadCards();
    this.initEventListeners();
  }

  initEventListeners() {
    this.addButton.addEventListener('click', () => {
      this.openModal();
    });

    this.modal.querySelector('.add-card-btn').addEventListener('click', () => {
      const content = this.input.value;
      if (content.trim()) {
        this.addCard(content);
        this.input.value = '';
        this.closeModal();
      }
    });

    this.modal.querySelector('.delete-new-card').addEventListener('click', () => {
      this.closeModal();
    });

    this.input.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.modal.querySelector('.add-card-btn').click();
      }
    });
  }

  openModal() {
    this.modal.style.display = 'block';
    this.addButton.style.display = 'none';
    this.input.focus();
  }

  closeModal() {
    this.modal.style.display = 'none';
    this.addButton.style.display = 'block';
  }

  addCard(content) {
    this.createCardElement(content);
    this.cardsData.push(content);
    localStorage.setItem(this.columnKey, JSON.stringify(this.cardsData));
  }

  createCardElement(content) {
    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.draggable = true;
    newCard.innerHTML = `${content} <span class="delete-card"><i class="fas fa-times"></i></span>`;
    newCard.querySelector('.delete-card').addEventListener('click', () => {
      this.deleteCard(newCard, content);
    });
    this.cardsContainer.appendChild(newCard);
  }

  loadCards() {
    this.cardsData.forEach(content => {
      this.createCardElement(content);
    });
  }

  deleteCard(cardElement, content) {
    const index = this.cardsData.indexOf(content);
    if (index > -1) {
      this.cardsData.splice(index, 1);
      localStorage.setItem(this.columnKey, JSON.stringify(this.cardsData));
    }
    cardElement.remove();
  }
}