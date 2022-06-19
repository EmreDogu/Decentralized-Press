import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import NewsList from "../components/NewsList";
import getContract from "../utilities/getContract";
import logo from '../images/logo1.jpg'
import icon from '../images/icon.png'

function App() {
  const [news, setNews] = useState([]);
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
      } else {
        alert("In order to read, write or vote a new, ensure your wallet is connected!");
      }
    } catch (err) {
      console.log(`${err.message}`);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Make sure you have MetaMask Connected");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      window.location.href = "/";
    } catch (err) {
      console.log(`${err.message}`);
    }
  };

  const getNews = async () => {
    try {
      const contract = await getContract();
      const AllNews = await contract.getAllNews();
      let votedNews = [];
      for (let i = 0; i < AllNews.length; ++i) {
        if (AllNews[i].voted) {
          if (AllNews[i].approved == 2) {
            votedNews.push(AllNews[i]);
          }
        }
      }

      const formattedNew = votedNews.map((New) => {
        return {
          id: New.id,
          title: New.title,
          description: New.description,
          image: New.image,
          author: New.author,
          date: new Date(New.date * 1000),
        };
      });
      setNews(formattedNew);
    } catch (err) {
      console.log(`${err.message}`);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    getNews();
  }, []);

  return (
    <div className='body' style={{ display: "flex", flexDirection: "column", height:"100%" }}>
      <div className='Header' style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "black", padding: "11px" }}>
        <div>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <img src={logo} height="100px" width="350px" alt='logo' />
          </Link>
        </div>

        {currentAccount ? (
          <div>
            <Link to="/writing">
              <button style={{backgroundColor: "transparent", borderColor:"rgba(0,0,0,0.25)"}}>
                <p style={{color:"white"}}>Write a New </p>
              </button>
            </Link>
            <Link to="/voting" style={{ marginLeft: "10px" }}>
            <button style={{backgroundColor: "transparent", borderColor:"rgba(0,0,0,0.25)"}}>
            <p style={{color:"white"}}>Vote a New </p>
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <button style={{backgroundColor: "transparent", borderColor:"rgba(0,0,0,0.25)"}}
              onClick={() => {
                connectWallet();
              }}
            >
              <p style={{color:"white"}}>Connect your wallet</p>
            </button>
          </div>
        )}
      </div>

      <div className='NewsContainer' style={{ display: "flex", flexWrap: "wrap", padding: "11px"}}>
        {news.map((New, index) => {
          return (
            <Link to={`/New?id=${New.id}`} key={index} style={{ textDecoration: "none" }}>
              <div className='EveryNew' style={{ width: "min-content", height: "min-content", margin: "50px", marginLeft: "0px" }}>
                <NewsList New={New} />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="footer" style={{
        backgroundColor: "black", position: 'fixed', bottom: "0",
        width: "100%", display:"flex", alignItems:"center", justifyContent:"center"
      }}>
        <p style={{ color: 'white', textAlign: "center", margin:"0px", padding:"10px" }}> Copyright © 2022 DecentralizedPress </p>
        <a href='https://github.com/EmreDogu/Decentralized-Press'>
          <img src={icon} alt="github logo for link" width="40px" height="40px"/>
        </a>
      </div>
    </div>
  );
}

export default App;
