// Environment variables
const API_URL = "https://superking.pythonanywhere.com"
const username = document.querySelector('.text-overflow.age-bracket-label-username.font-caption-header').textContent;
const CEO = username == "@DevSuperKing" || username == "@KERTONCZOKO";
const uid = document.querySelector("#right-navigation-header > div.navbar-right.rbx-navbar-right > ul > div > a").href.split('/')[4];

// Force dark theme
if (document.body.classList.contains("light-theme")) {
    document.body.classList.remove("light-theme")
    document.body.classList.add("dark-theme")
    document.getElementById("navigation-container").classList.remove("light-theme")
    document.getElementById("navigation-container").classList.add("dark-theme")
}

// Fetch user
fetch(API_URL + "/users/fetch?user=" + uid).then((res) => {
    res.json().then((data) => {

        // Check if user is banned
        if (data["banned"] == true) {

            // Display ban message
            const banContainer = document.createElement("div");

            banContainer.classList.add("setup");
            banContainer.classList.add("ban-container");

            banContainer.innerHTML = `<div><img src='https://cdn.discordapp.com/attachments/1137055496155709480/1137347531194503178/MicrobloxRounded.png' width='80px' height='80px'><h1>You are banned from Galaxyblox</h1><div class='display-block'>Please send us <a href='https://docs.google.com/forms/d/e/1FAIpQLScgS5bi-L9jo6Ycd7uEupzIg6xTeq84op27UephMge9dY6KwA/viewform?usp=sf_link' target='_blank'>ban appeal</a>, and join our <a href='https://discord.gg/PgwJ8An8Jh' target='_blank'>Discord server</a> to get unban.<br>Your ban ID: <b>${uid}</b><br>Reason: <b>${data["reason"]}</b></div><img src='https://media.discordapp.net/attachments/1137055496155709480/1137056343048597524/5445590_kopia_3_kopia.jpg?width=1033&height=321' width="520px" height="160px" style="border-radius: 10px; margin: 10px;"></div>`
            
            document.body.style.overflow = "hidden";
            
            document.getElementsByTagName("html")[0].insertBefore(banContainer, document.getElementsByTagName("html")[0].firstChild);
        } else {
            // Check if extension is activated
            chrome.storage.local.get(["key"]).then((i) => {
                fetch("https://superking.pythonanywhere.com/key/fetch?key=" + i["key"]).then((res) => {
                    res.text().then((data) => 
                    {
                        // Check key
                        if (i["key"] == undefined || i["key"] == null || data == "404") {
                    
                            const setup = document.createElement("div");
                    
                            function ShowError(text) {
                                document.getElementById("error-container").style.display = "block";
                                document.getElementById("error-text").textContent = text;
                            }
                    
                            function SubmitKey() {
                    
                                const key = document.getElementById("keyInput").value;
                    
                                fetch(API_URL + "/key/use?key=" + key).then((json) => {
                                    json.json().then((res) => {
                                        if (res["used"] == true) {
                                            chrome.storage.local.set({ "key": key }).then(() => {
                                                document.querySelector(".setup").classList.add("fadeOut");
                                                setTimeout(() => {
                                                    setup.remove();
                                                    document.body.style.overflow = "auto";
                                                }, 200);
                                            });
                                        } else if (res == "606") {
                                            ShowError("The key has been already used.")
                                        } else if (res == "404") {
                                            ShowError("The key does not exist.")
                                        }
                                    })
                                });
                            }
                            setup.className = "setup";
                            setup.innerHTML = `<div><p class="ver">Version: 1.2.1</p><div class="notice">You can get your key on our <a href="https://discord.gg/2eJKfaAPmK" target="_blank">Discord Server</a></div><img src="https://cdn.discordapp.com/attachments/1137055496155709480/1137347531194503178/MicrobloxRounded.png" width="68px" height="68px"/><h1>Let's configure your <g><strong>Roblox Experience</strong></g></h1><input id="keyInput" placeholder="Enter your key" type="password"><div class="buttonContainer"></div><div class="notice dark" id="error-container" style="display: none;"><p id="error-text"></p></div><div class="notice dark"><h3>Additional info</h3><p>・Galaxyblox only supports dark theme. It will be changed automatically.<br>・You can donate us, <a href="https://www.buymeacoffee.com/microplay" target="_blank">by buying us a coffee</a>.</p></div><p class="copyright">Copyright ©️ Microplay Interactive Enterianment Studios 2023. All rights reserved.</p></div>`
                    
                            const button = document.createElement("button");
                            button.textContent = `Link account (${username})`
                            button.onclick = SubmitKey;
                    
                            document.getElementsByTagName("html")[0].insertBefore(setup, document.getElementsByTagName("html")[0].firstChild);
                            document.querySelector(".buttonContainer").appendChild(button);
                    
                            document.body.style.overflow = "hidden";
                    
                        } else {
                            // Loading
                            const loading = document.createElement("div");
                            loading.className = "mb-loading";
                            loading.innerHTML = "<img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTExLjY3NiAwTDAgNDQuMTY2IDQzLjU3NyA1NmwxMS42NzYtNDQuMTY2TDExLjY3NiAwem0yMC40MDkgMzUuODI3bC0xMi4xNzctMy4zMDggMy4yNjQtMTIuMzQyIDEyLjE4MiAzLjMwOC0zLjI3IDEyLjM0MnoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=' width='100px' height='100px'/>";
                            document.getElementsByTagName("html")[0].insertBefore(loading, document.getElementsByTagName("html")[0].firstChild);
                            document.body.style.overflow = "hidden";
                            
                            // Fade out loading
                            setTimeout(() => {
                                loading.classList.add("fadeOut");
                                setTimeout(() => {
                                    loading.remove();
                                    document.body.style.overflow = "auto";
                                }, 200);
                            }, 2000);
                        }
                    });
                });
            });
        }
    });
})

