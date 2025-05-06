import { lazy } from "react";

import { createBrowserRouter, RouteObject } from "react-router-dom";

import noticeEmployeeLoader from "./pages/NoticeEmployeePage/loader/noticeEmployeeLoader";
import noticeEmployerLoader from "./pages/NoticeEmployerPage/loader/noticeEmployerLoader";
import profileLoader from "./pages/ProfilePage/loader/profileLoader";

import NoticeDetailSkeleton from "./components/NoticeDetailSkeleton";
import { ROUTES } from "./constants/router";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

const SignupPage = lazy(() => import("@/pages/SignupPage"));
const SigninPage = lazy(() => import("@/pages/SigninPage"));

const ProfilePage = lazy(() => import("@/pages/ProfilePage/ProfilePage"));
const ProfileRegisterPage = lazy(() => import("@/pages/ProfileRegisterPage"));
const ProfileEditPage = lazy(() => import("@/pages/ProfileEditPage"));

const ShopPage = lazy(() => import("@/pages/ShopPage/ShopPage"));
const ShopRegisterPage = lazy(() => import("@/pages/ShopRegisterPage"));
const ShopEditPage = lazy(() => import("@/pages/ShopEditPage"));

const NoticeSearchPage = lazy(
  () => import("@/pages/NoticeSearchPage/NoticeSearchPage"),
);

const NoticeListPage = lazy(
  () => import("@/pages/NoticeListPage/NoticeListPage"),
);

const NoticeRegisterPage = lazy(() => import("@/pages/NoticeRegisterPage"));
const NoticeEditPage = lazy(() => import("@/pages/NoticeEditPage"));
const NoticeEmployerPage = lazy(
  () => import("@/pages/NoticeEmployerPage/NoticeEmployerPage"),
);
const NoticeEmployeePage = lazy(
  () => import("@/pages/NoticeEmployeePage/NoticeEmployeePage"),
);

const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const authRoutes: RouteObject[] = [
  {
    path: ROUTES.AUTH.SIGNUP,
    Component: SignupPage,
  },
  {
    path: ROUTES.AUTH.SIGNIN,
    Component: SigninPage,
  },
];

const shopRoutes: RouteObject[] = [
  {
    path: ROUTES.SHOP.ROOT,
    Component: ShopPage,
  },
  {
    path: ROUTES.SHOP.REGISTER,
    Component: ShopRegisterPage,
    handle: { hideFooter: true },
  },
  {
    path: ROUTES.SHOP.EDIT,
    Component: ShopEditPage,
    handle: { hideFooter: true },
  },
];

const profileRoutes: RouteObject[] = [
  {
    path: ROUTES.PROFILE.ROOT,
    Component: ProfilePage,
    loader: profileLoader,
  },
  {
    path: ROUTES.PROFILE.REGISTER,
    Component: ProfileRegisterPage,
    handle: { hideFooter: true },
  },
  {
    path: ROUTES.PROFILE.EDIT,
    Component: ProfileEditPage,
    handle: { hideFooter: true },
  },
];

const noticeRoutes: RouteObject[] = [
  {
    path: ROUTES.NOTICE.ROOT,
    Component: NoticeListPage,
  },
  {
    path: ROUTES.NOTICE.SEARCH,
    Component: NoticeSearchPage,
  },
  {
    path: ROUTES.NOTICE.REGISTER,
    Component: NoticeRegisterPage,
    handle: { hideFooter: true },
  },
  {
    path: ROUTES.NOTICE.EDIT,
    Component: NoticeEditPage,
    handle: { hideFooter: true },
  },
  {
    path: ROUTES.NOTICE.NOTICE_ID.EMPLOYER,
    Component: NoticeEmployerPage,
    loader: noticeEmployerLoader,
    hydrateFallbackElement: <NoticeDetailSkeleton />,
  },
  {
    path: ROUTES.NOTICE.NOTICE_ID.EMPLOYEE,
    Component: NoticeEmployeePage,
    loader: noticeEmployeeLoader,
    hydrateFallbackElement: <NoticeDetailSkeleton />,
  },
];

const appRoutes: RouteObject[] = [
  ...shopRoutes,
  ...profileRoutes,
  ...noticeRoutes,
  { path: "*", Component: NotFoundPage },
];

export const router = createBrowserRouter([
  {
    Component: AuthLayout,
    children: authRoutes,
  },
  {
    Component: MainLayout,
    children: appRoutes,
  },
]);
