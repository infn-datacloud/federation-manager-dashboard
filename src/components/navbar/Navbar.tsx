'use client'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

/* Components */
import HomeButton from "@/components/navbar/HomeButton";
import RolesButton from "@/components/navbar/RolesButton";
import NotificationsButton from "@/components/navbar/NotificationsButton";
import ProfileButton from "@/components/navbar/ProfileButton";

export default function Navbar() {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: '#002A48' }}>
                    <Toolbar>

                        {/* Title */}
                        <HomeButton />

                        {/* Roles */}
                        <RolesButton />

                        {/* Notifications */}
                        <NotificationsButton />

                        {/* Account */}
                        <ProfileButton />
                        
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}