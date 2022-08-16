# Leverage Trading Calculator

## Project Overview
Leverage Trading Calculator is a NextJS application I built to help me calculate entry and exit points for leveraged crypto trades on decentralized trading platforms such as `Gains.trade` (on Polygon) and `gmx.io/trade` (on Arbitrum). One of the critical aspects of trading assets of any class is always having a plan. This tool allows you to come up with a plan/strategy, and see "what if" scenarios before actually conducting a trade.

I decided to make this project available on the internet to easily access it as well as help others who may be looking for a similar tool as I was but had no luck finding it. Currently this project is hosted with Vercel at the following url: `https://www.leveragetradingcalculator.com/`

## Prerequisites
If you do not have nodeJS, nvm or yarn installed please checkout these links to install them. 

yarn - `https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable`

nvm - `https://heynode.com/tutorial/install-nodejs-locally-nvm/` or you can install nodeJS version specified in the .nvmrc file

NodeJS - `https://nodejs.org/en/download/`

Although I have specified a specific version of Node in the .nvmrc file and you should use that, I do not think it will make much of a difference if you use a more recent version of Node as this application has a very minimal amount of dependencies.

## Getting Started
1. First clone the repository
2. In the repo's root directory run `nvm use`
3. Next you will want to install the dependencies with `yarn install`
4. Now you should be ready to boot the project up with `yarn run dev`
5. If you wish to run a full build you will first run `yarn build` followed by `yarn start`


crafted by 0xD4V1NC1