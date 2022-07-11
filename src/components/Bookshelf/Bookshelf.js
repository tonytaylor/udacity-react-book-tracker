import PropTypes from "prop-types";
import Book from "../Book/Book";

import './Bookshelf.css';

/**
 * @description Represents a collection of Books;
 * @param title
 * @param books
 * @param shelves
 * @param onShelfChange
 * @returns {JSX.Element}
 * @constructor
 */
const Bookshelf = ({ title, books, shelves, onShelfChange }) => {

    const normalizeEventState = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const dragOver = (event) => normalizeEventState(event);

    const addBookToShelf = (id, target) => {
        const book = document.getElementById(id);
        target.appendChild(book);
    };

    const drop = (event) => {
        normalizeEventState(event);
        addBookToShelf(event.dataTransfer.getData("text/plain"), event.target);
    };

    return (
        <div className={"bookshelf"}>
            <h2 className={"bookshelf-title"}>{title}</h2>

            <div className={"bookshelf-books"}>
                <ol
                    onDragOver={dragOver}
                    onDrop={drop}
                    className={"books-grid"}>
                    {books.map((book, index) => {
                        return (
                            <Book
                                key={index}
                                book={book}
                                shelves={shelves}
                                onShelfChange={onShelfChange(book)}
                            />
                        );
                    })}
                </ol>
            </div>
        </div>
    );
};

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(Book.propTypes.book),
  shelves: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string
  }))
};

export default Bookshelf;