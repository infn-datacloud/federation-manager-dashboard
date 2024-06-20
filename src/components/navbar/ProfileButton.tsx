'use client'

import { useRouter } from 'next/navigation';

import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';


export default function ProfileButton() {
    const router = useRouter();

	const handleClick = () => {
		router.push('/profile');
	};

    return (
        <>
            <IconButton
                size="large"
                edge="end"
                aria-label="Account of current user"
                sx={{ color: 'white' }}
                onClick={ handleClick }
            >
                <AccountCircle />
            </IconButton>
        </>
    )
}