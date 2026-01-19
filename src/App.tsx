import AppRouter from "./router/AppRouter";
import AppLayout from "./layouts/AppLayouts";
import { Toaster } from "react-hot-toast";

const AppContent = () => {
  return (
    <AppLayout>
      <Toaster position="top-center" reverseOrder={false} />
      <AppRouter />
    </AppLayout>
  );
};

export default AppContent;
