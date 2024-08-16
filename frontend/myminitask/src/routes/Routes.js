import routes from "../config/Config";
import Home from "../pages/Home";

const publicRoutes = [
    {
        path: routes.home,
        component: Home
    }
]
export default publicRoutes;