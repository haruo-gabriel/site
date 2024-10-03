function getSiteHtml() {
    const mutableDiv = document.getElementById("mutable");
    if (mutableDiv) {
        const json = {
            content: mutableDiv.innerHTML
        };
        return JSON.stringify(json);
    } else {
        console.log("Element not found");
    }
}


function loadSiteHtml(json) {
    var mutableDiv = document.getElementById("mutable");
    const loadObj = JSON.parse(json);
    mutableDiv.innerHTML = loadObj.content;   
}