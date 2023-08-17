// Environment variables
var UserKey = 'Not loaded...'
const API_URL = "https://superking.pythonanywhere.com"

const CensourKey = () => {
    var censouredKey = "";
    for (var k = 0; k < UserKey.length; k++) {
        censouredKey += "●";
    }
    return censouredKey;
};

document.getElementById("showTokenButton").addEventListener("click", function() {
    if (document.getElementById("token").textContent.startsWith("●")) {
        document.getElementById("token").textContent = UserKey;
        document.getElementById("showTokenButton").textContent = "Hide"
    } else {
        document.getElementById("token").textContent = CensourKey();
        document.getElementById("showTokenButton").textContent = "Show"
    }
})

document.getElementById("GalaxybloxDiscordLink").addEventListener('click', () => {
    chrome.tabs.create({url: "https://discord.gg/thujbtSHC7"})
});
document.getElementById("MicroplayTwitter").addEventListener('click', () => {
    chrome.tabs.create({url: "https://twitter.com/MicroplayStudio"})
});
document.getElementById("MicroplayYouTube").addEventListener('click', () => {
    chrome.tabs.create({url: "https://www.youtube.com/channel/UCddf456Nk9vZuVPhtQOCrSg"})
});

if (document.querySelector(".ProductNotActivated").style.display == "flex") {
    chrome.storage.local.get(["key"]).then((e) => {
        UserKey = e["key"];
        document.getElementById("token").textContent = CensourKey();
        if (UserKey != undefined && UserKey != null) {
            document.getElementsByClassName("ProductNotActivated")[0].style.display = "none";
            document.getElementsByClassName("ProductActivated")[0].style.display = "flex";
        }
    });
}