$(document).ready(function () {

    // myPlot = document.createElement("canvas");
    // myPlot.setAttribute("id", "myChart");
    // myPlot.setAttribute("style", "width: 700px; height: 500px");
    // document.getElementById("insidePlot").appendChild(myPlot);
    // document.getElementById('insidePlot').setAttribute("style", "width: 700px; height: 500px");


    //start plot
    // var ctx = document.getElementById('myChart').getContext('2d');



    $("#datepicker").datepicker({ dateFormat: "dd/mm/yy" });


    var optionsselect = ["ACC", "APR", "BRP", "DCO", "DIC", "DIM", "DOC", "DOL", "DP", "EUC", "EUR",
        "INP", "JPY", "LIB", "PRE", "PTX", "SDE", "SLP", "TFP", "TP", "TR"];

    for (var i = 0; i < optionsselect.length; i++) {
        if (optionsselect[i] == "PRE") {
            $('#slcTaxa').append('<option selected="selected">' + optionsselect[i] + '</option>');
        }
        else {
            $('#slcTaxa').append('<option>' + optionsselect[i] + '</option>');
        }
    }



});

$("#runapp").on("click", function (event) {

    $("#datepicker").datepicker({ dateFormat: "dd/mm/yy" });

    if ($("#datepicker").val().indexOf("/") == -1) {
        // $("#datepicker").attr("aria-invalid", "true");

        // $("#datepicker").datepicker("destroy");
        $("#datepicker")[0].setCustomValidity('Enter a valid date');
        setTimeout(function () {
            $("#datepicker").datepicker({ dateFormat: "dd/mm/yy" });;
        }, 100);
    }
    else {
        event.preventDefault();

        if (document.getElementById('myChart') != null) {
            document.getElementById('myChart').remove();
        }

        $('#loadingscreen').css('display', 'flex');
        // console.log($("#datepicker").datepicker({ dateFormat: "dd/mm/yy" }).val());
        // console.log($("#slcTaxa").val());

        // clear table and clear plot
        request = {
            date: $("#datepicker").datepicker({ dateFormat: "dd/mm/yy" }).val(),
            slcTaxa: $("#slcTaxa").val()
        };



        if (document.getElementById('myTable') != null) {
            document.getElementById('myTable').remove();
        }
        // clear table and clear plot - END

        // api route get goes here!!!
        // $('#Emotioncanvas').destroy();
        // $('.chartjs-size-monitor').remove();


        // $('#graph-div').append('<canvas id="Emotioncanvas" style="display: block; width: 500px; height: 400px;" class="chartjs-render-monitor"></canvas>');

        $.post("/api/BMFsearch", request).then(function (response) {
            $('#loadingscreen').css('display', 'none');
            console.log(response);

            myPlot = document.createElement("canvas");
            myPlot.setAttribute("id", "myChart");
            myPlot.setAttribute("style", "width: 700px; height: 500px");
            document.getElementById("insidePlot").appendChild(myPlot);
            document.getElementById('insidePlot').setAttribute("style", "width: 700px; height: 500px");


            //start plot
            var ctx = document.getElementById('myChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: response.time,
                    datasets: [{
                        data: response.value,
                        label: 'values',
                        fill: false,
                        borderWidth: 1,
                        // backgroundColor: [],
                        lineTension: 0,
                        borderWidth: 1,
                        borderColor: 'black',
                        fill: false,
                        borderDash: [5, 5],
                    }],
                },
                options: {

                    scales: {
                        xAxes: [{

                            // ticks: {
                            //     max: 1,
                            //     min: 0,
                            // },
                        }],

                    },
                    // Elements options apply to all of the options unless overridden in a dataset
                    // In this case, we are setting the border of each horizontal bar to be 2px wide
                    elements: {
                        rectangle: {
                            borderWidth: 2,
                        }
                    },
                    responsive: true,
                    legend: {
                        position: 'none',
                    },
                    title: {
                        fontSize: 20,
                        fontFamily: "'Lato', sans-serif",
                        display: true,
                        text: response.date + ", " + request.slcTaxa
                    }
                }
            });//end plot

            // start table

            myTable = document.createElement("table");
            myTable.setAttribute("id", "myTable");
            // myTable.setAttribute("style", "width: 700px; height: 500px");
            document.getElementById("insideTable").appendChild(myTable);
            // document.getElementById('insidePlot').setAttribute("style", "width: 700px; height: 500px");

            var table_data = '';
            table_data += table_data + '<tr>';
            table_data += '<th>' + "Time (days)" + '</th>';
            table_data += '<th>' + request.slcTaxa + " value" + '</th>';
            table_data += '</tr>';

            for (i = 0; i < response.time.length; i++) {
                table_data += '<tr>';
                table_data += '<td>' + response.time[i] + '</td>';
                table_data += '<td>' + response.value[i] + '</td>';
                table_data += '</tr>';
            }

            $('#myTable').append(table_data);
            console.log(table_data);
            // end table

        });

    }
})
