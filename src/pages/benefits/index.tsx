import React from 'react';
import Head from "next/head";
import { BenefitsAccordion } from '@/components/Layouts/BenefitsAccordion/BenefitsAccordion';
import { BenefitsInfo } from '@/components/Layouts/BenefitsInfo/BenefitsInfo';

export default function benefits() {

    return (<>
        <Head>
            <title>LOYALTY PROGRAM</title>
            <meta charSet="utf-8" />
            <meta
                name="description"
                content="The description that i didn't uploaded from data" />
        </Head>
        <main>
            <BenefitsAccordion />

            <BenefitsInfo />
        </main>
    </>
    );
}
