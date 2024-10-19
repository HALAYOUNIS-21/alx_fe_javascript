// Initial array of quotes with text and category
const quotes = [
    { text: "Believe in yourself and all that you are.", category: "Motivation" },
    { text: "Success usually comes to those who are too busy to be looking for it.", category: "Success" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
  ];
  
  // Function to display a random quote
  function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
  
    // Update the DOM to show the quote and its category
    document.getElementById("quoteText").textContent = `"${randomQuote.text}"`;
    document.getElementById("quoteCategory").textContent = `Category: ${randomQuote.category}`;
  }
  
  // Function to add a new quote to the array and update the DOM
  function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;
  
    // Check if both inputs are filled
    if (newQuoteText && newQuoteCategory) {
      // Add the new quote to the quotes array
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
  
      // Clear the input fields
      document.getElementById("newQuoteText").value = '';
      document.getElementById("newQuoteCategory").value = '';
  
      // Display the newly added quote
      displayRandomQuote();
    } else {
      alert("Please fill in both the quote and category fields.");
    }
  }
  
  // Add event listener to the "Show New Quote" button
  document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
  
  // Add event listener to the "Add Quote" button
  document.getElementById("addQuoteButton").addEventListener("click", addQuote);
  
  // Display a random quote when the page loads
  displayRandomQuote();