import React, { useState, useEffect } from "react";
import { MainHeader, MainNavType } from "../../components/main/MainHeader";

const BREAK_POINT = 150;

interface MainHeaderControllerProps {}

const MainHeaderController: React.FC<MainHeaderControllerProps> = props => {
  const [mode, setMode] = useState<MainNavType>("normal");
  const [prevScrollPos, setPrevScrollPos] = useState<number>(
    window.pageYOffset
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = (): void => {
    const currentScrollPos = window.pageYOffset;

    if (currentScrollPos > BREAK_POINT) {
      if (currentScrollPos > prevScrollPos) {
        setMode("hidden");
      } else {
        setMode("boxed");
      }
    } else {
      setMode("normal");
    }
    setPrevScrollPos(currentScrollPos);
  };

  return <MainHeader mode={mode} />;
};

export { MainHeaderController };
