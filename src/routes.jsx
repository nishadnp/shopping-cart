import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";



const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { 
                index: true, 
                element: <Home />,
            },
            { 
                path: 'shop', 
                element: <Shop />, 
            },
            { 
                path: 'cart', 
                element: <Cart />, 
            },
        ]
    }
]);

export default routes;