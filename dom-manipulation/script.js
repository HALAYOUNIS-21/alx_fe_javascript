// Initialize quotes from local storage or set default values
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Inspiration" },
    { text: "The purpose of our lives is to be happy.", category: "Happiness" }
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    if (quotes.length === 0) {
      alert('No quotes available');
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
  
    // Save the last viewed quote in session storage
    sessionStorage.setItem('lastQuote', JSON.stringify(randomQuote));
  
    // Update the DOM with the selected quote
    document.getElementById('quoteDisplay').innerHTML = `
      <p>${randomQuote.text}</p>
      <p><em>${randomQuote.category}</em></p>
    `;
  }
  
  // Function to save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Function to add a new quote
  function addQuote(newQuoteText, newQuoteCategory) {
    const newQuote = {
      text: newQuoteText,
      category: newQuoteCategory
    };
  
    quotes.push(newQuote); // Add the new quote to the array
    saveQuotes(); // Save quotes to local storage
    showRandomQuote(); // Display the newly added quote
  }
  
  // Function to export quotes to a JSON file
  function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2); // Convert quotes to JSON
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
  }
  
  // Function to import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    
    fileReader.onload = function(e) {
      try {
        const importedQuotes = JSON.parse(e.target.result);
        
        if (Array.isArray(importedQuotes)) {
          quotes.push(...importedQuotes); // Add imported quotes to existing array
          saveQuotes(); // Save the updated quotes to local storage
          alert('Quotes imported successfully!');
          showRandomQuote(); // Display a random quote after import
        } else {
          alert('Invalid JSON file format.');
        }
      } catch (error) {
        alert('Failed to load quotes from the file.');
      }
    };
    
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Event listener for the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Event listener for exporting quotes
  document.getElementById('exportQuotes').addEventListener('click', exportQuotes);
  
  // Load a random quote on page load
  showRandomQuote();