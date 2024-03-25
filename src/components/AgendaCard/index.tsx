import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ideiaIMG from 'assets/ideia.png'

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

interface Props {
    referencia: string,
    detalhes: string,
    descricao: string,
    utilidade: string,
    imagem?: string
}

export default function AgendaCard(props: Props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ width: 345, bgcolor: '#D9D9D9' }}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        <img src={props.imagem? props.imagem : ideiaIMG} style={{ height: '100%' }} alt='imagem' />
                    </Avatar>
                }
                title={`${props.referencia}`}
                subheader={`${props.utilidade}`}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.descricao}
                </Typography>
            </CardContent>
            {props.detalhes !== '' && <>
                <CardActions disableSpacing>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph style={{ wordWrap: 'break-word' }}>
                            {props.detalhes}
                        </Typography>
                    </CardContent>
                </Collapse>
            </>}
        </Card>
    );
}