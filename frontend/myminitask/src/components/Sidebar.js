import React, { useState } from "react";
import {
  useMediaQuery,
  ListItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  Link,
  Box,
} from "@mui/material";
import NewQuestionForm from "./NewQuestionForm";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import routes from "../config/Config";

const Sidebar = ({ onNewQuestion, user }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
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

  const commonSx = {
    borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "10px",
    color: "black",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      color: "white",
    },
  };

  return (
    <>
      {isMobile ? (
        <>
          <Container style={{ padding: 0 }}>
            {user.role === "student" && (
              <>
                <ListItem>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleDialogOpen}
                    style={{ width: "200px", top: "80px" }}
                  >
                    <AddIcon fontSize="small" /> Create Question
                  </Button>
                </ListItem>
              </>
            )}
            {user.role === "admin" && (
              <>
                <ListItem>
                  <Button variant="contained" fullWidth>
                    Manage Questions
                  </Button>
                </ListItem>
                <ListItem>
                  <Button variant="contained" fullWidth>
                    Manage Interns
                  </Button>
                </ListItem>
              </>
            )}
          </Container>
        </>
      ) : (
        <Container
          style={{
            padding: 0,
            backgroundColor: "#aca9",
            marginTop: "65px",
            height: "100vh",
            width: "220px",
            position: "fixed",
          }}
        >
          {user.role === "student" && (
            <>
              <Link to={routes.home} style={{ textDecoration: 'none' }}>
                <ListItem fullWidth sx={commonSx}>
                  <HomeIcon
                    fontSize="small"
                    sx={{ padding: "1px", marginRight: "8px" }}
                  />{" "}
                  HOME
                </ListItem>

              </Link>
              <ListItem fullWidth onClick={handleDialogOpen} sx={commonSx}>
                <AddIcon
                  fontSize="small"
                  sx={{ padding: "1px", marginRight: "8px" }}
                />{" "}
                CREATE QUESTION
              </ListItem>
            </>
          )}
          {user.role === "admin" && (
            <>
              <ListItem fullWidth sx={commonSx}>
                <QuestionAnswerIcon
                  fontSize="small"
                  sx={{ padding: "1px", marginRight: "8px" }}
                />{" "}
                QUESTIONS
              </ListItem>
              <ListItem fullWidth onClick={handleDialogOpen} sx={commonSx}>
                <AddIcon
                  fontSize="small"
                  sx={{ padding: "1px", marginRight: "8px" }}
                />{" "}
                MANAGE INTERNS
              </ListItem>
            </>
          )}
        </Container>
      )}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Do you have any questions ?</DialogTitle>
        <DialogContent>
          <NewQuestionForm
            onQuestionSubmit={handleQuestionSubmit}
            user={user}
          />
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
