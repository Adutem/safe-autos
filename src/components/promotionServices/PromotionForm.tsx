import * as yup from "yup";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useRedux } from "../hooks/useRedux";
import { showErrorNotification, showSuccessNotification } from "../utils";
import { createPromotion, resetCreatePromotion, updatePromotion } from "../redux/promotion/promotionSlice";
import { Button } from "../reusables/Styles";
import styled from "styled-components";
import { Modal, Box, TextField, CircularProgress, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export interface PromotionPost {
  _id: string;
  storeId: string;
  promotionType: string;
  redirectUrl: string;
  startDate: Date;
  endDate: Date;
}

interface PromotionFormProps {
  store: any;
  onClose: () => void;
  isOpen: boolean;
  editData?: PromotionPost | null;
}

const PromotionForm = React.memo(({ store, onClose, isOpen, editData }: PromotionFormProps) => {
  // Redux utilities
  const { dispatch, useStateSelector } = useRedux();

  // Promotion state
  const { isCreatingPromotion, promotionCreated, createError } = useStateSelector(
    (state) => state.Promotion || {}
  );

  const PromotionSchema = yup.object({
    storeId: yup.string().required("Please provide Store ID"),
    promotionType: yup.string().required("Please provide Promotion Type"),
    redirectUrl: yup.string().url("Invalid URL").required("Please provide Redirect URL"),
    startDate: yup.date().required("Please provide Start Date"),
    endDate: yup.date().required("Please provide End Date"),
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      storeId: editData?._id || "",
      promotionType: editData?.promotionType || "banner",
      redirectUrl: editData?.redirectUrl || "",
      startDate: editData?.startDate ? editData.startDate.toISOString().split('T')[0] : "", // Format date for input
      endDate: editData?.endDate ? editData.endDate.toISOString().split('T')[0] : "", // Format date for input
    },
    validationSchema: PromotionSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key].toString());
      });

      if (editData && editData._id) {
        dispatch(updatePromotion({ PromotionId: editData._id, data: formData }));
      } else {
        dispatch(createPromotion(formData));
      }
    },
  });

  // Successful Promotion posting
  useEffect(() => {
    if (promotionCreated) {
      showSuccessNotification("Promotion created", 1300);
      dispatch(resetCreatePromotion());
      onClose(); // Close the modal
    }
  }, [promotionCreated, dispatch, onClose]);

  // Posting Promotion error
  useEffect(() => {
    if (createError) {
      showErrorNotification("An error occurred. Please try again", 1300);
      dispatch(resetCreatePromotion());
    }
  }, [createError, dispatch]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Header>Promotion Form</Header>
        {isCreatingPromotion && <CircularProgress />}
        <Box
          sx={{
            maxHeight: "70vh",
            overflowY: "auto",
            paddingBottom: "2rem",
          }}
        >
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <TextField
              type="text"
              name="storeId"
              label="Store ID"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              value={editData?.storeId || validation.values.storeId} // Display storeId from editData
              error={Boolean(validation.errors.storeId)}
              helperText={validation.errors.storeId}
              fullWidth
              variant="outlined"
              margin="normal"
              InputProps={{
                readOnly: true, // Make the field uneditable
              }}
            />
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="promotionType">Promotion Type</InputLabel>
              <Select
                label="Promotion Type"
                name="promotionType"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.promotionType}
                error={Boolean(validation.errors.promotionType)}
              >
                <MenuItem value="banner">Banner</MenuItem>
                <MenuItem value="banner-with-text">Banner With Text</MenuItem>
                <MenuItem value="banner-with-heading-and-description">Banner With Heading And Description</MenuItem>
              </Select>
            </FormControl>
            <TextField
              type="url"
              name="redirectUrl"
              label="Redirect URL"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              value={validation.values.redirectUrl}
              error={Boolean(validation.errors.redirectUrl)}
              helperText={validation.errors.redirectUrl}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              type="date"
              name="startDate"
              label="Start Date"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              value={validation.values.startDate}
              error={Boolean(validation.errors.startDate)}
              fullWidth
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              type="date"
              name="endDate"
              label="End Date"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              value={validation.values.endDate}
              error={Boolean(validation.errors.endDate)}
              fullWidth
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              type="submit"
              color="primary"
              disabled={isCreatingPromotion}
            >
              {isCreatingPromotion && <CircularProgress size={24} />}
              {isCreatingPromotion ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        </Box>
      </Box>
    </Modal>
  );
});

export default PromotionForm;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;