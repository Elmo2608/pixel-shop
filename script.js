document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('pixel-grid');
  const sliderContainer = document.getElementById('slider-container');
  const selectedPixelsContainer = document.getElementById('selected-pixels');
  const confirmPurchaseBtn = document.getElementById('confirm-purchase');
  const closePopupBtn = document.getElementById('close-popup');
  const buyMoreBtn = document.getElementById('buy-more');
  const buySingleBtn = document.getElementById('buy-single');
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
      if (!selectedPixels.includes(pixelElement.dataset.index)) {
        selectedPixels.push(pixelElement.dataset.index);
        pixelElement.style.border = '2px solid red'; // Markiere das Pixel
        updateSlider();
      }
    });

    grid.appendChild(pixel);
  }

  function updateSlider() {
    selectedPixelsContainer.innerHTML = '';
    selectedPixels.forEach((pixelIndex, index) => {
      const pixelContainer = document.createElement('div');
      pixelContainer.classList.add('pixel-container');
      
      const colorInput = document.createElement('input');
      colorInput.type = 'color';
      colorInput.id = `color-${pixelIndex}`;
      
      pixelContainer.appendChild(colorInput);
      selectedPixelsContainer.appendChild(pixelContainer);
    });

    sliderContainer.style.display = 'block';
  }

  confirmPurchaseBtn.addEventListener('click', () => {
    selectedPixels.forEach((pixelIndex) => {
      const color = document.getElementById(`color-${pixelIndex}`).value;
      updatePixelColor(pixelIndex, color);
    });
    
    // Bezahlung simulieren
    simulatePayment();
    sliderContainer.style.display = 'none';
  });

  function updatePixelColor(pixelIndex, color) {
    const pixel = document.querySelector(`.pixel[data-index="${pixelIndex}"]`);
    pixel.style.backgroundColor = color;
    purchasedPixels.push({ pixelIndex, color });

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

  // Popup-Logik
  closePopupBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  buyMoreBtn.addEventListener('click', () => {
    const color = prompt('Geben Sie eine Farbe für das Pixel ein (Hex oder Farbname):');
    if (color) {
      updatePixelColor(selectedPixels[0], color);
    }
  });

  buySingleBtn.addEventListener('click', () => {
    const color = prompt('Geben Sie eine Farbe für das Pixel ein (Hex oder Farbname):');
    if (color) {
      updatePixelColor(selectedPixels[0], color);
      // Bezahlung simulieren
      simulatePayment();
    }
  });

  payBtn.addEventListener('click', () => {
    alert('Bezahlvorgang abgeschlossen! Alle Pixel sind nun Ihre!');
  });
});
