'use strict';

import { networkInterfaces } from 'os';
// const { networkInterfaces } = require('os');
export const getLocalIP = () => {
    const nets = networkInterfaces();
    const results = Object.create(null); // Or just '{}', an empty object
    try {

        for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
                // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
                // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
                const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
                if (net.family === familyV4Value && !net.internal) {
                    if (!results[name]) {
                        results[name] = [];
                    }
                    results[name].push(net.address);
                }
            }
        }
        console.log('My ip ', results)
        return results["enp0s31f6"][0];
    } catch (error) {
        return 'localhost';
    }
}
