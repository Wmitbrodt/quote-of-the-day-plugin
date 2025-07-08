function updateGreeting() {
    const greetingText = document.getElementById("greetingText");
    const currentTime = document.getElementById("currentTime");
    const now = new Date();
  
    const hours = now.getHours();
    let greeting = "Hello";
  
    if (hours < 12) {
      greeting = "Good morning";
    } else if (hours < 18) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }
  
    const options = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    };
    const timeString = now.toLocaleTimeString(undefined, options);
  
    greetingText.textContent = greeting;
    currentTime.textContent = timeString;
  }
  
  updateGreeting();
  
  let quotesData = {};
  let currentCategory = "";
  let currentQuotes = [];
  
  const categorySelect = document.getElementById("categorySelect");
  const quoteContainer = document.getElementById("quoteContainer");
  const quoteText = document.getElementById("quoteText");
  const quoteAuthor = document.getElementById("quoteAuthor");
  const anotherBtn = document.getElementById("anotherBtn");
  
  // Load the quotes.json file
  fetch("../widget/data/quotes.json")
    .then(response => response.json())
    .then(data => {
      quotesData = data;
      populateCategories(Object.keys(quotesData));
    })
    .catch(err => {
      console.error("Failed to load quotes.json:", err);
      quoteText.textContent = "Failed to load quotes.";
    });
  
  // Populate the dropdown
  function populateCategories(categories) {
    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });
  }
  
  // Handle category selection
  categorySelect.addEventListener("change", () => {
    currentCategory = categorySelect.value;
    if (!currentCategory) {
      quoteContainer.style.display = "none";
      return;
    }
  
    currentQuotes = quotesData[currentCategory] || [];
    showRandomQuote();
    quoteContainer.style.display = "block";
  });
  
  // Show a random quote from currentQuotes
  function showRandomQuote() {
    if (!currentQuotes.length) return;
  
    const randomIndex = Math.floor(Math.random() * currentQuotes.length);
    const quote = currentQuotes[randomIndex];
  
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `— ${quote.author}`;
  }
  
  // Show another quote in same category
  anotherBtn.addEventListener("click", () => {
    showRandomQuote();
  });
  