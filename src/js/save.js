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


document.getElementById("insert-button").addEventListener("click", insertNewElement);

function insertNewElement() {
    console.log("Inserting new element");
    var html = document.getElementById("mutable").innerHTML;
    var newDiv = document.getElementById("preview-content").innerHTML;
    html += newDiv;
    var mutableDiv = document.getElementById("mutable");
    mutableDiv.innerHTML = html;
}


document.getElementById("export-button").addEventListener("click", exportSiteHtml);

function exportSiteHtml() {
    const html = document.getElementById("mutable").innerHTML;
    navigator.clipboard.writeText(html).then(() => {
        console.log('HTML copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
    const alertBox = document.createElement('div');
    alertBox.innerText = 'Content copied to clipboard!';
    alertBox.style.alignContent = 'center';
    alertBox.style.width = '200px';
    alertBox.style.margin = '0 auto';
    alertBox.style.textAlign = 'center';
    alertBox.style.backgroundColor = '#4CAF50';
    alertBox.style.color = 'white';
    alertBox.style.padding = '10px';
    alertBox.style.borderRadius = '5px';
    alertBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    alertBox.style.zIndex = '1000';
    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.style.transition = 'opacity 0.5s';
        alertBox.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(alertBox);
        }, 600);
    }, 600);
}


document.getElementById("insert-fix-button").addEventListener("click", insertFix);

function insertFix() {
    var newHtml = document.getElementById("preview-content").innerHTML;
    var mutableDiv = document.getElementById("mutable");
    mutableDiv.innerHTML = newHtml;
}




//document.getElementById("test").addEventListener("click", addTestDiv);
//
//function addTestDiv() {
//    const testDiv = document.createElement('div');
//    testDiv.innerText = 'Test div';
//    document.getElementById("mutable").appendChild(testDiv);
//    document.getElementById("mutable").appendChild(document.createTextNode('\n'));
//}