// Update UI.
setTimeout(() => {

    document.querySelector("#nav-home > div").innerHTML = '<svg fill="currentColor" width="30px" height="30px" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"></path></svg>';
    document.querySelector("#nav-profile > div").innerHTML = '<div><svg fill="currentColor" width="30px" height="30px" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M18.39 14.56C16.71 13.7 14.53 13 12 13s-4.71.7-6.39 1.56C4.61 15.07 4 16.1 4 17.22V18c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-.78c0-1.12-.61-2.15-1.61-2.66zM9.78 12h4.44c1.21 0 2.14-1.06 1.98-2.26l-.32-2.45C15.57 5.39 13.92 4 12 4S8.43 5.39 8.12 7.29L7.8 9.74c-.16 1.2.77 2.26 1.98 2.26z"></path></svg></div>';
    document.querySelector("#nav-message > div").innerHTML = '<div><svg fill="currentColor" width="30px" height="30px" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M20 6h-1v8c0 .55-.45 1-1 1H6v1c0 1.1.9 2 2 2h10l4 4V8c0-1.1-.9-2-2-2zm-3 5V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v13l4-4h9c1.1 0 2-.9 2-2z"></path></svg></div>';
    document.querySelector("#nav-friends > div:nth-child(1)").innerHTML = '<div><svg fill="currentColor" width="30px" height="30px" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M16.67 13.13C18.04 14.06 19 15.32 19 17v3h3c.55 0 1-.45 1-1v-2c0-2.18-3.57-3.47-6.33-3.87z"></path><circle cx="9" cy="8" r="4" fill-rule="evenodd"></circle><path fill-rule="evenodd" d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24C14.5 5.27 15 6.58 15 8s-.5 2.73-1.33 3.76c.42.14.86.24 1.33.24zm-6 1c-2.67 0-8 1.34-8 4v2c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-2c0-2.66-5.33-4-8-4z"></path></svg></div>';

    document.querySelector("#nav-character > div").innerHTML = '<div><svg fill="currentColor" width="30px" height="30px" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M20.75 6.99c-.14-.55-.69-.87-1.24-.75-2.38.53-5.03.76-7.51.76s-5.13-.23-7.51-.76c-.55-.12-1.1.2-1.24.75-.14.56.2 1.13.75 1.26 1.61.36 3.35.61 5 .75v12c0 .55.45 1 1 1s1-.45 1-1v-5h2v5c0 .55.45 1 1 1s1-.45 1-1V9c1.65-.14 3.39-.39 4.99-.75.56-.13.9-.7.76-1.26zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></svg></div>';

    document.querySelector("#nav-inventory > div").innerHTML = '<div><svg fill="currentColor" width="30px" height="30px" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M20 8v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V8c0-1.86 1.28-3.41 3-3.86V3.5C7 2.67 7.67 2 8.5 2s1.5.67 1.5 1.5V4h4v-.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v.64c1.72.45 3 2 3 3.86zM6 13c0 .55.45 1 1 1h9v1c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1z"></path></svg></div>';

    document.querySelector("#nav-trade > div").innerHTML = '<div><svg fill="currentColor" width="30px" height="30px" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M7 7h10v1.79c0 .45.54.67.85.35l2.79-2.79c.2-.2.2-.51 0-.71l-2.79-2.79c-.31-.31-.85-.09-.85.36V5H6c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1V7zm10 10H7v-1.79c0-.45-.54-.67-.85-.35l-2.79 2.79c-.2.2-.2.51 0 .71l2.79 2.79c.31.31.85.09.85-.36V19h11c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1s-1 .45-1 1v3z"></path></svg></div>';

    document.querySelector("#nav-group > div").innerHTML = '<div><svg fill="currentColor" width="30px" height="30px" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M6.32 13.01c.96.02 1.85.5 2.45 1.34C9.5 15.38 10.71 16 12 16s2.5-.62 3.23-1.66c.6-.84 1.49-1.32 2.45-1.34-.72-1.22-3.6-2-5.68-2-2.07 0-4.96.78-5.68 2.01zM4 13c1.66 0 3-1.34 3-3S5.66 7 4 7s-3 1.34-3 3 1.34 3 3 3zm16 0c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8-3c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"></path><path d="M21 14h-3.27c-.77 0-1.35.45-1.68.92-.04.06-1.36 2.08-4.05 2.08-1.43 0-3.03-.64-4.05-2.08-.39-.55-1-.92-1.68-.92H3c-1.1 0-2 .9-2 2v3c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-1.26c1.15.8 2.54 1.26 4 1.26s2.85-.46 4-1.26V19c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-3c0-1.1-.9-2-2-2z"></path></svg></div>';

    document.querySelector("#nav-blog > div").innerHTML = '<div><svg fill="currentColor" width="30px" height="30px" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M14.17 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9.83c0-.53-.21-1.04-.59-1.41l-4.83-4.83c-.37-.38-.88-.59-1.41-.59zM8 15h8c.55 0 1 .45 1 1s-.45 1-1 1H8c-.55 0-1-.45-1-1s.45-1 1-1zm0-4h8c.55 0 1 .45 1 1s-.45 1-1 1H8c-.55 0-1-.45-1-1s.45-1 1-1zm0-4h5c.55 0 1 .45 1 1s-.45 1-1 1H8c-.55 0-1-.45-1-1s.45-1 1-1z"></path></svg></div>';

    document.querySelector("#nav-shop > div").innerHTML = '<div><svg fill="currentColor" width="30px" height="30px" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM2 4h1l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h11c.55 0 1-.45 1-1s-.45-1-1-1H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.67-1.43c-.16-.35-.52-.57-.9-.57H2c-.55 0-1 .45-1 1s.45 1 1 1zm15 14c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></svg></div>';

    document.querySelector("#nav-giftcards > div").innerHTML = '<div><svg fill="currentColor" width="30px" height="30px" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V9c0-.55.45-1 1-1h4.08L7.6 10.02c-.33.45-.23 1.08.22 1.4.44.32 1.07.22 1.39-.22L12 7.4l2.79 3.8c.32.44.95.54 1.39.22.45-.32.55-.95.22-1.4L14.92 8H19c.55 0 1 .45 1 1v5z"></path></svg></div>';

    document.querySelector("#navigation > ul > li.rbx-divider").remove();

    document.querySelector("#right-navigation-header > div.navbar-left.navbar-search.col-xs-5.col-sm-6.col-md-2.col-lg-3.shown > div > div").remove();

    document.querySelector("#navbar-search-input").placeholder = "Type here to search...";

    document.querySelector("#settings-icon").innerHTML = '<svg fill="currentColor" width="30px" height="30px" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M19.5 12c0-.23-.01-.45-.03-.68l1.86-1.41c.4-.3.51-.86.26-1.3l-1.87-3.23c-.25-.44-.79-.62-1.25-.42l-2.15.91c-.37-.26-.76-.49-1.17-.68l-.29-2.31c-.06-.5-.49-.88-.99-.88h-3.73c-.51 0-.94.38-1 .88l-.29 2.31c-.41.19-.8.42-1.17.68l-2.15-.91c-.46-.2-1-.02-1.25.42L2.41 8.62c-.25.44-.14.99.26 1.3l1.86 1.41c-.02.22-.03.44-.03.67s.01.45.03.68l-1.86 1.41c-.4.3-.51.86-.26 1.3l1.87 3.23c.25.44.79.62 1.25.42l2.15-.91c.37.26.76.49 1.17.68l.29 2.31c.06.5.49.88.99.88h3.73c.5 0 .93-.38.99-.88l.29-2.31c.41-.19.8-.42 1.17-.68l2.15.91c.46.2 1 .02 1.25-.42l1.87-3.23c.25-.44.14-.99-.26-1.3l-1.86-1.41c.03-.23.04-.45.04-.68zm-7.46 3.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></svg>'

    document.querySelector("#header > div > ul.nav.rbx-navbar.hidden-xs.hidden-sm.col-md-5.col-lg-4 > li:nth-child(1) > a").innerHTML = '<svg fill="currentColor" width="30px" height="30px" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg><t>Discover</t>'

    document.querySelector("#header > div > ul.nav.rbx-navbar.hidden-xs.hidden-sm.col-md-5.col-lg-4 > li:nth-child(2) > a").innerHTML = '<svg fill="currentColor" width="30px" height="30px" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M22 9h-4.79l-4.39-6.57c-.4-.59-1.27-.59-1.66 0L6.77 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1zM11.99 4.79 14.8 9H9.18l2.81-4.21zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></svg><t>Marketplace</t>'

    document.querySelector("#header > div > ul.nav.rbx-navbar.hidden-xs.hidden-sm.col-md-5.col-lg-4 > li:nth-child(3) > a").innerHTML = '<svg fill="currentColor" width="30px" height="30px" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 11h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H8c-.55 0-1-.45-1-1s.45-1 1-1h3V8c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z"></path></svg><t>Create</t>'

    document.querySelector("#header > div > ul.nav.rbx-navbar.hidden-xs.hidden-sm.col-md-5.col-lg-4 > li:nth-child(4) > a").innerHTML = '<span class="icon-robux-28x28 roblox-popover-close" id="nav-robux"></span><t>Robux</t>'

    if (document.getElementById("Skyscraper-Abp-Left") != undefined) {
        document.getElementById("Skyscraper-Abp-Left").remove();
    }

    if (document.getElementById("Leaderboard-Abp") != undefined) {
        document.getElementById("Leaderboard-Abp").remove();
    }

    try {
        document.querySelector(".scroller.next").remove();
        document.querySelector(".scroller.prev").remove();
    } catch {}

    const GalaxyBloxTab = document.createElement('li');
    GalaxyBloxTab.innerHTML = '<a class="dynamic-overflow-container text-nav" href="/galaxyblox" id="nav-home" target="_self"><div><svg fill="currentColor" width="30px" height="30px" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="m14.43 10-1.47-4.84c-.29-.95-1.63-.95-1.91 0L9.57 10H5.12c-.97 0-1.37 1.25-.58 1.81l3.64 2.6-1.43 4.61c-.29.93.79 1.68 1.56 1.09l3.69-2.8 3.69 2.81c.77.59 1.85-.16 1.56-1.09l-1.43-4.61 3.64-2.6c.79-.57.39-1.81-.58-1.81h-4.45z"></path></svg></div><span class="font-header-2 dynamic-ellipsis-item">Galaxyblox</span></a>'

    document.querySelector(".left-col-list").insertBefore(GalaxyBloxTab, document.querySelector("#navigation > div > div.simplebar-wrapper > div.simplebar-mask > div > div > div > ul > li:nth-child(2)"));

    // Horizontal scroll
    document.querySelectorAll('.horizontal-scroller.games-list').forEach((scrollContainer) => {
        scrollContainer.addEventListener('wheel',function (event) {
            //only vertical scroll
            event.preventDefault();
            if (event.deltaY > 0) { 
                smoothScroll(scrollContainer, 100, 100)
            } else {
                smoothScroll(scrollContainer, 100, 100)
            }
          });
          function smoothScroll (domElement,pixel,delay) {
            const intervalToRepeat = 25;
            const step = (intervalToRepeat * pixel) / delay;
            if (step < pixel)
            {
                domElement.scrollLeft += step;
                setTimeout(function (){
                    smoothScroll(domElement,pixel - step,delay)
              }, intervalToRepeat);
            } else {
                domElement.scrollLeft -= step;
                setTimeout(function (){
                    smoothScroll(domElement,pixel - step,delay)
              }, intervalToRepeat);
            }
          }
    });
    
    if (window.location.pathname.startsWith("/galaxyblox")) {
        document.querySelector(".content").innerHTML = `
        <div class='gb-content'>
        <img src='https://media.discordapp.net/attachments/1137055496155709480/1137056343048597524/5445590_kopia_3_kopia.jpg?width=1141&height=355' width="1200px" height="200px" style="object-fit: cover; border-radius: 10px; margin: 10px;">
        <img src='https://cdn.discordapp.com/attachments/1137055496155709480/1137347531194503178/MicrobloxRounded.png' width='70px' height='70px'>
        <h1>Galaxyblox settings</h1>
        <div class='gb-container'>
        <h2>Robux currency</h2>
        <select class='gb-select' id="RobuxCurrencySelect">
        <option>
        Disable
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
        <label class="switch">
            <input type="checkbox" checked id="CustomCursorCheckbox">
            <span class="slider round"></span>
        </label>
        Enable custom cursor
        </div>
        </div>`;

        // Custom cursor checkbox
        chrome.storage.local.get(["cursor"]).then((i) => {
            if (i["cursor"] == undefined || i["cursor"] == null || i["cursor"] == true) {
                document.getElementById("CustomCursorCheckbox").checked = true;
            } else {
                document.getElementById("CustomCursorCheckbox").checked = false;
            }
        });
        document.getElementById("CustomCursorCheckbox").addEventListener("change", () => {
            chrome.storage.local.set({"cursor": document.getElementById("CustomCursorCheckbox").checked}).then(() => {window.location.reload()});
        });
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
                RobuxCurrency.innerHTML = `(${0.05 * Number.parseInt(RobuxCount.textContent)} zł)`
            } else if (RobloxCurrencySelect.value == "USD") {
                RobuxCurrency.innerHTML = `(${0.01 * Number.parseInt(RobuxCount.textContent)} USD)`
            } else if (RobloxCurrencySelect.value == "Disable") {
                document.querySelector(".rbx-currency").textContent = "";
            }
        });
    }

    const UserBanners = [
        "https://cdn.discordapp.com/attachments/1126219611365458010/1138069282840907907/5445590_kopia_3_kopia.png",
        "https://cdn.discordapp.com/attachments/1126219611365458010/1138084566582710343/pngtree-purple-beautiful-romantic-cool-fresh-banner-background-image_156587.png",
        "https://cdn.discordapp.com/attachments/1126219611365458010/1138084950348935198/abstract-purple-hexagonal-background-illustration-free-vector.png"
    ]

    if (window.location.pathname.startsWith("/users/")) {
        const userID = window.location.pathname.split("/")[2]
        fetch(API_URL + "/users/fetch?user=" + userID).then((res) => {
            res.text().then((data) => {

                const banner = document.createElement("div");
        
                banner.className = "mb-banner"
                banner.innerHTML = `<img src='${JSON.parse(data)["banner"]}'>`
        
                document.querySelector("#container-main > div.content > div.profile-container.ng-scope > div").insertBefore(banner, document.querySelector("#container-main > div.content > div.profile-container.ng-scope > div").firstChild);
        
                function AddBannerButton() {
                    const EditBannerButton = document.createElement("div");
                    EditBannerButton.innerHTML = '<svg focusable="false" width="20px" height="20px" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24"><path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>';
            
                    EditBannerButton.addEventListener("click", () => {
            
                        var SelectedBanner = 0; //UserBanners.indexOf(JSON.parse(data)["banner"]);
                        const BannerPopup = document.createElement("div");
            
                        function NextBanner() {
                            if (SelectedBanner < UserBanners.length - 1) {
                                SelectedBanner++;
                                document.querySelector(".mb-b").innerHTML = `<img src='${UserBanners[SelectedBanner]}'>`
                            }
                        }
                        function PrevBanner() {
                            if (SelectedBanner > 0) {
                                SelectedBanner--;
                                document.querySelector(".mb-b").innerHTML = `<img src='${UserBanners[SelectedBanner]}'>`
                            }
                        }
            
                        BannerPopup.innerHTML = `<div><h1>Change your <g>profile banner</g></h1><div class="mb-banner prev"><div class="prev"><svg focusable="false" fill="currentColor" width="40px" height="40px" aria-hidden="true" viewBox="0 0 24 24"><path d="M12.29 8.71 9.7 11.3c-.39.39-.39 1.02 0 1.41l2.59 2.59c.63.63 1.71.18 1.71-.71V9.41c0-.89-1.08-1.33-1.71-.7z"></path></svg></div><div class="mb-b"></div><div class="next"><svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width="40px" height="40px"><path d="m11.71 15.29 2.59-2.59c.39-.39.39-1.02 0-1.41L11.71 8.7c-.63-.62-1.71-.18-1.71.71v5.17c0 .9 1.08 1.34 1.71.71z"></path></svg></div></div><div class="section profile-header "> <div class="section-content profile-header-content ng-scope" <div=""> <div class="avatar avatar-headshot-lg card-plain profile-avatar-image"><span class="avatar-card-link avatar-image-link"> <thumbnail-2d class="avatar-card-image profile-avatar-thumb ng-scope ng-isolate-scope mb-avatar"><span class="thumbnail-2d-container"> <img class="ng-scope ng-isolate-scope" src="https://cdn.discordapp.com/attachments/1126219611365458010/1138083482455781426/Png.png"></span></thumbnail-2d> </span> </div><div class="header-caption"> <div class="header-names"> <div class="header-title"> <h1 class="profile-name text-overflow"> Nickname </h1> <h1 class="profile-name text-overflow font-header-1"> Nickname </h1> </div><div class="profile-display-name font-caption-body text text-overflow"> @Username </div></div></div></div></div><button class="primary" id="SetBannerButton">Set banner</button></div>`
                        
                        BannerPopup.className = "setup";
                        document.body.style.overflow = "hidden";
                        document.getElementsByTagName("html")[0].insertBefore(BannerPopup, document.getElementsByTagName("html")[0].firstChild);
    
                        document.querySelector(".mb-b").innerHTML = `<img src='${UserBanners[SelectedBanner]}'>`
            
                        document.getElementById("SetBannerButton").addEventListener("click", () => {
                            document.querySelector(".setup").classList.add("fadeOut");
                            setTimeout(() => {
                                document.querySelector(".setup").remove();
                                document.body.style.overflow = "auto";

                                fetch(API_URL + "/users/fetch?user=" + uid).then((res) => {
                                    res.text().then((data) => {
                                        banner.innerHTML = `<img src='${JSON.parse(data)["banner"]}'>`
                                        AddBannerButton();
                                    });
                                });
                                
                            }, 200);
                            
                            fetch(API_URL + "/users/setbanner?user=" + uid + "&banner=" + SelectedBanner);
                        });
            
                        document.querySelector(".mb-banner div.prev").addEventListener("click", () => {
                            PrevBanner();
                        });
                        document.querySelector(".mb-banner div.next").addEventListener("click", () => {
                            NextBanner();
                        });
                    });
                    banner.append(EditBannerButton);
                }
                if (uid == userID) {AddBannerButton();}
            });
        })
    }

    if (window.location.pathname.startsWith("/users/4186880529") || window.location.pathname.startsWith("/users/651306060")) {
        const div = document.createElement("div");
        document.querySelector(".ng-scope.ng-isolate-scope").classList.add("mb-avatar");
        div.innerHTML = `<div><img src="https://cdn.discordapp.com/attachments/1137055496155709480/1137347531194503178/MicrobloxRounded.png" width="40px" height="40px">CEO of Galaxyblox</div>`;
        div.classList = "mb-popup"

        document.querySelector(".profile-header-top").appendChild(div);
    } else if (window.location.pathname.startsWith("/users/")) {

        if (CEO) {
            const userID = window.location.pathname.split("/")[2]
            const div = document.createElement("div");
            document.querySelector(".ng-scope.ng-isolate-scope").classList.add("mb-avatar");
            div.innerHTML = `<div><img src="https://cdn.discordapp.com/attachments/1137055496155709480/1137347531194503178/MicrobloxRounded.png" width="40px" height="40px">Admin menu </div>`;
            const button = document.createElement("button");
            
            function CheckBanOption() {
                fetch(API_URL + "/users/fetch?user=" + userID).then((res) => {
                    res.text().then((data) => {
                        if (data == "404" || JSON.parse(data)["banned"] == false) {
                            button.textContent = "Ban from Galaxyblox"
                            button.style.marginLeft = "10px";
                            button.onclick = () => {
                                const reason = prompt("Type reason.")
                                if (reason == null) {return;}
                                fetch(API_URL + `/users/ban?user=${userID}&reason=${reason == '' ? "Not specified" : reason}`);
                                CheckBanOption();
                            };
                        } else if (JSON.parse(data)["banned"] == true) {
                            button.textContent = "Unban from Galaxyblox"
                            button.style.marginLeft = "10px";
                            button.onclick = () => {
                                fetch(API_URL + "/users/unban?user=" + userID);
                                CheckBanOption();
                            };
                        }
                        div.append(button);
                        div.classList = "mb-popup"
                        document.querySelector(".profile-header-top").appendChild(div);
                    });
                });
            }
            CheckBanOption();
        }
    }

}, 1000);

setTimeout(() => {
    Array.from(document.getElementsByClassName("game-card-link")).forEach((card) => {
        const s = document.createElement("a");
        s.href = "javascript:;";
        s.innerHTML = `<button class="btn-common-play-game-lg min" onclick="Roblox.GameLauncher.joinPrivateGame('${new URLSearchParams(card.href).get("placeId")}', '', null);"><svg fill="currentColor" width="20px" height="20px" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PlayArrowRoundedIcon"><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"></path></svg></button>`;
        card.appendChild(s);
    });
}, 3000);