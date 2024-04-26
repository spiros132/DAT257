import { expect, test } from 'vitest'
import { Login } from '../src/app/actions/actions';

test('Login Test', async () => {
    const response = await Login("Test", "Test");

    console.log(response);
});