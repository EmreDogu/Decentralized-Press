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
                getNews(account);
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

    const getNews = async (account) => {
        try {
            const contract = await getContract();
            const AllNews = await contract.getAllNews();
            let unvotedNews = [];
            let lowerVoters = [...Array(AllNews.length)].map(e => Array(4).fill(0));
            let lowerAuthors = [...Array(AllNews.length)].map(e => Array(1).fill(0));
            
            for (let i = 0; i < AllNews.length; ++i) {
                lowerAuthors[i].push(AllNews[i].author.toLowerCase());

                AllNews[i].voters.forEach((voter) => {
                    lowerVoters[i].push(voter.toLowerCase());
                  })
            }

            for (let i = 0; i < AllNews.length; ++i) {
                if (!AllNews[i].voted && !lowerVoters[i].includes(account) && !lowerAuthors[i].includes(account) && account != "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266") {
                    unvotedNews.push(AllNews[i]);
                }
            }

            const formattedNew = unvotedNews.map((New) => {
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
    }, []);

    return (
        <div>
            <Header
                currentAccount={currentAccount}
                connectWallet={connectWallet}
            />
            <div>
                {news.map((New, index) => {
                    return (
                        <Link to={`/unvotedNew?id=${New.id}`} key={index}>
                            <div>
                                <NewsList New={New} />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default App;