import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {

    render() {
        const shelfCategories = ["currentlyReading", "wantToRead", "read"];
        const shelfDisplayName = ["Currently Reading", "Want to Read", "Read"];

        const { books } = this.props;

        return (
            <div>
                { shelfCategories.map((shelfCategory, index) => (
                    <div className="bookshelf" key={index} >
                        <h2 className="bookshelf-title">{shelfDisplayName[index]}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                { books.map((book) => {
                                        return book.shelf === shelfCategory && (<li key={book.id}><Book book={book} /></li>)
                                })} 

                            </ol>
                        </div>
                    </div>
                ))}        
            </div>
        )
    }
}

BookShelf.propTypes = {
    books: PropTypes.array.isRequired
}

export default BookShelf
