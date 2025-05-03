"use client"

import type React from "react"

import { useState } from "react"

interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface TabViewProps {
  tabs: Tab[]
}

export default function TabView({ tabs }: TabViewProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  return (
    <div>
      <div className="flex border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === tab.id ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>{tabs.find((tab) => tab.id === activeTab)?.content}</div>
    </div>
  )
}
