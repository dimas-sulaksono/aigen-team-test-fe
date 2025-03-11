import { hideNotification } from "@/redux/notificationSlice";
import { useDispatch } from "react-redux";

const CloseButton = () => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(hideNotification())}
      className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-100 hover:cursor-pointer"
    >
      <svg
        className="w-3 h-3"
        aria-hidden="true"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </button>
  );
};

export default CloseButton;
