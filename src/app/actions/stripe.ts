'use server'

import { stripe } from '@/lib/stripe'
import {headers} from "next/headers";

export async function fetchClientSecret(priceId: string, userEmail?: string) {
    const origin = (await headers()).get('origin')
    const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ],
        mode: 'subscription',
        return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
        ...(userEmail ? {customer_email: userEmail} : {})
    })

    return session.client_secret!
}