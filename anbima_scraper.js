const fetch = require('node-fetch');
const cheerio = require('cheerio');


const ambima_isHoliday = async (CheckDate) => {

    MyDate = CheckDate.split('/');
    CheckDay = MyDate[0] * 1;
    CheckMonth = MyDate[1] * 1;
    Year = MyDate[2] * 1;

    var weekendcheck = new Date(Year, CheckMonth - 1, CheckDay);
    if (weekendcheck.getDay() == 0 || weekendcheck.getDay() == 6) {
        return true;
    }

    // console.log(Year);

    const url = 'https://www.anbima.com.br/feriados/fer_nacionais/' + Year + ".asp";
    console.log(url);
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);

    var results = [];
    var results_format = [];
    $("td.tabela").each(function (i, element) {

        var value = $(element).text();
        // if (typeof (value) == "number") {
        results.push(value);
        // }


    })

    Main_fields = ["Date", "WeekDay", "Description"];

    var count = 0;
    var array = [];
    for (var i = 3; i < results.length; i = i + 3) {
        // create array
        array = [];
        for (var j = 0; j < 1; j++) {

            array[Main_fields[j]] = results[i + j];

            if (Main_fields[j] == "Date") {
                MyDate = array.Date.split('/');
                Day = MyDate[0] * 1;
                Month = MyDate[1] * 1;
                Year = Year;

                array[Main_fields[j]] = Day + "/" + Month + "/" + Year;
                if (Day == CheckDay && Month == CheckMonth) {
                    return true;
                }
            }

        }

        results_format.push(array);
        count++;
    }

    // // sorting data
    // results_format.sort((a, b) => parseFloat(a.day) - parseFloat(b.day));

    // return results_format;
    // console.log(results_format);
    return false;
};



// dateFormat = DD/MM/YYYY
// ambimaholiday('25/08/2019');
ambima_isHoliday('27/08/2079').then(function (data) {
    console.log(data);
});
