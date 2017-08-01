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
                        {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.handleChange(event.target.value)} />

              </div>
          </div>
            <div className="search-books-results">
                 {error ? (<p>{error}</p>) : (
                    <ol className="books-grid">
                        {results && results.sort(sortBy('title')).map((book, index) => (<li key={book.id}><Book book={book} onSelectShelfBook={this.props.onSelectShelf}/></li>))}
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
