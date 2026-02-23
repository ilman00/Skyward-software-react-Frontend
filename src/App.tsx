import AppRouter from "./router/AppRouter";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

const AppContent = () => {



  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);


  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AppRouter />
    </>
  );
};

export default AppContent;
