'use client';

import {useState} from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Switch} from '@/components/ui/switch';
import {Badge} from '@/components/ui/badge';
import {Check, X} from 'lucide-react';
import env from "@/config/env";
import Link from "next/link";

interface Plan {
    name: string
    target: string
    monthlyPrice: number
    responses: string
    formsAtivos: string
    popular?: boolean
    url: string
    features: {
        [key: string]: boolean;
    }
}

const plans: Plan[] = [
    {
        name: 'Free',
        target: 'Testes e hobbyistas',
        monthlyPrice: 0,
        responses: '100',
        formsAtivos: '1',
        features: {
            'CRM incluso': true,
            'Analytics básicos': true,
            'Analytics avançados': false,
            'Score de intenção com IA': false,
            'Sem watermark': false,
            'Integração com Meta Pixel': false,
            'Suporte prioritário': false,
        },
        url: `${env.APP_URL}`
    },
    {
        name: 'Pro',
        target: 'Autônomos ativos',
        monthlyPrice: 49,
        responses: '3.000',
        formsAtivos: '10',
        features: {
            'CRM incluso': true,
            'Analytics básicos': true,
            'Analytics avançados': true,
            'Score de intenção com IA': true,
            'Sem watermark': true,
            'Integração com Meta Pixel': true,
            'Suporte prioritário': true,
        },
        popular: true,
        url: `${env.LANDING_PAGE_URL}/checkout/pro`
    },
    {
        name: 'Business',
        target: 'Agências e PMEs',
        monthlyPrice: 179,
        responses: '15.000',
        formsAtivos: 'Ilimitados',
        features: {
            'CRM incluso': true,
            'Analytics básicos': true,
            'Analytics avançados': true,
            'Score de intenção com IA': true,
            'Sem watermark': true,
            'Integração com Meta Pixel': true,
            'Suporte prioritário': true,
        },
        url: `${env.LANDING_PAGE_URL}/checkout/business`
    },
];

export default function Pricing({userEmail}: { userEmail?: string }) {
    const [isAnnual, setIsAnnual] = useState(false);

    const buildUrl = (plan: Plan) => {
        let url = plan.url;
        if (plan.monthlyPrice === 0) return plan.url;
        url += isAnnual ? "/yearly" : "/monthly"
        if (userEmail) url += `?userEmail=${userEmail}`;
        return url;
    }

    const getPrice = (monthlyPrice: number) => {
        if (monthlyPrice === 0) return 'Grátis';
        const price = isAnnual ? monthlyPrice * 0.8 : monthlyPrice;
        return `R$${Math.round(price)}`;
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-16" id="planos">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Escolha seu plano</h2>
                <p className="text-muted-foreground text-lg mb-8">
                    Comece grátis e escale conforme cresce
                </p>

                <div className="flex items-center justify-center gap-3">
                    <span className={!isAnnual ? 'font-semibold' : 'text-muted-foreground'}>Mensal</span>
                    <Switch checked={isAnnual} onCheckedChange={setIsAnnual}/>
                    <span className={isAnnual ? 'font-semibold' : 'text-muted-foreground'}>Anual</span>
                    <Badge variant="secondary" className="ml-2">-20%</Badge>
                </div>
            </div>

            <div className="grid px-2 grid-cols-1 lg:grid-cols-3 lg:px-0 gap-6">
                {plans.map((plan) => (
                    <Card key={plan.name} className={plan.popular ? 'border-primary shadow-lg lg:scale-105' : ''}>
                        <CardHeader>
                            {plan.popular && (
                                <Badge className="w-fit mb-2">Mais Popular</Badge>
                            )}
                            <CardTitle>{plan.name}</CardTitle>
                            <CardDescription>{plan.target}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="text-3xl font-bold">{getPrice(plan.monthlyPrice)}</div>
                                {plan.monthlyPrice > 0 && (
                                    <p className="text-sm text-muted-foreground">
                                        {isAnnual ? '/mês (cobrado anualmente)' : '/mês'}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2 pb-4 border-b">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-semibold">Respostas/Mês</p>
                                    <p className="text-sm font-bold">{plan.responses}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-semibold">Forms ativos</p>
                                    <p className="text-sm font-bold">{plan.formsAtivos}</p>
                                </div>
                            </div>
                            <ul className="space-y-2">
                                {Object.entries(plan.features)
                                    .map(([feature, hasFeature]) => (
                                        <li key={feature} className="flex items-start gap-2 text-sm">
                                            {hasFeature ? (
                                                <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"/>
                                            ) : (
                                                <X className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0"/>
                                            )}
                                            <span
                                                className={!hasFeature ? 'text-muted-foreground' : ''}>{feature}</span>
                                        </li>
                                    ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant={plan.popular ? 'default' : 'outline'} asChild>
                                <Link href={buildUrl(plan)}>
                                    {plan.monthlyPrice === 0 ? 'Começar grátis' : 'Assinar'}
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
