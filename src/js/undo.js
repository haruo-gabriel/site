import { getSiteHtml } from './save.js';

var old_html = "";


function saveOldHtml() {
    console.log("Old html saved");
    old_html = getSiteHtml();
}


function undo() {
    if (old_html != "") {
        loadSiteHtml(old_html);
    }
    else {
        console.log("No previous state to load");
    }
}