const landingContainer = document.getElementById("landing-container");
const quizContainer = document.getElementById("quiz-container");
const finishContainer = document.getElementById("finish-container");

let questions = [
    {
        question: "melyik alkatrész végzi a számítógépben a számításokat és hajtja végre az utasításokat:",
        answers: ["alaplap", "processzor", "monitor", "tápegység"],
        final: "processzor"
    },
    {
        question: "mi a ram (random access memory) feladata:",
        answers: ["adatok ideiglenes tárolása a számítógép működéséhez.", "képek megjelenítése.", "a programok számításainak elvégzése.", "a számítógép áramellátásának biztosítása."],
        final: "adatok ideiglenes tárolása a számítógép működéséhez."
    },
    {
        question: "mi a szoftver fejlesztés?",
        answers: ["kenyerek sütése", "autó alkatrész legyártása", "új gyógyszer feltalálása","programok írása"],
        final: "programok írása"
    },
    {
        question: "mit/miket használnak a programozók a munkájukhoz?",
        answers: [ "villanysütőt", "forrasztó pálcát", "csavarhúzókat","programozási nyelveket"],
        final: "programozási nyelveket"
    },
    {
        question: "mit jelent az „automatizálás” a robotikában?",
        answers: ["feladatok elvégzése emberi beavatkozás nélkül.", "robot programozása kézzel.", "internet használata.", "hangvezérlés."],
        final: "feladatok elvégzése emberi beavatkozás nélkül."
    },
    {
        question: "mi a wi-fi (wireless fidelity) feladata?",
        answers: ["számítógép gyorsítása.", "programozás.", "adatok vezeték nélküli továbbítása.", "fájlok törlése."],
        final: "adatok vezeték nélküli továbbítása."
    },
    {
        question: "mi a vírus a számítógép világában?",
        answers: ["fertőző állat.", "kártevő program.", "új szoftver.", "internetes oldal."],
        final: "kártevő program."
    },
    {
        question: "mi a böngésző feladata?",
        answers: ["fájlok mentése.", "internetes oldalak megjelenítése.", "videó lejátszása.", "kép szerkesztése."],
        final: "internetes oldalak megjelenítése."
    },
    {
        question: "melyik programmal lehet képet szerkezteni?",
        answers: ["microsoft word", "microsoft excel", "paint", "jegyzettömb"],
        final: "paint"
    },
    {
        question: "mi az ip-cím (internet protocol-cím) célja a számítógépes hálózatokban?",
        answers: ["hálózati eszköz azonosítása.", "adatok mentése.",  "programok futtatása.", "internet böngészése."],
        final: "hálózati eszköz azonosítása."
    }
];

let currentQuestion = 0;
let points = 0;
let chosed = false;

function displayFinalContainer() {
    quizContainer.style.display = "none";
    landingContainer.style.display = "none";
    finishContainer.style.display = "block";


    finishContainer.innerHTML = " ";
    let h1 = document.createElement("h1");
    h1.textContent = "A teszt végére értél!";
    finishContainer.appendChild(h1);

    let p = document.createElement("p");
    p.textContent = `A pontszámod:${points}`;
    finishContainer.appendChild(p)

    let button = document.createElement("button");
    button.textContent = "Teszt újraindítása";
    button.addEventListener("click", function () {
        points = 0;
        currentQuestion = 1;
        quizNext();
    })
    finishContainer.appendChild(button);
    
}

function checkAnswer(playerAnswer, questionId, Id, finalId) {   
    if (!chosed) {
        if (playerAnswer == questions[questionId].final) {
            document.getElementById(`answer${Id}`).classList.add("green");
            points++;
            currentQuestion++;
            chosed = true;
        } 
        else {
            document.getElementById(`answer${Id}`).classList.add("red");
            // console.log(document.getElementById(`answer${finalId}`).textContent)
            document.getElementById(`answer${finalId+1}`).classList.add("green");
            currentQuestion++;
            chosed = true;
        }

        if (currentQuestion + 1 <= questions.length) {
            setTimeout(() => {
                quizNext()
            }, 3000);
        }
        else {
            setTimeout(() => {
                displayFinalContainer()
            }, 3000);
        }
    }
}

function displayLandingContainer() {
    quizContainer.style.display = "none";
    finishContainer.style.display = "none";
    landingContainer.style.display = "block";

    landingContainer.innerHTML = " ";
    
    let h1 = document.createElement("h1");
    h1.textContent = "ESZI informatika QUIZ";

    let button = document.createElement("button");
    button.textContent = "Teszt indítása";
    button.addEventListener("click", quizNext);

    let p = document.createElement("p");
    p.textContent = "A tesztben informatikával kapcsolatos kérdések vannak.";

    landingContainer.appendChild(h1);
    landingContainer.appendChild(button);
    landingContainer.appendChild(p);
}

function quizNext() {
    finishContainer.style.display = "none";
    landingContainer.style.display = "none";
    quizContainer.style.display = "block";

    quizContainer.innerHTML = " ";
    chosed = false;

    let h1 = document.createElement("h1");
    questionEntity = questions[currentQuestion];
    h1.textContent = questionEntity.question;
    quizContainer.appendChild(h1);
    let finalId = 0;

    for(let i = 1; i <= questionEntity.answers.length;i++){
        
        let answerDiv = document.createElement("div");
        answerDiv.classList = "answerdiv";
        answerDiv.id = `answer${i}`
        answerDiv.textContent = questionEntity.answers[(i-1)];
        if (answerDiv.textContent == questionEntity.final) {
            finalId = i-1;
        }
        answerDiv.addEventListener("click", function() { checkAnswer(questionEntity.answers[(i-1)], currentQuestion, i, finalId) });
        quizContainer.appendChild(answerDiv);
    }
}

displayLandingContainer();



// document.addEventListener("keydown", function(e) {
//     // F12
//     if (e.key === "F12") {
//         e.preventDefault();
//     }
//     // Ctrl+Shift+I
//     if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
//         e.preventDefault();
//     }
//     // Ctrl+Shift+J (Chrome konzol)
//     if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") {
//         e.preventDefault();
//     }
//     // Ctrl+U (forrás megtekintése)
//     if (e.ctrlKey && e.key.toLowerCase() === "u") {
//         e.preventDefault();
//     }
// });

// document.addEventListener("contextmenu", function(e) {
//     e.preventDefault();

// });
