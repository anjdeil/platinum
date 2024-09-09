import { Box } from '@mui/material';
import React from 'react';
import HeaderIconButtons from '../HeaderIconButtons';
import Nav from '../Navigation/Nav';
import SearchBar from '../SearchBar';
import styles from './styles.module.scss';

const Header: React.FC = () =>
{
    return (
        <div className={styles.header__wrapper}>
            {/* <CategoriesMenu /> */}
            <div className={`${styles.header} container`}>
                <Box className={styles.header__nav}>
                    <Nav
                        menuId={344}
                        skeleton={
                            {
                                elements: 4,
                                width: "90px",
                                height: "40px",
                                gap: '40px'
                            }
                        }
                        classList={styles.header__navList}
                        classItem={styles.header__navItem}
                    />
                </Box>
                <Box className={styles.header__container}>
                    <Box className={styles.header__search}>
                        <SearchBar />
                    </Box>
                    <Box className={styles.header__icons}>
                        <HeaderIconButtons />
                    </Box>
                </Box>
            </div>
        </div>
    );
}

export default Header;