import eureka from 'eureka-js-client'

const eurekaHost = (process.env.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE || '127.0.0.1');
const eurekaPort = 8761;
const hostName = (process.env.HOSTNAME || 'localhost')
const ipAddr = '127.0.0.1';

export const registerWithEureka = function(appName, PORT) {
  
  const client = new eureka.Eureka({
    
    instance: {
      instanceId: `${appName}:${PORT}`,
      app: appName,
      hostName: hostName,
      ipAddr: ipAddr,
      statusPageUrl: `http://localhost:${PORT}/health_check`,
      port: {
        '$': PORT,
        '@enabled': 'true',
      },
      vipAddress: appName, //이걸로 eureka server에서 찾음
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
      registerWithEureka: true,
      fetchRegistry: true
    },
    
    eureka: {
      host: eurekaHost,
      port: eurekaPort,
      servicePath: '/eureka/apps/',
    },
  })

client.logger.level('debug')

client.start( error => {
    console.log(error || "sport-service registered")
});

};