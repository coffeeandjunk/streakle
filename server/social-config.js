// TODO change the appID and secret when deployed in some other env

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
// ServiceConfiguration.configurations.insert({
//     service: 'facebook',
//     appId: '417530805091822',
//     secret: '6ec7a7472933d5a25e4c7632f2c6c990'
// });

//This is for Deployed

ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '406355799542656',
    secret: '83107f6b2f6e4d35bab3663215e4ec77'
});



