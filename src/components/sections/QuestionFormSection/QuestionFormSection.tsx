import ContactsForm from '@/components/pages/contacts/ContactsForm/ContactsForm';
import { RecommendContainer, SectionContainer } from '../styles';

export const QuestionFormSection: React.FC = () => {
  return (
    <SectionContainer>
      <RecommendContainer>
        <ContactsForm />
      </RecommendContainer>
    </SectionContainer>
  );
};
