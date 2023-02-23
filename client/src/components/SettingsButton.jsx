import React from "react";
import SettingsBtn from "../assets/SettingsButton.svg";
import "../App.css";

export default function SettingsButton(props) {
  return (
    <>
      <div className=" w-[89px] inline-block bg-transparent b-0">
          <button {...props}>
            <img src={SettingsBtn} alt="playbtn" />
          </button>
        </div>
    </>
  );
}
