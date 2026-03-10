import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
import { LoadingProvider } from "./context/LoadingProvider";

const Home = () => (
  <Suspense>
    <MainContainer>
      <Suspense>
        <CharacterModel />
      </Suspense>
    </MainContainer>
  </Suspense>
);

const App = () => {
  return (
    <Router>
      <LoadingProvider>
        <Suspense fallback={<div className="loading-screen">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
          </Routes>
        </Suspense>
      </LoadingProvider>
    </Router>
  );
};

export default App;
