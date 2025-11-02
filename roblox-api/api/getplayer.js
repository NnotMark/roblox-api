export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    const response = await fetch(`https://users.roblox.com/v1/users/${userId}`);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch user" });
    }

    const data = await response.json();
    return res.status(200).json({
      Id: data.id,
      Name: data.name,
      DisplayName: data.displayName,
      Created: data.created
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
}
