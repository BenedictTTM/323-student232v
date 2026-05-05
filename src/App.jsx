import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import WarningBanner from "./components/layout/WarningBanner";
import DemoDisclaimer from "./components/layout/DemoDisclaimer";
import { individualsRoutes } from "./pages/Individuals/individualsRoutes";
import { businessesRoutes } from "./pages/Businesses/businessesRoutes";

function App() {
  return (
    <>
      <WarningBanner />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="cryptocurrencies" element={<Explore />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="register" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="login" element={<SignIn />} />
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      {individualsRoutes.map((route, i) => (
        <Route
          key={`ind-${i}`}
          path={route.path === "" ? undefined : route.path}
          index={route.index}
          element={route.element}
        />
      ))}
      {businessesRoutes.map((route, i) => (
        <Route
          key={`bus-${i}`}
          path={route.path === "" ? undefined : route.path}
          index={route.index}
          element={route.element}
        />
      ))}
    </Routes>
      <DemoDisclaimer />
    </>
  );
}

export default App;
