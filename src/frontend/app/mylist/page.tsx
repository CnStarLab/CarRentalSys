"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@mui/material";

// 导入各个页面组件
import UserPage from "../profile/page";

export default function Mylist() {
  const searchParams = useSearchParams();
  const activeItem = searchParams.get("activeItem");
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  useEffect(() => {
    if (activeItem !== null && !isNaN(Number(activeItem))) {
      setSelectedItem(Number(activeItem));
    }
  }, [activeItem]);

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

  const items = [
    { icon: "👤", label: "aaa", component: UserPage },
    { icon: "🔔", label: "bbb", component: UserPage },
    { icon: "🚗", label: "ccc", component: UserPage },
    { icon: "📜", label: "ddd", component: UserPage },
    { icon: "📦", label: "eee", component: UserPage },
    { icon: "❤️", label: "fff", component: UserPage },
  ];

  const SelectedComponent =
    selectedItem !== null ? items[selectedItem].component : null;

  return (
    <>
      <div style={sidebarStyle}>
        {items.map((item, index) => (
          <div
            key={index}
            style={selectedItem === index ? selectedItemStyle : itemStyle}
            onClick={() => setSelectedItem(index)}
          >
            <span>{item.icon}</span>
            <Button style={{ color: "inherit", textDecoration: "none" }}>
              <span style={{ fontSize: "18px" }}>{item.label}</span>
            </Button>
          </div>
        ))}
      </div>
      <div style={{ marginLeft: "250px", padding: "20px" }}>
        {SelectedComponent && <SelectedComponent />}
      </div>
    </>
  );
}
