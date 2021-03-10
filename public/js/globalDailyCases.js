function runChart()  {

    
    // receieve data from script's attribute
    const script = document.querySelector("#globalDailyCases")
    const searchTerm = script.getAttribute("data-search");
    const data = JSON.parse(searchTerm);


    
    const storeValues = [];
    const storeKeys = [];

    // data extraction from api
    for (let [key, value] of Object.entries(data.cases)) {
        storeValues.push(value);
        
        
        const sourceDate = key;
        storeKeys.push(moment(sourceDate, 'MMDDYYYY').format('YYYYMMDD'));
    }

    Chart.defaults.LineWithLine = Chart.defaults.line;
    Chart.controllers.LineWithLine = Chart.controllers.line.extend({
        draw: function(ease) {
            Chart.controllers.line.prototype.draw.call(this, ease);

            if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
                var activePoint = this.chart.tooltip._active[0],
                    ctx = this.chart.ctx,
                    x = activePoint.tooltipPosition().x,
                    topY = this.chart.legend.bottom,
                    bottomY = this.chart.chartArea.bottom;
            

                // draw line
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, topY);
                ctx.lineTo(x, bottomY);
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#07C';
                ctx.stroke();
                ctx.restore();
            }
        }
    });


    const options = {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display:false
                },
                type: "time",
                time: {
                    unit: "month"
                },
                ticks: {
                    fontSize: 25
                }
            }],
            yAxes: [{
                ticks: {
                    min: 0,
                    stepSize: 20000000,
                    fontSize: 25
                },
                position: "right",
                gridLines: {
                    display:false
                }   
            }]
        },
        tooltips: {
            mode: "index",
            intersect: false,
            bodyFontSize: 25,
            titleFontSize: 25,
            backgroundColor: "rgba(255,255,255,1)",
            bodyFontColor: "#434343",
            titleFontColor: "#434343",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "grey",
            xPadding: 25,
            yPadding: 30,
            custom: function(tooltip) {
                tooltip.displayColors = false;
            },
            callbacks: {
                label: function(tooltipItem, data) {
                    return tooltipItem.yLabel.toLocaleString("en-US") + " confirmed";
                }
            },
        }
    }

    // instantiate the Chart class
    let chart = new Chart(globalCasesChart, {
        type: "LineWithLine",
        data: {
            labels: storeKeys,
            datasets: [{ 
                data: storeValues,
                backgroundColor: 'grey',
                borderColor: 'grey',
                fill: false
            }]
        },
        options: options
    });
}


runChart();