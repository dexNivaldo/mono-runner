#!/usr/bin/env node

import * as inquirer from 'inquirer';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import * as yargs from 'yargs';
import * as shell from 'shelljs';

const CURRENT_DIR = process.cwd();

let choices: any[] = []
let commandChoices: any[] = []

const packagePath = path.join(CURRENT_DIR, 'package.json');
try {
    const packageString = fs.readFileSync(packagePath, 'utf8');
    const _package = JSON.parse(packageString)
    if (_package.scripts) {
        commandChoices = [...Object.keys(_package.scripts)]
    }
    if (_package.workspaces) {
        _package.workspaces.forEach((folder: string) => {
            const folders = fs.readdirSync(
                path.join(CURRENT_DIR, folder.replace('*', '')),
                { withFileTypes: true })
            choices = [...choices, ...folders.filter(
                    item => item.isDirectory()
                )]
        });
    } else {
        console.log(chalk.red('package.json doen\'t have workspaces key'))
    }
} catch (error) {
    console.log(error)
    console.log(chalk.red('package.json not found, pls run in a valid node project'))
}

const QUESTIONS = [
    {
      name: 'project',
      type: 'list',
      message: 'What project would you like to run?',
      choices
    },
    {
        name: 'command',
        type: 'list',
        message: 'What command would you like to run?',
        choices: commandChoices
      }
  ];

  inquirer.prompt(QUESTIONS)
  .then((answers: any) => {

    answers = Object.assign({}, answers, yargs.argv);

    const projectChoice = answers['project'];
    const commandToRun = answers['command'];
    const cmd = `npm run ${commandToRun} -- --filter=${projectChoice}`
    console.log(chalk.cyan(`executing ${cmd}`))
    shell.exec(cmd)
  });