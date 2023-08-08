import { sleep } from "./task-1.mjs";

export function timeout(promise, ms) {
    return Promise.race([promise, sleep(ms).then(() => Promise.reject("Timeout"))]);
}

// Через 200 мс Promise будет зареджекчен
timeout(fetch('//my-data'), 200).then(console.log).catch(console.error);