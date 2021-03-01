var entry = window.location.hash;
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
naame = entry.slice(1)

$.getJSON('https://trackmaniastats.herokuapp.com/api/searchPlayer/'+naame, function(json) {

        playerID = json[naame.toLowerCase()]
        seeProfile(playerID)

});

//}





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



$.getJSON('https://trackmaniastats.herokuapp.com/api/totalPlayer', function(json) {
      
        var p = document.getElementById("totalPlayer");
        p.innerHTML = json.totalPlayer;

});


$.getJSON('https://trackmaniastats.herokuapp.com/api/numberNewCOTDPlayers', function(json) {
      
        var p = document.getElementById("numberNewPlayers");
        p.innerHTML = json.numberNewCOTDPlayers;

});

$.getJSON('https://trackmaniastats.herokuapp.com/api/dayLastAddedCOTD', function(json) {
      
        var p = document.getElementById("dayLastAddedCOTD");
        p.innerHTML = json.dayLastAddedCOTD;

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

            
            input.innerHTML = '<a style="color: blue; text-decoration: none;"> see profile</a>';
            
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

function showGraphs(playerID,name){

chart = new CanvasJS.Chart("chartContainer"+name, {
    exportEnabled: false,
    animationEnabled: true,
    zoomEnabled: true,
    zoomType: "x",
    theme: "light2",

    title: {
        text: "COTDs result history (zoom enabled)"
    },
    axisY: {
        title: "Placements",
        titleFontSize: 24,
        viewportMinimum: 0,
        stripLines: [
       {value:0,
        label:"server 1",
        labelPlacement:"outside",},
        {value:64,
        label:"server 2",
        labelPlacement:"outside",},
        {value:128,
        label:"server 3",
        labelPlacement:"outside",},
        {value:192,
        label:"server 4",
        labelPlacement:"outside",},
        {value:256,
        label:"server 5",
        labelPlacement:"outside",},
        {value:320,
        label:"server 6",
        labelPlacement:"outside",},
        {value:384,
        label:"server 7",
        labelPlacement:"outside",},
        {value:448,
        label:"server 8",
        labelPlacement:"outside",},
        {value:512,
        label:"server 9",
        labelPlacement:"outside",},
        {value:576,
        label:"server 10",
        labelPlacement:"outside",},
        {value:640,
        label:"server 11",
        labelPlacement:"outside",},
        {value:704,
        label:"server 12",
        labelPlacement:"outside",},
        {value:768,
        label:"server 13",
        labelPlacement:"outside",},
        {value:832,
        label:"server 14",
        labelPlacement:"outside",},
        {value:896,
        label:"server 15",
        labelPlacement:"outside",},
        {value:960,
        label:"server 16",
        labelPlacement:"outside",},
        {value:1024,
        label:"server 17",
        labelPlacement:"outside",},
        {value:1088,
        label:"server 18",
        labelPlacement:"outside",},
        {value:1152,
        label:"server 19",
        labelPlacement:"outside",},
        {value:1216,
        label:"server 20",
        labelPlacement:"outside",},
        {value:1280,
        label:"server 21",
        labelPlacement:"outside",},
        {value:1344,
        label:"server 22",
        labelPlacement:"outside",},
        {value:1408,
        label:"server 23",
        labelPlacement:"outside",},
        {value:1472,
        label:"server 24",
        labelPlacement:"outside",},
        {value:1536,
        label:"server 25",
        labelPlacement:"outside",},
        {value:1600,
        label:"server 26",
        labelPlacement:"outside",},
        {value:1664,
        label:"server 27",
        labelPlacement:"outside",},
        {value:1728,
        label:"server 28",
        labelPlacement:"outside",},
        {value:1856,
        label:"server 29",
        labelPlacement:"outside",},
        {value:1920,
        label:"server 30",
        labelPlacement:"outside",}]
    
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
        
        //testt: testt= "2020-12-10",
        //viewportMinimum: new Date(testt),

    },
    data: [{
        type: "column",
        name: "Daily results",
        indexLabelPlacement: "outside",
        indexLabelOrientation: "vertical",
        //yValueFormatString: "#th place",
        toolTipContent: "<b>{date}:</b><br><b>{y}{addOverall} place out of {totalPlayer} total Player</b><br>server placement: <b>{serverRank}{add}</b><br>server division: <b>{server}</b>",
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
        toolTipContent: "Average position: <b>{averagePosi}</b>",
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
    var maxY = 0;
    for (var i = 0; i < data.results.cotd.length; i++) {
        serverRank = data.results.cotd[i].serverRank
    
        indexLabel =  String(serverRank)
        if (indexLabel=="DNF"){indexLabel=""}

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
        if (globalRank > maxY && indexLabel !=  ""){
            maxY = globalRank
            //console.log(maxY)
        }

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

        if (averagePosi == "DNF"){
            color="rgb(30, 30, 30)"
        }else if (averagePosi<=8){
            color="rgb(0, 200, 00)"
            
        }else if (averagePosi<=24){
            color="rgb(240,190,35)"
        }else if (averagePosi<=48){
            color="rgb(192,192,192)"
        }else{
            color="rgb(236, 156, 70)"
        }
        y = data.servers[i].iteration

        indexLabel = String(y)
        if (indexLabel == "0"){indexLabel=""}

        dataPoints2.push({
            x: data.servers[i].server,
            y: y,
            averagePosi: averagePosi,
            color: color,
            indexLabel: indexLabel
        });
    }
    chart2.render(); 
    clear2()
}


// Function to calculate n-Day Simple moving average
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
      name: "show moving average on 10 cotd",
      showInLegend: true,
      yValueFormatString: "#,##0.00",
      dataPoints: []
    });
    var total;
    for(var i = numOfDays; i < chart.options.data[0].dataPoints.length; i++) {
      total = 0;
      for(var j = (i - numOfDays); j < i; j++) {
        total += chart.options.data[0].dataPoints[j].y;
      }
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



