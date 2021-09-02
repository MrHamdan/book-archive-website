const searchBook = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // Error Handle
  if (searchText == '') {
    const errorMessage = document.getElementById('result-found-container');
    const h2 = document.createElement('h2')
    h2.innerText = 'Please enter a book name !!!';
    errorMessage.appendChild(h2);
  }

  // clear data
  searchField.value = '';


  // load data
  const url = `http://openlibrary.org/search.json?q=${searchText}`
  fetch(url)
    .then(response => response.json())
    .then(data => displaySearchResult(data.docs))
}


const displaySearchResult = (books) => {
  const bookContainer = document.getElementById('book-container');
  // clear data
  bookContainer.textContent = '';
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