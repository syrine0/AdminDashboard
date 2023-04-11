import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetTicketsQuery } from "state/api";

const Ticket = ({
  _id,
  Name,
  Description,
  Date,
  Priority,
  image,
  ProjectName,
  UserName,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        
        <Typography variant="h5" component="div" >
        <span style={{ fontFamily: 'Arial', fontWeight: 600 , color: '#555'}}>Name: </span> {Name}
        </Typography>
        <Typography variant="h5" component="div">
        <span style={{ fontFamily: 'Arial', fontWeight: 600, color: '#555'}}>Priority: </span><span style={{ color: Priority.toLowerCase() === 'high' ? 'red' : Priority.toLowerCase() === 'medium' ? 'green' :'yellow' }}>{Priority}</span>
        </Typography>
        <Typography variant="h5" component="div">
        <span style={{ fontFamily: 'Arial', fontWeight: 600, color: '#555'}}>Description:</span> {Description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>UserName: {UserName}</Typography>
          <Typography>ProjectName: {ProjectName}</Typography>
          <Typography>Date: {Date}</Typography>
          <Typography>image: {image}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Tickets = () => {
  const { data, isLoading } = useGetTicketsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TICKETS" subtitle="See your list of tickets." />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({
              _id,
              Name,
              Description,
              Date,
              Priority,
              image,
              ProjectName,
              UserName,
            }) => (
              <Ticket
                key={_id}
                _id={_id}
                Name={Name}
                Description={Description}
                Date={Date}
                Priority={Priority}
                image={image}
                ProjectName= {ProjectName}
                UserName = {UserName}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Tickets;