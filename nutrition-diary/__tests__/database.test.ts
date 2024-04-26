import { expect, test } from 'vitest'
import { Login } from '../src/app/server/actions';

test('Login Test', async () => {
    const response = await Login("Test", "Test");

    console.log(response);
});