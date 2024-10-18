import { FC } from "react";

export const Archive: FC = ({ slugs, params }) =>
{
    return (
        <div>
            {slugs.length > 0 && <div>{slugs}</div>}
            {params && <div>params</div>}
        </div>
    )
}