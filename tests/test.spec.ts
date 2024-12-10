import { test } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { DashboardPage } from '../page-objects/DashBoardPage';

test.describe('User login tests', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);

        await loginPage.goTo('https://animated-gingersnap-8cf7f2.netlify.app/');
        await loginPage.login('admin', 'password123');
        await dashboardPage.verifyLoginSuccess()
    });

    // Test Case 1
    // Login to Demo App.
    // Navigate to "Web Application."
    // Verify "Implement user authentication" is in the "To Do" column.
    // Confirm tags: "Feature" "High Priority”
    test('TestCase1', async ({ page }) => {
        await dashboardPage.verifyItemInState('webApp', 'todo', 'Implement user authentication', ['Feature', 'High Priority']);
    });


    // Test Case 2
    // Login to Demo App.
    // Navigate to "Web Application."
    // Verify "Fix navigation bug" is in the "To Do" column.
    // Confirm tags: "Bug"
    test('TestCase2', async ({ page }) => {
        await dashboardPage.verifyItemInState('webApp', 'todo', 'Fix navigation bug', ['Bug']);
    });


    // Test Case 3
    //     Login to Demo App.
    //     Navigate to "Web Application."
    //     Verify "Design system updates" is in the "In Progress" column.
    //     Confirm tags: "Design”
    test('TestCase3', async ({ page }) => {
        await dashboardPage.verifyItemInState('webApp', 'inProgress', 'Design system updates', ['Design']);
    });

    // Test Case 4
    //     Login to Demo App.
    //     Navigate to "Mobile Application."
    //     Verify "Push notification system" is in the "To Do" column.
    //     Confirm tags: "Feature”
    test('TestCase4', async ({ page }) => {
        await dashboardPage.verifyItemInState('mobileApp', 'todo', 'Push notification system', ['Feature']);
    });

    // Test Case 5
    //     Login to Demo App.
    //     Navigate to "Mobile Application."
    //     Verify "Offline mode" is in the "In Progress" column.
    //     Confirm tags: "Feature" & "High Priority”
    test('TestCase5', async ({ page }) => {
        await dashboardPage.verifyItemInState('mobileApp', 'inProgress', 'Offline mode', ['Feature', 'High Priority']);
    });

    // Test Case 6
    //     Login to Demo App.
    //     Navigate to "Mobile Application."
    //     Verify "App icon design" is in the "Done" column.
    //     Confirm tags: "Design”
    test('TestCase6', async ({ page }) => {
        await dashboardPage.verifyItemInState('mobileApp', 'done', 'App icon design', ['Design']);
    });


    test.afterEach(async ({ page }) => {
        await page.close();
    });
});