import React from "react";

export default function NewsList({ New }) {
  return (
    <div>
      <img
        src={`https://ipfs.infura.io/ipfs/${New.image}`}
        alt="image"
      />
      <div>
        <h4>
          {New.title}
        </h4>
          <p>
            {New.description.slice(0, 30)}...
          </p>
        <p>
          {New?.author?.slice(0, 12)}...{" "}
        </p>
      </div>
    </div>
  );
}