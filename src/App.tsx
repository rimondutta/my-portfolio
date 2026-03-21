import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
import { LoadingProvider } from "./context/LoadingProvider";
import { Analytics } from "@vercel/analytics/react";

const Home = () => (
  <Suspense>
    <MainContainer>
      <Suspense>
        <CharacterModel />
      </Suspense>
    </MainContainer>
  </Suspense>
);

import { HelmetProvider } from "react-helmet-async";

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <Analytics />
        <LoadingProvider>
          <Suspense fallback={<div className="loading-screen">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
            </Routes>
          </Suspense>
        </LoadingProvider>
      </Router>
    </HelmetProvider>
  );
};

export default App;
