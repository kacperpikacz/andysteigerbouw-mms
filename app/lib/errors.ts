export class ApiError extends Error {
    status: number;

    constructor(message: string, status: number = 400) {
        super(message);
        this.status = status;
        this.name = "ApiError";
    }

    toResponse() {
        return new Response(
            JSON.stringify({
                success: false,
                error: this.message,
            }),
            {
                status: this.status,
                headers: {"Content-Type": "application/json"},
            }
        );
    }
}