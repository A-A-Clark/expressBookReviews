const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Check if a user with the given username already exists
const doesExist = (username) => {
  // Filter the users array for any user with the same username
  let userswithsamename = users.filter((user) => {
      return user.username === username;
  });
  // Return true if any user with the same username is found, otherwise false
  if (userswithsamename.length > 0) {
      return true;
  } else {
      return false;
  }
}

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  if (username && password) {
    // Check if the user does not already exist
    if (!doesExist(username)) {
      // Add the new user to the users array
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  // Return error if username or password is missing
  return res.status(404).json({ message: "Unable to register user." });
});

// // Get the book list available in the shop
// public_users.get("/", function (req, res) {
//   res.send(JSON.stringify(books, null, 4));
// });

// Get list of books asynchronously (Task 10)
public_users.get("/", function (req, res) {
  let bookListPromimse = new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify(books, null, 4)));
  });
  bookListPromimse.then(() => console.log("Promise to acquire list of books has been resolved"));
});

// // Get book details based on ISBN
// public_users.get("/isbn/:isbn", function (req, res) {
//   const isbn = req.params.isbn;
//   res.send(books[isbn]);
// });

// Get book by ISBN asynchronously (Task 11)
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  let bookByISBNPromise = new Promise((resolve, reject) => {
    resolve(res.send(books[isbn]));
  });
  bookByISBNPromise.then(() => console.log("Promise to acquire book by ISBN has been resolved"));
});

// // Get book details based on author
// public_users.get("/author/:author", function (req, res) {
//   const author = req.params.author;
//   let filtered_by_author = Object.values(books).filter(
//     (book) => book.author === author
//   );
//   res.send(filtered_by_author);
// });

// Get book details based on author asynchronouly (Task 12)
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  let filtered_by_author_promise = new Promise((resolve, reject) => {
    let filtered_by_author = Object.values(books).filter(
      (book) => book.author === author
    );
    resolve(res.send(filtered_by_author));
  });
  filtered_by_author_promise.then(() => console.log("Promise to get book details based on author has been resolved"));
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  let filtered_by_title = Object.values(books).filter(
    (book) => book.title === title
  );
  res.send(filtered_by_title);
});

// //  Get book review
// public_users.get("/review/:isbn", function (req, res) {
//   const isbn = req.params.isbn;
//   book = books[isbn];
//   res.send(book.reviews);
// });

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  book = books[isbn];
  let book_review_promise = new Promise((resolve,reject) => {
    resolve(res.send(book.reviews));
  });
book_review_promise.then(() => console.log("Promise to get book reviews by ISBN has been resolved"));
});

module.exports.general = public_users;
