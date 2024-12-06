import { ContactsSectionData } from '@/types/components/sections/index';

type ContactsSectionProps = Omit<ContactsSectionData, '_type'>;

export const ContactsSection: React.FC<ContactsSectionProps> = ({
  contacts_separator,
}) => {
  return (
    <div>
      <h2>ContactsSection</h2>
      <p>{contacts_separator}</p>
    </div>
  );
};
