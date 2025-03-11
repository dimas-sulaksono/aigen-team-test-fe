import ToastNotification from "@/components/molecules/ToastNotification";

const NotificationContainer = () => {
  return (
    <div className="fixed top-0 right-0 z-100">
      <ToastNotification />
    </div>
  );
};

export default NotificationContainer;
