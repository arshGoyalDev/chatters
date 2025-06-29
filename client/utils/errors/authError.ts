import { Dispatch, SetStateAction } from "react";

const authErrors = (
  email: string,
  password: string,
  setErrorEmail: Dispatch<SetStateAction<string>>,
  setErrorPassword: Dispatch<SetStateAction<string>>,
  name?: string,
  setErrorName?: Dispatch<SetStateAction<string>>,
) => {  
  if (name && setErrorName) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    name === "" ? setErrorName("Name is required") : setErrorName("");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  email === "" ? setErrorEmail("Email is required") : setErrorEmail("");

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  password === ""
    ? setErrorPassword("Password is Required")
    : setErrorPassword("");

  if (email === "" || password === "") {
    return false;
  } else {
    return true;
  }
};

export { authErrors };
