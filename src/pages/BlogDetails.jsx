import React, { useState } from "react";
import styled from "styled-components";
import { mostVisited } from "../data/blog-data";

const BlogDetails = ({ blog }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [reactions, setReactions] = useState({ like: 0, love: 0, laugh: 0, fire: 0 });

  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, { text: newComment, replies: [] }]);
      setNewComment("");
    }
  };

  const handleReplySubmit = (index, replyText) => {
    const updatedComments = [...comments];
    updatedComments[index].replies.push(replyText);
    setComments(updatedComments);
  };

  const handleReaction = (type) => {
    setReactions({ ...reactions, [type]: reactions[type] + 1 });
  };

  return (
    <BlogContainer>
      <MainContent>
        <h1>{blog?.title || "This is the title" }</h1>
        <BlogImage src={blog?.image || 'htp'} alt={blog?.title} />
        <BlogDate>{blog?.date || "8/12/12"}</BlogDate>
        <p>{blog?.content || "This is the content"}</p>

        <Reactions>
          {Object.entries(reactions).map(([key, value]) => (
            <ReactionButton key={key} onClick={() => handleReaction(key)}>
              {key === "like" ? "👍" : key === "love" ? "❤️" : key === "laugh" ? "😂" : "🔥"} {value}
            </ReactionButton>
          ))}
        </Reactions>

        <CommentSection>
          <h2>Comments</h2>
          <CommentInput>
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleCommentSubmit}>Post</button>
          </CommentInput>
          {comments.map((comment, index) => (
            <Comment key={index}>
              <p>{comment.text}</p>
              <ReplyInput>
                <input
                  type="text"
                  placeholder="Reply..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value.trim() !== "") {
                      handleReplySubmit(index, e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
              </ReplyInput>
              {comment.replies.map((reply, idx) => (
                <Reply key={idx}>{reply}</Reply>
              ))}
            </Comment>
          ))}
        </CommentSection>
      </MainContent>

      <Sidebar>
        <h2>Most Visited</h2>
        {mostVisited.map((blog) => (
          <SidebarItem key={blog.id}>
            <img src={blog.image} alt={blog.title} />
            <a href={`/blog/${blog.id}`}>{blog.title}</a>
          </SidebarItem>
        ))}
      </Sidebar>
    </BlogContainer>
  );
};

// Styled Components
const BlogContainer = styled.div`
  display: flex;
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
  background: var(--white);
`;

const MainContent = styled.div`
  flex: 3;
  padding-right: 2rem;
`;

const BlogImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const BlogDate = styled.p`
  font-size: 0.9rem;
  color: var(--gray);
  margin-bottom: 1rem;
`;

const Reactions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 1rem;
`;

const ReactionButton = styled.button`
  border: none;
  background: transparent;
  font-size: 1.2rem;
  cursor: pointer;
`;

const CommentSection = styled.div`
  margin-top: 2rem;
`;

const CommentInput = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid var(--gray);
    border-radius: 5px;
  }

  button {
    background: var(--primary-color);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 5px;
  }
`;

const Comment = styled.div`
  background: var(--light-gray);
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const ReplyInput = styled.div`
  margin-top: 0.5rem;
  input {
    width: 100%;
    padding: 0.3rem;
    border: 1px solid var(--gray);
    border-radius: 5px;
  }
`;

const Reply = styled.p`
  margin-left: 1rem;
  font-size: 0.9rem;
  color: var(--dark-gray);
`;

const Sidebar = styled.div`
  flex: 1;
  background: var(--light-gray);
  padding: 1rem;
  border-radius: 10px;
  height: fit-content;
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }

  a {
    text-decoration: none;
    color: var(--primary-color);
    font-weight: bold;
  }
`;

export default BlogDetails;