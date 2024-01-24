import {test,expect} from '@playwright/test'
test.beforeAll(async () =>  {
	console.log(' beforeAll ');
});
test.beforeEach(async () =>  {
	console.log('beforeEach');
});
test.afterAll(async () =>  {
	console.log('afterAll');
});
test.afterEach(async () =>  {
	console.log('afterEach');
});

test("run 1",async () => {
	console.log('run 1');
});
test("run 2",async () => {
	console.log('run 2');
});
