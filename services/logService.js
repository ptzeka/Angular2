const log = (app,err) => {
    console.log(app +": " + err)
}
const trace = (app,msg) => {
    console.log(app + "=>" + msg);
}

module.exports = () => {
    return {
        log: log,
        trace:trace
    }
}