import React from "react";
import PlayBtn from "../assets/PlayButton.svg";

export default function PlayButton(props) {
  return (
    <>
      <button className="w-[100px] inline-block bg-transparent b-0" {...props}>
        <img src={PlayBtn} alt="playbtn" />
      </button>
    </>
  );
}
