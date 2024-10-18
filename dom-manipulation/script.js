// Load quotes from local storage if available
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Array to hold quote objects
let quotes = [
    { text: "The journey of a thousand miles begins with one step.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "You miss 100% of the shots you don't take.", category: "Motivation" }
];

// Load quotes from local storage when the page loads
loadQuotes();

// Populate categories dynamically in the dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    // Clear existing options except "All Categories"
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    // Get unique categories from the quotes array
    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];

    // Add each category to the dropdown
    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Restore the last selected filter from local storage
    const lastSelectedCategory = localStorage.getItem('selectedCategory');
    if (lastSelectedCategory) {
        categoryFilter.value = lastSelectedCategory;
    }

    // Apply filtering based on the last selected category
    filterQuotes();
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    // Filter quotes based on the selected category
    const filteredQuotes = selectedCategory === 'all' 
        ? quotes 
        : quotes.filter(quote => quote.category === selectedCategory);

    // Update the quote display area
    quoteDisplay.innerHTML = filteredQuotes.map(quote => 
        `<p>"${quote.text}"</p><em>- ${quote.category}</em>`
    ).join('');

    // Save the selected category to local storage
    localStorage.setItem('selectedCategory', selectedCategory);
}

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>"${quotes[randomIndex].text}"</p><em>- ${quotes[randomIndex].category}</em>`;
    
    // Save the last viewed quote to session storage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quotes[randomIndex]));
}

// Call showRandomQuote on button click
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Function to create the add quote form dynamically
function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    formContainer.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button onclick="addQuote()">Add Quote</button>
    `;
    document.body.appendChild(formContainer);
}

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (quoteText && quoteCategory) {
        // Add the new quote to the array
        quotes.push({ text: quoteText, category: quoteCategory });

        // Save the updated quotes to local storage
        saveQuotes();

        // Update the categories dropdown
        populateCategories();

        // Clear input fields
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        // Optionally, show a confirmation message
        alert("New quote added successfully!");
    } else {
        alert("Please fill in both fields.");
    }
}

// Call createAddQuoteForm to generate the form when the page loads
createAddQuoteForm();

// Populate categories and apply the filter when the page loads
populateCategories();
