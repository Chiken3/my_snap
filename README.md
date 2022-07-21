# @Chiken3/my_snap
## **This project use from @metamask/snaps-cli**
https://www.npmjs.com/package/@metamask/snaps-cli
## Build and testing your Snap
From the command line, run the following commands to build and test your Snap:

```bash
mm-snap build -s src/index.js -d out
mm-snap serve -r out 

mm-snap watch -s src/index.js -d out #Rebuild './out/bundle.js' on changes to files in 'src/index.js' parent and child directories
```
