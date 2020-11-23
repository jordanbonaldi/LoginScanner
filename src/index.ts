import * as puppeteer from 'puppeteer';
import TemplateCreator from "./Template/TemplateCreator";

import * as spawn from 'child_process';

export function getAllDevices() {
    return puppeteer.devices;
}

/**
 *
 * Handling the process of pulling and updating files from a detached process (action still single threaded)
 *
 * The stdout is piped and logged
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

/**
 * Call of the update script (all the update code can be found in this script)
 */
const commitFile = () => handleEvents(spawn.exec(`./automationPush.sh ${process.argv[2]}`));

/**
 * Defining the template creator returning a promise for asynchronous actions
 * When TemplateCreator has finished all its processes it thus commit the created file
 */
TemplateCreator(process.argv[2], process.argv[3], process.argv[4]).then(() => {
    if (process.argv.length >= 6)
        return commitFile();
});
