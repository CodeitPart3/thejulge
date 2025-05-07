export const ROUTES = {
  AUTH: {
    SIGNUP: "/signup",
    SIGNIN: "/signin",
  },
  SHOP: {
    ROOT: "/shop",
    REGISTER: "/shop/register",
    EDIT: "/shop/edit",
  },
  PROFILE: {
    ROOT: "/profile",
    REGISTER: "/profile/register",
    EDIT: "/profile/edit",
  },
  NOTICE: {
    ROOT: "/",
    REGISTER: "/notice/register",
    EDIT: "/notice/edit/:noticeId",
    NOTICE_ID: {
      EMPLOYER: `/notice/:shopId/:noticeId/employer`,
      EMPLOYEE: `/notice/:shopId/:noticeId/employee`,
    },
    SEARCH: "/search",
  },
  notFound: "*",
} as const;

export const loginProtectCondition = (isLoggedIn: boolean) =>
  ({
    isPass: isLoggedIn,
    redirectPath: ROUTES.AUTH.SIGNIN,
    message: "로그인 후에 이용 가능한 기능입니다.",
  }) as const;
