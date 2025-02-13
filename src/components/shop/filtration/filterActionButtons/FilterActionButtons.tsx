import { useTranslations } from 'next-intl';
import { ApplyButton, ButtonWrap, ResetButton } from './styles';

type FilterActionButtonProps = {
  isApply?: boolean;
  onReset?: () => void;
  onApply?: () => void;
  disabledApplyButton?: boolean;
};

export const FilterActionButtons = ({
  isApply = false,
  onReset = () => {},
  onApply = () => {},
  disabledApplyButton,
}: FilterActionButtonProps) => {
  const t = useTranslations('Archive');

  if (isApply) {
    return (
      <ButtonWrap>
        <ResetButton onClick={onReset}>{t('clearFilter')}</ResetButton>
        {disabledApplyButton ? (
          <ApplyButton disabled onClick={onApply}>
            {t('applyFilter')}
          </ApplyButton>
        ) : (
          <ApplyButton onClick={onApply}>{t('applyFilter')}</ApplyButton>
        )}
        {/* <ApplyButton onClick={onApply}>{t('applyFilter')}</ApplyButton> */}
      </ButtonWrap>
    );
  }

  return (
    <ButtonWrap>
      <ResetButton onClick={onReset}>{t('clearFilters')}</ResetButton>
    </ButtonWrap>
  );
};
