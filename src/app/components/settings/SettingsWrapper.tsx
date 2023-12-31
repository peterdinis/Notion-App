import { ReactNode, FC } from 'react';
import CustomDialogTrigger from '../shared/CustomDialog';
import SettingsForm from './SettingsForm';

interface SettingsProps {
    children: ReactNode;
}

const Settings: FC<SettingsProps> = ({ children }) => {
    return (
        <CustomDialogTrigger header='Settings' content={<SettingsForm />}>
            {children}
        </CustomDialogTrigger>
    );
};

export default Settings;
