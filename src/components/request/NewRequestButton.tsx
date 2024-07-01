'use client'

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function NewRequestButton() {
    const router = useRouter();

	const handleClick = () => {
		router.push('/providers/request');
	};

    return (
        <Box display='flex' justifyContent='flex-end' position='sticky' bottom='2em'>
            <Button 
                size="large"
                onClick={ handleClick } 
                sx={{ backgroundColor: '#002A48', padding: '1.5em 3em', color: 'white', fontWeight: 'bold', boxShadow: 'rgb(38, 57, 77) 0px 15px 30px -10px', borderRadius: '16px',
                    '&:hover': {
                        backgroundColor: '#012d4d',
                        transform: 'scale(1.01)',
                        boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px'
                    }
                }}
                variant='text'
            >
                <Typography fontSize='24px' fontWeight='bold'>
                    + New Request
                </Typography>
            </Button>
        </Box>
    )
}