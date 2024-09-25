import AccountLayout from "@/components/Account/AccountLayout";
import { useTranslations } from "next-intl";

export default function MyAccount() {
    const t = useTranslations("MyAccount");

    return (
        <AccountLayout title={t('dashboard')}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque excepturi error quae maiores est praesentium, autem ratione saepe, repellat, adipisci corrupti expedita delectus provident sequi voluptate molestiae quasi distinctio quam.
        </AccountLayout>
    );
}