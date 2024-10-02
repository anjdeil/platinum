import CustomSelect from "@/components/Common/Selects/CustomSelect/CustomSelect";
import { ProductCardList } from "@/components/Shop/ProductCardsList";
import { useGetProductsQuery } from "@/store/rtk-queries/wpCustomApi";
import { TitleCatalog } from "@/styles/components";
import { LangParamType } from "@/types/services/wpCustomApi";
import { ProductType } from "@/types/shop";
import { useTheme } from "@emotion/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

export default function ProductList() {
    const { locale } = useRouter();
    const langParam: LangParamType | object = locale ? { lang: locale } : {};
    const { data: productsData, isLoading: isProductsLoading } = useGetProductsQuery(langParam);
    const [sort, setSort] = useState('');
    const theme = useTheme();

    const t = useTranslations("Product");
    const products: ProductType[] = productsData?.data?.items || [];

    const sortList = [
        { code: 'Option 1', symbol: 'Option 1' },
        { code: 'Option 2', symbol: 'Option 2' },
        { code: 'Option 3', symbol: 'Option 3' },
        { code: 'Option 4', symbol: 'Option 4' },
    ];

    function handleChange(evt: ChangeEvent<HTMLSelectElement>) {
        setSort(evt.target.value);
    }
    
    return (
        <>
            <TitleCatalog>{t("productList")}</TitleCatalog>
            <CustomSelect
                value={sort ? sort : t("sortBy")}
                options={sortList}
                onChange={handleChange}
                borderRadius="8px"
                background={theme.background.secondary}
                padding="16px 10px"
                paddingOptions="16px"
                tabletPadding="12px 10px"
                mobPadding="8px 10px"
                allignItem="flex-start"
             />
            <ProductCardList products={products} columns={{ desktopColumns: 3 }} isLoading={isProductsLoading} />
        </>
    );
}

const testProducts = [
  {
    id: 1,
    sku: "SKU001",
    slug: "product-1",
    name: "Product 1",
    description: "Description of Product 1",
    type: "simple",
    created: "2023-01-01T00:00:00Z",
    modified: "2023-01-02T00:00:00Z",
    language_code: "en",
    stock_quantity: 10,
    min_price: 99.99,
    max_price: 199.99,
    categories: [
      {
        id: 1,
        parent_id: "0",
        name: "Category 1",
        slug: "category-1",
        description: "Description of Category 1",
        count: 5,
      },
    ],
    images: [
      {
        id: 1,
        name: "Image 1",
        src: "https://picsum.photos/200/300",
      },
    ],
    attributes: [
      {
        id: 1,
        slug: "color",
        name: "Color",
        options: [
          { id: 1, slug: "red", name: "Red" },
          { id: 2, slug: "blue", name: "Blue" },
        ],
      },
    ],
    default_attributes: [
      {
        id: 1,
        slug: "color",
        option: "Red",
      },
    ],
    variations: [],
  },
  {
    id: 2,
    sku: "SKU002",
    slug: "product-2",
    name: "Product 2",
    description: "Description of Product 2",
    type: "variable",
    created: "2023-01-03T00:00:00Z",
    modified: "2023-01-04T00:00:00Z",
    language_code: "en",
    stock_quantity: 5,
    min_price: 49.99,
    max_price: 149.99,
    categories: [
      {
        id: 2,
        parent_id: "1",
        name: "Category 2",
        slug: "category-2",
        description: "Description of Category 2",
        count: 3,
      },
    ],
    images: [
      {
        id: 2,
        name: "Image 2",
        src: "https://picsum.photos/200/300",
      },
    ],
    attributes: [
      {
        id: 2,
        slug: "size",
        name: "Size",
        options: [
          { id: 3, slug: "small", name: "Small" },
          { id: 4, slug: "medium", name: "Medium" },
        ],
      },
    ],
    default_attributes: [
      {
        id: 2,
        slug: "size",
        option: "Medium",
      },
    ],
    variations: [
      {
        id: 1,
        parent_id: 2,
        sku: "SKU002-RED",
        slug: "product-2-red",
        name: "Product 2 - Red",
        description: "Red variation of Product 2",
        created: "2023-01-05T00:00:00Z",
        modified: "2023-01-06T00:00:00Z",
        stock_quantity: 3,
        price: 99.99,
        image: "https://example.com/images/product-2-red.jpg",
        attributes: [
          {
            id: 1,
            slug: "color",
            option: "Red",
          },
        ],
      },
    ],
  },
];
