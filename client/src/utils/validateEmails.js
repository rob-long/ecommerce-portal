function validateEmails(emails) {
  if (!emails) {
    return [];
  }
  const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const badEmails = emails
    .split(",")
    .map(email => email.trim())
    .filter(email => !re.test(email));
  return badEmails;
}

export default validateEmails;
