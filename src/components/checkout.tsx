'use client'

import {EmbeddedCheckout, EmbeddedCheckoutProvider} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

import env from "@/config/env";
import {useEffect, useState} from "react";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Checkout({priceId}: { priceId: string }) {
    const [clientSecret, setClientSecret] = useState<string>("")

    useEffect(() => {
        fetch(`${env.API_URL}/api/payment/session?priceId=${priceId}`)
            .then(res => res.json())
            .then(body => setClientSecret(body.clientSecret))
    }, [priceId])

    return (
        <div className="px-2 pb-2">
            <div id="checkout">
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{clientSecret}}
                >
                    <EmbeddedCheckout/>
                </EmbeddedCheckoutProvider>
            </div>
        </div>
    )
}