process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");



let favoriteCandy = { "name": "SwedishFish", "price": 1.99 }


beforeEach(function() {
    items.push(favoriteCandy)
});

afterEach(function() {
    items.length = 0
});


describe("Get /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({items: [favoriteCandy]});
    });
});

describe("Get /items/:name", () => {
    test("Get info for a specific item", async () => {
        const res = await request(app).get("/items/SwedishFish");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({item: { "name": "SwedishFish", "price": 1.99 } } );
    });
});

describe("POST /items", () => {
    test("Creating an item", async () => {
        const newItem = { name: "Skittles", price: 3.00 };
        const res = await request(app).post("/items").send(newItem);

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ item: { name: "Skittles", price: 3.00 } });
    });
});


describe("PATCH /items/:name", () => { 
    test("Updating the price of SwedishFish", async () => {
        const updatedPrice = 9.99;
        const res = await request(app).patch("/items/SwedishFish").send({ price: updatedPrice });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            fmessage: "Item updated successfully.",
            item: { "name": "SwedishFish", "price": updatedPrice }
        });
    });
    test("Responds with 404 for invalid item", async () => {
        const res = await request(app).patch("/items/ItalianFish").send({ name: "NotInThere"});
        expect(res.statusCode).toBe(404);
    })
});

describe("/DELETE /items/:name", () => {
    test("Deleting an item", async () => {
        const res = await request(app).delete("/items/SwedishFish");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Deleted" })
    });
    test("Responds with 404 for deleting an invalid item", async () => {
        const res = await request(app).delete("/items/NothingHere");
        expect(res.statusCode).toBe(404);
    })
})