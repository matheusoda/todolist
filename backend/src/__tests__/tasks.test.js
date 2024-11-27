const request = require("supertest");
const app = require("../server");

describe("Task Endpoints", () => {
    it("should insert tasks", async () => {
        const response = await request(app).post("/api/insert-tasks").send({
            description: "Test task",
            responsable: "John",
            status: "todo"
        });
        expect(response.statusCode).toBe(201);
    });

    it("should fetch tasks", async () => {
        const response = await request(app).get("/api/get-tasks");
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
