import 'server-only'

import Stripe from 'stripe'
const stripeSK = process.env.STRIPE_SECRET_KEY!

export const stripe = new Stripe(stripeSK)