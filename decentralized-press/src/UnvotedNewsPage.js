import React, { useEffect, useState } from "react";
import getContract from "./utilities/getContract";
import { Link } from "react-router-dom";
import UnvotedNew from "./components/UnvotedNew";

export default function NewsPage() {
    const [news, setNews] = useState([]);
    const [vote, setVote] = useState("");

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
        } else {
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
    
          // reset form
          setVote("");
    
          // Redirect to Voting Page
          window.location.href = "/voting";
        } catch (err) {
          console.log(err, "Error Saving Feed");
        }
      };

    useEffect(() => {
        getNews();
    }, []);

    return (
        <div>
            <div>
                <div>
                    <div>{news && <UnvotedNew news={news} />}</div>
                    <div>
                        <Link to="/">
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
            </div>
        </div>
    );
}