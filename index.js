const isLoadMock = false;

const idContent = `contentQuestion`;
const idViewResult = `viewResult`;

let correctAnswer = ``;

async function loadQuestions() {
    const response = await fetch("https://opentdb.com/api.php?amount=1&category=29&type=multiple");
    const questions = await response.json();
    setQuestions(questions.results);
}

function setQuestions(questions) {
    var content = document.querySelector(`#${idContent}`);
    let contentHtml = ``;
    questions.forEach(element => {

        correctAnswer = element.correct_answer;

        const answers = element.incorrect_answers;
        answers.push(element.correct_answer);
        shuffleArray(answers);

        let answersHtml = ``;
        answers.forEach(answer => {
            answersHtml += `
            <div class="col">
                <button onclick="validAnswer('${answer}')">${answer}</button>
            </div>`;
        });

        contentHtml =
            `
        <div class="row">
            <div class="col">
                <h1>Pregunta</h1>
                <h1>${element.question}</h1>
            </div>
        </div>
        <div class="row">
                ${answersHtml}
            </div>
        </div>
        <div class="row">
            <div class="col" id="${idViewResult}">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <br><br><br>
                <button onclick="load()">Nueva pregunta</button>
            </div>
        </div>
        `
    });
    content.innerHTML = contentHtml;
}

function shuffleArray(inputArray) {
    inputArray.sort(() => Math.random() - 0.5);
}

function validAnswer(answer) {
    var content = document.querySelector(`#${idViewResult}`);
    content.innerHTML =
        answer == correctAnswer
            ? `<p class="success-answer">Respuesta correcta</p>`
            : `<p class="failed-answer">Respuesta incorrecta</p>`
}

function loadQuestionsMock() {
    const questions = {
        "response_code": 0,
        "results": [
            {
                "type": "multiple",
                "difficulty": "easy",
                "category": "Entertainment: Comics",
                "question": "What is the full first name of the babysitter in Calvin and Hobbes?",
                "correct_answer": "Rosalyn",
                "incorrect_answers": [
                    "Rose",
                    "Ruby",
                    "Rachel"
                ]
            }
        ]
    }
    setQuestions(questions.results);
}

function load(){
    isLoadMock ? loadQuestionsMock() : loadQuestions();
}

load();