document.addEventListener('DOMContentLoaded', function() {
  displayBooks();
});

function addBook() {
  const title = document.getElementById('judul').value;
  const author = document.getElementById('penulis').value;
  const status = document.getElementById('status').value;

  if (title === '' || author === '') {
    alert('Mohon masukkan judul buku dan penulis');
    return;
  }

  const book = { id: Date.now(), title, author, year: new Date().getFullYear(), isComplete: status === 'dibaca' };
  saveBook(book);

  document.getElementById('judul').value = '';
  document.getElementById('penulis').value = '';
  displayBooks();
}

function saveBook(book) {
  let books = getBooks();

  if (!books) {
    books = [];
  }

  books.push(book);
  localStorage.setItem('buku', JSON.stringify(books));
}

function getBooks() {
  return JSON.parse(localStorage.getItem('buku'));
}

function displayBooks() {
  const unreadShelf = document.getElementById('list-belum-dibaca');
  const readShelf = document.getElementById('list-selesai-dibaca');

  unreadShelf.innerHTML = '';
  readShelf.innerHTML = '';

  const books = getBooks();

  if (books) {
    books.forEach(function(book) {
      const li = document.createElement('li');
      li.textContent = `${book.title} by ${book.author}`;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Hapus';
      deleteButton.onclick = function() {
        deleteBook(book);
        displayBooks();
      };

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.onclick = function() {
        editBook(book);
      };

      li.appendChild(deleteButton);
      li.appendChild(editButton);

      if (book.isComplete) {
        readShelf.appendChild(li);
      } else {
        const readButton = document.createElement('button');
        readButton.textContent = 'Selesai dibaca';
        readButton.onclick = function() {
          markAsRead(book);
          displayBooks();
        };

        li.appendChild(readButton);
        unreadShelf.appendChild(li);
      }
    });
  }
}

function deleteBook(book) {
  let books = getBooks();

  if (books) {
    books = books.filter(b => b.id !== book.id);
    localStorage.setItem('buku', JSON.stringify(books));
  }
}

function markAsRead(book) {
  let books = getBooks();

  if (books) {
    const index = books.findIndex(b => b.id === book.id);

    if (index !== -1) {
      books[index].isComplete = true;
      localStorage.setItem('buku', JSON.stringify(books));
    }
  }
}

function editBook(book) {
  const newTitle = prompt("Enter new title:", book.title);
  const newAuthor = prompt("Enter new author:", book.author);
  const newStatus = confirm("Is the book already read?");

  if (newTitle !== null && newAuthor !== null) {
    let books = getBooks();

    const index = books.findIndex(b => b.id === book.id);

    if (index !== -1) {
      books[index].title = newTitle;
      books[index].author = newAuthor;
      books[index].isComplete = newStatus;
      localStorage.setItem('buku', JSON.stringify(books));
      displayBooks();
    }
  }
}

function searchBooks() {
  const searchInput = document.getElementById('cari').value
}