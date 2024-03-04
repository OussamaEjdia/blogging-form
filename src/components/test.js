import React, { useState } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import './ArticleList.css';

const MyDocument = ({ title, content }) => (
  <Document>
    <Page style={styles.page}>
      <View>
        <Text>{title}</Text>
        <Text>{content}</Text>
      </View>
    </Page>
  </Document>
);

const ArticleList = ({ articles, setArticles }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [comments, setComments] = useState({});
  const [ratings, setRatings] = useState({});
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [editModeData, setEditModeData] = useState({ index: -1, content: '' });
  const [newComment, setNewComment] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCommentChange = (articleIndex, event) => {
    const { value } = event.target;
    setComments(prevComments => ({ ...prevComments, [articleIndex]: value }));
  };

  const handleAddComment = (articleIndex) => {
    setComments(prevComments => ({ ...prevComments, [articleIndex]: newComment }));
    setNewComment('');
  };

  const handleRatingChange = (articleIndex, rating) => {
    setRatings(prevRatings => ({ ...prevRatings, [articleIndex]: rating }));
  };

  const toggleContent = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  const handleEdit = (articleIndex, articleContent) => {
    setEditModeData({ index: articleIndex, content: articleContent });
  };

  const handleSave = (articleIndex) => {
    const updatedArticles = articles.map((article, index) => {
      if (index === articleIndex) {
        return { ...article, content: editModeData.content };
      }
      return article;
    });
    setArticles(updatedArticles);
    setEditModeData({ index: -1, content: '' });
  };

  const handleDelete = (articleIndex) => {
    const updatedArticles = articles.filter((article, index) => index !== articleIndex);
    setArticles(updatedArticles);
  };

  const renderStars = (articleIndex) => {
    const rating = ratings[articleIndex] || 0;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`Star ${i <= rating ? 'active' : ''}`}
          onClick={() => handleRatingChange(articleIndex, i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ArticleList">
      <h2>Liste des Articles</h2>
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredArticles && filteredArticles.map((article, index) => (
          <li key={index}>
            <h3 onClick={() => toggleContent(index)} className="ArticleTitle">{article.title}</h3>
            {editModeData.index === index ? (
              <>
                <textarea
                  value={editModeData.content}
                  onChange={(e) => setEditModeData({ ...editModeData, content: e.target.value })}
                  className="EditTextarea"
                />
                <button onClick={() => handleSave(index)} className="EditButton">Save</button>
              </>
            ) : (
              <p onClick={() => toggleContent(index)}>{article.content.substring(0, 100)}...</p>
            )}
            {expandedIndex === index && (
              <>
                <div>
                  <p>{article.content}</p>
                  <div>
                    <button onClick={() => handleEdit(index, article.content)} className="EditButton">Edit</button>
                    <button onClick={() => handleDelete(index)} className="DeleteButton">Delete</button>
                  </div>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="CommentInput"
                  />
                  <button onClick={() => handleAddComment(index)} className="AddButton">Add</button>
                  <div className="RateSection">
                    <p>Rate:</p>
                    {renderStars(index)}
                  </div>
                  <div className="CommentsSection">
                    {comments[index] && (
                      <div className="Comment">
                        <p>{comments[index]}</p>
                      </div>
                    )}
                  </div>
                  <PDFDownloadLink document={<MyDocument title={article.title} content={article.content} />} fileName={`${article.title}.pdf`} className="PDFDownloadLink">
                    {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
                  </PDFDownloadLink>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
});
