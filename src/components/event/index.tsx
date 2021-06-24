import { FC } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Event } from '../../module/events/eventsSlice';

const useStyles = makeStyles({
  root: {
    maxWidth: 480,
    margin: '0 auto',
    marginBottom: 15,
  },
  selected: {
    backgroundColor: '#D6D6D6',
  },
  action: {
    flexDirection: 'row-reverse'
  },
});

interface EventCardProps {
  event: Event;
  handleClick: (eventId: string) => void;
  selected: boolean;
}

const EventCard: FC<EventCardProps> = ({ event, selected, handleClick }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, {
        [classes.selected]: selected,
      })}
      raised
    >
      <CardActionArea onClick={() => handleClick(event.eventID)}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <strong>{event.name}</strong>
          </Typography>
          <Typography variant="body2" gutterBottom align="left" component="p">
            <strong>Status:</strong> {event.eventStatus}
          </Typography>
          <Typography variant="body2" gutterBottom align="left" component="p">
            <strong>Go Live At:</strong> {new Date(event.goLiveAt).toLocaleString()}
          </Typography>
          <Typography variant="body2" gutterBottom align="left" component="p">
            <strong>Tournament:</strong> {event.tournament.name}
          </Typography>
          <Typography variant="body2" gutterBottom align="left" component="p">
            <strong>Match Series:</strong> {event.matchSeries}
          </Typography>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="body2" gutterBottom align="left" component="p">
                <strong>Prize Pools:</strong>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                Winnings Prize: {event.prizePools.winningsPrizePoolAmount}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                Bonus Prize: {event.prizePools.bonusPrizePoolAmount}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.action}>
        <Button
          size="small"
          color={!selected ? "primary" : "secondary"}
          onClick={() => {
            handleClick(event.eventID);
          }}
          data-test-id="action-button"
        >
          {selected ? 'Remove from Entries' : 'Add to Entries'}
        </Button>
      </CardActions>
    </Card>
  );
}

export default EventCard;