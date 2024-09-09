import { popupSet } from "@/store/slices/PopupSlice";
import { Button } from "@mui/material";
import Image from "next/image";
import { useDispatch } from "react-redux";

const MobileSearchButton = () => {

    const dispatch = useDispatch();

    return (
        <Button
            sx={{
                backgroundColor: "#F2F8FE",
                width: "100%",
                textTransform: "none",
                fontSize: "1rem",
                lineHeight: "24px",
                fontWeight: "400",
                justifyContent: "space-between",
                borderRadius: "10px",
                padding: "8px 16px",
                color:"#878787",

                '&:hover': {
                    boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
                }
            }}
            onClick={() => dispatch(popupSet('mobile-search'))}
        >
            Search
            <Image
                src={'/assets/icons/search.svg'}
                alt={'Account'}
                width={24}
                height={24}
                unoptimized={true}
            />
        </Button>
    )
}

export default MobileSearchButton;