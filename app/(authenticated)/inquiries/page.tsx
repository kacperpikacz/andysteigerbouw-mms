import type {Metadata} from "next";
import prisma from "@/app/lib/prisma";
import {InquiriesTable} from "@/app/(authenticated)/inquiries/inquiries-table";

export const metadata: Metadata = {
    title: "Inquiries"
};

export default async function InquiriesPage() {
    const inquiries = await prisma.inquiry.findMany({
        orderBy: {createdAt: "desc"},
    });

    return <>
        <InquiriesTable inquiries={inquiries}/>
        {/*<SeedButton/>*/}
    </>
}