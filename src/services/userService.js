const userModel = require("../models/User");

class UserService {
  async createUser({ id, username, name, email, avatar_url }) {
    const existingUser = await userModel.findOne({ github_id: id });
    if (existingUser) return existingUser;

    const user = await userModel.create({
      github_id: id,
      username,
      name,
      email,
      avatar_url,
    });

    return user;
  }

  async getUser(id) {
    const user = await userModel.findOne({ _id: id });
    if (!user) {
      throw new DBError("User not found", 404);
    }
    return user;
  }
}

module.exports = new UserService();
