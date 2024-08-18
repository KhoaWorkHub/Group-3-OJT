import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  useMediaQuery,
  IconButton,
  Box,
  Tooltip,
  Popover,
  BottomNavigationAction,
  BottomNavigation,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteIcon from "@mui/icons-material/Favorite";
const QuestionCard = ({
  question,
  onEdit,
  onDelete,
  onAdminResponse,
  user,
}) => {
  const [response, setResponse] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleResponseSubmit = () => {
    onAdminResponse(question.id, response);
    setResponse("");
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };
  const handleIconClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Card
      sx={{
        margin: 2,
        opacity: question.disabled ? 0.5 : 1,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
        borderRadius: 5,
        cursor: 'pointer',
        position: "relative",
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.10)",
        },
        backgroundColor: "#faf8ff",
      }}
      onClick={handleCardClick}
    >
      <Tooltip title="Details" arrow>
        <IconButton
          onClick={handleIconClick}
          sx={{
            position: "absolute",
            right: 10,
          }}
        >
          <MoreHorizIcon />
        </IconButton>
      </Tooltip>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {question.title} ?
        </Typography>
        {isExpanded && user?.role === "student"&&(
          <>
            {question.adminResponse ? (
              <>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", fontSize: "20px", color: "green" }}
                >
                  The answer: {question.adminResponse}
                </Typography>
              </>
            ) : (
              <Typography
                variant="h6"
                color={"red"}
                sx={{ fontWeight: "bold" }}
              >
                OMG!! The question is not answered
              </Typography>
            )}
          </>
        )}
        {user?.role === "admin" && (
          <>
          {question.adminResponse ? (
              <>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", fontSize: "20px", color: "green" }}
                >
                  The answer: {question.adminResponse}
                </Typography>
              </>
            ) : (
              <Typography
                variant="h6"
                color={"red"}
                sx={{ fontWeight: "bold" }}
              >
                Submit answer to question !
              </Typography>
            )}
        </>
        )}
        {user?.role === "student" && (
          <>
            <Button
              onClick={onEdit}
              variant="contained"
              size="small"
              style={{
                margin: "20px 20px 0 5px",
                width: "90px",
                backgroundColor: "#00754b",
              }}
              startIcon={<EditNoteIcon />}
            >
              Edit
            </Button>
            <Button
              onClick={onDelete}
              variant="contained"
              size="small"
              borderRadius="10px"
              style={{
                marginTop: "20px",
                width: "90px",
                backgroundColor: "#413f3f",
              }}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </>
        )}
        {user?.role === "admin" && !question.adminResponse &&(
          <>
            <TextField
              label="Admin Response"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              fullWidth
              multiline
              rows={2}
              variant="outlined"
              style={{ marginTop: "10px" }}
            />
            <Button
              onClick={handleResponseSubmit}
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
            >
              Submit Response
            </Button>
          </>
        )}
      </CardContent>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Card sx={{ width: "250px" }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              Details
            </Typography>
            <Typography variant="body2">Asked by: {question.author}</Typography>
            <Typography variant="body2">
              Date: {formatDate(question.date)}
            </Typography>
            <Typography variant="body2">
              Answer Date: {formatDate(question.answerAtDate)}
            </Typography>
          </CardContent>
        </Card>
      </Popover>
    </Card>
  );
};
export default QuestionCard;
