const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = 'http://www2.bmf.com.br/pages/portal/bmfbovespa/boletim1/TxRef1.asp?Data='

function searchbmf(Data,slcTaxa){
    Data=Data;
    slcTaxa=slcTaxa;
    return fetch(url+Data+"&slcTaxa="+slcTaxa).then(response => response.text());
}

//search receide 
//date >> DD/MM/YYYY
//slcTaxa >> <AAA>

searchbmf('08/06/2018','PRE').then(body => {
    const mydata = [];
    var $ = cheerio.load(body);


    $('table.tabConteudo').each(function(i, element){
        const $element = $(element);
        const $rate1 = $element.find('td.tabelaConteudo1').text();
       
        console.log($rate1);

        // const mydata = {
        //     date: $fields[0].text(),

        // };
        // mydata.push(mydata);

      })
        
    //   console.log(mydata);
      //console.log(fields);

})
