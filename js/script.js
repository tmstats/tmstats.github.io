$("#player").focus();


$(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});

var input = document.getElementById("player");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("playerBtn").click();
  }
});

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

/*
p=-1
newName = []
for (var i = 0; i < x.length; i++){
    if (x[i] == "#"){
       x = x.slice(1)
       console.log(x) 
       p+=1
       newName.push("")
       console.log(newName)
    }
    newName[p] += x[i]
    

}
console.log(newName[0])

for (var i = 0; i < newName.length; i++){
console.log(i)
console.log(newName[i])
naame = newName[i]
*/
/*
naame = entry.slice(1)

$.getJSON('https://trackmaniastats.herokuapp.com/api/searchPlayer/'+naame, function(json) {

        var keys = [];
        for(var k in json) keys.push(k);
//console.log(keys.length)

        if (keys.length < 30){
    for (var i = 0; i < keys.length; i++){
        naame = keys[i]
        playerID = json[naame.toLowerCase()]
        seeProfile(playerID)
        console.log(i)
        sleep(2000);
        
    }
}        


});

//}
*/
var entry = window.location.hash;
url = entry.slice(2)
//console.log(url.slice(0,13))
playername = url.slice(14)
//console.log(playername)
if (url.slice(0,13)=="playerprofile"){
    $.getJSON('https://trackmaniastats.herokuapp.com/api/searchPlayer/'+playername, function(json) {

        playerID = json[playername.toLowerCase()]
        playerinfo = playerID + " " + playername
        seeProfile(playerinfo)

});
    
}

/*
$.getJSON('https://trackmaniastats.herokuapp.com/api/searchPlayer/'+naame, function(json) {

        playerID = json[naame.toLowerCase()]
        seeProfile(playerID)

});
*/

/*
var entry = window.location.hash;
naame = entry.slice(1)

console.log(entry)
IDs = []
while (entry.length > 36){
    IDs.push(entry.slice(1,37))
    entry = entry.slice(37,)
    console.log(IDs)
    console.log(entry)
}

for (var oo=0; oo <= IDs.length; oo++){
    console.log("aaaaaaaaaaa")
    pausecomp(1000);
    seeProfile(IDs[oo])
};
*/


//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 50; //time in ms, 5 second for example
var $input = $('#player');

//on keyup, start the countdown
$input.on('keyup', function () {
    entry = document.getElementById("player");
    //console.log(entry)
    entry = entry.value.length

    //console.log(entry)
    if (entry>1) {
          clearTimeout(typingTimer);
        typingTimer = setTimeout(searchPlayer, doneTypingInterval);
}
});

//on keydown, clear the countdown 
$input.on('keydown', function () {
  clearTimeout(typingTimer);
});


$.getJSON('https://trackmaniastats.herokuapp.com/api/dayLastAddedCOTD', function(json) {
      
        var p = document.getElementById("dayLastAddedCOTD");
        str11 = json.dayLastAddedCOTD;
        str22 = "last main cotd added : " + str11;
        p.innerHTML = str22;

});

