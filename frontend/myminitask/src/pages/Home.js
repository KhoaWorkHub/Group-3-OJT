import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import MainContent from './../components/MainContent';
import Sidebar from '../components/Sidebar';
export default function Home() {
    const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get('http://localhost:3001/questions');
      setQuestions(response.data);
    };

    fetchQuestions();
  }, []);

  const handleNewQuestion = (newQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleUpdateQuestion = (updatedQuestion) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  };

  const handleAdminResponse = (questionId, response) => {
    const updatedQuestions = questions.map((q) =>
      q.id === questionId ? { ...q, adminResponse: response, responseDate: new Date().toISOString() } : q
    );
    setQuestions(updatedQuestions);
  };

  const filteredQuestions = questions.filter((q) => !q.disabled);

  const userFilteredQuestions = user?.role === 'student'
    ? filteredQuestions.filter((q) => q.author === user.email)
    : filteredQuestions;
  return (
    <div className="container">
        <div className="sidebarContainer">
          {user ? (
            <Sidebar onNewQuestion={handleNewQuestion} user={user} />
          ) : (
            <></>
          )}
        </div>
        <div className="mainContent">
          {userFilteredQuestions.length > 0 ? (
            <MainContent
              questions={userFilteredQuestions}
              onUpdateQuestion={handleUpdateQuestion}
              onAdminResponse={handleAdminResponse}
              user={user}
            />
          ) : (
            <p>No questions found for this user.</p>
          )}
        </div>
      </div>
  )
}
