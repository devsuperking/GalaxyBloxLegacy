chrome.storage.local.get(["cursor"]).then((i) => {
    if (i["cursor"] == true) {
        document.head.insertAdjacentHTML("beforeend", `<style>a *,button *{cursor:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABNhJREFUWEe9139MlHUcB/D35zk4nrsUQUBBREnTDs4ipS3dtEY2NBFLClKJpasUf4cmLQ1DbRVuVtPcauli+dgCNLRDSQ25/MlUNIf5aw42fih4yCGKjxx3z6c9uN2hu4MLkfvz++Pzed33u+/3830IHn7Fs3guMdYwMIwI/zgUrErIpyOexve0ndxN/DOZ0xTCL9flK6i6exbPBUzmAdpBbXYbxicW0vmeJnM3zy1g/zt8oa71ijHn4gw4uB0BvqG89vkS0pIuN6GA5j1xgCmZ5WM3d4r51VnOXJlRRRiqjzIn7hLinjhg79ssH7NI4q7qtc5cK6NMGKo3mt/cRU8esPstlk9YJPH3GhdghcGEcL3RnLS7DwAFSSyftEhiYa0LsPxZE8J1RnNyYR8A8mayXGaRxD11LsCy0Q8AKXv6ALDzDZZP3ZLEPzoBFo8yYYjOaJ6ztw8AOxJZPtUkiUXXXSuw8BkTwkSjOc3UB4Dc6SyfbpLE/TdcgPkjTQgVjeZ5RX0A2D6N5XKrJBbXuwAfPN0BYAYqWcE2xYJNC8qp/XHvBOdNmJ/M2roWBGUcQP1Pr+OeCjjQ4ALEhWRCQ34I143DEF0MGChmBZ8So+3GQVzNBik9wXQAtsZzhkBYx0B/AFUEDDvXLGkO3XQBOgefMHAJJgavcDUR6ljBJ4sP0s7/i6Ct8ZyqMKQa+RRX3ztKY/xTMMA3AudvSyixuAeoSV4NXs8W27/kS3oY/ZMxyM/AzFjdDuxrseNStpns3mDou8l8xtpeFSvVTIECO0K00UgdWsTnWyQqbfQM6Bxc3ZqksF95iDj2wZYSLKxgQ8Zh2tIdgjbFsVzRIol/N7mSpYYfRK1chs5t3QUK8jUgVIwBQQNDvySE+o0DM7742EyuiuYmCG18heULd3aIR62fO7snBq6FAB8csXq3Ao/GJQiID/4eI/RTHRoHolceo6ue/gB9NYkv194/Pnp/Y5rzRAzWxmKEPoFPNq93+17objXUfn/NcMwKK4V6UlYfp689AjZM4Fw7Wt+T6mOhwOYcJwpBuK/c8iaXxzFzBp+GKAT9lnWCZnsEZI/nFBDySq0LUN126LESPjp5RtA+BPpElWSX0WueAZEsKiG4UddeGnD49vu9Cwg8BH/NyOINp2maR4Da8dmL/I0CJWOfdSpalGu9glBPQ8rACggQt31ZTh92CVgTw+GKBtdqbAfE460LewUQrInF5P4FYEJ6zln6sUuA2rkqhnMAZB5tnYsGx+M//8eK6zFS+66DBAzbeI6udwtYFML9dINQIaM+suTedNjQ1OOV0FEY4vUl0EDcs+kCzewq0EPnPCOaJzHjcKNS5nPSNvehY+m9hvCS7zaEauLaiRH77WWq8BqgDlxu4CXM2NKg/IUz9qVQ0OZ9bgAGIROjfNLVerBu82XK7m6y25tu2SjOUhjrmnGOyh1LcR8et9AZX4AW0UIWhlMqCMgPuobZ3rwRPF61iyN5PgRstuOuXxX/jFrkQXYDEeCLwZiC0fQRnsIINfn24EqkZ8PLctzVEqVH8BhBg80MdHwNtaISd3AJNlg7aq4eEQigsfBh9R2Daias+qGK8rtb9s79XhWbRZH8AhhJCvAyMwxEGAhAfYDUEXCGGYVN/bG74CK5iomXiv8AJX/fMDNo+wAAAAAASUVORK5CYII=") 8 1,pointer!important}*,body{cursor:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABNFJREFUWEe91XtQVHUUB/DvuXvvsq7Csq5AgKn4zHRIJ7XR7OE4iJMIrg/MqbTGJgUfTY2WOmPiIxsdtUwD09q44VgOSpoYSSWiQIiS4ZNMR51UENAFZdnZvbt7mispYTncRfH3387vnPP9zO/+7l3KmcTTScBaJlR4GC+P3U5leISLciZz7eWGclOQFIpAqaPd50Vc3A4qelQGyk5kzqu0oaBqG2b3yYA5INzhZUxMyKQfHwWCvp/EfOCaDd/9tQJmfQRm9c7gEEOUQsDUsZm0va0RtGsic/41G3ZdXnE7q4NowYxe6Xjc2M/r8yHZmkWb2xJBWROYD1bZsPsfgBpmEAIxvccW9AgcwkxYOH4HrWorBGVamQ9V27DnSuMJ3FkSGfBq1GfoGzQCYKyetIvebwsEfWtlb2GVTci+2hyghgkQkdhlDQaY4yEQtrCIpMRM8j5MCG1LYKWw2ib+UPFfQGMQIT4yBUMsr4GBHXo9XknMJPfDQtDWeFaKamxizn0BjVEjw97F8yGzQUBuMGAdu4caHgaC0uNYKb7+pbiv8sMW5w21TEdM2CL1VIqcQFzyXrK32NRCAX3xEitHbshi7rWlmmZFmyYiLmKlej+Oe7wYPWMfVWhqvE8RfT6alVK7LP5UpQ2gzundYRQSItdDh4Dzbh9i5uTShdYiKDWWld/ssvhLtXaAGtbVOAzjIzazKBgriBGblEsnW4OgDTGsHKuVxbwa/wBqWHjAU7BG2mAQzNeJMGZ2Lh32F0Efj2SlrE4W86/7D1DDOkq9YA3/GoFSWL3bA+v8A/SzPwhaM4KV4zdl8dCN1gHUsCCxM+LDMhAsdXX5gMnz82i3VgStfoGVE7dkscDeeoAa1l4XjvjQrQiWomrey6cQzYCVz7Fyql4Wi2q1A4J03dDLaMVjAU/DJHZHO50FAkmNmYzyRQXUVzNg+TBWTjtksfimNkC4fihiLenQQWIGyolwmoFKMOrBcIiMjIXFdFEzIGUoK2ccslhySxugu2EchpvWQQCSlxRTmtag+9XR4iGs/OGUxSP1TYAI/YuIChgHoxCKMsd6VHma3i4BelgtB9W9omUl9OwDAxYNYuWsUxZLG5YiSOiJZzqsRCdxkDq3DoDvpveceW9d7O2He2f1MyQj2jgP7MXwj36nwgdB0IKBrJx1yaLdcwqDjMugEwy3wFjqqkaqZME0QUDaIcebuKrsv5ujJxPiTYUQYMxadYwmPBBgfjRXurk2TC8Eq3+1xW4XpnxS3niJ3unM7SQLLlV5DofkN0xpljPA8AF66l/3utzo++kZ+rO1CJrXn8eAsBjAry4nFmw4R65/D5vXn1MYWLLfmYBa34m7W+2pM0YZ80DQbVp7kpJaDWipcU5PDtFJuHTFl93uqHtus/LB+g2IEMY4G+rQZfNVqmlp1v/tk5amuX04jeGduV8ZgQa+fLfFTAN5uLSTfIxZG89SqpZZ99ZoAsx6gnuTB2cu8lfCKd/ypssIM2J0pervlI3nSNuH5B6BJoDak9ydd/rgHF/C02DHUfXZ40lajK6YCi9h5Kbz1PSa+HEUmgEzu3E3YhSAONJBFyCxCXpY1DcnPfUiveFHZrNSzQC1660I7qST8DYzBoNQT0BW2iV8A1DTV8pPyd9eCccwipqHYQAAAABJRU5ErkJggg==") 8 1,pointer!important}</style>`)
    }
});
chrome.storage.local.get(["alwaysShowNavbar"]).then((i) => {
    if (i["alwaysShowNavbar"] == true) {
        document.getElementById("navigation").classList.add("nav-show");
        document.querySelector("#header-menu-icon").style.display = "none";
        // document.head.insertAdjacentHTML("beforeend", `<style>@media (max-width: 1552px) {.content {margin-left: 220px}}</style>`)
        document.querySelector(".content").style.marginLeft = "235px"
    }
});
setTimeout(() => {
    chrome.storage.local.get(["homeTopBar"]).then((i) => {
        if (i["homeTopBar"] == true) {
            const h = document.createElement("li");
            h.innerHTML = '<a class="font-header-2 nav-menu-title text-header" href="/home"><svg fill="currentColor" width="30px" height="30px" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"></path></svg><t>Home</t></a>'
            h.classList.add("gb-home-top")
            document.querySelector(".rbx-navbar").insertBefore(h, document.querySelector(".rbx-navbar").firstChild)
        }
    });
}, 1000);
setTimeout(() => {
    chrome.storage.local.get(["currency"]).then((i) => {
        const RobuxCurrency = document.createElement("span");
        RobuxCurrency.className = "rbx-currency"
        if (i["currency"] == "PLN") {
            RobuxCurrency.textContent = `(${0.05 * Number.parseInt(document.getElementById("nav-robux-amount").textContent)} zł)`
        } else if (i["currency"] == "USD") {
            RobuxCurrency.textContent = `(${0.01 * Number.parseInt(document.getElementById("nav-robux-amount").textContent)} USD)`
        }
        document.getElementById("nav-robux-icon").appendChild(RobuxCurrency)
    });
}, 1000);