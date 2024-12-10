import { Page } from 'playwright';
import {expect, Locator} from "@playwright/test";

export class DashboardPage {
    private page: Page;

    private webApp: string = 'button:has-text("Web Application")';
    private webAppHeader: string = 'header h1:has-text("Web Application")';
    private mobileApp: string = 'button:has-text("Mobile Application")';
    private mobileAppHeader: string = 'header h1:has-text("Mobile Application")';
    private marketingCampaign: string = 'button:has-text("Marketing Campaign")';
    private marketingCampaignHeader: string = 'header h1:has-text("Marketing Campaign")';

    private todoStageHeader: string = 'h2:has-text("To Do")'
    private inProgressStageHeader: string = 'h2:has-text("In Progress")'
    private reviewStageHeader: string = 'h2:has-text("Review")'
    private doneStageHeader: string = 'h2:has-text("Done")'

    constructor(page: Page) {
        this.page = page;
    }

    async verifyLoginSuccess() {
        await this.page.isVisible(this.webApp);
        await this.page.isVisible(this.mobileApp);
        await this.page.isVisible(this.marketingCampaign);
    }

    async goToApp(appName: string) {
        const mapping = {
            'webApp' : {locator: this.webApp, headerStr: this.webAppHeader},
            'mobileApp': {locator: this.mobileApp, headerStr: this.mobileAppHeader},
            'marketingCampaign': {locator: this.marketingCampaign, headerStr: this.marketingCampaignHeader},
        }
        await this.page.click(mapping[appName].locator);
        await this.page.isVisible(mapping[appName].headerStr);
    }

    async getStageContent(stage: string) {
        const stageLocatorMap = {
            'todo': this.todoStageHeader,
            'inProgress': this.inProgressStageHeader,
            'review': this.reviewStageHeader,
            'done': this.doneStageHeader
        }
        const stageContent: Locator = this.page.locator(stageLocatorMap[stage]).locator('xpath=..');
        await stageContent.waitFor();

        return stageContent;
    }

    async getStageCardItems(stageContent: Locator) {
        return await stageContent.locator('div').evaluateAll((taskElements) => {
            const tasks: Record<string, string[]> = {};

            taskElements.forEach((task) => {
                const title = task.querySelector('h3')?.textContent?.trim();
                // const detail = task.querySelector('p')?.textContent?.trim();
                const tags = Array.from(
                    task.querySelectorAll('div.flex.flex-wrap.gap-2 > span')
                ).map((tag) => tag.textContent?.trim());
                // const author = task.querySelector('.flex.items-center.gap-1 span')?.textContent?.trim();
                // const date = task.querySelector(
                //     '.flex.items-center.gap-1:last-of-type span'
                // )?.textContent?.trim();

                if (title) {
                    tasks[title] = tags;
                }
            });

            return tasks;
        });
    }

    async verifyItemInState(appName: string, stage: string, itemName: string, tags: string[]) {
        await this.goToApp(appName);
        const stageContent: Locator = await this.getStageContent(stage)
        const cardItems = await this.getStageCardItems(stageContent);

        expect(JSON.stringify(cardItems[itemName].sort()) == JSON.stringify(tags.sort())).toBeTruthy()
    };

}