
function foo(a, b, c) {
    return a + b + c
}

class Taco {

    constructor(a, b, c) {
        this.d = a + b + c
    }
}

async function timeoutTest(time_ms) {
    setTimeout(time_ms)
    return 1
}

// cheese=cake&687=254&ice+cream=987

function toJSONString(str) {
    let equal_sign = /=/g
    let ampersand = /&/g
    let plus_sign = /\+/g
    str = str.replace(equal_sign, '":"')
    str = str.replace(ampersand, '","')
    str = str.replace(plus_sign, " ")
    return "{\"" + str + "\"}"
}


export default {foo, Taco, toJSONString}