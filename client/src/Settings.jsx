import React, { useContext } from "react";
import ReactSlider from "react-slider";
import "./App.css";
import BackButton from "./components/BackButton";
import SettingsContext from "./SettingsContext";
import "./Slider.css";

export default function Settings() {
  const settingsInfo = useContext(SettingsContext);
  return (
    <>
      <div className="container text-left">
        <label>Work Minutes: {settingsInfo.workMinutes}:00</label>
        <ReactSlider
          className={"slider"}
          thumbClassName={"thumb"}
          trackClassName={"track"}
          value={settingsInfo.workMinutes}
          onChange={(newValue) => settingsInfo.setWorkMinutes(newValue)}
          min={1}
          max={120}
        />
        <label>Break Minutes: {settingsInfo.breakMinutes}:00</label>
        <ReactSlider
          className={"slider green"}
          thumbClassName={"thumb"}
          trackClassName={"track"}
          value={settingsInfo.breakMinutes}
          onChange={(newValue) => settingsInfo.setBreakMinutes(newValue)}
          min={1}
          max={120}
        />
        <div className="text-center mt-5">
          <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
        </div>
      </div>
    </>
  );
}
