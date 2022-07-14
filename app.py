# -*- coding: utf-8 -*
from flask_socketio import SocketIO, emit
from flask import Flask, render_template, request, session, url_for, copy_current_request_context
import paramiko
from random import random
from time import sleep
from threading import Thread, Event

app = Flask(__name__)
app.secret_key = "super secret key"
app.config['DEBUG'] = True

socketio = SocketIO(app, async_mode=None, logger=True, engineio_logger=True)

thread = Thread()
thread_stop_event = Event()





@app.route('/')
def main():
        return render_template('login.html')

@app.route('/', methods=['POST'])
def value():

    port=22
    para1 = request.form['input1']
    para2 = request.form['input2']
    para3 = request.form['input3']


    ssh_client=paramiko.SSHClient()
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    ssh_client.connect(hostname=para1,port=port,username=para2,password=para3)


    session['p1'] = para1
    session['p2'] = para2
    session['p3'] = para3
    #session['ssh'] = ssh_client
    return render_template('index.html')

@app.route('/value', methods=['POST'])
def command():

    in1 = request.form['param1']
    in2 = request.form['param2']
    in3 = request.form['param3']
    in4 = request.form['param4']
    seldata = request.form['dataset']

    #ssh_client = session.get('ssh', None)
    pa1 = session.get('p1', None)
    pa2 = session.get('p2', None)
    pa3 = session.get('p3', None)

    ssh_client=paramiko.SSHClient()
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh_client.connect(hostname=pa1 ,port=22,username=pa2,password=pa3)

    cmd = in1 + " " + in2
    cmd2= in3 + " " + in4

    stdin,stdout,stderr=ssh_client.exec_command(cmd, get_pty=True)
    def randomNumberGenerator():
        #while not thread_stop_event.isSet():
        for line in stdout:
            output = line.rstrip()
            socketio.emit('newnumber', {'number': output}, namespace='/test')
            socketio.sleep(1)
            print (output)
    '''
    stdin,stdout,stderr=ssh_client.exec_command(cmd2, get_pty=True)
    def randomNumberGenerator2():
        #while not thread_stop_event.isSet():
        for line in stdout:
            output2 = line.rstrip()
            socketio.emit('newnumber2', {'number2': output2}, namespace='/test')
            socketio.sleep(1)
            print (output2)
    '''     
            
    @socketio.on('connect', namespace='/test')
    def test_connect():
    # need visibility of the global thread object
        global thread
        print('Client connected')

    #Start the random number generator thread only if the thread has not been started before.
        #if not thread.isAlive():
         #   print("Starting Thread")
        thread = socketio.start_background_task(randomNumberGenerator)
       # thread = socketio.start_background_task(randomNumberGenerator2)
    #@socketio.on('disconnect', namespace='/test')
    #def test_disconnect():
    #    print('Client disconnected')
    '''    
    stdin,stdout,stderr=ssh_client.exec_command(cmd2)
    for line in stdout:
        print (line.rstrip())

    #print (stdout.read())
    '''
    return render_template('index.html', p1=in1, p2=in2, p3=in3, dat=seldata)




if __name__=='__main__':
    socketio.run(app)
