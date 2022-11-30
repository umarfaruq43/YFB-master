import React from "react";
import { signOut } from "firebase/auth";
import { useAuth } from "../context/context";

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

const AppLogout = ({ children }) => {
  const [timeout, setTimeout] = React.useState(500 * 60 * 5);
  const [remaining, setRemaining] = React.useState(timeout);
  const [isActive, setIsActive] = React.useState(true);
  const [isIdle, setIsIdle] = React.useState(false);

  const { auth } = useAuth();
  const handleLogout = async () => {
    await signOut(auth);
  };

  const onAction = (e) => {
    setIsActive(true);
    setRemaining(timeout);
  };

  const onActive = () => {
    setIsActive(true);
  };

  const onIdle = () => {
    setIsIdle(true);
    handleLogout();
  };

  React.useEffect(() => {
    events.forEach((event) => {
      window.addEventListener(event, onAction);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, onAction);
      });
    };
  }, []);

  React.useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setRemaining((remaining) => remaining - 1000);
      }, 1000);
    } else if (!isActive && remaining !== timeout) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, remaining, timeout]);

  React.useEffect(() => {
    if (remaining <= 0) {
      onIdle();
    }
  }, [remaining]);

  return (
    <div>
      {children}
      {/* <div>
        {isActive ? "Active" : "Not Active"} - {remaining / 1000} seconds
        remaining
      </div> */}
    </div>
  );
};

export default AppLogout;
