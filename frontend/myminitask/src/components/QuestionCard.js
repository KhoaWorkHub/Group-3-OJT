import React, { useState } from 'react';
import { Card, Typography, Button, TextField } from '@mui/material';

const QuestionCard = ({ question, onEdit, onDelete, onAdminResponse, user }) => {
  const [response, setResponse] = useState('');

  const handleResponseSubmit = () => {
    onAdminResponse(question.id, response);
    setResponse('');
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString();
  };

  return (
    <Card style={{ width: '350px', backgroundColor: 'aqua', margin: '10px', padding: "10px", opacity: question.disabled ? 0.5 : 1 }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Typography variant="h6">{question.title}</Typography>
        <Typography variant="body2">Asked by: {question.author}</Typography>
        <Typography variant="body2">Date: {question.date}</Typography>
        {question.adminResponse && (
          <>
            <Typography variant="body2">Admin Response: {question.adminResponse}</Typography>
            <Typography variant="body2">Response Date: {formatDate(question.answerAtDate)}</Typography>
          </>
        )}
        {user?.role === 'admin' && (
          <>
            <TextField
              label="Admin Response"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              style={{ marginTop: '10px' }}
            />
          </>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
          {user?.role === 'admin' && (
            <Button onClick={handleResponseSubmit} variant="contained" color="primary" style={{ width: '100%' }}>Submit Response</Button>
          )}
          {user?.role === 'student' && (
            <>
              <Button onClick={onEdit} variant="contained" color="primary" style={{ width: '100%' }}>Edit</Button>
              <Button onClick={onDelete} variant="contained" color="secondary" style={{ width: '100%' }}>Delete</Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default QuestionCard;