import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToogle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToogle clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}><Logo /></div>
        <nav className={classes.DesktopOnly}>
            {console.log(props.activePage)}
            <NavigationItems activeItem={props.activePage}/>
        </nav>
    </header>
);

export default toolbar;
