import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

 
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
