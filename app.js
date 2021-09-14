const binput = document.querySelector("#bdate");
const btn = document.querySelector("#btn-p");
const message = document.querySelector("#msg");

function reverseString(str){
    var strSplit = str.split("");
    var strRev = strSplit.reverse();
    return strRev.join("");
  };
  
  function isPalindrome(str){
    var strRev = reverseString(str);
    return strRev === str;
  }
  
  function numToString(date){
    var dateStr = {day:"",month:"",year:""}
  
    if(date.day < 10)
    {
      dateStr.day = "0" + date.day;
    }else{
      dateStr.day = date.day.toString();
    }
  
    if(date.month < 10){
      dateStr.month = "0" + date.month;
    }else{
      dateStr.month = date.month.toString();
    }
  
    dateStr.year = date.year.toString();
    return dateStr;
  };
  
  function allDateFormats(date){
    var dateString = numToString(date);
    var ddmmyyyy = dateString.day + dateString.month + dateString.year;
    var mmddyyyy = dateString.month + dateString.day + dateString.year;
    var yyyymmdd = dateString.year + dateString.month + dateString.day;
    var ddmmyy = dateString.day + dateString.month + dateString.year.slice(-2);
    var mmddyy = dateString.month + dateString.day + dateString.year.slice(-2);
    var yymmdd = dateString.year.slice(-2) + dateString.month + dateString.day;
  
    return [ddmmyyyy,mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
  };
  
  function checkPalindromeAllFormats(date){
    var flag = false;
    var dateFormats = allDateFormats(date);
    for(let i=0; i<dateFormats.length; i++){
      if(isPalindrome(dateFormats[i])){
        flag = true;
        break;
      }
    }
    return flag;
  }
  
  function leapYear(year){
    if(year%400 === 0){
      return true;
    }
    if(year%100 === 0){
      return false;
    }
    if(year%4 === 0){
      return true;
    }
  };
  
  function nextDate(date){
    var cday = date.day + 1;
    var cmonth = date.month;
    var cyear = date.year;
  
    var nDate = {day:"", month:"", year:""}
  
    var numDaysinMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if(cmonth === 2){
      if(leapYear(cyear)){
        if(cday > 29){
          cday = 1;
          cmonth++;
        }   
      }
      else{
        if(cday > 28){
          cday = 1;
          cmonth++;
        }
      }
    }
    else{
      var comp = numDaysinMonth[cmonth-1];
      if(cday > comp){
        cday = 1;
        cmonth++;
      }
      if(cmonth > 12){
        cday = 1;
        cmonth = 1;
        cyear++;
      }
    }
    nDate.day = cday;
    nDate.month = cmonth;
    nDate.year = cyear;
  
    return nDate;
  };
  
  function nextPalindromeDate(date){
    var count=0;
    var dateNext = nextDate(date);
    while(1){
      count++;
      if(checkPalindromeAllFormats(dateNext)){
        break;
      }
        dateNext = nextDate(dateNext);
    }
    return [count, dateNext];
  }
  var date ={
    day: 31,
    month: 12,
    year: 2020,
  };

  function clickHandler(){
        var bdayStr = binput.value;
        if(bdayStr!==""){
            var listOfDates = bdayStr.split("-");
            var date = {
                day: Number(listOfDates[2]),
                month: Number(listOfDates[1]),
                year: Number(listOfDates[0]),
            }
            var isPaindrome = checkPalindromeAllFormats(date);
            if(isPaindrome){
                message.innerText = "Yay!!! your birthday is a Palindrome🧨🎈";
            }
            else{
                var [count, np] = nextPalindromeDate(date);
                message.innerText = "Sorry your birthday is not a palindrome😐. The next palindrome is" + np.day+"/"+np.month+"/"+np.year+" You missed it by "+count+" days."
            }
        }

  };
  
  btn.addEventListener("click", clickHandler);
  
  