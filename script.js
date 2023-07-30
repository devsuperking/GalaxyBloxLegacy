setTimeout(() => {
    const ads = document.getElementsByClassName("ad-annotations");
    for (var ad = 0; ad < ads.length; ad++) {
        console.log(ad);
        ads[ad].remove();
    }
}, 1000);