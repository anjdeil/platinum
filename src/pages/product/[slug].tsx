import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import Reviews from '@/components/global/reviews/Reviews/Reviews';
import CustomProductList from '@/components/pages/product/CustomProductList/CustomProductList';
import ProductInfo from '@/components/pages/product/ProductInfo/ProductInfo';
import transformCategoriesIntoLinks from '@/services/transformers/transformCategoriesIntoLinks';
import { customRestApi } from '@/services/wpCustomApi';
import { useAppSelector } from '@/store';
import { useGetCurrenciesQuery } from '@/store/rtk-queries/wpCustomApi';
import { Container } from '@/styles/components';
import { BreadcrumbType } from '@/types/components/global/breadcrumbs';
import { ProductPageType } from '@/types/pages/product';
import { validateCustomSingleProduct } from '@/utils/zodValidators/validateCustomSingleProduct';
import { Box } from '@mui/material';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

// vinyl-gloves/
// https://platinum.digiway-dev.online/wp-admin/edit.php?post_type=product&page=product_attributes

/**
 * Get all attributes - done
 * Display options depending on attributes - done
 * Default attributes
 * Change data depending on attributes
 * Synchronize other attributes
 * Get current variations
 * Change params of variations
 * Check other layouts elements
 */

// Colors
// Array
// Slug as title
// Options as options

// Map or Set for current variation
// Variations FOR attributes FOR check slug and option

export default function ProductPage({
  res,
  locale,
}: ProductPageType & { locale: string }) {
  const product = res.data.item;
  const [breadcrumbsLinks, setBreadcrumbsLinks] = useState<BreadcrumbType[]>(
    []
  );

  const { data: currencies, isLoading: isCurrenciesLoading } =
    useGetCurrenciesQuery();
  const selectedCurrency = useAppSelector(state => state.currencySlice);

  const currentCurrency =
    currencies && !isCurrenciesLoading
      ? currencies?.data?.items.find(
          currency => currency.code === selectedCurrency.name
        )
      : undefined;

  const extendedCurrency = {
    ...selectedCurrency,
    rate: currentCurrency ? currentCurrency.rate || 1 : undefined,
  };

  useEffect(() => {
    const categoriesWithLang = product.categories.map(item => ({
      ...item,
      language_code: locale,
    }));

    const categoriesBreadcrumbsLinks = transformCategoriesIntoLinks(
      categoriesWithLang || []
    );

    categoriesBreadcrumbsLinks.push({ name: product.name, url: '/' });
    setBreadcrumbsLinks(categoriesBreadcrumbsLinks);
  }, [product.categories]);

  return (
    <>
      <Head>
        <title>{'Place for title'}</title>
        {<meta name="description" content={'Place for seo description'} />}
        <link rel="canonical" href={'Place for seo canonical'} />
        {
          <script type="application/ld+json">
            {JSON.stringify('Place for schema')}
          </script>
        }
      </Head>
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginTop: '24px',
          }}
        >
          <Breadcrumbs links={breadcrumbsLinks} />
        </Box>
        {product && (
          <ProductInfo product={product} currency={extendedCurrency} />
        )}
        <Reviews product={product} />
        <CustomProductList
          title="recommendProduct"
          productIds={recommendProducts}
        />
      </Container>
    </>
  );
}

const recommendProducts = [24707, 24777, 24737, 24717];

export const getServerSideProps: GetServerSideProps = async ({
  query,
  locale,
}: GetServerSidePropsContext) => {
  const { slug } = query;

  try {
    if (typeof slug !== 'string') throw new Error('Invalid product slug');
    if (typeof locale !== 'string')
      throw new Error('Invalid language parameter');

    const response = await customRestApi.get(`products/${slug}`, {
      lang: locale,
    });

    const isValid = await validateCustomSingleProduct(response.data);
    if (!isValid) throw new Error('Invalid product data');

    return {
      props: {
        res: response.data,
        locale,
      },
    };
  } catch (err) {
    console.error('Failed to fetch product data:', err);
    return {
      notFound: true,
    };
  }
};
