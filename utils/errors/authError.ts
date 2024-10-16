import { Dispatch, SetStateAction } from "react";

const authErrors = (
  email: string,
  password: string,
  setErrorEmail: Dispatch<SetStateAction<string>>,
  setErrorPassword: Dispatch<SetStateAction<string>>
) => {
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
