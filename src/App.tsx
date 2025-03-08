import Footer from "./components/layouts/Footer";
import ThemeProvider from "./theme";
import Header from "./components/layouts/Header";
import { lazy, Suspense } from "react";
import Loader from "./components/loader";

const Besider = lazy(() => import("./pages/Besider/Besider"));

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Suspense fallback={<Loader />}>
        <Besider />
      </Suspense>
      <Footer sx={{ position: "fixed", bottom: 0, background: "#FFF" }} />
    </ThemeProvider>
  );
}

export default App;
