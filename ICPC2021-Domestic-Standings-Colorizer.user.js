// ==UserScript==
// @name         ICPC 2021 Domestic Standings Colorizer
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  ICPC 2021 Domestic Standings Colorizer
// @author       riantkb
// @match        http://www.yamagula.ic.i.u-tokyo.ac.jp/icpc2021/standings.html
// @grant        none
// @updateURL    https://github.com/riantkb/icpc2021_teamlist/raw/master/ICPC2021-Domestic-Standings-Colorizer.user.js
// ==/UserScript==


function main() {
    console.log("main")
    var lines = document.querySelectorAll("td.main > div > table > tbody > tr");
    if (lines.length == 0) {
        setTimeout(main, 300);
        return;
    }
    // var matches = document.querySelectorAll("td.main > div > table > tbody > tr > td:nth-child(3)");
    // var univ_matches = document.querySelectorAll("td.main > div > table > tbody > tr > td:nth-child(4)");
    // if (univ_matches.length == 0) {
    //     setTimeout(main, 300);
    //     return;
    // }
    fetch("https://raw.githubusercontent.com/riantkb/icpc2021_teamlist/master/teams.json", {cache: "no-store"}).then(res => {res.json().then(team_dic => {
        var first;
        first = true;
        for (const e of lines) {
            if (first) {
                first = false;
                continue
            }
            if (e == null) continue;
            var a = e.querySelector('td:nth-child(3)')
            if (a != null) continue;
            var tname = a.innerText.split("\n")[0];
            if (tname in team_dic) {
                a.innerHTML += ` (${team_dic[tname][0]})<br>${team_dic[tname].slice(1).join(', ')}`
            }
        }
        var univ_count = [];
        first = true;
        for (const e of lines) {
            if (first) {
                first = false;
                continue
            }
            if (e == null) continue;
            var a = e.querySelector('td:nth-child(4)')
            if (a != null) continue;
            var uname = a.innerText.split("\n")[0];
            if (uname in univ_count) {
                univ_count[uname] += 1;
            } else {
                univ_count[uname] = 1;
            }
        }
        var univ_rank = [];
        var pass_count = 0;
        var host = "Keio University";
        first = true;
        for (const e of lines) {
            if (first) {
                first = false;
                continue
            }
            if (e == null) continue;
            var a = e.querySelector('td:nth-child(4)')
            if (a != null) continue;
            var uname = a.innerText.split("\n")[0];
            var urank;
            if (uname in univ_rank) {
                urank = univ_rank[uname] + 1;
            } else {
                urank = 1;
            }
            univ_rank[uname] = urank;
            a.innerText += ` (${urank}/${univ_count[uname]})`

            var pass = 0;
            if (pass_count < 10) {
                pass = 1;
            } else if(pass_count < 20) {
                if (urank <= 3) pass = 1;
            } else if(pass_count < 30) {
                if (urank <= 2) pass = 1;
            } else if(pass_count < 39) {
                if (urank <= 1) pass = 1;
            }
            if(pass == 0 && uname == host) {
                pass = 2;
                host = "";
            }
            if (pass > 0) {
                var b = e.querySelector('td:nth-child(1)')
                b.setAttribute('bgcolor', '#AAE0AA')
                if (pass == 1) {
                    pass_count++;
                }
                else {
                    b.innerHTML += '*'
                }
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

