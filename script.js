document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('pixel-grid');
  const popup = document.getElementById('pixel-popup');
  const closePopupBtn = document.getElementById('close-popup');
  const buyMoreBtn = document.getElementById('buy-more');
  const buySingleBtn = document.getElementById('buy-single');
  const orderSummary = document.getElementById('order-summary');
  const pixelList = document.getElementById('pixel-list');
  const payBtn = document.getElementById('pay');

  let selectedPixels = [];
  let purchasedPixels = [];
  
  // Pixel-Grid generieren (100000 Pixel)
  for (let i = 0; i < 100000; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.dataset.index = i;

    pixel.addEventListener('click', (e) => {
      const pixelElement = e.target;
      if (!purchasedPixels.includes(pixelElement.dataset.index)) {
        selectedPixels = [pixelElement.dataset.index];
        openPopup();
      }
    });

    grid.appendChild(pixel);
  }

  function openPopup() {
    popup.style.display = 'flex';
  }

  closePopupBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  buyMoreBtn.addEventListener('click', () => {
    const color = prompt('Geben Sie eine Farbe für das Pixel ein (Hex oder Farbname):');
    if (color) {
      updatePixelColor(color);
    }
  });

  buySingleBtn.addEventListener('click', () => {
    const color = prompt('Geben Sie eine Farbe für das Pixel ein (Hex oder Farbname):');
    if (color) {
      updatePixelColor(color);
      // Bezahlung simulieren (0,01€ pro Pixel)
      simulatePayment();
    }
  });

  function updatePixelColor(color) {
    const pixel = document.querySelector(`.pixel[data-index="${selectedPixels[0]}"]`);
    pixel.style.backgroundColor = color;
    purchasedPixels.push(selectedPixels[0]);
    selectedPixels = [];

    const listItem = document.createElement('li');
    listItem.textContent = `Pixel ${purchasedPixels.length}: ${color}`;
    pixelList.appendChild(listItem);
  }

  function simulatePayment() {
    alert('Bezahlung abgeschlossen: 0,01€ pro Pixel');
    // Änderungen sichtbar machen
    setTimeout(() => {
      alert('Die Änderungen sind nun für alle sichtbar!');
    }, 1000);
  }

  payBtn.addEventListener('click', () => {
    alert('Bezahlvorgang abgeschlossen! Alle Pixel sind nun Ihre!');
  });
});
