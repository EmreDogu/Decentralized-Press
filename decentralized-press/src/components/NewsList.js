import React from "react";

export default function NewsList({ New }) {
  return (
    <div>
      <div style={{display:"flex", 
      backgroundImage: `url("https://ipfs.infura.io/ipfs/${New.image}")`, backgroundSize: "cover", height:"200px", width:"300px", alignItems:"center", justifyItems:"center"}}>
        <h3 style={{color:"#ffffff", backgroundColor:"rgba(0,0,0,0.25)"}}>
          {New.title}
        </h3>
      </div>
      <p style={{color:"black"}}>
          <b>{New.description.slice(0, 72)}...</b>
      </p>
    </div>
  );
}