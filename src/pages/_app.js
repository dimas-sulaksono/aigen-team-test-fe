import NotificationContainer from "@/components/organism/Notification";
import Layout from "@/components/templates/Layout";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <NotificationContainer />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
