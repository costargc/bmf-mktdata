const fetch = require('node-fetch');
const cheerio = require('cheerio');

const searchbmf = async (Data, slcTaxa) => {
    const url = 'http://www2.bmf.com.br/pages/portal/bmfbovespa/boletim1/TxRef1.asp?Data=' + Data + "&slcTaxa=" + slcTaxa;
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);

    linebreak = $('#tb_principal1').find('tr').replaceWith('\t');
    var arr = [];
    linebreak.each(function (i, element) {
        const $element = $(element);
        const $data = $element.find('td').text().replace(/,/g, '.').replace('\n', '\t').replace(' \n', '\t');
        arr[i] = $data;
    })

    console.log(arr.length);
    console.log(arr[arr.length-1]);
}

searchbmf('08/06/2018', 'PRE'); // dateFormat = DD/MM/YYYY



// | slcTaxa  | name |
// | ------------- | ------------- |
// | ACC  | Ajuste cupom  |
// | APR  | Ajuste pré  |
// | BRP| IBrX-50 |
// | DCO| Cupom Cambial OC1 |
// | DIC| DI x IPCA |
// | DIM| DI x IGP-M |
// | DOC| Cupom limpo |
// | DOL| DI x dólar |
// | DP| Dólar x pré |
// | EUC| DI x euro |
// | EUR| Real x euro |
// | INP| Ibovespa |
// | JPY| Real x iene |
// | LIB| Libor |
// | PRE| DI x pré |
// | PTX| Real x dólar |
// | SDE| Spread Libor Euro x Dólar |
// | SLP| Selic x pré |
// | TFP| TBF x pré |
// | TP| TR x pré |
// | TR| DI x TR |