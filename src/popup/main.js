import browser from 'webextension-polyfill';
import ApiClient from '../lib/api.js';

let clnt = new ApiClient("http://127.0.0.1:8000");

function callback(tabs) {
    var currentTab = tabs[0]; // there will be only one in this array
    console.log(clnt.checkPage(currentTab.url));
}

function cbDelay(tabs) {
  setTimeout(function() {callback(tabs)}, 5000)
}

let query = { active: true, currentWindow: true };
chrome.tabs.query(query, cbDelay);
