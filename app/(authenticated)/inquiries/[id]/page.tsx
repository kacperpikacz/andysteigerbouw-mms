import prisma from "@/app/lib/prisma";
import {format} from "date-fns";
import type {Metadata} from "next";
import {AttachmentsTable} from "@/app/(authenticated)/inquiries/[id]/attachments-table";
import {Icon} from "@iconify/react";

export const metadata: Metadata = {
    title: "Inquiry Detail"
};

export default async function InquiryPage({
                                              params,
                                          }: {
    params: Promise<{ id: string }>
}) {
    const {id} = await params;

    await prisma.inquiry.updateMany({
        where: {
            id,
            isRead: false // only update if unread
        },
        data: {
            isRead: true
        }
    });
    const inquiry = await prisma.inquiry.findUnique({where: {id: id}, include: {attachments: true}});

    if (!inquiry) {
        return <>Not found</>
    }


    const fullName = `${inquiry.firstName} ${inquiry.lastName}`;
    const fullAddress = `${inquiry.street}, ${inquiry.postcode} ${inquiry.city}`;

    return <div className="flex gap-6 flex-col">
        <div className="card card-border bg-base-200">
            <div className="card-body ">
                <div className="">
                    <div className="flex justify-between">
                        <div className="space-x-2"><span className="text-2xl font-medium">#{inquiry.shortId}</span><span
                            className="text-base-content/70 hidden text-sm sm:inline">{format(inquiry.createdAt, "dd MMM yyyy 'at' hh:mm a")}</span>
                        </div>
                        <button className="btn btn-sm btn-error" disabled>
                            <Icon icon="lucide:trash-2" className="size-4"/>
                            <span className="hidden sm:inline">Delete</span>
                        </button>
                    </div>
                    <div className="mt-5 overflow-auto">
                        <div className="lg:flex grow gap-6">
                            <div>
                                <fieldset className="fieldset">
                                    <label className="fieldset-label">Full name</label>
                                    <input type="text" className="input min-w-sm capitalize" defaultValue={fullName}
                                           disabled={true}/>
                                    <label className="fieldset-label">Address</label>
                                    <input type="text" className="input min-w-sm capitalize" defaultValue={fullAddress}
                                           disabled={true}/>

                                </fieldset>
                            </div>
                            <div>
                                <fieldset className="fieldset">
                                    <label className="fieldset-label">Phone</label>
                                    <input type="text" className="input min-w-sm" defaultValue={inquiry.phone}
                                           disabled={true}/>
                                    <label className="fieldset-label">Email</label>
                                    <input type="text" className="input min-w-sm" defaultValue={inquiry.email}
                                           disabled={true}/>
                                </fieldset>
                            </div>
                        </div>
                        <fieldset className="fieldset">
                            <label className="fieldset-label">Realisation</label>
                            <input type="text" className="input min-w-sm" defaultValue={inquiry.realisation}
                                   disabled={true}/>
                            <label className="fieldset-label">Description</label>
                            <textarea className="textarea min-w-sm" defaultValue={inquiry.description} disabled={true}/>
                        </fieldset>

                    </div>
                </div>

            </div>
        </div>
        <div className="gap-3 flex flex-col">
            <h3 className="font-medium">Attachments</h3>
            <AttachmentsTable attachments={inquiry.attachments}/></div>

    </div>;
}