type Language = 'uk' | 'ru' | 'pl' | 'de' | 'en';

export const getPluralForm = (count: number, language: Language | string) => {
    const forms: Record<Language | string, string[]> = {
        uk: ['товар', 'товари', 'товарів'],
        ru: ['товар', 'товара', 'товаров'],
        pl: ['produkt', 'produkty', 'produktów'],
        de: ['Produkt', 'Produkte'],
        en: ['product', 'products']
    };

    if (!forms[language]) return forms.en[1];

    if (language === 'uk' || language === 'ru') {
        if (count % 10 === 1 && count % 100 !== 11) return forms[language][0];
        if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return forms[language][1];
        return forms[language][2];
    }

    if (language === 'pl') {
        if (count === 1) return forms.pl[0];
        if ([2, 3, 4].includes(count)) return forms.pl[1];
        return forms.pl[2];
    }

    if (language === 'de' || language === 'en') {
        return count === 1 ? forms[language][0] : forms[language][1];
    }

    return forms.en[1];
};
