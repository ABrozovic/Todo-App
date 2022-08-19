import fastify from "fastify";
export async function createServer(){
    const server = fastify();

    return server;
}
