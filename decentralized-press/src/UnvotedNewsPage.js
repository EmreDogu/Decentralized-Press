import React, { useEffect, useState } from "react";
import getContract from "./utilities/getContract";
import { Link } from "react-router-dom";
import UnvotedNew from "./components/UnvotedNew";

export default function NewsPage() {
    const [news, setNews] = useState([]);
    const [vote, setVote] = useState("Approved");
    const [currentAccount, setCurrentAccount] = useState("");

    useEffect(() => {
        checkIfWalletIsConnected();
      }, []);
    
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
            console.log(err, "Error Saving Feed");
        }
    };

    useEffect(() => {
        getNews();
    }, []);

    return (
        <div>
            <div>{news && <UnvotedNew news={news} />}</div>
            <div>
                <Link to="/voting">
                    <button>
                        Go Back
                    </button>
                </Link>
                <select
                    value={vote}
                    onChange={(e) => setVote(e.target.value)}
                >
                    <option>Approved</option>
                    <option>Declined</option>
                </select>
                <button
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    <p>Submit Vote</p>
                </button>
            </div>
        </div>
    );
}