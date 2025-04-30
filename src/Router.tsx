import { lazy } from "react";

import { createBrowserRouter, RouteObject } from "react-router-dom";

import { getUser } from "./apis/services/userService";
import { ROUTES } from "./constants/router";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

const SignupPage = lazy(() => import("@/pages/SignupPage"));
const SigninPage = lazy(() => import("@/pages/SigninPage"));

const ProfilePage = lazy(() => import("@/pages/ProfilePage/ProfilePage"));
const ProfileRegisterPage = lazy(() => import("@/pages/ProfileRegisterPage"));
const ProfileEditPage = lazy(() => import("@/pages/ProfileEditPage"));

const ShopPage = lazy(() => import("@/pages/ShopPage"));
const ShopRegisterPage = lazy(() => import("@/pages/ShopRegisterPage"));
const ShopEditPage = lazy(() => import("@/pages/ShopEditPage"));

const NoticeListPage = lazy(() => import("@/pages/NoticeListPage"));
const NoticeRegisterPage = lazy(() => import("@/pages/NoticeRegisterPage"));
const NoticeEditPage = lazy(() => import("@/pages/NoticeEditPage"));
const NoticeEmployerPage = lazy(() => import("@/pages/NoticeEmployerPage"));
const NoticeEmployeePage = lazy(() => import("@/pages/NoticeEmployeePage"));

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
  },
  {
    path: ROUTES.SHOP.EDIT,
    Component: ShopEditPage,
  },
];

const profileRoutes: RouteObject[] = [
  {
    path: ROUTES.PROFILE.ROOT,
    Component: ProfilePage,
    loader: async () => {
      const user = await getUser("42859259-b879-408c-8edd-bbaa3a79c674");

      if (user.status === 200) {
        return user.data.item;
      }
    },
  },
  {
    path: ROUTES.PROFILE.REGISTER,
    Component: ProfileRegisterPage,
  },
  {
    path: ROUTES.PROFILE.EDIT,
    Component: ProfileEditPage,
  },
];

const noticeRoutes: RouteObject[] = [
  {
    path: ROUTES.NOTICE.ROOT,
    Component: NoticeListPage,
  },
  {
    path: ROUTES.NOTICE.REGISTER,
    Component: NoticeRegisterPage,
  },
  {
    path: ROUTES.NOTICE.EDIT,
    Component: NoticeEditPage,
  },
  {
    path: ROUTES.NOTICE.NOTICE_ID.EMPLOYER,
    Component: NoticeEmployerPage,
  },
  {
    path: ROUTES.NOTICE.NOTICE_ID.EMPLOYEE,
    Component: NoticeEmployeePage,
  },
];

const appRoutes: RouteObject[] = [
  ...shopRoutes,
  ...profileRoutes,
  ...noticeRoutes,
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
