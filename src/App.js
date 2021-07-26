import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Components/Coin';
import {coin_url} from './constant'

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
        axios({ url : coin_url ,method: 'GET'})
      .then(res => {
        setCoins(res.data);
        // console.log(res.data);

      }).catch(error => (console.log(error)));
  }, [])
  // console.log(url)

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
          <input type='text' placeholder='Search' onChange={handelSearch} className='coin-input' />
          {/* </input> */}
        </form>
      </div>
      {filteredCoin.map(coin => {
        console.log(coin);
        const {id = '' , name ='',image='',symbol='',total_volume='', current_price='', price_change_percentage_24h='',market_cap='' } = coin;
        return (
          <Coin
            key={id}
            name={name}
            image={image}
            symbol={symbol}
            volume={total_volume}
            price={current_price}
            priceChange={price_change_percentage_24h}
            marketcap={market_cap}

          />
        )
      })

      }

    </div>
  );
}

export default App;
