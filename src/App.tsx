import AppRouter from "./router/AppRouter";
import AppLayout from "./layouts/AppLayouts";

const AppContent = () => {
  return (
    <AppLayout>
      <AppRouter />
    </AppLayout>
  );
};

export default AppContent;
