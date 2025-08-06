import Register from '../../pages/Auth/Register';
import Login from '../../pages/Auth/Login';

import HomePage from '../../pages/Patient/HomePage';
import InvalidUser from '../../pages/InvalidUser';
import AllFunctions from '../Home/AllFunctions';
import ShowNowQueue from '../Home/ShowNowQueue';

import DoctorRegister from '../../pages/Doctor/DoctorRegister';

import AdminHome from '../../pages/Admin/AdminHome';
import ControlHospital from '../../pages/Admin/ControlHospital';
import ControlUsers from '../../pages/Admin/ControlUsers';

import TestPage from '../../pages/TestPage';

import AboutUs from '../../pages/AboutUs';
import Notfund from '../../pages/Notfund';
const routes = [
    {
        path: '/home',
        element : HomePage,
        Children:[
            {path:0, element: AllFunctions},
            {path:'real-time-queue' , element: ShowNowQueue},
            {path:'about',element:AboutUs}
        ]
    },
    {
        path: '/admin',
        element: AdminHome,
        Children:[
            {path:'hospital-control',element:ControlHospital},
            {path:'user-control',element:ControlUsers},
        ],
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