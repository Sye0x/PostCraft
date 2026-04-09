const validateLogin = (formData) => {
  const newErrors = {};

  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Invalid email format";
  }

  if (!formData.password) {
    newErrors.password = "Password is required";
  }

  return newErrors;
};

export default validateLogin;
