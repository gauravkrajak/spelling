let words = [];  // empty array
let currentWord = "";

// Fetch words from words.txt
fetch('words.txt')
  .then(response => response.text())
  .then(data => {
    words = data.split('\n').map(word => word.trim()).filter(word => word.length > 0);
  })
  .catch(error => {
    console.error('Error loading words:', error);
  });

function startGame() {
    if (words.length === 0) {
        alert('Words are still loading... Please wait...');
        return;
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];

    // Show the word hint on the screen
    document.getElementById("wordHint").textContent = `Write this word: ${currentWord}`;
    document.getElementById("result").textContent = "";
    document.getElementById("userInput").value = "";

    // Speak the word aloud with a lower pitch
    speakWord(currentWord);
}

function speakWord(word) {
    // Create a new speech utterance
    const speech = new SpeechSynthesisUtterance(word);

    // Set some speech properties
    speech.lang = 'en-US'; // Set language to English
    speech.pitch = 0.3// Lower pitch for a deeper tone
    speech.rate =1// Adjust speed (normal speed)

    // Speak the word
    window.speechSynthesis.speak(speech);
}

function checkSpelling() {
  const userAnswer = document.getElementById("userInput").value.trim().toLowerCase();
  const correctAnswer = currentWord.toLowerCase();

  if (userAnswer === correctAnswer) {
      document.getElementById("result").textContent = "✅ Correct!";
      document.getElementById("result").style.color = "green";
      speakWord("Correct!"); // Speak confirmation
  } else {
      document.getElementById("result").textContent = "❌ Try Again!";
      document.getElementById("result").style.color = "blue"; // or "red" if you prefer
      speakWord("Try Again!!"); // Speak confirmation
  }
}

