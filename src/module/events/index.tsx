import { useEffect, useState, ReactElement, FC, Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import EventCard from '../../components/event';
import { RootState } from '../../redux/store';
import { fetchEvents, Event, toggleEvent } from './eventsSlice';

const useStyles = makeStyles({
  root: {
    paddingTop: 20,
    textAlign: 'center',
    minHeight: 'calc(100vh - 148px)'
  },
  pagination: {
    display: 'inline-block',
    marginTop: 15,
    marginBottom: 15,
  }
});

const pagination = 10;

const EventList: FC<any> = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const events: Event[] = useAppSelector((state: RootState) => state.event.events);
  const entries: string[] = useAppSelector((state: RootState) => state.event.entries);
  const loading: boolean = useAppSelector((state: RootState) => state.event.loading);
  const [page, setPage] = useState(0);


  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleToggleEvent = (eventId: string) => {
    dispatch(toggleEvent(eventId));
  }

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page - 1);
  }

  const data: Event[] = events.slice(page * pagination, (page + 1) * pagination);

  return (
    <div className={classes.root}>
      {loading ? <CircularProgress /> : (
        <Fragment>
          {data.map((event: Event) => (
            <EventCard
              key={event.eventID}
              event={event}
              handleClick={handleToggleEvent}
              selected={entries.includes(event.eventID)}
            />
          ))}
          <Pagination
            count={Math.ceil(events.length / pagination)}
            page={page + 1}
            variant="outlined"
            shape="rounded"
            classes={{ root: classes.pagination }}
            onChange={handlePageChange}
          />
        </Fragment>
      )}
    </div>
  );
};
export default EventList;