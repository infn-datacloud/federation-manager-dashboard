import { Box, Typography } from '@mui/material';
import page_styles from '@/app/page.module.css'

export default function PageHeader() {

    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            marginTop='4em'
        >
            <img
                src='/logos/logo_INFN.png'
                width='30%'
                alt='Logo'
                className={page_styles.logoImg}
            />
            <br />
            <Typography variant='h4' textAlign='center'>
                Federation Manager
            </Typography>

            <Typography
                variant='body1'
                align='center'
                width='50%'
                className={page_styles.homeText}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nunc in tempus lacus. Nunc urna nunc, condimentum sit
                amet egestas a, vestibulum tempus felis. Suspendisse nec
                purus lacus.
            </Typography>
        </Box>
    );
}