import { create } from "zustand";

const useNotification = create((set) => ({
  notifications: [],
  addNotification: (notification) => {
    set((state) => ({
      notifications: [...state.notifications, { ...notification, id: Date.now() }],
    }));
  },
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id),
    }));
  },
}));

export { useNotification };
