import { FC, ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from '@/components/ui/card';

type CardProps = ComponentProps<typeof Card>;
type CustomCardProps = CardProps & {
    cardHeader?: ReactNode;
    cardContent?: ReactNode;
    cardFooter?: ReactNode;
};

const CustomCard: FC<CustomCardProps> = ({
    className,
    cardHeader,
    cardContent,
    cardFooter,
    ...props
}) => {
    return (
        <Card className={cn('w-[380px]', className)} {...props}>
            <CardHeader>{cardHeader}</CardHeader>
            <CardContent
                className='grid
        gap-4
      '
            >
                {cardContent}
            </CardContent>
            <CardFooter>{cardFooter}</CardFooter>
        </Card>
    );
};

export default CustomCard;
