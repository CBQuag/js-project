# `@cloud-technology/cli-prompt` #

## Overview ##

`cli-prompt` is a zero dependency, node.js ESM-compliant *commandline prompt*.

As an ESM module, when running via a compatible (16+) `node.js` runtime, package(s)
benefit from running `await` via the global namespace for blocking cli-prompt
callables.

## Setup ##

```bash
npm install --save @cloud-technology/cli-prompt
```

### Development ###

*If installing only for development or POC-related purposes*

```bash
npm install --save-dev @cloud-technology/cli-prompt
```

## Usage ##

***Note*** - Ensure to have `"type": "module"` configured in `package.json`.

- Please see the [`standalone` example](https://github.com/cloud-hybrid/cli-prompt/tree/Development/examples/standalone)
  for more details on usage.

`index.js`

```javascript
import Prompt from "@cloud-technology/cli-prompt";

const Query = await Prompt("First Name");

console.debug(Query);

process.exit(0);
```
