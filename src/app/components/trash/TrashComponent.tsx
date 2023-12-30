import {FC, ReactNode} from "react";
import CustomDialogTrigger from '../shared/CustomDialog';
import TrashRestore from './Restore';

interface TrashProps {
  children: ReactNode;
}

const Trash: FC<TrashProps> = ({ children }) => {
  return (
    <CustomDialogTrigger
      header="Trash"
      content={<TrashRestore />}
    >
      {children}
    </CustomDialogTrigger>
  );
};

export default Trash;