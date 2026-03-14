import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const role = token?.role as string | undefined;

    if (path.startsWith("/dashboard") && role !== "INFLUENCER" && role !== "ADMIN") {
      if (role === "SELLER") return Response.redirect(new URL("/seller/dashboard", req.url));
      if (role === "COMPANY") return Response.redirect(new URL("/company/dashboard", req.url));
      return Response.redirect(new URL("/login?callbackUrl=" + encodeURIComponent(path), req.url));
    }
    if (path.startsWith("/seller") && role !== "SELLER" && role !== "ADMIN") {
      if (role === "INFLUENCER") return Response.redirect(new URL("/dashboard", req.url));
      if (role === "COMPANY") return Response.redirect(new URL("/company/dashboard", req.url));
      return Response.redirect(new URL("/login?callbackUrl=" + encodeURIComponent(path), req.url));
    }
    if (path.startsWith("/company") && role !== "COMPANY" && role !== "ADMIN") {
      if (role === "INFLUENCER") return Response.redirect(new URL("/dashboard", req.url));
      if (role === "SELLER") return Response.redirect(new URL("/seller/dashboard", req.url));
      return Response.redirect(new URL("/login?callbackUrl=" + encodeURIComponent(path), req.url));
    }
    if (path.startsWith("/admin") && role !== "ADMIN") {
      return Response.redirect(new URL(role === "SELLER" ? "/seller/dashboard" : role === "COMPANY" ? "/company/dashboard" : "/dashboard", req.url));
    }
    return undefined;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        if (path.startsWith("/dashboard") || path.startsWith("/seller") || path.startsWith("/company") || path.startsWith("/admin")) {
          return !!token;
        }
        return true;
      },
    },
    pages: { signIn: "/login" },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/seller/:path*", "/company/:path*", "/admin/:path*"],
};
