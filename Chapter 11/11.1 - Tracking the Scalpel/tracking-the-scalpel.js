// crow-tech.js code from https://eloquentjavascript.net/
function boilerplate() {
  const connections = [
    'Church Tower-Sportsgrounds',
    'Church Tower-Big Maple',
    'Big Maple-Sportsgrounds',
    'Big Maple-Woods',
    "Big Maple-Fabienne's Garden",
    "Fabienne's Garden-Woods",
    "Fabienne's Garden-Cow Pasture",
    'Cow Pasture-Big Oak',
    'Big Oak-Butcher Shop',
    'Butcher Shop-Tall Poplar',
    'Tall Poplar-Sportsgrounds',
    'Tall Poplar-Chateau',
    'Chateau-Great Pine',
    "Great Pine-Jacques' Farm",
    "Jacques' Farm-Hawthorn",
    'Great Pine-Hawthorn',
    "Hawthorn-Gilles' Garden",
    "Great Pine-Gilles' Garden",
    "Gilles' Garden-Big Oak",
    "Gilles' Garden-Butcher Shop",
    'Chateau-Butcher Shop',
  ];

  function getStorageFor(name) {
    let storage = Object.create(null);

    storage['food caches'] = ['cache in the oak', 'cache in the meadow', 'cache under the hedge'];
    storage['cache in the oak'] =
      'A hollow above the third big branch from the bottom. Several pieces of bread and a pile of acorns.';
    storage['cache in the meadow'] =
      'Buried below the patch of nettles (south side). A dead snake.';
    storage['cache under the hedge'] =
      "Middle of the hedge at Gilles' garden. Marked with a forked twig. Two bottles of beer.";
    storage['enemies'] = [
      "Farmer Jacques' dog",
      'The butcher',
      'That one-legged jackdaw',
      'The boy with the airgun',
    ];

    if (name == 'Church Tower' || name == 'Hawthorn' || name == 'Chateau')
      storage['events on 2017-12-21'] =
        "Deep snow. Butcher's garbage can fell over. We chased off the ravens from Saint-Vulbas.";

    let hash = 0;
    for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
    for (let y = 1985; y <= 2018; y++) {
      storage[`chicks in ${y}`] = hash % 6;
      hash = Math.abs((hash << 2) ^ (hash + y));
    }

    if (name == 'Big Oak') storage.scalpel = "Gilles' Garden";
    else if (name == "Gilles' Garden") storage.scalpel = 'Woods';
    else if (name == 'Woods') storage.scalpel = 'Chateau';
    else if (name == 'Chateau' || name == 'Butcher Shop') storage.scalpel = 'Butcher Shop';
    else storage.scalpel = 'Big Oak';

    for (let prop of Object.keys(storage)) storage[prop] = JSON.stringify(storage[prop]);

    return storage;
  }

  class Network {
    constructor(connections, getStorageFor) {
      let reachable = Object.create(null);

      for (let [from, to] of connections.map((conn) => conn.split('-'))) {
        (reachable[from] || (reachable[from] = [])).push(to);
        (reachable[to] || (reachable[to] = [])).push(from);
      }

      this.nodes = Object.create(null);

      for (let name of Object.keys(reachable))
        this.nodes[name] = new Node(name, reachable[name], this, getStorageFor(name));

      this.types = Object.create(null);
    }

    defineRequestType(name, handler) {
      this.types[name] = handler;
    }

    everywhere(f) {
      for (let node of Object.values(this.nodes)) f(node);
    }
  }

  function ser(value) {
    return value == null ? null : JSON.parse(JSON.stringify(value));
  }

  const $storage = Symbol('storage'),
    $network = Symbol('network');

  class Node {
    constructor(name, neighbors, network, storage) {
      this.name = name;
      this.neighbors = neighbors;
      this[$network] = network;
      this[$storage] = storage;
      this.state = Object.create(null);
    }

    send(to, type, message, callback) {
      let toNode = this[$network].nodes[to];

      if (!toNode || !this.neighbors.includes(to))
        return callback(new Error(`${to} is not reachable from ${this.name}`));

      let handler = this[$network].types[type];

      if (!handler) return callback(new Error('Unknown request type ' + type));

      if (Math.random() > 0.03)
        setTimeout(() => {
          try {
            handler(toNode, ser(message), this.name, (error, response) => {
              setTimeout(() => callback(error, ser(response)), 10);
            });
          } catch (e) {
            callback(e);
          }
        }, 10 + Math.floor(Math.random() * 10));
    }

    readStorage(name, callback) {
      let value = this[$storage][name];
      setTimeout(() => callback(value && JSON.parse(value)), 20);
    }

    writeStorage(name, value, callback) {
      setTimeout(() => {
        this[$storage][name] = JSON.stringify(value);
        callback();
      }, 20);
    }
  }

  const network = new Network(connections, getStorageFor);
  const nests = network.nodes;
  const everywhere = network.everywhere.bind(network);
  const defineRequestType = network.defineRequestType.bind(network);
  const types = network.types;

  return { nests, everywhere, defineRequestType, types };
}

