import { expect, test, vi } from 'vitest'
import { Login, RegisterUser } from '../src/app/actions/users';
import { getEatenMeals, saveMealAction } from '../src/app/actions/actions';
import { verifySession } from '@/app/lib/session';
import { redirect } from 'next/navigation';

/**test('Login Test', async () => {
    console.log(RegisterUser("Test", "Test", "Test"));
    let response = await Login("Test", "Test2");
    expect(response).toBe("Username or password is incorrect!");
    response = await Login("Test", "Test");
    expect(response).toBe(undefined);
});**/

test('Mealtest', async () => {
    vi.mock("../src/app/lib/session", () => ({verifySession: vi.fn().mockReturnValue({isAuth: true, userId: 1})}));
    vi.mock("next/navigation", () => ({ redirect: vi.fn() }));
    let res1 = await getEatenMeals(1);
    await saveMealAction("testMeal", "random description", 1,1,1,1,[{food: "burger", quantity: 1}]);
    let res2 = await getEatenMeals(1);
    expect(res1.length + 1).toBe(res2.length);
})