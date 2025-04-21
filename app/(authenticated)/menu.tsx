import Link from "next/link";
import {RefObject} from "react";
import {usePathname} from "next/navigation";
import clsx from "clsx";
import {Icon} from "@iconify/react";

export function Menu({ref}: { ref: RefObject<HTMLInputElement | null> }) {
    const pathname = usePathname();

    const menu = [
        {label: "Dashboard", href: "/dashboard", icon: "layout-grid"},
        {label: "Inquiries", href: "/inquiries", icon: "message-square-text"},
    ];

    const handleNavigate = () => {
        if (ref.current) ref.current.checked = false;
    };

    return (
        <ul className="menu w-full [&_li>*]:rounded-none [&_li>*]:h-16 [&_li>*]:flex [&_li>*]:items-center [&_li>*]:lg:h-12 p-0">
            {menu.map((item) => (
                <li key={item.href}>
                    <Link
                        href={item.href}
                        onClick={handleNavigate}
                        className={clsx("flex items-center", {"menu-active": pathname.includes(item.href)})}
                    >
                        <Icon icon={`lucide:${item.icon}`} className="bg-inherit size-4"/>
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
}