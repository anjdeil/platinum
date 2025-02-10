import { Skeleton, Box, Container } from '@mui/material';
import { StyledFormWrapper } from './style';

export const BillingFormSkeleton = () => {
  return (
    <Container sx={{ padding: '0 !important' }}>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }}
      >
        <StyledFormWrapper>
          {Array.from({ length: 10 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                marginBottom: 2,
              }}
            >
              <Skeleton variant="rounded" width="30%" height={16} />
              <Skeleton
                key={index}
                variant="rounded"
                width="100%"
                height={48}
                sx={{ borderRadius: 2 }}
              />
            </Box>
          ))}
        </StyledFormWrapper>
      </Box>
    </Container>
  );
};
