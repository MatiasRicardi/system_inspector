const fastify          = require('fastify')();
const path             = require('path');
const systemInfo       = require('systeminformation');
const fastifyStatic    = require('@fastify/static');
const fastifyView      = require('@fastify/view');
const fastifyWebSocket = require('@fastify/websocket');
const ejs              = require('ejs');
const port             = process.env.PORT || 3280;

//loading plugins
async function registerPlugins() {
  await fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/public/',
  });

  await fastify.register(fastifyView, {
    engine: { ejs },
    root: path.join(__dirname, 'views'),
  });

  await fastify.register(fastifyWebSocket);
}

// loading routes
async function loadRoutes(fastify) {
  //main route to render the index.ejs
  fastify.get('/', async (req, reply) => {
    return reply.view('index.ejs');
  });

  //websocket route
  fastify.get('/ws', { websocket: true }, (socket, req) => {
    try {
      console.debug(`New socket connection!`);
      
      socket.on('message', async (message) => {
        //fronten will send message 'getFreshData' to get fresh data every 5 seconds
        if (message == 'getFreshData') {
          const cpuLoad = await systemInfo.currentLoad();
          const memory = await systemInfo.mem(); 
          const diskUsage = await systemInfo.fsSize();
          //top teen processes order by cpu usage
          const processes = (await systemInfo.processes()).list.sort((a, b) => b.cpu - a.cpu) .slice(0, 10);
          socket.send(JSON.stringify({ cpuLoad, memory, disk: diskUsage, processes }));
        }
      });

      socket.on('error', (error) => {
        console.error(`Error socket connection :`, error);
      });
    
      socket.on('close', (code, reason) => {
        console.log(`Socket connection closed :`, { code, reason });
      });
    } catch (error) {
      console.error(`Error:`, error);
    }
  });
  
}

// starting server
async function start(fastify) {
  try {
    await registerPlugins();
    await loadRoutes(fastify);
    await fastify.listen({ port });
    console.log('====> Server listening on port', port);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start(fastify);
