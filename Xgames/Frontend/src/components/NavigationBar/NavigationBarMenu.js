
import AccountCircle from "@material-ui/icons/AccountCircle";
import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

function logeado(){
  const userData = JSON.parse(localStorage.getItem('user'));
  if(userData == 'null'){
    return <MenuItem onClick={popupState.close}>Iniciar Sesión</MenuItem>
  
  }
}

export default function MenuPopupState() {
 
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
            <AccountCircle />
          </Button>
          <Menu {...bindMenu(popupState)}>
            <logeado />
              
            
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}

