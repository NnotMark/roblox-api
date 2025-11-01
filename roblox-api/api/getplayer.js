import fetch from "node-fetch";

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId parameter" });
  }

  try {
    const response = await fetch(`https://users.roblox.com/v1/users/${userId}`);

    if (!response.ok) {
      return res.status(response.status).json({ error: "User not found" });
    }

    const data = await response.json();

    return res.status(200).json({
      Id: data.id,
      Name: data.name,
      DisplayName: data.displayName,
      JoinDate: data.created
    });
  } catch (err) {
    console.error("Error fetching Roblox data:", err);
    return res.status(500).json({ error: err.message });
  }
}
