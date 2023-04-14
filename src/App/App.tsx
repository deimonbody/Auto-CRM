import PageLayout from "@src/components/PageLayout/PageLayout";
import Router from "@src/routes/Router";
import React from "react";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  return (
    <PageLayout>
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </PageLayout>
  );
};

export default App;
