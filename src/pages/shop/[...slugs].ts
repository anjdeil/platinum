import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Archive } from "@/components/shop/Archive";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) =>
{
    const { slugs, ...params } = context.query;
    return {
        props: {
            slugs,
            params,
        },
    }
};

export default Archive;