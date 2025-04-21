import type {Metadata} from "next";
import prisma from "@/app/lib/prisma";
import {UnreadInquiries} from "@/app/(authenticated)/dashboard/unread";
import {Icon} from "@iconify/react";
import {InquiryForm} from "@/app/(authenticated)/dashboard/inquiry-form";


export const metadata: Metadata = {
    title: "Dashboard"
};

export default async function DashboardPage() {
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    // const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);


    const [total, thisMonth, lastMonth] = await Promise.all([
        prisma.inquiry.count(),
        prisma.inquiry.count({
            where: {createdAt: {gte: startOfThisMonth}}
        }),
        prisma.inquiry.count({
            where: {
                createdAt: {
                    gte: startOfLastMonth,
                    lt: startOfThisMonth
                }
            }
        })
    ]);


    const percentageChange =
        lastMonth === 0 ? 100 : Math.round(((thisMonth - lastMonth) / lastMonth) * 100);
    const badgeColor = percentageChange >= 0 ? "badge-success" : "badge-error";
    const arrowIcon =
        percentageChange >= 0
            ? "arrow-up"
            : "arrow-down";


    return <>
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            <div className="card bg-base-200">
                <div className="card-body gap-2">
                    <div className="flex items-start justify-between gap-2 text-sm">
                        <div>
                            <p className="font-medium">Inquiries</p>
                            <div className="mt-3 flex items-center gap-2">
                                <p className="text-2xl font-semibold">{thisMonth}</p>
                                <div
                                    className={`badge badge-soft ${badgeColor} badge-sm gap-0.5 px-1 font-medium`}
                                >

                                    <Icon icon={`lucide:${arrowIcon}`} className="bg-inherit size-3.5"/>
                                    {Math.abs(percentageChange)}%
                                </div>
                            </div>
                        </div>
                        <div className="bg-base-300 rounded-box flex items-center p-2">
                            <Icon icon="lucide:message-square-text" className="bg-inherit size-5"/>
                        </div>
                    </div>
                    <p className="text-base-content/60 text-sm">
                        vs. {lastMonth} previous month
                    </p>
                </div>
            </div>
        </div>
        <UnreadInquiries/>

        {/*<InquiryForm/>*/}
    </>;
}