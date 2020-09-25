function generateId(){
    const chars = '012345678901234567890123456789'
    let id = ''
    for (let i=0; i< 10; i++) {
        id += chars.charAt(Math.random() * 61)
    }
    return parseInt(id)
}

module.exports = { generateId }