/*
$.getJSON('https://trackmaniastats.herokuapp.com/api/totalPlayer', function(json) {
      
        var p = document.getElementById("totalPlayer");
        p.innerHTML = json.totalPlayer;

});


$.getJSON('https://trackmaniastats.herokuapp.com/api/numberNewCOTDPlayers', function(json) {
      
        var p = document.getElementById("numberNewPlayers");
        p.innerHTML = json.numberNewCOTDPlayers;

});




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


$.getJSON('https://trackmaniastats.herokuapp.com/api/numberNewNamePlayers', function(json) {
      
        var p = document.getElementById("numberNewNamePlayers");
        p.innerHTML = json.numberNewNamePlayers;

});


$.getJSON('https://trackmaniastats.herokuapp.com/api/newNamePlayers', function(json) {
      
        //var section = document.getElementById("FunFacts");
        var p = document.getElementById("newNamePlayers");
        //var p = document.createElement("p");

        p.innerHTML = "<b>OLD  → NEW: </b>"

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
        p.innerHTML = p.innerHTML + "<br></br>"
});

*/

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
        if (count == 1){

            string =  count + " player found"
        }else if (count > 1){
            string =  count + " players found"
        }else{
            string =  ""
        }
        p.innerHTML = string;
        //p.setAttribute("class", "tooltip")
        /*p.setAttribute("style", "position: relative;display: inline-block;border-bottom: 1px dotted black;")
        var span = document.createElement("span");
        span.setAttribute("class", "tooltiptext")
        span.innerHTML='We currently have <i id="totalPlayer">...</i> players registered in our database.</i> In order to be in our COTD database, you must have participated in at least 1 main cup of the day and have qualified in the top 32 servers.'
        p.appendChild(span)*/
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
        table.setAttribute("style","width:80%; margin:auto;")

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        // TABLE ROW.

        var tr = table.insertRow(-1);  
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = "<i>Player name</i>";
        th.setAttribute("style","width:20%; padding:1%;")
        tr.appendChild(th);
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = "<i>Player ID</i>";
        th.setAttribute("style","width:60%;")
        tr.appendChild(th);
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = "<i>See profile</i>";
        th.setAttribute("style","width:20%;")
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
            
            response = json[col[i]]+ " " +col[i]
            path = "seeProfile('"+response+"')"
            //console.log(path); 
            input.setAttribute("onclick", path);
            //input.onclick = seeProfile(json[col[i]]);

            
            input.innerHTML = '<a style="color: blue; text-decoration: none;"> see profile</a>';
            
            //console.log(input);
            tr.appendChild(input);
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");

        if (col.length != 0){
            divContainer.innerHTML = "";
            divContainer.appendChild(table);
        }else{
            divContainer.setAttribute("style","text-align:center;")
            $.getJSON('https://trackmaniastats.herokuapp.com/api/totalPlayer', function(json) {
                divContainer.innerHTML = '<h3>Sorry there is no player related to your search.</h3><br><p><i>We currently have <i id="totalPlayer">'+json.totalPlayer+'</i> players registered in our database.</i> In order to be in our COTD database, players must have participated in at least 1 main cup of the day and have qualified in the top 32 servers. </p>';

            });
            
        }
        
    }



