import React from "react";
import { Link } from "react-router-dom";

export const Header = ({ currentAccount, connectWallet }) => {
  return (
    <header>
      <div>
        <Link to="/">
          <h1>Home</h1>
        </Link>
      </div>
      <div>
        <h1>
          News!
        </h1>
      </div>

      {currentAccount ? (
        <div>
          <Link to="/writing">
            <button>
              <span>Write a New</span>
            </button>
          </Link>
          <Link to="/voting">
            <button>
              <span>Vote a New</span>
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              connectWallet();
            }}
          >
            <span>Connect your wallet</span>
          </button>
        </div>
      )}
    </header>
  );
};
