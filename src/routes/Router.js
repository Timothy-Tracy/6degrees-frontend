import { lazy } from "react";
import { Navigate } from "react-router-dom";
import React, { Suspense } from "react";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** 6 Degrees Pages ****/
const Login = lazy(() => import("../components/auth/Login.js"));
const PostPage = lazy(() => import("../components/posts/PostPage.js")); // Added Admin Page
const ProfilePage = lazy(() => import("../components/profile/ProfilePage.js"));
const MyAccountPage = lazy(() => import("../components/ui/AccountSettings.js"));
const CreatePostPage = lazy(() => import("../components/posts/create/CreatePostPage.js")); // Added Admin Page

//Template
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

/*****Routes******/
const ThemeRoutes = [
  {
    path: "/",
    element: <Suspense fallback={<div>Loading...</div>}><FullLayout /></Suspense>,
    children: [
      { path: "/", element: <Navigate to="/" /> },
      { path: "/posts/:query", element:<PostPage></PostPage>},
      { path: "/posts/create", element:<CreatePostPage></CreatePostPage>},

      { path: "/login",  element: <Login/> },
      { path: "/profile",  element: <ProfilePage/> },
      { path: "/settings",  element: <MyAccountPage /> },
      
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
    ],
  },
];

export default ThemeRoutes;
