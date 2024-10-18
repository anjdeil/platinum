import useLanguageSwitcher from '@/hooks/useLanguageSwitcher';
import { ChangeEvent } from 'react';

const LANGUAGE_OPTIONS = [
    { name: "EN", code: "en" },
    { name: "PL", code: "pl" },
    { name: "DE", code: "de" },
    { name: "РУ", code: "ru" },
    { name: "УК", code: "uk" },
];

export default function LanguageSwitcher() {
    const { switchLanguage, locale } = useLanguageSwitcher();

    function handleChange(evt: ChangeEvent<HTMLSelectElement>) {
        switchLanguage(evt.target.value);
    }

    return (
        <select value={locale} onChange={handleChange}>
            {LANGUAGE_OPTIONS.map(({ name, code }) =>
                <option key={code} value={code}>{name}</option>
            )}
        </select>
    );
} 