import AccountInfoBlockList from "@/components/Account/AccountInfoBlockList/AccountInfoBlockList";
import AccountLinkBlockList from "@/components/Account/AccountLinkBlockList/AccountLinkBlockList";
import Table from "@/components/Account/Table/Table";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import { AccountTitle } from "@/styles/components";

export default function Account()
{
    return (
        <>
            <AccountTitle>Client's personal account</AccountTitle>
            <AccountInfoBlockList />
            <AccountLinkBlockList />
            <form action="">
                <CustomInput required type="description" name="name" label="Name" placeholder="Example text for textarea"/>
                <CustomInput required name="name" label="Name" placeholder="Example text" errorText="This is a hint text to help user."/>
                <CustomInput type="password" required name="password" label="Password" placeholder="Enter password" />
                <button type="submit">Ok</button>
            </form>
            <Table />                
        </>
    );
};