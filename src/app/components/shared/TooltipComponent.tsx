import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from '@/components/ui/tooltip';
import { FC, ReactNode } from 'react';

interface TooltipComponentProps {
    children: ReactNode;
    message: string;
}

const TooltipComponent: FC<TooltipComponentProps> = ({ children, message }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipContent>{message}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default TooltipComponent;
