"use client";

import {seedInquiries} from "@/app/actions";

export function SeedButton() {
    return <button className="btn" onClick={() => seedInquiries()}>Seed</button>
}