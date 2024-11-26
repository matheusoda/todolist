import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider
} from "react-router-dom";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import HomePage from "./pages/Home.jsx";
import UsersComponent from "./components/UsersComponent.jsx";

function RedirectIfLoggedIn(to) {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Navigate to={to} /> : null;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        //   errorElement: <NotFoundPage />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/home",
                element: <HomePage />
            },
            {
                path: "/users",
                element: <UsersComponent />
            },
            {
                path: "/login", // Rota para a página de login
                element: <RedirectIfLoggedIn to="/" />
            }
        ]
    }
]);
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>
);
