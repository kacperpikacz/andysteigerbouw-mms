import path from "path";
import {mkdir, writeFile} from "fs/promises";
import prisma, {getInquiryShortId} from "@/app/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import {randomUUID} from "crypto";
import {InquiryCreateInputSchema} from "@/prisma/generated/zod";

const UPLOAD_DIR = path.join(process.cwd(), "data", "uploads");
const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
    "application/pdf", // PDF
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
    "application/msword", // DOC
    "image/jpeg", // JPEG
    "image/png", // PNG
    "image/gif", // GIF
    "image/webp", // WebP
    "text/csv", // CSV
];


export async function POST(request: NextRequest) {
    const form = await request.formData();
    const attachments = form.getAll("attachments") as File[];

    const token = form.get("cf-turnstile-response");
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

    if (!token || !ip) return NextResponse.json({success: false});

    const formData = new FormData();
    formData.append("secret", process.env.TURNSTILE_SECRET_KEY!);
    formData.append("response", token);
    formData.append("remoteip", ip);

    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const result = await fetch(url, {
        body: formData,
        method: "POST",
    });

    const outcome = await result.json();

    if (!outcome.success) return NextResponse.json({success: false, message: "Failed verification"});

    for (const file of attachments) {
        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
            return NextResponse.json({success: false, error: `Invalid file type: ${file.name}`}, {status: 400});
        }
    }

    const totalSize = attachments.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > MAX_TOTAL_SIZE) return NextResponse.json({
        success: false,
        error: "File size exceeds 10MB"
    }, {status: 400});

    const fields = Object.fromEntries(form.entries());

    delete fields["cf-turnstile-response"]
    delete fields["attachments"];

    const validated = InquiryCreateInputSchema.safeParse(fields);
    if (!validated.success) {
        return NextResponse.json(
            { success: false, error: validated.error.flatten() },
            { status: 400 }
        );
    }


    await ensureUploadDir();

    const savedAttachments = await Promise.all(
        attachments.map(async (file) => {
            const buffer = Buffer.from(await file.arrayBuffer());
            const fileName = file.name;
            const randomFileName = `${randomUUID()}.${extension(fileName)}`;
            const filePath = path.join(UPLOAD_DIR, randomFileName);


            await writeFile(filePath, buffer);

            return {
                fileName,
                filePath: `/uploads/${randomFileName}`,
                size: file.size,
                mimeType: file.type,
            };
        })
    );

    await prisma.inquiry.create({
        data: {
            firstName: fields.firstName as string,
            lastName: fields.lastName as string,
            email: fields.email as string,
            phone: fields.phone as string,
            street: fields.street as string,
            postcode: fields.postcode as string,
            city: fields.city as string,
            realisation: fields.realisation as string,
            description: fields.description as string,
            shortId: await getInquiryShortId(),
            attachments: {
                create: savedAttachments,
            },
        },
    });

    return NextResponse.json({success: true});

}

async function ensureUploadDir() {
    await mkdir(UPLOAD_DIR, {recursive: true});
}

function extension(filename: string) {
    const dotIndex = filename.lastIndexOf('.');
    return dotIndex !== -1 ? filename.slice(dotIndex + 1).toLowerCase() : '';
}