// import browser from 'webextension-polyfill';

import optionsStorage from './storage.js';

optionsStorage.syncForm('#options-form');

const rangeInputs = [...document.querySelectorAll('input[type="range"][name^="weight"]')];
const numberInputs = [...document.querySelectorAll('input[type="number"][name^="weight"]')];

function updateInputField(event) {
    numberInputs[rangeInputs.indexOf(event.currentTarget)].value = event.currentTarget.value;
}

for (const input of rangeInputs) {
    input.addEventListener('input', updateInputField);
}
