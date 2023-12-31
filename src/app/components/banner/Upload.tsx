'use client';
import { FC, ReactNode } from 'react';
import BannerUploadForm from './UploadForm';
import CustomDialogTrigger from '../shared/CustomDialog';

interface BannerUploadProps {
    children: ReactNode;
    className?: string;
    dirType: 'workspace' | 'file' | 'folder';
    id: string;
}

const BannerUpload: FC<BannerUploadProps> = ({
    id,
    dirType,
    children,
    className,
}) => {
    return (
        <CustomDialogTrigger
            header='Upload Banner'
            content={<BannerUploadForm dirType={dirType} id={id} />}
            className={className}
        >
            {children}
        </CustomDialogTrigger>
    );
};

export default BannerUpload;
