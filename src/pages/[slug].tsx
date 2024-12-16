import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { customRestApi } from '@/services/wpCustomApi';
import { StyledHeaderWrapper, Title } from '@/styles/components';
import { SectionsType } from '@/types/components/sections';
import { PageDataFullType, PageDataItemType } from '@/types/services';
import { validateWpPage } from '@/utils/zodValidators/validateWpPage';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useTranslations } from "next-intl";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { slug } = context.params as { slug: string };
  const { locale } = context;

  try {
    const responseData = await customRestApi.get(`pages/${slug}`, {
      lang: locale,
    });

    if (!responseData || responseData.status !== 200) {
      return { notFound: true };
    }

    const isValidSectionsData = validateWpPage(responseData);
    if (!isValidSectionsData) throw new Error("Invalid SectionsData data");

    if (responseData && responseData.data) {
      const pageResponseData = responseData.data as PageDataFullType;
      const pageData = pageResponseData.data.item as PageDataItemType;

      if (!pageData) {
        return { notFound: true };
      }

      return {
        props: {
          page: pageData,
          sections: pageData.sections,
        },
      };
    }

    return { notFound: true };
  } catch (error) {
    console.error("Server Error:", error);
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }
};

interface PageProps {
  page: PageDataItemType;
  sections: SectionsType[];
}

const SlugPage = ({ page, sections }: PageProps) => {
  const t = useTranslations("Breadcrumbs");
  const breadcrumbsLinks = [
    {
      name: t("homePage"),
      url: "/",
    },
    {
      name: page?.title,
      url: "",
    },
  ];

  return (
    <>
      <StyledHeaderWrapper>
        <Breadcrumbs links={breadcrumbsLinks} />
        <Title as={"h1"} uppercase>
          {page?.title}
        </Title>
      </StyledHeaderWrapper>
      {sections.length > 0 && <SectionRenderer sections={sections} />}
    </>
  );
};

export default SlugPage;
