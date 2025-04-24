"use client";

import {useTheme} from "next-themes";
import {Icon} from "@iconify/react";
import {useEffect, useState} from "react";

export function ThemeSwitcher() {
        const {setTheme, theme} = useTheme();

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

        return <div className="dropdown dropdown-end">
            <div tabIndex={0}  role="button" className="btn btn-square btn-outline border-base-300"
                 aria-label="Theme toggle">
                {theme === "light" && <Icon icon="lucide:sun" className="size-4 inline"/>}
                {theme === "black" &&  <Icon icon="lucide:moon" className="size-4 inline"/>}
                {theme === "system" && <Icon  icon="lucide:monitor" className="size-4 inline "/>}
        </div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-36 space-y-0.5 p-1 shadow-sm ">
            <li onClick={() => setTheme("light")}>
                <div className="group-data-[theme=light]/html:bg-base-200 flex gap-2">
                    <Icon icon="lucide:sun" className="size-4.5"/>
                    <span className="font-medium">Light</span>
                </div>
            </li>
            <li onClick={() => setTheme("black")}>
                <div className="group-data-[theme=black]/html:bg-base-200 flex gap-2">
                    <Icon icon="lucide:moon" className="size-4.5 bg-inherit"/>
                    <span className="font-medium">Dark</span></div>
            </li>
            <li onClick={() => setTheme("system")}>
                <div className="group-[:not([data-theme])]/html:bg-base-200 flex gap-2">
                    <Icon icon="lucide:monitor" className="size-4.5 bg-inherit"/>
                    <span className="font-medium">System</span>
                </div>
            </li>
        </ul>

    </div>
}