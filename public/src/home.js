function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    if (!book.borrows[0].returned) acc += 1;
    return acc;
  }, 0);
}

function _objectSortedValues(obj) {
  const keys = object.keys(obj);
  return keys.sort((keyA, KeyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    }
  });
}

function getMostCommonGenres(books) {
 const getras =  books.reduce((acc, book) => {
   let {genre} = book

  if( acc[genre] === undefined){
    acc[genre] = { name: `${genre}`, count: 1}
  } else {
    acc[genre].count++
  }
  return acc
 },{})
 const allras = Object.values(getras)

 allras.sort((a, b) => (a.count > b.count ? -1 : 1))

 return allras.slice(0, 5)
};

function getMostPopularBooks(books) {
  const groupById = books.reduce((acc, book) => {
    acc[book.id] = book.borrows.length;
    return acc;
  }, {});
  console.log(groupById)
  const keys = Object.keys(groupById);
  console.log(keys)
  let sorted = keys.sort((keyA, keyB) => {
    if (groupById[keyA] > groupById[keyB]) {
      return -1;
    } else if (groupById[keyB] > groupById[keyA]) {
      return 1;
    }
    return 0;
  })
  let newArr = sorted.map((id) => {
    let book = books.find(book => book.id === id);
    let count = groupById[id];
    return {name: book.title, count: count};
  })
  return newArr.slice(0, 5)
}

function getMostPopularAuthors(books, authors) {
  let allAuths = authors.reduce((acc, author) => {
    const {
      id,
      name: {first, last}
    } = author

    let authorInfo = { name: `${first} ${last}`, count: 0}

    books.filter((book) => book.authorId === id ? (authorInfo.count += book.borrows.length) : null)
    acc.push(authorInfo)
    return acc
  }, [])

  allAuths.sort((author1, author2) => author1.count > author2.count ? -1 : 1 );

  return allAuths.slice(0, 5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
