import React, { useRef, useState } from "react";
import "./TicTacToe.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";

let data = ["", "", "", "", "", "", "", "", ""];

function TicTacToe() {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(null);
  const titleRef = useRef(null);
  const box1 = useRef(null);
  const box2 = useRef(null);
  const box3 = useRef(null);
  const box4 = useRef(null);
  const box5 = useRef(null);
  const box6 = useRef(null);
  const box7 = useRef(null);
  const box8 = useRef(null);
  const box9 = useRef(null);

  let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  const toggle = (e, num) => {
    if (lock || data[num]) return;

    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross_icon}' alt='x'>`;
      data[num] = "x";
    } else {
      e.target.innerHTML = `<img src='${circle_icon}' alt='o'>`;
      data[num] = "o";
    }
    setCount(count + 1);
    checkWin();
  };

  const checkWin = () => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        won(data[a]);
        return;
      }
    }

    if (count === 8) {
      setLock(true);
      setWinner("draw");
    }
  };

  const won = (winner) => {
    setLock(true);
    setWinner(winner);
  };

  const reset = () => {
    setLock(false);
    setWinner(null);
    data = ["", "", "", "", "", "", "", "", ""];
    setCount(0);
    box_array.forEach((box) => {
      box.current.innerHTML = "";
    });
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        {" "}
        <span>T</span>ic<span>Ta</span>c<span>Toe</span>{" "}
      </h1>
      <div className="board">
        {box_array.map((box, index) => (
          <div
            key={index}
            className="boxes"
            ref={box}
            onClick={(e) => toggle(e, index)}
          ></div>
        ))}
      </div>
      <button className="reset" onClick={reset}>Reset</button>
      {winner && (
        <div className="overlay">
          <div className="popup">
            {winner === "draw" ? (
              <h2>It's a Draw!</h2>
            ) : (
              <>
                <h2>{`Player ${winner.toUpperCase()} Wins!`}</h2>
              </>
            )}
            <button className="reset" onClick={reset}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicTacToe;
