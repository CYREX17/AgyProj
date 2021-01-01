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


let str = "1. U6 247 Y  03JAN LHRLIN HS1 1750  #1850         2135  O 05JAN       E SU 1. U6 247 Y  03JAN LHRLIN HS1 1750  #1850         2135  O 05JAN       E SU";
str = str.replace(/#/g, " "); // убираем # в Галилео
str = (str.replace(/\s+/g, ' ').trim()).toUpperCase() + " 0 0 0 0 0 0 0"; //убираем лишние пробелы, делаем буквы большими

while (str.search(/\d\d\d\d \d\d\d\d \d\d\d\d/) > 0)
{
    str = str.substr(0, str.search(/\d\d\d\d \d\d\d\d \d\d\d\d/)) + str.substr(str.search(/\d\d\d\d \d\d\d\d \d\d\d\d/)+5);
}

console.log (str);

let ans = str.match(/\d\d\d\d \d\d\d\d \d\d\d\d/g);


for (let i = 0; i < str.length-20; i++) {
    if (isNumber(str[i]+str[i+1]+str[i+2]+str[i+3]) && isNumber(str[i+5]+str[i+6]+str[i+7]+str[i+8]) && isNumber(str[i+10]+str[i+11]+str[i+12]+str[i+13])) {
        str = str.substr(0, i) + "   " +  str.substr(i+5);
    }
}
console.log(str);
//str = str.replace("#", " "); // убираем # в Галилео
str = str.replace(/ \w /g, " "); // убираем класс бронирования
str = str.replace(/#/g, " "); // убираем # в Галилео
str = (str.replace(/\s+/g, ' ').trim()).toUpperCase() + " 0 0 0 0 0 0 0"; //убираем лишние пробелы, делаем буквы большими
console.log(str);

let airline,
    flightNum,
    dateDate,
    dateMonth,
    Origin,
    destination,
    depTime,
    arrTime;
 
let j, start, end;

for (let i = 0; i < str.length ; i++) {
    if (isNumber(str[i]) && isNumber(str[i+1]) && isLetter(str[i+2]) && isLetter(str[i+3]) && isLetter(str[i+4])) {        
        if (str[i + 2] + str[i + 3] + str[i + 4] == "JAN" ||
        str[i + 2] + str[i + 3] + str[i + 4] == "FEB" || 
        str[i + 2] + str[i + 3] + str[i + 4] == "MAR" ||
        str[i + 2] + str[i + 3] + str[i + 4] == "APR" || 
        str[i + 2] + str[i + 3] + str[i + 4] == "MAY" ||
        str[i + 2] + str[i + 3] + str[i + 4] == "JUN" || 
        str[i + 2] + str[i + 3] + str[i + 4] == "JUL" ||
        str[i + 2] + str[i + 3] + str[i + 4] == "AUG" || 
        str[i + 2] + str[i + 3] + str[i + 4] == "SEP" ||
        str[i + 2] + str[i + 3] + str[i + 4] == "OCT" || 
        str[i + 2] + str[i + 3] + str[i + 4] == "NOV" ||
        str[i + 2] + str[i + 3] + str[i + 4] == "DEC" ) {
            dateDate = str[i] + str[i + 1];
            dateMonth = str[i + 2] + str[i + 3] + str[i + 4];    
            for (let j = i+5;j < i+10; j++){
                if (isLetter(str[j]) && isLetter(str[j+1]) && isLetter(str[j+2]) && 
                isLetter(str[j+3]) && isLetter(str[j+4]) && isLetter(str[j+5])){
                    Origin = str[j] + str[j + 1] + str[j + 2];
                    destination = str[j + 3] + str[j + 4] + str[j + 5];
                    let k = j + 11;
                    for (let n = j + 31; n > k; n--) {
                        if(isNumber(str[n-3]+str[n-2]+str[n-1]+str[n]) && str[n-4] == " " && isNumber(str[n-8]+str[n-7]+str[n-6]+str[n-5])){
                            depTime = str[n-8]+str[n-7]+str[n-6]+str[n-5];
                            arrTime = str[n-3]+str[n-2]+str[n-1]+str[n];
                            break;
                        }
                    }
                }
            }
        }
    }
}


for (let k = 0; k < 10; k++){              // Airline + Flight number 
    if (str[k] != " " && str[k+1] != " "){
        if (isLetter(str[k]) && isLetter(str[k+1])){
            airline = str[k] + str[k+1]; 

            if (str[k+2] != " "){
                start = k+2;
                end = k+2;
            }
            else {
                start = k+3;
                end = k+3;
            }
            
            for (end; end < k+8; end++) {
                if (str[end] == " "){
                    flightNum = str.slice(start, end);
                    break;
                }
            }  
            break; 
        } 
        if (isLetter(str[k]) && isFinite(str[k+1])){
            airline = str[k] + str[k+1];  
            if (str[k+2] != " "){
                start = k+2;
                end = k+2;
            }
            else {
                start = k+3;
                end = k+3;
            }
            
            for (end; end < k+8; end++) {
                if (str[end] == " "){
                    flightNum = str.slice(start, end);
                    break;
                }
            } 
            break;  
        }
        if (isFinite(str[k]) && isLetter(str[k+1])){
            airline = str[k] + str[k+1]; 
            if (str[k+2] != " "){
                start = k+2;
                end = k+2;
            }
            else {
                start = k+3;
                end = k+3;
            }
            
            for (end; end < k+8; end++) {
                if (str[end] == " "){
                    flightNum = str.slice(start, end);
                    break;
                }
            } 
            break;   
        }        
    }
}

console.log("Day: " + dateDate);
console.log("Month: " + dateMonth);
console.log("Airline: " + airline);
console.log("Flight number: " + flightNum);
console.log("Origin: " + Origin);
console.log("Destination: " + destination);
console.log("Departure time: " + depTime);
console.log("Arrival time: " + arrTime);









