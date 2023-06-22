import { createBrowserRouter } from 'react-router-dom'

//import layouts
import AdminLayout from './layouts/AdminLayout'
import UserLayout from './layouts/UserLayout'

//import components
import About from './components/About'
import LandingPage from './pages/user/LandingPage'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Feature from './components/Feature'
import NotFound from './components/NotFound'
import Community from './pages/user/Community'
import Login from './pages/auth/Login'
import Dashboard from './pages/admin/Dashboard'
import OtherBlog from './components/OtherBlog'
import ManageAccount from './pages/admin/ManageAccount'
import ManageArticle from './pages/admin/ManageArticle'
import ManageCommunity from './pages/admin/ManageCommunity'
import ManageVideo from './pages/admin/ManageVideo'
import Article from './components/Article'
import Video from './components/Video'
import LibraryArticle from './components/LibraryArticle'
import AddVideo from './pages/admin/video/AddVideo';
import TabelVideo from './pages/admin/video/TabelVideo';
import EditVideo from './pages/admin/video/EditVideo';
import TabelArtikel from './pages/admin/article/TabelArtikel';
import AddArticle from './pages/admin/article/AddArticle';


const router = createBrowserRouter([
  {
    element: <UserLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/otherblog",
        element: <OtherBlog />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/feature",
        element: <Feature />,
      },
      {
        path: "/community",
        element: <Community />,
      },
      {
        path: "/article",
        element: <Article />,
      },
      {
        path: "/video",
        element: <Video />,
      },
      {
        path: "/libraryarticle",
        element: <LibraryArticle />,
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/accounts",
        element: <ManageAccount />,
      },
      {
        path: "/dashboard/community",
        element: <ManageCommunity />,
      },
      {
        path: "/dashboard/article",
        element: <ManageArticle />,
      },
      {
        path: "/dashboard/video/add",
        element: <AddVideo />
      },
      {
        path: "/dashboard/video",
        element: <TabelVideo />
      },
      {
        path: "/dashboard/video/edit/:id",
        element: <EditVideo />
      },
      {
        path: "/dashboard/article",
        element: <TabelArtikel />
      },
      {
        path: "/dashboard/article/add",
        element: <AddArticle />
      }
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
  {
    path: "/admin_login",
    element: <Login />,
  },
]);

export default router