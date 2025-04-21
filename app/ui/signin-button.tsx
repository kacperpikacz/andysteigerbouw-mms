"use client";

import Image from "next/image";
import microsoftIcon from "@/public/microsoft.svg";
import {signIn} from "next-auth/react";

export function SigninButton() {
    return <button onClick={() => signIn("microsoft-entra-id")}
                   className="btn btn-ghost btn-wide border-base-300 max-w-full gap-3"><Image
        className="size-5" alt="microsoft" src={microsoftIcon}/>Login with Microsoft
    </button>;
}