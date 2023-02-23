import React from 'react'
import PauseBtn from "../assets/PauseButton.svg";

export default function PauseButton(props) {
  return (
    <>
    <button className="w-[100px] inline-block bg-transparent b-0" {...props}>
        <img src={PauseBtn} alt="playbtn" />
      </button>
    </>
  )
}

