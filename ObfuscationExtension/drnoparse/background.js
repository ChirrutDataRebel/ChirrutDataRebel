// vim: set ts=4 sts=4 sw=4 expandtab:
function onCreated() {
    console.log("DRNoparse", "menu created");
}

browser.menus.create({
    id: "drnoparse-obfuscate",
    title: "Obfuscate",
    contexts: ["selection"]
}, onCreated);

browser.menus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "drnoparse-obfuscate":
            console.log("DRNoparse", "obfuscating text", info.selectionText);
            browser.tabs.executeScript(tab.id, {
                file: "obfuscate.js",
            });
            break;
    }
});

