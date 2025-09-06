import { Routes, Route, Navigate } from "react-router";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

import HomePage from "./pages/Home";
import AuthPage from "./pages/Auth";

const App = () => {
  return (
    <header>
      <SignedIn>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Navigate to={"/"} replace />} />
        </Routes>
      </SignedIn>
      <SignedOut>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to={"/auth"} replace />} />
        </Routes>
      </SignedOut>
    </header>
  );
};

export default App;
