import {Drawer} from "@/app/(authenticated)/drawer";
import {ReactNode} from "react";
import {auth} from "@/auth";

export default async function AuthenticatedLayout({
                                                      children,
                                                  }: Readonly<{
    children: ReactNode;
}>) {

    const session = await auth();

    return (<>
        <Drawer session={session}>{children}</Drawer>

    </>);
}