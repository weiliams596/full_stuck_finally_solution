import Register from '../../pages/Auth/Register';
import Notfund from '../../pages/Notfund';
import Login from '../../pages/Auth/Login';
import TestPage from '../../pages/TestPage';
import InvalidUser from '../../pages/InvalidUser';
import HomePage from '../../pages/HomePage';
import AllFunctions from '../Home/AllFunctions';
import ShowNowQueue from '../Home/ShowNowQueue';
import DoctorRegister from '../../pages/Auth/DoctorRegister';

import AboutUs from '../../pages/AboutUs';

const routes = [
    {
        path: '/',
        element : HomePage,
        Children:[
            {path:0, element: AllFunctions},
            {path:'real-time-queue' , element: ShowNowQueue},
            {path:'about',element:AboutUs}
        ]
    },
    {
        path:'/invaliduser',
        element: InvalidUser,
    },
    {
        path: '/register',
        element : Register,
    },
    {
        path: '/doctor-register',
        element: DoctorRegister,
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