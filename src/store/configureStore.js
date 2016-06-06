import prod from './configureStore.prod';
import dev from './configureStore.dev';

let config = process.env.NODE_ENV === 'production' ? prod : dev;

export default config;
