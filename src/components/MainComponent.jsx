import React, { useEffect } from "react";
import { useState } from "react";

function MainComponent() {
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "walk into mordor",
    imageURL: "/src/assets/images/murder.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  function handleClick(e) {
    const text = e.target.value;
    if (e.target.name === "topText") {
      setMeme((prevMeme) => ({
        ...prevMeme,
        topText: text,
      }));
    } else if (e.target.name === "bottomText") {
      setMeme((prevMeme) => ({
        ...prevMeme,
        bottomText: text,
      }));
    }
  }

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        setAllMemes(data.data.memes);
      });
  }, []);

  function getRandomMeme() {
    event.preventDefault();
    const randomMeme = allMemes[Math.floor(Math.random() * allMemes.length)];
    setMeme((prevMeme) => ({ ...prevMeme, imageURL: randomMeme.url }));
  }

  return (
    <main>
      <form>
        <div className="inputs">
          <p>
            <label htmlFor="topText">Top Text</label>
            <br />
            <input
              type="text"
              id="topText"
              name="topText"
              onChange={handleClick}
              value={meme.topText}
            />
          </p>
          <p>
            <label htmlFor="bottomText">Bottom Text</label>
            <br />
            <input
              type="text"
              id="bottomText"
              name="bottomText"
              onChange={handleClick}
              value={meme.bottomText}
            />
          </p>
        </div>
        <button onClick={getRandomMeme}>Get a new meme image</button>
      </form>
      <div className="image-container">
        <img src={meme.imageURL} alt="Meme Image" />
        <span className="top-text">{meme.topText}</span>
        <span className="bottom-text">{meme.bottomText}</span>
      </div>
      <p className="instruction">
        Change text in the tow inputs to change text on the image
      </p>
    </main>
  );
}

export default MainComponent;

/* 11 hours 00 minutes */
