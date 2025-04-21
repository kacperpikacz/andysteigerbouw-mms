import {NextRequest, NextResponse} from "next/server";
import path from "path";
import fs from "fs/promises";
import mime from "mime";
import prisma from "@/app/lib/prisma";

const DATA_DIR = path.join(process.cwd(), "data");

export async function GET(request: NextRequest,
                          {params}: { params: Promise<{ id: string }> }
) {

    try {
        const {id} = await params;

        const attachment = await prisma.attachment.findUnique({where: {id}});

        if (!attachment) throw new Error();

        const filePath = path.join(DATA_DIR, attachment.filePath);

        const fileBuffer = await fs.readFile(filePath);
        const mimeType = mime.getType(filePath) || "application/octet-stream";

        const shouldDownload = request.nextUrl.searchParams.get("dl") === "1";

        return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                "Content-Type": mimeType,
                "Content-Disposition": `${shouldDownload ? "attachment" : "inline"}; filename="${attachment.fileName}"`,
            },
        });
    } catch (error) {
        console.error("Download error:", error);
        return NextResponse.json(
            {success: false, error: "File not found"},
            {status: 404}
        );
    }
}