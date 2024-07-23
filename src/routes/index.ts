import SiteRoute from './site.route';
import UserApiRoute from './api.user.route';
import AuthApiRoute from './api.auth.route';
import UtilApiRoute from './api.util.route';
import AdminSiteRoute from './site.admin.route';

export default { 
    siteRoute: new SiteRoute(),
    userApiRoute: new UserApiRoute(),
    utilApiRoute: new UtilApiRoute(),
    authApiRoute: new AuthApiRoute(),
    adminSiteRoute: new AdminSiteRoute()
}