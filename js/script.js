const backgroundImage = document.getElementById('bg-img')
backgroundImage.style.backgroundImage = "url('images/hlezTG.jpg')"
const bookContainer = document.getElementById('book-container');
const searchField = document.getElementById('search-field');
const showResult = document.getElementById('result-found-container');
const errorMessage = document.getElementById('result-found-container');


// Get value from Input
const searchBook = () => {
  const searchText = searchField.value;

  // Error Handle
  if (searchText === '') {
    spinner.classList.add('d-none');
    errorMessage.innerHTML = `<h2 class="fw-bold">Please enter a book name!!!</h2>`;
    bookContainer.textContent = '';
  }
  else {
    errorMessage.innerText = '';
    spinner.classList.remove('d-none');

    // Load data from url
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
      .then(response => response.json())
      .then(data => displaySearchResult(data))
      .finally(() => spinner.classList.add('d-none'))
  }

  // clear data
  searchField.value = '';
}

// Display data
const displaySearchResult = (data) => {
  bookContainer.textContent = '';
  errorMessage.textContent = '';

  // error handle
  if (data.num_found === 0) {
    alert('No data Found');
    errorMessage.textContent = '';
    spinner.classList.add('d-none');
  }
  else {
    errorMessage.innerText = '';

    // Show how many search result
    const totalBooks = data.num_found;
    const books = data.docs;
    const h2 = document.createElement('h2');
    h2.innerText = `Found ${totalBooks} Number of books and showing ${books.length}`
    showResult.appendChild(h2);

    // Clear data
    bookContainer.textContent = '';

    // Run forEach loop and show books
    books.forEach(book => {
      const bookName = book.title;
      let authorName = book.author_name;
      let publishedDate = book.first_publish_year;
      let publisherName = book.publisher;
      if (authorName === '' || authorName == null) {
        authorName = 'Unknown';
      }
      if (publishedDate === '' || publishedDate == null) {
        publishedDate = 'Unknown';
      }
      if (publisherName === '' || publisherName == null) {
        publisherName = 'Unknown';
      }
      const div = document.createElement('div');
      div.classList.add('col')
      div.innerHTML = `
    <div class="card h-100 shadow rounded-3 p-3">
        <img height="500px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top p-3" alt="Book Image">
          <div class="card-body">
            <h4 class="card-title">Book Name: ${bookName}</h4>
            <h5 class="card-title">Author: ${authorName}</h5>
            <p class="card-text">Publisher: ${publisherName}</p>
            <p class="card-text">First Published: ${publishedDate}</p>
          </div>
    </div>
    `;
      bookContainer.appendChild(div);
    })
  }
}