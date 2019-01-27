import test from "ava";
import {QueueItemGenerator} from "../../Factories/QueueItemGenerator";

test('Queue preparation - single url', t => {
    let url = 'https://example.org';
    let queueItemFactory = new QueueItemGenerator({crawler: {options: {userAgent: 'foobar'}}, urls: url});
    let result = queueItemFactory.prepareItems(url);

    t.deepEqual(result, {url: url, userAgent: 'foobar', allowedDomains: ['example.org']});
});

test('Queue preparation - array of urls', t => {
    const urls = ['https://example.org', 'https://example.net'];
    const userAgent = 'foobar';
    let queueItemFactory = new QueueItemGenerator({crawler: {options: {userAgent: userAgent}}, urls: urls});
    const result = queueItemFactory.prepareItems(urls);

    t.deepEqual(result, [{
        url: urls[0],
        userAgent: userAgent,
        allowedDomains: ['example.org']
    }, {url: urls[1], userAgent: userAgent, allowedDomains: ['example.net']}]);
});