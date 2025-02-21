import { MetaDataType } from '@/types/services/wooCustomApi/customer';

export const getMetaDataValue = (
  metaData: MetaDataType[],
  key: string
): string => {
  const meta = metaData.find(meta => meta.key === key);
  return meta ? meta.value : '';
};
