import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import Reviews from '@/components/global/reviews/Reviews/Reviews';
import { PageTitle } from '@/components/pages/pageTitle';
import ProductInfo from '@/components/pages/product/ProductInfo/ProductInfo';
import {
  RecommendContainer,
  StyledText,
  TitleBlock,
} from '@/components/sections/styles';
import { ProductCardList } from '@/components/shop/ProductCardsList';
import { useCanonicalUrl } from '@/hooks/useCanonicalUrl';
import transformCategoriesIntoLinks from '@/services/transformers/transformCategoriesIntoLinks';
import { customRestApi } from '@/services/wpCustomApi';
import { useGetProductsQuery } from '@/store/rtk-queries/wpCustomApi';
import { Container, StyledSectionWrapper, Title } from '@/styles/components';
import { BreadcrumbType } from '@/types/components/global/breadcrumbs';
import { ProductType } from '@/types/components/shop/product/products';
import { ProductPageType } from '@/types/pages/product';
import { validateCustomSingleProduct } from '@/utils/zodValidators/validateCustomSingleProduct';
import { Box } from '@mui/material';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
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
  fullUrl,
}: ProductPageType & { locale: string; fullUrl: string }) {
  const product = res.data.item;
  const [breadcrumbsLinks, setBreadcrumbsLinks] = useState<BreadcrumbType[]>(
    []
  );
  const t = useTranslations('Product');

  useEffect(() => {
    const categories = product.categories;

    const childCategory =
      categories.find(cat => cat.parent_id !== 0 && cat.is_hidden === false) ||
      categories[0];

    const parentCategory = categories.find(
      cat => cat.id === childCategory.parent_id
    );

    const selectedCategories = parentCategory
      ? [parentCategory, childCategory]
      : [childCategory];

    const categoriesWithLang = selectedCategories.map(item => ({
      ...item,
      language_code: locale,
    }));

    const categoriesBreadcrumbsLinks = transformCategoriesIntoLinks(
      categoriesWithLang || []
    );

    categoriesBreadcrumbsLinks.push({ name: product.name, url: '/' });
    setBreadcrumbsLinks(categoriesBreadcrumbsLinks);
  }, [product.categories]);

  //Google Analytics
  useEffect(() => {
    if (product) {
      const viewItemPayload = {
        value: product.price?.min_price,
        items: [
          {
            item_id: product.sku || product.id,
            item_name: product.name,
            item_category: product.categories.map(c => c.name).join('/'),
            price: String(product.price?.min_price),
            quantity: 1,
          },
        ],
      };

      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'view_item', viewItemPayload);
      }
    }
  }, [product]);

  const PER_PAGE = 5;
  const selectedCategory = product.categories[0].slug || null;

  const baseCategory = selectedCategory
    ? selectedCategory.replace(/-(uk|ru|de|pl|en)$/, '')
    : null;

  const RECOMMENDED_PARAMS = {
    lang: locale,
    per_page: PER_PAGE,
    category: baseCategory || undefined,
  };
  const {
    data: recommendedData,
    isLoading,
    isError,
  } = useGetProductsQuery(RECOMMENDED_PARAMS);

  const popularProducts: ProductType[] = recommendedData?.data?.items || [];

  let filteredRecommendedProducts = [] as ProductType[];

  if (popularProducts && popularProducts.length > 0) {
    filteredRecommendedProducts = popularProducts.filter(
      (popularProduct: ProductType) => popularProduct.id !== product.id
    );
  }

  if (filteredRecommendedProducts && filteredRecommendedProducts.length > 4) {
    filteredRecommendedProducts = filteredRecommendedProducts.slice(0, 4);
  }

  const products: ProductType[] = filteredRecommendedProducts || [];

  //SEO
  const productTitle = product?.seo_data?.title || product?.name;
  const productDescription =
    product?.seo_data?.description || product?.description?.slice(0, 160);
  const productImage =
    product?.seo_data?.images?.[0]?.['image:loc'] || product?.images?.[0]?.src;
  const productUrl = fullUrl;
  const canonicalUrl = useCanonicalUrl();

  console.log('canonicalUrl...', canonicalUrl);

  const schemaProduct = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: productTitle,
    image:
      product?.seo_data?.images?.map(img => img['image:loc']) ||
      product?.images?.map(img => img.src),
    description: productDescription,
    sku: product?.sku,
    brand: {
      '@type': 'Brand',
      name: 'Platinum by Chetvertinovskaya Liubov',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product?.price?.min_price,
      availability:
        product?.stock_quantity && product.stock_quantity > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      url: productUrl,
    },
  };

  return (
    <>
      <Head>
        <meta name="description" content={productDescription} />
        <meta property="og:title" content={productTitle} />
        <meta property="og:description" content={productDescription} />
        <meta property="og:image" content={productImage} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={productUrl} />
        <link rel="canonical" href={canonicalUrl} />
        {
          <script type="application/ld+json">
            {JSON.stringify(schemaProduct)}
          </script>
        }
      </Head>
      <PageTitle title={product.name} />
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
        {product && <ProductInfo product={product} />}
        <Reviews product={product} />
        {products.length > 0 && (
          <StyledSectionWrapper>
            <RecommendContainer>
              <TitleBlock>
                <StyledText>{t('bestForYou')}</StyledText>
                <Title as="h4" uppercase>
                  {t('recommendProduct')}
                </Title>
              </TitleBlock>
              <ProductCardList
                products={products}
                isLoading={isLoading}
                isError={isError}
                columns={{
                  mobileColumns: 2,
                  tabletColumns: 4,
                  mintabletColumns: 4,
                  desktopColumns: 4,
                }}
              />
            </RecommendContainer>
          </StyledSectionWrapper>
        )}
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  locale,
  req,
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

    // Construct full URL
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers.host;
    const fullUrl = `${protocol}://${host}/product/${slug}`;

    return {
      props: {
        res: response.data,
        locale,
        fullUrl,
      },
    };
  } catch (err) {
    console.error('Failed to fetch product data:', err);
    return {
      notFound: true,
    };
  }
};
