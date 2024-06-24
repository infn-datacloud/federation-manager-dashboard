import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';

import ProviderStatus from './ProviderStatus'
import styles from './providers.module.css'

export default function Provider(props: {
    name: string,
    user: string,
    status: string,
}) {
    

    return (
        <div className={styles.providerContainer}>
            <Box
                display='flex'
                alignItems='center'
                width='33%'
            >
                <Typography variant='h5' className={styles.providerInitials} padding='12px' margin='4px 20px 4px 0' sx={{backgroundColor: 'lightblue'}}>
                    PE
                </Typography>
                <Typography variant='h6' fontWeight={'bold'} className={styles.textEllipsis}>
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
                    <Typography lineHeight={'unset'} fontWeight={'600'} className={styles.textEllipsis}>
                        {props.user}
                    </Typography>
                </>
            )
        }
    
        return (
            <>
                <PersonOutlineRoundedIcon />&nbsp;
                <Typography lineHeight={'unset'} fontWeight={'600'} className={styles.textEllipsis}>
                    No user
                </Typography>
            </>
        )
    }
}
