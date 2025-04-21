import {signOut} from "@/auth";

export async function SignOutButton() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut({redirectTo: "/signin"})
            }}
        >
            <button type="submit">Sign Out</button>
        </form>
    )
}