import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

//routes in the array below are protected
//(.*) is a regex that matches any character
//that mwans any route that starts with /dashboard and all other array elemets will be protected
const isProtectedRoute=createRouteMatcher([
    './dashboard(.*)',
    './events(.*)',
    './meetings(.*)',
    './availability(.*)',
])

//middleware function
//auth is a function that returns the clerk object  
//req is the request object
//if the user is not authenticated and the route is protected, redirect to the sign in page
export default clerkMiddleware((auth,req) => {
    if(!auth().userId && isProtectedRoute(req)){
        return auth().redirectToSignIn();
    }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};