import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/getplayer", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const response = await fetch(`https://users.roblox.com/v1/users/${userId}`);
    const data = await response.json();

    return res.json({
      Id: data.id,
      Name: data.name,
      DisplayName: data.displayName,
      JoinDate: data.created
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`✅ API running on port ${PORT}`));
