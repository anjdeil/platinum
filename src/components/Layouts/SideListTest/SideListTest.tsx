import Link from "next/link";

export type SideListLink = {
    name: string,
    url: string,
    isActive?: boolean,
    isNested?: boolean
};

export default function SideListTest({
    links,
    onClick
}: {
    links: SideListLink[],
    onClick?: (url: string) => void,
}) {
    return (
        <ul>
            {links.map(({ name, url, isActive }) =>
                onClick ?
                    <li>
                        <button onClick={() => onClick(url)}>
                            {name}
                        </button>
                    </li>
                    :
                    <li>
                        <Link href={url}>{name}</Link>
                    </li>
            )}
        </ul>
    );
}