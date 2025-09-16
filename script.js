import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
const SECRET_KEY = "rahasia_super_aman";

// Simulasi user
const users = [
  {
    username: "admin",
    password: await bcrypt.hash("1234", 10),
  },
];

// ✅ Simulasi watchlist bawaan


app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) return res.status(401).json({ message: "User tidak ditemukan" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Password salah" });

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

const userWatchlists = {
  admin: [
    "Inception",
    "Interstellar",
    "The Dark Knight",
    "A Minecraft Movie",
  ],
};

app.get("/watchlist", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token tidak ditemukan" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err && err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token kadaluarsa" });
    }
    if (err) return res.status(403).json({ message: "Token tidak valid" });

    const list = userWatchlists[user.username] || [];
    res.json(list);
  });
});



app.listen(PORT, () =>
  console.log(`Server jalan di http://localhost:${PORT}`)
);
