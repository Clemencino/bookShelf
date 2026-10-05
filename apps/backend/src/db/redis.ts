import { createClient } from 'redis';

export const Client = createClient({url: 'redis://localhost:6379'});

Client.on('error', (error) => {
    console.log('Redis error:', error);
});

export async function connectRedis() {
    await Client.connect();
}