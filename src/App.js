// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ArticleList from './components/ArticlListe';
import ArticleForm from './components/ArticlForm';
import Art from './components/Art';
import articlesData from './components/data'; // Importing data file

import './App.css';

const App = () => {
  const [articles, setArticles] = useState(articlesData);

  const addArticle = (article) => {
    setArticles([...articles, article]);
  };

  const deleteArticle = (id) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  const editArticle = (id, updatedArticle) => {
    setArticles(articles.map(article => article.id === id ? updatedArticle : article));
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/box1" element={<ArticleList articles={articles} deleteArticle={deleteArticle} editArticle={editArticle} />} />
          <Route path="/box2" element={<ArticleForm addArticle={addArticle} />} />
          <Route path="/art/:id" element={<Art articles={articles} editArticle={editArticle} deleteArticle={deleteArticle} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
