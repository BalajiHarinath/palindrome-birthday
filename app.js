const binput = document.querySelector("#bdate");
const btn = document.querySelector("#btn-p");
const message = document.querySelector("#msg");

  const reverseString = str => {
    const strSplit = str.split("");
    const strRev = strSplit.reverse();
    return strRev.join("");
  };
  
  const isPalindrome = str => {
    const strRev = reverseString(str);
    return strRev === str;
  }
  
  const numToString = date => {
    const dateStr = {day:"",month:"",year:""}
  
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
  
  const allDateFormats = date => {
    const dateString = numToString(date);
    const ddmmyyyy = dateString.day + dateString.month + dateString.year;
    const mmddyyyy = dateString.month + dateString.day + dateString.year;
    const yyyymmdd = dateString.year + dateString.month + dateString.day;
    const ddmmyy = dateString.day + dateString.month + dateString.year.slice(-2);
    const mmddyy = dateString.month + dateString.day + dateString.year.slice(-2);
    const yymmdd = dateString.year.slice(-2) + dateString.month + dateString.day;
  
    return [ddmmyyyy,mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
  };
  
  const checkPalindromeAllFormats = date => {
    let flag = false;
    const dateFormats = allDateFormats(date);
    for(let i=0; i<dateFormats.length; i++){
      if(isPalindrome(dateFormats[i])){
        flag = true;
        break;
      }
    }
    return flag;
  }
  
  const leapYear = year => {
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
  
  const nextDate = date => {
    let cday = date.day + 1;
    let cmonth = date.month;
    let cyear = date.year;
  
    const nDate = {day:"", month:"", year:""}
  
    const numDaysinMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
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
  
  const nextPalindromeDate = date => {
    let count=0;
    let dateNext = nextDate(date);
    while(1){
      count++;
      if(checkPalindromeAllFormats(dateNext)){
        break;
      }
        dateNext = nextDate(dateNext);
    }
    return [count, dateNext];
  }
  const date ={
    day: 31,
    month: 12,
    year: 2020,
  };

  const clickHandler = () => {
        const bdayStr = binput.value;
        if(bdayStr!==""){
            const listOfDates = bdayStr.split("-");
            const date = {
                day: Number(listOfDates[2]),
                month: Number(listOfDates[1]),
                year: Number(listOfDates[0]),
            }
            const isPaindrome = checkPalindromeAllFormats(date);
            if(isPaindrome){
                message.innerText = "Yay!!! your birthday is a Palindrome🧨🎈";
            }
            else{
                const [count, np] = nextPalindromeDate(date);
                message.innerText = "Sorry your birthday is not a palindrome😐. The next palindrome is" + np.day+"/"+np.month+"/"+np.year+" You missed it by "+count+" days."
            }
        }

  };
  
  btn.addEventListener("click", clickHandler);
  
  