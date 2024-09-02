function validation(formdata) {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!formdata.username) {
    errors.username = "Username is required";
  }
  if (!formdata.email) {
    errors.email = "Email is required";
  } else if (!regex.test(formdata.email)) {
    errors.email = "Email is invalid";
  }
  //   if (!formdata.password) {
  //     errors.password = "Password is required";
  //   } else if (formdata.password.length < 7) {
  //     errors.password = "Password is too short";
  //   }

  return errors;
}

export default validation;
