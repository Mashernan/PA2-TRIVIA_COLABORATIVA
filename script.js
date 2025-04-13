const questions = [
  {
    question: "¿Cuál es la capital de Perú?",
    answers: ["Cusco", "Lima", "Arequipa", "Trujillo"],
    correct: 1
  },
  {
    question: "¿Qué lenguaje se usa para crear páginas web?",
    answers: ["Python", "HTML", "C#", "Java"],
    correct: 1
  },
  {
    question: "¿Quién pintó la Mona Lisa?",
    answers: ["Van Gogh", "Picasso", "Da Vinci", "Dalí"],
    correct: 2
  }
];

let currentIndex = 0;

const container = document.getElementById('question-container');
const nextBtn = document.getElementById('next-btn');

function showQuestion(index) {
  const q = questions[index];
  container.innerHTML = `
    <h2>${q.question}</h2>
    ${q.answers.map((answer, i) => `
      <button class="answer-btn" data-index="${i}">${answer}</button>
    `).join('')}
  `;

  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const selected = parseInt(e.target.dataset.index);
      const isCorrect = selected === q.correct;
      e.target.classList.add(isCorrect ? 'correct' : 'incorrect');
      document.querySelectorAll('.answer-btn').forEach(b => b.disabled = true);
    });
  });
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % questions.length;
  showQuestion(currentIndex);
});

showQuestion(currentIndex);
