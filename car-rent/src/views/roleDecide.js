import { useContext } from "react";
import { UserContext } from "../App"

export const UserIsAdmin = () => {
    const { user } = useContext(UserContext);
    return user?.user_id === 1;
}

export const UserIsDriver = () => {
    const { user } = useContext(UserContext);
    return user?.user_id === 2;
}
export const UserIsUser = () => {
    const { user } = useContext(UserContext);
    return user?.user_id === 3;
}