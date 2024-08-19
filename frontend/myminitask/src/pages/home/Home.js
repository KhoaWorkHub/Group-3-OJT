import React, { useContext } from "react";
import { useState, useEffect } from "react";
import MainContent from "../../components/MainContent";
import Sidebar from "../../components/Sidebar";
import { Auth } from './../../global/AuthContext';
import { viewQuestions } from "../../services/ViewQuestion";
import '../../App.css'
export default function Home() {
    const [questions, setQuestions] = useState([]);
    const auth = useContext(Auth);

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await viewQuestions();
            setQuestions(response)
        };

        fetchQuestions();
    }, []);

    const handleNewQuestion = (newQuestion) => {
        setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    };

    const handleUpdateQuestion = (updatedQuestion) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
                q.id === updatedQuestion.id ? updatedQuestion : q
            )
        );
    };

    const handleAdminResponse = (questionId, response) => {
        const updatedQuestions = questions.map((q) =>
            q.id === questionId
                ? {
                      ...q,
                      adminResponse: response,
                      responseDate: new Date().toISOString(),
                  }
                : q
        );
        setQuestions(updatedQuestions);
    };

    const filteredQuestions = questions.filter((q) => !q.disabled);

    const userFilteredQuestions =
    auth?.userAuth?.role === "student"
            ? filteredQuestions.filter((q) => q.author === auth?.userAuth?.email)
            : filteredQuestions;
    return (
        <div className="container">
            <div>
                {auth?.userAuth ? (
                    <Sidebar onNewQuestion={handleNewQuestion} user={auth?.userAuth} />
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
                        user={auth?.userAuth}
                    />
                ) : (
                    <p>No questions found for this user.</p>
                )}
            </div>
        </div>
    );
}
