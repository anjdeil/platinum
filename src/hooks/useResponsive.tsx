import { useEffect, useState } from "react";

export const useResponsive = () => {
    const [isMobile, setIsMobile] = useState<boolean>(true);
    const [isTablet, setIsTablet] = useState<boolean>(false);

    const handleResize = () => {
        const windowWidth = window.innerWidth;

        setIsMobile(windowWidth < 768);
        setIsTablet(windowWidth >= 768 && windowWidth < 1024);
    };

    useEffect(() => {
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return { isMobile, isTablet };
};