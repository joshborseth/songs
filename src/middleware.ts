import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  apiRoutes: ["/api/migrate-songs-to-users"],
  publicRoutes: ["/api/migrate-songs-to-users"],
});
export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
