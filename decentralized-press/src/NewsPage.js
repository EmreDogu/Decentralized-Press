import React, { useEffect, useState } from "react";
import getContract from "./utilities/getContract";
import { Link } from "react-router-dom";
import New from "./components/New";

export default function NewsPage() {
    const [news, setNews] = useState([]);

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
        getNews();
    }, []);

    return (
        <div>
            <div>
                <div>
                    <div>{news && <New news={news} />}</div>
                    <div>
                        <Link to="/">
                            <button>
                                Go Back
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}