"use client";

import {Inquiry} from "@/generated/prisma";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {InquiryTablePagination} from "@/app/(authenticated)/inquiries/inquiries-table-pagination";

export function InquiriesTable({inquiries}: { inquiries: Inquiry[] }) {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const totalItems = inquiries.length;
    const paginated = inquiries.slice((page - 1) * pageSize, page * pageSize);

    const handlePageChange = (newPage: number) => setPage(newPage);
    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize);
        setPage(1);
    };

    return <>
        <div className="bg-base-200 rounded-box">
            <div className="overflow-x-auto ">
                <table className="table text-nowrap">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>City</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>

                    {(inquiries.length == 0) && <tr>
                        <td className="text-base-content/60">No inquiries to show</td>
                    </tr>}

                    {paginated.map((inquiry) => {
                        const fullName = inquiry.firstName + " " + inquiry.lastName;
                        const formattedDate = new Intl.DateTimeFormat("nl-NL", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        }).format(inquiry.createdAt);

                        return <tr className="hover:bg-base-300 cursor-pointer" data-readed={inquiry.isRead}
                                   key={inquiry.id}
                                   onClick={() => router.push(`/inquiries/${inquiry.id}`)}>

                            <th>#{inquiry.shortId}</th>
                            <td className="capitalize">{fullName}</td>
                            <td className="capitalize">{inquiry.city}</td>
                            <td>{formattedDate}</td>
                            <td><a role="button" className="btn btn-ghost btn-square"><span
                                className="iconify lucide--eye text-base-content/80 size-4"></span></a></td>
                        </tr>;
                    })}


                    </tbody>
                </table>
            </div>
            {inquiries.length > 0 && <InquiryTablePagination
                page={page}
                pageSize={pageSize}
                totalItems={totalItems}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />}

        </div>


    </>
}