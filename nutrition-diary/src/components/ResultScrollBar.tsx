"use client"

import React, { ReactNode } from "react";

interface ScrollPanelProps {
  children: ReactNode;
}

const ScrollPanel: React.FC<ScrollPanelProps> = ({ children }) => {
  return (
    <div className="overflow-x-scroll flex whitespace-nowrap bg-gray-200 py-2 px-4">
      <div className="inline-flex" style={{ minWidth: "100%" }}>
        {children}
      </div>
    </div>
  );
};

export default ScrollPanel;
