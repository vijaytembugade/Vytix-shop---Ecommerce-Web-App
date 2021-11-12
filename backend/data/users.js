import bcrypt from "bcryptjs";

const user = [
  {
    name: "Admin User",
    email: "admin@vytix.com",
    password: bcrypt.hashSync("admin", 10),
    isAdmin: true,
  },
  {
    name: "User 1",
    email: "user1@vytix.com",
    password: bcrypt.hashSync("vijay", 10),
  },
  {
    name: "User 2",
    email: "user2@vytix.com",
    password: bcrypt.hashSync("vijay", 10),
  },
  {
    name: "User 3",
    email: "user3@vytix.com",
    password: bcrypt.hashSync("vijay", 10),
    isAdmin: false,
  },
];

export default user;
