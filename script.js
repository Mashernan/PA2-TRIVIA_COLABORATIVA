const allQuestions = [
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
    },
    {
      question: "¿Cuál es el planeta más grande del sistema solar?",
      answers: ["Marte", "Tierra", "Júpiter", "Saturno"],
      correct: 2
    },
    {
      question: "¿Cuántos continentes hay?",
      answers: ["5", "6", "7", "8"],
      correct: 2
    },
    {
      question: "¿Quién escribió 'Cien años de soledad'?",
      answers: ["Pablo Neruda", "Gabriel García Márquez", "Mario Vargas Llosa", "Octavio Paz"],
      correct: 1
    },
    {
      question: "¿Qué gas respiramos principalmente?",
      answers: ["Oxígeno", "Dióxido de carbono", "Nitrógeno", "Hidrógeno"],
      correct: 2
    },
    {
      question: "¿Cuánto es 5 x 6?",
      answers: ["30", "25", "35", "20"],
      correct: 0
    },
    {
      question: "¿Qué país ganó el Mundial 2014?",
      answers: ["Argentina", "Brasil", "Alemania", "Francia"],
      correct: 2
    },
    {
      question: "¿Qué instrumento tiene cuerdas?",
      answers: ["Flauta", "Violín", "Trombón", "Batería"],
      correct: 1
    },
    {
      question: "¿Cuál es el metal más ligero?",
      answers: ["Aluminio", "Oro", "Litio", "Hierro"],
      correct: 2
    }
  ];
  
  function getRandomQuestions(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }
  
  const questions = getRandomQuestions(allQuestions, 10);
  let currentIndex = 0;
  let score = 0;
  
  const container = document.getElementById('question-container');
  const nextBtn = document.getElementById('next-btn');
  const scoreContainer = document.getElementById('score-container');
  const correctSound = document.getElementById('correct-sound');
  const wrongSound = document.getElementById('wrong-sound');
  
  function updateProgressBar() {
    const progress = ((currentIndex + 1) / questions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
  }
  
  function showQuestion(index) {
    const q = questions[index];
    container.classList.remove('fade-in');
    void container.offsetWidth;
    container.classList.add('fade-in');
  
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
        if (isCorrect) {
          score++;
          correctSound.play();
        } else {
          wrongSound.play();
        }
        e.target.classList.add(isCorrect ? 'correct' : 'incorrect');
        document.querySelectorAll('.answer-btn').forEach(b => b.disabled = true);
        nextBtn.disabled = false;
      });
    });
  
    nextBtn.disabled = true;
    updateProgressBar();
  }
  
  nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex < questions.length) {
      showQuestion(currentIndex);
    } else {
      showFinalScore();
    }
  });
  
  function showFinalScore() {
    container.innerHTML = '';
    nextBtn.style.display = 'none';
    scoreContainer.innerHTML = `<h2>Tu puntaje final es: ${score} / ${questions.length}</h2>`;
    scoreContainer.classList.add('show');
  }
  
  showQuestion(currentIndex);
