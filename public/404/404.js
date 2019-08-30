// emotion chart - START


var ctx = document.getElementById('Emotioncanvas_d').getContext('2d');
new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: emotions_label,
        datasets: [
            {
                backgroundColor: emotions_values_color,
                data: emotions_values
            }
        ]
    },
    options: {
        legend: {
            position: 'none',
        },
        title: {
            fontSize: 20,
            fontFamily: "'Lato', sans-serif",
            display: true,
            text: 'Emotions'
        }
    }
});
var ctx = document.getElementById('Emotioncanvas').getContext('2d');
new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: emotions_label,
        datasets: [{
            label: 'values',

            borderWidth: 1,
            backgroundColor: emotions_values_color,
            data: emotions_values_bar
        }],
    },
    options: {

        scales: {
            xAxes: [{

                ticks: {
                    max: 1,
                    min: 0,
                },
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
            text: 'Emotions'
        }
    }
});


 // emotion chart - END