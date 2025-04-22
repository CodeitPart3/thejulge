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
      EMPLOYER: `/notice/:noticeId/employer`,
      EMPLOYEE: `/notice/:noticeId/employee`,
    },
  },
} as const;

export { ROUTES };
