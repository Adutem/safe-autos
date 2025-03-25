import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom
import { getBlog, trackBlogView, getAllBlogs } from "../api/blog"; // Import getBlog, trackBlogView, and getAllBlogs API functions

const BlogDetails = () => {
  const { blogId } = useParams(); // Use useParams to get blogId from the URL
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [reactions, setReactions] = useState({ like: 0, love: 0, laugh: 0, fire: 0 });
  const [mostVisited, setMostVisited] = useState([]); // Add state for most visited blogs

  const fetchBlogDetails = async () => {
    try {
      const data = await getBlog(blogId);
      setBlog(data.blog);
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
  };

  const fetchMostVisitedBlogs = async () => {
    try {
      const data = await getAllBlogs(); // Fetch all blogs
      const sortedBlogs = [...data.blogs].sort((a, b) => b.views - a.views); // Sort by views
      setMostVisited(sortedBlogs.slice(0, 5)); // Take the top 5 most viewed blogs
    } catch (error) {
      console.error("Error fetching most visited blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogDetails().then(() => {
      trackBlogView(blogId); // Call the API function to track the blog view
    });
    fetchMostVisitedBlogs(); // Fetch most visited blogs
  }, [blogId]);

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
        <Title>{blog?.title}</Title>
        <BlogImage src={blog?.thumbNail?.downloadUrl} alt={blog?.title} />
        <BlogDate>{new Date(blog?.publicationDate).toLocaleDateString()}</BlogDate>
        <Introduction>{blog?.shortIntroduction}</Introduction>

        {blog?.blogContents?.map((content, index) => {
          switch (content.type) {
            case "heading":
              return <ContentHeading key={index}>{content.textContent}</ContentHeading>;
            case "paragraph":
              return <ContentParagraph key={index}>{content.textContent}</ContentParagraph>;
            case "list":
              return (
                <ContentList key={index}>
                  {content.listContent.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ContentList>
              );
            case "image":
              return <ContentImage key={index} src={content.fileContent.downloadUrl} alt={content.fileContent.metadata.name} />;
            default:
              return null;
          }
        })}

        <Reactions>
          {Object.entries(reactions).map(([key, value]) => (
            <ReactionButton key={key} onClick={() => handleReaction(key)}>
              {key === "like" ? "👍" : key === "love" ? "❤️" : key === "laugh" ? "😂" : "🔥"} {value}
            </ReactionButton>
          ))}
        </Reactions>

        <CommentSection>
          <CommentHeading>Comments</CommentHeading>
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
        <SidebarHeading>Most Visited</SidebarHeading>
        {mostVisited.map((blog) => (
          <SidebarItem key={blog._id}>
            <img src={blog.thumbNail.downloadUrl} alt={blog.title} />
            <a href={`/blog/${blog._id}`}>{blog.title}</a>
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

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const MainContent = styled.div`
  flex: 3;
  padding-right: 2rem;

  @media (max-width: 768px) {
    padding-right: 0;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: var(--black);
  margin-bottom: 1rem;
`;

const BlogImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    max-height: 250px;
  }
`;

const ContentImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin: 1rem 0;

  @media (max-width: 768px) {
    max-height: 200px;
  }
`;

const BlogDate = styled.p`
  font-size: 0.9rem;
  color: var(--gray);
  margin-bottom: 1rem;
`;

const Introduction = styled.p`
  font-size: 1.1rem;
  color: var(--dark-gray);
  margin-bottom: 1rem;
`;

const ContentHeading = styled.h2`
  font-size: 1.5rem;
  color: var(--black);
  margin: 1rem 0;
`;

const ContentParagraph = styled.p`
  font-size: 1rem;
  color: var(--dark-gray);
  margin: 1rem 0;
`;

const ContentList = styled.ul`
  margin: 1rem 0;
  padding-left: 1.5rem;
  list-style-type: disc;

  li {
    font-size: 1rem;
    color: var(--dark-gray);
    margin: 0.5rem 0;
  }
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

const CommentHeading = styled.h2`
  font-size: 1.5rem;
  color: var(--black);
  margin-bottom: 1rem;
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

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const SidebarHeading = styled.h2`
  font-size: 1.5rem;
  color: var(--black);
  margin-bottom: 1rem;
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

const BlogCard = styled.div`
  background: var(--white);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    width: 100%; /* Full width on mobile */
  }
`;

export default BlogDetails;