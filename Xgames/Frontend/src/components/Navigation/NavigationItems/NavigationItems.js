import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import NavigationBarMenu from '../../NavigationBar/NavigationBarMenu';

function getActivePage (activePage) {

    var userLogged = localStorage.getItem('user');
    var loggedIn = false;
    if(userLogged !== null){
        loggedIn = true;
    }
    switch(activePage){
        case "/":
            return (
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/" active>Inicio</NavigationItem>
                <NavigationItem link="/foro ">Foro</NavigationItem>
                {loggedIn ? <NavigationItem link="/newgame">Añadir Juego</NavigationItem> : null}
                <NavigationItem link="/search">Buscador</NavigationItem>
                <NavigationItem link="/noticias">Noticias</NavigationItem>
                {loggedIn ? <NavigationItem link="/user_profile">User Profile</NavigationItem> : null}
                <li className={classes.UserProfile}><NavigationBarMenu /></li>
            </ul>);
        case "/foro":
            return (
            <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Inicio</NavigationItem>
            <NavigationItem link="/foro" active>Foro</NavigationItem>
            {loggedIn ? <NavigationItem link="/newgame">Añadir Juego</NavigationItem> : null}
            <NavigationItem link="/search">Buscador</NavigationItem>
            <NavigationItem link="/noticias">Noticias</NavigationItem>
            {loggedIn ? <NavigationItem link="/user_profile">User Profile</NavigationItem> : null}
            <li className={classes.UserProfile}><NavigationBarMenu /></li>
            </ul>
            );
        case "/newgame":
            return (
            <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Inicio</NavigationItem>
            <NavigationItem link="/foro">Foro</NavigationItem>
            {loggedIn ? <NavigationItem link="/newgame">Añadir Juego</NavigationItem> : null}
            <NavigationItem link="/search">Buscador</NavigationItem>
            <NavigationItem link="/noticias">Noticias</NavigationItem>
            {loggedIn ? <NavigationItem link="/user_profile">User Profile</NavigationItem> : null}
            <li className={classes.UserProfile}><NavigationBarMenu /></li>
            </ul>
            );
        case "/search":
            return (
            <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Inicio</NavigationItem>
            <NavigationItem link="/foro">Foro</NavigationItem>
            {loggedIn ? <NavigationItem link="/newgame">Añadir Juego</NavigationItem> : null}
            <NavigationItem link="/search" active>Buscador</NavigationItem>
            <NavigationItem link="/noticias">Noticias</NavigationItem>
            {loggedIn ? <NavigationItem link="/user_profile">User Profile</NavigationItem> : null}
            <li className={classes.UserProfile}><NavigationBarMenu /></li>
            </ul>
            );
        case "/noticias":
            return (
            <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Inicio</NavigationItem>
            <NavigationItem link="/foro">Foro</NavigationItem>
            {loggedIn ? <NavigationItem link="/newgame">Añadir Juego</NavigationItem> : null}
            <NavigationItem link="/search">Buscador</NavigationItem>
            <NavigationItem link="/noticias" active>Noticias</NavigationItem>
            {loggedIn ? <NavigationItem link="/user_profile">User Profile</NavigationItem> : null}
            <li className={classes.UserProfile}><NavigationBarMenu /></li>
            </ul>
            );
        default:
            return (
            <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Inicio</NavigationItem>
            <NavigationItem link="/foro">Foro</NavigationItem>
            {loggedIn ? <NavigationItem link="/newgame">Añadir Juego</NavigationItem> : null}
            <NavigationItem link="/search">Buscador</NavigationItem>
            <NavigationItem link="/noticias">Noticias</NavigationItem>
            {loggedIn ? <NavigationItem link="/user_profile">User Profile</NavigationItem> : null}
            <li className={classes.UserProfile}><NavigationBarMenu /></li>
            </ul>
            );
    }
}


const navigationItems = props => (
    getActivePage(props.activeItem)
);

export default navigationItems;