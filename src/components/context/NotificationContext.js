// NotificationContext.js
import React, { createContext, useState, useContext } from 'react';

/** 
 * @type {React.Context<{
 *   notifications: Notification[],
 *   addNotification: (notification: Omit<Notification, 'id'>) => number,
 *   updateNotification: (id: number, updatedNotification: Partial<Notification>) => void,
 *   removeNotification: (id: number) => void
 * }>} 
 * */
const NotificationContext = createContext();

/**
 * @typedef {Object} Notification
 * @property {string} title - What will display as the header of the notification
 * @property {string} sender - What will display as tohe predecessor of the title. Ex. Sender: Title. Default value is 6 Degrees
 * @property {'info'|'success'|'warning'|'error' | React.JSX} icon - The Icon
 * @property {string} message - The content of the notification
 * @property {React.JSX} embed - Embed custom JSX to be displayed in the body
 * @property {('info'|'success'|'warning'|'error')} [type='info'] - The type of notification
 * @property {number} [duration=5000] - Duration in milliseconds before the notification is automatically removed
 */

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  /**
   * Adds a new notification to the list.
   * 
   * @param {Notification} notification - The notification to add
   * @returns {number} The id of the newly added notification
   */
  const addNotification = (notification) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, ...notification }]);
    return id; // Return the id for reference
  };
/**
   * Updates an existing notification.
   * 
   * @param {number} id - The id of the notification to update
   * @param {<Notification>} updatedNotification - The updated notification data
   */
  const updateNotification = (id, updatedNotification) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, ...updatedNotification } : notification
      )
    );
  };


   /**
   * Removes a notification from the list.
   * 
   * @param {number} id - The id of the notification to remove
   */
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, updateNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);