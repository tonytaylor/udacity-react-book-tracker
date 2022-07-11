import PropTypes from "prop-types";

import BookContextMenu from "../BookContextMenu/BookContextMenu";

import './Book.css';

/**
 * @description Represents a book.
 * @param book
 * @param shelves
 * @param onShelfChange
 * @returns {JSX.Element}
 * @constructor
 */
const Book = ({ book, shelves, onShelfChange }) => {

    const dragStart = (event) => event.dataTransfer.setData("text/plain", event.target.id);

    return (
        <div
            id={`book-${book.id}`}
            onDragStart={dragStart}
            draggable={"true"}
            className="book">
            <div className="book-top">
                {book.imageLinks && <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 188,
                        backgroundImage:
                            `url(${book.imageLinks.smallThumbnail})`,
                    }}
                ></div>}
                <BookContextMenu options={shelves} onShelfChange={onShelfChange} />
            </div>
            <div className="book-title">{book.title}</div>
            {book.authors && book.authors.map(
                (author, index) => <div className={"book-authors"} key={index}>{author}</div>)}
        </div>
    );
};

Book.propTypes = {
  book: PropTypes.shape({
      title: PropTypes.string,
      //imageLinks: PropTypes.shape({smallThumbnail: PropTypes.string}),
      authors: PropTypes.arrayOf(PropTypes.string),
      industryIdentifiers: PropTypes.arrayOf(PropTypes.shape({
          identifier: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired
      }))
  })
};

export default Book;