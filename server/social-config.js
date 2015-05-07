// TODO change the appID and secret when deployed in some other env

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '349486645244832',
    secret: '759a68d4ab6154c0a88e757d74a54258'
});