const findAuthorById = (authors, id) => authors.find((author) => author.id == id) 

function findBookById(books, id) {
  return books.find((book)=> book.id == id)
}

function partitionBooksByBorrowedStatus(books) {
  return books.reduce((acc, book) => {
    const[borrowed, returned] = acc
    const recent = book.borrows[0] 
    if (recent.returned) returned.push(book)
     else borrowed.push(book)
    return acc
  }, [[], []])
}

function getBorrowersForBook(book, accounts) {
  let finalResult = [];
  let borrowedBooks = book.borrows;
  borrowedBooks.forEach(borrowedBooks => {
    let account = accounts.find(user => user.id === borrowedBooks.id);
    let user = account;
    user['returned'] =  borrowedBooks.returned;
    finalResult.push(user);
})
return finalResult.slice(0,10);
};

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
