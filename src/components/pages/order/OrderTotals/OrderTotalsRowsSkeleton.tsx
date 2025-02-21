import { useTheme } from "@emotion/react";
import { Skeleton } from "@mui/material";
import { useTranslations } from "next-intl";
import { Label, Row, Value } from "./styles";

interface OrderTotalsRowsSkeletonProps {
  noPaymentMethod: boolean;
}

const OrderTotalsRowsSkeleton = ({
  noPaymentMethod,
}: OrderTotalsRowsSkeletonProps) => {
  const theme = useTheme();
  const t = useTranslations('MyAccount');
  return (
    <>
      <Row>
        <Label>
          <Skeleton
            sx={{
              backgroundColor: theme.background.skeleton,
              borderRadius: '5px',
              marginBottom: '10px',
            }}
            width={'70px'}
            height={'1em'}
            variant="rectangular"
          />
        </Label>
        <Value>
          <Skeleton
            sx={{
              backgroundColor: theme.background.skeleton,
              borderRadius: '5px',
              marginBottom: '10px',
            }}
            width={'70px'}
            height={'1em'}
            variant="rectangular"
          />
        </Value>
      </Row>
      <Row>
        <Label>
          <Skeleton
            sx={{
              backgroundColor: theme.background.skeleton,
              borderRadius: '5px',
              marginBottom: '10px',
            }}
            width={'100px'}
            height={'1em'}
            variant="rectangular"
          />
        </Label>
        <Value>
          <Skeleton
            sx={{
              backgroundColor: theme.background.skeleton,
              borderRadius: '5px',
              marginBottom: '10px',
            }}
            width={'70px'}
            height={'1em'}
            variant="rectangular"
          />
        </Value>
      </Row>
      <Row>
        <Label>
          <Skeleton
            sx={{
              backgroundColor: theme.background.skeleton,
              borderRadius: '5px',
              marginBottom: '10px',
            }}
            width={'90px'}
            height={'1em'}
            variant="rectangular"
          />
        </Label>
        <Value>
          <Skeleton
            sx={{
              backgroundColor: theme.background.skeleton,
              borderRadius: '5px',
              marginBottom: '10px',
            }}
            width={'70px'}
            height={'1em'}
            variant="rectangular"
          />
        </Value>
      </Row>
      {noPaymentMethod === false && (
        <Row>
          <Label>
            <Skeleton
              sx={{
                backgroundColor: theme.background.skeleton,
                borderRadius: '5px',
                marginBottom: '10px',
              }}
              width={'70px'}
              height={'1em'}
              variant="rectangular"
            />
          </Label>
          <Value>
            <Skeleton
              sx={{
                backgroundColor: theme.background.skeleton,
                borderRadius: '5px',
                marginBottom: '10px',
              }}
              width={'70px'}
              height={'1em'}
              variant="rectangular"
            />
          </Value>
        </Row>
      )}
      <Row>
        <Label>{t('totalToPay')}</Label>
        <Value>
          <Skeleton
            sx={{
              backgroundColor: theme.background.skeleton,
              borderRadius: '5px',
              marginBottom: '10px',
            }}
            width={'70px'}
            height={'1em'}
            variant="rectangular"
          />
        </Value>
      </Row>
    </>
  );
};

export default OrderTotalsRowsSkeleton;