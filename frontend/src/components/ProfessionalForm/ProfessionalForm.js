import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import InputMask from "react-input-mask";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./validation";
import { cellphoneMask, cfpMask, cpfMask } from "../../helpers";
import {
  selectUserThunksError,
  selectUserThunksStatus,
} from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { createUser } from "../../store";
import { DatePicker } from "../DatePicker";

function ProfessionalForm() {
  const status = useSelector(selectUserThunksStatus);
  const error = useSelector(selectUserThunksError);

  const dispatch = useDispatch();

  const onSubmit = (values) => {
    if (!values) return;

    const userData = {
      name: values.name,
      email: values.email,
      password: values.password,
      cpf: values.cpf,
      cellphone: values.cellphone,
      birthDate: values.birthDate,
      profilePicture: "",
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

  const handleBirthDateChange = (value) =>
    setFieldValue("birthDate", value ?? "");

  const handleBirthDateBlur = () => setFieldTouched("birthDate", true);

  const handlePasswordChange = (event) =>
    setFieldValue("password", event.target.value ?? "");

  const handlePasswordBlur = () => setFieldTouched("password", true);

  const handleConfirmPasswordChange = (event) =>
    setFieldValue("confirmPassword", event.target.value ?? "");

  const handleConfirmPasswordBlur = () =>
    setFieldTouched("confirmPassword", true);

  const handleProfilePictureChange = (event) => {
    setFieldValue("profilePicture", URL.createObjectURL(event.target.files[0]));
  };

  const handleCfpChange = (event) =>
    setFieldValue("cfp", event.target.value ?? "");

  const handleCfpBlur = () => setFieldTouched("cfp", true);

  const handleJobTitleChange = (event) =>
    setFieldValue("jobTitle", event.target.value ?? "");

  const handleJobTitleBlur = () => setFieldTouched("jobTitle", true);

  const handleDescriptionChange = (event) =>
    setFieldValue("description", event.target.value ?? "");

  const handleDescriptionBlur = () => setFieldTouched("description", true);

  const handleHourRateChange = (event) =>
    setFieldValue("hourRate", event.target.value ?? "");

  const handleHourRateBlur = () => setFieldTouched("hourRate", true);

  useEffect(() => {
    if (status === "saved") toast.success("Usuário foi cadastrado com sucesso");

    if (error) {
      console.error(error);
      toast.error("Ocorreu um erro");
    }
  }, [status, error]);

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

      <DatePicker
        format="DD/MM/YYYY"
        disableFuture
        required
        value={values.birthDate}
        error={errors.birthDate}
        touched={touched.birthDate}
        helperText={errors.birthDate}
        onChange={handleBirthDateChange}
        onBlur={handleBirthDateBlur}
        label="Data de Nascimento"
      />

      <Typography variant="subtitle1">Foto de perfil</Typography>
      <input type="file" onChange={handleProfilePictureChange} />

      <Typography variant="h5" fontWeight={"bold"} my={2}>
        Informações profissionais
      </Typography>
      <Box mb={2}>
        <TextField
          label="Profissão"
          value={values.jobTitle}
          error={touched.jobTitle && !!errors.jobTitle}
          helperText={touched.jobTitle && errors.jobTitle}
          onChange={handleJobTitleChange}
          onBlur={handleJobTitleBlur}
          fullWidth
        />
      </Box>

      <Box mb={2}>
        <TextField
          label="Descrição"
          value={values.description}
          error={touched.description && !!errors.description}
          helperText={touched.description && errors.description}
          onChange={handleDescriptionChange}
          onBlur={handleDescriptionBlur}
          multiline
          fullWidth
        />
      </Box>

      <Box mb={2}>
        <InputMask
          value={values.cfp}
          mask={cfpMask}
          onChange={handleCfpChange}
          onBlur={handleCfpBlur}
        >
          {() => (
            <TextField
              label="CFP"
              error={touched.cfp && !!errors.cfp}
              helperText={touched.cfp && errors.cfp}
              fullWidth
            />
          )}
        </InputMask>
      </Box>

      <Box mb={2}>
        <TextField
          label="Preço hora"
          value={values.hourRate}
          error={touched.hourRate && !!errors.hourRate}
          helperText={touched.hourRate && errors.hourRate}
          onChange={handleHourRateChange}
          onBlur={handleHourRateBlur}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">R$</InputAdornment>
            ),
          }}
          type="number"
          fullWidth
        />
      </Box>

      <Typography variant="h5" fontWeight={"bold"} my={2}>
        Informações de login
      </Typography>

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

      <Box mb={2}>
        <TextField
          label="Senha"
          value={values.password}
          error={touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          fullWidth
        />
      </Box>

      <Box mb={2}>
        <TextField
          label="Confirme a senha"
          value={values.confirmPassword}
          error={touched.confirmPassword && !!errors.confirmPassword}
          helperText={touched.confirmPassword && errors.confirmPassword}
          onChange={handleConfirmPasswordChange}
          onBlur={handleConfirmPasswordBlur}
          fullWidth
        />
      </Box>

      <Button type="submit" variant="contained" fullWidth>
        Cadastrar
      </Button>
    </form>
  );
}

export default ProfessionalForm;
