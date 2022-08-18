import "./App.css";
import { useEffect, useState } from "react";
import Shelves from "./Shelves";
import Detail from './Detail'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAll } from "./BooksAPI";
import SearchBook from "./SearchBook";

function App() {
  const [books, setBooks] = useState([]);
  const [bookView, setBookView] = useState([]);

  const setData = () => {
    getAll().then(data => {
      if(data) setBooks(data) 
    }).catch(e => console.log(e))
}

  function updateShelf(shelf, book){
    const b = books.filter(b => b.id === book.id)
    let len = b.length; 
    if(len > 0){
      const other = books.filter(b => b.id !== book.id)
      b[0].shelf = shelf
      setBooks([...other,...b])
    } else {
      book.shelf = shelf
      setBooks([...books,book])
    }
  }


  useEffect(() => {
    setData();
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
        {console.log(books)}
          <Route exact path="/MyRead" element={<Shelves books={books} updateShelf={updateShelf} setView={setBookView} />} />
          <Route exact path="/" element={<Shelves books={books} updateShelf={updateShelf} setView={setBookView} />} />
          <Route exact path="/detail" element={<Detail book={bookView}/>} />
          <Route exact path="/search" element={<SearchBook books={books} updateShelf={updateShelf} setView={setBookView} />} />
        </Routes>
      </div>
    </Router>

    // <Shelves />
  );
}

export default App;
