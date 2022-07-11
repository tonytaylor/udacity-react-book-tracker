import {Routes, Route, Link} from "react-router-dom";
import {useLocalStorage} from "../../util/LocalStorage";
import BookSearch from "../BookSearch/BookSearch";
import Bookcase from "../Bookcase/Bookcase";

import './App.css';


function App() {
    const [books, setBooks] = useLocalStorage("myReads-books", []);

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

            if (shelf === 'none') {
                setBooks(books.filter((b) => b.id !== book.id))
            } else {
                book.currentShelf = shelf;

                const identicalBook = books.findIndex((b) => b.id === book.id);
                const updatedList = (identicalBook > -1) ?
                    [...books.slice(0, identicalBook), book, ...books.slice(identicalBook + 1)] :
                    [...books, book];

                setBooks(updatedList);
            }
        };
    };

    const HomePage = (
        <div className={"list-books"}>
            <div className={"list-books-title"}><h1>MyReads</h1></div>
            <Bookcase books={books} shelves={shelves} onShelfChange={onShelfChange} />
            <div className={"open-search"}><Link to="/add">add a book</Link></div>
        </div>
    );

    const SearchPage = (
        <BookSearch shelves={shelves} onShelfSelect={onShelfChange} />
    );

    return (
        <div className="app">
            <Routes>
                <Route exact path={"/"} element={HomePage} />
                <Route path={"/add"} element={SearchPage} />
            </Routes>
        </div>
    );
}

export default App;