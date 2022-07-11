import {useState} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

import Book from "../Book/Book";
import * as BooksAPI from "../../util/BooksAPI";

/**
 * @description Performs searches for books.
 * @param shelves
 * @param onShelfSelect
 * @returns {JSX.Element}
 * @constructor
 */
const BookSearch = ({shelves, onShelfSelect}) => {
    const [searchEntry, setSearchEntry] = useState('');
    const [books, setBooks] = useState([]);

    /**
     * @description Event handler to update local state.
     * @param event
     * @returns void
     */
    const onInputUpdate = (event) => {
        setSearchEntry(event.target.value);

        event.target.value && (async (query) => {
            const results = await BooksAPI.search(query);
            setBooks(results);
        })(event.target.value);
    };

    /**
     * @description A bundle of predicates asserting that the text supplied matches either:
     *                - the `title` property,
     *                - the `authors` property, or
     *                - the `industryIdentifiers.identifer` property
     * @param book
     * @returns {boolean|boolean}
     */
    const performSearch = (book) => {

        const isbnLookup = (s) => {
            return book.industryIdentifiers && book.industryIdentifiers.filter((a) => a.identifier === s).length > 0;
        };
        const authorLookup = (s) => {
            return book.authors && book.authors.filter((a) => a.toLowerCase().includes(s.toLowerCase())).length > 0;
        };
        return book.title.toLowerCase().includes(searchEntry.toLowerCase()) ||
            authorLookup(searchEntry) || isbnLookup(searchEntry);
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
                    {(searchEntry.length > 0) && books.filter(performSearch).map((book, index) => {
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