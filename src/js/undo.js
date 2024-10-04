var old_html = [];
//var updated_lines = [];

document.getElementById('insert-button').addEventListener('click', saveOldHtml);
document.getElementById('insert-fix-button').addEventListener('click', saveOldHtml);

function saveOldHtml() {
    old_html.push(getSiteHtml());
}


document.getElementById("undo-button").addEventListener("click", undo);

function undo() {
    if (old_html.length > 0) {
        loadSiteHtml(old_html.pop());
    }
    else {
        loadSiteHtml('{"content":""}');
    }
    if (old_html.length > 0) {
        loadSiteHtml(old_html.pop());
    }
    else {
        loadSiteHtml('{"content":""}');
    }
    old_html.push(getSiteHtml());
}


//document.getElementById('insert-button').addEventListener('click', updateUpdatedLines);

//function updateUpdatedLines() {
//    var response = document.getElementById('response').innerText;
//    var numLines = response.split('\n').length;
//    updated_lines.push(numLines);    
//}


//document.getElementById("undo-button").addEventListener("click", undoButGood);

//function undoButGood(){
//    console.log("Undoing...");
//    if (updated_lines.length == 0) {
//        console.log("No previous state to load");
//        return
//    }
//    var html = getSiteHtml();
//    console.log(html);
//    var lines = html.split('\n');
//    var new_html = "";
//    var numLines = updated_lines.pop();
//    for (var i = 0; i < lines.length - numLines; i++) {
//        new_html += lines[i] + '\n';
//    }
//    console.log(new_html);
//    if(updated_lines.length == 0){
//        old_html = "";
//    }
//    loadSiteHtml(new_html);
//}