import React, { useState, Fragment, useRef } from "react";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";


const NavigationBarMenu: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const history = useHistory();
  const userMenuId = "user-menu";
  var userLogged = localStorage.getItem('user');
  var loggedIn = false;
  if(userLogged !== null){
      loggedIn = true;
  }
  const userMenu = (
    <Menu
      anchorEl={buttonRef.current}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={userMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={() => {
        setMenuOpen(false);
      }}
    >
      {loggedIn === false ? 
      <div> <MenuItem onClick={() => history.push("/login")}>
      {"Iniciar Sesión"}
    </MenuItem>
    <MenuItem onClick={() => history.push("/register")}>
      {"Registrarse"}
    </MenuItem>
        </div> : <MenuItem onClick={() => history.push("/")}>
        {"Salir"}
      </MenuItem>}
      
    </Menu>
  );

  return (
    <Fragment>
      <IconButton
        ref={buttonRef}
        edge="end"
        aria-label={"user account"}
        aria-controls={userMenuId}
        aria-haspopup="true"
        onClick={() => {
          setMenuOpen(true);
        }}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      {userMenu}
    </Fragment>
  );
};

export default NavigationBarMenu;
