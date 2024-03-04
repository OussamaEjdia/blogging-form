import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ArticleList.css';

const ArticleList = ({ articles }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleContent = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='ar-list'>
      
      <div className='ar-search'>
        <h1 className='title-sea'>Enter your search</h1>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          id='Search-inp'
        />
      </div>
      <div className='card-ul'>
        <ul>
          {filteredArticles.map((article, index) => (
            <li key={article.id}>
              <Link to={`/art/${article.id}`}>
                <h2 onClick={() => toggleContent(index)}>
                  {article.title}
                </h2>
              </Link>
              <hr></hr>
              <p onClick={() => toggleContent(index)}>
                {article.content.substring(0, 300)}
                {article.content.length > 300 && '...'}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticleList;
