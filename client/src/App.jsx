import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/index.jsx";
import { useApp } from "./context/AppContext.jsx";

function App() {
  const { theme } = useApp();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return <RouterProvider router={appRouter} />;
}

export default App;
