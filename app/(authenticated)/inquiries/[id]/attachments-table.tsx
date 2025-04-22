"use client";

import {Attachment} from "@/generated/prisma";
import {useRouter} from "next/navigation";
import {filesize} from "filesize";
import {AttachmentModal} from "@/app/ui/attachment-modal";
import {Icon} from "@iconify/react";

export function AttachmentsTable({attachments}: { attachments: Attachment[] }) {
    const router = useRouter();

    return <>
        <div className="overflow-x-auto bg-base-200 rounded-box">
            <table className="table text-nowrap">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Mime type</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>

                {(attachments.length == 0) && <tr>
                    <td className="opacity-50 text-nowrap">This inquiry contains no attachments</td>
                </tr>}

                {attachments.map((attachment) => {
                    const previewEnabled = attachment.mimeType.includes("image");

                    return <tr className="hover:bg-base-300 cursor-pointer" key={attachment.id}
                    >
                        <td className="flex items-center gap-3">
                            <div className="bg-base-300 text-base-content/80 rounded-box flex items-center p-1.5"><span
                                className={`iconify size-5 ${mimeTypeIcon(attachment.mimeType)}`}></span></div>
                            <div>{attachment.fileName}</div>
                        </td>
                        <td>{filesize(attachment.size)}</td>
                        <td>{attachment.mimeType}</td>
                        <td>
                            <a href={`/api/dl/attachments/${attachment.id}?dl=0`} role="button"
                               title="Preview in browser"
                               className="btn btn-ghost btn-square">
                                <Icon icon="lucide:app-window" className="size-4 text-base-content/80"/>

                            </a>
                            {previewEnabled && <>
                                <button
                                    onClick={() => (document.getElementById(attachment.id) as HTMLDialogElement).showModal()}
                                    className="btn btn-ghost btn-square" title="Preview in modal">
                                    <Icon icon="lucide:eye" className="size-4 text-base-content/80"/>


                                </button>
                                <AttachmentModal attachment={attachment}/></>}


                            <a href={`/api/dl/attachments/${attachment.id}?dl=1`} role="button" title="Download"
                               className="btn btn-ghost btn-square">
                                <Icon icon="lucide:arrow-big-down" className="size-4 text-base-content/80"/>

                            </a>
                        </td>

                    </tr>;
                })}
                </tbody>
            </table>

        </div>
        {(attachments && attachments.length > 0) && (<div className="py-3">
            <a className="btn btn-sm btn-neutral" href={`/api/dl/inquiries/${attachments.at(0)!.inquiryId}`}
               role="button">
                <Icon icon="lucide:download" className="size-4"/>

                <span>Download all</span>
            </a>
        </div>)}
    </>
}

function mimeTypeIcon(mimeType: string) {
    const defaultIcon = "lucide--file-text";

    if (mimeType.includes("image")) return "lucide--file-image";

    return defaultIcon;
}