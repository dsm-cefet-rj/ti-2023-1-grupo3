import * as yup from "yup";
import { validateCpf } from "../../../helpers";

export const validationSchema = yup.object().shape({
  name: yup.string().required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  cpf: yup
    .string()
    .test("cpf", "CPF inválido", function (value) {
      return validateCpf(value);
    })
    .required("Campo obrigatório"),
  cellphone: yup.string().required("Campo obrigatório"),
  birthDate: yup.date().required("Campo obrigatório"),
  profilePicture: yup.string(),
  password: "",
});
