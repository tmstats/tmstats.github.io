
var entry = window.location.hash;
toppp = entry.slice(1)

var URL = "https://trackmaniastats.herokuapp.com/api/COTDRankings";
$.getJSON(URL, function(json) {
window.json = json
 p = document.getElementById("dataStatus")
 p.innerHTML = "Data collected, you can now use the leaderboard."
 showXRanking(toppp)
});

function showXRanking(x){
        json = window.json
        //var x = document.getElementById("Selector").value

        div = document.getElementById("tableCOTD")

        var top = json[x]

        div.innerHTML = "<p style:'text-align:center;'>Leaderboard on the last " + x + " COTD played by the players (they are "+String(top.length)+").</p>" 

        

        if (top.length!=0){

        
        var col = ["Rank","Player","Average position (top %)","Average position (actual position)"];
        
        //console.log(col);
        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        table.setAttribute("class", "styled-table");
        table.setAttribute("style", "width:100%;");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        // TABLE ROW.
            var tr = table.insertRow(-1); 

            for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }


        u = top.length
        console.log(u)

        for (var i = 0; i < u; i++) {

            var tr = table.insertRow(-1);  

            var td = document.createElement("td");    
            td.innerHTML = i+1;
            tr.appendChild(td);

            var td = document.createElement("td");  
            var a = document.createElement("a");
            a.target = "_blank";
            a.style.color = "blue";
            a.href = "https://tmstats.github.io/#"+ top[i].playerName ;
            a.innerHTML = top[i].playerName

            td.appendChild(a);
            //iner = 'test'
            tr.appendChild(td);

            var td = document.createElement("td");    
            td.innerHTML = top[i].averagePositionRelative + " %";
            tr.appendChild(td);

            var td = document.createElement("td");    
            td.innerHTML = top[i].averagePosition;
            tr.appendChild(td);

        }

        //var divContainerr = document.getElementById(id);
        //divContainerr.innerHTML = "";
        div.appendChild(table);
        path = "#"+x
        //path = curentLocation + "#"+name
        window.location.href = path ;
        //div.setAttribute("display", "none"); 
        
        //var divContainerr = document.getElementById(id);
        //divContainerr.innerHTML = "";
        //playerdiv.appendChild(divo)   
}else{
    div.innerHTML = "No player has played that much COTD yet lol"
}
}

