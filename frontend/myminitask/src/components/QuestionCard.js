import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  IconButton,
  Tooltip,
  Popover,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(question.title);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleResponseSubmit = () => {
    onAdminResponse(question.id, response);
    setResponse("");
  };

  const handleEdit = () => {
    if (isEditing) {
      onEdit({ ...question, title: editedTitle });
    }
    setIsEditing(!isEditing);
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
        cursor: "pointer",
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
            justifyContent: "flex-end",
          }}
        >
          <MoreHorizIcon />
        </IconButton>
      </Tooltip>
      <CardContent>
        {isEditing ? (
          <TextField
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
            autoFocus
          />
        ) : (
          <Typography variant="h6" fontWeight="bold">
            {question.title} ?
          </Typography>
        )}
        {isExpanded && user?.role !== "admin" && (
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
        {user?.role === "student" && (
          <>
          <Button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              variant="contained"
              size="small"
              style={{
                marginTop: "20px",
                backgroundColor: "#673ab7",
                color: "white",
                marginRight:"10px"
              }}
              startIcon={<EditNoteIcon />}
            >
              Edit
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteConfirm(true);
              }}
              variant="contained"
              size="small"
              style={{
                marginTop: "20px",
                backgroundColor: "#f44336",
                color: "white",
              }}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              variant="contained"
              size="small"
              style={{
                marginTop: "20px",
                backgroundColor: "#673ab7",
                color: "white",
              }}
              startIcon={<EditNoteIcon />}
            >
              Edit
            </Button>
            <TextField
              label="Your answer"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ mt: 2 }}
              disabled={Boolean(question.adminResponse)}
            />
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleResponseSubmit();
              }}
              variant="contained"
              color="primary"
              style={{
                marginTop: "20px",
                backgroundColor: "#6200ea",
                color: "white",
              }}
            >
              Answer
            </Button>
          </>
        )}
      </CardContent>

      {/* Popover with the Edit and Delete buttons */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Button
          variant="text"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(!isEditing);
            handleClose();
          }}
          startIcon={<EditNoteIcon />}
        >
          Edit
        </Button>
        <Button
          variant="text"
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            setShowDeleteConfirm(true);
            handleClose();
          }}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </Popover>

      {/* Confirmation dialog for deleting */}
      <Dialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this question?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteConfirm(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onDelete(question.id);
              setShowDeleteConfirm(false);
            }}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
export default QuestionCard;
