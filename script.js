const https = require('https');

const options = {
  hostname: 'api.github.com',
  port: 443,
  path: '/users/Baibhavikarki/repos?per_page=1000&sort=updated&direction=desc',
  method: 'GET',
  headers: {'User-Agent': 'Node.js'}
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const repos = JSON.parse(data);
    for (let i = 0; i < repos.length; i++) {
      console.log(repos[i].name);
      const tagsOptions = {
        hostname: 'api.github.com',
        port: 443,
        path: '/repos/Baibhavikarki/' + repos[i].name + '/tags',
        method: 'GET',
        headers: {'User-Agent': 'Node.js'}
      };
      https.get(tagsOptions, (tagsRes) => {
        let tagsData = '';
        tagsRes.on('data', (tagsChunk) => {
          tagsData += tagsChunk;
        });
        tagsRes.on('end', () => {
          const tags = JSON.parse(tagsData);
          for (let j = 0; j < tags.length; j++) {
            console.log('  ' + tags[j].name);
          }
        });
      }).on('error', (err) => {
        console.error(err);
      });
    }
  });
}).on('error', (err) => {
  console.error(err);
});