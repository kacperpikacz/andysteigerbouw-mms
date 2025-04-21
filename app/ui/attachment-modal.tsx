import {Attachment} from "@/generated/prisma";
import Image from "next/image";

export function AttachmentModal({attachment}: { attachment: Attachment }) {
    return <dialog id={attachment.id} className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">{attachment.fileName}</h3>
            <Image src={`/api/dl/attachments/${attachment.id}`} alt="" width={512} height={512}/>
            <div className="modal-action">
                <form method="dialog">


                    <button className="btn">Close</button>
                </form>
            </div>
        </div>
    </dialog>
}