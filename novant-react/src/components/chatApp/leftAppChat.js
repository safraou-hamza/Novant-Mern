import React , { useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import IconButton from '@material-ui/core/IconButton';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import Badge from '@material-ui/core/Badge';
import MonetizationOnIcon from '@material-ui/icons/AttachMoney';
import ReactBnbGallery from 'react-bnb-gallery';
import 'react-bnb-gallery/dist/style.css';
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        width: '100%',
        height: '880px'
    },
    rad: {
        borderRadius: 20,
        width: theme.spacing(15),
        height: theme.spacing(15),
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '15px'


    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
       
      },
    middle: {
        marginTop: '15px',
        textAlign: 'center',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {

    },

    pos: {
        marginBottom: 12,
        textAlign: 'center'
    },
}));

export default function OutlinedCard() {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const PHOTOS = [{
        photo: "https://source.unsplash.com/aZjw7xI3QAA/1144x763",
        caption: "Viñales, Pinar del Río, Cuba",
        subcaption: "Photo by Simon Matzinger on Unsplash",
        thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
      }, {
        photo: "https://source.unsplash.com/c77MgFOt7e0/1144x763",
        caption: "La Habana, Cuba",
        subcaption: "Photo by Gerardo Sanchez on Unsplash",
        thumbnail: "https://source.unsplash.com/c77MgFOt7e0/100x67",
      }, {
        photo: "https://source.unsplash.com/aZjw7xI3QAA/1144x763",
        caption: "Bouzid mohamed ",
        subcaption: "Photo by Hannah Cauhepe on Unsplash",
        thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
      },
      {
        photo: "https://source.unsplash.com/aZjw7xI3QAA/1144x763",
        caption: "Bouzid mohamed ",
        subcaption: "Photo by Hannah Cauhepe on Unsplash",
        thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
      },
      {
        photo: "https://source.unsplash.com/aZjw7xI3QAA/1144x763",
        caption: "Bouzid mohamed ",
        subcaption: "Photo by Hannah Cauhepe on Unsplash",
        thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
      }];
    


    return (
        <>
        <link href="../assets/css/chatApp.css" rel="stylesheet" />
        <ReactBnbGallery
        show={isOpen}
        photos={PHOTOS}
        onClose={() => setIsOpen(false)}
      />
        <div style={{ paddingTop: '75px',maxHeight:'880px',display:'scroll' }}>
            <Paper elevation={0} className={classes.root} >
                <Card elevation={0} className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>

                            <Avatar variant='rounded' src={`../assets/images/users/5.jpg`} className={classes.rad} />
                        </Typography>
                        <Typography variant="h5" component="h2" className={classes.middle}>
                            Bayrem Zguimi
        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Accoubts Manager Amix corp
        </Typography>
                        <Typography className={classes.middle}>

                            <IconButton className={classes.Icon} aria-label="delete">
                                <Badge badgeContent={17} color="primary"> <PeopleOutlineIcon fontSize="30" /> </Badge>

                            </IconButton>
                            <IconButton className={classes.Icon} aria-label="delete">
                                <Badge badgeContent={17} color="primary">  <MonetizationOnIcon fontSize="30" /> </Badge>
                            </IconButton>

                        </Typography>
                        <Typography variant="body2" component="p">
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography className={classes.heading}>Shared files</Typography>
                                </AccordionSummary>
                                <AccordionDetails style={{paddingBottom:'0px'}}>
                                    <Typography >
                                      <a href="#">index.html</a>
                                    </Typography>
                                </AccordionDetails>
                                <AccordionDetails style={{paddingBottom:'0px'}} >
                                    <Typography >
                                      <a href="#">style.css</a>
                                    </Typography>
                                </AccordionDetails>
                                <AccordionDetails >
                                    <Typography style={{paddingBottom:'0px'}}>
                                      <a href="#">rapport.pdf</a>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Typography>
                        <Typography variant="body2" component="p" style={{marginTop:'20px'}}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography className={classes.heading}>Shared media content</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography >
                                        <div className='container-fluid'>
                                        <div className="row"  >
                                            <div className="col-4" style={{ paddingRight: '2px', paddingLeft: '2px', paddingBottom: '4px' }}>
                                                <img src="../assets/images/users/4.jpg" onClick={() => setIsOpen(true)}  className="rounded mx-auto d-block" style={{ height: '100px',width:'125px' }} />
                                            </div>
                                            <div className="col-4" style={{ paddingRight: '2px', paddingLeft: '2px', paddingBottom: '4px' }}>
                                                <img src="../assets/images/users/5.jpg" className=" rounded mx-auto d-block" style={{ height: '100px',width:'125px' }} />
                                            </div>
                                            <div className="col-4" style={{ paddingRight: '2px', paddingLeft: '2px', paddingBottom: '4px' }}>
                                                <img src="../assets/images/users/8.jpg" className="rounded mx-auto d-block" style={{ height: '100px',width:'125px'  }} />
                                            </div>
                                            <div className="col-4" style={{ paddingRight: '2px', paddingLeft: '2px', paddingBottom: '4px' }}>
                                                <img src="../assets/images/users/6.jpg" className="rounded mx-auto d-block" style={{ height: '100px',width:'125px' }} />
                                            </div>
                                        </div>
                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Typography>
                    </CardContent>

                </Card>
            </Paper>
        </div>
        </>
    );
}