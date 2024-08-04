import request from "supertest";
import app from "../../index";
import mongoose from "mongoose";
import User from "../models/users.js";

jest.setTimeout(10000);

const payload = {
  name: "User by JEST",
  email: `rapha.by.jest@${Math.floor(Math.random() * 1000)}.com`,
  password: "1234",
};
console.log("🚀 ~ payload:", payload);

describe("POST /register", () => {
  it("deve registrar um novo usuário com sucesso", async () => {
    const response = await request(app)
      .post("/api/v1/user/register")
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");

    const user = await User.findOne({ email: payload.email });
    expect(user).toBeDefined();
    expect(user.password).not.toBe(payload.password);
  });

  it("deve retornar um erro se o email já existir", async () => {
    await User.create(payload);

    const response = await request(app)
      .post("/api/v1/user/register")
      .send(payload);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Email already exists");
  });

  it("deve retornar um erro se os dados de cadastro forem inválidos", async () => {
    const invalidPayload = {
      name: "Test User",
      email: "test@example.com",
      password: "",
    };

    const response = await request(app)
      .post("/api/v1/user/register")
      .send(invalidPayload);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toContain("Invalid data");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
