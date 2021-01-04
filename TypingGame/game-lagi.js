var words = document.querySelector(".words");
var scoreDiv = document.querySelector("#score");
var levelId = document.querySelector("#level");
// var button = document.querySelector("button");

var points = 0;

var spans;
var typed;

var level = [3, 5, 10];
var count = 0;
var currentLevel = 0;

function getNumber() {
    var number = Math.floor(Math.random() * (20 - 0 + 1)) + 0;
    return number;
}

function random() {
    words.innerHTML = "";

    // var random = Math.floor(Math.random() * (20 - 0 + 1)) + 0;
    var flagRandom = 0;
    var random;

    while (flagRandom == 0) {
        
        random = getNumber();

        if (flag[random] == 0) {
            flag[random] = 1;
            flagRandom = 1;
        }
    }
    // console.log(flag);

    var wordArray = list[random].split("");

    for (var i = 0; i < wordArray.length; i++) { //building the words with spans around the letters
        var span = document.createElement("span");
        span.classList.add("span");
        span.innerHTML = wordArray[i];
        words.appendChild(span);
    }

    spans = document.querySelectorAll(".span");
}

const list = [ 'ACCOUNT','ACCURATE','ACRES','ACROSS','ACT','ACTION','ACTIVE','ACTIVITY',
'ACTUAL','ACTUALLY','ADD','ADDITION','ADDITIONAL','ADJECTIVE','ADULT','ADVENTURE',
'ADVICE','AFFECT','AFRAID','AFTER','AFTERNOON','AGAIN','AGAINST','AGE' ];

var flag = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

// button.addEventListener("click", function(e){
//     countdown();
    random();
//     button.disabled = true;
    	
// });

function typing(e) {

    typed = String.fromCharCode(e.which);
    // console.log(typed);

    for (var i = 0; i < spans.length; i++) {
        if (spans[i].innerHTML === typed) { // if typed letter is the one from the word
            if (spans[i].classList.contains("bg")) { // if it already has class with the bacground color then check the next one
                continue;
            } else if (spans[i].classList.contains("bg") === false && spans[i-1] === undefined || spans[i-1].classList.contains("bg") !== false ) { // if it dont have class, if it is not first letter or if the letter before it dont have class (this is done to avoid marking the letters who are not in order for being checked, for example if you have two "A"s so to avoid marking both of them if the first one is at the index 0 and second at index 5 for example)
                spans[i].classList.add("bg");
                break;
            }
        }
    }

    var checker = 0;

    for (var j = 0; j < spans.length; j++) { //checking if all the letters are typed
        
        if (spans[j].className === "span bg") {
            checker++;
        }

        if (checker === spans.length) { 

            // words.classList.add("animated");
            // words.classList.add("fadeOut");

            var t = 400;
            var animations = 100;

            points++; // increment the points
            scoreDiv.innerHTML = points; //add points to the points div
            count++;
            console.log(count);

            if (count==level[currentLevel]) {
                words.innerHTML = "LEVEL " + (currentLevel + 1) + " COMPLETED";
                
                currentLevel++;
                // levelId.innerHTML = (currentLevel + 1);

                count = 0;

                t = 2000;
                animations = 1000;

                setTimeout(function(){
                    levelId.innerHTML = (currentLevel + 1);
                }, t);                
            }
            // else {
                setTimeout(function(){
                    words.classList.add("animated");
                    words.classList.add("fadeOut");
                }, animations);
            // }
                document.removeEventListener("keydown", typing, false);
                setTimeout(function(){
                    words.className = "words"; // restart the classes
                    random(); // give another word
                    document.addEventListener("keydown", typing, false);
                }, t);
            // }

        }
    }
}

document.addEventListener("keydown", typing, false);

