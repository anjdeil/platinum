import { useState, useEffect } from 'react';
import { useAppSelector } from '@/store';
import { useLazyFetchUserDataQuery } from '@/store/rtk-queries/wpApi';
import { useFetchCustomerQuery } from '@/store/rtk-queries/wooCustomApi';

export const useGetCustomerData = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const { user: userSlice } = useAppSelector(state => state.userSlice);
  const [fetchUserData, { data: userData }] = useLazyFetchUserDataQuery();

  useEffect(() => {
    if (userSlice !== null) {
      fetchUserData();
    }
  }, [userSlice, fetchUserData]);

  useEffect(() => {
    if (userData?.id) {
      setUserId(userData.id.toString());
    }
  }, [userData]);

  const {
    data: customer,
    isLoading: isCustomerLoading,
    refetch,
  } = useFetchCustomerQuery({ customerId: userId || '' }, { skip: !userId });

  return { userId, setUserId, customer, isCustomerLoading, refetch };
};
