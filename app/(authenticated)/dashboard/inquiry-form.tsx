"use client";

import {FormEvent, useState} from "react";
import {Turnstile} from "@marsidev/react-turnstile";

export function InquiryForm() {
    const [errors, setErrors] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [turnstileStatus, setTurnstileStatus] = useState("required");
    const [error, setError] = useState(null);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()


        setErrors(null);
        setSuccess(false);

        const form = event.currentTarget;

        const formData = new FormData(event.currentTarget)
        const response = await fetch('/api/inquiries', {
            method: 'POST',
            body: formData,
        })

        // Handle response if necessary
        const data = await response.json()


        setSuccess(data.success);
        setErrors(data.error);
        form.reset();
    }

    return (<div>
        <form onSubmit={onSubmit}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Page details</legend>

                <label className="label">First name</label>
                <input type="text" className="input" name="firstName"/>

                <label className="label">Last name</label>
                <input type="text" className="input" name="lastName"/>

                <label className="label">Email</label>
                <input type="text" className="input" name="email"/>

                <label className="label">Phone</label>
                <input type="text" className="input" name="phone"/>

                <label className="label">Street</label>
                <input type="text" className="input" name="street"/>

                <label className="label">Postcode</label>
                <input type="text" className="input" name="postcode"/>

                <label className="label">City</label>
                <input type="text" className="input" name="city"/>

                <label className="label">Realisation</label>
                <input type="checkbox" id="realisation" name="realisation" defaultValue="asSoonAsPossible"/>
                <input type="checkbox" id="realisation" name="realisation" defaultValue="toBeDiscussed"/>

                <label className="label">Attachments</label>
                <input type="file" className="file-input" multiple={true} name="attachments"/>

                <label className="label">Description</label>
                <textarea className="textarea" name="description"></textarea>
                <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} onWidgetLoad={() => {
                    setTurnstileStatus("required");
                    setError(null);
                }}/>
            </fieldset>
            {errors && <div className="text-error mt-2">{JSON.stringify(errors)}</div>}
            {success && <div className="text-success mt-2">Successfully submitted!</div>}
            <button type="submit" className="btn btn-primary">Send</button>
        </form>

    </div>);
}