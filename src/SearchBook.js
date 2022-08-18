import React from 'react';
import { useEffect, useState } from 'react';
import "./App.css";
import Book from "./Book";
import { Link } from 'react-router-dom';
import {search} from './BooksAPI'


const SearchBook = ({books, updateShelf, setView})=> {

    const [ req , setReq ] = useState('');
    const [ res , setRes] = useState([]);

    useEffect(()=>{
        const handleRequest = ()=>{
            if(req.length>0){
                search(req.trim()).then((data) =>{
                    if(data.error){
                        console.log(data.error);
                        setRes([]);
                    }
                    else{
                        data.forEach(element => {
                            let trigger = false;
                            books.forEach(e => {
                                if(element.id === e.id){
                                    element.shelf = e.shelf;
                                    trigger = true;
                                }
                            })
                            if(!trigger)
                                element.shelf = 'none';
                        })
                        setRes(data);
                    }
                }).catch(e => console.log('this catch',e))
            }
        }
        req === '' ? setRes([]) : handleRequest()
    },[req, books])


    return (
        <div>
        {res && <div className="search-books">
          <div className="search-books-bar">
            <Link to='/'
              className="close-search"
            >
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                value={req}
                onChange={(e) => setReq(e.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
                {req && res.map(book => (
                    <li key={book.id}>
                        <Book book={book} updateShelf={updateShelf} setView={setView}/>
                    </li>
                ))}
            </ol>
          </div>
        </div>}            
        </div>
    )
}

export default SearchBook;