function seeProfile(playerinfo){
    playerID = playerinfo.slice(0,36)
    playerName = playerinfo.slice(37,playerinfo.length)
    //console.log(playerName)
URL = "https://trackmaniastats.herokuapp.com/api/playerProfiles/"+playerID

$.getJSON(URL, function(json) {

name = json.playerNames[json.playerNames.length - 1].playerName

if (document.getElementById(playerID) == null){

        var playerdiv = document.createElement("div")
        playerdiv.setAttribute("id", playerName);
        playerdiv.setAttribute("class", 'players');

        var p = document.createElement("p")
        if (document.getElementById('playerProfile').children.length > 0) {
            //console.log("yo")
            //console.log(document.getElementById('playerProfile').children.length)
            p.innerHTML ="<hr style='width:80%; color: black; border-width: 2px;'>"
        }

        else{
            //console.log("hi")
            p.innerHTML =""
        }
        
        //$(document.getElementById("playerProfile").appendChild(p))
        playerdiv.appendChild(p)
        
        var h3 = document.createElement("h3")
        h3.setAttribute("style", "font-weight:bold; text-align:center; text-decoration:underline; padding:100px;");
        text = '<a target="_blank" style="font-weight:bold; text-decoration:underline" href="https://trackmania.io/#/player/' + playerID +'">'+ playerName+'</a>'+"'s profile"
        h3.setAttribute("style", "text-align:center;");
        h3.innerHTML = text

        //h3.innerHTML =name+"'s profile"
        //$(document.getElementById("playerProfile").appendChild(h3))
        playerdiv.appendChild(h3)
/*
        var p = document.createElement("p")
        text = 'Trackmania.io profile : <a target="_blank" href="https://trackmania.io/#/player/' + playerID +'">https://trackmania.io/#/player/'+ playerID+ '</a>'
        p.setAttribute("style", "text-align:center;");
        p.innerHTML = text
        //$(document.getElementById("playerProfile").appendChild(p))
        playerdiv.appendChild(p)
*/
        var h4 = document.createElement("h5")
        h4.innerHTML ="Pseudo history :"
        h4.setAttribute("style", "text-align:center;");
        //$(document.getElementById("playerProfile").appendChild(h4))
        playerdiv.appendChild(h4)

        var div = document.createElement("div")
        profilepath = playerID+"Profile"
        div.setAttribute("id", profilepath);

        div.setAttribute("style", "margin: auto");
        //$(document.getElementById("playerProfile").appendChild(div))
        playerdiv.appendChild(div)

        // EXTRACT VALUE FOR HTML HEADER. 
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        var col = ["Pseudo","Using since"];
        


        //console.log(json); 
        //console.log(col); 


        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
        table.setAttribute("style", "margin: auto");
    
        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        // TABLE ROW.
            var tr = table.insertRow(-1); 

            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = "Pseudo";
            tr.appendChild(th);

            
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = "used from";
            tr.appendChild(th);

            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = "used until";
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
            
if (i!=o){
            var td = document.createElement("td");      // TABLE HEADER.
            td.innerHTML = json.playerNames[i+1].sinceDate;
            tr.appendChild(td);
}else{
var td = document.createElement("td");      // TABLE HEADER.
            //td.innerHTML = "now";
            td.innerHTML = json.results.cotd[json.results.cotd.length-1].date
            tr.appendChild(td);
}

        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        //var divContainer = document.getElementById(profilepath);
        //divContainer.innerHTML = "";
        div.appendChild(table);

        var p = document.createElement("p")
        
        p.innerHTML ="<br>"

        //$(document.getElementById("playerProfile").appendChild(h3))
        playerdiv.appendChild(p)

/*
        var h3 = document.createElement("h3")
        
        h3.innerHTML ="<br>CotD results:"

        h3.setAttribute("style", "text-decoration: underline;");
        //$(document.getElementById("playerProfile").appendChild(h3))
        playerdiv.appendChild(h3)

    */
        var divv = document.createElement("div")
        divv.setAttribute("style", "height: 400px; width: 100%; margin: 0px auto;");
        id = "chartContainer"+ playerID
        divv.setAttribute("id", id);
        playerdiv.appendChild(divv)

        var p = document.createElement("p")
        p.innerHTML ="<br>green → top 8 ; gold → top 24 ; silver → top 48 ; bronze → top 64<br>(average on last 10 cotd is excluding the best and worse result in the 10)"
        p.setAttribute("style", "text-align: center;");

        var pp = document.createElement("p")
        pp.innerHTML ="<br><i>zooming at an extremity can be a bit tricky, try zooming near an end and then select the move tool to go to the desired date.</i>"

        p.appendChild(pp)

        playerdiv.appendChild(p)

        

        var divvv = document.createElement("div")
        divvv.setAttribute("style", "height: 400px; width: 100%; margin: 20px auto;");
        id = "chartContainer2"+ playerID
        divvv.setAttribute("id", id);
        playerdiv.appendChild(divvv)

        var div = document.createElement("div")
        id = "cotdResults" + playerID
        div.setAttribute("id", id);
        //$(document.getElementById("playerProfile").appendChild(div))
        playerdiv.appendChild(div)



        var p = document.createElement("p")
        
        p.innerHTML ="<br><p id=\"newPlayers\" class=\"button_cont\"> <a class=\"example_f\" onclick=\"showrawData(\'"+playerID+"\')\" rel=\"nofollow\"><span>Show raw data (old format):</a></p>"
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
        table.style.display = 'none';

        table.id = "RawData"+playerID
        div.appendChild(table);

        playerdiv.appendChild(div)
        //div.setAttribute("display", "none"); 
        
        //var divContainerr = document.getElementById(id);
        //divContainerr.innerHTML = "";
        //playerdiv.appendChild(divo)



        $(document.getElementById("playerProfile").appendChild(playerdiv))

        //curentLocation = window.location.href 
        //newLocation = curentLocation + "#"+name

        path = "#"+playerName
        //path = curentLocation + "#"+name
        //oldPath = window.location.href


        window.location.href = path;
        //window.location.href = oldPath + path ;

        path = "#/playerprofile/"+playerName
        //path = curentLocation + "#"+name
        //oldPath = window.location.href


        window.location.href = path;


        showGraphs(playerID,playerID)
        //$("#playerID").html(json.playerID);
    

}
else{
    path = "#"+name
    window.location.href = path ;
}
});
}

