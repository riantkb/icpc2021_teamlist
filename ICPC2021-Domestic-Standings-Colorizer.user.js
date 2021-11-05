// ==UserScript==
// @name         ICPC 2021 Domestic Standings Colorizer
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  ICPC 2021 Domestic Standings Colorizer
// @author       riantkb
// @match        http://www.yamagula.ic.i.u-tokyo.ac.jp/icpc2021/standings.html
// @grant        none
// @updateURL    https://github.com/riantkb/icpc2021_teamlist/raw/master/ICPC2021-Domestic-Standings-Colorizer.user.js
// ==/UserScript==


function main() {
    console.log("main")
    var matches = document.querySelectorAll("td.main > div > table > tbody > tr > td:nth-child(3)");
    if (matches.length == 0) {
        setTimeout(main, 300);
        return;
    }
    fetch("https://raw.githubusercontent.com/riantkb/icpc2021_teamlist/master/teams.json", {cache: "no-store"}).then(res => {res.json().then(team_dic => {
        for (const e of matches) {
            if (e == null) continue;
            var tname = e.innerText.split("\n")[0];
            if (tname in team_dic) {
                e.innerHTML = e.innerHTML.replace(tname, `${tname} (${team_dic[tname][0]})<br>${team_dic[tname].slice(1).join(', ')}`)
            }
        }
        for(let e of document.getElementsByClassName('user-red'    )){e.style.color="#FF0000"};
        for(let e of document.getElementsByClassName('user-orange' )){e.style.color="#FF8000"};
        for(let e of document.getElementsByClassName('user-yellow' )){e.style.color="#C0C000"};
        for(let e of document.getElementsByClassName('user-blue'   )){e.style.color="#0000FF"};
        for(let e of document.getElementsByClassName('user-cyan'   )){e.style.color="#00C0C0"};
        for(let e of document.getElementsByClassName('user-green'  )){e.style.color="#008000"};
        for(let e of document.getElementsByClassName('user-brown'  )){e.style.color="#804000"};
        for(let e of document.getElementsByClassName('user-gray'   )){e.style.color="#808080"};
        for(let e of document.getElementsByClassName('user-unrated')){e.style.color="#000000"};
        for(let e of document.getElementsByClassName('user-admin'  )){e.style.color="#C000C0"};
    }).catch(e => {
        setTimeout(main, 3000);
    }).catch(e => {
        setTimeout(main, 3000);
    })})
}


(function() {
    'use strict';
    // Your code here...

    setTimeout(main, 500);
})();
