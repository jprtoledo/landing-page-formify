'use server'

import { stripe } from '@/lib/stripe'

export async function fetchClientSecret(priceId: string, userEmail?: string) {
    const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ],
        mode: 'subscription',
        redirect_on_completion: 'never',
        ...(userEmail ? {customer_email: userEmail} : {})
    })

    return session.client_secret!
}