"use client";

import {ReactNode, useEffect, useRef, useState} from "react";
import {Menu} from "@/app/(authenticated)/menu";
import Link from "next/link";
import Avatar from "boring-avatars";
import {usePathname} from "next/navigation";
import {signOut} from "next-auth/react";
import {Session} from "next-auth";
import Image from "next/image";
import letterI from "@/public/letter-i.svg";
import letterA from "@/public/letter-a.svg";
import letterK from "@/public/letter-k.svg";
import iconQuestionMark from "@/public/icon-question-mark.svg";
import {ThemeSwitcher} from "@/app/ui/theme-switcher";
import logoWhite from "@/public/logo-white.svg";
import {Icon} from "@iconify/react";

export function Drawer({children, session}: { children: ReactNode, session: Session | null }) {
    const checkboxRef = useRef<HTMLInputElement>(null);
    const [drawerOpen, setDrawerOpen] = useState(true);
    const [documentTitle, setDocumentTitle] = useState<string>("");
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean)
    const createBreadcrumbName = (segment: string) =>
        segment
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase())
    useEffect(() => {
        setDocumentTitle(document.title);
    }, [pathname]);

    const handleNavigate = () => {
        if (checkboxRef.current) checkboxRef.current.checked = false;
    };



    return <div className={`drawer ${drawerOpen ? "lg:drawer-open" : ""}`}>
        <input id="layout-sidebar-toggle-trigger" type="checkbox" className="drawer-toggle" ref={checkboxRef}/>

        <div className="drawer-content">
            <div
                className="sticky top-0 z-30 flex h-16 w-full [transform:translate3d(0,0,0)] justify-center backdrop-blur transition-shadow duration-100 print:hidden">
                <nav className="navbar w-full bg-base-200 justify-between border-b border-base-300">
                    <div className="flex">
                        <label className="btn btn-square btn-ghost btn-sm" aria-label="Leftmenu toggle"
                               htmlFor="layout-sidebar-toggle-trigger" onClick={(e) => {
                            const isLg = window.matchMedia("(min-width: 64rem)").matches;

                            if (isLg) {
                                e.preventDefault();
                                if (checkboxRef.current) checkboxRef.current.checked = false;
                                setDrawerOpen(!drawerOpen);
                            }


                        }}>

                            <Icon icon="lucide:menu" className="size-5"/>
                        </label>

                    </div>
                    <Link href="/" className="lg:hidden h-full hover:opacity-75 transition-opacity"><Image
                        priority={true} src={logoWhite} alt="logo" className="w-auto h-full"/></Link>
                    <div className="flex"><ThemeSwitcher /></div>
                </nav>
            </div>
            <div className="relative max-w-[100vw] bg-base-100 px-6 py-6">
                <div className="flex flex-col lg:flex-row justify-between">
                    <h1 className="font-medium text-lg">{documentTitle}</h1>
                    <div className="hidden lg:flex breadcrumbs p-0 text-sm items-center opacity-50">
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            {segments.map((segment, idx) => {
                                const href = '/' + segments.slice(0, idx + 1).join('/')
                                const isLast = idx === segments.length - 1

                                return (
                                    <li key={href}>
                                        {isLast ? (
                                            <>{createBreadcrumbName(segment)}</>
                                        ) : (
                                            <Link href={href}>{createBreadcrumbName(segment)}</Link>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="pt-6">
                    {children}
                </div>

            </div>
        </div>
        <div className="drawer-side lg:border-r border-base-300 z-40">
            <label className="drawer-overlay" onClick={() => {
                if (checkboxRef.current) checkboxRef.current.checked = false;
            }}/>
            <aside className="h-full bg-base-200 w-[256px]">
                <div className="navbar border-b h-16 justify-center border-base-300 hidden lg:flex p-2">
                    <Link href="/" className="h-full hover:opacity-75 transition-opacity"> <Image src={logoWhite}
                                                                                                  alt="logo"
                                                                                                  priority={true}
                                                                                                  className="h-full w-auto"/></Link>

                </div>
                <div className="flex">
                    <Menu ref={checkboxRef}/>
                </div>

                <div className="dropdown dropdown-top dropdown-end w-full bottom-0 absolute border-t border-base-300">
                    <div tabIndex={0} role="button"
                         className="bg-base-300 hover:bg-base-300/50 flex cursor-pointer items-center gap-2.5 px-3 py-2 transition-all">
                        <div className="avatar ">
                            <div className="w-10 dark:bg-black flex items-center justify-center bg-white ">
                                <div className="flex items-center justify-center h-full w-full">
                                    <Avatar name={session?.user?.email ?? "unknown"} square variant="beam" className="dark:invert-100" colors={["#191919","#fafafa"]} />

                                </div>

                            </div>
                        </div>
                        <div className="grow -space-y-0.5 overflow-ellipsis whitespace-nowrap overflow-hidden" ><p className="text-sm font-medium ">{session?.user?.name}</p>
                            <p
                                className="text-base-content/60 text-xs">@{getFirstName(session?.user?.name)?.toLowerCase()}</p>
                        </div>

                        <Icon icon="lucide:chevrons-up-down" className="size-4 text-base-content/60"/></div>
                    <ul role="menu" tabIndex={0}
                        className="dropdown-content menu bg-base-100 shadow-base-content/4 mb-1 w-48 p-1 shadow-[0px_-10px_40px_0px]">
                        <li><Link href="/profile" onClick={handleNavigate} data-discover="true">
                            <Icon icon="lucide:user" className="size-4"/>
                            <span>My profile</span></Link></li>
                        <li>
                            <div onClick={() => signOut()}>
                                <Icon icon="lucide:arrow-left-right" className="size-4"/>
                                <span>Sign out</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>

        </div>
    </div>
}

function getFirstName(fullName: string | null | undefined) {
    if (!fullName) return fullName;

    const values = fullName.split(" ");
    if (values.length > 0) return values[0];

    return fullName;
}

function getLetter(email: string | null | undefined) {

    if (email?.charAt(0) === "i") return letterI;
    if (email?.charAt(0) === "a") return letterA;
    if (email?.charAt(0) === "k") return letterK;
    return iconQuestionMark;
}