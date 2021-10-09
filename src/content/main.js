import browser from 'webextension-polyfill';
import ApiClient from '../lib/api.js';

let clnt = new ApiClient("http://127.0.0.1:8000");

browser.tabs.onUpdated.addListener(
    (tabId, _, tab) => {
        if (tab.status === "complete" && tab.favIconUrl !== undefined) {
            var title = "Click Event";
            var content = "You opened " + tab.url;
            clnt.checkPage(tab.url);
            browser.notifications.create({
                "type": "basic",
                "iconUrl": browser.extension.getURL("media/icon-512.png"),
                "title": title,
                "message": content
            });
        }
    }
)

