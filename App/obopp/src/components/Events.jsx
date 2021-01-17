import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, time, camera, detection, actionsTaken) {
  return { id, date, time, camera, detection, actionsTaken};
}

const rows = [
  createData(0, '16 Mar, 2019', '12:30', 'Camera Capture 1', 'Dog', 'None'),
  createData(1, '16 Mar, 2019', '10:30', 'Camera Capture 2', 'Cat', 'None'),
  createData(2, '16 Mar, 2019', '18:12', 'Camera Capture 3', '', 'ALERT'),
  createData(3, '16 Mar, 2019', '17:45', 'Camera Capture 2', 'Person', 'ALERT'),
  createData(4, '15 Mar, 2019', '12:22', 'Camera Capture 1', 'Dog','None'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Events() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Events</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Camera</TableCell>
            <TableCell>Detection</TableCell>
            <TableCell align="right">Action Taken</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.camera}</TableCell>
              <TableCell>{row.detection}</TableCell>
              <TableCell align="right">{row.actionsTaken}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}