// 11_async.js code from https://eloquentjavascript.net/
function exampleCode() {
  const { nests, defineRequestType, everywhere, types } = boilerplate();

  function requestType(name, handler) {
    defineRequestType(name, (nest, content, source, callback) => {
      try {
        Promise.resolve(handler(nest, content, source)).then(
          (response) => callback(null, response),
          (failure) => callback(failure)
        );
      } catch (exception) {
        callback(exception);
      }
    });
  }

  defineRequestType('note', (nest, content, source, done) => {
    console.log(`${nest.name} received note: ${content}`);
    done();
  });

  requestType('ping', () => 'pong');

  requestType('gossip', (nest, message, source) => {
    if (nest.state.gossip.includes(message)) return;
    console.log(`${nest.name} received gossip '${message}' from ${source}`);
    sendGossip(nest, message, source);
  });

  requestType('connections', (nest, { name, neighbors }, source) => {
    let connections = nest.state.connections;
    if (JSON.stringify(connections.get(name)) == JSON.stringify(neighbors)) return;
    connections.set(name, neighbors);
    broadcastConnections(nest, name, source);
  });

  requestType('route', (nest, { target, type, content }) => {
    return routeRequest(nest, target, type, content);
  });

  requestType('storage', (nest, name) => storage(nest, name));

  everywhere((nest) => {
    nest.state.gossip = [];
    nest.state.connections = new Map();
    nest.state.connections.set(nest.name, nest.neighbors);
    broadcastConnections(nest, nest.name);
  });

  let Timeout = class Timeout extends Error {};

  function request(nest, target, type, content) {
    return new Promise((resolve, reject) => {
      let done = false;
      function attempt(n) {
        nest.send(target, type, content, (failed, value) => {
          done = true;
          if (failed) reject(failed);
          else resolve(value);
        });
        setTimeout(() => {
          if (done) return;
          else if (n < 3) attempt(n + 1);
          else reject(new Timeout('Timed out'));
        }, 250);
      }
      attempt(1);
    });
  }

  function storage(nest, name) {
    return new Promise((resolve) => {
      nest.readStorage(name, (result) => resolve(result));
    });
  }

  function availableNeighbors(nest) {
    let requests = nest.neighbors.map((neighbor) => {
      return request(nest, neighbor, 'ping').then(
        () => true,
        () => false
      );
    });
    return Promise.all(requests).then((result) => {
      return nest.neighbors.filter((_, i) => result[i]);
    });
  }

  function sendGossip(nest, message, exceptFor = null) {
    nest.state.gossip.push(message);
    for (let neighbor of nest.neighbors) {
      if (neighbor == exceptFor) continue;
      request(nest, neighbor, 'gossip', message);
    }
  }

  function broadcastConnections(nest, name, exceptFor = null) {
    for (let neighbor of nest.neighbors) {
      if (neighbor == exceptFor) continue;
      request(nest, neighbor, 'connections', {
        name,
        neighbors: nest.state.connections.get(name),
      });
    }
  }

  function findRoute(from, to, connections) {
    let work = [{ at: from, via: null }];
    for (let i = 0; i < work.length; i++) {
      let { at, via } = work[i];
      for (let next of connections.get(at) || []) {
        if (next == to) return via;
        if (!work.some((w) => w.at == next)) {
          work.push({ at: next, via: via || next });
        }
      }
    }
    return null;
  }

  function routeRequest(nest, target, type, content) {
    if (nest.neighbors.includes(target)) {
      return request(nest, target, type, content);
    } else {
      let via = findRoute(nest.name, target, nest.state.connections);
      if (!via) throw new Error(`No route to ${target}`);
      return request(nest, via, 'route', { target, type, content });
    }
  }

  function findInStorage(nest, name) {
    return storage(nest, name).then((found) => {
      if (found != null) return found;
      else return findInRemoteStorage(nest, name);
    });
  }

  function network(nest) {
    return Array.from(nest.state.connections.keys());
  }

  function findInRemoteStorage(nest, name) {
    let sources = network(nest).filter((n) => n != nest.name);
    function next() {
      if (sources.length == 0) {
        return Promise.reject(new Error('Not found'));
      } else {
        let source = sources[Math.floor(Math.random() * sources.length)];
        sources = sources.filter((n) => n != source);
        return routeRequest(nest, source, 'storage', name).then(
          (value) => (value != null ? value : next()),
          next
        );
      }
    }
    return next();
  }

  function anyStorage(nest, source, name) {
    if (source == nest.name) return storage(nest, name);
    else return routeRequest(nest, source, 'storage', name);
  }

  async function chicks(nest, year) {
    let list = '';
    await Promise.all(
      network(nest).map(async (name) => {
        list += `${name}: ${await anyStorage(nest, name, `chicks in ${year}`)}\n`;
      })
    );
    return list;
  }

  return { nests, defineRequestType, everywhere, types };
}

// Implementation
function implementation() {
  const { nests, defineRequestType, everywhere, types } = exampleCode();

  nests['Big Oak'].send('Cow Pasture', 'note', 'Hello', (err, success) => {
    if (err) {
      console.error(err);
    } else {
      console.log(success);
    }
  });
}

implementation();
