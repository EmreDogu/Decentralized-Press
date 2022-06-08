import { useState, useEffect } from 'react';
import { ethers } from 'ethers'
import { Link } from "react-router-dom";
import getContract from "./utilities/getContract";

function App() {
  // store greeting in local state
  const [New, setNewValue] = useState()

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  // call the smart contract, read the current greeting value
  async function fetchNew() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const contract = await getContract();
      try {
        const data = await contract.getAllNews();
        console.log('data: ', data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }    
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchNew}>Fetch New</button>
        <Link to="/writing">
          <button>Write a New</button>
        </Link>
        <input onChange={e => setNewValue(e.target.value)} placeholder="Set new" />
      </header>
    </div>
  );
}

export default App;
