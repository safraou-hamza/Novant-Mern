import React from 'react';
import { withStyles, Typography } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green} from '@material-ui/core/colors';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1877F2',
    }
  },
});



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    paddingTop:'6px' ,
    paddingBottom:'6px'

  },

  avatar: {
    backgroundColor: green[500],
  },

  rounded: {
    color: '#fff',
    height: '40px',
    width: '40px',
    backgroundColor: green[500],
    cursor: 'pointer',
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


const StyledBadge = withStyles((theme) => ({
  badge: {
    left: '190%',
    top: '50%',

    border: '3px solid',
    borderColor: '#F8FAFB',
    padding: '0px',
    borderRadius: '15px',
    width: theme.spacing(4),
    height: theme.spacing(4),
  },

}))(Badge);

//Onclick on badge ,colors,remove caps on buttons



export default function Contacts() {
  const classes = useStyles();

  return (<>
    <div className={classes.root} style={{ marginTop: '10px', flexDirection: 'column' }}>
      <MuiThemeProvider theme={theme}>
        <div style={{ width: '360px' }}>
          <StyledBadge badgeContent={68} color="primary">
            <div style={{ marginLeft: '-140%' }}>

              <Typography style={{ color: 'grey', fontSize: '12', fontWeight: 'bold' }} >CONTACTS</Typography>
            </div>
          </StyledBadge>
        </div>

      </MuiThemeProvider>
    </div>




  </>
  );





}