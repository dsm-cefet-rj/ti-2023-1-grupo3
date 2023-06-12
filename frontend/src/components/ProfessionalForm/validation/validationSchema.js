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
  password: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .required("Campo obrigatório"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "A senhas devem ser iguais")
    .required("Campo obrigatório"),
  jobTitle: yup.string().required("Campo obrigatório"),
  description: yup.string().required("Campo obrigatório"),
  specialities: yup.array().of(yup.string()).required("Campo obrigatório"),
  hourRate: yup.string().required("Campo obrigatório"),
  cfp: yup.string().required("Campo obrigatório"),
  locations: yup.array().of(
    yup.object().shape({
      appointmentType: yup.mixed().oneOf(["ON_SITE", "REMOTE"]),
      label: yup.string().required("Campo obrigatório"),
      link: yup.string().when("appointmentType", {
        is: "REMOTE",
        then: () => yup.string().required("Campo obrigatório"),
        otherwise: () => yup.string(),
      }),
      street: yup.string().when("appointmentType", {
        is: "ON_SITE",
        then: () => yup.string().required("Campo obrigatório"),
        otherwise: () => yup.string(),
      }),
      number: yup.string().when("appointmentType", {
        is: "ON_SITE",
        then: () => yup.string().required("Campo obrigatório"),
        otherwise: () => yup.string(),
      }),
      complement: yup.string(),
      cep: yup.string().when("appointmentType", {
        is: "ON_SITE",
        then: () => yup.string().required("Campo obrigatório"),
        otherwise: () => yup.string(),
      }),
      city: yup.string().when("appointmentType", {
        is: "ON_SITE",
        then: () => yup.string().required("Campo obrigatório"),
        otherwise: () => yup.string(),
      }),
      state: yup.string().when("appointmentType", {
        is: "ON_SITE",
        then: () => yup.string().required("Campo obrigatório"),
        otherwise: () => yup.string(),
      }),
      neighborhood: yup.string().when("appointmentType", {
        is: "ON_SITE",
        then: () => yup.string().required("Campo obrigatório"),
        otherwise: () => yup.string(),
      }),
    })
  ),
});
