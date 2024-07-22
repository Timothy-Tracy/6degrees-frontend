import { lazy } from "react";
import { Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import { ItemPage } from '../components/ui/ItemPage';
import OrderSuccess from "../components/ui/OrderSuccess";
import { NodeProvider } from "../context/NodeContext.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/
const CheckoutPage = lazy(() => import("../components/ui/Checkout.js"));
const Ivan = lazy(() => import("../components/ui/Ivan.js"));

const OrderPage = lazy(() => import("../components/ui/Orders.js"));

const Login = lazy(() => import("../components/ui/auth/Login.js"));

const ShoppingCartPage = lazy(() => import("../components/ui/ShoppingCart.js"));




const MyAccountPage = lazy(() => import("../components/ui/AccountSettings.js"));
const Store = lazy(() => import("../components/ui/Store.js"));
const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

const AdminPage = lazy(() => import("../components/ui/Admin.js")); // Added Admin Page
const PostPage = lazy(() => import("../components/posts/PostPage.js")); // Added Admin Page

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <Suspense fallback={<div>Loading...</div>}><FullLayout /></Suspense>,
    children: [
      { path: "/", element: <Navigate to="/store" /> },
      { path: "/posts/:query", element:<NodeProvider><PostPage></PostPage></NodeProvider>},
      { path: "/checkout", element: <CheckoutPage /> },

      { path: "/ivan",  element: <Ivan /> },

      { path: "/orders",  element: <OrderPage /> },

      { path: "/login",  element: <Login /> },


      { path: "/shoppingcart",  element: <ShoppingCartPage /> },

      { path: "/itempage/:id", element: <ItemPage /> },

      { path: "/settings",  element: <MyAccountPage /> },
      { path: "/store",  element: <Store /> },
      { path: "/starter",  element: <Starter /> },
      { path: "/about",  element: <About /> },
      { path: "/alerts",  element: <Alerts /> },
      { path: "/badges",  element: <Badges /> },
      { path: "/buttons",  element: <Buttons /> },
      { path: "/cards",  element: <Cards /> },
      { path: "/grid",  element: <Grid /> },
      { path: "/table",  element: <Tables /> },
      { path: "/forms",  element: <Forms /> },
      { path: "/breadcrumbs",  element: <Breadcrumbs /> },
      { path: "/admin",  element: <AdminPage /> },

      { path: "/order-success", element: <OrderSuccess /> },

    ],
  },
];

export default ThemeRoutes;
