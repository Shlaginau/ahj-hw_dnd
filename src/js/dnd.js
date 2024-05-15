document.addEventListener('DOMContentLoaded', () => {
  const columns = document.querySelectorAll('.column');
  let draggedCard = null;

  document.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('card')) {
      draggedCard = e.target;
      setTimeout(() => {
        e.target.classList.add('dragging');
      }, 0);
    }
  });

  document.addEventListener('dragend', (e) => {
    if (e.target.classList.contains('card')) {
      setTimeout(() => {
        e.target.classList.remove('dragging');
        draggedCard = null;

        saveAllColumns();
      }, 0);
    }
  });

  columns.forEach(column => {
    column.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(column, e.clientY);
      const cardsContainer = column.querySelector('.cards');
      if (afterElement == null) {
        cardsContainer.appendChild(draggedCard);
      } else {
        cardsContainer.insertBefore(draggedCard, afterElement);
      }
    });
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  function saveAllColumns() {
    columns.forEach(column => {
      const columnKey = column.querySelector('.column-header').textContent.trim().toLowerCase().replace(/\s+/g, '');
      const cards = Array.from(column.querySelectorAll('.card')).map(card => card.textContent.trim().replace(/\s+$/, ''));
      localStorage.setItem(columnKey, JSON.stringify(cards));
    });
  }
});