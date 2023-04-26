import User from "../entity/user";

const sendMail = (user: User) => {
  throw new Error(`Not implemented. User ${user.fullName} will not receive any email.`);
};

export default sendMail;
