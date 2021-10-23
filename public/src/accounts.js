const findAccountById = (accounts, id) => accounts.find( account => account.id === id )

function sortAccountsByLastName(accounts) {
  return accounts.sort((accA, accB) => accA.name.last.toLowerCase() > accB.name.last.toLowerCase()? 1 : -1)
}

function getTotalNumberOfBorrows(account, books) {
 let count = 0
  for ( let book of books){
    for(let i = 0; i < book.borrows.length; i++){
      if (account.id === book.borrows[i].id){
        count++
      }
    }
  }
 return count
}
  
  
function getBooksPossessedByAccount(account, books, authors) {
  return books.filter((book) =>{
  const recent = book.borrows[0]
  return !recent.returned && recent.id === account.id
})
.map((book) => {
  const author = authors.find((author) => author.id === book.authorId)
  return {...book, author}
})

}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
