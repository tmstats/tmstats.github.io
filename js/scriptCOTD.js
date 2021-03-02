
function seeProfile(playerID){
URL = "https://trackmaniastats.herokuapp.com/api/COTDRankings"+playerID

$.getJSON(URL, function(json) {
name = json.playerNames[json.playerNames.length - 1].playerName
if (document.getElementById(name) == null){

        var playerdiv = document.createElement("div")
        playerdiv.setAttribute("id", name);
        playerdiv.setAttribute("class", 'players');

        var p = document.createElement("p")
        if (document.getElementById('playerProfile').children.length > 0) {
            //console.log("yo")
            //console.log(document.getElementById('playerProfile').children.length)
            p.innerHTML ="<hr>"
        }

        else{
            //console.log("hi")
            p.innerHTML =""
        }
        
        //$(document.getElementById("playerProfile").appendChild(p))
        playerdiv.appendChild(p)
        
        var h3 = document.createElement("h3")
        h3.setAttribute("style", "font-weight:bold;");
        h3.innerHTML =name+"'s profile"
        //$(document.getElementById("playerProfile").appendChild(h3))
        playerdiv.appendChild(h3)

        var p = document.createElement("p")
        text = 'Trackmania.io profile: <a target="_blank" href="https://trackmania.io/#/player/' + playerID +'">https://trackmania.io/#/player/'+ playerID+ '</a>'
        p.innerHTML = text
        //$(document.getElementById("playerProfile").appendChild(p))
        playerdiv.appendChild(p)

        var h4 = document.createElement("h4")
        h4.innerHTML ="Pseudo history:"
        //$(document.getElementById("playerProfile").appendChild(h4))
        playerdiv.appendChild(h4)

        var div = document.createElement("div")
        profilepath = name+"Profile"
        div.setAttribute("id", profilepath);
        //$(document.getElementById("playerProfile").appendChild(div))
        playerdiv.appendChild(div)

        // EXTRACT VALUE FOR HTML HEADER. 
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        var col = ["Pseudo","Using since"];
        


        //console.log(json); 
        //console.log(col); 


        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        // TABLE ROW.
            var tr = table.insertRow(-1); 

            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = "Pseudo";
            tr.appendChild(th);

            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = "Used since";
            tr.appendChild(th);


        
        o = json.playerNames.length -1 
        //console.log(o)
        for (var i = o; i >= 0; i--) {
            //console.log("here")
            //console.log(i)
            //console.log("1")
            var tr = table.insertRow(-1);  
            var td = document.createElement("td");    
            //console.log(json.playerNames[i]); 
            td.innerHTML = json.playerNames[i].playerName;
            tr.appendChild(td);

            var td = document.createElement("td");      // TABLE HEADER.
            td.innerHTML = json.playerNames[i].sinceDate;
            tr.appendChild(td);

        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        //var divContainer = document.getElementById(profilepath);
        //divContainer.innerHTML = "";
        div.appendChild(table);


        var h3 = document.createElement("h3")
        
        h3.innerHTML ="<br>CotD results:"

        h3.setAttribute("style", "text-decoration: underline;");
        //$(document.getElementById("playerProfile").appendChild(h3))
        playerdiv.appendChild(h3)

    
        var divv = document.createElement("div")
        divv.setAttribute("style", "height: 370px; max-width: 920px; margin: 0px auto;");
        id = "chartContainer"+ name
        divv.setAttribute("id", id);
        playerdiv.appendChild(divv)

        var p = document.createElement("p")
        p.innerHTML ="<br>green → top 8 ; gold → top 24 ; silver → top 48 ; bronze → top 64"
        p.setAttribute("style", "text-align: center;");

        var pp = document.createElement("p")
        pp.innerHTML ="<br><i>zooming at an extremity can be a bit tricky, try zooming near an end and then select the move tool to go to the desired date.</i>"

        p.appendChild(pp)

        playerdiv.appendChild(p)

        

        var divvv = document.createElement("div")
        divvv.setAttribute("style", "height: 370px; max-width: 920px; margin: 20px auto;");
        id = "chartContainer2"+ name
        divvv.setAttribute("id", id);
        playerdiv.appendChild(divvv)

        var div = document.createElement("div")
        id = "cotdResults" + name
        div.setAttribute("id", id);
        //$(document.getElementById("playerProfile").appendChild(div))
        playerdiv.appendChild(div)



        var p = document.createElement("p")
        
        p.innerHTML ="<br>Raw data (old format):"
        //$(document.getElementById("playerProfile").appendChild(h3))
        playerdiv.appendChild(p)


        var col = ["date","Global Rank / Total players","Server","Server Rank"];
        
        //console.log(col);
        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        // TABLE ROW.
            var tr = table.insertRow(-1); 

            for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        u = json.results.cotd.length-1
        for (var i = u; i >= 0; i--) {

            var tr = table.insertRow(-1);  

            var td = document.createElement("td");    
            td.innerHTML = json.results.cotd[i].date;
            tr.appendChild(td);

            var td = document.createElement("td");    
            td.innerHTML = json.results.cotd[i].globalRank +" / " + json.results.cotd[i].totalPlayer ;
            tr.appendChild(td);

            var td = document.createElement("td");    
            td.innerHTML = json.results.cotd[i].server;
            tr.appendChild(td);

            var td = document.createElement("td");    
            td.innerHTML = json.results.cotd[i].serverRank;
            tr.appendChild(td);

        }

        //var divContainerr = document.getElementById(id);
        //divContainerr.innerHTML = "";
        div.appendChild(table);

        playerdiv.appendChild(div)
        //div.setAttribute("display", "none"); 
        
        //var divContainerr = document.getElementById(id);
        //divContainerr.innerHTML = "";
        //playerdiv.appendChild(divo)



        $(document.getElementById("playerProfile").appendChild(playerdiv))

        //curentLocation = window.location.href 
        //newLocation = curentLocation + "#"+name

        path = "#"+name
        //path = curentLocation + "#"+name
        window.location.href = path ;

        showGraphs(playerID,name)
        //$("#playerID").html(json.playerID);
    

}
});
}


