import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Button } from '@mui/material';

import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import CollapsingBox from '@/components/utilities/CollapsingBox';

export default function FormDataBox() {
    let title = (
        <>
            <SubjectRoundedIcon />&nbsp;Data
        </>
    );

    let data = (
        <>
            <Typography>
                <b>Lorem ipsum:</b> dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget. <br />
                <b>Lorem ipsum:</b> dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget. <br />
                <b>Lorem ipsum:</b> dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget. <br />
            </Typography>

            <Box 
                display='flex'
                justifyContent='flex-end'
                marginTop='1rem'
            >
                <Button 
                    variant="outlined"
                    sx={{
                        borderRadius: '25px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '5px 32px',
                        color: '#002A48',
                        borderColor: '#002A48',
                        '&:hover': {
                            borderColor: '#002A48'
                        }
                    }} 
                    endIcon={<EditRoundedIcon />}
                >
                    Edit
                </Button>
            </Box>
        </>
    );

    return (
        <>
            <CollapsingBox title={title} body={data} />
        </>
    );
}