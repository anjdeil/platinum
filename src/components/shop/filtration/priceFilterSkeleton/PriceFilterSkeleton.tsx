import { FC } from 'react';
import { Skeleton, Stack } from '@mui/material';
import { Divider } from '../PriceFilter/styles';

export const PriceFilterSkeleton: FC = () => {
  return (
    <Stack spacing={2} mt={2}>
      <Skeleton variant="rectangular" width="100%" height={10} />
      <Stack
        mb={2}
        spacing={1}
        direction="row"
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Skeleton variant="rounded" width="30%" height={50} />
        <Divider />
        <Skeleton variant="rounded" width="30%" height={50} />
      </Stack>
      <Stack direction={'row'} justifyContent={'space-around'} spacing={1}>
        <Skeleton variant="rounded" width="45%" height={30} />
        <Skeleton variant="rounded" width="45%" height={30} />
      </Stack>
    </Stack>
  );
};
