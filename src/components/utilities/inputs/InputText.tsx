import { ForkLeft, Height } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { styled } from '@mui/material/styles';

interface Props {
    label: string,
    fullWidth?: boolean,
    rows?: number,
    sx?: object,
}

export default function InputText({
    label,
    fullWidth=true,
    rows=1,
    sx={}
}: Props) {
    const CssTextField = styled(TextField)({
        '& label.Mui-focused': {
            color: '#162D4D'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#B2BAC2',
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: '25px',
            '& fieldset': {
                borderColor: '#162D4D75',
            },
            '&:hover fieldset': {
                borderColor: '#162D4D75',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#162D4D',
            }
        },
    });

    return (
        <>
            <CssTextField fullWidth={fullWidth} label={label} rows={rows} multiline={rows > 1} sx={sx} />
        </>
    )
}