import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

// Animataion for modal
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// 定义 Modal 组件的 props 类型
interface ModalProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ open, message, onClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Notification"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Next Step</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;