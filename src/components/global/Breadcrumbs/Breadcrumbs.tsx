import { BreadcrumbsProps } from '@/types/components/global/breadcrumbs';
import { generateBreadcrumbsSchemaLinks } from '@/utils/generateBreadcrumbsSchemaLinks';
import Head from 'next/head';
import { FC } from 'react';
import ForwardArrow from '../icons/ForwardArrow/ForwardArrow';
import {
  BreadcrumbLink,
  BreadcrumbLinkWrapper,
  BreadcrumbsList,
  BreadcrumbsWrapper,
  BreadcrumbText,
} from './styles';

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  links,
  locale,
  fullUrl,
  currentName,
}) => {
  const breadcrumbsSchemaLinks = generateBreadcrumbsSchemaLinks(
    links,
    locale,
    fullUrl,
    currentName
  );
  
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'http://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [...breadcrumbsSchemaLinks],
            }),
          }}
        />
      </Head>
      <BreadcrumbsWrapper aria-label="Breadcrumbs">
        <BreadcrumbsList>
          {links?.map(({ name, url }, i, links) => {
            if (i === links.length - 1) {
              return <BreadcrumbText key={i}>{name}</BreadcrumbText>;
            } else {
              return (
                <BreadcrumbLinkWrapper key={i}>
                  <BreadcrumbLink href={url}>{name}</BreadcrumbLink>
                  <ForwardArrow />
                </BreadcrumbLinkWrapper>
              );
            }
          })}
        </BreadcrumbsList>
      </BreadcrumbsWrapper>
    </>
  );
};

export default Breadcrumbs;
