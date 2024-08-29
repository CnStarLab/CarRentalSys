// NotificationBell.tsx

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Notification } from '../app/interface';

const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Fetch notifications from an API or use dummy data
    const fetchedNotifications: Notification[] = [
      {
        id: 1,
        message: 'Bilguunzaya Boldbaatar машин түрээслэх хүсэлт илгээжээ.',
        timeAgo: '2 цагийн өмнө',
        carModel: 'Volkswagen Id3',
        read: false,
      },
      {
        id: 2,
        message: 'Bilguunzaya Boldbaatar машин түрээслэх хүсэлт илгээжээ.',
        timeAgo: '2 цагийн өмнө',
        carModel: 'Volkswagen Id3',
        read: false,
      },
      {
        id: 3,
        message: 'Bilguunzaya Boldbaatar машин түрээслэх хүсэлт илгээжээ.',
        timeAgo: '2 цагийн өмнө',
        carModel: 'Volkswagen Id3',
        read: true,
      },
    ];
    setNotifications(fetchedNotifications);
  }, []);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={handleToggleDropdown} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}>
        <Image src="/bell.svg" alt="Notifications" width={24} height={24} />
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              background: '#FF0000',
              borderRadius: '50%',
              color: '#FFFFFF',
              padding: '2px 6px',
              fontSize: '12px',
              lineHeight: '1',
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '30px', // Adjust depending on button height
            right: '0',
            width: '300px', // Adjust width as needed
            background: '#FFFFFF',
            border: '1px solid #f0f0f0',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            zIndex: 1000,
          }}
        >
          <div style={{ padding: '10px', borderBottom: '1px solid #f0f0f0', fontWeight: 'bold' }}>
            Мэдэгдэл
            <button
              onClick={() => setIsOpen(false)}
              style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              &times;
            </button>
          </div>
          {notifications.map((notification) => (
            <div key={notification.id} style={{ padding: '10px', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#ececec',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '10px',
                  }}
                >
                  <span style={{ color: '#333', fontWeight: 'bold' }}>B</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0 }}>{notification.message}</p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>
                    {notification.timeAgo} • {notification.carModel}
                  </p>
                </div>
                {!notification.read && <span style={{ width: '8px', height: '8px', background: '#007BFF', borderRadius: '50%' }}></span>}
              </div>
              <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                <button style={{ flex: 1, padding: '5px', border: '1px solid #ccc', borderRadius: '4px', background: '#f0f0f0', cursor: 'pointer' }}>
                  Татгалзах
                </button>
                <button style={{ flex: 1, padding: '5px', border: 'none', borderRadius: '4px', background: '#333', color: '#fff', cursor: 'pointer' }}>
                  Зөвшөөрөх
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
