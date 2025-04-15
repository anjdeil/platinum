import AccountLayout from '@/components/pages/account/AccountLayout';
import WishListTable from '@/components/pages/account/WishListTable/WishListTable';
import { useAppSelector } from '@/store';
import { useFetchUserUpdateMutation } from '@/store/rtk-queries/wpApi';
import { useGetProductsMinimizedMutation } from '@/store/rtk-queries/wpCustomApi';
import { ProductsMinimizedType } from '@/types/components/shop/product/products';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';
import Notification from '@/components/global/Notification/Notification';
import { CartLink } from '@/components/global/popups/MiniCart/style';
import {
  AccountTitle,
  SkeletonItem,
  SkeletonWrapper,
  StyledButton,
} from '@/styles/components';
import { WishlistItem, WpUserType } from '@/types/store/rtk-queries/wpApi';
import { GetServerSidePropsContext } from 'next';
import wpRestApi from '@/services/wpRestApi';
import { decodeJwt } from 'jose';
import { validateJwtDecode } from '@/utils/zodValidators/validateJwtDecode';
import { JwtDecodedDataType } from '@/types/services/wpRestApi/auth';

interface WishlistPageProps {
  defaultCustomerData: WpUserType | null;
}

const Wishlist: FC<WishlistPageProps> = ({ defaultCustomerData }) => {
  const { code: symbol } = useAppSelector(state => state.currencySlice);
  const { code } = useAppSelector(state => state.languageSlice);
  const router = useRouter();
  const tMyAccount = useTranslations('MyAccount');
  const tCart = useTranslations('Cart');
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(true);
  const [wishlist, setWishlist] = useState(
    defaultCustomerData?.meta?.wishlist || []
  );

  const [fetchUserUpdate, { data: userData, isLoading: isUserUpdateLoading }] =
    useFetchUserUpdateMutation();

  const [
    getProductsMinimized,
    { data: productsSpecsData, isLoading: isProductsLoading },
  ] = useGetProductsMinimizedMutation();

  useEffect(() => {
    if (userData?.meta.wishlist) {
      setWishlist(userData?.meta.wishlist);
    }
  }, [userData]);

  const [wishListProducts, setWishListProducts] = useState<
    ProductsMinimizedType[]
  >([]);

  useEffect(() => {
    if (wishlist && router?.locale !== undefined && wishlist?.length > 0) {
      getProductsMinimized({
        cartItems: wishlist,
        lang: code,
      });
      setIsLoadingWishlist(true);
    } else {
      setWishListProducts([]);
      setIsLoadingWishlist(false);
    }
  }, [wishlist, code]);

  useEffect(() => {
    if (productsSpecsData?.data.items) {
      setWishListProducts(productsSpecsData.data.items);
      setIsLoadingWishlist(false);
    }
  }, [productsSpecsData]);

  const handleDelete = useCallback(
    ({ product_id, variation_id }: WishlistItem) => {
      const updatedWishlist = wishlist?.filter(
        item =>
          !(
            item.product_id === product_id &&
            (!variation_id || item.variation_id === variation_id)
          )
      );

      const userUpdateRequestBody = { meta: { wishlist: updatedWishlist } };

      if (userData?.id || defaultCustomerData?.id) {
        fetchUserUpdate(userUpdateRequestBody).then(() => {
          setIsLoadingWishlist(true);
        });
      }
    },
    [wishlist, fetchUserUpdate, userData?.id]
  );

  const isLoading =
    isProductsLoading || isUserUpdateLoading || isLoadingWishlist;

  const skeletonsCount = wishListProducts.length - 1 || 1;

  const Skeletons = Array.from({ length: skeletonsCount }, (_, index) => (
    <SkeletonItem key={index} variant="rounded" />
  ));

  return (
    <AccountLayout nameSpace={'MyAccount'} spaceKey={'wishlist'}>
      <AccountTitle as={'h1'} textalign="center" uppercase marginBottom="24">
        {tMyAccount('wishlist')}
      </AccountTitle>
      {isLoading && <SkeletonWrapper>{Skeletons}</SkeletonWrapper>}

      {!isLoading && (
        <WishListTable
          symbol={symbol}
          wishlist={wishListProducts}
          wishlistMinElements={wishlist || []}
          isLoading={isLoading}
          onDelete={handleDelete}
        />
      )}

      {!!(!isLoading && wishListProducts && wishListProducts.length === 0) && (
        <>
          <Notification type="info">
            {tMyAccount('nothingInTheWishlist')}
          </Notification>
          <CartLink href="/">
            <StyledButton height="58px" width="310px" minWidthMobile="100%">
              {tCart('goToShop')}
            </StyledButton>
          </CartLink>
        </>
      )}
    </AccountLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = context.req.cookies;
  const { locale } = context;

  try {
    if (!cookies?.authToken) {
      return {
        redirect: {
          destination: '/my-account/login',
          permanent: false,
        },
      };
    }

    const authResp = await wpRestApi.post(
      'jwt-auth/v1/token/validate',
      {},
      false,
      `Bearer ${cookies.authToken}`
    );
    if (authResp?.data?.code !== 'jwt_auth_valid_token') {
      return {
        redirect: {
          destination: '/my-account/login',
          permanent: false,
        },
      };
    }

    const jwtDecodedData = decodeJwt(cookies.authToken) as JwtDecodedDataType;
    const isJwtDecodedDataValid = await validateJwtDecode(jwtDecodedData);
    if (!isJwtDecodedDataValid) {
      return {
        redirect: {
          destination: '/my-account/login',
          permanent: false,
        },
      };
    }

    const resp = await wpRestApi.get(
      'users/me',
      { path: ['users', 'me'] },
      `Bearer ${cookies.authToken}`
    );

    if (!resp?.data) {
      throw new Error('Failed to fetch user data');
    }

    return {
      props: {
        defaultCustomerData: resp.data,
        messages: (await import(`../../../translations/${locale}.json`))
          .default,
      },
    };
  } catch (err) {
    console.error('Error validating auth token:', err);

    return {
      redirect: {
        destination: '/my-account/login',
        permanent: false,
      },
    };
  }
};

export default Wishlist;
