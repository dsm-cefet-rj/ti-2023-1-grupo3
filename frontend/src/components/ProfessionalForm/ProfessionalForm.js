import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import InputMask from "react-input-mask";
import { getIn, useFormik } from "formik";
import {
  initialValues,
  locationInitialValues,
  validationSchema,
} from "./validation";
import { cellphoneMask, cfpMask, cpfMask } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DatePicker } from "../DatePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createFullProfessional } from "../../store";
import { useNavigate } from "react-router-dom";
import {
  selectProfessionalsThunksError,
  selectProfessionalsThunksStatus,
  setStatus,
} from "../../store/slices/professionalSlice";
import { createLocation } from "../../services";
function ProfessionalForm() {
  const [tempSpeciality, setTempSpeciality] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const status = useSelector(selectProfessionalsThunksStatus);
  const error = useSelector(selectProfessionalsThunksError);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    if (!values) return;
    const data = {
      jobTitle: values.jobTitle,
      description: values.description,
      specialities: values.specialities ?? [],
      hourRate: values.hourRate,
      cfp: values.cfp,
      name: values.name,
      username: values.email,
      password: values.password,
      cpf: values.cpf,
      cellphone: values.cellphone,
      birthDate: values.birthDate,
      profilePicture: "",
      type: "PROFESSIONAL",
    };
    dispatch(createFullProfessional(data));
    const locationsData = values.locations.map((item) => {
      return {
        label: item.label,
        link: item.link,
        street: item.street,
        number: item.number,
        complement: item.complement,
        cep: item.cep,
        city: item.city,
        state: item.state,
        neighborhood: item.neighborhood,
        appointmentType: item.appointmentType,
      };
    });

    locationsData.map((location) => dispatch(createLocation(location)));

    await Promise.all(locationsData);
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

  const handleSpecialityChange = (event) =>
    setTempSpeciality(event.target.value ?? "");

  const handleSpecialityBlur = () => setFieldTouched("specialities", true);

  const handleAddSpeciality = () => {
    if (tempSpeciality === "") return;

    const newList = [...values.specialities, tempSpeciality];

    setFieldValue("specialities", newList);

    setTempSpeciality("");
  };

  const handleRemoveSpeciality = (specialitiesIndex) => {
    const arrayClone = [...values.specialities];

    arrayClone.splice(specialitiesIndex, 1);

    setFieldValue("specialities", arrayClone);
  };

  const handleAppointmentTypeChange = (value, formIndex) =>
    setFieldValue(
      `locations[${formIndex}].appointmentType`,
      value ?? "ON_SITE"
    );

  const handleLabelChange = (event, formIndex) =>
    setFieldValue(`locations[${formIndex}].label`, event.target.value ?? "");

  const handleLabelBlur = (formIndex) =>
    setFieldTouched(`locations[${formIndex}].label`, true);

  const handleCepChange = (event, formIndex) =>
    setFieldValue(`locations[${formIndex}].cep`, event.target.value ?? "");

  const handleCepBlur = (formIndex) =>
    setFieldTouched(`locations[${formIndex}].cep`, true);

  const handleStreetChange = (event, formIndex) =>
    setFieldValue(`locations[${formIndex}].street`, event.target.value ?? "");

  const handleStreetBlur = (formIndex) =>
    setFieldTouched(`locations[${formIndex}].street`, true);

  const handleNumberChange = (event, formIndex) =>
    setFieldValue(`locations[${formIndex}].number`, event.target.value ?? "");

  const handleNumberBlur = (formIndex) =>
    setFieldTouched(`locations[${formIndex}].number`, true);

  const handleComplementChange = (event, formIndex) =>
    setFieldValue(
      `locations[${formIndex}].complement`,
      event.target.value ?? ""
    );

  const handleComplementBlur = (formIndex) =>
    setFieldTouched(`locations[${formIndex}].complement`, true);

  const handleNeighborhoodChange = (event, formIndex) =>
    setFieldValue(
      `locations[${formIndex}].neighborhood`,
      event.target.value ?? ""
    );

  const handleNeighborhoodBlur = (formIndex) =>
    setFieldTouched(`locations[${formIndex}].neighborhood`, true);

  const handleCityChange = (event, formIndex) =>
    setFieldValue(`locations[${formIndex}].city`, event.target.value ?? "");

  const handleCityBlur = (formIndex) =>
    setFieldTouched(`locations[${formIndex}].city`, true);

  const handleStateChange = (event, formIndex) =>
    setFieldValue(`locations[${formIndex}].state`, event.target.value ?? "");

  const handleStateBlur = (formIndex) =>
    setFieldTouched(`locations[${formIndex}].state`, true);

  const handleLinkChange = (event, formIndex) =>
    setFieldValue(`locations[${formIndex}].link`, event.target.value ?? "");

  const handleLinkBlur = (formIndex) =>
    setFieldTouched(`locations[${formIndex}].link`, true);

  const handleAddNewLocation = () => {
    const newLocationList = [...values.locations, locationInitialValues];

    setFieldValue("locations", newLocationList);
  };

  const handleDeleteNewLocation = (formIndex) => {
    const arrayClone = [...values.locations];

    arrayClone.splice(formIndex, 1);

    setFieldValue("locations", arrayClone);
  };

  useEffect(() => {
    if (status === "saved") {
      toast.success("Profissional foi cadastrado com sucesso");
      navigate("/login");
      dispatch(setStatus("loaded"));
    } else if (error) {
      console.error(error);
      toast.error("Ocorreu um erro");
      dispatch(setStatus("loaded"));
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
      <input
        type="file"
        value={values.profilePicture}
        onChange={handleProfilePictureChange}
      />

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
          fullWidth
        />
      </Box>

      <Box mb={2}>
        <TextField
          label="Especialidades"
          value={tempSpeciality}
          error={touched.specialities && !!errors.specialities}
          helperText={touched.specialities && errors.specialities}
          onChange={handleSpecialityChange}
          onBlur={handleSpecialityBlur}
          fullWidth
        />

        <Button
          variant="outlined"
          endIcon={<AddIcon />}
          onClick={handleAddSpeciality}
          disabled={tempSpeciality === ""}
          sx={{
            mt: 2,
          }}
        >
          Adicionar especilidade
        </Button>

        {values.specialities.length > 0 && (
          <Box mt={2}>
            <Typography variant="h6">Lista de especialidades</Typography>
            <ul>
              {values.specialities.map((speciality, index) => (
                <li key={index}>
                  {speciality}
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveSpeciality(index)}
                    sx={{
                      ml: 1,
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </li>
              ))}
            </ul>
          </Box>
        )}
      </Box>

      <Typography variant="h5" fontWeight={"bold"} my={2}>
        Endereços
      </Typography>

      {values.locations.length > 0 &&
        values.locations.map((location, index) => {
          return (
            <Box key={index}>
              <Typography variant="h6" mb={2}>
                Endereço {index + 1}
              </Typography>

              <FormControl>
                <FormLabel>Tipo de consulta</FormLabel>
                <RadioGroup
                  value={location.appointmentType}
                  onChange={(_, value) =>
                    handleAppointmentTypeChange(value, index)
                  }
                >
                  <FormControlLabel
                    value="ON_SITE"
                    control={<Radio />}
                    label="Presencial"
                  />
                  <FormControlLabel
                    value="REMOTE"
                    control={<Radio />}
                    label="Remoto"
                  />
                </RadioGroup>
              </FormControl>

              {location.appointmentType === "ON_SITE" && (
                <>
                  <Box mb={2}>
                    <TextField
                      label="Identificador"
                      value={location.label}
                      onChange={(e) => handleLabelChange(e, index)}
                      onBlur={() => handleLabelBlur(index)}
                      error={
                        getIn(touched, `locations[${index}].label`) &&
                        !!getIn(errors, `locations[${index}].label`)
                      }
                      helperText={
                        getIn(touched, `locations[${index}].label`) &&
                        getIn(errors, `locations[${index}].label`)
                      }
                      fullWidth
                    />
                  </Box>

                  <Box my={2}>
                    <TextField
                      label="CEP"
                      value={location.cep}
                      onChange={(e) => handleCepChange(e, index)}
                      onBlur={() => handleCepBlur(index)}
                      error={
                        getIn(touched, `locations[${index}].cep`) &&
                        !!getIn(errors, `locations[${index}].cep`)
                      }
                      helperText={
                        getIn(touched, `locations[${index}].cep`) &&
                        getIn(errors, `locations[${index}].cep`)
                      }
                      fullWidth
                    />
                  </Box>

                  <Box mb={2}>
                    <TextField
                      label="Rua"
                      value={location.street}
                      onChange={(e) => handleStreetChange(e, index)}
                      onBlur={() => handleStreetBlur(index)}
                      error={
                        getIn(touched, `locations[${index}].street`) &&
                        !!getIn(errors, `locations[${index}].street`)
                      }
                      helperText={
                        getIn(touched, `locations[${index}].street`) &&
                        getIn(errors, `locations[${index}].street`)
                      }
                      fullWidth
                    />
                  </Box>

                  <Box mb={2}>
                    <TextField
                      label="Número"
                      value={location.number}
                      onChange={(e) => handleNumberChange(e, index)}
                      onBlur={() => handleNumberBlur(index)}
                      error={
                        getIn(touched, `locations[${index}].number`) &&
                        !!getIn(errors, `locations[${index}].number`)
                      }
                      helperText={
                        getIn(touched, `locations[${index}].number`) &&
                        getIn(errors, `locations[${index}].number`)
                      }
                      fullWidth
                    />
                  </Box>

                  <Box mb={2}>
                    <TextField
                      label="Complemento"
                      value={location.complement}
                      onChange={(e) => handleComplementChange(e, index)}
                      onBlur={() => handleComplementBlur(index)}
                      error={
                        getIn(touched, `locations[${index}].complement`) &&
                        !!getIn(errors, `locations[${index}].complement`)
                      }
                      helperText={
                        getIn(touched, `locations[${index}].complement`) &&
                        getIn(errors, `locations[${index}].complement`)
                      }
                      fullWidth
                    />
                  </Box>

                  <Box mb={2}>
                    <TextField
                      label="Bairro"
                      value={location.neighborhood}
                      onChange={(e) => handleNeighborhoodChange(e, index)}
                      onBlur={() => handleNeighborhoodBlur(index)}
                      error={
                        getIn(touched, `locations[${index}].neighborhood`) &&
                        !!getIn(errors, `locations[${index}].neighborhood`)
                      }
                      helperText={
                        getIn(touched, `locations[${index}].neighborhood`) &&
                        getIn(errors, `locations[${index}].neighborhood`)
                      }
                      fullWidth
                    />
                  </Box>

                  <Box mb={2}>
                    <TextField
                      label="Cidade"
                      value={location.city}
                      onChange={(e) => handleCityChange(e, index)}
                      onBlur={() => handleCityBlur(index)}
                      error={
                        getIn(touched, `locations[${index}].city`) &&
                        !!getIn(errors, `locations[${index}].city`)
                      }
                      helperText={
                        getIn(touched, `locations[${index}].city`) &&
                        getIn(errors, `locations[${index}].city`)
                      }
                      fullWidth
                    />
                  </Box>

                  <Box mb={2}>
                    <TextField
                      label="Estado"
                      value={location.state}
                      onChange={(e) => handleStateChange(e, index)}
                      onBlur={() => handleStateBlur(index)}
                      error={
                        getIn(touched, `locations[${index}].state`) &&
                        !!getIn(errors, `locations[${index}].state`)
                      }
                      helperText={
                        getIn(touched, `locations[${index}].state`) &&
                        getIn(errors, `locations[${index}].state`)
                      }
                      fullWidth
                    />
                  </Box>
                </>
              )}

              {location.appointmentType === "REMOTE" && (
                <>
                  <Box mb={2}>
                    <TextField
                      label="Identificador"
                      value={location.label}
                      onChange={(e) => handleLabelChange(e, index)}
                      onBlur={() => handleLabelBlur(index)}
                      error={
                        getIn(touched, `locations[${index}].label`) &&
                        !!getIn(errors, `locations[${index}].label`)
                      }
                      helperText={
                        getIn(touched, `locations[${index}].label`) &&
                        getIn(errors, `locations[${index}].label`)
                      }
                      fullWidth
                    />
                  </Box>
                  <Box my={2}>
                    <TextField
                      label="LINK"
                      value={location.link}
                      onChange={(e) => handleLinkChange(e, index)}
                      onBlur={() => handleLinkBlur(index)}
                      error={
                        getIn(touched, `locations[${index}].link`) &&
                        !!getIn(errors, `locations[${index}].link`)
                      }
                      helperText={
                        getIn(touched, `locations[${index}].link`) &&
                        getIn(errors, `locations[${index}].link`)
                      }
                      fullWidth
                    />
                  </Box>
                </>
              )}

              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                sx={{
                  mb: 2,
                }}
                onClick={() => handleDeleteNewLocation(index)}
                disabled={values.locations.length < 2}
              >
                Remover Endereço
              </Button>
            </Box>
          );
        })}

      <Button variant="outlined" onClick={handleAddNewLocation}>
        Adicionar novo endereço
      </Button>

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
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
          type={showConfirmPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