function showrawData(player){
    
    pathID = "RawData"+player
    rawdata = document.getElementById(pathID)
    
    rawdata.style.display = 'flex';
    rawdata.setAttribute("style", "align-items: center;"); 
    rawdata.setAttribute("style", "justify-content: center;");


}





$(document).ready(function() {
    $('.searchPlayer').keydown(function(event) {
        if (event.which == 13) {
            searchPlayer();
            event.preventDefault();
         }
    });
});


var chart = null;
var dataPoints = [];
var dataPoints2 = [];

//var today = new Date();
//var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//var date = "2021-08-12"
//console.log((parseInt(today.getDate(),10)-10).toString())
//var minDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(parseInt(today.getDate(), 10)-10).toString();;
//var minDate = "2021-07-12"
//console.log(date, minDate)
function showGraphs(playerID,name){

var worstPositionAverage = 10;
chart = new CanvasJS.Chart("chartContainer"+name, {
    exportEnabled: false,
    animationEnabled: true,
    zoomEnabled: true,
    zoomType: "x",
    theme: "light2",

    title: {
        text: "COTDs result history"
    },
    toolTip: {
        shared: true
    },
    axisY: {
        title: "Placements",
        titleFontSize: 24,
        viewportMinimum: 0,
        //includeZero: true,
        //viewportMaximum: worstPositionAverage,
        },
    axisY2: {
        title: "Clutch - Units",
        titleFontColor: "#C0504E",
        lineColor: "#C0504E",
        labelFontColor: "#C0504E",
        tickColor: "#C0504E"
    },
    legend: {
        cursor: "pointer",
        itemclick: toggleDataSeries,
        markerMargin: 10,
    },
     axisX:{
        reversed:  true,
        //viewportMinimum: new Date(minDate),
        //viewportMaximum: new Date(date),
        

        //testt: testt= "2020-12-10",
        //viewportMinimum: new Date(testt),

    },
    data: [{
        type: "column",
        name: "Daily results",
        indexLabelPlacement: "outside",
        indexLabelOrientation: "vertical",
        //yValueFormatString: "#th place",
        toolTipContent: "<b>{date}:</b><br><b>{y}{addOverall} place out of {totalPlayer} total players</b><br>server rank: <b>{serverRank}{add}</b><br>server division: <b>{server}</b>",
        color: "{color}",
        dataPoints: dataPoints
    }]
}
);


chart2 = new CanvasJS.Chart("chartContainer2"+name, {
    animationEnabled: true,
    theme: "light2",
    title: {
        text: "COTDs server Distribution"
    },
    axisY: {
        title: "Number of times played",
        titleFontSize: 24,
        viewportMinimum: 0,
    },
     axisX:{
        title: "Servers",
        reversed:  true,
        interval: 1,

    },
    data: [{
        type: "bar",
        //yValueFormatString: "#th place",
        indexLabelPlacement: "outside",
        toolTipContent: "Average position: <b>{averagePosi}</b>{text}",
        color: "grey",
        dataPoints: dataPoints2,
        color: "{color}"
        
    }]
}
);

//$.getJSON("https://trackmaniastats.herokuapp.com/api/dataTest", callback);    
$.getJSON("https://trackmaniastats.herokuapp.com/api/playerProfiles/"+playerID, cotdResults);    

$.getJSON("https://trackmaniastats.herokuapp.com/api/cotdResultsServers/"+playerID, cotdResultsServers); 

}


