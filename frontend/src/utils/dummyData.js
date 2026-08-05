// src/utils/dummyData.js
export const teachers = [
  {
    id: 1,
    name: "Rahul Mehta",
    email: "rahul@melwirt.com",
    subject: "Robotics",
    status: "active",
  },
  {
    id: 2,
    name: "Aditi Sharma",
    email: "aditi@melwirt.com",
    subject: "AI & Coding",
    status: "inactive",
  },
  {
    id: 3,
    name: "Suresh Patil",
    email: "suresh@melwirt.com",
    subject: "Python Programming",
    status: "active",
  },
];

export const students = [
  {
    id: 1,
    name: "Nikhil Patel",
    email: "nikhil@melwirt.com",
    course: "Python Basics",
    status: "active",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya@melwirt.com",
    course: "Arduino Robotics",
    status: "active",
  },
  {
    id: 3,
    name: "Rohit Jain",
    email: "rohit@melwirt.com",
    course: "AI for Kids",
    status: "inactive",
  },
];

export const allUsers = [
  ...teachers.map((t) => ({ ...t, role: "tutor" })),
  ...students.map((s) => ({ ...s, role: "student" })),
];
