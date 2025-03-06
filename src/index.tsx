import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./storage";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "./hooks/context/LanguageContext";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <LanguageProvider> */}
      <App />

      {/* </LanguageProvider> */}
    </BrowserRouter>
  </Provider>
);
