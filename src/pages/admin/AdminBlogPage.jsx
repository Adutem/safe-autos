import React, { useState, useRef } from "react";
import { Button, Card, Modal, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import {
  Form,
  NormalPara,
  PortalModalContainer,
  SectionHeading,
  SectionPara,
} from "../../components/reusables/Styles";
import BlogForm from "../../components/blog/BlogForm";

const AdminBlogPage = () => {
  const [blogs, setBlogs] = useState([
    { id: 1, title: "First Blog", content: "This is the first blog post." },
    { id: 2, title: "Second Blog", content: "This is another blog post." },
  ]);
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
    <BlogPageContainer>
      <SectionHeading>Blog Page</SectionHeading>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Blog Post
      </Button>
      <div style={{ marginTop: "20px", display: "grid", gap: "20px" }}>
        {blogs.map((blog) => (
          <Card key={blog.id} style={{ padding: "20px", position: "relative" }}>
            <Typography variant="h6">{blog.title}</Typography>
            <Typography>{blog.content}</Typography>
            <div style={{ marginTop: "10px" }}>
              <Button color="primary" onClick={() => handleOpen(blog)}>
                Edit
              </Button>
              <Button color="secondary" onClick={() => handleDelete(blog.id)}>
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
      {openModal && (
        <Modal open={openModal} onClose={handleClose}>
          <ModalContainer>
            <BlogForm
              isOpen={openModal}
              onClose={handleClose}
              editData={selectedBlog}
            />
          </ModalContainer>
        </Modal>
      )}
      {showDeleteModal && (
        <Modal open={showDeleteModal} onClose={handleCancelAction}>
          <DeleteModalContainer>
            <Typography variant="h6">Delete Blog</Typography>
            <Typography>Are you sure you want to delete this blog post?</Typography>
            <Button variant="contained" color="secondary" onClick={confirmDelete}>
              Yes
            </Button>
            <Button variant="contained" onClick={handleCancelAction}>
              No
            </Button>
          </DeleteModalContainer>
        </Modal>
      )}
    </BlogPageContainer>
  );
};

const BlogPageContainer = styled.div`
  padding: 20px;
`;

const ModalContainer = styled.div`
  padding: 20px;
  background: white;
  margin: auto;
  width: 400px;
  margin-top: 100px;
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
