const pparser = require('pcap-parser')
const bb = require('buffer-broadcaster')
const { exit } = require('yargs')

/**
 * 
 * @param {String} filepath 
 * @param {Number} port 
 * @param {Number} packetSize 
 * @param {Number} packetsPerBatch 
 */
const streamPacket = (filepath, port, packetSize, packetsPerBatch) => {

    const broadcaster = bb.launchBroadcaster(port)
    let parser = pparser.parse(filepath)
    let packets = []
  
    parser.on('packet', packet =>  packets.push(packet.data.subarray(0, packetSize)) )
    parser.on('error', error => {
        console.log(error.message)
        exit(-1)
    })

    let mainInterval = setInterval(() => {
        
        let i = 0
        while (i++ < packetsPerBatch) {
            const packet = packets.shift()
            broadcaster.appendBuffer(packet)
        }
        broadcaster.broadcast()

        if(packets.length < packetsPerBatch) clearInterval(mainInterval)

    }, 1000);

}

module.exports = {
    streamPacket
}