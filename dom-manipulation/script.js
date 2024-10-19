// Initial quotes array containing some default quotes
const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" }
];

// Function to show a random quote on the page
function showRandomQuote() {
    // Step 1: Generate a random index within the quotes array
    let randomIndex = Math.floor(Math.random() * quotes.length);

    // Step 2: Select the quote using the random index
    let selectedQuote = quotes[randomIndex];

    // Step 3: Update the DOM with the selected quote text and category
    document.getElementById("quoteText").textContent = `"${selectedQuote.text}"`;
    document.getElementById("quoteCategory").textContent = `Category: ${selectedQuote.category}`;
}

// Function to add a new quote to the quotes array and update the display
function addQuote() {
    // Step 1: Get the input values for the new quote and category
    let newQuoteText = document.getElementById("newQuoteText").value;
    let newQuoteCategory = document.getElementById("newQuoteCategory").value;

    // Step 2: Check that both fields have been filled out
    if (newQuoteText && newQuoteCategory) {
        // Step 3: Add the new quote to the array
        quotes.push({ text: newQuoteText, category: newQuoteCategory });

        // Step 4: Clear the input fields after the quote is added
        document.getElementById("newQuoteText").value = '';
        document.getElementById("newQuoteCategory").value = '';

        // Step 5: Show the newly added quote on the page
        showRandomQuote();
    } else {
        // Step 6: Alert the user if any of the input fields are empty
        alert("Please fill in both fields before adding a quote.");
    }
}

// Event listener for the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Initial call to display a random quote when the page first loads
showRandomQuote();