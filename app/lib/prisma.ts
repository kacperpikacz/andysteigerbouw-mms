import {PrismaClient} from "@/generated/prisma";


const prisma = new PrismaClient();

const globalForPrisma = global as unknown as { prisma: typeof prisma };

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function getInquiryShortId(): Promise<string> {
    // Fetch the current counter or create it with default "000000"
    const counter = await prisma.counter.upsert({
        where: {name: "inquiry_short_id"},
        update: {}, // We update it manually afterward
        create: {name: "inquiry_short_id", value: "00000"},
    });

    // Convert current value to number and increment
    const currentValue = parseInt(counter.value, 10);
    const nextValue = currentValue + 1;
    const padded = nextValue.toString().padStart(6, "0");

    // Now update the counter with the new padded string value
    await prisma.counter.update({
        where: {name: "inquiry_short_id"},
        data: {value: padded},
    });

    return padded;
}

export default prisma;

