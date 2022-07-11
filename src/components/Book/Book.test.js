import {screen, render} from "@testing-library/react";

import Book from "./Book";

test('Book renders w/o issue', () => {
    const titleOfFoo = 'Foo'
    const bookOfFoo = {
        title: titleOfFoo,
        imageLinks: {smallThumbnail: 'https://placehold.it/200/400'},
        authors: ['Fu Manchu']
    };
    render(<Book book={bookOfFoo}/>);
    expect(screen.getByText(titleOfFoo)).toHaveTextContent(titleOfFoo);
});