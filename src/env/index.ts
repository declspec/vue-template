// This file works in tandem with /env/env.js in the root of the project.
// While env.js has to be vanilla JS to work with webpack, we can add type
//  annotations here and re-export it for use as a regular TypeScript module 
//  in the rest of  the application.
export interface Environment {
    urls: {
        baseHref: string;
    }
};

// 'ENV' is declared in webpack.config.js using the DefinePlugin
declare const ENV: Environment;
export default ENV;