export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    // 1. Get the main user's join date
    const userResponse = await fetch(`https://users.roblox.com/v1/users/${userId}`);
    const userData = await userResponse.json();

    if (!userData || userData.errors) {
      return res.status(404).json({ error: "User not found" });
    }

    const joinDate = userData.created;

    // 2. Generate 200 random users (simulate Roblox search or dataset)
    // ⚠️ You could later replace this with your own real dataset
    const sameJoinDateUsers = [];

    for (let i = 1; i <= 200; i++) {
      sameJoinDateUsers.push({
        Id: 1000000 + i,
        Name: `Player${i}`,
        DisplayName: `Display${i}`,
        Followers: Math.floor(Math.random() * 50000),
        JoinDate: joinDate
      });
    }

    // 3. Sort by followers (descending)
    sameJoinDateUsers.sort((a, b) => b.Followers - a.Followers);

    return res.status(200).json({
      baseUser: {
        Id: userData.id,
        Name: userData.name,
        DisplayName: userData.displayName,
        JoinDate: joinDate
      },
      sameJoinDateUsers
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
