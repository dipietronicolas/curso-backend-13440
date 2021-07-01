// Este es el archivo que esta subido en glitch.com
// https://glitch.com/edit/#!/root-detailed-forsythia

import http from 'http';
const server = http.createServer((req, res) => {
    const myObject = {
        id: parseInt((Math.random() * 10) + 1 ),
        title: `Producto: ${parseInt((Math.random() * 10) + 1 )}`,
        price: (Math.random() * 10000).toFixed(2),
        thumbnail: `Foto ${parseInt((Math.random() * 10) + 1 )}`
    }
    res.end(`<h1>${JSON.stringify(myObject)}</h1>`);
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`);
})


