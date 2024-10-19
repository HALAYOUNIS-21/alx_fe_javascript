let quotes = [];

// Load quotes from local storage on page load
window.onload = function() {
    loadQuotes();
    populateCategories();
    const lastCategory = localStorage.getItem("lastSelectedCategory") || "all";
    document.getElementById("categoryFilter").value = lastCategory;
    filterQuotes(); // Restore displayed quotes based on last selected category
};

// Load quotes from local storage
function loadQuotes() {
    const savedQuotes = localStorage.getItem("quotes");
    if (savedQuotes) {
        quotes = JSON.parse(savedQuotes);
    } else {
        // Initial default quotes
        quotes = [
            { text: "Quote 1", category: "inspiration" },
            { text: "Quote 2", category: "life" },
            { text: "Quote 3", category: "inspiration" },
            { text: "Quote 4", category: "humor" },
        ];
        saveQuotes(); // Save default quotes to local storage
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Populate categories in the dropdown
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    const categories = [...new Set(quotes.map(quote => quote.category))]; // Extract unique categories

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    localStorage.setItem("lastSelectedCategory", selectedCategory); // Save to local storage

    const filteredQuotes = selectedCategory === "all" 
        ? quotes 
        : quotes.filter(quote => quote.category === selectedCategory);

    displayQuotes(filteredQuotes);
}

// Display quotes in the DOM
function displayQuotes(quotesToDisplay) {
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = ""; // Clear existing quotes

    quotesToDisplay.forEach(quote => {
        const quoteElement = document.createElement("p");
        quoteElement.textContent = `${quote.text} (${quote.category})`;
        quoteDisplay.appendChild(quoteElement);
    });
}

// Show a new random quote
document.getElementById("newQuote").addEventListener("click", function() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    displayQuotes([quotes[randomIndex]]);
});

// Add a new quote
document.getElementById("addQuoteButton").addEventListener("click", function() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        
        saveQuotes(); // Save updated quotes to local storage
        populateCategories(); // Update categories
        displayQuotes(quotes); // Refresh the displayed quotes
        document.getElementById("newQuoteText").value = ''; // Clear input
        document.getElementById("newQuoteCategory").value = ''; // Clear input
    } else {
        alert("Please enter both quote and category.");
    }
});

// Import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
        populateCategories(); // Update categories after import
        filterQuotes(); // Refresh displayed quotes
    };
    fileReader.readAsText(event.target.files[0]);
}

// Export quotes to a JSON file
function exportQuotes() {
    const json = JSON.stringify(quotes, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Add export button functionality
const exportButton = document.createElement("button");
exportButton.textContent = "Export Quotes";
exportButton.addEventListener("click", exportQuotes);
document.body.appendChild(exportButton);