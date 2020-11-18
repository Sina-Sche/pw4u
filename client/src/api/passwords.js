async function getPasswordbyName(passwordName) {
  const response = await fetch(`/api/passwords/${passwordName}`);
  const password = await response.text();
  return password;
}

export default getPasswordbyName;
