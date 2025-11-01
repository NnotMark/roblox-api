export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    // Fetch player data from Roblox API
    const response = await fetch(`https://users.roblox.com/v1/users/${userId}`);
    const data = await response.json();

    if (!data || data.errors) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return formatted data
    return res.status(200).json({
      Id: data.id,
      Name: data.name,
      DisplayName: data.displayName,
      JoinDate: data.created,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
