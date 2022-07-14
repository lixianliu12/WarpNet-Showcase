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
