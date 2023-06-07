import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import InputMask from "react-input-mask";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./validation";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { cellphoneMask, cpfMask } from "../../helpers";
import {
  selectUserThunksError,
  selectUserThunksStatus,
} from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { createUser } from "../../store";

function ClientForm() {
  const status = useSelector(selectUserThunksStatus);
  const error = useSelector(selectUserThunksError);

  const dispatch = useDispatch();

  const onSubmit = (values) => {
    console.log("entrou", values);

    if (!values) return;

    const userData = {
      name: values.name,
      email: values.email,
      password: "",
      cpf: values.cpf,
      cellphone: values.cellphone,
      birthDate: values.birthDate,
      profilePicture: values.profilePicture,
      type: "CLIENT",
    };

    dispatch(createUser(userData));
  };

  const {
    values,
    errors,
    touched,
    setFieldTouched,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const handleNameChange = (event) =>
    setFieldValue("name", event.target.value ?? "");

  const handleNameBlur = () => setFieldTouched("name", true);

  const handleEmailChange = (event) =>
    setFieldValue("email", event.target.value ?? "");

  const handleEmailBlur = () => setFieldTouched("email", true);

  const handleCpfChange = (event) =>
    setFieldValue("cpf", event.target.value ?? "");

  const handleCpfBlur = () => setFieldTouched("cpf", true);

  const handleCellphoneChange = (event) =>
    setFieldValue("cellphone", event.target.value ?? "");

  const handleCellphoneBlur = () => setFieldTouched("cellphone", true);

  useEffect(() => {
    if (status === "saved") toast.success("Usuário foi cadastrado com sucesso");

    if (error) {
      console.error(error);
      toast.error("Ocorreu um erro");
    }
  }, [status, error]);

  console.log(errors, touched);

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" fontWeight={"bold"} my={2}>
        Informações pessoais
      </Typography>

      <Box mb={2}>
        <TextField
          label="Nome completo"
          value={values.name}
          error={touched.name && !!errors.name}
          helperText={touched.name && errors.name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          fullWidth
        />
      </Box>

      <Box mb={2}>
        <InputMask
          value={values.cpf}
          mask={cpfMask}
          onChange={handleCpfChange}
          onBlur={handleCpfBlur}
        >
          {() => (
            <TextField
              label="CPF"
              error={touched.cpf && !!errors.cpf}
              helperText={touched.cpf && errors.cpf}
              fullWidth
            />
          )}
        </InputMask>
      </Box>

      <Box mb={2}>
        <InputMask
          value={values.cellphone}
          mask={cellphoneMask}
          onChange={handleCellphoneChange}
          onBlur={handleCellphoneBlur}
        >
          {() => (
            <TextField
              label="Celular"
              error={touched.cellphone && !!errors.cellphone}
              helperText={touched.cellphone && errors.cellphone}
              fullWidth
            />
          )}
        </InputMask>
      </Box>

      <Box mb={2}>
        <InputLabel>Data de Nascimento: </InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={["DatePicker"]}
            sx={{ paddingTop: 0, flexDirection: "column" }}
          >
            <DesktopDatePicker
              id="date"
              format="DD/MM/YYYY"
              disableFuture
              required
              value={values.birthDate}
              onChange={(value) => setFieldValue("birthDate", value)}
              onBlur={() => setFieldTouched("birthDate", true)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>

      <Box mb={2}>
        <TextField
          label="Email"
          value={values.email}
          error={touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          fullWidth
        />
      </Box>

      <Button type="submit" variant="contained" fullWidth>
        Cadastrar
      </Button>
    </form>
  );
}

export default ClientForm;
