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
                            <BookShelf books={this.state.books} />
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to='/search'>Add a book</Link>
                    </div>
                </div>
                )} />
                <Route path='/search' component={Search} />
            </div>
        )
    }
}

export default BooksApp
