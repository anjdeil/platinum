import { useEffect, useState } from "react";
import { InPostGeowidgetCloseButton, InPostGeowidgetWindow, InPostGeowidgetWindowWrapper } from "./style";
import { useTranslations } from "next-intl";
import CloseIcon from "@/components/global/icons/CloseIcon/CloseIcon";

const API_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwMTUzMzA4NDgsImlhdCI6MTY5OTk3MDg0OCwianRpIjoiMDcyOTU2NWYtM2FhNS00OGNkLTgwMmMtYjMyNTcyZTdmNDQxIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTphbWlsaWU3UTZYOXJibU9jSktwSTB5eGVOSmRPRmFTRmhkSUM5ZG8zTHBJIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiMWZhMzI5ZDUtYTYzNi00MDNjLWE5M2EtOWFiZDM3ZWI0MGY2Iiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6IjFmYTMyOWQ1LWE2MzYtNDAzYy1hOTNhLTlhYmQzN2ViNDBmNiIsImFsbG93ZWRfcmVmZXJyZXJzIjoiIiwidXVpZCI6IjkxOTY5OWE0LTg4ZDctNGIxOC05NzA0LTJmYWE5YTU3MWVhZSJ9.TtnSxK8sAREudZdjZ4D-9wY3-YNNMGKBKSoc0zMRdQs2gp2hKuIH3pfJbdxaeVdH0TazCnGux9yg9NV4PfLSTD1StoGpbYzIx0h7gB0-YzYHf1N6SbCE9ARD5_R3DHUQHYc6Laiv7u1EFm_ngVwNnCOkQWPIs1ui93KdV6K7ssGXp_vxBhYyzxEdL46TahMCj8VrrSyDdSoWgjyd5sEtEnVDzfqX-UHTkN_qz4OlkpLoAjRjiyjQL3dNwYx-pY3BUo3fgH1UxQ3C_nr9WmjEq8OvG76XVQBqT4gw3z4gq2TL-c22c1ErzQzGUopQNvtY-Q5ntz4wwKbyLH4sjTfIpA";

export default function InPostGeowidget({ onClose }: { onClose: () => void }) {
    const t = useTranslations('InPostGeowidget');
    const [isActive, setActive] = useState(false);

    useEffect(() => {
        setActive(true);

        document.body.style.overflow = "hidden"
        return () => { document.body.style.overflow = "visible" };
    }, []);

    const handleClose = () => {
        setActive(false);

        setTimeout(() => onClose(), 500)
    }

    return (
        <InPostGeowidgetWindowWrapper className={isActive ? 'active' : ''}>
            <InPostGeowidgetWindow className={isActive ? 'active' : ''}>
                <inpost-geowidget
                    onpoint="onpointselect"
                    token={API_TOKEN}
                    language='pl'
                    config='parcelcollect'
                />
                <InPostGeowidgetCloseButton onClick={() => handleClose()}>
                    <CloseIcon color="#fff" onClick={() => { }} />
                    {t('close')}
                </InPostGeowidgetCloseButton>
            </InPostGeowidgetWindow>
        </InPostGeowidgetWindowWrapper>
    );
}