import "@/styles/App.css";

import UserStories from "@/pages/UserStories";
import RolePickerOverlay from "@/components/layout/role-picker-overlay/RolePickerOverlay";
import ToastContainer from "@/components/common/ToastContainer";
import GlobalLoader from "@/components/layout/loaders/GlobalLoader";

import { ToastProvider } from "@/context/ToastContext";
import { LoaderProvider } from "@/context/LoaderContext";
import { UserRoleProvider } from "@/context/UserRoleContext";

import { Navigationbar } from "@/components/layout/navbar/Navbar";

function App() {
  return (
    <ToastProvider>
      <LoaderProvider>
        <UserRoleProvider>
          <div className="p-4">
            <Navigationbar />
            <UserStories />
          </div>

          <RolePickerOverlay />
          <ToastContainer />

          <GlobalLoader />
        </UserRoleProvider>
      </LoaderProvider>
    </ToastProvider>
  );
}

export default App;
