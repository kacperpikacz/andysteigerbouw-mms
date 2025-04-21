"use server";

import prisma, {getInquiryShortId} from "@/app/lib/prisma";
import {promises as fs} from "fs";
import {Inquiry} from "@/generated/prisma";

export async function getInquiries() {
    try {
        const inquiries = await prisma.inquiry.findMany({});

        return inquiries;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to get inquiries");
    }
}

export async function post(formData: FormData) {
    const example = {
        firstName: "Emma",
        lastName: "Clark",
        phone: "+1 202-555-0143",
        email: "emma.clark@example.com",
        street: "122 Maple Lane",
        postcode: "94109",
        city: "San Francisco",
        realisation: "asSoonAsPossible",
        description: "Looking to renovate my kitchen as soon as possible."
    };

    for (const [key, value] of Object.entries(example)) {
        formData.append(key, value);
    }

    var response = await fetch("http://localhost:3000/api/inquiries", {method: "POST", body: formData});
    var json = await response.json();
    var l = "a";
}

export async function seedInquiries() {
    console.log("Seeding inquiries from prisma");
    try {
        const file = await fs.readFile(process.cwd() + "/data.json", 'utf8');

        const inquiries: Inquiry[] = JSON.parse(file);

        for (const inquiry of inquiries) {

            // @ts-ignore

            inquiry.shortId = await getInquiryShortId();
            await prisma.inquiry.create({data: inquiry});
        }
    } catch (error) {
        console.log(error);
    }


}