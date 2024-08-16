import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  useMediaQuery,
} from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from '@mui/icons-material/EditNote';
const QuestionCard = ({
  question,
  onEdit,
  onDelete,
  onAdminResponse,
  user,
}) => {
  const [response, setResponse] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

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
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
      <Card
      sx={{
        padding: 3,
        margin: 2,
        opacity: question.disabled ? 0.5 : 1,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
        borderRadius: 5,
        cursor: "pointer",
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.10)",
        },
        backgroundColor: "#DACEFC",
      }}
      onClick={handleCardClick}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {question.title} ?
        </Typography>
        <Typography variant="body2">Asked by: {question.author}</Typography>
        <Typography variant="body2">
          Date: {formatDate(question.date)}
        </Typography>
        {isExpanded && (
          <>
            {question.adminResponse ? (
              <>
                <Typography
                  variant="h6"
                  color={"green"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  Answer
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", fontSize: "20px" }}
                >
                  {question.adminResponse}
                </Typography>
                <Typography variant="body2">
                  Answer Date: {formatDate(question.answerAtDate)}
                </Typography>
              </>
            ) : (
              <Typography
                variant="h6"
                color={"red"}
                sx={{ fontWeight: "bold" }}
              >
                OMG!! Your question is not answered
              </Typography>
            )}
          </>
        )}
        {user?.role === "student" && (
          <>
            <Button
              onClick={onEdit}
              variant="contained"
              color="primary"
              size="small"
              style={{ margin: "20px 20px 0 5px", width:"90px" }}
              startIcon={<EditNoteIcon />}
            >
              Edit
            </Button>
            <Button
              onClick={onDelete}
              variant="contained"
              color="error"
              size="small"
              style={{ marginTop: "20px",width:"90px" }}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </>
        )}
        {user?.role === "admin" && (
          <>
            <TextField
              label="Admin Response"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              fullWidth
              multiline
              rows={4}
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
    </Card>
  );
};

export default QuestionCard;
