"use strict";

function isLetter (char){
    if (char.toString().toUpperCase() != char.toString().toLowerCase()){
        return true;
    }
    else {
    return false;
    }
}

function isNumber (char){
    if (isFinite(char) && char != " "){
        return true;
    }
    else {
    return false;
    }
}

var monthList = [
    ["JAN",	"FEB", "MAR", "APR", "MAY",	"JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
    ["01",	"02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    ["January",	"February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    ["JAN",	"FEB", "MAR", "APR", "MAY",	"JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
    ["JAN",	"FEB", "MAR", "APR", "MAY",	"JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
];

let airline,
    flightNum,
    dateDate,
    dateMonth,
    depTime,
    arrTime,
    // Origin, destination,
    legs;

let textArea = document.getElementsByTagName("textarea")[0];
let itinOk = document.getElementsByClassName("itin-pax")[0];

// 1. U6 247 Y  03JAN 3 LHRLIN HS1  1 1750  #1850         2135  O 05JAN       E SU 1. U6 247 Y  03JAN 3 LHRLIN HS1 1750 1 1850         #2135



textArea.addEventListener("input", function(){
    itinOk.textContent = "";
    let str = textArea.value;

    str = str.replace(/#/g, " "); // убираем # в Галилео
    str = (str.replace(/\s+/g, " ").trim()).toUpperCase() + " 0 0 0 0 0 0 0"; //убираем лишние пробелы, делаем буквы большими

        // убираем терминал
    while (str.search(/ \d \d\d\d\d/) > 0) {
        str = str.substr(0, str.search(/ \d \d\d\d\d/)) + str.substr(str.search(/ \d \d\d\d\d/)+2);
    }

    // убираем время окончания регистрации, если оно есть !!! переписать {3}
    while (str.search(/\d\d\d\d \d\d\d\d \d\d\d\d/) > 0) {
        str = str.substr(0, str.search(/\d\d\d\d \d\d\d\d \d\d\d\d/)) + str.substr(str.search(/\d\d\d\d \d\d\d\d \d\d\d\d/)+5);
    }


    str = str.replace(/ [A-Z] /g, " "); // убираем класс бронирования
    str = str.replace(/ [A-Z]{2}\d{1,2} /g, " "); // убираем HK1


    // убираем день недели в амадеусе и сейбре
    while (str.search(/ \d [A-Z]{6}/g) > 0) {
        str = str.substr(0, str.search(/ \d [A-Z]{6}/)) + str.substr(str.search(/ \d [A-Z]{6}/)+2);
    }
    str = str.replace(/\s+/g, " "); //убираем лишние пробелы, если остались
    
    legs = str.match(/\w{2} \d{1,4} \d{2}[A-Z]{3} [A-Z]{6} \d{4} \d{4}/g);
 
    // PS 1415 20SEP KBPMUC 0945 1125
    let origin = [];
    let destination = [];
    let dateDate = [];
    let dateMonth = [];
    let flight = [];
    let airline = [];
    let flightNum = [];
    let depTime = [];
    let arrTime = [];




    for (let i = 0; i < legs.length; i++) {
        origin[i] = legs[i].substr(legs[i].search(/[A-Z]{6}/), 3);
        destination[i] = legs[i].substr(legs[i].search(/[A-Z]{6}/)+3, 3);
        console.log(origin[i]);
        console.log(destination[i]);

        dateDate[i] = legs[i].substr(legs[i].search(/\d{2}[A-Z]{3}/), 2);
        dateMonth[i] = legs[i].substr(legs[i].search(/\d{2}[A-Z]{3}/)+2, 3);

        console.log(dateDate[i]);
        console.log(dateMonth[i]);
        
        flight[i] = legs[i].substring(0, legs[i].search(/\d{2}[A-Z]{3}/)-1).trim();
        console.log(flight[i]);

        airline[i] = flight[i].substring(0, 2);
        flightNum[i] = flight[i].substring(2, flight[i].length).trim();
        console.log(airline[i]);
        console.log(flightNum[i]);

        depTime[i] = legs[i].substr(legs[i].search(/\d{4} \d{4}/), 4);
        arrTime[i] = legs[i].substr(legs[i].search(/\d{4} \d{4}/)+5, 4);
        console.log(depTime[i]);
        console.log(arrTime[i]);

    }
    

   // let originW 



    let request = new XMLHttpRequest();
    //request.open("GET", "apt1.json");
    request.open("GET", "airports.json");

    request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    request.send();

    request.addEventListener("readystatechange", function() { 
    if (request.readyState == 4 && request.status == 200) {
        let data = JSON.parse(request.response);
        // console.log(data);
        // console.log(data["MUC"]);
        // let aptName = data["MUC"].aptName;
        // console.log(aptName);

        // let aptNameLocal = aptName.ua;
        // console.log(aptNameLocal);
        // console.log((data["MUC"].aptName).ua);
        // console.log((data[origin[0]].aptName).ua);
        // console.log((data[destination[0]].aptName).ua);
        // console.log((data[origin[1]].aptName).ua);
        // console.log((data[destination[1]].aptName).ua);
       
        for (let i = 0; i < origin.length; i++) {
                    
            data.forEach((item) => {
                if (item.code == origin[i]) {
                    console.log(item.name);
                } 
            });

        }

        


    } 
});




    








    console.log(legs[0]);
    console.log(legs[1]);
    console.log(legs[2]);
    
    for (let i = 0; i < legs.length; i++) {
        itinOk.innerHTML += legs[i] + "<br/>";
    }









    //itinOk.textContent = legs[0];
    
    
});



// let str = "1. U6 247 Y  03JAN LHRLIN HS1 1750  #1850         2135  O 05JAN       E SU 1. U6 247 Y  03JAN LHRLIN HS1 1750  #1850         2135  O 05JAN       E SU";
// str = str.replace(/#/g, " "); // убираем # в Галилео
// str = (str.replace(/\s+/g, ' ').trim()).toUpperCase() + " 0 0 0 0 0 0 0"; //убираем лишние пробелы, делаем буквы большими

// while (str.search(/\d\d\d\d \d\d\d\d \d\d\d\d/) > 0)
// {
//     str = str.substr(0, str.search(/\d\d\d\d \d\d\d\d \d\d\d\d/)) + str.substr(str.search(/\d\d\d\d \d\d\d\d \d\d\d\d/)+5);
// }

// console.log (str);

// let ans = str.match(/\d\d\d\d \d\d\d\d \d\d\d\d/g);


// for (let i = 0; i < str.length-20; i++) {
//     if (isNumber(str[i]+str[i+1]+str[i+2]+str[i+3]) && isNumber(str[i+5]+str[i+6]+str[i+7]+str[i+8]) && isNumber(str[i+10]+str[i+11]+str[i+12]+str[i+13])) {
//         str = str.substr(0, i) + "   " +  str.substr(i+5);
//     }
// }
// console.log(str);
// //str = str.replace("#", " "); // убираем # в Галилео
// str = str.replace(/ \w /g, " "); // убираем класс бронирования
// str = str.replace(/#/g, " "); // убираем # в Галилео
// str = (str.replace(/\s+/g, ' ').trim()).toUpperCase() + " 0 0 0 0 0 0 0"; //убираем лишние пробелы, делаем буквы большими
// console.log(str);

