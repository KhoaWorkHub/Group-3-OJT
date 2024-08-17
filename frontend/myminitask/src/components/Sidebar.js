import React, { useState } from 'react';
import { useMediaQuery, IconButton, Drawer, List, ListItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NewQuestionForm from './NewQuestionForm';
import { styled } from '@mui/material/styles';

const StyledSidebar = styled(List)(({ theme }) => ({
  backgroundColor: '#F5F5DC', // Màu vani
  width: '250px',
  padding: theme.spacing(2),
  top: 0,
  left: 0,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const UserInformation = styled(Typography)(({ theme }) => ({
  padding: '10px',
  fontWeight: 'bold',
  fontSize: '1.2rem',
}));

const Sidebar = ({ onNewQuestion, user }) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleQuestionSubmit = (newQuestion) => {
    onNewQuestion(newQuestion);
    handleDialogClose();
  };

  const sidebarContent = (
    <StyledSidebar component="nav" className="sidebar">
      {user.role === 'admin' ? (
        <>
          <Typography variant="h6" gutterBottom align="center" fontWeight="bold">
            User Information
          </Typography>
          <UserInformation variant="body2">
            <Typography variant="body2" gutterBottom fontWeight="bold">Name: {user.name}</Typography>
            <Typography variant="body2" gutterBottom fontWeight="bold">Email: {user.email}</Typography>
            <Typography variant="body2" gutterBottom fontWeight="bold">Role: {user.role}</Typography>
          </UserInformation>
        </>
      ) : (
        <>
          <Typography variant="h6" gutterBottom align="center" fontWeight="bold">
            Manage Questions
          </Typography>
          {user.role === 'student' && (
            <StyledListItem>
              <Button variant="contained" fullWidth style={{ backgroundColor: 'white', color: 'black' }} onClick={handleDialogOpen}>Submit Question</Button>
            </StyledListItem>
          )}
          <Divider />
          <Typography variant="h6" gutterBottom align="center" fontWeight="bold">
            User Information
          </Typography>
          <UserInformation variant="body2">
            <Typography variant="body2" gutterBottom fontWeight="bold">Name: {user.name}</Typography>
            <Typography variant="body2" gutterBottom fontWeight="bold">Email: {user.email}</Typography>
            <Typography variant="body2" gutterBottom fontWeight="bold">Role: {user.role}</Typography>
          </UserInformation>
        </>
      )}
    </StyledSidebar>
  );

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            className="menuButton"
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            {sidebarContent}
          </Drawer>
        </>
      ) : (
        sidebarContent
      )}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Submit a New Question</DialogTitle>
        <DialogContent>
          <NewQuestionForm onQuestionSubmit={handleQuestionSubmit} user={user} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sidebar;