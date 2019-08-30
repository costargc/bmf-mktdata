$(document).ready(function () {
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
        // console.log($("#datepicker").datepicker({ dateFormat: "dd/mm/yy" }).val());
        // console.log($("#slcTaxa").val());

        request = {
            date: $("#datepicker").datepicker({ dateFormat: "dd/mm/yy" }).val(),
            slcTaxa: $("#slcTaxa").val()
        };

        // api route get goes here!!!
        // $('#Emotioncanvas').destroy();
        // $('.chartjs-size-monitor').remove();


        // $('#graph-div').append('<canvas id="Emotioncanvas" style="display: block; width: 500px; height: 400px;" class="chartjs-render-monitor"></canvas>');

        $.post("/api/BMFsearch", request).then(function (response) {

            console.log(response);

            if (document.getElementById('myChart') != null) {
                document.getElementById('myChart').remove();
            }

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

        });

    }
})
