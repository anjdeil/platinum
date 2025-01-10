import { useTranslations } from 'next-intl';
import { ApplyButton, ButtonWrap, ResetButton } from './styles';

type FilterActionButtonProps = {
  isApply?: boolean;
  onReset?: () => void;
  onApply?: () => void;
};

export const FilterActionButtons = ({
  isApply = false,
  onReset = () => {},
  onApply = () => {},
}: FilterActionButtonProps) => {
  const t = useTranslations('Archive');
  if (isApply) {
    return (
      <ButtonWrap>
        <ResetButton onClick={onReset}>{t('clearFilter')}</ResetButton>
        <ApplyButton onClick={onApply}>{t('applyFilter')}</ApplyButton>
      </ButtonWrap>
    );
  }

  return (
    <ButtonWrap>
      <ResetButton onClick={onReset}>{t('clearFilters')}</ResetButton>
    </ButtonWrap>
  );
};
