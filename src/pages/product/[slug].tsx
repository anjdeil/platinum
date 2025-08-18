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
import { BASE_URL } from '@/utils/consts';
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

interface ProductPageProps {
  product: ProductType;
  locale: string;
  fullUrl: string;
}
export default function ProductPage({
  product,
  locale,
  fullUrl,
}: ProductPageProps) {
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

  // Get recommended products
  const crosssells = product.crosssell_product_ids;

  // Get category slug
  const selectedCategorySlug = product?.categories[0]?.slug || null;
  const baseCategorySlug = selectedCategorySlug
    ? selectedCategorySlug.replace(/-(uk|ru|de|pl|en)$/, '')
    : null;

  // Construct params for recommended products
  const PER_PAGE = 5;
  const RECOMMENDED_PARAMS: Record<string, any> = {
    lang: locale,
    per_page: PER_PAGE,
  };

  if (Array.isArray(crosssells) && crosssells.length > 0) {
    RECOMMENDED_PARAMS.ids = crosssells.join(',');
  } else if (baseCategorySlug) {
    RECOMMENDED_PARAMS.category = baseCategorySlug;
  }

  // Fetch recommended products
  const {
    data: recommendedResponse,
    isLoading,
    isError,
  } = useGetProductsQuery(RECOMMENDED_PARAMS);

  const recommendedItems: ProductType[] =
    recommendedResponse?.data?.items || [];

  const recommendedProducts = recommendedItems
    .filter(prod => prod.id !== product.id)
    .slice(0, 4);

  //Google Analytics
  useEffect(() => {
    if (product && typeof window !== 'undefined') {
      const price = product.price?.min_price || 0;

      const viewItemPayload = {
        event: 'view_item',
        item_id: product.id,
        item_name: product.name,
        price: price,
      };

      // Google Analytics: view_item
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(viewItemPayload);

      // Facebook Pixel: ViewContent
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'ViewContent', {
          content_ids: [product.id],
          content_type: 'product',
          value: price,
          currency: 'PLN',
        });
      }
    }
  }, [product]);

  //SEO
  const productTitle = product?.seo_data?.title || product?.name || '';
  const productDescription =
    product?.seo_data?.description || product?.description?.slice(0, 160) || '';
  const productImages =
    product?.seo_data?.images
      ?.map(img =>
        img['image:loc']?.startsWith('http')
          ? img['image:loc']
          : `${BASE_URL}${img['image:loc']}`
      )
      .filter(Boolean) ||
    product?.images
      ?.map(img =>
        img.src?.startsWith('http') ? img.src : `${BASE_URL}${img.src}`
      )
      .filter(Boolean) ||
    [];

  const productImage = productImages[0] || null;

  const ogTitle = product?.seo_data?.og?.title || productTitle;
  const ogDescription =
    product?.seo_data?.og?.description || productDescription;
  const ogImageUrl = product?.seo_data?.og?.image_url
    ? product?.seo_data?.og?.image_url.startsWith('http')
      ? product?.seo_data?.og?.image_url
      : `${BASE_URL}${product?.seo_data?.og?.image_url}`
    : productImage;
  const ogImageWidth = product?.seo_data?.og?.image_width || null;
  const ogImageHeight = product?.seo_data?.og?.image_height || null;

  const productUrl = fullUrl;
  const canonicalUrl = useCanonicalUrl();

  const schemaProduct = {
    '@context': 'https://schema.org/',
    '@graph': [
      {
        '@type': 'Product',
        '@id': canonicalUrl,
        url: productUrl,
        productID: product?.id ?? undefined,
        name: productTitle,
        image: productImages,
        description: productDescription,
        sku: product?.sku ?? undefined,
        brand: {
          '@type': 'Brand',
          name: 'Platinum by Chetvertinovskaya Liubov',
        },
        offers: {
          '@type': 'Offer',
          url: productUrl,
          priceCurrency: 'PLN',
          price: product?.price?.min_price ?? undefined,
          availability:
            product?.stock_quantity && product.stock_quantity > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbsLinks.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${BASE_URL}${item.url}`,
        })),
      },
    ],
  };

  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
        <meta name="description" content={productDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang={locale} href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={productUrl} />
        <meta property="og:locale" content={locale} />
        <meta
          property="og:site_name"
          content="Platinum by Chetvertinovskaya Liubov"
        />

        {product?.price?.min_price !== undefined && (
          <>
            <meta
              property="og:product:price:amount"
              content={String(product.price.min_price)}
            />
            <meta property="og:product:price:currency" content="PLN" />
          </>
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }}
        />

        {ogImageUrl && (
          <>
            <meta property="og:image" content={ogImageUrl} />
            {ogImageWidth && (
              <meta property="og:image:width" content={String(ogImageWidth)} />
            )}
            {ogImageHeight && (
              <meta
                property="og:image:height"
                content={String(ogImageHeight)}
              />
            )}
          </>
        )}
      </Head>
      <PageTitle title={productTitle} />
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginTop: '24px',
          }}
        >
          <Breadcrumbs
            links={breadcrumbsLinks}
            locale={locale}
            fullUrl={fullUrl}
            currentName={product.name}
          />
        </Box>
        {product && <ProductInfo product={product} />}
        <Reviews product={product} />
        {recommendedProducts.length > 0 && (
          <StyledSectionWrapper>
            <RecommendContainer>
              <TitleBlock>
                <StyledText>{t('bestForYou')}</StyledText>
                <Title as="h4" uppercase>
                  {t('recommendProduct')}
                </Title>
              </TitleBlock>
              <ProductCardList
                products={recommendedProducts}
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

    const productResponse = await customRestApi.get(`products/${slug}`, {
      lang: locale,
    });

    const isValid = await validateCustomSingleProduct(productResponse.data);
    if (!isValid) throw new Error('Invalid product data');

    const product = productResponse?.data?.data?.item;

    // Construct full URL
    const defaultLocale = 'pl';
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers.host;
    const pathWithLocale =
      locale === defaultLocale
        ? `/product/${slug}`
        : `/${locale}/product/${slug}`;
    const fullUrl = `${protocol}://${host}${pathWithLocale}`;

    return {
      props: {
        product,
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
