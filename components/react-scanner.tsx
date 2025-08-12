"use client";

// react-scan must be imported before react
import { scan } from "react-scan";
import { type JSX, useEffect } from "react";

function ReactScanner(): JSX.Element {
  useEffect(() => {
    scan({
      enabled: true,
      showToolbar: true
    });
  }, []);

  return <></>;
}

export { ReactScanner };
