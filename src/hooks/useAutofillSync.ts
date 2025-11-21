import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';

export function useAutofillSync(
    fields: string[],
    setValue: UseFormSetValue<any>
) {
    useEffect(() => {
        const sync = () => {
            setTimeout(() => {
                fields.forEach(field => {
                    const el = document.querySelector(
                        `[name="${field}"]`
                    ) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;

                    if (el && 'value' in el && el.value) {
                        setValue(field, el.value, {
                            shouldValidate: true,
                            shouldDirty: true,
                        });
                    }
                });
            }, 50);
        };

        window.addEventListener('animationstart', sync);

        window.addEventListener('pageshow', sync);

        sync();

        return () => {
            window.removeEventListener('animationstart', sync);
            window.removeEventListener('pageshow', sync);
        };
    }, [fields, setValue]);
}
