# Module: Bash

A module for the [MagicMirror](https://github.com/MagicMirrorOrg/MagicMirror) that runs a bash command and returns the stderr and stdout back to the screen.

## Setup

Clone the module into your modules folder:

```bash
cd ~/MagicMirror/modules
git clone https://github.com/mathew-fleisch/MMM-Bash
npm install
```

## Configuration

```javascript
{
  module: 'MMM-Bash',
  position: 'top_right',
  config: {
    bashDivId: "MMM_BASH",
    stdout: "Loading...",
    stderr: "or something went wrong :(",
    bashCommand: "uptime",
    bashCounter: 0,
    updateInterval: 5 // seconds
  }
}
```

## Styling

The [template](MMM-Bash.njk) uses the class `.Bash` and passes the `config.bashDivId` value to the div's id field to enable multiple versions of this module to be easily styled in the same display. Add something similar to your css/custom.css file.

```css
#MMM_BASH {
  position: absolute;
  bottom: -575px;
  left: -50px;
  text-align: right;
  color: #7274ae;
  font-size: 15px;
  font-family: "Courier New", Courier, monospace;
  letter-spacing: -3px;
}
#MMM_BASH .bashCounter {
  font-size:10px;
  display: none;
}
```
