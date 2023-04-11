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
import { useGetProjectsQuery, useDeleteProjectsMutation, useAddProjectsMutation, useUpdateProjectsMutation, } from "state/api";


const Project = ({
  _id,
  Name:initialName,
  image:initialImage,
  tickets,
  ticketsByUser
  
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectsMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectsMutation();
  const [Name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);


  const handleDelete = async () => {
    try {
      await deleteProject(_id);
      enqueueSnackbar("Project deleted successfully", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Failed to delete project", { variant: "error" });
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const updatedProject = { Name, image };
    try {
      await updateProject({ id: _id, project: updatedProject });
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
          <Typography>all tickets: {tickets}</Typography>
          <Typography>tickets by user: {ticketsByUser}</Typography>


          
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
                sx={{ marginRight: '1rem' }}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                size="big"
                color="neutral"
                onClick={handleDelete}
                disabled={isDeleting}
              >
               Delete
              </Button>
            </Box>
          </form>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const ProjectForm = ({ onSubmit }) => {
  const [Name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);



  

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ Name: Name, image: image });
    setName("");
    setImage("");
  };

  return (

  <Card>
    <form onSubmit={handleSubmit}>
      <CardActions>
       <Button type="submit" variant="contained" color="secondary" onClick={() => setIsExpanded(!isExpanded)}>
        Add Project
       </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        
      >
       <CardContent>
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
        </CardContent>
      </Collapse>
      
    </form>
  </Card>

  );
};


const Projects = () => {
  const { data, isLoading, isError } = useGetProjectsQuery();
  const [addProject, { isLoading: isAddingProject }] = useAddProjectsMutation();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const { enqueueSnackbar } = useSnackbar();

const handleAddProject = async (project) => {
    try {
      await addProject(project).unwrap();
      enqueueSnackbar("Project added successfully.", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
}; 
  
  

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PROJECTS" subtitle="see your list of projects" />
      {isError && <div>Error fetching projects</div>}
      <ProjectForm onSubmit={handleAddProject} />
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
              tickets,
              ticketsByUser
      
            }) => (
              <Project
                key={_id}
                _id={_id}
                Name={Name}
                image={image}
                tickets ={tickets}
                ticketsByUser={ticketsByUser}

        
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