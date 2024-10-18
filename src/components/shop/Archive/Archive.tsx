import { FC } from "react";

interface ArchiveProps
{
    slugs: string[];
    params: any;
}

export const Archive: FC<ArchiveProps> = ({ slugs, params }) =>
{
    return (
        <div>
            {slugs.length > 0 && <div>{slugs}</div>}
            {params && <div>params</div>}
        </div>
    )
}