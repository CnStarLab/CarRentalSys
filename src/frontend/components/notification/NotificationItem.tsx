// src/components/NotificationItem.jsx
import { Button } from "@mui/material";
import Image from "next/image";
import React from "react";

interface NotificationItemProps {
  name: string;
  requestTime: string;
  carModel: string;
  dateRange: string;
  imageUrl: string;
}

const NotificationItem = ({
  name,
  requestTime,
  carModel,
  dateRange,
  imageUrl,
}: NotificationItemProps) => {
  const notificationItemStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    marginBottom: "10px",
  };

  const notificationHeaderStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  };

  const userInitialStyle: React.CSSProperties = {
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "50%",
    padding: "10px",
    marginRight: "10px",
    flexShrink: 0,
    height: "40px", // 确保与 userInfoStyle 高度相同
    width: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
  };

  const userInfoStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexGrow: 1,
  };

  const userNameStyle: React.CSSProperties = {
    fontWeight: "bold",
    marginBottom: "5px",
  };

  const detailsStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
  };

  const carModelStyle: React.CSSProperties = {
    marginLeft: "10px",
  };

  const notificationBodyStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    border: "0.5px solid #ccc",
    marginTop: "20px",
    marginBottom: "20px",
    height: '100%',
    padding:"10px 5px 10px 5px"
  };

  const carImageStyle: React.CSSProperties = {
    width: "100px",
    height: "auto",
    marginRight: "20px",
  };

  const dateRangeStyle: React.CSSProperties = {
    flex: 1,
    marginRight: "20px",
  };

  const buttonStyle: React.CSSProperties = {
    marginRight: "10px",
    border: "none",
    cursor: "pointer",
    height:"40px",
    width:"120px"
  };

  const approveButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "rgb(230,240,244)",
    color: "black",
  };

  const declineButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "rgb(34,41,54)",
    color: "white",
  };

  return (
    <div style={notificationItemStyle}>
      <div style={notificationHeaderStyle}>
        <span style={userInitialStyle}>{name.charAt(0)}</span>
        <div style={userInfoStyle}>
          <span style={userNameStyle}>{name}</span>
          <div style={detailsStyle}>
            <span>{requestTime}</span>
            <span style={carModelStyle}>{carModel}</span>
          </div>
        </div>
      </div>
      <div style={notificationBodyStyle}>
        <div style={dateRangeStyle}>{dateRange}</div>
        <img src={imageUrl} alt={carModel} style={carImageStyle} />
      </div>
      <div>
        <Button style={approveButtonStyle}>Татгалзах</Button>
        <Button style={declineButtonStyle}>Зөвшөөрөх</Button>
      </div>
    </div>
  );
};

export default NotificationItem;
