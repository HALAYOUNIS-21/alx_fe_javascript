// Array to store quotes
let quotes = [
    { text: "The best way to predict the future is to create it.", category: "Inspiration" },
    { text: "Success is not final; failure is not fatal: It is the courage to continue that counts.", category: "Motivation" },
    { text: "Do what you can, with what you have, where you are.", category: "Perseverance" }
];

// Function to display a random quote
function showRandomQuote() {
    let randomIndex = Math.floor(Math.random() * quotes.length);
    let selectedQuote = quotes[randomIndex];
    
    // Update the DOM with the new quote
    document.getElementById("quoteText").textContent = `"${selectedQuote.text}"`;
    document.getElementById("quoteCategory").textContent = `Category: ${selectedQuote.category}`;
}

// Function to add a new quote
function addQuote() {
    let newQuoteText = document.getElementById("newQuoteText").value;
    let newQuoteCategory = document.getElementById("newQuoteCategory").value;

    if (newQuoteText && newQuoteCategory) {
        // Add the new quote to the array
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        
        // Clear the input fields
        document.getElementById("newQuoteText").value = '';
        document.getElementById("newQuoteCategory").value = '';
        
        // Show the newly added quote
        showRandomQuote();
    } else {
        alert("Please fill in both fields before adding a quote.");
    }
}

// Event listener for the 'Show New Quote' button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Event listener for the 'Add Quote' button
document.getElementById("addQuoteButton").addEventListener("click", addQuote);

// Show a random quote on page load
window.onload = showRandomQuote;