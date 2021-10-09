import browser from 'webextension-polyfill';


browser.tabs.onUpdated.addListener(
    (tabId, _, tab) => {
        if (tab.status === "complete" && tab.favIconUrl !== undefined) {
            var title = "Click Event";
            var content = "You opened " + tab.url;
            browser.notifications.create({
                "type": "basic",
                "iconUrl": browser.extension.getURL("media/icon-512.png"),
                "title": title,
                "message": content
            });
        }
    }
)

