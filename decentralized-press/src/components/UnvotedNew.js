import React from "react";

export default function UnvotedNew({ news }) {
  return (
    <div>
      <img
        alt="image"
      />
      <div>
        <div>
          <h3>{news.title}</h3>
          <p >
            {news.date}
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