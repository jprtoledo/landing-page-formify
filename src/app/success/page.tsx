'use client'

import {useEffect, useState} from "react";
import env from "@/config/env";
import {Loader2} from "lucide-react";

export default function Success() {
    const [status, setStatus] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');

        fetch(`${env.API_URL}/api/payment/sessionStatus?sessionId=${sessionId}`)
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.status);
                setCustomerEmail(data.customer_email);
            });
    }, []);

    if (status === 'complete') {
        return (
            <div className="flex items-center justify-center min-h-dvh max-h-dvh">
                <div className="flex flex-col items-center">
                    <p className="pt-4 text-md font-bold text-foreground">Parabéns pela sua assinatura!</p>
                    <p className="pt-4 text-sm text-muted-foreground">Um email com mais informações será enviado
                        para {' '}
                        <a className="font-bold" href={`mailto:${customerEmail}`}>{customerEmail}</a>
                    </p>
                    <img src={'/img/logo_light.png'} alt="Logo Formify" width={200}/>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-dvh max-h-dvh">
            <div className="flex flex-col items-center">
                <Loader2 className="h-8 w-8 animate-spin text-black"/>
                <p className="pt-4 text-md font-bold text-foreground">Sua assinatura está quase pronta!</p>
                <p className="pt-4 text-sm text-muted-foreground">Aguarde mais um pouco. Estamos atualizando seus
                    dados...</p>
            </div>
        </div>
    )
}