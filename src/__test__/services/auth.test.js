import {
  login,
  register,
  getAllUsers,
  getUserById,
  getUserByusername,
  getByemail,
  updateUser,
} from "@/services/auth"; // Sesuaikan path dengan lokasi file auth.js
import axios from "axios";

jest.mock("axios");

describe("Auth Services", () => {
  describe("Login", () => {
    it("cek token jika login berhasil", async () => {
      const payload = { username: "dimas", password: "123" };
      const token = "token123";

      axios.post.mockResolvedValue({ data: { token } });

      const res = await login(payload);

      expect(res).toEqual({ status: true, data: { token } });
    });

    it("cek error jika login gagal", async () => {
      const payload = { username: "dimas", password: "salah" };
      const errorResponse = { message: "Invalid credentials" };

      axios.post.mockRejectedValue({ response: { data: errorResponse } });

      const res = await login(payload);

      expect(res).toEqual({ status: false, data: errorResponse });
    });
  });

  describe("Register", () => {
    it("register berhasil", async () => {
      const payload = {
        username: "newuser",
        email: "newuser@example.com",
        password: "pass123",
      };
      const successResponse = { message: "User registered successfully" };

      axios.post.mockResolvedValue({ data: successResponse });

      const res = await register(payload);

      expect(res).toEqual({ status: true, data: successResponse });
    });

    it("register gagal", async () => {
      const payload = {
        username: "existinguser",
        email: "existing@example.com",
        password: "pass123",
      };
      const errorResponse = { message: "User already exists" };

      axios.post.mockRejectedValue({ response: { data: errorResponse } });

      const res = await register(payload);

      expect(res).toEqual({ status: false, data: errorResponse });
    });
  });

  describe("Get Users", () => {
    it("get all users berhasil", async () => {
      const users = [
        { id: 1, name: "User1" },
        { id: 2, name: "User2" },
      ];
      axios.get.mockResolvedValue({ data: users });

      console.log = jest.fn();
      await getAllUsers();

      expect(console.log).toHaveBeenCalledWith(users);
    });

    it("get user by ID berhasil", async () => {
      const user = { id: 1, name: "User1" };
      axios.get.mockResolvedValue({ data: user });

      const res = await getUserById(1);

      expect(res).toEqual({ status: true, data: user });
    });

    it("get user by username berhasil", async () => {
      const user = { id: 1, name: "User1" };
      axios.get.mockResolvedValue({ data: user });

      console.log = jest.fn();
      await getUserByusername("User1");

      expect(console.log).toHaveBeenCalledWith(user);
    });

    it("get user by email berhasil", async () => {
      const user = { id: 1, email: "user@example.com" };
      axios.get.mockResolvedValue({ data: user });

      const res = await getByemail("user@example.com");

      expect(res).toEqual({ status: true, data: user });
    });
  });

  describe("Update User", () => {
    // it("update user berhasil", async () => {
    //   const userId = 1;
    //   const formData = new FormData();
    //   formData.append("name", "Updated User");

    //   const successResponse = { data: { message: "User updated" } };
    //   axios.put.mockResolvedValue(successResponse);

    //   const res = await updateUser(userId, formData);

    //   expect(res).toEqual({ status: true, data: successResponse.data });
    // });

    it("update user gagal", async () => {
      const userId = 1;
      const formData = new FormData();
      formData.append("name", "Updated User");

      const errorResponse = { message: "Update failed" };
      axios.put.mockRejectedValue({ response: { data: errorResponse } });

      const res = await updateUser(userId, formData);

      expect(res).toEqual({ status: false, message: errorResponse });
    });
  });
});
