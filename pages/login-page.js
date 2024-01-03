export class LoginPage{
	constructor(page){
		this.page = page;
		this.usernameInputField = page.locator('input[id="username"]');
		this.passwordInputField = page.locator('input[id="password"]');
		this.submitButton = page.locator('button[id="submit"]');
	}
}
//[ref](https://medium.com/@austejamitz/test-automation-for-a-simple-login-page-with-playwright-b2dc6060ca36)
async isUsernameInputFieldVisible(){
	const usernameInputField = this.usernameInputField;
	return await usernameInputField.isVisible();
}
async isPasswordInputFiledVisible(){
	const passwordInputField = this.passwordInputField;
	return await passwordInputField.isVisible();
}
async isSubmitButtonVisible(){
	const submitButton = this.submitButton;
	return await submitButton.isVisible();
}

