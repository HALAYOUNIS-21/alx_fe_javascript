// Initial quotes array
const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" }
];

// Function to select and display a random quote
function displayRandomQuote() {
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * quotes.length);

    // Select the quote using the random index
    const randomQuote = quotes[randomIndex];

    // Update the DOM elements with the selected quote and its category
    document.getElementById("quoteText").innerHTML = `"${randomQuote.text}"`;
    document.getElementById("quoteCategory").innerHTML = `Category: ${randomQuote.category}`;
}

// Function to add a new quote and update the DOM
function addQuote() {
    // Get the values from the input fields
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;

    // Validate that both fields are filled out
    if (newQuoteText && newQuoteCategory) {
        // Add the new quote to the array
        quotes.push({ text: newQuoteText, category: newQuoteCategory });

        // Clear the input fields
        document.getElementById("newQuoteText").value = '';
        document.getElementById("newQuoteCategory").value = '';

        // Display the newly added quote
        displayRandomQuote();
    } else {
        alert("Please enter both the quote text and its category.");
    }
}

// Event listener for the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// Display a random quote when the page loads initially
displayRandomQuote();