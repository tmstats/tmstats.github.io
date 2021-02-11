
$.getJSON('https://trackmaniastats.herokuapp.com/api/totalPlayer', function(json) {
      
        var p = document.getElementById("totalPlayer");
        p.innerHTML = json.totalPlayer;

});




function wait(playerID){
$.getJSON('https://trackmaniastats.herokuapp.com/api/playerProfiles/'.concat(playerID), function(data) {
      
      var text = `Date: ${data.playerID}<br>
                    Time: ${data.time}<br>
                    Unix time: ${data.milliseconds_since_epoch}`
                    
        
        $(".playerProfile").html(text);
    });

}



function searchPlayer(){
string  = document.getElementById("fname").value; 
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
            var a = document.createElement("a"); 
            a.setAttribute("href", "#playerProfile");
            
            input.innerHTML = "see profile";
            input.appendChild(a);
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

		var p = document.createElement("p")
		p.innerHTML ="<hr>"
		$(document.getElementById("playerProfile").appendChild(p))

		name = json.playerNames[0].playerName
		var h3 = document.createElement("h3")
		h3.innerHTML =name+"'s profile"
		$(document.getElementById("playerProfile").appendChild(h3))

		var h3 = document.createElement("h3")
		h3.innerHTML ="CotD results:"
		$(document.getElementById("playerProfile").appendChild(h3))


		var h4 = document.createElement("h4")
		h4.innerHTML ="Pseudo history:"
		$(document.getElementById("playerProfile").appendChild(h4))


		var div = document.createElement("div")
		div.setAttribute("id", "playerNames");
		$(document.getElementById("playerProfile").appendChild(div))


		// EXTRACT VALUE FOR HTML HEADER. 
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        var col = ["Pseudo","Used since"];
        


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


        
        
        for (var i = 0; i < json.playerNames.length; i++) {

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
        var divContainer = document.getElementById("playerNames");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);



        var h4 = document.createElement("h4")
		h4.innerHTML ="<br>Player's COTD results:"
		$(document.getElementById("playerProfile").appendChild(h4))


        var div = document.createElement("div")
		div.setAttribute("id", "cotdResults");
		$(document.getElementById("playerProfile").appendChild(div))


		var col = ["date","Global Rank / Total player","Server","Server Rank"];
        
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


		for (var i = 0; i < json.results.cotd.length; i++) {

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

        var divContainer = document.getElementById("cotdResults");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);


		//$("#playerID").html(json.playerID);
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