function cotdResults(data) {   
    //var maxY = 0;
    maxY = data.stats.cotd["20percentWostPositionAverage"]
    for (var i = 0; i < data.results.cotd.length; i++) {
        serverRank = data.results.cotd[i].serverRank
    
        indexLabel =  String(serverRank)
        
        if (indexLabel=="DNF"){indexLabel=""
}else if (parseInt(indexLabel,10)> 8){indexLabel=""}
     

        if (serverRank == "DNF"){
            color="rgb(30, 30, 30)"
        }else if (serverRank<=8){
            color="rgb(0, 200, 00)"
            
        }else if (serverRank<=24){
            color="rgb(240,190,35)"
        }else if (serverRank<=48){
            color="rgb(192,192,192)"
        }else{
            color="rgb(236, 156, 70)"
        }
        lastDigit = serverRank%10

        if (lastDigit == 3){
            add = "rd"
        } else if (lastDigit == 2) {
            add = "nd"
        } else if (lastDigit == 1){
            add = "st"
        } else if (serverRank != "DNF"){
            add = "th"
        }else{
            add = ""
        }


        globalRank = data.results.cotd[i].globalRank
        /*
        if (globalRank > maxY && indexLabel !=  ""){
            maxY = globalRank
            //console.log(maxY)
        }
        */

        lastDigitOverall = globalRank%10

        if (lastDigitOverall == 3){
            addOverall = "rd"
        } else if (lastDigitOverall == 2) {
            addOverall = "nd"
        } else if (lastDigitOverall == 1){
            addOverall = "st"
        } else if (lastDigitOverall != "DNF"){
            addOverall = "th"
        }else{
            addOverall = ""
        }

        //if (indexLabel != ""){indexLabel += add}
        date = data.results.cotd[i].date

        dataPoints.push({
            color: color,
            x:  new Date(data.results.cotd[i].date),
            y: data.results.cotd[i].globalRank,
            totalPlayer: data.results.cotd[i].totalPlayer,
            serverRank: serverRank,
            server: data.results.cotd[i].server,
            date: date,
            add: add,
            addOverall: addOverall,
            indexLabel: indexLabel,
            maxY:maxY
        });
    }
    //console.log(chart.options.axisY)

    chart.options.axisY["maximum"] =  maxY*1.05; 

    calculateMovingAverage(chart,10);
    chart.render(); 
    clear()
}


function cotdResultsServers(data) { 
    for (var i = 0; i < data.servers.length; i++) {
        averagePosi = data.servers[i].averagePosi
        bestPosition = data.servers[i].bestPosition
        numberBestPosition = data.servers[i].numberBestPosition

        lastDigit = bestPosition%10

        if (lastDigit == 3){
            add = "rd"
        } else if (lastDigit == 2) {
            add = "nd"
        } else if (lastDigit == 1){
            add = "st"
        } else if (bestPosition != "None"){
            add = "th"
        }else{
            add = ""
        }

        if (averagePosi == "DNF"){
            color="rgb(30, 30, 30)"
        }else if (averagePosi<=8){
            color="rgb(0, 200, 00)"
            
        }else if (averagePosi<=24){
            color="rgb(240,190,35)"
        }else if (averagePosi<=48){
            color="rgb(192,192,192)"
        }else{
            color="rgb(237, 156, 70)"
        }
        y = data.servers[i].iteration

        indexLabel = String(y)
        if (indexLabel == "0"){indexLabel=""}

        

        if (data.servers[i].iteration == 1){
            text = ""
            dataPoints2.push({
                x: data.servers[i].server,
                y: y,
                averagePosi: averagePosi,
                color: color,
                indexLabel: indexLabel,
                text: text
        });
        }else{
            if (numberBestPosition == 1){
                 text = "<br> Best placement : <b>"+bestPosition +add +"</b> (<b>"+numberBestPosition+"</b> time)"
             }else
        {
             text = "<br> Best placement : <b>"+bestPosition +add +"</b> (<b>"+numberBestPosition+"</b> times)"
        }
           
            dataPoints2.push({
            x: data.servers[i].server,
            y: y,
            averagePosi: averagePosi,
            text: text,
            color: color,
            indexLabel: indexLabel
        });
        }

        
    }

    chart2.render(); 
    clear2()
}


