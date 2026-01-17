import Checkout from "@/components/checkout";

interface SearchParamsProps {
    searchParams: Promise<{
        userEmail?: string
    }>;
}

export default async function BusinessMonthly({searchParams}: SearchParamsProps) {
    const {userEmail} = await searchParams;
    return (
        <div id="checkout">
            <Checkout priceId="price_1SqdVERgE4DdaZlCEAtYCigN" userEmail={userEmail}/>
        </div>
    )
}