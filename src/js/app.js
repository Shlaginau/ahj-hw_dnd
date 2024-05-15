import Card from './card.js';  
import './dnd.js'; 

document.addEventListener('DOMContentLoaded', () => { 
  const columns = document.querySelectorAll('.column');

  columns.forEach(column => {
    const cardsContainer = column.querySelector('.cards');
    const modal = column.querySelector('.card-modal');
    const addButton = column.querySelector('.add-card');
    const cardInstance = new Card(modal, cardsContainer, addButton);

    const columnKey = column.querySelector('.column-header').textContent.trim().toLowerCase().replace(/\s+/g, '');
    let cardsData = JSON.parse(localStorage.getItem(columnKey)) || [];

    // Создание карточек, если данные уже были сохранены и колонка еще не заполнена
    if (cardsData.length > 0 && cardsContainer.children.length === 0) {
      cardsData.forEach(content => {
        cardInstance.createCardElement(content);
      });
    }

    addButton.addEventListener('click', () => {
      cardInstance.openModal();
    });

    cardsContainer.addEventListener('change', () => {
      // Сохраняем измененные данные
      const updatedCards = Array.from(cardsContainer.querySelectorAll('.card')).map(card => card.textContent.trim().replace(/\s+$/, ''));
      localStorage.setItem(columnKey, JSON.stringify(updatedCards));
    });
  });
});