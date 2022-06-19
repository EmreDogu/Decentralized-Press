import React, { useEffect, useState } from "react";
import getContract from "../utilities/getContract";
import { Link } from "react-router-dom";
import New from "../components/New";
import icon from '../images/icon.png'

export default function UnvotedNewsPage() {
    const [news, setNews] = useState([]);
    const [vote, setVote] = useState("Approved");
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
                approved: singleNew[7],
                declined: singleNew[8],
            };

            setNews(formattedNew);
            console.log(formattedNew.approved, formattedNew.declined);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async () => {
        if (
            vote === ""
        ) {
            alert("A vote must be selected!");
            return;
        } else if (currentAccount === "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"){ 
            alert("Can't use bank account for voting news");
        }else {
            saveVote();
        }
    };

    const saveVote = async () => {
        alert("Submitting vote...");

        console.log(vote);

        try {
            const contract = await getContract();
            console.log(contract);

            await contract.vote(
                news.id,
                vote
            );

            console.log(news.approved, news.declined);

            alert("Vote Submitted Successfully");

            setVote("Approved");

            alert("You will be redirected to voting page in 10 seconds, please wait");

            setTimeout(() => {
                window.location.href = "/voting";
             }, 10000);
            
        } catch (err) {
            console.log(err, "Error Saving New");
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
        getNews();
      }, []);

    return (
        <div className="body" style={{height:"100%"}}>
            <div className="header" style={{display:"flex", justifyContent:"space-between", padding:"11px", backgroundColor:"black"}}>
            <Link to="/voting">
                    <button style={{backgroundColor: "transparent", borderColor:"rgba(0,0,0,0.25)"}}>
                    <p style={{color:"white"}}>Go Back</p>
                    </button>
                </Link>
                
                <button style={{backgroundColor: "transparent", borderColor:"rgba(0,0,0,0.25)"}}
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    <p style={{color:"white"}}>Submit Vote</p>
                </button>
        </div>

        <div className="unvotednewContainer" style={{display:"flex", flexDirection:"column", alignItems:"center", padding:"11px"}}>
        <div>{news && <New news={news} />}</div>
            <div><select
                    value={vote}
                    onChange={(e) => setVote(e.target.value)}
                    style={{height:"40px"}}
                >
                    <option>Approved</option>
                    <option>Declined</option>
                </select></div>
        </div>
        
        <div className="footer" style={{
        backgroundColor: "black", position: 'relative', bottom: "0",
        width: "100%", display:"flex", alignItems:"center", justifyContent:"center"
      }}>
        <p style={{ color: 'white', textAlign: "center", margin:"0px", padding:"10px" }}> Copyright © 2022 DecentralizedPress </p>
        <a href='https://github.com/EmreDogu/Decentralized-Press'>
          <img src={icon} alt="github logo for link" width="40px" height="40px"/>
        </a></div>
        </div>
    );
}