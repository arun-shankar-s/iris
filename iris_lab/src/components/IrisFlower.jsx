import { useState } from "react";
import "../style/IrisFlower.css";
import flower from "../flower.png";
import GetTrait from "./GetTrait";

function IrisFlower() {
  const [petal, setPetal] = useState(50);
  const [sepal, setSepal] = useState(40);
  const [petalWidth, setPetalWidth] = useState(70);
  const [sepalLength, setSepalLength] = useState(30);
  const [revealed, setRevealed] = useState(false);
  const traits = GetTrait(petal, sepal, petalWidth, sepalLength);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);


 const revealSpecies = async () => {
  setLoading(true);

  const delay = new Promise((resolve) => setTimeout(resolve, 200));

  try {
    const res = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        petal_length: petal,
        sepal_width: sepal,
        petal_width: petalWidth,
        sepal_length: sepalLength,
      }),
    });

    const data = await res.json();

    // Wait for BOTH: API + 2s delay
    await Promise.all([delay]);
    setPrediction(data.species);
    setRevealed(true);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="container">
      <h1>Create Your Iris</h1>

      <p className="subtitle">
        {revealed
          ? "Your form has been interpreted."
          : "Shape the flower. Discover its identity."}
      </p>

      {/* Flower */}
      <div className="flower-wrapper">
        <div
          className="glow-halo"
          style={{
            transform: `scale(${1 + ((petal + petalWidth) / 500) / 300})`,
            opacity: 0.3 + petal / 300,
          }}
        />

        <div
          className="glow-core"
          style={{
            transform: `scale(${1 + petal / 200})`,
            opacity: 0.4 + petal / 200,
          }}
        />

        <img
          src={flower}
          alt="Flower"
          className="flower-img"
          style={{
            transform: `scaleY(${1 + petal / 800}) scaleX(${
              1 + sepal / 400
            }) scaleX(${1 + sepalLength / 2000}) scaleY(${1 + petalWidth / 2000}) 
            `,
            filter: `drop-shadow(
              0 0 ${15 + petalWidth / 2}px rgba(120,150,255,0.4)
            )`,
          }}
        />
      </div>

      {/* CONTROLS */}
      {!revealed && (
        <div className="controls fade-in">
          <div className="control">
            <label>Petal Length</label>
            <input
              type="range"
              min="0"
              max="100"
              value={petal}
              style={{ "--value": `${petal}%` }}
              onChange={(e) => setPetal(e.target.value)}
            />
          </div>

          <div className="control">
            <label>Petal Width</label>
            <input
              type="range"
              min="0"
              max="100"
              value={petalWidth}
              style={{ "--value": `${petalWidth}%` }}
              onChange={(e) => setPetalWidth(e.target.value)}
            />
          </div>

          <div className="control">
            <label>Sepal Length</label>
            <input
              type="range"
              min="0"
              max="100"
              value={sepalLength}
              style={{ "--value": `${sepalLength}%` }}
              onChange={(e) => setSepalLength(e.target.value)}
            />
          </div>

          <div className="control">
            <label>Sepal Width</label>
            <input
              type="range"
              min="0"
              max="100"
              value={sepal}
              style={{ "--value": `${sepal}%` }}
              onChange={(e) => setSepal(e.target.value)}
            />
          </div>

          <button
  className="reveal-btn"
  onClick={revealSpecies}
  disabled={loading}
>
  {loading ? <span className="spinner"></span> : "Reveal"}
</button>
        </div>
      )}

      {/* REVEAL STATE */}
      {revealed && (
        <div className="reveal-state fade-in">
          <h2>
            You might be a <em>{prediction}</em>
          </h2>

          <p className="trait">{traits.trait}</p>

          <div className="analysis">
            <p>Petal Size: {traits.petalDesc}</p>
            <p>Sepal Size: {traits.sepalDesc}</p>
          </div>

          <button className="back-btn" onClick={() => setRevealed(false)}>
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}

export default IrisFlower;
