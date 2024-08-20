import React, { useState } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';

const EditQuestionForm = ({ question, onUpdateQuestion }) => {
  const [title, setTitle] = useState(question.title);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedQuestion = { ...question, title };

    // Gửi dữ liệu cập nhật đến JSON Server
    const response = await fetch(`http://localhost:3001/questions/${question.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedQuestion),
    });

    if (response.ok) {
      const updatedQuestionFromServer = await response.json();
      onUpdateQuestion(updatedQuestionFromServer);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, width: 400, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          multiline // Enable multiline input
          rows={4} // Set the number of rows
        />
        <Button type="submit" variant="contained">Update</Button>
      </Box>
    </Paper>
  );
};

export default EditQuestionForm;