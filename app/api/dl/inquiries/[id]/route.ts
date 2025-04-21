import {NextRequest, NextResponse} from "next/server";
import path from "path";
import fs from "fs/promises";
import prisma from "@/app/lib/prisma";
import JSZip from "jszip";

const DATA_DIR = path.join(process.cwd(), "data");

export async function GET(request: NextRequest,
                          {params}: { params: Promise<{ id: string }> }
) {

    try {
        const {id} = await params;

        const attachments = await prisma.attachment.findMany({where: {inquiryId: id}});

        if (!attachments || attachments.length === 0) {
            throw new Error("No attachments found");
        }


        const zip = new JSZip();

        for (const attachment of attachments) {
            const filePath = path.join(DATA_DIR, attachment.filePath);

            try {
                const fileBuffer = await fs.readFile(filePath);
                zip.file(attachment.fileName, fileBuffer);
            } catch (err) {
                console.warn(`Could not read file ${attachment.filePath}:`, err);
            }
        }

        const zipBuffer = await zip.generateAsync({type: "nodebuffer"});

        return new NextResponse(zipBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/zip",
                "Content-Disposition": `attachment; filename="attachments-${id}.zip"`,
            },
        });
    } catch (error) {
        return NextResponse.json(
            {success: false, error: "Could not generate ZIP"},
            {status: 500}
        );
    }
}