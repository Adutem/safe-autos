import React, { useEffect, useState } from "react";
import { Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import styled from "styled-components";
import { SectionHeading, Button } from "../../components/reusables/Styles";
import { useGlobalContext } from "../../contexts/GlobalContext";
import PromotionForm from "../../components/promotionServices/PromotionForm";

const AdminStorePage = () => {
    const { fetchAllStores } = useGlobalContext();
    const [allStores, setAllStores] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStore, setSelectedStore] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const storesPerPage = 12;

    // Fetch stores when component mounts
    useEffect(() => {
        const fetchStores = async () => {
            const stores = await fetchAllStores();
            setAllStores(stores); // Set the fetched stores to state
        };
        fetchStores();
    }, [fetchAllStores]);

    const filteredStores = allStores.filter(store =>
        (searchTerm === "" || store.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (searchCategory === "" || store.category === searchCategory) &&
        (searchDate === "" || store.date === searchDate)
    );

    const indexOfLastStore = currentPage * storesPerPage;
    const indexOfFirstStore = indexOfLastStore - storesPerPage;
    const currentStores = filteredStores.slice(indexOfFirstStore, indexOfLastStore);
    const totalPages = Math.ceil(filteredStores.length / storesPerPage);

    const handleOpen = (store) => {
        setSelectedStore(store);  // Set the selected store to 
        console.log('Store Selected:', store)
        setOpenModal(true);  // Open the modal
    };

    const handleClose = () => {
        setOpenModal(false); // Close the modal
        setSelectedStore(null); // Reset selected store
    };

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
        <DashboardContainer>
            <SectionHeading>Store Management</SectionHeading>
            <ControlPanel>
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
                <StoreGrid>
                    {allStores.map((store) => (
                        <StoreCard key={store?._id}>
                            <StoreContent>
                                <Typography variant="h6">{store?.shopLocation}</Typography>
                                <Typography>{store?.phoneNumber}</Typography>
                                <Typography>{store?.email}</Typography>
                                <div style={{ margin: '10px 0' }}>
                                    <a href={store?.link} target="_blank" rel="noopener noreferrer">Store Link</a>
                                </div>
                                <div style={{ margin: '10px 0' }}>
                                    <a href={store?.couponLink} target="_blank" rel="noopener noreferrer">Coupons</a>
                                </div>
                                <div style={{ margin: '10px 0' }}>
                                    <a href={store?.financingLink} target="_blank" rel="noopener noreferrer">Financing</a>
                                </div>
                                <div style={{ margin: '10px 0' }}>
                                    <a href={store?.facebookLink} target="_blank" rel="noopener noreferrer">Facebook</a>
                                </div>
                                <div style={{ margin: '10px 0' }}>
                                    <span>{new Date(store?.createdAt).toLocaleDateString()}</span>
                                </div>
                            </StoreContent>
                            <Button color="primary" onClick={() => handleOpen(store)}>
                                Promote Store
                            </Button>
                        </StoreCard>
                    ))}
                </StoreGrid>
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

            {/* Modal for PromotionForm */}

            {openModal && (
                <PromotionForm
                    store={selectedStore}
                    isOpen={openModal}
                    onClose={handleClose}
                />
            )}
        </DashboardContainer>
    );
};

// Styled components
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

const StoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const StoreCard = styled.div`
  background: var(--white);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StoreContent = styled.div`
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

export default AdminStorePage;
