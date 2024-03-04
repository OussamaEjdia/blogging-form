import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, View, Text } from '@react-pdf/renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { faThumbsUp, faThumbsDown, faHeart, faComment, faEdit,  faHome } from '@fortawesome/free-solid-svg-icons';
import "./Art.css"

const MyDocument = ({ title, content }) => (
  <Document>
    <Page>
      <View>
        <Text>{title}</Text>
        <Text>{content}</Text>
      </View>
    </Page>
  </Document>
);

const Art = ({ articles, editArticle, deleteArticle }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [reactionCounts, setReactionCounts] = useState({
    thumbsUp: 0,
    thumbsDown: 0,
    heart: 0,
  });

  const { id } = useParams();
  const article = articles.find(article => article.id === parseInt(id));
  
  if (!article) {
    return <div>Article not found</div>;
  }

  const handleEdit = () => {
    setEditMode(true);
    setEditedContent(article.content); // Set the initial value of the edited content
  };

  const handleSave = () => {
    editArticle(parseInt(id), { ...article, content: editedContent });
    setEditMode(false);
  };

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  const handleReaction = (reaction) => {
    setReactionCounts(prevCounts => ({
      ...prevCounts,
      [reaction]: prevCounts[reaction] + 1,
    }));
  };

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      const newComment = {
        id: comments.length + 1,
        content: comment,
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  return (
    
    <div className='ArtContainer' >
      <Link to="/box1" id='home1'><FontAwesomeIcon icon={faHome} /> Home</Link>
      <h1>{article.title}</h1>
      {editMode ? (
        <div>
          <textarea value={editedContent} onChange={handleContentChange} />
          <button onClick={handleSave} className="button-animation" >Save</button>
        </div>
      ) : (
        <div>
          <div className='text-article'>
            <p>{article.content}</p> {/* Displaying only a part of content */}
          </div>
          <div className='reaction-container'>
            <FontAwesomeIcon icon={faThumbsUp} onClick={() => handleReaction('thumbsUp')} className='icon A' />
            <span>{reactionCounts.thumbsUp}</span>
            <FontAwesomeIcon icon={faThumbsDown} onClick={() => handleReaction('thumbsDown')} className='icon B'/>
            <span>{reactionCounts.thumbsDown}</span>
            <FontAwesomeIcon icon={faHeart} onClick={() => handleReaction('heart')} className='icon C'/>
            <span>{reactionCounts.heart}</span>
          </div>

          
          <div className='btn-E-D'>
            <button onClick={handleEdit}><FontAwesomeIcon icon={faEdit} className='btn'/>Edit</button>
            <button onClick={() => deleteArticle(article.id)}><FontAwesomeIcon icon={faTrash} className='btn' />Delete</button>
          

          
          <PDFDownloadLink document={<MyDocument title={article.title} content={article.content} />} fileName={`${article.title}.pdf`} className="PDFDownloadLink">
            {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
          </PDFDownloadLink>
          </div>
          
          
          <div className='div-comments' >
            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment..."  className='comments'/>
            <button onClick={handleAddComment}><FontAwesomeIcon icon={faComment} /></button>
          </div>
          <div className='comments-container'>
            <h3>Comments</h3>
              {comments.map((comment) => (
              <div key={comment.id} className='p-comments'>
                <p>{comment.content}</p>
              </div>
              ))}
              </div>

        </div>
      )}
      
    </div>
  );
};

export default Art;
