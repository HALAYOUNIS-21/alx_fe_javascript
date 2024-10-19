let quotes = [];
const serverUrl = 'https://jsonplaceholder.typicode.com/posts'; // Mock API URL
const syncInterval = 30000; // 30 seconds for syncing

// Load quotes from local storage on page load
window.onload = function() {
    loadQuotes();
    populateCategories();
    const lastCategory = localStorage.getItem("lastSelectedCategory") || "all";
    document.getElementById("categoryFilter").value = lastCategory;
    filterQuotes(); // Restore displayed quotes based on last selected category
    startSyncing(); // Start syncing with the server
};

// Load quotes from local storage
function loadQuotes() {
    const savedQuotes = localStorage.getItem("quotes");
    quotes = savedQuotes ? JSON.parse(savedQuotes) : [];
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Populate categories in the dropdown
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    const categories = [...new Set(quotes.map(quote => quote.category))]; // Extract unique categories

    categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Reset options
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
        
        postQuoteToServer(newQuote); // Post new quote to server
    } else {
        alert("Please enter both quote and category.");
    }
});

// Fetch quotes from the server
function fetchQuotesFromServer() {
    fetch(serverUrl)
        .then(response => response.json())
        .then(serverQuotes => {
            // Update local quotes with server quotes
            handleServerQuotes(serverQuotes);
        })
        .catch((error) => {
            console.error('Error fetching quotes from server:', error);
        });
}

// Handle quotes received from the server
function handleServerQuotes(serverQuotes) {
    serverQuotes.forEach(serverQuote => {
        const exists = quotes.some(quote => quote.text === serverQuote.title && quote.category === "default"); // Assuming "default" category for fetched data
        if (!exists) {
            quotes.push({ text: serverQuote.title, category: "default" }); // Create a new quote object
        }
    });

    saveQuotes(); // Update local storage with new quotes
    filterQuotes(); // Refresh displayed quotes
    notifyUser('Data has been updated from the server.');
}

// Post a new quote to the server
function postQuoteToServer(quote) {
    fetch(serverUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: quote.text, body: quote.category }), // Adjusting the structure for mock API
    })
    .then(response => response.json())
    .then(data => {
        console.log('Quote posted to server:', data);
    })
    .catch((error) => {
        console.error('Error posting quote to server:', error);
    });
}

// Start syncing with the server periodically
function startSyncing() {
    fetchQuotesFromServer(); // Initial fetch
    setInterval(fetchQuotesFromServer, syncInterval); // Periodic fetch
}

// Notify user of updates
function notifyUser(message) {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.backgroundColor = "lightblue";
    notification.style.padding = "10px";
    notification.style.margin = "10px 0";
    document.body.prepend(notification);
    setTimeout(() => notification.remove(), 3000); // Remove after 3 seconds
}

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