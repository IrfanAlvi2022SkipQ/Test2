import React from "react";
import { Link } from "react-router-dom";
import { update } from "./BooksAPI";

const Book = ({ book, updateShelf, setView }) => {
  async function updateCate(e) {
    try {
      await update(book, e.target.value);
      updateShelf(e.target.value, book);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      {book.authors && book.imageLinks && 
        <div className="book">
          <div className="book-top">
          <Link to='/detail'>
            <div
              className="book-cover"
              onClick={() => setView(book)}
              style={{
                width: 128,
                height: 192,
                backgroundImage: `url(${book.imageLinks.smallThumbnail})`,
              }}
            ></div>
            </Link>
            <div className="book-shelf-changer">
              <select defaultValue={book.shelf} onChange={updateCate}>
                <option disabled>Move to</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None of Above</option>
              </select>
            </div>
          </div>
          <Link to='/detail'>
            <div className="book-title" onClick={() => setView(book)}>
                {book.title}
            </div>
            </Link>
          {book.authors.map((author) => (
            <div key={book.id + author}>
              <div className="book-authors">{author}</div>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default Book;
