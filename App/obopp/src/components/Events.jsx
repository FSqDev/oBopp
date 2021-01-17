import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

export default function Events({eventList}) {
  console.log(eventList)

  return (
    <React.Fragment>
      <Title>Recent Events</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Camera</TableCell>
            <TableCell>Detection(s)</TableCell>
            <TableCell align="right">Action Taken</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventList.map((event) => (
            <TableRow key={event._id}>
              <TableCell>{event.date}</TableCell>
              <TableCell>{event.time}</TableCell>
              <TableCell>{event.cameraId}</TableCell>
              <TableCell>{event.detections}</TableCell>
              <TableCell align="right">{event.actionTaken}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}