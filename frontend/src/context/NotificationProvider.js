import React from "react";
import { createContext } from "react";

const NotificationContext = createContext();
const NotificationProvider = ({ children }) => {
  const updateNotification = () => {};
  return (
    <NotificationContext.Provider value={updateNotification}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
