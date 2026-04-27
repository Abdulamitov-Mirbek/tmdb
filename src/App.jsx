import React from "react";
import Header from "./components/layout/header/Header";
import Popular from "./components/pages/popular/Popular";
import TopRated from "./components/pages/topRated/TopRated";
import Home from "./components/pages/home/Home";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/layout/footer/Footer";

const App = () => {
  let routes = [
    {
      id: 1,
      link: "/",
      element: <Home />,
    },
    {
      id: 2,
      link: "/popular",
      element: <Popular />,
    },
    {
      id: 3,
      link: "/topRated",
      element: <TopRated />,
    },
  ];

  return (
    <div id="app">
      <div className="container">
        <div className="app">
          <Header />
          <Routes>
            {routes.map((route) => (
              <Route key={route.id} path={route.link} element={route.element} />
            ))}
          </Routes>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
