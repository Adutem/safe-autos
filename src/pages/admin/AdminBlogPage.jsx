import React, { useState } from "react";
import { Modal, Typography } from "@mui/material";
import styled from "styled-components";
import {
    Button,
    SectionHeading,
} from "../../components/reusables/Styles";
import BlogForm from "../../components/blog/BlogForm";
import { blogs as initialBlogs } from "../../data/blog-data"; // Import initial blogs data
import { BlogCard, BlogContent, BlogFooter, BlogImage } from "../Blog"; // Import BlogCard and related components

const AdminBlogPage = () => {
    const [blogs, setBlogs] = useState(initialBlogs);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 12;

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

    const [openModal, setOpenModal] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [formData, setFormData] = useState({ title: "", content: "" });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentDeleteId, setCurrentDeleteId] = useState("");

    const handleOpen = (blog = null) => {
        setSelectedBlog(blog);
        setFormData(blog || { title: "", content: "" });
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
        setSelectedBlog(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (selectedBlog) {
            setBlogs(
                blogs.map((blog) => (blog.id === selectedBlog.id ? { ...blog, ...formData } : blog))
            );
        } else {
            setBlogs([...blogs, { id: Date.now(), ...formData }]);
        }
        handleClose();
    };

    const handleDelete = (id) => {
        setCurrentDeleteId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setBlogs(blogs.filter((blog) => blog.id !== currentDeleteId));
        setShowDeleteModal(false);
    };

    const handleCancelAction = () => {
        setShowDeleteModal(false);
        setCurrentDeleteId("");
    };

    return (
        <DashboardContainer>
            <SectionHeading>Blog Management</SectionHeading>
            <ControlPanel>
                <Button style={{ width: '150px' }} onClick={() => handleOpen()}>
                    Add Blog Post
                </Button>
                <SearchBar>
                    <input type="text" placeholder="Search by title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        <option value="Tires">Tires</option>
                        <option value="Brakes">Brakes</option>
                    </select>
                    <input type="date" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} />
                </SearchBar>
            </ControlPanel>

            <div style={{ height: '400px', overflowY: 'auto' }}>
                <BlogGrid>
                    {currentBlogs.map((blog) => (
                        <BlogCard key={blog.id}>
                            <BlogImage src={blog.image} alt={blog.title} />
                            <BlogContent>
                                <Typography variant="h6">{blog.title}</Typography>
                                <Typography>{blog.content}</Typography>

                                <div style={{display: 'flex', justifyContent: 'space-between',margin: '10px'}}>
                                    <span>{blog.date}</span>
                                    <ReadMore href={`/blog/${blog.id}`}>Read More →</ReadMore>
                                </div>

                                <BlogFooter>
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <Button color="primary" onClick={() => handleOpen(blog)}>
                                            Edit
                                        </Button>
                                        <Button color="secondary" onClick={() => handleDelete(blog.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </BlogFooter>
                            </BlogContent>
                        </BlogCard>
                    ))}
                </BlogGrid>
            </div>
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
            {openModal && (
                <BlogForm
                    isOpen={openModal}
                    onClose={handleClose}
                    editData={selectedBlog}
                />
            )}
            {showDeleteModal && (
                <Modal open={showDeleteModal} onClose={handleCancelAction}>
                    <DeleteModalContainer>
                        <Typography variant="h6">Delete Blog</Typography>
                        <Typography style={{marginTop: '20px'}}>Are you sure you want to delete this blog post?</Typography>
                        <Button style={{marginTop: '20px'}} variant="contained" color="secondary" onClick={confirmDelete}>
                            Yes
                        </Button>
                        <Button style={{marginTop: '20px'}} variant="contained" onClick={handleCancelAction}>
                            No
                        </Button>
                    </DeleteModalContainer>
                </Modal>
            )}
        </DashboardContainer>
    );
};

const DashboardContainer = styled.div`
  padding: 20px;
  background: #f4f4f4;
  border-radius: 10px;
`;

const ControlPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;

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
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const ReadMore = styled.a`
  text-decoration: none;
  color: var(--primary-color);
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
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

const DeleteModalContainer = styled.div`
  padding: 20px;
  background: white;
  margin: auto;
  width: 300px;
  margin-top: 100px;
  text-align: center;
  
`;

export default AdminBlogPage;
