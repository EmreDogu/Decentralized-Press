import { useState, useEffect } from 'react';
import { Header } from "./components/Header";
import { Link } from "react-router-dom";
import NewsList from "./components/NewsList";
import getContract from "./utilities/getContract";

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
        alert("Wallet is Connected!");
      } else {
        alert("To write or vote a new, Ensure your wallet Connected!");
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
    } catch (err) {
      console.log(`${err.message}`);
    }
  };

  const getNews = async () => {
    try {
      const contract = await getContract();
      const AllNews = await contract.getAllNews();
      let votedNews = [];
      for (let i=0; i < AllNews.length; ++i) {
        if (AllNews[i].voted) {
            votedNews.push(AllNews[i]);
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
    getNews();
    checkIfWalletIsConnected();
  }, []);

  return (
    <div>
      <div>
        <Header
          currentAccount={currentAccount}
          connectWallet={connectWallet}
        />
        <div>
          {news.map((New, index) => {
            return (
              <Link to={`/New?id=${New.id}`} key={index}>
                <div>
                  <NewsList New={New} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
