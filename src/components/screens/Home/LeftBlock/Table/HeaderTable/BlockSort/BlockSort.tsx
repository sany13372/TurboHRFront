import {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import SortImage from '@/components/icons/Sort.svg'


export enum EnumsType {
    'firstName' = 'firstName',
    'lastName' = 'lastName',
    'status' = 'status',
    'name' = 'name',
    'type' = 'type',
    'text' = 'text'
}

interface IBlockSort {
    title: string
    type: EnumsType | null
    sortType: string | null
    setTypeSort: Dispatch<SetStateAction<string>>
    values: any
    setValues: any
}

const BlockSort: FC<IBlockSort> = ({title, sortType, setTypeSort, type, values, setValues}) => {
    const [descending, setDescending] = useState<boolean>(true)

    const handleSort = () => {
        if (sortType !== null && type) {
            setTypeSort(type)
            setDescending(!descending)
        }
    }

    useEffect(() => {
        if (type) {
            if (sortType) {
                if (descending) {
                    const sortedUsers = [...values.sort((a: any, b: any) => a[type].localeCompare(b[type]))]
                    setValues(sortedUsers)
                } else {
                    const sortedUsers = [...values.sort((a: any, b: any) => b[type].localeCompare(a[type]))]
                    setValues(sortedUsers)
                }
            }
        }
    }, [sortType, descending])

    return (
        <div className={'flex gap-2 cursor-pointer items-center'}
             onClick={() => handleSort()}
        >
            <h4 className={'text-header-text'}>{title}</h4>
            <SortImage alt={'Картинка'}/>
        </div>
    );
}

export default BlockSort;