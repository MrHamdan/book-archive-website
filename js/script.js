const backgroundImage = document.getElementById('bg-img')
backgroundImage.style.backgroundImage = "url('images/hlezTG.jpg')"

// Get value from Input
const searchBook = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;

  // Error Handle
  if (searchText == 0) {
    const bookContainer = document.createElement('book-container');
    const errorMessage = document.getElementById('result-found-container');
    errorMessage.textContent = "";
    spinner.classList.add('d-none');
    errorMessage.innerHTML = `<h2 class="fw-bold">Please enter a book name!!!</h2>`;
    bookContainer.classList.add('d-none');
  }
  else {
    const errorMessage = document.getElementById('result-found-container');
    errorMessage.innerText = "";
    spinner.classList.remove('d-none');

    // Load data
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
  const bookContainer = document.createElement('book-container');
  const errorMessage = document.getElementById('result-found-container');
  errorMessage.textContent = "";
  // error handle
  if (data.num_found === 0) {
    errorMessage.innerText = "No Data Found";
    errorMessage.textContent = "";
    spinner.classList.add('d-none');
    bookContainer.classList.add('d-none');
  }
  else {
    errorMessage.innerText = "";
    // show how many search result
    const bookContainer = document.getElementById('book-container');
    const showResult = document.getElementById('result-found-container');
    const totalBooks = data.num_found;
    const books = data.docs;
    const h2 = document.createElement('h2');
    h2.innerText = `Found ${totalBooks} Number of books and showing ${books.length}`
    showResult.appendChild(h2);

    // clear data
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