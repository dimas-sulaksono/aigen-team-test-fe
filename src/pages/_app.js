import NotificationContainer from "@/components/organism/Notification";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <NotificationContainer />
      <Component {...pageProps} />
    </Provider>
  );
}
