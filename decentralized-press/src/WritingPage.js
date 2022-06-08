import React, { useState, useRef } from "react";
import getContract from "./utilities/getContract";

export default function Writing() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const ImageRef = useRef();

  const handleSubmit = async () => {
    if (
      title === "" ||
      description === "" /*||
      image === ""*/
    ) {
      alert("All the fields must be filled!");
      return;
    } else {
      saveFeed();
    }
  };

  const saveFeed = async () => {
    alert("Saving Feed...");

    console.log(title, description, image);

    try {
      const contract = await getContract();
      const UploadedDate = String(new Date());
      console.log(contract);

      /*
       * Save the new feed to the blockchain
       */
      await contract.createNew(
        title,
        description,
        image,
        UploadedDate
      );

      alert("New Saved Successfully");

      // reset form
      setTitle("");
      setDescription("");
      setImage("");

      // Redirect to Home Page
      window.location.href = "/";
    } catch (err) {
      console.log(err, "Error Saving Feed");
    }
  };

  // Handles redirect to Home Page or previous page
  const goBack = () => {
    window.history.back();
  };

  return (
    //return düzenle
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

          <div>
            <label>
              Image
            </label>
            <div
              onClick={() => {
                ImageRef.current.click();
              }}
            >
              <img
                onClick={() => {
                  ImageRef.current.click();
                }}
                alt="image"
              />
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
    </div>
  );
}