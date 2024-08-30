// src/components/NotificationList.jsx
import React from "react";
import NotificationItem from "./NotificationItem";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material";

const notifications = [
  {
    name: "Bilguunzaya Boldbaatar",
    requestTime: "2 цагийн өмнө",
    carModel: "Wolkswagen Id3",
    dateRange: "8 сарын 14 -> 8 сарын 16",
    imageUrl: "/Logo.png",
  },
  {
    name: "Bilguunzaya Boldbaatar",
    requestTime: "2 цагийн өмнө",
    carModel: "Wolkswagen Id3",
    dateRange: "8 сарын 14 -> 8 сарын 16",
    imageUrl: "/Logo.png",
  },
];

const Notification = () => {
  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
      "&::before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      "&::after": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

  const containerStyle: React.CSSProperties = {
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "800px",
    margin: "0 auto",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const switchContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    paddingBottom:"10px",
    borderBottom:"1px solid #ccc",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Мэдэгдэл</h1>
      <div style={switchContainerStyle}>
        <FormGroup>
          <FormControlLabel
            control={<Android12Switch />}
            label="И-мэйлээр мэдэгдэл хүлээн авах"
          />
          <FormControlLabel
            control={<Android12Switch />}
            label="Утасны дугаараар мэдэгдэл хүлээн авах"
          />
        </FormGroup>
      </div>
      <div>
        {notifications.map((notification, index) => (
          <NotificationItem key={index} {...notification} />
        ))}
      </div>
    </div>
  );
};

export default Notification;
