<p align="center">
  <img src="./docs/assets/cat.jpg" width="300" height="300" />
</p>

# ChaT

## Setup

1. Install [Node.js](https://nodejs.org/en/download/) (v18.0.0 or higher)
2. Clone this repository
3. Copy `.env.example` to `.env.local` and fill in the values
4. Run `npm install` to install dependencies
5. Run `npm run dev` to start the development server

## Repository Structure

This repository is a [monorepo](https://en.wikipedia.org/wiki/Monorepo) managed by [Turborepo](https://turbo.build/chat/docs). The following table describes the purpose of each directory:

| Path                                                         | Description              | Stack                       |
| ------------------------------------------------------------ | ------------------------ | --------------------------- |
| [`/apps/api`](/apps/api)                                     | The API server           | Node.js, tRPC               |
| [`/apps/ui`](/apps/ui)                                       | The mobile app           | React Native, Expo, Tamagui |
| [`/packages/eslint-config`](/packages/eslint-config)         | ESLint configuration     |                             |
| [`/packages/typescript-config`](/packages/typescript-config) | TypeScript configuration |                             |
