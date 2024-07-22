import config from '../config';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import Video from '../pages/Video';
import Error from '../pages/Error';
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.search, component: Search },
    { path: config.routes.video, component: Video },
    { path: config.routes.errorSearch, component: Error },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
