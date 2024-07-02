import Typography from '@mui/material/Typography';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import styles from './providers.module.css';
import page_styles from '@/app/page.module.css';

export default function ProviderStatus(
	props: Readonly<{
		status: string;
	}>
) {
	let style = { backgroundColor: 'grey' };
	let icon = <AccessTimeFilledRoundedIcon sx={{ fontSize: '16px' }} />;

	switch (props.status) {
		case 'Error':
			style = { backgroundColor: '#DE2335' };
			icon = <WarningRoundedIcon sx={{ fontSize: '16px' }} />;
			break;

		case 'Completed':
			style = { backgroundColor: '#17A500' };
			icon = <CheckCircleRoundedIcon sx={{ fontSize: '16px' }} />;
			break;
	}

	return (
		<div className={styles.statusContainer}>
			<Typography
				variant='button'
				className={styles.statusElem}
				style={style}
			>
				{icon}&nbsp;
				<span className={page_styles.textEllipsis}>{props.status}</span>
			</Typography>
		</div>
	);
}
