/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as prismic from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';
import sm from './sm.json';

export const endpoint = sm.apiEndpoint;
export const repositoryName = prismic.getRepositoryName(endpoint);

// Update the Link Resolver to match your project's route structure
export function linkResolver(doc) {
  switch (doc.type) {
    case 'homepage':
      return '/';
    case 'page':
      return `/post/${doc.uid}`;
    default:
      return null;
  }
}

// This factory function allows smooth preview setup

interface IConfig extends prismic.ClientConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  previewData: any;
  req: prismic.HttpRequestLike;
}

export function createClient(config: IConfig = {} as IConfig) {
  const client = prismic.createClient(endpoint, {
    ...config,
  });

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
}
