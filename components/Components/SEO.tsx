import React from 'react';
import Head from 'next/head';

const DOMAIN = 'https://www.leveragetradingcalculator.com';

export default function Seo({
  title = 'Calculator',
  description = 'Leverage Trading Calculator is a simple calculator to help you estimate entry and exit points of a leveraged trade. This is often used as a crypto profit calculator',
  siteName = 'Leverage Trading Calculator',
  canonical = DOMAIN,
  twitterHandle = '@0xD4V1NC1',
}:{ title?:string,
  description?:string,
  siteName?:string,
  canonical?:string,
  twitterHandle?: string }) {
  return (
    <Head>
      <title key="title">{`${title} – ${siteName}`}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta name="description" content={description} />
      <meta key="og_title" property="og:title" content={title} />
      <meta key="og_description" property="og:description" content={description} />
      <meta key="og_locale" property="og:locale" content="en_IE" />
      <meta key="og_site_name" property="og:site_name" content={siteName} />
      <meta key="og_url" property="og:url" content={canonical ?? DOMAIN} />
      <meta key="og_site_name" property="og:site_name" content={siteName} />

      <meta name="robots" content="index,follow" />

      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        key="twitter:site"
        name="twitter:site"
        content={twitterHandle}
      />
      <meta
        key="twitter:creator"
        name="twitter:creator"
        content={twitterHandle}
      />
      <meta
        key="twitter:title"
        property="twitter:title"
        content={title}
      />
      <meta
        key="twitter:description"
        property="twitter:description"
        content={description}
      />
      <meta name="theme-color" content="#000" media="(prefers-color-scheme: dark)" />
      <meta name="theme-color" content="#FFF" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#B7B0FF" />
      <link rel="canonical" href={canonical ?? DOMAIN} />

      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  );
}
