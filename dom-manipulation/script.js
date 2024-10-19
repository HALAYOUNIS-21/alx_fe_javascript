// Initialize the quotes array
let quotes = [];

// Default quotes
const defaultQuotes = [
  { text: "Believe in yourself and all that you are.", category: "Motivation" },
  { text: "Success usually comes to those who are too busy to be looking for it.", category: "Success" },
  { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
];

// Load default quotes if quotes array is empty
function loadQuotes() {
  const storedQuotes = JSON.parse(localStorage.getItem('quotes'));
  quotes = storedQuotes ? storedQuotes : [...defaultQuotes];
  displayRandomQuote(); // Show a quote when loading
}

// Function to display a random quote
function displayRandomQuote() {
  if (quotes.length === 0) {
    document.getElementById("quoteText").textContent = "No quotes available.";
    document.getElementById("quoteCategory").textContent = "";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  document.getElementById("quoteText").textContent = `"${randomQuote.text}"`;
  document.getElementById("quoteCategory").textContent = `Category: ${randomQuote.category}`;
}

// Function to add a new quote to the array and update the DOM
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });

    // Save quotes to local storage
    localStorage.setItem('quotes', JSON.stringify(quotes));

    // Clear input fields
    document.getElementById("newQuoteText").value = '';
    document.getElementById("newQuoteCategory").value = '';

    displayRandomQuote(); // Show a new random quote after adding
  } else {
    alert("Please fill in both the quote and category fields.");
  }
}

// Event listeners
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
document.getElementById("addQuoteButton").addEventListener("click", addQuote);

// Load quotes on initialization
loadQuotes();