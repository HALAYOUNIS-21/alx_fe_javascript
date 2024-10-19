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
  
  // Function to create the add quote form dynamically
  function createAddQuoteForm() {
    const formDiv = document.createElement('div');
  
    const inputText = document.createElement('input');
    inputText.setAttribute('id', 'newQuoteText');
    inputText.setAttribute('type', 'text');
    inputText.setAttribute('placeholder', 'Enter a new quote');
  
    const inputCategory = document.createElement('input');
    inputCategory.setAttribute('id', 'newQuoteCategory');
    inputCategory.setAttribute('type', 'text');
    inputCategory.setAttribute('placeholder', 'Enter quote category');
  
    const addButton = document.createElement('button');
    addButton.setAttribute('id', 'addQuoteButton');
    addButton.textContent = 'Add Quote';
    
    // Append the inputs and button to the form div
    formDiv.appendChild(inputText);
    formDiv.appendChild(inputCategory);
    formDiv.appendChild(addButton);
  
    // Append the form div to the body (or a specific container)
    document.body.appendChild(formDiv);
  
    // Add event listener for adding a new quote
    addButton.addEventListener('click', addQuote);
  }
  
  // Event listener for the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Call the function to create the form when the page loads
  createAddQuoteForm();