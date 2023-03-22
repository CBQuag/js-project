import { default as Prompt } from "variable-iterator";

const $ = {
    Username: async () => await Prompt("Username: "),
    Token: async () => await Prompt("Token: "),
    URL: async () => await Prompt("URL: ")
};

const username = await $.Username();
const token = await $.Token();
const url = await $.URL();

console.log({
    username,
    token,
    url
});

process.exit(0);
