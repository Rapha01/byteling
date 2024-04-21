import MainSiteRoute from './mainSite.route';
import UsersRoute from './users.route';
import AuthRoute from './auth.route';
import AdminSiteRoute from './adminSite.route';

const routes = [
    new MainSiteRoute(),
    new UsersRoute(),
    new AuthRoute(),
    new AdminSiteRoute()
];

export { routes }