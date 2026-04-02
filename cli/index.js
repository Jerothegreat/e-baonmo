#!/usr/bin/env node
const { Command } = require("commander");
const { registerAddCommand } = require("./commands/add");
const { registerBudgetCommand } = require("./commands/budget");
const { registerDeleteCommand } = require("./commands/delete");
const { registerExportCommand } = require("./commands/export");
const { registerFilterCommand } = require("./commands/filter");
const { registerListCommand } = require("./commands/list");
const { registerSummaryCommand } = require("./commands/summary");

const program = new Command();

program.name("e-baonmo").description("Local-first expense tracker").version("1.0.0");

registerAddCommand(program);
registerListCommand(program);
registerSummaryCommand(program);
registerFilterCommand(program);
registerDeleteCommand(program);
registerExportCommand(program);
registerBudgetCommand(program);

program.parse(process.argv);
