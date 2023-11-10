
const questions =[
    {
    question: "¿Cual es el rio más grande?",
    answers: [
        {text: "Nilo", correct: true },
        {text: "Amazonas", correct: false },
        {text: "Misisipi", correct: false },
        {text: "Río Amarillo", correct: false },

    ]

    }, 
    {
        question: "¿Cuál es el país más grande y el más pequeño del mundo?",
        answers: [
            {text: "Rusia y Vaticano", correct: true },
            {text: "China y Nauru", correct: false },
            {text: "Canadá y Mónaco", correct: false },
            {text: "Estados Unidos y Malta", correct: false },
        ]
    },
    {
        question: "¿Cuál es la capital de Mongolia?",
        answers: [
            {text: "Muharin", correct: false },
            {text: "Ulán Bator", correct: true },
            {text: "Pionyang", correct: false },
            {text: "Katmandú", correct: false },
        ]

    },
    {
        question: " El director de la única película mexicana en ganar un premio Oscar como mejor película extranjera es:",
        answers: [
            {text: "Guillermo del Toro", correct: false },
            {text: "Alfonso Cuarón", correct: true },
            {text: "Alejandro González Iñárritu", correct: false },
            {text: "Luis Buñuel", correct: false },
        ]
    },
    {
        question: " La sigla OTAN significa:",
        answers: [
            {text: "Orden Territorial para Almacenes y Negocios", correct: false },
            {text: "Organización de Técnicos de Aeronáutica", correct: false },
            {text: "Organización del Tratado del Atlántico Norte", correct: true },
            {text: "Organización Tripartita de América del Norte", correct: false },
        ]
    },
    {
        question: " ¿Cuáles son las partes de una fracción?",
        answers: [
            {text: "Número y denominado", correct: false },
            {text: "Numerador y denominador", correct: true },
            {text: "Superior e inferior", correct: false },
            {text: "Dependiente e independiente", correct: false },
        ]
    },
    {
        question: "¿Cuál es el planeta más grande del sistema solar ?",
        answers: [
            {text: "Júpiter", correct: true },
            {text: "Saturno", correct: false },
            {text: "Neptuno", correct: false },
            {text: "Marte", correct: false },
        ]
    },
    {
        question: "¿Quién es considerado el padre de la ciencia y la filosofía?",
        answers: [
            {text: "Tales de Mileto", correct: true },
            {text: "Demócrito", correct: false },
            {text: "Pitágoras", correct: false },
            {text: "Aristóteles", correct: false },
        ]
    },
    {
        question: "¿Cuál es el grupo de palabras escritas correctamente?",
        answers: [
            {text: "Metamorfosis, extranjero, diversidac, equilivrio", correct: false },
            {text: "Metamorfosis, extranjero, diversidad, equilibrio", correct: true },
            {text: "Metaformosis, estranjero, diversidad, ekilibrio", correct: false },
            {text: "Metamorfosis, extrangero, dibersidad, equilibrio", correct: false },
        ]
    },
    {
        question: "¿Cuál es el libro más vendido en el mundo después de la Biblia?",
        answers: [
            {text: "Don Quijote de la Mancha", correct: true },
            {text: "El Principito", correct: false },
            {text: "Cien años de Soledad", correct: false},
            {text: "La odisea", correct: false },
        ]
    }

]
const questionElement = document.getElementById ("question");
const answerButtons = document.getElementById ("answer-buttons");
const nextButton = document.getElementById ("next-btn");
const score = document.getElementById("score");
const timer = document.getElementById ("timer");
const resetButton= document.getElementById("reset")


var currentQuestionIndex = 0;
let myScore = 0;
let myTimer = 11;
let scoreText;
let nInterval;

function start() {
    currentQuestionIndex = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    var currentQuestion= questions[currentQuestionIndex];
    var questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    score.innerText = myScore;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add ("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
        
    });

    setTimer();

}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        myScore += 1;
        myScore += myTimer;
    } else {
        selectedBtn.classList.add("incorrect");  
    } 
    Array.from(answerButtons.children).forEach(button=>{
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.incorrect=== "false"){
            button.classList.add("incorrect");
        }
    })
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
       start(); 
    }
} )
    function setTimer() {

         const startTimer= setInterval(() => {
            myTimer -= 1;
            timer.innerText = myTimer;

            if(myTimer === 0){
                clearInterval(startTimer);
                handleNextButton();
                myTimer = 11;
            }
        }, 1000);
    }
    
  
    start();