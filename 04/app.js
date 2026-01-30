document.addEventListener('DOMContentLoaded', init);

const colorInput = document.querySelector('[name="color"]');
const opacityInput = colorInput.nextElementSibling;
const boxElement = document.querySelector('.box');

colorInput.addEventListener('change', changeBox);
opacityInput.addEventListener('input', changeBox);

function changeBox() {
    const colorVal = colorInput.value;
    console.log(colorVal);

    const opacityVal = (opacityInput.value) / 100;
    console.log(opacityVal);

    setBoxShadow(boxElement, colorVal, opacityVal);
};

function init() {
    setBoxShadow(boxElement, '#000000');
}

function setBoxShadow(element, colorInHex, opacity = 1) {
    const colorInRGBA = `rgba(
        ${getChannelColor(colorInHex, 'red')}, 
        ${getChannelColor(colorInHex, 'green')}, 
        ${getChannelColor(colorInHex, 'blue')}, 
        ${opacity}
    )`;

    element.style.boxShadow = `0 0 5px 5px ${colorInRGBA}`;
}


function getChannelColor(colorInHex, channelName) {
    let start;
    switch (channelName) {
        case 'red':
            start = 1;
            break;
        case 'green':
            start = 3;
            break;
        case 'blue':
            start = 5;
            break;
    }

    const channelColorHex = colorInHex.substr(start, 2);
    const channelColorDec = parseInt(channelColorHex, 16);

    return channelColorDec;
}


