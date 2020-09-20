import * as puppeteer from 'puppeteer';
import TemplateCreator from "./Template/TemplateCreator";

import * as spawn from 'child_process';

export function getAllDevices() {
    return puppeteer.devices;
}

/**
 *
 * @param execution
 */
const handleEvents = (execution: any) => {
    execution.stdout.on('data', (data: any) =>
        console.log(`${data}`)
    );

    execution.on('close', () =>
        console.log(`Program closed`)
    );
}

const commitFile = () => handleEvents(spawn.exec(`./automationPush.sh ${process.argv[2]}`));

TemplateCreator(process.argv[2], process.argv[3], process.argv[4]).then(() => {
    return commitFile();
});
