import React, { useState } from 'react';
import { MdAdd } from "react-icons/md";
import { TbCircleArrowLeftFilled } from "react-icons/tb";
import './ArticleForm.css'; // Import the CSS file

const ArticleForm = ({ addArticle }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Check if either title or content is empty
        if (!title.trim() || !content.trim()) {
            // If either is empty, don't save and display an alert message
            alert("Please enter both title and content before submitting.");
            return;
        }
        
        // Handle form submission logic here
        console.log('Form submitted:', { title, content });
        
        addArticle({ id: Date.now(), title, content }); 
        
        setTitle('');
        setContent('');
    };

    const handleClear = () => {
        
        setTitle('');
        setContent('');
    };
    
    return (
        <div className='a1'>
            <div className='article'>
                <form className="form-container" onSubmit={handleSubmit}>
                    <h1 className='h1_forme'>Take your freedom to write</h1>
                    <input type="text" placeholder="Enter your article title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <textarea placeholder="Type your article ..." value={content} onChange={(e) => setContent(e.target.value)} />
                    <div className='continar-btn' >
                        <button type="submit"><MdAdd className="submit-icon"/> Add </button>
                        <button type="button" onClick={handleClear} className='button-Clear' ><TbCircleArrowLeftFilled className="submit-icon"/> Clear</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ArticleForm;
