import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import sortBy from 'sort-by'
import Book from './Book'
import PropTypes from 'prop-types'

class Search extends Component {
    state = {
        query : '',
        results :[],
        error:''
    }

    /**
     * @description submit query to backend and get search result back when input search onChange event happens
     * @param {string} query - input from search bar
     */
    handleChange = (query) => {
       if (!query) {
           this.setState({query:'', results:[], error:''})
       } else {
           this.setState({query : query})
           BooksAPI.search(query)
               .then((results) => {
                //    console.log(results)
                   if (results.error) {
                       this.setState({
                           results: [],
                           error: 'No book found.'
                       })
                   } else {
                       this.setState({
                           results: results,
                           error: ''
                       })
                   }
               })
       }
    }

    render() {
        let {query, results, error} = this.state

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.handleChange(event.target.value)} />

                    </div>
                </div>
                <div className="search-books-results">
                    {error ? (<p>{error}</p>) : (
                        <ol className="books-grid">
                            {results && results.sort(sortBy('title')).map((book, index) => (<li key={book.id}><Book book={book} onSelectShelfBook={this.props.onSelectShelf} /></li>))}
                        </ol>
                    )}
                </div>
            </div>
        )
    } 
}

Search.propTypes = {
    onSelectShelf: PropTypes.func.isRequired
}

export default Search
