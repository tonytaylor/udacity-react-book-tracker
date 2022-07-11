import Bookshelf from "../Bookshelf/Bookshelf";

/**
 * @description Represents a collection of Bookshelves.
 * @param shelves
 * @param books
 * @param onShelfChange
 * @returns {JSX.Element}
 * @constructor
 */
const Bookcase = ({ shelves, books, onShelfChange }) => {
    return (
        <div className={"list-books-content"}>
            <div>
                {shelves.map((shelf, index, all) => {
                    return (
                        <Bookshelf
                            key={index}
                            title={shelf.title}
                            books={books.filter((book) => book.currentShelf === shelf.id)}
                            shelves={all}
                            onShelfChange={onShelfChange} />
                    );
                })}
            </div>
        </div>
    );
};

export default Bookcase;