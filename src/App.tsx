import { useState } from "react";
import "./App.css";
import Kakao from "./kakao";

function App() {
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");

  const getNumber = (min: number, max: number) => {
    const integerPart = Math.floor(Math.random() * (max - min + 1)) + min;

    const decimalPart = Math.floor(Math.random() * 1000000);

    const decimalString = decimalPart.toString().padStart(6, "0");

    const answer = integerPart.toString() + "." + decimalString.toString();

    return answer;
  };

  const handleRandom = (type: "latitude" | "longitude") => {
    let min: number, max: number;
    if (type === "latitude") {
      min = 34;
      max = 38;
      setLatitude(getNumber(min, max));
    } else {
      min = 126;
      max = 129;
      setLongitude(getNumber(min, max));
    }
  };
  return (
    <div className="container">
      <div className="App">
        <div>위도 : {latitude}</div>
        <div>경도 : {longitude}</div>
        <button onClick={() => handleRandom("latitude")}>위도 랜덤 뽑기</button>
        <button onClick={() => handleRandom("longitude")}>
          경도 랜덤 뽑기
        </button>
      </div>
      <Kakao latitude={latitude} longitude={longitude} />
    </div>
  );
}

export default App;
