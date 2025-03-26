import { ProductsMinimizedType } from "@/types/components/shop/product/products";

const getProductSlug = (product: ProductsMinimizedType | undefined) => {
  const slugParams = product?.parent_slug && product.attributes?.length
    ? product.attributes.map(attr => `${attr.slug}=${attr.option}`).join('&')
    : '';

  return (product?.parent_slug || product?.slug) + (Boolean(slugParams.length) ? `?${slugParams}` : '');
};

export default getProductSlug;
