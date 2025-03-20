let speedTypingTestEl = document.getElementById("speedTypingTest");
let timerEl = document.getElementById("timer");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let quoteInputel = document.getElementById("quoteInput");
let resultEl = document.getElementById("result");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let spinnerEl = document.getElementById("spinner");
let countdown = 0;

let submittedInput = "";

httpsRequest();

function httpsRequest() {
    let url = "https://apis.ccbp.in/random-quote";
    let options = {
        method: "GET"
    };
    spinnerEl.classList.remove("d-none");
    speedTypingTestEl.classList.add("d-none");

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            let result = jsonData.content;
            spinnerEl.classList.add("d-none");
            speedTypingTestEl.classList.remove("d-none");
            quoteDisplayEl.textContent = result;
        });
}

quoteInputel.addEventListener("change", function(event) {
    submittedInput = event.target.value;
});


let uniqueId = setInterval(function() {
    countdown += 1;
    timerEl.textContent = countdown;
}, 1000);


function checkingTheSubmittedInput() {
    let quote = quoteDisplayEl.textContent;

    if ((submittedInput === quote) && (countdown !== 0)) {
        clearInterval(uniqueId);
        resultEl.textContent = "You did it in " + countdown + " seconds";
    } else {
        resultEl.textContent = "You typed incorrect sentence";
    }
}


submitBtnEl.addEventListener("click", checkingTheSubmittedInput);

resetBtnEl.addEventListener("click", () => {
    httpsRequest(),
        timerEl.textContent = 0,
        quoteInputel.value = "";
});