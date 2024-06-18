import { IErrorMsg } from "../../components/error-msg/error-msg.component";

export const validations: IErrorMsg = {
  name: [{ type: "required", message: "El nombre es requerido" }],
  email: [
    { type: "required", message: "El correo electrónico es requerido" },
    {
      type: "email",
      message: "El correo electrónico no tiene el formato correcto"
    }
  ],
  age: [{ type: "required", message: "La edad es requerida" }]
};
