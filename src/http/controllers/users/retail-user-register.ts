import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { createRetailClient, fetchToken } from '@/http/lib/totvs';
import { makeRegisterTotvsUserUseCase } from '@/use-cases/factories/users/make-register-totvs-user-use-case';

export async function registerTotvsUser(request: FastifyRequest, reply: FastifyReply) {
  const addressSchema = z.object({
    sequenceCode: z.number(),
    addressType: z.string(),
    publicPlace: z.string(),
    address: z.string(),
    number: z.number(),
    complement: z.string().optional(),
    neighborhood: z.string(),
    ibgeCityCode: z.number(),
    cityName: z.string(),
    stateAbbreviation: z.string(),
    cep: z.string(),
    bcbCountryCode: z.number(),
    countryName: z.string(),
  });

  const registerBodySchema = z.object({
    name: z.string(),
    cpf: z.string(),
    rg: z.string().optional(),
    birthDate: z.string(),
    gender: z.string(),
    isInactive: z.boolean(),
    nationality: z.string(),
    homeTown: z.string(),
    address: addressSchema,
    phoneNumber: z.string(),
    email: z.string(),
    password: z.string(),

  });

  const {
    name,
    cpf,
    rg,
    birthDate,
    gender,
    isInactive,
    nationality,
    homeTown,
    address,
    phoneNumber,
    email,
    password,
  } = registerBodySchema.parse(request.body);

  try {
    // Fetch the authentication token
    const token = await fetchToken()
    const registerTotvsUserUseCase = makeRegisterTotvsUserUseCase();

    const customerCode = await createRetailClient({
        token: token.access_token,
        name,
        cpf,
        rg,
        birthDate,
        gender,
        isInactive,
        nationality,
        homeTown,
        address,
        phoneNumber,
        email,
    })

    await registerTotvsUserUseCase.execute({
        code: customerCode.toString(),
        name: name,
        email,
        phone_number: phoneNumber,
        regitered_at: new Date(),
        rg: rg ?? '',
        birthDate,
        address,
        cpf,
        gender,
        password,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }
    throw err;
  }

  return reply.status(201).send();
}
