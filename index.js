const {Builder, By, until} = require('selenium-webdriver');


async function run() {
    const builder = new Builder()
        .forBrowser('firefox')
        .usingServer('http://localhost:4444');

    const driver = await builder.build();

    driver.get('http://localhost:8000/pointer.html');

    const resetBtn = await driver.wait(until.elementLocated(By.id('reset-square')), 10000);
    const actionBtn = await driver.wait(until.elementLocated(By.id('action-square')), 10000);

    console.log("Initial heights");
    console.log("reset:  " + await getComputedHeight('reset-square'));
    console.log("action: " + await getComputedHeight('action-square'));
    console.log("");

    // Performs mouse move action onto the element
    console.log("Mousing over the reset button");
    await driver.actions({async: true}).move({origin: resetBtn}).perform();

    console.log("New heights (reset should be 200px)");
    console.log("reset:  " + await getComputedHeight('reset-square'));
    console.log("action: " + await getComputedHeight('action-square'));
    console.log("");


    console.log("Clickign on action button");
    actionBtn.click();

    console.log("New heights (reset should be 100px, action should be 200px)");
    console.log("reset:  " + await getComputedHeight('reset-square'));
    console.log("action: " + await getComputedHeight('action-square'));
    console.log("");

    await driver.quit();

    async function getComputedHeight(id) {
        return await driver.executeScript(
            `return window.getComputedStyle(document.getElementById('${id}')).height;`
        );
    }
}

run();
