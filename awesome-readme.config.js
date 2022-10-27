module.exports = {
    figlet: `
    _ _   _      _           _                   _   _ _ _ _         
    | | | (_)    | |         (_)                 | | (_) (_) |        
_ __ ___  _   _| | |_ _  ___| |__   __ _ _ _ __ ______ _   _| |_ _| |_| |_ _   _ 
| '_ \` _ \\| | | | | __| |/ __| '_ \ / _\` | | '_ \\______| | | | __| | | | __| | | |
| | | | | | |_| | | |_| | (__| | | | (_| | | | | |     | |_| | |_| | | | |_| |_| |
|_| |_| |_|\\__,_|_|\\__|_|\\___|_| |_|\__,_|_|_| |_|      \\__,_|\\__|_|_|_|\\__|\\__, |
                                                                 __/ |
                                                                |___/ `,
    root_license: `[![npm version](https://badge.fury.io/js/multichain-utility.svg)](https://badge.fury.io/js/multichain-utility)`,
    root_header: `
## Install with Npm or Yarn

\`\`\`bash
npm install multichain-utility
\`\`\`

\`\`\`bash
yarn add multichain-utility
\`\`\`

## Install multichain-utility with npm link

\`\`\`
git clone <this repo>
cd hardhat-test-utility
npm install
npm link

cd <your project>
npm link hardhat-test-utility
\`\`\``,
    root_body: `

## Use multichain-utility
\`\`\`
import * from 'multichain-utility'
\`\`\`
or 
\`\`\`
const multichainUtility = require('multichain-utility')
\`\`\``,
    root_footer: `## Don't hesitate to contribute to this project.`,
    ignore_gitFiles: true,
    ignore_gitIgnoreFiles: true,
    ignore_files: [
        '.npmignore',
        '.prettierignore',
        'awesome-readme.config.js',
        'package-lock.json',
        'tsconfig.prod.json'
    ]
}