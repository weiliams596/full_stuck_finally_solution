import Register from '../../pages/Auth/Register';
import Notfund from '../../pages/Notfund';
import Login from '../../pages/Auth/Login';
import TestPage from '../../pages/TestPage';

const routes = [
    {
        path: '/register',
        element : Register,
    },
    {
        path: '/login',
        element : Login,
    },
    {
        path: '/test',
        element : TestPage,
    },
    {
        path:'*',
        element: Notfund,
    }
];

export default routes;