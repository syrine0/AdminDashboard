import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {  useSnackbar } from "notistack";
import Header from "components/Header";
import {useUpdateProjectsMutation } from "state/api";


const Project = ({
  _id,
  Name:initialName,
  image:initialImage
  
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectsMutation();
  const [Name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);


  

  const handleEdit = async (e) => {
    e.preventDefault();
    const updatedProject = { Name, image };
    try {
      await updateProject({ _id, ...updatedProject });
      enqueueSnackbar("Project updated successfully", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Failed to update project", { variant: "error" });
    }
  };

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        
        <Typography variant="h5" component="div">
          {Name}
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
          <Typography>image: {image}</Typography>
          <form onSubmit={handleEdit}>
            <TextField
              label="Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <Box mt="1rem">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isUpdating}

              >
                Update
              </Button>
            </Box>
          </form>
        </CardContent>
      </Collapse>
    </Card>
  );
};



  

  

  

const Projects = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const { enqueueSnackbar } = useSnackbar();


  

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PROJECTS" subtitle="see your list of projects" />
      {isError && <div>Error fetching projects</div>}
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
              image,
      
            }) => (
              <Project
                key={_id}
                _id={_id}
                Name={Name}
                image={image}
        
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

export default Projects;