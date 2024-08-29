"use client";

import React, { useState } from "react";
import { Button } from "@mui/material";

const Sidebar: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const sidebarStyle: React.CSSProperties = {
    width: "250px", // Adjust width as needed
    height: "340px", // Full height of the viewport
    padding: "20px",
    position: "fixed", // Fixed position
    top: "80px",
    left: "300px",
  };

  const itemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    padding: "10px 0",
    textDecoration: "none",
    color: "black",
    cursor: "pointer",
  };

  const selectedItemStyle: React.CSSProperties = {
    ...itemStyle,
    backgroundColor: "rgb(233, 240, 244)",
  };

  const iconStyle: React.CSSProperties = {
    marginRight: "10px",
    width: "24px",
    height: "24px",
  };

  const items = [
    { icon: "👤", label: "aaa", href: "/profile" },
    { icon: "🔔", label: "bbb", href: "/notifications" },
    { icon: "🚗", label: "ccc", href: "/my-vehicles" },
    { icon: "📜", label: "ddd", href: "/rental-history" },
    { icon: "📦", label: "eee", href: "/order-history" },
    { icon: "❤️", label: "fff", href: "/saved-vehicles" },
  ];

  return (
    <div style={sidebarStyle}>
      {items.map((item, index) => (
        <div
          key={index}
          style={selectedItem === index ? selectedItemStyle : itemStyle}
          onClick={() => setSelectedItem(index)}
        >
          <span>{item.icon}</span>
          <Button
            href={item.href}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <span style={{fontSize:"18px"}}>{item.label}</span>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;