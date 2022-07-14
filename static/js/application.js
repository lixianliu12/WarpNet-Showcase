

        $(document).ready(function(){

        var myChart = Highcharts.chart('containerX', {

        chart: {
          type: 'spline',
          //animation: Highcharts.svg, // don't animate in old IE
          marginRight: 10,
          events: {
              load: function () {
                  // set up the updating of the chart on each sample

                //  var categories = this.xAxis[0].categories;
                  var socket = io.connect('http://' + document.domain + ':' + location.port + '/test');
                  var series = this.series[0]
                //  var series1 = this.series[1]
                  //var series2 = this.series[1]
                  var numbers_received = []
                 socket.on('newnumber', function(msg) {
                      //add chart data to series
                      //var x = new Date().getTime()

                  //setInterval(function () {
                        var x = (new Date()).getTime() // current time
                        var y = msg.number
                        console.log(msg.number)
                      //  y.push(msg.number)
                        //categories.push(y)
                      //  series.addPoint([x, y], true, false, false);
                    //    series1.addPoint(x, true, false, false);
                        series.addPoint([x,y], true, true);
                    //    myChart.redraw();
                    //}, 1000);

                    //  var z = sample.totalSession
                    //  console.log( x + " " + y ) //Printing properly to console e.g 2018-01-25T03:58:35.781 3  211


                      if (numbers_received.length >= 10){
                          numbers_received.shift()
                      }
                      numbers_received.push(msg.number);
                      numbers_string = '';

                      for (var i = 0; i < numbers_received.length; i++){
                          numbers_string = numbers_string + '<p>' +
                          numbers_received[i].toString() + '</p>';
                      }
                      $('#log').html(numbers_string);

                  });

              }
          },
},
time: {
    useUTC: false
},

title: {
    text: 'Live random data'
},

accessibility: {
    announceNewData: {
        enabled: true,
        minAnnounceInterval: 15000,
        announcementFormatter: function (allSeries, newSeries, newPoint) {
            if (newPoint) {
                return 'New point added. Value: ' + newPoint.y;
            }
            return false;
        }
    }
},

xAxis: {
    type: 'datetime',
    tickPixelInterval: 150
},

yAxis: {
    title: {
        text: 'Value'
    },
    plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
    }]
},

tooltip: {
    headerFormat: '<b>{series.name}</b><br/>',
    pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
},

legend: {
    enabled: false
},

exporting: {
    enabled: false
},

series: [{
    name: 'Random data',
    data: (function () {
        // generate an array of random data
        var data = [],
            time = (new Date()).getTime(),
            i;

        for (i = -19; i <= 0; i += 1) {
            data.push({
                x: time + i * 1000,
                y: Math.random()
            });
        }
        return data;
    }())

}]
});

});

/*
Highcharts.chart('container', {
    chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
            load: function () {

                // set up the updating of the chart each second
                var series = this.series[0];
                setInterval(function () {
                    var x = (new Date()).getTime(), // current time
                        y = Math.random();
                    series.addPoint([x, y], true, true);
                }, 1000);
            }
        }
    },

    time: {
        useUTC: false
    },

    title: {
        text: 'Live random data'
    },

    accessibility: {
        announceNewData: {
            enabled: true,
            minAnnounceInterval: 15000,
            announcementFormatter: function (allSeries, newSeries, newPoint) {
                if (newPoint) {
                    return 'New point added. Value: ' + newPoint.y;
                }
                return false;
            }
        }
    },

    xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
    },

    yAxis: {
        title: {
            text: 'Value'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },

    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
    },

    legend: {
        enabled: false
    },

    exporting: {
        enabled: false
    },

    series: [{
        name: 'Random data',
        data: (function () {
            // generate an array of random data
            var data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -19; i <= 0; i += 1) {
                data.push({
                    x: time + i * 1000,
                    y: Math.random()
                });
            }
            return data;
        }())
    }]
});
*/

/*
$(document).ready(function(){
    //connect to the socket server.
    var socket = io.connect('http://' + document.domain + ':' + location.port + '/test');
    var numbers_received = [];
    var numbers_received2 = [];

    var line1 = new TimeSeries();
    //receive details from server
    socket.on('newnumber', function(msg) {
        console.log("Received number" + msg.number);
        //maintain a list of ten numbers
        if (numbers_received.length >= 10){
            numbers_received.shift()
        }
        numbers_received.push(msg.number);
        numbers_string = '';

      //  setInterval(function() {
        //      line1.append(Date.now(), msg.number);//msg.number);
          //},1500);

        for (var i = 0; i < numbers_received.length; i++){
            numbers_string = numbers_string + '<p>' +
            numbers_received[i].toString() + '</p>';
        }
        $('#log').html(numbers_string);

        drawChart(msg.number);
    });

    function drawChart(a){
      setInterval(function() {
        line1.append(new Date().getTime(), a);//msg.number);
      },1000);

    }
    var smoothie = new SmoothieChart({ grid: { strokeStyle: 'rgb(125, 0, 0)', fillStyle: 'rgb(60, 0, 0)', lineWidth: 1, millisPerLine: 250, verticalSections: 6 } });
    smoothie.addTimeSeries(line1, { strokeStyle: 'rgb(0, 255, 0)', fillStyle: 'rgba(0, 255, 0, 0.4)', lineWidth: 3 });
    smoothie.streamTo(document.getElementById("mycanvas"), 1000);

});
*/
