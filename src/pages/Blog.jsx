import React, { useState } from "react";
import styled from "styled-components";
import { blogs, mostVisited } from "../data/blog-data";



const BlogPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 10;
  
    const filteredBlogs = blogs.filter(blog =>
      (searchTerm === "" || blog.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (searchCategory === "" || blog.category === searchCategory) &&
      (searchDate === "" || blog.date === searchDate)
    );
  
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  
    const getPageNumbers = () => {
      const pages = [];
      if (totalPages <= 10) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        if (currentPage > 3) pages.push("...");
        for (let i = Math.max(2, currentPage - 2); i <= Math.min(currentPage + 2, totalPages - 1); i++) {
          pages.push(i);
        }
        if (currentPage < totalPages - 2) pages.push("...");
        pages.push(totalPages);
      }
      return pages;
    };
  
    return (
      <BlogContainer>
        <MainContent>
          <h1>Latest Blog Posts</h1>
  
          <SearchBar>
            <input type="text" placeholder="Search by title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option value="Tires">Tires</option>
              <option value="Brakes">Brakes</option>
            </select>
            <input type="date" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} />
          </SearchBar>
  
          {currentBlogs.length > 0 ? (
            <>
              <BlogGrid>
                {currentBlogs.map((blog) => (
                  <BlogCard key={blog.id}>
                    <BlogImage src={blog.image} alt={blog.title} />
                    <BlogContent>
                      <h2>{blog.title}</h2>
                      <p>{blog.content}</p>
                      <BlogFooter>
                        <span>{blog.date}</span>
                        <ReadMore href={`/blog/${blog.id}`}>Read More →</ReadMore>
                      </BlogFooter>
                    </BlogContent>
                  </BlogCard>
                ))}
              </BlogGrid>
              <Pagination>
                <PageButton onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>First</PageButton>
                <PageButton onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Prev</PageButton>
                {getPageNumbers().map((page, index) => (
                  <PageButton key={index} onClick={() => typeof page === 'number' && setCurrentPage(page)} active={currentPage === page}>
                    {page}
                  </PageButton>
                ))}
                <PageButton onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</PageButton>
                <PageButton onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>Last</PageButton>
              </Pagination>
            </>
          ) : (
            <NoResult>No results found for your search.</NoResult>
          )}
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

// Styled Components
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 0.5rem 1rem;
  border: none;
  background: ${({ active }) => (active ? "var(--primary-color)" : "var(--light-gray)")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;

  &:hover {
    background: var(--primary-color);
    color: #fff;
  }
`;



const BlogContainer = styled.div`
  display: flex;
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
  background: var(--white);
`;

const MainContent = styled.div`
  flex: 3;
  gap: 1rem;
  padding-right: 2rem;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;

  input, select {
    padding: 0.5rem;
    border: 1px solid var(--gray);
    border-radius: 5px;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
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
`;

const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BlogContent = styled.div`
  padding: 1rem;

  h2 {
    font-size: 1.3rem;
    color: var(--black);
  }

  p {
    font-size: 0.9rem;
    color: var(--gray);
    margin: 0.5rem 0;
  }
`;

const BlogFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--primary-color);
`;

const ReadMore = styled.a`
  text-decoration: none;
  color: var(--primary-color);
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
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

const NoResult = styled.p`
  text-align: center;
  color: var(--gray);
  font-size: 1rem;
  margin-top: 2rem;
`;

export default BlogPage;