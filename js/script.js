

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

            var td = document.createElement("td");

            var input = document.createElement("td"); 
            input.type = "button";
            input.value = "see profile";
            input.setAttribute("class", "profileButton");
            input.setAttribute("onclick", "seeProfile()");
            //input.onclick = seeProfile(json[col[i]]);
            //td.appendChild(input);
            input.innerHTML = "see profile";
            tr.appendChild(input);
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }



function seeProfile(){
	alert("WIP")
	$(".playerProfile").html(text);
}






$(document).ready(function() {
    $('.searchPlayer').keydown(function(event) {
        if (event.which == 13) {
            searchPlayer();
            event.preventDefault();
         }
    });
});