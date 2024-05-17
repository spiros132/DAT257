import { expect, test, vi } from 'vitest'
import { Login, RegisterUser } from '../src/app/actions/users';
import { getEatenMeals, saveMealAction } from '../src/app/actions/actions';
import { verifySession } from '@/app/lib/session';
import { redirect } from 'next/navigation';
import { getSavedMeals } from '../src/app/lib/database';

/**test('Login Test', async () => {
    console.log(RegisterUser("Test", "Test", "Test"));
    let response = await Login("Test", "Test2");
    expect(response).toBe("Username or password is incorrect!");
    response = await Login("Test", "Test");
    expect(response).toBe(undefined);
});**/

test('Meal Length Test', async () => {
    let res1 = await getEatenMeals(1);
    await saveMealAction("testMeal", "random description", 1,1,1,1,[{food: "burger", quantity: 1}]);
    let res2 = await getEatenMeals(1);
    expect(res1.length + 1).toBe(res2.length);
})
test('Meal Description Test', async () => {
    await saveMealAction("testMeal2", "random description", 1,1,1,1,[{food: "burger", quantity: 1}]);
    let res1 = await getSavedMeals(1, new Date().toISOString().split('T')[0],1);
    expect(res1).toBeDefined()
    res1?.forEach((item) => {
        if(item.name == "testMeal2"){
            console.log("i " + item.description)
            expect(item.description).toBe("random description");
        }
    })
})
test('Meal item test', async () => {
    await saveMealAction("testMeal", "random description", 1,1,1,1,[{food: "burger", quantity: 1}]);
    let res1: {calories:number,carbs:number,protein:number,fat:number, name:string}[] = await getEatenMeals(1);
    expect(res1).toBeDefined();
    res1.forEach((meal: {calories:number ,carbs:number, protein:number,fat:number, name:string}) => {
        expect(meal.name).toBeDefined();
        expect(meal.calories).toBeDefined();
        expect(meal.carbs).toBeDefined();
        expect(meal.protein).toBeDefined();
        expect(meal.fat).toBeDefined();
    })
})