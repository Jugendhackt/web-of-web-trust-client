import browser from 'webextension-polyfill';
import ApiClient from '../lib/api.js';

let clnt = new ApiClient("http://94.45.227.176:8080");

function callback(data) {
  if (!data['domains']) {
    return
  }
  let domain = data['domains'][0]
  let relation = clnt.domain_trust_factor(domain)
  let is_trustwothy = clnt.is_domain_trustworthy(domain)
  if (is_trustwothy) {
    return
  }
  let title = "Achtung";
  var content = domain['fqdn'] + ' ist eher nicht vertrauenswürdig.';
  browser.notifications.create({
    "type": "basic",
    "iconUrl": browser.extension.getURL("media/icon-512.png"),
    "title": title,
    "message": content
  });
}

browser.tabs.onUpdated.addListener(
    (tabId, _, tab) => {
        if (tab.status === "complete" && tab.favIconUrl !== undefined) {
            clnt.checkPage(tab.url, callback);
      }
  }
)

