// Referencias
const redRange = document.getElementById('redRange');
const greenRange = document.getElementById('greenRange');
const blueRange = document.getElementById('blueRange');

const redInput = document.getElementById('redInput');
const greenInput = document.getElementById('greenInput');
const blueInput = document.getElementById('blueInput');

// Referencias a los "badges" (etiquetas numéricas pequeñas)
const redBadge = document.getElementById('redBadge');
const greenBadge = document.getElementById('greenBadge');
const blueBadge = document.getElementById('blueBadge');

const colorDisplay = document.getElementById('colorDisplay');
const hexOutput = document.getElementById('hexOutput');
const rgbOutput = document.getElementById('rgbOutput');
const colorPicker = document.getElementById('colorPicker');

function updateColor() {
    let r = parseInt(redRange.value);
    let g = parseInt(greenRange.value);
    let b = parseInt(blueRange.value);

    const rgbString = `rgb(${r}, ${g}, ${b})`;
    const hexString = rgbToHex(r, g, b);

    // Actualizar visuales
    colorDisplay.style.backgroundColor = rgbString;
    hexOutput.value = hexString; // Ahora es un input readonly
    rgbOutput.value = rgbString; // Ahora es un input readonly
    colorPicker.value = hexString;

    // Actualizar badges
    redBadge.textContent = r;
    greenBadge.textContent = g;
    blueBadge.textContent = b;
}

function setupSync(rangeElement, numberElement) {
    rangeElement.addEventListener('input', () => {
        numberElement.value = rangeElement.value;
        updateColor();
    });

    numberElement.addEventListener('input', () => {
        let val = parseInt(numberElement.value);
        if (isNaN(val)) val = 0; // Protección extra
        if (val > 255) val = 255;
        if (val < 0) val = 0;
        
        numberElement.value = val; // Corregir visualmente el input si se pasó
        rangeElement.value = val;
        updateColor();
    });
}

colorPicker.addEventListener('input', (event) => {
    const hexColor = event.target.value;
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);

    redRange.value = r; redInput.value = r;
    greenRange.value = g; greenInput.value = g;
    blueRange.value = b; blueInput.value = b;

    // Actualizamos badges y display
    redBadge.textContent = r;
    greenBadge.textContent = g;
    blueBadge.textContent = b;
    
    // Actualización manual para no disparar el evento del picker de nuevo
    const rgbString = `rgb(${r}, ${g}, ${b})`;
    colorDisplay.style.backgroundColor = rgbString;
    hexOutput.value = hexColor.toUpperCase();
    rgbOutput.value = rgbString;
});

function rgbToHex(r, g, b) {
    const toHex = (c) => c.toString(16).padStart(2, '0').toUpperCase();
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Inicializar
setupSync(redRange, redInput);
setupSync(greenRange, greenInput);
setupSync(blueRange, blueInput);
updateColor();