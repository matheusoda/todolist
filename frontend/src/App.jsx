import "./App.css";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./components/Login";
import SidebarComponent from "./components/SidebarComponent";
// import HomePage from "./pages/Home";
import { Outlet } from "react-router-dom";

function App() {
    const { isAuthenticated } = useAuth();


    return (
        <>
            {isAuthenticated ? (
                <SidebarComponent>
                    <Outlet />
                </SidebarComponent>
            ) : (
                <LoginPage />
            )}
        </>
    );
}

export default App;
