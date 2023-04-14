import PageLayout from "@src/components/PageLayout/PageLayout";
import Router from "@src/routes/Router";
import React from "react";

const App: React.FC = () => {
  return (
    <PageLayout>
      <Router />
    </PageLayout>
  );
};

export default App;
