
import {
    createBrowserRouter
} from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Purchases from "./pages/Purchases";
import ProductsList from "./pages/ProductsList";
import Layout from "./pages/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <ProductsList />,
            },
            {
                path: "products/:id",
                element: <ProductDetail />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "signup",
                element: <Signup />
            },
            {
                path: "purchases",
                element: (
                    <ProtectedRoute>
                        <Purchases />
                    </ProtectedRoute>
                )
            }
        ]
    },
]);

export default router;

