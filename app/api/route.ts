import { Client, CheckoutAPI } from '@adyen/api-library'
import { v4 } from 'uuid';

const client = new Client({ apiKey: "AQEihmfuXNWTK0Qc+iSTnmUrs+GJx2A2HxN63GezYRZx1U/zBhDBXVsNvuR83LVYjEgiTGAH-C5IPEHHPctvptKk6c8NuI/dFjq5uItmU443K2ewkluU=-Q6x$*_s%FBstxHS5", environment: "TEST" });
export async function GET(request: Request) {
    const createCheckoutSessionRequest = {
        merchantAccount: "ClasterECOM",
        amount: {
            value: 10,
            currency: "EUR"
        },
        returnUrl: "http://localhost:3000/purchase",
        reference: v4(),
    }

    // Make the API call
    const checkoutAPI = new CheckoutAPI(client);
    const idempotencyKey = v4();
    const response = await checkoutAPI.PaymentsApi.sessions(createCheckoutSessionRequest, { idempotencyKey });
    console.log(response);

    return new Response(JSON.stringify({ response, idempotencyKey }), { headers: { "content-type": "application/json" } });
}
