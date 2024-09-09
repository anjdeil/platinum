import BurgerButton from "@/components/BurgerButton/BurgerButton";
import CurrencySelect from "@/components/CurrencySelect/CurrencySelect";
import LanguageSelect from "@/components/LanguageSelect/LanguageSelect";
import { Box, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from 'react';
import Nav from "../Navigation/Nav";
import styles from './styles.module.scss';
const TopBar: React.FC = () =>
{
    return (
        <div className={`container ${styles.topBar}`}>
            <div className={styles.topBar__stack}>
                <Link href={'/'} passHref className={styles.topBar__logoLink}>
                    <Image src="/assets/icons/logo.svg" className={styles.topBar__logoLinkImage} alt="Logo" width={92} height={92} />
                </Link>
                <Box className={styles.topBar__nav}>
                    <Nav
                        menuId={335}
                        skeleton={
                            {
                                elements: 5,
                                width: "90px",
                                height: "40px",
                                gap: '40px'
                            }
                        }
                    />
                    <Box className={styles.topBar__selects}>
                        <LanguageSelect />
                        <CurrencySelect />
                    </Box>
                </Box>
                <Box className={styles.topBar__burgerButton}>
                    <BurgerButton />
                </Box>                
                <Button className={styles.topBar__button} variant="outlined">Call us</Button>
            </div>
        </div>
    )
}

export default TopBar;