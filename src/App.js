import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data);
        // console.log(res.data);

      }).catch(error => (console.log(error)));
  }, [])

  const handelSearch = (e) => {
    setSearch(e.target.value)
  }
 
  const filteredCoin = coins.filter(coin => {
    console.log(coin);
    return coin.name.toLowerCase().slice(0,1).includes(search.toLowerCase().slice(0,1));  
  })

  return (
    <div className="coin-app">
      <div className='coin-search'>
        <h1 className='coin-text'> Search a currency</h1>
        <form>
          <input type='text' placeholder='Search' onChange={handelSearch} className='coin-input'>
          </input>
        </form>
      </div>
      {filteredCoin.map(coin => {
        console.log(coin);
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.total_volume}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}

          />
        )
      })

      }

    </div>
  );
}

export default App;
