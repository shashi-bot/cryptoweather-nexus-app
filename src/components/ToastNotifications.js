import { useSelector } from "react-redux";

const ToastNotifications = () => {
  const notifications = useSelector((state) => state.notifications.items);

  if (!notifications.length) return null; // Hide if no notifications

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {notifications.map((note) => (
        <div
          key={note.id} // Use unique ID instead of index
          className={`p-3 shadow-lg rounded-lg text-white transition-transform transform animate-slideIn ${
            note.type === "price_alert" ? "bg-blue-600" : "bg-yellow-500"
          }`}
        >
          {note.type === "price_alert" ? "💰" : "⛅"} {note.message}
        </div>
      ))}
    </div>
  );
};

export default ToastNotifications;

