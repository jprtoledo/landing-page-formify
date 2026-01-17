import Checkout from "@/components/checkout";

interface SearchParamsProps {
    searchParams: Promise<{
        userEmail?: string
    }>;
}

export default async function BusinessYearly({searchParams}: SearchParamsProps) {
    const {userEmail} = await searchParams;
    return (
        <div id="checkout">
            <Checkout priceId="price_1SqdiKRgE4DdaZlCqZkc58Sn" userEmail={userEmail}/>
        </div>
    )
}