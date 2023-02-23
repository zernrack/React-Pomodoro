import React, { useState } from "react";
import "./App.css";
import Settings from "./Settings";
import SettingsContext from "./SettingsContext";
import Timer from "./Timer";

export default function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);
  return (
    <>
      <div className="container pt-14 max-w-[340px] text-center">
        <SettingsContext.Provider value={{
            showSettings,
            setShowSettings,
            workMinutes,
            breakMinutes,
            setWorkMinutes,
            setBreakMinutes,
        }}>
          {showSettings ? <Settings /> : <Timer />}
        </SettingsContext.Provider>
      </div>
    </>
  );
}
