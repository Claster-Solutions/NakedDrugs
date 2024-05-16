import { Client, CheckoutAPI } from '@adyen/api-library'
import { v4 } from 'uuid';

const client = new Client({ apiKey: "AQEphmfxLInKaRxKw0m/n3Q5qf3Va4dMHodPSnQoUArwOK/CMHxgnBqymvYQwV1bDb7kfNy1WIxIIkxgBw==-rpcH9RJJtEuqwGk6zhRVCCM1r1WoCKILxV56jTF5oho=-k;T%DpYUY$9{h&v<", environment: "TEST" });
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