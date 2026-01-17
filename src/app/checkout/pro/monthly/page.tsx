import Checkout from "@/components/checkout";

interface SearchParamsProps {
    searchParams: Promise<{
        userEmail?: string
    }>;
}

export default async function ProMonthly({searchParams}: SearchParamsProps) {
    const {userEmail} = await searchParams;
    return (
        <div id="checkout">
            <Checkout priceId="price_1SqdUMRgE4DdaZlCQAArL4vU" userEmail={userEmail}/>
        </div>
    )
}