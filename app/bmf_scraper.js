const fetch = require('node-fetch');
const cheerio = require('cheerio');



exports.searchbmf = async (Data, slcTaxa) => {
    const url = 'http://www2.bmf.com.br/pages/portal/bmfbovespa/boletim1/TxRef1.asp?Data=' + Data + "&slcTaxa=" + slcTaxa;
    console.log(url);
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);

   var configObj = [
        { slcTaxa: "ACC", description: "Ajuste cupom", fields: ["day", "value360"] },
        { slcTaxa: "APR", description: "Ajuste pré", fields: ["day", "value252", "value360"] },
        { slcTaxa: "BRP", description: "IBrX-50", fields: ["day", "index"] },
        { slcTaxa: "DCO", description: "Cupom Cambial OC1", fields: ["day", "value360"] },
        { slcTaxa: "DIC", description: "DI x IPCA", fields: ["day", "value252"] },
        { slcTaxa: "DIM", description: "DI x IGP-M", fields: ["day", "value252"] },
        { slcTaxa: "DOC", description: "Cupom limpo", fields: ["day", "value360"] },
        { slcTaxa: "DOL", description: "DI x dólar", fields: ["day", "value360"] },
        { slcTaxa: "DP", description: "Dólar x pré", fields: ["day", "value252", "value360"] },
        { slcTaxa: "EUC", description: "DI x euro", fields: ["day", "value360"] },
        { slcTaxa: "EUR", description: "Real x euro", fields: ["day", "price"] },
        { slcTaxa: "INP", description: "Ibovespa", fields: ["day", "index"] },
        { slcTaxa: "JPY", description: "Real x iene", fields: ["day", "price"] },
        { slcTaxa: "LIB", description: "Libor", fields: ["day", "value360"] },
        { slcTaxa: "PRE", description: "DI x pré", fields: ["day", "value252", "value360"] },
        { slcTaxa: "PTX", description: "Real x dólar", fields: ["day", "price"] },
        { slcTaxa: "SDE", description: "Spread Libor Euro x Dólar", fields: ["day", "taxa"] },
        { slcTaxa: "SLP", description: "Selic x pré", fields: ["day", "value252"] },
        { slcTaxa: "TFP", description: "TBF x pré", fields: ["day", "value252", "value360"] },
        { slcTaxa: "TP", description: "TR x pré", fields: ["day", "value252", "value360"] },
        { slcTaxa: "TR", description: "DI x TR", fields: ["day", "value252", "value360"] },
    ]

    for (i = 0; i < configObj.length; i++) {
        if (configObj[i].slcTaxa == slcTaxa) {
            Main_slcTaxa = configObj[i].slcTaxa;
            Main_description = configObj[i].description;
            Main_fields = configObj[i].fields;
        }
    }

    // console.log(Main_fields.length);

    var results = [];
    var results_format = [];
    $("td.tabelaConteudo1").each(function (i, element) {

        var value = $(element).text().replace(",", ".") * 1;
        if (typeof (value) == "number") {
            results.push(value);
        }

    });

    $("td.tabelaConteudo2").each(function (i, element) {

        var value = $(element).text().replace(",", ".") * 1;
        if (typeof (value) == "number") {
            results.push(value)
        }

    });

    var count = 0;
    var array = [];
    for (var i = 0; i < results.length; i = i + Main_fields.length) {
        // create array
        array = [];
        for (var j = 0; j < Main_fields.length; j++) {
            array[j] = results[i + j];
        }

        results_format.push(array);
        count++;
    }

    // sorting data
    results_format.sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]));

    return results_format;



};


// dateFormat = DD/MM/YYYY
// searchbmf('28/08/2019', 'PRE').then(function (data) {
//     console.log(data);
// });







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

