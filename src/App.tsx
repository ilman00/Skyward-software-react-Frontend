import AppRouter from "./router/AppRouter";
import { Toaster } from "react-hot-toast";

const AppContent = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AppRouter />
    </>
  );
};

export default AppContent;
