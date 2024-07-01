import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Button } from '@mui/material';

import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

export default function CollapsingBox(params: {
    title: React.ReactNode,
    body: React.ReactNode
}) {
    return (
        <>
            <Accordion
                sx={{ 
                    borderRadius: '25px!important',
                    boxShadow: '-3px 3px 8px -3px #00000020',
                    color: 'inherit',
                    '&:before': {
                        backgroundColor: 'transparent'
                    }
                }}
            >
                <AccordionSummary
                    expandIcon={<ArrowDropDownRoundedIcon fontSize='large' />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ padding: '1em 3em' }}
                >
                    <Typography variant='h5' fontWeight='bold' sx={{ display: 'flex', alignItems: 'center'}}>
                        { params.title }
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{padding: '1em 3em'}}>
                    { params.body }
                </AccordionDetails>
            </Accordion>
            <br />
        </>
    )
}