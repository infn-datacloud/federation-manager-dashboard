'use client'

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';

import { useRouter } from 'next/navigation';
import ProviderStatus from './ProviderStatus';
import styles from './providers.module.css';
import page_styles from "@/app/page.module.css";

export default function Provider(props: {
    id: string,
    name: string,
    user: string,
    status: string,
}) {
    const router = useRouter();

	const handleClick = () => {
        let id = props.id.split('provider_')[1];

		router.push('/providers/' + id);
	};

    return (
        <div className={styles.providerContainer} onClick={ handleClick } >
            <Box
                display='flex'
                alignItems='center'
                width='33%'
            >
                <Typography variant='h5' className={styles.providerInitials} padding='12px' margin='4px 20px 4px 0' sx={{backgroundColor: 'lightblue'}}>
                    PE
                </Typography>
                <Typography variant='h6' fontWeight={'bold'} className={page_styles.textEllipsis}>
                    {props.name}
                </Typography>
            </Box>
            <Box
                display='flex'
                alignItems='center'
                width='33%'
				color="#162D4D75"
            >

            {user_icon()}
                
            </Box>
            <ProviderStatus status={props.status} />
        </div>
    )
    
    function user_icon() {
        if (props.user !== '') {
            return (
                <>
                    <PersonIcon />&nbsp;
                    <Typography lineHeight={'unset'} fontWeight={'600'} className={page_styles.textEllipsis}>
                        {props.user}
                    </Typography>
                </>
            )
        }
    
        return (
            <>
                <PersonOutlineRoundedIcon />&nbsp;
                <Typography lineHeight={'unset'} fontWeight={'600'} className={page_styles.textEllipsis}>
                    No user
                </Typography>
            </>
        )
    }
}
