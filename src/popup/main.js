import browser from 'webextension-polyfill';
import ApiClient from '../lib/api.js';

let clnt = new ApiClient("http://94.45.227.176:8080");
let progressBar = document.getElementById("bar");
let h4DomainNotTrusted = document.getElementById("domain-not-trusted");
let h4DomainTrusted = document.getElementById("domain-trusted");

function urlCallback(response) {
  let domain = response['domains'][0]
  let relation = clnt.domain_trust_factor(domain)
  bar.value = relation * 100
  let is_trustwothy = clnt.is_domain_trustworthy(domain)
  if (is_trustwothy) {
    h4DomainTrusted.style.display = "block";
    h4DomainNotTrusted.style.display = "none";
  } else {
    h4DomainTrusted.style.display = "none";
    h4DomainNotTrusted.style.display = "block";
  }
}

function callback(tabs) {
  var currentTab = tabs[0]; // there will be only one in this array
  clnt.checkPage(currentTab.url, urlCallback);
}

function cbDelay(tabs) {
  //setTimeout(function() {callback(tabs)}, 5000)
  callback(tabs)
}

let query = { active: true, currentWindow: true };
chrome.tabs.query(query, cbDelay);
