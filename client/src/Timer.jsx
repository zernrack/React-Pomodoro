import React, { useContext, useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PauseButton from "./components/PauseButton";
import PlayButton from "./components/PlayButton";
import SettingsButton from "./components/SettingsButton";
import SettingsContext from "./SettingsContext";
import TimerEndSound from "./assets/sounds/TimerEndsSounds.mp3";

export default function Timer() {
  const red = "#f54e4e";
  const green = "#4aec8c";

  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); // work/break/null
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerEnded, setTimerEnded] = useState(false);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds =
        (nextMode === "work"
          ? settingsInfo.workMinutes
          : settingsInfo.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
      setIsPaused(true); // Pause the timer after switching mode
      isPausedRef.current = true;
      setTimerEnded(true); // Set timerEnded to true when mode switches
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  useEffect(() => {
    if (timerEnded) {
      const audio = new Audio(TimerEndSound);
      audio.play();
    }
  }, [timerEnded]);

  useEffect(() => {
    return () => {
      const audio = new Audio(TimerEndSound);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;
  return (
    <>
      <div>
        <CircularProgressbar
          value={percentage}
          text={`${minutes} : ${seconds}`}
          styles={buildStyles({
            textColor: "#fff",
            pathColor: mode === "work" ? red : green,
            trailColor: "rgb(255, 255, 255)",
          })}
        />
        <div className="buttons-controls mt-[20px]">
          {isPaused ? (
            <PlayButton
              onClick={() => {
                setIsPaused(false);
                isPausedRef.current = false;
              }}
            />
          ) : (
            <PauseButton
              onClick={() => {
                setIsPaused(true);
                isPausedRef.current = true;
              }}
            />
          )}
          <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
        </div>
      </div>
    </>
  );
}
