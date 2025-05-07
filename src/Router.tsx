import { lazy } from "react";

import { createBrowserRouter, RouteObject } from "react-router-dom";

import noticeEmployeeLoader from "./pages/NoticeEmployeePage/loader/noticeEmployeeLoader";
import noticeEmployerLoader from "./pages/NoticeEmployerPage/loader/noticeEmployerLoader";
import profileLoader from "./pages/ProfilePage/loader/profileLoader";

import NoticeDetailSkeleton from "./components/NoticeDetailSkeleton";
import PageErrorElement from "./components/PageErrorElement";
import ProtectedRoute from "./components/ProtectedRoute";
import { loginProtectCondition } from "./constants/router";
import { ROUTES } from "./constants/router";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

const SignupPage = lazy(() => import("@/pages/AuthPage/SignupPage"));
const SigninPage = lazy(() => import("@/pages/AuthPage/SigninPage"));

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
    element: <SignupPage />,
  },
  {
    path: ROUTES.AUTH.SIGNIN,
    element: <SigninPage />,
  },
];

const shopRoutes: RouteObject[] = [
  {
    path: ROUTES.SHOP.ROOT,
    element: <ShopPage />,
  },
  {
    path: ROUTES.SHOP.REGISTER,
    element: <ShopRegisterPage />,
    handle: { hideFooter: true },
  },
  {
    path: ROUTES.SHOP.EDIT,
    element: <ShopEditPage />,
    handle: { hideFooter: true },
  },
];

const profileRoutes: RouteObject[] = [
  {
    path: ROUTES.PROFILE.ROOT,
    element: (
      <ProtectedRoute
        conditions={({ isLoggedIn, user }) => [
          loginProtectCondition(isLoggedIn),
          {
            isPass: user?.type === "employee",
            redirectPath: ROUTES.SHOP.ROOT,
            message: "알바생 계정으로만 이용 가능한 기능입니다.",
          },
        ]}
      >
        <ProfilePage />
      </ProtectedRoute>
    ),
    loader: profileLoader,
  },
  {
    path: ROUTES.PROFILE.REGISTER,
    element: <ProfileRegisterPage />,
    handle: { hideFooter: true },
  },
  {
    path: ROUTES.PROFILE.EDIT,
    element: <ProfileEditPage />,
    handle: { hideFooter: true },
  },
];

const noticeRoutes: RouteObject[] = [
  {
    path: ROUTES.NOTICE.ROOT,
    element: <NoticeListPage />,
  },
  {
    path: ROUTES.NOTICE.SEARCH,
    element: <NoticeSearchPage />,
  },
  {
    path: ROUTES.NOTICE.REGISTER,
    element: <NoticeRegisterPage />,
    handle: { hideFooter: true },
  },
  {
    path: ROUTES.NOTICE.EDIT,
    element: <NoticeEditPage />,
    handle: { hideFooter: true },
  },
  {
    path: ROUTES.NOTICE.NOTICE_ID.EMPLOYER,
    element: (
      <ProtectedRoute
        conditions={({ isLoggedIn, user }) => [
          loginProtectCondition(isLoggedIn),
          {
            isPass: user?.type === "employer",
            redirectPath: ROUTES.PROFILE.ROOT,
            message: "사장님 계정으로만 이용 가능한 기능입니다.",
          },
        ]}
      >
        <NoticeEmployerPage />
      </ProtectedRoute>
    ),
    loader: noticeEmployerLoader,
    hydrateFallbackElement: <NoticeDetailSkeleton />,
  },
  {
    path: ROUTES.NOTICE.NOTICE_ID.EMPLOYEE,
    element: (
      <ProtectedRoute
        conditions={({ isLoggedIn, user }) => [
          loginProtectCondition(isLoggedIn),
          {
            isPass: user?.type === "employee",
            redirectPath: ROUTES.SHOP.ROOT,
            message: "알바생 계정으로만 이용 가능한 기능입니다.",
          },
        ]}
      >
        <NoticeEmployeePage />
      </ProtectedRoute>
    ),
    loader: noticeEmployeeLoader,
    hydrateFallbackElement: <NoticeDetailSkeleton />,
  },
];

const appRoutes: RouteObject[] = [
  ...shopRoutes,
  ...profileRoutes,
  ...noticeRoutes,
  { path: "*", element: <NotFoundPage /> },
];

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        children: authRoutes,
        errorElement: <PageErrorElement />,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        children: appRoutes,
        errorElement: <PageErrorElement />,
      },
    ],
  },
]);
