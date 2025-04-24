import type {Metadata} from "next";
import {auth} from "@/auth";


export const metadata: Metadata = {
    title: "Profile"
};

export default async function ProfilePage() {
    const session = await auth();

    return <div className="card card-border rounded-none bg-base-200">
        <div className="card-body">
            <pre className="overflow-auto">{JSON.stringify(session, null, 2)}</pre>

        </div>
    </div>;
}