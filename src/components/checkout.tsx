'use client'

import {EmbeddedCheckout, EmbeddedCheckoutProvider} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

import {fetchClientSecret} from '@/app/actions/stripe'
import env from "@/config/env";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Checkout({priceId, userEmail}: { priceId: string, userEmail?: string }) {
    return (
        <div id="checkout">
            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{fetchClientSecret: () => fetchClientSecret(priceId, userEmail)}}
            >
                <EmbeddedCheckout/>
            </EmbeddedCheckoutProvider>
        </div>
    )
}