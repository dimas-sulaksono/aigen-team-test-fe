import CloseButton from "@/components/atoms/CloseButton";
import IconCheck from "@/components/atoms/Icons/IconCheck";
import IconError from "@/components/atoms/Icons/IconError";
import IconWarning from "@/components/atoms/Icons/IconWarning";
import { useSelector } from "react-redux";

const ToastNotification = () => {
  const { message, type, isVisible } = useSelector(
    (state) => state.notification
  );

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case "error":
        return <IconError />;
      case "warning":
        return <IconWarning />;
      default:
        return <IconCheck />;
    }
  };

  const bgColor =
    type === "error"
      ? "bg-red-100  text-red-500 "
      : type === "warning"
      ? "bg-yellow-100 text-yellow-500"
      : "bg-green-100  text-green-500 ";

  return (
    <div
      className={`fixed bottom-5 right-5 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-slate-100 rounded-lg shadow-sm border
        transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
    >
      <div
        className={`inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg ${bgColor}`}
      >
        {getIcon()}
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>
      <CloseButton />
    </div>
  );
};

export default ToastNotification;
