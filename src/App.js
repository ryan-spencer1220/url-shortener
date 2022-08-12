import "./index.css";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [url, setURL] = useState("");
  const [shortURL, setShortURL] = useState("");

  const handleChange = (e) => {
    setURL(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(url);
    const axios = require("axios");

    const headers = {
      "Content-Type": "application/json",
      apikey: "533f3dcc3fad462196e928a29d98e4a8",
    };

    const shorten = async (url) => {
      let endpoint = "https://api.rebrandly.com/v1/links";
      let linkRequest = {
        destination: url,
      };
      const apiCall = {
        method: "post",
        url: endpoint,
        data: linkRequest,
        headers: headers,
      };
      let apiResponse = await axios(apiCall);
      let link = apiResponse.data;
      return link.shortUrl;
    };
    let shortUrl = await shorten(url);
    setShortURL(shortUrl);
  };

  const handleClick = () => {
    console.log(shortURL);
    window.open(`https://www.${shortURL}`);
  };

  return (
    <>
      <Header />;
      <form
        className="mx-20 p-20 card bg-slate-100 flex flex-row shadow-2xl"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter URL here!"
          className="input input-bordered input-primary input-lg mb-10 basis-10/12 mr-2"
          value={url}
          onChange={handleChange}
        />
        <button type="submit" className="btn basis-2/12 ml-2">
          Submit
        </button>
      </form>
      <div className="mx-20 p-20 card bg-slate-100 flex flex-row mt-10 text-xl shadow-2xl">
        Shortened URL: {shortURL}
        {shortURL && (
          <>
            <button className="btn mx-4" onClick={handleClick}>
              Try It Out!
            </button>
            <button
              className="btn"
              onClick={() => {
                navigator.clipboard.writeText(shortURL);
              }}
            >
              Copy!
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
