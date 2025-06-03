import { FastifyInstance } from "fastify";
import { validateAndFormatAddress } from "../services/addressService";
import { AddressInput } from "../types/address";

export async function registerAddressRoutes(app: FastifyInstance) {
  app.post<{ Body: AddressInput }>("/validate-address", async (req, reply) => {
    const result = validateAndFormatAddress(req.body.rawAddress);
    return reply.send(result);
  });
}
