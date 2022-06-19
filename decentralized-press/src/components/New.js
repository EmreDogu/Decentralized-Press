import React from "react";

export default function New({ news }) {
  return (
      <div>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
          <h2>{news.title}</h2>
          <img
        src={`https://ipfs.infura.io/ipfs/${news.image}`} width="50%" height="50%" align="middle"
        alt="image"
      />
          <p style={{marginBottom:"0px"}}>
            Date: {news.date}
          </p>
          <p>
            Author: {news?.author}
          </p>
          <p style={{textAlign:"center", width:"50%"}}>
            {news.description}
          </p>
        </div>
      </div>
  );
}