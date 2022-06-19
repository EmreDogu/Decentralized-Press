import React, { useEffect, useState } from "react";
import getContract from "../utilities/getContract";
import { Link } from "react-router-dom";
import New from "../components/New";
import logo from '../images/logo1.jpg'
import icon from '../images/icon.png'

export default function NewsPage() {
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
                window.history.back();
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

    const getUrlValue = () => {
        let vars = {};
        window.location.href.replace(
            /[?&]+([^=&]+)=([^&]*)/gi,
            function (m, key, value) {
                vars[key] = value;
            }
        );
        return vars;
    };

    const getNews = async () => {
        try {
            const contract = await getContract();
            let newsId = getUrlValue()["id"];
            const singleNew = await contract.getNew(newsId);

            const formattedNew = {
                id: singleNew[0],
                title: singleNew[1],
                description: singleNew[2],
                image: singleNew[3],
                date: singleNew[4],
                author: singleNew[5],
            };

            setNews(formattedNew);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
        getNews();
    }, []);

    return (
        <div className="body" style={{height:"100%"}}>
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
              <p style={{color:"white"}}>Connect your wallet </p>
            </button>
          </div>
        )}
      </div>

            <div>{news && <New news={news} />}</div>
            <div style={{display:"flex", justifyContent:"center", marginBottom:"11px"}}>
                <Link to="/">
                <button style={{backgroundColor: "black", borderColor:"rgba(0,0,0,0.25)"}}>
                <p style={{color:"white"}}>Go Back</p>
                    </button>
                </Link>
            </div>

            <div className="footer" style={{
        backgroundColor: "black", position: 'relative', bottom: "0",
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