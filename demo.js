/**
 * Hapi-and-healthy API demo
 * @author Adam Eivy
 *
 * \[._.]/
 *
 * This demonstrates the hapi-and-healthy plugin for rendering a configurable health/service-status API
 */

// Server Layer
// http://hapijs.com/api
var Hapi       = require('hapi');
var server     = new Hapi.Server(3192);

// include package so we can get the version number
var pjson      = require('./package.json');

server.pack.register({
        // a real app would do this:
        //plugin: require('hapi-and-healthy'),
        // but I'm dogfooding here:
        plugin: require('./index'),
        options: {
            ltm:{
                // a series of tests that will tell if this node
                // is configured badly or has some other reason it
                // should be pulled out of rotation
                test:[
                    function(){
                        return true;
                    },
                    function(){
                        return false;
                    }
                ]
            }
        }
    },
    function(err, a){
        if (err) {
            throw err;
        }
    }
);

/**
 * Start the Server!
 */
server.start(function () {
    console.log('Server running at:', server.info.uri, 'version: ', pjson.version);
});