import React, { useState, useRef, useEffect } from "react";
import { create } from "ipfs-http-client";
import getContract from "./utilities/getContract";

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
      console.log(err, "Error Saving Feed");
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div>
      <div>
        <div>
          <button
            onClick={() => {
              goBack();
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleSubmit();
            }}>
            <p>Publish</p>
          </button>
        </div>
      </div>
      <div>
        <div>
          <label>
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write your title here!"
          />
          <label>
            Body
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your article here!"
          />
          <label>
            Image
          </label>
          <div
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
                alt="new image"
              />
            ) : (
              <div>No Image</div>
            )}
          </div>

          <input
            type="file"
            className="hidden"
            ref={ImageRef}
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>
      </div>
    </div>
  );
}