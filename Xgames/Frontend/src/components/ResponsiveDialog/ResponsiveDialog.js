import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import classes from './ResponsiveDialog.module.css';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.moreInfo}>
      <Button className={classes.buttonCard} variant="outlined" color="primary" onClick={handleClickOpen}>
        More Info
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <h1 align="center">{props.gameTitle}</h1>
        <img
          src={props.imageSrc}
          alt={props.gameTitle}
          width="50%"
          height="50%"
          justify = "center"
        />
        <h1> Descripción</h1>
        {props.description}
        <h1>Precios</h1>
      </Dialog>
    </div>
  );
}