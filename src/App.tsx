import { JSX, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import NewsList from "./pages/NewsList";
import SpinLoader from "./components/SpinLoader";

const NewsPage = lazy(() => import("./pages/NewsPage"));

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<NewsList />} />
        <Route
          path="/:id"
          element={
            <Suspense fallback={<SpinLoader />}>
              <NewsPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
