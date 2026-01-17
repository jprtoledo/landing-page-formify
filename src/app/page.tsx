import Pricing from '@/components/pricing';

interface SearchParamsProps {
    searchParams: Promise<{
        userEmail?: string
    }>;
}

export default async function Home({searchParams}: SearchParamsProps) {
    const {userEmail} = await searchParams
    return (
        <div className="min-h-screen">
            <Pricing userEmail={userEmail}/>
        </div>
    );
}
