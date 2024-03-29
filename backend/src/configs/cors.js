const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-auth-crud-be.onrender.com",
  "https://mern-auth-crud-frontend.onrender.com",
];

export const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
