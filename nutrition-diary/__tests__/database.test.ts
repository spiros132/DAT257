import { expect, test } from 'vitest'
import { Login, RegisterUser } from '../src/app/actions/users';
import { getEatenMeals, saveMealAction } from '@/app/actions/actions';
import { get } from 'http';

test('Login Test', async () => {
    console.log(RegisterUser("Test", "Test", "Test"));
    let response = await Login("Test", "Test2");
    expect(response).toBe("Username or password is incorrect!");
    response = await Login("Test", "Test");
    expect(response).toBe(undefined);
});

test('Mealtest', async () => {
    let res = await Login("Test", "Test");
    expect(res).toBe(undefined);
    let res1 = await getEatenMeals(1);
    await saveMealAction("testMeal", "random description", 1,1,1,1,[{food: "burger", quantity: 1}]);
    let res2 = await getEatenMeals(1);
    expect(res1.length + 1).toBe(res2.length);
})