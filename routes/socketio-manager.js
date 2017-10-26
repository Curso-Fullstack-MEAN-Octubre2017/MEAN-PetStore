
var SocketIoManager = function(io) {
	this.io = io;

	io.on('connection', function (socket) {
	    console.log('Un cliente se ha conectado');
	    
	    socket.emit('connected', { user: "Servidor", msg: 'Conexion establecida (emit)'});
	    
	    /**
	     * 
	     */
	    socket.on("join", (msg) => {
	    	socket.username = msg;
	    	io.emit('chat:message', { user: "Servidor", "Hola " + socket.username + ". Bienvenido!"});
	    });
	    
	    /**
	     * 
	     */
	    socket.on('chat:message', function(msg){
	    	socket.emit('chat:message', {
	    		user: socket.username,
	    		msg: msg,
	    	});
	    });
	});

}



module.exports = SocketIoManager;