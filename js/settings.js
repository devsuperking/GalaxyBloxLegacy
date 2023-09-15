if (window.location.pathname.startsWith("/galaxyblox")) {
    document.querySelector(".content").innerHTML = `
    <div class='gb-content'>
    <img src='https://media.discordapp.net/attachments/1137055496155709480/1137056343048597524/5445590_kopia_3_kopia.jpg?width=1141&height=355' width="550px" height="180px" style="object-fit: cover; border-radius: 10px; margin: 10px;">
    <img src='https://cdn.discordapp.com/attachments/1137055496155709480/1137347531194503178/MicrobloxRounded.png' width='70px' height='70px'>
    <h1>GalaxyBlox settings</h1>
    <div class='gb-container'>
    <h2>Robux currency</h2>
    <select class='gb-select' id="RobuxCurrencySelect">
    <option>
    Disabled
    </option>
    <option>
    USD
    </option>
    <option>
    PLN
    </option>
    </select>
    </div>
    <div class='gb-container'>
    <h2>Custom cursor</h2>
    Enable custom cursor<br>
    <label class="switch">
        <input type="checkbox" id="CustomCursorCheckbox">
        <span class="slider round"></span>
    </label>
    
    </div>
    <div class='gb-container'>
    <h2>Accessibility</h2>
    <div class="gb-container-f">
    Always show navigation bar<br>
    <label class="switch">
        <input type="checkbox" id="NavBarShownCheckbox">
        <span class="slider round"></span>
    </label>
    </div>
    <div class='gb-container-f'>
    Add home to top bar<br>
    <label class="switch">
        <input type="checkbox" id="HomeTopBarCheckbox">
        <span class="slider round"></span>
    </label>
    </div>
    </div>
    </div>`;

    // Custom cursor checkbox
    chrome.storage.local.get(["cursor"]).then((i) => {
        if (i["cursor"] == undefined || i["cursor"] == null || i["cursor"] == false) {
            document.getElementById("CustomCursorCheckbox").checked = false;
        } else {
            document.getElementById("CustomCursorCheckbox").checked = true;
        }
    });
    document.getElementById("CustomCursorCheckbox").addEventListener("change", () => {
        chrome.storage.local.set({"cursor": document.getElementById("CustomCursorCheckbox").checked}).then(() => {window.location.reload()});
    });

    // Currency
    chrome.storage.local.get(["currency"]).then((i) => {
        if (i["currency"] == undefined || i["currency"] == null || i["currency"] == "Disabled") {
            document.getElementById("RobuxCurrencySelect").value = "Disabled";
        } else {
            document.getElementById("RobuxCurrencySelect").value = i["currency"];
        }
    });
    document.getElementById("RobuxCurrencySelect").addEventListener("change", () => {
        chrome.storage.local.set({"currency": document.getElementById("RobuxCurrencySelect").value});
        const RobuxCount = document.querySelector("#nav-robux-amount");
        const RobuxCurrency = document.querySelector(".rbx-currency");
        const RobloxCurrencySelect = document.getElementById("RobuxCurrencySelect");

        if (RobloxCurrencySelect.value == "PLN") {
            RobuxCurrency.innerHTML = `(${0.05 * Number.parseInt(RobuxCount.textContent)} zł)`;
        } else if (RobloxCurrencySelect.value == "USD") {
            RobuxCurrency.innerHTML = `(${0.01 * Number.parseInt(RobuxCount.textContent)} USD)`;
        } else if (RobloxCurrencySelect.value == "Disabled") {
            document.querySelector(".rbx-currency").textContent = "";
        }
    });

    // Always show nav bar
    chrome.storage.local.get(["alwaysShowNavbar"]).then((i) => {
        if (i["alwaysShowNavbar"] == undefined || i["alwaysShowNavbar"] == null || i["alwaysShowNavbar"] == false) {
            document.getElementById("NavBarShownCheckbox").checked = false;
        } else {
            document.getElementById("NavBarShownCheckbox").checked = true;
        }
    });
    document.getElementById("NavBarShownCheckbox").addEventListener("change", () => {
        const checkbox = document.getElementById("NavBarShownCheckbox");
        chrome.storage.local.set({"alwaysShowNavbar": checkbox.checked});

        if (checkbox.checked) {
            document.getElementById("navigation").classList.add("nav-show");
            document.querySelector("#header-menu-icon").style.display = "none";
            document.querySelector(".content").style.marginLeft = "235px";
        } else {
            document.querySelector("#header-menu-icon").style.display = "block";
            document.getElementById("navigation").classList.remove("nav-show");
            document.querySelector(".content").style.marginLeft = "unset";
        }
    });

    // Add home to top bar
    chrome.storage.local.get(["homeTopBar"]).then((i) => {
        if (i["homeTopBar"] == undefined || i["homeTopBar"] == null || i["homeTopBar"] == false) {
            document.getElementById("HomeTopBarCheckbox").checked = false;
        } else {
            document.getElementById("HomeTopBarCheckbox").checked = true;
        }
    });
    document.getElementById("HomeTopBarCheckbox").addEventListener("change", () => {
        const checkbox = document.getElementById("HomeTopBarCheckbox");
        chrome.storage.local.set({"homeTopBar": checkbox.checked});

        if (checkbox.checked) {
            if (document.querySelector(".gb-home-top") == undefined) {
                const h = document.createElement("li");
                h.innerHTML = '<a class="font-header-2 nav-menu-title text-header" href="/home"><svg fill="currentColor" width="30px" height="30px" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"></path></svg><t>Home</t></a>';
                h.classList.add("gb-home-top");
                document.querySelector(".rbx-navbar").insertBefore(h, document.querySelector(".rbx-navbar").firstChild);
            } else {
                document.querySelector(".gb-home-top").style.display = "block";
            }
        } else {
            document.querySelector(".gb-home-top").style.display = "none";
        }
    });
}