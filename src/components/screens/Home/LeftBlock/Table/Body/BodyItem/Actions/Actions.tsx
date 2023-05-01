import {Dispatch, FC, SetStateAction} from 'react';
import PlayerImg from '../../../../../../../../../public/Player.svg'
import MessageImg from '../../../../../../../../../public/Message.svg'
import Image from "next/image";
import {useUsers} from "@/providers/UsersProvider";
import {IUser} from "@/types/all.interface";
import cn from 'clsx'
import PauseImg from '../../../../../../../../../public/Pause.svg'
import MessageWhiteImg from '../../../../../../../../../public/MessageWhite.svg'
import PlayerWhiteImg from '../../../../../../../../../public/PlayerWhite.svg'
import {useVideo} from "@/hooks/useVideo";

interface IActions {
    user: IUser,
    isPlay: boolean,
    setIsPlay: Dispatch<SetStateAction<boolean>>
}

const Actions: FC<IActions> = ({user, setIsPlay, isPlay}) => {
    const {selectUser} = useUsers()
    const {video,actions} = useVideo()

    return (
        <div className={'flex items-center gap-5'}>
            {selectUser.id !== user.id &&
                <Image src={PlayerImg}  className={cn('cursor-pointer white')}
                       alt={'Картинка'}/>}
            {selectUser.id === user.id &&
                <>
                    {video.isPlaying ? <Image src={PlayerWhiteImg} onClick={actions.toggleVideo}
                                     className={cn('cursor-pointer white')}
                                     alt={'Картинка'}/> :
                        <Image src={PauseImg} alt={'Картинка'} onClick={actions.toggleVideo}/>
                    }
                </>
            }
            {selectUser.id === user.id ? <Image src={MessageWhiteImg} className={'cursor-pointer'} alt={'Картинка'}/> :
                <Image src={MessageImg} className={'cursor-pointer'} alt={'Картинка'}/>}
        </div>
    );
}

export default Actions;