
interface Environment {
  baseUrl: string;
}

const localEnv: Environment = {
  baseUrl: 'http://localhost:3000', // Local development server URL
};

const productionEnv: Environment = {
  baseUrl: 'https://arthurtee.github.io/', // Production website URL
};

// Set the environment to switch between local and production
const currentEnvironment: Environment = process.env.NODE_ENV === 'prod' ? productionEnv : localEnv;

export default currentEnvironment;
