import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup.string().required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  cpf: yup.string().required("Campo obrigatório"),
  cellphone: yup.string().required("Campo obrigatório"),
  birthDate: yup.date().required("Campo obrigatório"),
  userType: yup
    .mixed()
    .oneOf(["PROFESSIONAL", "CLIENT"])
    .required("Campo obrigatório"),
});
