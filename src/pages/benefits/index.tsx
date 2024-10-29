import React from 'react';
import Head from "next/head";
import { BenefitsAccordion } from '@/components/pages/benefits/BenefitsAccordion';
import { BenefitsInfo } from '@/components/pages/benefits/BenefitsInfo/BenefitsInfo';
import { Container } from "@/styles/components";

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
            <Container>
                <BenefitsAccordion />

                <BenefitsInfo />
            </Container>
        </main>
    </>
    );
}
