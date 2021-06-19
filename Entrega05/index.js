// Este es el archivo que esta subido en glitch.com
// https://glitch.com/edit/#!/root-detailed-forsythia

const http = require('http');
const server = http.createServer((req, res) => {
    const randomNumber = parseInt((Math.random() * 10) + 1 ) 
    const myObject = {
        id: randomNumber,
        title: `Producto: ${randomNumber}`,
        price: (Math.random() * [10, 100, 1000, 10000][parseInt(Math.random() * 3) + 1]).toFixed(2),
        thumbnail: `Foto ${randomNumber}`
    }
    res.end(`<h1>${JSON.stringify(myObject)}</h1>`);
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`);
})
