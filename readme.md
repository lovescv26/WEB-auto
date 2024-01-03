## error 1 beforeALL  (test error)
#  beforeAll   XD
Error: "context" and "page" fixtures are not supported in "beforeAll" since they are created on a per-test basis.
If you would like to reuse a single page between tests, create context manually with browser.newContext(). See https://aka.ms/playwright/reuse-page for details.
If you would like to configure your page before each test, do that in beforeEach hook instead.

----
[ref](https://github.com/microsoft/playwright/issues/12408)
Replace beforeAll with beforeEach then it will work.

Playwright Test has context isolation by default, this means you have a new page and context for each test. By this its not possible to give you a page instance in the beforeAll hook, since there are different pages for each test. See here for more information:
