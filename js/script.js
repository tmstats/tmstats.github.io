
//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 100;  //time in ms, 5 second for example
var $input = $('#player');

//on keyup, start the countdown
$input.on('keyup', function () {
entry = document.getElementById("player").entries().length();
         If (entry>1){
        clearTimeout(typingTimer);
        typingTimer = setTimeout(searchPlayer, doneTypingInterval);
}
});

//on keydown, clear the countdown 
$input.on('keydown', function () {
  clearTimeout(typingTimer);
});





$.getJSON('https://trackmaniastats.herokuapp.com/api/totalPlayer', function(json) {
      
        var p = document.getElementById("totalPlayer");
        p.innerHTML = json.totalPlayer;

});


$.getJSON('https://trackmaniastats.herokuapp.com/api/numberNewCOTDPlayers', function(json) {
      
        var p = document.getElementById("numberNewPlayers");
        p.innerHTML = json.numberNewCOTDPlayers;

});

function showNewPlayers(){
$.getJSON('https://trackmaniastats.herokuapp.com/api/newCOTDPlayers', function(json) {
      
        //var section = document.getElementById("FunFacts");
        var p = document.getElementById("newPlayers");
        //var p = document.createElement("p");

        p.innerHTML = "<b>Please welcome: </b>"

        var result = [];

        for(var i in json){
            result.push([i, json[i]]);
        }

        //console.log(result[0][0])

        for (var i = 0; i < result.length; i++) {
            //console.log("yes")
            if ((i)  == (result.length-1)){
                p.innerHTML = p.innerHTML + String(result[i][0]) +"."
            }else{
            p.innerHTML = p.innerHTML + String(result[i][0] +" // ")
            }

        }

        //section.appendChild(p);

});
}

$.getJSON('https://trackmaniastats.herokuapp.com/api/numberNewNamePlayers', function(json) {
      
        var p = document.getElementById("numberNewNamePlayers");
        p.innerHTML = json.numberNewNamePlayers;

});

function showNewNamePlayers(){
$.getJSON('https://trackmaniastats.herokuapp.com/api/newNamePlayers', function(json) {
      
        //var section = document.getElementById("FunFacts");
        var p = document.getElementById("newNamePlayers");
        //var p = document.createElement("p");

        p.innerHTML = "<b>OLD  → NEW : </b>"

        var result = [];

        for(var i in json){
            result.push([i, json[i]]);
        }

        for (var i = 0; i < result.length; i++) {
            if ((i)  == (result.length-1)){
                p.innerHTML = p.innerHTML + String(result[i][1]) +" → " + String(result[i][0]) + "."
            }else{
            p.innerHTML = p.innerHTML + String(result[i][1]) +" → " + String(result[i][0]) + " // "
            }

        }


});
}



function wait(playerID){
$.getJSON('https://trackmaniastats.herokuapp.com/api/playerProfiles/'.concat(playerID), function(data) {
      
      var text = `Date: ${data.playerID}<br>
                    Time: ${data.time}<br>
                    Unix time: ${data.milliseconds_since_epoch}`
                    
        
        $(".playerProfile").html(text);
    });

}



function searchPlayer(){
string  = document.getElementById("player").value; 
$.getJSON('https://trackmaniastats.herokuapp.com/api/searchPlayer/'.concat(string), function(json) {

		var p = document.getElementById("numberofresult");
		var count = 0;
		for (k in json) if (json.hasOwnProperty(k)) count++;
		string =  count + " player(s) found"
        p.innerHTML = string;

		CreateTableFromJSON(json);
    });

}


function CreateTableFromJSON(json) {

        // EXTRACT VALUE FOR HTML HEADER. 
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        var col = [];
        
            for (var key in json) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }

		//console.log(json); 
        //console.log(col); 


        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        // TABLE ROW.

        var tr = table.insertRow(-1);  
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = "<i>Player name</i>";
        tr.appendChild(th);
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = "<i>Player ID</i>";
        tr.appendChild(th);
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = "<i>See profile</i>";
        tr.appendChild(th);
        
        for (var i = 0; i < col.length; i++) {
        	var tr = table.insertRow(-1);  
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);

            var td = document.createElement("td"); 
            //console.log(col[i]); 
            //console.log(json[col[i]]); 
            td.innerHTML = json[col[i]];
            tr.appendChild(td);

            var input = document.createElement("td"); 

            input.type = "button";
            input.value = "see profile";
            input.setAttribute("class", "profileButton");
            

            path = "seeProfile('"+json[col[i]]+"')"
            //console.log(path); 
            input.setAttribute("onclick", path);
            //input.onclick = seeProfile(json[col[i]]);

            
            input.innerHTML = '<a href="#playerProfile" style="color: blue; text-decoration: none;"> see profile</a>';
            
            //console.log(input);
            tr.appendChild(input);
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }



function seeProfile(playerID){
URL = "https://trackmaniastats.herokuapp.com/api/playerProfiles/"+playerID

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
            console.log("here")
            console.log(i)
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

        var div = document.createElement("div")
        id = "cotdResults" + name
		div.setAttribute("id", id);
		//$(document.getElementById("playerProfile").appendChild(div))
        playerdiv.appendChild(div)

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

        $(document.getElementById("playerProfile").appendChild(playerdiv))

        path = "#"+name
        window.location.href = path ;

		//$("#playerID").html(json.playerID);
    

}
});
}






$(document).ready(function() {
    $('.searchPlayer').keydown(function(event) {
        if (event.which == 13) {
            searchPlayer();
            event.preventDefault();
         }
    });
});
