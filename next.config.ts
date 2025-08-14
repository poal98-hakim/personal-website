import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  sassOptions: {
    implementation: 'sass-embedded',
    additionalData: `@use "${path.join(process.cwd(), 'src/styles/_mantine').replace(/\\/g, '/')}" as mantine;`,
  },
};

export default nextConfig;
