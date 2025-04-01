import React, { useState, useEffect } from "react";
import { Modal, Typography } from "@mui/material";
import styled from "styled-components";
import {
    Button,
    SectionHeading,
} from "../../components/reusables/Styles";
import PromotionForm from "../../components/promotionServices/PromotionForm";




const AdminPromotionServicePage = () => {
    const [PromotionServices, setPromotionServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const PromotionServicesPerPage = 12;

    const fetchPromotionServices = async () => {
        try {
            const data = await getAllPromotionServices(PromotionServicesPerPage, currentPage);
            setPromotionServices(data.PromotionServices);
        } catch (error) {
            console.error("Error fetching PromotionServices:", error);
        }
    };

    useEffect(() => {
        fetchPromotionServices();
    }, [currentPage]);

    const filteredPromotionServices = PromotionServices.filter(PromotionService =>
        (searchTerm === "" || PromotionService.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (searchCategory === "" || PromotionService.category === searchCategory) &&
        (searchDate === "" || PromotionService.date === searchDate)
    );

    const indexOfLastPromotionService = currentPage * PromotionServicesPerPage;
    const indexOfFirstPromotionService = indexOfLastPromotionService - PromotionServicesPerPage;
    const currentPromotionServices = filteredPromotionServices.slice(indexOfFirstPromotionService, indexOfLastPromotionService);
    const totalPages = Math.ceil(filteredPromotionServices.length / PromotionServicesPerPage);

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
    const [selectedPromotionService, setSelectedPromotionService] = useState(null);
    const [formData, setFormData] = useState({ title: "", content: "" });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentDeleteId, setCurrentDeleteId] = useState("");

    const handleOpen = (PromotionService = null) => {
        setSelectedPromotionService(PromotionService);
        setFormData(PromotionService || { title: "", content: "" });
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
        setSelectedPromotionService(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (selectedPromotionService) {
            setPromotionServices(
                PromotionServices.map((PromotionService) => (PromotionService.id === selectedPromotionService.id ? { ...PromotionService, ...formData } : PromotionService))
            );
        } else {
            setPromotionServices([...PromotionServices, { id: Date.now(), ...formData }]);
        }
        handleClose();
    };

    const handleDelete = (id) => {
        setCurrentDeleteId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setPromotionServices(PromotionServices.filter((PromotionService) => PromotionService.id !== currentDeleteId));
        setShowDeleteModal(false);
    };

    const handleCancelAction = () => {
        setShowDeleteModal(false);
        setCurrentDeleteId("");
    };

    return (
        <DashboardContainer>
            <SectionHeading>Promotion Service Management</SectionHeading>
            <ControlPanel>
                <Button style={{ width: '200px' }} onClick={() => handleOpen()}>
                    Add Promotion Service
                </Button>
                <SearchBar>
                    <input type="text" placeholder="Search by title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Uncategorized">Uncategorized</option>
                    </select>
                    <input type="date" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} />
                </SearchBar>
            </ControlPanel>

            <div style={{ height: '400px', overflowY: 'auto' }}>
                <PromotionServiceGrid>
                    {currentPromotionServices.map((PromotionService) => (
                        <PromotionServiceCard key={PromotionService._id}>
                            <PromotionServiceImage src={PromotionService.thumbNail.downloadUrl} alt={PromotionService.title} />
                            <PromotionServiceContent>
                                <Typography variant="h6">{PromotionService.title}</Typography>
                                <Typography>{PromotionService.shortIntroduction}</Typography>

                                <div style={{display: 'flex', justifyContent: 'space-between',margin: '10px'}}>
                                    <span>{new Date(PromotionService.publicationDate).toLocaleDateString()}</span>
                                    <ReadMore href={`/PromotionService/${PromotionService._id}`}>Read More →</ReadMore>
                                </div>

                                <PromotionServiceFooter>
                                    {/* <div style={{ display: "flex", gap: "10px", justifyContent: 'space-between' }}> */}
                                        <Button color="primary" onClick={() => handleOpen(PromotionService)}>
                                            Edit
                                        </Button>
                                        <Button color="secondary" onClick={() => handleDelete(PromotionService._id)}>
                                            Delete
                                        </Button>
                                    {/* </div> */}
                                </PromotionServiceFooter>
                            </PromotionServiceContent>
                        </PromotionServiceCard>
                    ))}
                </PromotionServiceGrid>
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
                <PromotionForm
                    isOpen={openModal}
                    onClose={handleClose}
                    editData={selectedPromotionService}
                />
            )}
            {showDeleteModal && (
                <Modal open={showDeleteModal} onClose={handleCancelAction}>
                    <DeleteModalContainer>
                        <Typography variant="h6">Delete PromotionService</Typography>
                        <Typography style={{marginTop: '20px'}}>Are you sure you want to delete this PromotionService post?</Typography>
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

const PromotionServiceGrid = styled.div`
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


const PromotionServiceCard = styled.div`
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

const PromotionServiceImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PromotionServiceContent = styled.div`
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

const PromotionServiceFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--primary-color);
  width: 100%;
  gap: 10px;
`;

export default AdminPromotionServicePage;
