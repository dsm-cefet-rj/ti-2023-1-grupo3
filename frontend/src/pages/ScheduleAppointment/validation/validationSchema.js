import * as yup from "yup";

export const validationSchema = yup.object().shape({
  time: yup.string().required("Campo obrigatório"),
  date: yup.date().required("Campo obrigatório"),
  location: yup.object().required("Campo obrigatório"),
});
