# Load-balance-with-cluster-NodeJS
Load balancing between workers nodejs. With cluster module.
This app distributes process the load for a worker, which most smaller CPU load.
In documentation Node 7.0.0 written that when using a cluster of all workers` loaded only two that takes the 70% load. In my practice it has been written so that each time the connection assumes the load is less than the most loaded process.

# Requirements
node npm

# Dependencies
write in package.json

# Configuration
config.json
You can change app to work with cluster mode or without.

# Run it
Start server node app.js
Go to URL in browser localhost:3000/users. And in other PC's go to page IP-ADDRESS_SERVER:3000/users
You can see each app connected to different worker-process. Because master process of distributing the task of a worker, which is the lower CPU load.
