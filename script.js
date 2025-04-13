const questions = [
    { question: "¿Cuál es la capital de Perú?", answers: ["Cusco", "Lima", "Arequipa", "Trujillo"], correct: 1 },
    { question: "¿Qué lenguaje se usa para crear páginas web?", answers: ["Python", "HTML", "C#", "Java"], correct: 1 },
    { question: "¿Quién pintó la Mona Lisa?", answers: ["Van Gogh", "Picasso", "Da Vinci", "Dalí"], correct: 2 },
    { question: "¿Cuál es el río más largo del mundo?", answers: ["Amazonas", "Nilo", "Yangtsé", "Misisipi"], correct: 0 }, 
    { question: "¿En qué año llegó el hombre a la luna?", answers: ["1969", "1972", "1959", "1981"], correct: 0 },
    { question: "¿Cuál es el planeta más grande del sistema solar?", answers: ["Tierra", "Saturno", "Júpiter", "Urano"], correct: 2 },
    { question: "¿Qué país ganó el Mundial de Fútbol 2022?", answers: ["Argentina", "Francia", "Brasil", "Alemania"], correct: 0 },
    { question: "¿Cuántos huesos tiene el cuerpo humano adulto?", answers: ["206", "210", "195", "183"], correct: 0 },
    { question: "¿Qué instrumento tiene teclas, cuerdas y martillos?", answers: ["Guitarra", "Piano", "Violín", "Arpa"], correct: 1 }
];

let currentIndex = 0;
let score = 0;
let playerName = "";

const container = document.getElementById("question-container");
const nextBtn = document.getElementById("next-btn");
const scoreSpan = document.getElementById("score");
const triviaDiv = document.getElementById("trivia");
const startScreen = document.getElementById("start-screen");
const endScreen = document.getElementById("end-screen");
const finalMessage = document.getElementById("final-message");

// Iniciar el juego
document.getElementById("start-btn").addEventListener("click", () => {
    const inputName = document.getElementById("player-name").value.trim();
    if (!inputName) {
        alert("Por favor, ingresa tu nombre.");
        return;
    }
    playerName = inputName;
    startScreen.style.display = "none";
    triviaDiv.style.display = "block";
    showQuestion();
});

// Mostrar pregunta
function showQuestion() {
    const { question, answers, correct } = questions[currentIndex];
    nextBtn.disabled = true;

    container.textContent = ""; // Limpiar contenido previo
    const title = document.createElement("h2");
    title.textContent = question;
    container.appendChild(title);

    answers.forEach((answer, i) => {
        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.classList.add("answer-btn");
        btn.dataset.index = i;
        container.appendChild(btn);
    });

    container.addEventListener("click", handleAnswer, { once: true });
}

// Manejar respuesta
function handleAnswer(event) {
    if (!event.target.matches(".answer-btn")) return;

    const selected = parseInt(event.target.dataset.index);
    const correctIndex = questions[currentIndex].correct;

    event.target.classList.add(selected === correctIndex ? "correct" : "incorrect");

    if (selected === correctIndex) {
        score += 10;
        scoreSpan.textContent = score;
    } else {
        document.querySelector(`[data-index="${correctIndex}"]`).classList.add("correct");
    }

    document.querySelectorAll(".answer-btn").forEach(b => b.disabled = true);
    nextBtn.disabled = false;
}

// Avanzar a la siguiente pregunta
nextBtn.addEventListener("click", () => {
    if (++currentIndex < questions.length) {
        showQuestion();
    } else {
        endTrivia();
    }
});

// Finalizar el juego
function endTrivia() {
    triviaDiv.style.display = "none";
    endScreen.style.display = "block";
    finalMessage.textContent = `${playerName}, tu puntaje final es de ${score} puntos.`;
}
