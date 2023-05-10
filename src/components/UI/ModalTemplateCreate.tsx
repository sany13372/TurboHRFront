import {FC, useEffect, useMemo, useState} from 'react';
import CrossBlue from '@/components/icons/CrossMini.svg'
import ArrowImg from '@/components/icons/ArrowDownBig.svg'
import {useTemplate} from "@/providers/TemplateProvider";
import PlusImg from '@/components/icons/Plus.svg'
import cn from 'clsx'
import {Dropdown, MenuProps} from "antd";
import {ITemplate} from "@/types/all.interface";


const ModalTemplateCreate: FC = () => {
    const {
        modalType,
        setModalType,
        setDataTemplates,
        dataTemplates,
        selectTemplate,
        setSelectTemplate
    } = useTemplate()
    const [valueType, setValueType] = useState<any>('')
    const [name, setName] = useState<string>('')
    const [text, setText] = useState<string>('')

    const items: MenuProps['items'] = useMemo(() => ([
        {
            label: 'WhatsApp template',
            key: 'WhatsApp',
        },
        {
            label: 'SMS template',
            key: 'SMS',
        },
        {
            label: 'Email template',
            key: 'Email',
        },
    ]), [])

    const clearFields = () => {
        setText('')
        setName('')
        setValueType('')
    }

    const onClick: MenuProps['onClick'] = ({key}) => {
        setValueType(key)
        console.log(`Click on item ${key}`);
    };

    useEffect(() => {
        if (selectTemplate) {
            setText(selectTemplate.text)
            setName(selectTemplate.name)
            setValueType(selectTemplate.type)
        }
    }, [])
    const createTemplate = () => {
        const newTemplate: ITemplate = {
            id: '55',
            name: name,
            text: text,
            type: valueType
        }
        setDataTemplates([...dataTemplates, newTemplate])
        setModalType('')
        clearFields()
    }

    const updateTemplate = () => {
        const templateBody: ITemplate = {
            id: selectTemplate.id,
            type: valueType,
            name: name,
            text: text
        }
        const index = dataTemplates.findIndex((template) => template.id === selectTemplate.id)
        dataTemplates[index] = templateBody
        setDataTemplates(dataTemplates)
    }

    return (
        <div className="bg-black bg-opacity-50 fixed inset-0 w-full h-[100%] flex justify-center items-center"
             id="overlay">
            <div className={cn("bg-white  pb-4 w-[540px]  rounded shadow-xl text-gray-800", {
                'h-[380px]': modalType === 'create',
                'h-[330px]': modalType !== 'create'
            })}>
                <div className="flex h-[60px] bg-blue-bg px-5 justify-between items-center">
                    <div className={'text-white text-xl'}>
                        {modalType === 'create' ? 'Create new template' : 'Edit email template'}
                    </div>
                    <CrossBlue className={'cursor-pointer fill-white'} onClick={() => setModalType('')}/>
                </div>
                <div className={'px-4'}>
                    {modalType == 'create' && <Dropdown menu={{items, onClick}}>
                        <input type="text"
                               value={valueType}
                               onChange={() => {
                               }}
                               className={' w-[490px] py-2 mt-5 bg-transparent border w-full border-solid border-table-item'}
                               placeholder={'Edit email template'}/>
                    </Dropdown>}
                    <input type="text"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           className={' w-[490px] py-2 mt-5 bg-transparent border w-full border-solid border-table-item'}
                           placeholder={'Template name'}/>
                    <textarea placeholder={'Type your message here...'}
                              value={text}
                              onChange={(e) => setText(e.target.value)}
                              className={'resize w-[490px] mb-5  h-[100px] flex items-start mt-5 bg-transparent border w-full border-solid border-table-item'}/>
                </div>
                <div className={'flex justify-between px-4'}>
                    <div className={'flex items-center'}>
                        <PlusImg className={'fill-arrow-pg'}/>
                        <div className={'text-primary'}>Insert attribute</div>
                    </div>
                    <div className={'flex gap-5'}>
                        <div
                            className={'flex border-[1.5px] solid text-primary flex items-center justify-center border-primary cursor-pointer w-[102px] h-[40px]'}>
                            <CrossBlue className={'fill-arrow-pg'}/>
                            Cancel
                        </div>
                        <div
                            onClick={() => modalType === 'create' ? createTemplate() : updateTemplate()}
                            className={'flex border-[1.5px] solid text-white bg-primary flex items-center justify-center border-primary cursor-pointer w-[102px] h-[40px]'}>
                            <ArrowImg className={'fill-white '}/>
                            Save
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalTemplateCreate;