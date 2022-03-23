import { useState, useRef, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery.js';
import SearchBar from './components/SearchBar.js';
import './App.css';
import { DataContext } from './context/DataContext.js';
import { SearchContext } from './context/SearchContext.js';
import AlbumView from './components/AlbumView.js'
import ArtistView from './components/ArtistView.js';

function App() {
  // Define state variables
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState([])
  let searchInput = useRef('')

  const API_URL = 'https://itunes.apple.com/search?term='

  // Defining function to pass down to the search bar
  const handleSearch = (e, term) => {
    e.preventDefault()
    const fetchData = async () => {
      document.title = `${ term } Music`
      const response = await fetch(API_URL + term)
      const resData = await response.json()
      if (resData.results.length > 0) {
        setData(resData.results)
      } else {
        setMessage('Not Found')
      }
    }
    fetchData()
  }

  return (
    <div className="App">
      { message }
      <Router>
        <Routes>
          <Route path="/" element={
            <Fragment>

              <SearchContext.Provider value={{
                term: searchInput,
                handleSearch: handleSearch
                }}>
                <SearchBar handleSearch={ handleSearch }/>
              </SearchContext.Provider>

              <DataContext.Provider value={ data }>
                <Gallery data={ data }/>
              </DataContext.Provider>
              
            </Fragment>
          } />
          <Route path="/album/:id" element={ <AlbumView/> } />
          <Route path="artist/:id" element={ <ArtistView/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
