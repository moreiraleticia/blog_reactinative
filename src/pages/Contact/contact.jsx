import { useState } from "react";
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Snackbar,
  TextField,
} from "@mui/material";
import Loading from "../../components/Loading/loading.jsx";

const inputStyle = {
  width: "50%",
};

const defaultFormData = {
  name: "",
  email: "",
  message: "",
  isHuman: false,
};

export default function Contact() {
  const [formData, setFormData] = useState(defaultFormData);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const showSuccessMessage = () => {
    setErrorMessage(false);
    setOpenSnackBar(true);
  };

  const showErrorMessage = () => {
    setErrorMessage(true);
    setOpenSnackBar(true);
  };

  const sendData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://fast-react-api.onrender.com/contact",
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      setIsLoading(false);

      if (response.ok) {
        showSuccessMessage();
        setFormData(defaultFormData);
      } else {
        showErrorMessage();
      }
    } catch (error) {
      setIsLoading(false);
      showErrorMessage();
    }
  };

  const isFormValid = () =>
    !!(formData.name && formData.email && formData.message && formData.isHuman);

  const getAlert = () => {
    if (!openSnackBar) return null; 
    return (
      <Alert onClose={handleClose} severity={errorMessage ? "error" : "success"} sx={{ width: "100%" }}>
        {errorMessage ? "Erro ao enviar mensagem" : "Mensagem enviada com sucesso"}
      </Alert>
    );
  };

  return (
    <>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        {getAlert()}
      </Snackbar>
      {isLoading && <Loading />}
      <Grid container rowGap={2}>
        <Grid item xs={12}>
          <TextField
            name="name"
            value={formData.name}
            label="Nome"
            variant="standard"
            sx={inputStyle}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="email"
            value={formData.email}
            label="E-mail"
            variant="standard"
            sx={inputStyle}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="message"
            value={formData.message}
            label="Mensagem"
            variant="standard"
            multiline
            minRows={3}
            sx={inputStyle}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            label="Sou humano"
            control={
              <Checkbox
                checked={formData.isHuman}
                name="isHuman"
                onChange={handleChange}
              />
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            disabled={isLoading || !isFormValid()}
            onClick={sendData}
          >
            Enviar
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
