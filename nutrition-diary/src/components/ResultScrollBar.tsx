"use client";
import React, { useRef, useEffect } from "react";

const ResultScrollBar = ({ children }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.scrollLeft = scrollContainer.scrollWidth;
    }
  }, [children]);

  return (
    <div className="horizontal-scroll-panel" ref={scrollRef}>
      <div className="horizontal-scroll-content">
        {children}
      </div>
    </div>
  );
};

export default ResultScrollBar;