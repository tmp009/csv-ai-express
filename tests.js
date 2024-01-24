const assert = require('assert')

const host = 'http://localhost:3000'
const url = host + '/query'
const filename = 'product.csv'

const createOpts = (prompt) => {
    return {
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        csv: filename,
        prompt: prompt
    })
}
}

const getData = async (prompt) => {
    const resp = await  fetch(url, createOpts(prompt));
    const jsonData = await resp.json()
    return jsonData.data;
}

async function run() {
    try {
        
        console.log('[Returns correct amount of items]')

        console.log('Get 1 summer item\n')
        assert.equal((await getData('Get 1 summer item')).length, 1)

        console.log('[Returns empty array]')

        console.log('Hello world')
        assert.equal((await getData('Hello world')).length, 0)

        console.log('give me a orange item\n')
        assert.equal((await getData("give me a orange item")).length, 0)
        

        console.log('[Get a specific item]')
        
        console.log('Give me a sundress')
        assert.deepEqual((await getData('Give me a sundress')), [{"id":"5","name":"Floral Sundress","price":"6.00€","description":"Light and breezy for summer","color":"Blue","forWinter":"No","forSummer":"Yes","weight":"0.87kg","dimensions":"Size M"}])

        console.log('get item with the id 10')
        assert.deepEqual(await getData("get item with the id 10"), [{"id":"10","name":"UV Protection Sunglasses","price":"10.00€","description":"Stylish and protective","color":"Pink","forWinter":"No","forSummer":"Yes","weight":"0.55kg","dimensions":"33x41x34cm"}])

        console.log('Give me a dress that is size m')
        assert.deepEqual((await getData('Give me a dress that is size m')), [{"id":"5","name":"Floral Sundress","price":"6.00€","description":"Light and breezy for summer","color":"Blue","forWinter":"No","forSummer":"Yes","weight":"0.87kg","dimensions":"Size M"}])
        
        console.log('get the cheapest item for winter\n')
        assert.deepEqual(await getData("get the cheapest item for winter"), [{"id":"3","name":"Stainless Thermos","price":"1.45€","description":"Keeps beverages hot or cold","color":"Yellow","forWinter":"Yes","forSummer":"Yes","weight":"1.77kg","dimensions":"40x30x22cm"}])

        console.log('[Get all items based on attribute]')

        console.log('Give me winter items')
        assert.deepEqual((await getData('Give me winter items')), [{"id":"1","name":"Alpine Hiking Boots","price":"20.00€","description":"Durable boots for mountain treks","color":"Red","forWinter":"Yes","forSummer":"No","weight":"1.25kg","dimensions":"16x19x37cm"},{"id":"3","name":"Stainless Thermos","price":"1.45€","description":"Keeps beverages hot or cold","color":"Yellow","forWinter":"Yes","forSummer":"Yes","weight":"1.77kg","dimensions":"40x30x22cm"},{"id":"4","name":"LED Camping Lantern","price":"9.76€","description":"Bright, long-lasting light","color":"Purple","forWinter":"Yes","forSummer":"Yes","weight":"0.61kg","dimensions":"42x21x12cm"},{"id":"8","name":"Sports Water Bottle","price":"2.00€","description":"Leakproof and insulated","color":"Red","forWinter":"Yes","forSummer":"Yes","weight":"0.24kg","dimensions":"21x22x10cm"}])
        
        console.log('All pink products')
        assert.deepEqual(await getData("All pink products"), [{"id":"7","name":"Travel Backpack","price":"45.10€","description":"Spacious and durable","color":"Pink","forWinter":"No","forSummer":"No","weight":"1.77kg","dimensions":"11x43x25cm"},{"id":"9","name":"Insulated Snow Pants","price":"6.78€","description":"Waterproof and warm","color":"Pink","forWinter":"No","forSummer":"No","weight":"0.77kg","dimensions":"28x46x36cm"},{"id":"10","name":"UV Protection Sunglasses","price":"10.00€","description":"Stylish and protective","color":"Pink","forWinter":"No","forSummer":"Yes","weight":"0.55kg","dimensions":"33x41x34cm"}])

        console.log('get items that are the color black')
        assert.deepEqual(await getData("get items that are the color black"), [{"id":"2","name":"Summer Beach Towel","price":"70.00€","description":"Soft, absorbent, and colorful","color":"Black","forWinter":"No","forSummer":"Yes","weight":"0.70kg","dimensions":"30x50x34cm"}])




    } catch (error) {
        console.log(error)
    }
}
run()