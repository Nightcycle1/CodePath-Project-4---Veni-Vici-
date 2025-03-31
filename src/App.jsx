import { useState, useEffect } from 'react';
import './App.css';
import CatCard from './CatCard.jsx';
import BanList from './BanList.jsx';

function App() {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [banList, setBanList] = useState([]);

  // Function to fetch a new cat
  const fetchCatData = () => {
    setLoading(true);

    const apiKey = import.meta.env.VITE_CAT_API_KEY || '';
    console.log('Using API Key:', apiKey);

    fetch('https://api.thecatapi.com/v1/images/search?has_breeds=1', {
      headers: {
        'x-api-key': apiKey,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // If the cat's breed or other attributes are banned, retry fetching a new one
        if (
          data[0]?.breeds?.[0]?.name &&
          (banList.includes(data[0].breeds[0].name) ||
            banList.includes(data[0].breeds[0].origin) ||
            banList.includes(data[0].breeds[0].weight.metric) ||
            banList.includes(data[0].breeds[0].life_span))
        ) {
          fetchCatData(); // Retry if banned
          return;
        }
        setCat(data[0]); // Set the valid cat
      })
      .catch((error) => {
        console.error('Error fetching cat:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Function to handle banning an item (breed, origin, weight, or life span)
  const handleBan = (item) => {
    setBanList((prevBanList) => [...prevBanList, item]);
  };

  // Function to handle unbanning an item
  const handleUnban = (item) => {
    setBanList((prevBanList) => prevBanList.filter((bannedItem) => bannedItem !== item));
  };

  return (
    <div className="app-container">
      {/* Main Content Box */}
      <div className="content-box">
        <h1>Veni Vici Cats</h1>
        <p>Discover cats from your wildest dreams!</p>
        <p>😺😸😹😿😾😼😽😻🙀🐱</p>

        {/* Display Cat if it's not banned */}
        {cat && <CatCard cat={cat} addToBanList={handleBan} />}

        <button onClick={fetchCatData} disabled={loading}>
          {loading ? '⌛ Loading...' : '🔀 Discover'}
        </button>
      </div>

      {/* Sidebar for Banned Items */}
      <div>
        <BanList banList={banList} handleUnban={handleUnban} />
      </div>
    </div>
  );
}

export default App;


