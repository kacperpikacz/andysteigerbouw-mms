import {auth} from "@/auth";
import Image from "next/image";
import logoWhite from "@/public/logo-white.svg";
import {ThemeSwitcher} from "@/app/ui/theme-switcher";
import liveImage from "@/public/live-image.jpg";
import {SigninButton} from "@/app/ui/signin-button";


export default async function SignInPage() {
    const session = await auth();

    return <>
        <div className="flex grow items-center h-full lg:flex-row">
            <div className="lg:w-96 grow flex flex-col lg:shrink-0 lg:grow-0 bg-base-200 basis-1/4 h-full lg:p-16 p-6">
                <div className="flex justify-between items-center">
                    <Image src={logoWhite} alt="andysteigerbouw" width={128} priority={false}/>
                    <ThemeSwitcher/>
                </div>
                <div className="flex items-center grow">
                    <SigninButton/>
                </div>

            </div>
            <div className="lg:flex grow hidden h-full overflow-clip relative">

                <Image src={liveImage} alt="live image" className="object-cover live-image"/>
                <label
                    className="content-[''] absolute inset-0 bg-gradient-to-r from-base-200/99 via-base-200/85 via-75% to-base-200/75 "></label>
                <div className="absolute p-16 flex items-end justify-end inset-0 dark:opacity-50 text-sm"><span>Powered by <a
                    href="https://asperdynamics.com" className="link ">Asper Dynamics</a></span></div>

            </div>
        </div>
    </>
}