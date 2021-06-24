import { FC } from 'react';
import { useLocation, NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { RootState } from '../../redux/store';
import { useAppSelector } from '../../redux/hooks';

const Header: FC = () => {
  const totalEntries: number = useAppSelector((state: RootState) => state.event.entries.length);
  const { pathname } = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="body1">
              TOKIGAMES
            </Typography>
          </Grid>
          <Grid item>
            <Grid container justify="space-between" spacing={1}>
              {pathname === '/events' ? null : (
                <Grid item>
                  <Typography variant="body1" align="center" data-test-id="header-events">
                    <NavLink to="/events" style={{ textDecoration: 'none', color: 'white' }} data-test-id="events-link">Events</NavLink>
                  </Typography>
                </Grid>
              )}
              <Grid item>
                <Typography variant="body1" align="center" data-test-id="header-about">
                  <NavLink to="/about" style={{ textDecoration: 'none', color: 'white' }} data-test-id="about-link">About Us</NavLink>
                </Typography>
              </Grid>
              {pathname === '/about' ? null : (
                <Grid item>
                  <Typography variant="body1" align="center" data-test-id="header-entries">
                    Events ({totalEntries} Entries)
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header