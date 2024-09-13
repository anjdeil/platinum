import { useGetProductQuery } from "@/store/rtk-queries/wpCustomApi";
import Head from "next/head";
import { useEffect } from "react";

export default function ProductPage()
{
    const { data } = useGetProductQuery({ slug: 'stove' });

    useEffect(() =>
    {
        if (data) console.log(data);
    }, [data])

    return (
        <>
            {/* <Head>
                <title>{product?.name}</title>
                {product?.description && <meta name="description" content={product.description} />}
            </Head> */}
        </>
    );
}