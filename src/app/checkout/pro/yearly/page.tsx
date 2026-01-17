import Checkout from "@/components/checkout";

interface SearchParamsProps {
    searchParams: Promise<{
        userEmail?: string
    }>;
}

export default async function ProYearly({searchParams}: SearchParamsProps) {
    const {userEmail} = await searchParams;
    return (
        <div id="checkout">
            <Checkout priceId="price_1SqdjURgE4DdaZlCQfpFCtPC" userEmail={userEmail}/>
        </div>
    )
}