var key = 'Not loaded...'

const CensourKey = () => {
    var censouredKey = "";
    for (var k = 0; k < key.length; k++) {
        censouredKey += "●";
    }
    return censouredKey;
};

chrome.storage.local.get(["cursor"]).then((i) => {
    if (i["cursor"] == undefined || i["cursor"] == null || i["cursor"] == true) {
        document.getElementById("customCursorCheckbox").checked = true;
    } else {
        document.getElementById("customCursorCheckbox").checked = false;
    }
});

document.getElementById("customCursorCheckbox").addEventListener("change", () => {
    chrome.storage.local.set({"cursor": document.getElementById("customCursorCheckbox").checked});
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
});

document.getElementById("showTokenButton").addEventListener("click", function() {
    if (document.getElementById("token").textContent.startsWith("●")) {
        // Klucz jest niewidzialny
        document.getElementById("token").textContent = key;
        document.getElementById("showTokenButton").textContent = "Hide"
    } else {
        document.getElementById("token").textContent = CensourKey();
        document.getElementById("showTokenButton").textContent = "Show"
    }
})

document.getElementById("MicroplayDiscordLink").addEventListener('click', () => {
    chrome.tabs.create({url: "https://discord.gg/yQhsNkqnDP"})
});
document.getElementById("GalaxybloxDiscordLink").addEventListener('click', () => {
    chrome.tabs.create({url: "https://discord.gg/thujbtSHC7"})
});
document.getElementById("MicroplayTwitter").addEventListener('click', () => {
    chrome.tabs.create({url: "https://twitter.com/MicroplayStudio"})
});
document.getElementById("MicroplayYouTube").addEventListener('click', () => {
    chrome.tabs.create({url: "https://www.youtube.com/channel/UCddf456Nk9vZuVPhtQOCrSg"})
});

document.getElementById("activateButton").addEventListener("click", function() {
    const token = document.getElementById("keyInput").value;
    chrome.storage.local.set({"key": token})
    document.getElementsByClassName("ProductNotActivated")[0].style.display = "none";
    document.getElementsByClassName("ProductActivated")[0].style.display = "flex";
})

chrome.storage.local.get(["key"]).then((e) => {
    key = e["key"];
    document.getElementById("token").textContent = CensourKey();
    if (key != undefined && key != null) {
        document.getElementsByClassName("ProductNotActivated")[0].style.display = "none";
        document.getElementsByClassName("ProductActivated")[0].style.display = "flex";
    }
});