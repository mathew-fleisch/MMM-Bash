const NodeHelper = require('node_helper');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

module.exports = NodeHelper.create({
	notifications: {
		INIT: 'MMM_BASH_INIT',
		DATA: 'MMM_BASH',
		DATA_RESPONSE: 'MMM_BASH_RESPONSE'
	},
  start: function () {
    console.log(`${this.name} helper started ...`);
  },
  socketNotificationReceived: function(notification, payload){
    // console.log(`socketNotificationReceived: ${notification}`);
    switch (notification) {
      case "MMM_BASH_INIT":
        this.initialize(payload);
      case "MMM_BASH":
        this.runBashCommand(payload)
    }
  },

  initialize: async function(payload) {
    const self = this
    console.log("MMM-Bash Version:", require('./package.json').version);
    console.log(payload);
  },
  runBashCommand: async function(payload) {
    // console.log("MMM-Bash runBashCommand():");
    const self = this
    if (payload) {
      if(payload.identifier) {
        // console.log(payload);
        // console.log("MMM-Bash Command: " + payload.config.bashCommand);
        var returnPayload = payload;
        
        returnPayload.config.stderr = "";
        returnPayload.config.stdout = "";
        try {
          const { stdout, stderr } = await execAsync(payload.config.bashCommand);
          if (stderr) {
            returnPayload.config.stderr = stderr;
          }
          if (stdout) {
            returnPayload.config.stdout = stdout;
          }
        } catch (error) {
          returnPayload.config.stderr = error;
        }
        returnPayload.config.counter = payload.config.counter + 1;
        // console.log("MMM-Bash return payload: ", returnPayload);
        self.sendSocketNotification(self.notifications.DATA_RESPONSE, {
          config: returnPayload.config,
          status: 'OK',
          identifier: payload.identifier,
        });
      }
    }
  },
});
