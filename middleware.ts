import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // publicRoutes: ["/dashboard"],
  // ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/dashboard"],
  // async afterAuth(auth, res, evt) {
  //   console.log(auth, res, evt);
  // }
});

export const config = {
  matcher: ["/"],
};