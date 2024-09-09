import { Chip, InputAdornment } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, SyntheticEvent, useState } from "react";
import styles from './styles.module.scss';

const defaultStyles = {
    height: "40px",
    borderRadius: '8px',
    padding: "8px 16px 8px 11px",
    backgroundColor: "#F2F8FE",
    outline: "none",
    lineHeight: "1.5em",
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: "transparent",
    },
    '& .MuiOutlinedInput-root': {
        paddingRight: '16px',
        border: 'none',
        boxShadow: 'none',
    },    
};

const hoverStyles = {
    '& .MuiOutlinedInput-notchedOutline': {
        boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
        borderColor: "transparent",
    }
};

const focusStyles = {
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: "transparent",
    },
    '& .MuiOutlinedInput-root': {
        boxShadow: 'none',
    }
};

interface SearchBarOptionType
{
    key: string,
    name: string,
    type: string,
    slug: string,
    count?: number
}

const SearchBar = () =>
{
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState('');
    const [isTyping, setTyping] = useState(false);

    const onSearch = (evt: SyntheticEvent, value: string) =>
    {
        setSearchTerm(value);

        if (value.length < 3) return

        setTyping(true);
        setTimeout(() =>
        {
            setTyping(false);
        }, 2000);
    }

    const renderOption = (props: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLLIElement> & React.LiHTMLAttributes<HTMLLIElement>, option: SearchBarOptionType) => (
        <li key={option.key} {...props}>
            <Link href={`/${option.slug}`} className={styles['search-bar__option']}>
                {option.name}
                <Chip
                    label={option.type}
                    size="small"
                    sx={{
                        marginLeft: 1,
                    }}
                />
            </Link>
        </li>
    );

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) =>
    {
        evt.preventDefault();
        if (searchTerm?.length >= 3)
        {
            router.push(`/search/${searchTerm}`)
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles['search-bar']}>
            <Autocomplete
                defaultValue={searchTerm}
                freeSolo
                options={[]}
                getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
                renderOption={renderOption}
                onInputChange={onSearch}
                inputValue={searchTerm}
                disableClearable 
                renderInput={(params) => (
                    <TextField                        
                        {...params}
                        sx={{
                            '& .MuiOutlinedInput-root': defaultStyles,
                            '& .MuiOutlinedInput-root:hover': hoverStyles,
                            '& .MuiOutlinedInput-root.Mui-focused': focusStyles,                            
                        }}
                        InputProps={{
                            ...params.InputProps,                            
                            placeholder: "Search",
                            type: 'search',
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Image
                                        src={'/assets/icons/search.svg'}
                                        alt={'Account'}
                                        width={24}
                                        height={24}
                                        unoptimized={true}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
            />
        </form>
    );
}

export default SearchBar;