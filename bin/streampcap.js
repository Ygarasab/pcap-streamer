#!/usr/bin/env node

const streamer = require('..')
const yargs = require('yargs')

const options = yargs
                .usage("Usage : streampcap [filepath]")
                .demandCommand()
                .option('p', {alias : 'port', describe : 'Port that will host the websocket', type : 'number', default : 7000})
                .option('s', {alias : 'packet-size', describe : 'Length of usable buffer per packet', type : 'number', default : 1424})
                .option('c', {alias : 'packet-count', describe : 'Number of packets to be streamed per batch', type : 'number', default : 128})
                .argv

streamer.streamPacket(options._[0], options.p, options.s, options.c)
