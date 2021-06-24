import { FC } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Footer: FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Typography variant="body2" align="center">
              Copyright &#169; 2021 All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;