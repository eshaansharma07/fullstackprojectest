import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { appRouter } from "./routes/index.jsx";
import { useApp } from "./context/AppContext.jsx";

function App() {
  const { theme } = useApp();

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, [theme]);

  return (
    <>
      <RouterProvider router={appRouter} />
      <SpeedInsights />
    </>
  );
}

export default App;
