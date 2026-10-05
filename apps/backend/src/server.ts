import { app } from './app'
import { connectRedis } from './db/redis'

app.listen(3000, () => {
    console.log('Server running on port 3000');
    connectRedis();
});