let minute = 1;
let second = 30;

let timer = setInterval ( function() {

    if (second == 0 && minute == 0) {
        clearInterval(timer);
    }

    if (second < 10) {
        document.getElementById("time").innerHTML = "0" + minute + ":0" + second;
    }
    else {
        document.getElementById("time").innerHTML = "0" + minute + ":" + second;
    }

    if (second == 0) {
        minute = minute - 1;
        second = 59;
    }
    else {
        second = second - 1;
    }
    
}, 1000)