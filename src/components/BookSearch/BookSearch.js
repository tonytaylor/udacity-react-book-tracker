import {useState} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

import Book from "../Book/Book";
import * as BooksAPI from "../../util/BooksAPI";

/**
 * @description Performs searches for books.
 * @param books
 * @param shelves
 * @param onShelfSelect
 * @param onQueryUpdate
 * @returns {JSX.Element}
 * @constructor
 */
const BookSearch = ({books, shelves, onShelfSelect}) => {
    const [searchEntry, setSearchEntry] = useState('');
    const [bks, setBks] = useState([]);

    const searchBooks = (bs) => bs.map((searchedBook) => {
        const myBook = books.filter((myBook) => myBook.id === searchedBook.id)[0];
        searchedBook.shelf = myBook ? myBook.shelf : "none";
        return searchedBook;
    });

    /**
     * @description Event handler to update local state.
     * @param event
     * @returns void
     */
    const onInputUpdate = (event) => {
        setSearchEntry(event.target.value);

        event.target.value && (async (query) => {
            const results = await BooksAPI.search(query);
            setBks(results.error ? results.items : searchBooks(results));
        })(event.target.value);
    };

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link
                    to={"/"}
                    className="close-search"
                >
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={onInputUpdate}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {(searchEntry.length > 0) && bks.map((book, index) => {
                        return (
                            <Book
                                key={index}
                                book={book}
                                shelves={shelves}
                                onShelfChange={onShelfSelect(book)} />
                        );
                    })}
                </ol>
            </div>
        </div>
    );
};

BookSearch.propTypes = {
    book: PropTypes.shape(Book.propTypes)
};

export default BookSearch;