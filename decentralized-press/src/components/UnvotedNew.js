import React from "react";

export default function UnvotedNew({ news }) {
  return (
    <div>
      <img
        src={`https://ipfs.infura.io/ipfs/${news.image}`}
        alt="image"
      />
      <div>
        <div>
          <h3>{news.title}</h3>
          <p >
            Date: {news.date}
          </p>
        </div>
      </div>

      <div>
        <div>
          Author: {news?.author?.slice(0, 12)}...
        </div>
      </div>
      <p>{news.description}</p>
    </div>
  );
}