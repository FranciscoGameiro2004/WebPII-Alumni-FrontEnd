import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ "@/pages/Dashboard.vue");
const Profile = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const Notifications = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Notifications.vue");
const Icons = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Icons.vue");
const Typography = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Typography.vue");
const TableList = () =>
  import(/* webpackChunkName: "common" */ "@/pages/TableList.vue");
 
const Login = () => 
  import(/* webpackChunkName: "common" */ "@/pages/Login.vue")
const Register = () => 
  import(/* webpackChunkName: "common" */ "@/pages/Register.vue")

const DegreeConfig = () =>
  import(/* webpackChunkName: "common" */ "@/pages/ADMIN_DegreeConfig.vue")

const InstitutionConfig = () =>
  import(/* webpackChunkName: "common" */ "@/pages/ADMIN_InstitutionConfig.vue")

const CompanyConfig = () =>
  import(/* webpackChunkName: "common" */ "@/pages/ADMIN_CompanyConfig.vue")

const UserConfig = () =>
  import(/* webpackChunkName: "common" */ "@/pages/ADMIN_UsersConfig.vue")

const EventConfig = () =>
  import(/* webpackChunkName: "common" */ "@/pages/ADMIN_EventsConfig.vue")

const Events = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Events.vue")

const Event = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Event.vue")

const Publications = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Posts.vue")

const Publication = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Post.vue")

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "profile",
        name: "TestProfile",
        component: Profile,
      },
      {
        path: "profile/:id",
        name: "profile",
        component: Profile,
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications,
      },
      {
        path: "icons",
        name: "icons",
        component: Icons,
      },
      {
        path: "typography",
        name: "typography",
        component: Typography,
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList,
      },
      {
        path: "events",
        name: "events",
        component: Events,
      },
      {
        path: "events/:id",
        name: "event",
        component: Event,
      },
      
      {
        path: "publications",
        name: "publications",
        component: Publications,
      },
      {
        path: "publications/:id",
        name: "publication",
        component: Publication,
      },
      {
        path: "login",
        name: "login",
        component: Login,
        meta: {
          alreadyAuth: true
        }
      },
      {
        path: "signin",
        name: "register",
        component: Register,
        meta: {
          alreadyAuth: true
        }
      },
      {
        path: "admin/degree",
        name: "degreeConfig",
        component: DegreeConfig,
        meta: {
          adminRequired: true
        }
      },
      {
        path: "admin/institution",
        name: "institutionConfig",
        component: InstitutionConfig,
        meta: {
          adminRequired: true
        }
      },
      {
        path: "admin/user",
        name: "userConfig",
        component: UserConfig,
        meta: {
          adminRequired: true
        }
      },
      {
        path: "admin/company",
        name: "companyConfig",
        component: CompanyConfig,
        meta: {
          adminRequired: true
        }
      },
      {
        path: "admin/event",
        name: "eventConfig",
        component: EventConfig,
        meta: {
          adminRequired: true
        }
      },
    ],
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
