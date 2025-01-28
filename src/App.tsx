import { JSX } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import NewsList from "./pages/NewsList";
import NewsPage from "./pages/NewsPage";

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<NewsList />} />
        <Route path="/:id" element={<NewsPage />} />
      </Route>
    </Routes>
  );
};

export default App;
