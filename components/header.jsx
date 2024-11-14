import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import { SignedOut, UserButton, SignedIn, SignInButton } from "@clerk/nextjs";
import Usermenu from "./user-menu";
import { checkUser } from "../lib/checkUser";

const Header = async () => {
    await checkUser();
    return (
        <nav className="mx-auto py-2 px-4 flex justify-between items-center shadow-md border-b-2 ">
            <Link href={'/'} className="flex items-center">
                <Image
                    src="/logo.png"
                    width="150"
                    height="60"
                    alt="Schedulrr Logo"
                    className="h-16 w-auto"
                />
            </Link>

            <div className="flex items-center gap-4">
                <Link href={'/events?create=true'}>
                    <Button className="flex items-center gap-2">
                        <PenBox size={18} />
                        Create Event</Button>
                </Link>
                
                {/*SignedOut is a component from Clerk that only shows its children if the user is signed out*/}
                <SignedOut>
                    {/*SignInButton is a component from Clerk that shows a button that opens the Clerk sign in modal
                    forceRedirectUrl is a prop that tells Clerk where to redirect the user after they sign in 
                    in this case, we want to redirect the user to the dashboard*/}
                    <SignInButton forceRedirectUrl="/dashboard">
                        <Button variant="outline">Login</Button>
                    </SignInButton>
                </SignedOut>

                {/* SignedIn is a component from Clerk that only shows its children if the user is signed in */}
                <SignedIn>
                    <Usermenu />
                </SignedIn>

            </div>
        </nav>
    )
}
export default Header;
