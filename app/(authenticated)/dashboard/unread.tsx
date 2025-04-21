import Link from "next/link";
import prisma from "@/app/lib/prisma";
import {Icon} from "@iconify/react";

export async function UnreadInquiries() {
    const [unreadInquiries] = await Promise.all([prisma.inquiry.findMany({
        where: {isRead: false},
        orderBy: {createdAt: 'desc'},
        take: 5,
    })]);

    return (<div className="mt-6">
        <div className="card bg-base-200">
            <div className="card-body">
                <div className="flex gap-2">
                    <p
                        className="grow font-medium">Unread</p>
                    <div className="bg-base-300 rounded-box flex items-center p-2">
                        <Icon icon="lucide:message-square-warning" className="size-5"/>
                    </div>

                </div>
                <div className="-ml-2">
                    {unreadInquiries.map((inquiry) => (
                        <Link href={`/inquiries/${inquiry.id}`} key={inquiry.id}
                              className="flex rounded items-center gap-3 transition-colors hover:bg-base-300 p-2">
                            <div className="bg-base-300 size-10 rounded flex items-center justify-center">
                                <Icon icon="lucide:user" className="bg-inherit size-4"/>
                            </div>
                            <div className="grow">
                                <p className="leading-none font-medium">
                                    {inquiry.firstName} {inquiry.lastName}
                                </p>
                                <p className="text-base-content/80 line-clamp-1 text-sm">
                                    {inquiry.description || "No description"}
                                </p>
                            </div>
                        </Link>
                    ))}

                    {unreadInquiries.length === 0 && (
                        <p className="text-base-content/60 ml-2">No unread inquiries</p>
                    )}
                </div>
            </div>
            {unreadInquiries.length > 0 && (<div className="flex gap-2 px-4 pb-4">
                <Link href="/inquiries" className="btn btn-neutral btn-sm">View all</Link>
            </div>)}


        </div>
    </div>);
}