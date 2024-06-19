Module.register("MMM-Bash", {
	// these are the default values that can be overridden in your config/config.js
	defaults: {
		bashDivId: "MMM_BASH",
		stdout: "Loading...",
		stderr: "or something went wrong :(",
		bashCommand: "uptime",
		bashCounter: 0,
		updateInterval: 5, // seconds
		fadeUpdate: 100, // 0-5000
	},
	notifications: {
		INIT: 'MMM_BASH_INIT',
		DATA: 'MMM_BASH',
		DATA_RESPONSE: 'MMM_BASH_RESPONSE'
	},

	// html template to inject date and place in DOM
	getTemplate() {
		return "MMM-Bash.njk";
	},
	
	// pass config to MagicMirror to override
	getTemplateData() {
		return this.config;
	},

	// every config.updateInterval seconds, run getBash(config.dateFormat)
	// to get the current date string and update the DOM
	start:  function () {
		var self = this;
    Log.info(`Starting module: ${this.name}`)
    self.loaded = false

		self.config.bashCounter++;
		setInterval(async function () {
			self.config.bashCounter++;
			self.sendSocketNotification(self.notifications.DATA, { identifier: self.identifier, config: self.config })
		}, self.config.updateInterval * 1000)
	},
  notificationReceived: function (notification, payload, sender) {
		const self = this
    switch (notification) {
      case "DOM_OBJECTS_CREATED":
        self.sendSocketNotification(self.notifications.INIT, self.config)
        break
		}
	},
  socketNotificationReceived: function (notification, payload) {
		const self = this
    switch (notification) {
			case self.notifications.DATA_RESPONSE:
        if (payload.identifier === self.identifier) {
          if (payload.status === 'OK') {
            console.log('Data %o', payload.config)
						self.config.bashCounter = payload.config.bashCounter;
						self.config.stderr = payload.config.stderr;
						self.config.stdout = payload.config.stdout;
						self.updateDom(self.config.fadeUpdate);
          } else {
            console.log('DATA FAILED ' + payload.message)
          }
				}
    }
  },
});
