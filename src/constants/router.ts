const ROUTES = {
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
    EDIT: "/notice/edit",
    NOTICE_ID: {
      EMPLOYER: `/notice/:shopId/:noticeId/employer`,
      EMPLOYEE: `/notice/:shopId/:noticeId/employee`,
    },
  },
} as const;

export { ROUTES };
