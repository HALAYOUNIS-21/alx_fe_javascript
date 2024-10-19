const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Inspiration" },
    { text: "The purpose of our lives is to be happy.", category: "Happiness" }
  ];
  
  // Function to display a random quote (renamed to showRandomQuote)
  function showRandomQuote() {
    if (quotes.length === 0) {
      alert('No quotes available');
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
  
    // Update the DOM with the selected quote
    document.getElementById('quoteDisplay').innerHTML = `
      <p>${randomQuote.text}</p>
      <p><em>${randomQuote.category}</em></p>
    `;
  }
  
  // Function to add a new quote
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (newQuoteText === '' || newQuoteCategory === '') {
      alert('Please fill in both fields.');
      return;
    }
  
    const newQuote = {
      text: newQuoteText,
      category: newQuoteCategory
    };
  
    quotes.push(newQuote); // Add the new quote to the array
    showRandomQuote(); // Update the display with the newly added quote
  
    // Clear the input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  }
  
  // Event listener for the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Event listener for the "Add Quote" button
  document.getElementById('addQuoteButton').addEventListener('click', addQuote);