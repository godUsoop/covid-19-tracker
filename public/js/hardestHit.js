function runHardestHit() {

    const script = document.querySelector("#hardestHit");
    const searchTerm = script.getAttribute("data-search");
    const data = JSON.parse(searchTerm);
    const storeKeys = [];
    const storeValues = [];

    // store x, y data for chart
    data.forEach((element) => {
        
        storeValues.push(Object.values(element.timeline.cases));

        if (data[0].country == element.country) {
            for (let [key, value] of Object.entries(element.timeline.cases)) {
                const sourceDate = key;
                storeKeys.push(moment(sourceDate, 'MMDDYYYY').format('YYYYMMDD'));
            }
        }
    })


    var ctx = document.getElementById("hardestHitChart").getContext("2d");


    const colors = {
        blue: {
            fill: '#c2f0fc',
            stroke: '#c2f0fc',
        },
        green: {
            fill: "#e8ffff",
            stroke: '#e8ffff',
        },
        brown: {
            fill: '#ece2e1',
            stroke: '#ece2e1',
        },
        purple: {
            fill: '#F5E1FD',
            stroke: '#F5E1FD',
        },
        orange: {
            fill: "#ffd7b5",
            stroke: "#ffd7b5"
        }
    };

    const options = {
        responsive: false,
        // Can't just just `stacked: true` like the docs say
        scales: {
            xAxes: [{
                gridLines: {display: false, drawBorder: false},
                type: "time",
                time: {unit: "month"},
                ticks: {fontSize: 15}
            }],
            yAxes: [{
                stacked: true,
                gridLines: {display: false},
                display: false
            }]
        },
        tooltips: {
            position: "nearest",
            mode: "index",
            intersect: false,
            backgroundColor: 'rgba(255,255,255,1)',
            bodyFontColor: '#434343',
            titleFontColor: "#434343",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "grey",
            callbacks: {
                label: function(tooltipItem, data) {
                    return tooltipItem.yLabel.toLocaleString("en-US");
                }
            }
        }
    }

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: storeKeys,
            datasets: [{
                label: data[4].country,
                fill: true,
                backgroundColor: colors.purple.fill,
                pointBackgroundColor: colors.purple.stroke,
                borderColor: colors.purple.stroke,
                pointHighlightStroke: colors.purple.stroke,
                borderCapStyle: 'butt',
                data: storeValues[4],
                pointRadius: 1

            }, {
                label: data[3].country,
                fill: true,
                backgroundColor: colors.brown.fill,
                pointBackgroundColor: colors.brown.stroke,
                borderColor: colors.brown.stroke,
                pointHighlightStroke: colors.brown.stroke,
                borderCapStyle: 'butt',
                data: storeValues[3],
                pointRadius: 1
            }, {
                label: data[2].country,
                fill: true,
                backgroundColor: colors.green.fill,
                pointBackgroundColor: colors.green.stroke,
                borderColor: colors.green.stroke,
                pointHighlightStroke: colors.green.stroke,
                borderCapStyle: 'butt',
                data: storeValues[2],
                pointRadius: 1
            }, {
                label: data[1].country,
                fill: true,
                backgroundColor: colors.blue.fill,
                pointBackgroundColor: colors.blue.stroke,
                borderColor: colors.blue.stroke,
                pointHighlightStroke: colors.blue.stroke,
                data: storeValues[1],
                pointRadius: 1
            }, {
                label: data[0].country,
                fill: true,
                backgroundColor: colors.orange.fill,
                pointBackgroundColor: colors.orange.stroke,
                borderColor: colors.orange.stroke,
                pointHighlightStroke: colors.purple.stroke,
                borderCapStyle: 'butt',
                data: storeValues[0],
                pointRadius: 1,
            }]
        },
        options: options
    });
}


runHardestHit();