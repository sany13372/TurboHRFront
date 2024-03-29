import {Dispatch, FC, SetStateAction} from 'react';
import {IUser} from "@/types/all.interface";
import BodyItem from './BodyItem/BodyItem'
import {useUsers} from "@/providers/UsersProvider";

interface IBody {
    setSelectedUsers: Dispatch<SetStateAction<IUser[]>>,
    allChecked: boolean,
    setAllChecked: Dispatch<SetStateAction<boolean>>
}

const Body: FC<IBody> = ({setSelectedUsers, allChecked, setAllChecked}) => {

    const {users} = useUsers()
    return (
        <div className={'overflow-auto h-[700px]'}>
            {users && users.map((user: IUser) => <BodyItem setSelectedUsers={setSelectedUsers} allChecked={allChecked}
                                                           setAllChecked={setAllChecked} key={user.firstName}
                                                           user={user}/>)}
        </div>
    );
}

export default Body;