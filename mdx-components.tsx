import type { MDXComponents } from "mdx/types";
import { mdxComponents } from "@/components/mdx";
import { blockChainComponents } from "@/components/blockchain";
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...blockChainComponents,
    ...components,
  };
}
