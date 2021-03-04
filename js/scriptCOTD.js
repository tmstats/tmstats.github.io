
var entry = window.location.hash;
window.type=entry.slice(1,5)
window.toppp = entry.slice(5)

var URL = "https://trackmaniastats.herokuapp.com/api/COTDRankings";
$.getJSON(URL, function(json) {
window.json = json
 p = document.getElementById("dataStatus")
 p.innerHTML = "Data collected, you can now use the leaderboard. <i>(use ctrl+f to search for a player for now)"
 showXRanking(window.toppp )
});



var RankingButton = document.getElementById("RankingButton");
var i;

var nbOpenRanking = 0;


RankingButton.addEventListener("click", function() {
    nbOpenRanking ++;
    if (nbOpenRanking%2 == 0){
      var plusMinus = document.getElementById("plusMinusRanking");
    plusMinus.innerHTML = "+"
  }else{
    var plusMinus = document.getElementById("plusMinusRanking");
    plusMinus.innerHTML = "-"
  }
    
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight +"px";
    } 
  });




function changeType(argument) {
    window.type=argument;
    showXRanking(window.toppp)
    if (window.type == "last"){
        th = document.getElementById("last")
        th.setAttribute("style", "background-color: lightblue;")

        document.getElementById("last").onmouseover = function() 
    {
        this.style.backgroundColor = "lightblue";
    }
    document.getElementById("last").onmouseleave = function() 
    {
        this.style.backgroundColor = "lightblue";
    }

        th = document.getElementById("best")
        th.setAttribute("style", "background-color: lightgrey;")

        document.getElementById("best").onmouseover = function() 
    {
        this.style.backgroundColor = "lightgreen";
    }
    document.getElementById("best").onmouseleave = function() 
    {
        this.style.backgroundColor = "lightgrey";
    }

    }else if (window.type == "best"){
        th = document.getElementById("best")
        th.setAttribute("style", "background-color: lightblue;")

        document.getElementById("best").onmouseover = function() 
    {
        this.style.backgroundColor = "lightblue";
    }
    document.getElementById("best").onmouseleave = function() 
    {
        this.style.backgroundColor = "lightblue";
    }
        th = document.getElementById("last")
        th.setAttribute("style", "background-color: lightgrey;")

        document.getElementById("last").onmouseover = function() 
    {
        this.style.backgroundColor = "lightgreen";
    }
    document.getElementById("last").onmouseleave = function() 
    {
        this.style.backgroundColor = "lightgrey";
    }
    }

    

}
function showXRanking(x){
    window.toppp = x;
    th = document.getElementById("120")
    th.setAttribute("style", "background-color: lightgrey;")
    th.onmouseleave = function() 
    {
        this.style.backgroundColor = "lightgrey";
    }
    th.onmouseover = function() 
    {
        this.style.backgroundColor = "lightgreen";
    }

    th = document.getElementById(window.type)
    th.setAttribute("style", "background-color: lightblue;")

    for (var i = 10; i < 120; i = i+10){
        th = document.getElementById(i)
        th.setAttribute("style", "background-color: lightgrey;")
        document.getElementById(i).onmouseover = function() 
    {
        this.style.backgroundColor = "lightgreen";
    }
    document.getElementById(i).onmouseleave = function() 
    {
        this.style.backgroundColor = "lightgrey";
    }
    }

    th = document.getElementById(x)
    th.setAttribute("style", "background-color: lightblue;")
    th.onmouseleave = function() 
    {
        this.style.backgroundColor = "lightblue";
    }
    th.onmouseover = function() 
    {
        this.style.backgroundColor = "lightblue";
    }

    

    

    
    //console.log(window.type)
    if (window.type=="last"){
        text = "lastly played"
        json = window.json
        //var x = document.getElementById("Selector").value

        div = document.getElementById("tableCOTD")
        var top = json["last"][x]

        div.innerHTML = "<br><b style='text-align:center; width:100%;'>Leaderboard  on " + x + " COTD. "+String(top.length)+" players ranked by "+ text+ " COTD.</b>" 

        

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
        //console.log(u)

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
        path = "#last"+x
        //path = curentLocation + "#"+name
        window.location.href = path ;
        //div.setAttribute("display", "none"); 
        
        //var divContainerr = document.getElementById(id);
        //divContainerr.innerHTML = "";
        //playerdiv.appendChild(divo)   
}else{
    div.innerHTML = "No player has played that much COTD yet lol"
}
}else if(window.type=="best"){

    json = window.json
        //var x = document.getElementById("Selector").value
        text = "best ranked"
        div = document.getElementById("tableCOTD")
        

        var top = json["best"][x]

        div.innerHTML = "<br><b style='text-align:center; width:100%;'>Leaderboard  on " + x + " COTD. "+String(top.length)+" players ranked by "+ text+ " COTD.</b>" 

        

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
            tr.setAttribute("style", "font-size:18px;");

            for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }


        u = top.length
        //console.log(u)

        for (var i = 0; i < u; i++) {

            var tr = table.insertRow(-1);  

            var td = document.createElement("td");    
            tr.setAttribute("style", "max-width:30px");
            td.innerHTML = "<b>"+String(i+1)+"</b>";
            tr.appendChild(td);

            var td = document.createElement("td");  
            tr.setAttribute("style", "max-width:50px");
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
        path = "#best"+x
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
}

