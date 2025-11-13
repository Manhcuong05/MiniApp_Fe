import "zmp-ui/zaui.css";
import "@/css/tailwind.scss";
import "@/css/app.scss";

import React, { useState, useEffect, useMemo } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { App as ZMPApp, ZMPRouter } from "zmp-ui";

import Intro from "./pages/Intro";
import Terms from "./pages/Terms";
import LoanInfo from "./pages/LoanInfo";
import Confirm from "./pages/Confirm";
import Success from "./pages/Success";

const RoutesView = () => (
  <Routes>
    <Route path="/" element={<Intro />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/loan" element={<LoanInfo />} />
    <Route path="/confirm" element={<Confirm />} />
    <Route path="/success" element={<Success />} />
  </Routes>
);

const RouterView = () => {
  const isMiniAppEnv = useMemo(() => {
    if (typeof window === "undefined") return false;
    const appId = (window as any).APP_ID;
    const basePath = (window as any).BASE_PATH;
    const inZaloPath = window.location.pathname.includes("/zapps/");
    return Boolean(appId || basePath || inZaloPath);
  }, []);

  const content = (
    <ZMPApp>
      <RoutesView />
    </ZMPApp>
  );

  if (isMiniAppEnv) {
    return <ZMPRouter>{content}</ZMPRouter>;
  }

  return <HashRouter>{content}</HashRouter>;
};

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const zmpReady = (window as any).zmp?.ready;
    if (typeof zmpReady === "function") {
      (window as any).zmp.ready(() => setIsReady(true));
    } else {
      console.warn("ZMP SDK not loaded – running in dev/native mode");
      setTimeout(() => setIsReady(true), 1000); // delay nhỏ để hiển thị spinner
    }
  }, []);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center animate-fade-in">
          <div className="w-20 h-20 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-2xl font-bold text-green-600">FE CREDIT</div>
          <div className="text-gray-500 text-sm mt-2">
            Đang tải ứng dụng...
          </div>
        </div>
      </div>
    );
  }

  return <RouterView />;
};

export default App;
