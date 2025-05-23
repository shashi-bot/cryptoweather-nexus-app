import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import Layout from '../components/Layout';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
