import {useState, useEffect} from "react";
import {Routes, Route, Link} from "react-router-dom";
import BookSearch from "../BookSearch/BookSearch";
import Bookcase from "../Bookcase/Bookcase";
import * as BooksAPI from '../../util/BooksAPI';

import './App.css';


function App() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await BooksAPI.getAll();
            books.length < 1 && setBooks(data);
        })();
    }, [books, setBooks]);
    /**
     * @description Takes a list of 'items' and returns a list of objects consisting of original
     *              string and its camel-cased counterpart.
     * @param {string[]} items
     * @type {{id: string, title: *}[]}
     */
    const shelves = ((items) => {
        const makeCamelCase = (s) => {
            const [head, ...tail] = s.split(' ');
            const prefix = head.toLowerCase();
            const suffix = tail.map((t) => {
                return t.length > 0 ? t[0].toUpperCase() + t.substring(1) : '';
            }).join('');

            return `${prefix}${suffix}`;
        };

        return items.map((e) => {
            return ({title: e, id: makeCamelCase(e)});
        })
    })(['Currently Reading', 'Want to Read', 'Read']);

    /**
     * @description Handles updating books.  Returns a partially applied function taking a 'shelf' as a
     *              parameter before updating the books State on final invocation.
     * @param book
     * @returns {(function(*): void)|*}
     */
    const onShelfChange = (book) => {
        return (shelf) => {
            book.shelf = shelf;
            BooksAPI.update(book, shelf)
                .then((result) => console.log('update api returns: ', result))
                .then(() => setBooks([...books.filter((b) => b.id !== book.id), book]))
                .catch((err) => console.log('error:', err));
        };
    };

    const HomePage = (
        <div className={"list-books"}>
            <div className={"list-books-title"}><h1>MyReads</h1></div>
            <Bookcase books={books} shelves={shelves} onShelfChange={onShelfChange} />
            <div className={"open-search"}><Link to="/search">add a book</Link></div>
        </div>
    );

    const SearchPage = (
        <BookSearch books={books} shelves={shelves} onShelfSelect={onShelfChange} />
    );

    return (
        <div className="app">
            <Routes>
                <Route exact path={"/"} element={HomePage} />
                <Route path={"/search"} element={SearchPage} />
            </Routes>
        </div>
    );
}

export default App;