import React, { useEffect, useState, useRef } from 'react';
import { ethers } from 'ethers'; 

import { getUserAddress, getWalletBalance } from 'services/web3/provider';
import { fetchGreeting, setNewGreeting } from 'services/web3/greeting';

import './App.css';

function App() {
  const [address, setAddress] = useState();
  const [balance, setBalance] = useState();
  const [greeting, setGreeting] = useState();

  const walletAddress = useRef(null);
  const greetingValue = useRef(null);

  const handleGetBalance = async () => {
    const _walletAddress = walletAddress.current.value;
    console.log(_walletAddress);
    if(ethers.utils.isAddress(_walletAddress)) {
      let _balance = await getWalletBalance(_walletAddress); 
      setBalance(_balance);
    }else {
      alert('wrong wallet address!');
    }
  }

  const handleGreetingInput = async () => {
    let _greeting = greetingValue.current.value;
    _greeting = await setNewGreeting(_greeting);
    if(_greeting) {
      setGreeting(_greeting);
    }
  }

  useEffect(() => {
    const asyncFunction = async () => {
      const _address = await getUserAddress();
      const _greeting = await fetchGreeting();
      setAddress(_address);
      setGreeting(_greeting);
      console.log('hello', _address, _greeting)
    };
    asyncFunction();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p> My Wallet:  {address}</p>
        <div className="unit">
          <input type="text" placeholder="input wallet address" ref={walletAddress} />
          <p>{balance}</p>
          <button onClick={handleGetBalance}>Get Balance</button>
        </div>
        <div className="unit">
          <p>current greeting: {greeting}</p>
          <input type="text" placeholder="input new greeting" ref={greetingValue} />
          <button onClick={handleGreetingInput}>set new greeting</button>
        </div>
      </header>
    </div>
  );
}

export default App;
