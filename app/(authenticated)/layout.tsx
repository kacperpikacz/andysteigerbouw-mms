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
        <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
    </>);
}