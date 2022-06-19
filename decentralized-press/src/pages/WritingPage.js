import React, { useState, useRef, useEffect } from "react";
import { create } from "ipfs-http-client";
import getContract from "../utilities/getContract";
import index from '../images/index.png'
import icon from '../images/icon.png'

export default function Writing() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");

  const client = create("https://ipfs.infura.io:5001/api/v0");
  const ImageRef = useRef();

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

  const handleSubmit = async () => {
    if (
      title === "" ||
      description === "" ||
      image === ""
    ) {
      alert("All the fields must be filled!");
      return;
    } else if (currentAccount === "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"){ 
      alert("Can't use bank account for making news");
    }else {
      uploadImage(image);
    }
  };

  const uploadImage = async (image) => {
    alert("Uploading Image...");

    try {
      const img = await client.add(image);
      await saveNew(img.path);

    } catch (err) {
      alert("Error While Uploading Image");
    }
  };

  const saveNew = async (image) => {
    alert("Saving New...");

    console.log(title, description, image);

    try {
      const contract = await getContract();
      const UploadedDate = String(new Date());
      console.log(contract);

      await contract.createNew(
        title,
        description,
        image,
        UploadedDate
      );

      alert("New Saved Successfully");

      setTitle("");
      setDescription("");
      setImage("");

      alert("You will be redirected to main page in 10 seconds, please wait");

      setTimeout(() => {
        window.location.href = "/";
     }, 10000);

    } catch (err) {
      console.log(err, "Error Saving New");
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="body" style={{height:"100%"}}>
        <div className="header" style={{display:"flex", justifyContent:"space-between", padding:"11px", backgroundColor:"black"}}>
        <button style={{backgroundColor: "black", borderColor:"rgba(0,0,0,0.25)"}}
            onClick={() => {
              goBack();
            }}
          >
            <p style={{color:"white"}}>Go Back</p>
          </button>
          <button style={{backgroundColor: "black", borderColor:"rgba(0,0,0,0.25)"}}
            onClick={() => {
              handleSubmit();
            }}>
            <p style={{color:"white"}}>Publish</p>
          </button>
        </div>

      <div className="writing" style={{display:"flex", flexDirection:"column"}}>
          <label style={{textAlign:"center", padding:"11px"}}>
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write your title here!"
          />
          <label style={{textAlign:"center", padding:"11px"}}>
            Body
          </label>
          <textarea
          rows="8"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your article here!"
          />
          <label style={{textAlign:"center", padding:"11px"}}>
            Image
          </label>
          <div style={{display:"flex", justifyContent:"center"}}
            onClick={() => {
              ImageRef.current.click();
            }}
          >
            {image ? (
              <img
                onClick={() => {
                  ImageRef.current.click();
                }}
                src={URL.createObjectURL(image)}
                height="200px" width="200px"
                alt="new image"
              />
            ) : (
              <img src={index} height="200px" width="200px"/>
            )}
          </div>

          <input
          style={{textAlign:"center", display:"none"}}
            type="file"
            ref={ImageRef}
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
      </div>

      <div className="footer" style={{
        backgroundColor: "black", position: 'fixed', bottom: "0",
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