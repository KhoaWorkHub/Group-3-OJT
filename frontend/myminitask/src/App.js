import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import publicRoutes from "./routes/Routes";
import MainLayout from "./layout/mainLayout/MainLayout";
export default function App() {
    return (
        <Router>
            <Routes>
                {publicRoutes.map((item, index) => {
                    let Layout = MainLayout;
                    if (item.layout) {
                        Layout = item.layout;
                    } else if (item.layout === null) {
                        Layout = Fragment;
                    }
                    const Page = item.component;
                    return (
                        <Route
                            key={index}
                            path={item.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}
