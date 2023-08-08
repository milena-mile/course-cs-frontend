export function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

sleep(500).then(() => {
    console.log(`I'am awake!`);
 });