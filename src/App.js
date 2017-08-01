import React from 'react'
import './App.css'
import * as BooksAPI from './utils/BooksAPI'
import BookShelf from './BookShelf'
import Search from './Search'
import {Route, Link} from 'react-router-dom'

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        books: []
    }

    /**
     * @description update book with specific shelf option
     * @param {object} book - The book you want to update
     * @param {string} shelf - which shelf you want to move
     */
    updateShelf = (book, shelf) => {
        BooksAPI.update(book, shelf)
                .then(() => {
                    book.shelf = shelf
                    this.setState((prevState) => (
                        {
                            books : prevState.books.filter((b) => b.id !== book.id).concat([book])
                        }
                    ))
                })
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books})
        })
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={ () => (
                    <div className="list-books">
                        <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <BookShelf books={this.state.books} onSelectShelf={this.updateShelf} />
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to='/search'>Add a book</Link>
                    </div>
                </div>
                )} />
                 <Route path='/search' render={() => (
                     <Search onSelectShelf={this.updateShelf} />
                 )} /> 
            </div>
        )
    }
}

export default BooksApp
