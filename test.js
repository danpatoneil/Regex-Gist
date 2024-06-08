const now  = Date.now();
let counter = 0;
const dayjs = require('dayjs');

function showDate(date){
    // let hours = date.getHours();
    // let AMPM = 'AM';
    // if(hours<12){
    //     if(hours==0){hours=12;}
    // }else{
    //     AMPM='PM';
    //     if(hours!=12){hours = hours-12}
    // }
    // return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}, ${hours}:${date.getMinutes()} ${AMPM}`;
    return dayjs(date).format('MM/DD/YYYY, hh:mm A');
}

const timer = setInterval(myTimer, 1);

function myTimer() {
    console.log(showDate(now));
  counter ++;
  if(counter==5)clearInterval(timer)
}
