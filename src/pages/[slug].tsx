import { PageTitle } from '@/components/pages/pageTitle';
import { SlugPageBreadcrumbs } from '@/components/pages/slugPageBreadcrumbs';
import { RichTextSection } from '@/components/sections/RichTextSection';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { customRestApi } from '@/services/wpCustomApi';
import {
  Container,
  StyledHeaderWrapper,
  StyledSlugRichTextSection,
  Title,
} from '@/styles/components';
import { SectionsType } from '@/types/components/sections';
import { PageDataFullType, PageDataItemType } from '@/types/services';
import { validateWpPage } from '@/utils/zodValidators/validateWpPage';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

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
    if (!isValidSectionsData) throw new Error('Invalid SectionsData data');

    if (responseData && responseData.data) {
      const pageResponseData = responseData.data as PageDataFullType;
      const pageData = pageResponseData.data.item as PageDataItemType;

      if (!pageData) {
        return { notFound: true };
      }

      return {
        props: {
          pageTitle: pageData.title,
          pageContent: pageData.content,
          sections: pageData.sections,
        },
      };
    }

    return { notFound: true };
  } catch (error) {
    console.error('Server Error:', error);
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }
};

interface PageProps {
  pageTitle: string;
  pageContent: string;
  sections: SectionsType[];
}

const isContentMain = (content: string, sections: any[]): boolean => {
  return content.length > 500 || sections.length === 0;
};

const SlugPage = ({ pageTitle, pageContent, sections }: PageProps) => {
  const isMainContent = isContentMain(pageContent, sections);

  return (
    <>
      <PageTitle title={pageTitle} />
      <StyledHeaderWrapper>
        <SlugPageBreadcrumbs title={pageTitle} />
        <Title as={'h1'} uppercase>
          {pageTitle}
        </Title>
      </StyledHeaderWrapper>
      {isMainContent ? (
        <Container>
          <StyledSlugRichTextSection>
            <RichTextSection text={pageContent} fullSize={isMainContent} />
          </StyledSlugRichTextSection>
        </Container>
      ) : (
        <SectionRenderer sections={sections} />
      )}
    </>
  );
};

export default SlugPage;
