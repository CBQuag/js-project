/***
 * @name        cli-prompt
 * @package     @cloud-technology
 * @summary     ESM-based CLI Prompt
 *
 * @author      Jacob B. Sanders
 * @license     BSD 3-Clause License
 * @copyright   Cloud-Technology LLC. & Affiliates
 */

import * as Utility from "util";
import * as Input from "readline";
import * as Process from "process";

/***
 *
 * @param query
 *
 * @returns {Promise<unknown>}
 *
 * @constructor
 *
 */

export const Prompt = (query) => {
    return new Promise(async (resolve, reject) => {
        let $;

        const Interface = Input.createInterface({
            input: Process.openStdin(),
            output: Process.stdout
        });

        const prompt = Utility.promisify(Interface.question).bind(Interface);

        try {
            $ = await prompt(query);
        } catch (_) { reject(_) } finally { Interface.close() }

        resolve($);
    });
}

export default Prompt;
