var Hapi = require('hapi');
var Joi = require('joi');
var nconf = require('nconf');

nconf.argv().env().file({ file: 'local.json' });

var options = {
  views: {
    engines: {
      jade: require('jade')
    },
    path: __dirname + '/views',
    compileOptions: {
      pretty: true
    }
  }
};

var server = Hapi.createServer(nconf.get('domain'), nconf.get('authPort'), options);

var routes = [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: getMessages,
      validate: {
        query: {
          name: Joi.string()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/message',
    config: {
      handler: sendMessage
    }
  }
];

server.route(routes);

server.start();

function getMessages(request, reply) {
  reply.view('index', {
    title: 'messages',
    message: 'test'
  });
}

function sendMessage(request, reply) {
  console.log('sending message');
}
