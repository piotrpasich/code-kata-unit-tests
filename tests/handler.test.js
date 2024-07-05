"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("../src/handlers/handler");
describe('scheduledTask', () => {
    it('should return a success message', async () => {
        const result = await (0, handler_1.scheduledTask)({});
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body).message).toBe('Scheduled task executed successfully!');
    });
});
