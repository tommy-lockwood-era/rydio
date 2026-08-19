"use client";

import { useState } from "react";

// This will be a specifically 2-tab component
// Tabs will have two parts
// 1. Tab name - passed to the component as a prop
// 2. Tab content - passed to the component as a prop
// The Tabs component will receive a single array prop. The array is made of of objects with two properties. The first property is a string tabName, and the second property is the JSX of the respective tab's content

type TabData = {
  tabName: string;
  tabContent: React.ReactNode; // JSX
}

export default function Tabs({ tabData }: { tabData: TabData[] }) {
  const [currentTab, setCurrentTab] = useState(0); // tabs

  return (
    /* Book & Buy Tabs and Forms */
    <div className="flex flex-col justify-center md:min-w-100">
      {/* Tab-switching Buttons */}
      <div className="grid grid-cols-2 text-text bg-gray-300 rounded-t-xl">
        <button
          type="button"
          // We use template literals to combine dynamic strings with static strings so that if the tab is active, the bg is white, otherwise gray
          className={`${currentTab === 0 && "bg-white font-semibold"} rounded-t-xl py-3 px-6 cursor-pointer`}
          onClick={() => setCurrentTab(0)}
        >
          {tabData[0].tabName}
        </button>
        <button
          type="button"
          className={`${currentTab === 1 && "bg-white font-semibold"} rounded-t-xl py-3 px-6 cursor-pointer`}
          onClick={() => setCurrentTab(1)}
        >
          {tabData[1].tabName}
        </button>
      </div>

      {/* Tab Content */}
      {currentTab === 0 && tabData[0].tabContent}
      {currentTab === 1 && tabData[1].tabContent}
    </div>
  );
}