// Function to calculate nn-Day Simple moving average
function calculateMovingAverage(chart,days) {
  var numOfDays = days;
  // return if there are insufficient dataPoints
  if(chart.options.data[0].dataPoints.length <= numOfDays) return;
  else {
    // Add a new line series for  Moving Averages
    chart.options.data.push({
      type: "spline",
      markerSize: 0,
      visible: false,
      color: "blue",
      name: "average on last 10 cotd",
      showInLegend: true,
      yValueFormatString: "#,##0.00",
      dataPoints: []
    });
    var total;
    for(var i = numOfDays; i < chart.options.data[0].dataPoints.length; i++) {
      totall = [];
      for(var j = (i - numOfDays); j < i; j++) {
        totall.push(chart.options.data[0].dataPoints[j].y);
      }
      totall.sort((a,b)=>a-b);
      total = eval(totall.slice(1,-1).join('+'))

      chart.options.data[1].dataPoints.push({
        x: chart.options.data[0].dataPoints[i].x,
        y: total / numOfDays
      });
    }
  }
}


function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
    } else {
        e.dataSeries.visible = true;
    }
    e.chart.render();
}



function clear(){
    dataPoints = []
}

function clear2(){
    dataPoints2 = []
}





function updateScrollableSizeFunfacts(button){
  button.classList.toggle("active");
    var content = button.nextElementSibling;
    content.style.maxHeight = content.scrollHeight +"px";
}



  var DisclaimerButton = document.getElementById("DisclaimerButton");
var i;

var nbOpenDiclaimer = 0;

  DisclaimerButton.addEventListener("click", function() {
    nbOpenDiclaimer ++;
    if (nbOpenDiclaimer%2 == 0){
      var plusMinus = document.getElementById("plusMinusDisclaimer");
    plusMinus.innerHTML = "+"
  }else{
    var plusMinus = document.getElementById("plusMinusDisclaimer");
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


/*
var FunFactsButton = document.getElementById("FunFactsButton");
var i;

var nbOpenFunFacts = 0;


  FunFactsButton.addEventListener("click", function() {
    nbOpenFunFacts ++;
    if (nbOpenFunFacts%2 == 0){
      var plusMinus = document.getElementById("plusMinusFunfacts");
    plusMinus.innerHTML = "+"
  }else{
    var plusMinus = document.getElementById("plusMinusFunfacts");
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


*/
/*
function forceKeyPressUppercase(e)
  {
    var charInput = e.keyCode;
    if((charInput >= 97) && (charInput <= 122)) { // lowercase
      if(!e.ctrlKey && !e.metaKey && !e.altKey) { // no modifier key
        var newChar = charInput - 32;
        var start = e.target.selectionStart;
        var end = e.target.selectionEnd;
        e.target.value = e.target.value.substring(0, start) + String.fromCharCode(newChar) + e.target.value.substring(end);
        e.target.setSelectionRange(start+1, start+1);
        e.preventDefault();
      }
    }
  }

  document.getElementById("player").addEventListener("keypress", forceKeyPressUppercase, false);
  */