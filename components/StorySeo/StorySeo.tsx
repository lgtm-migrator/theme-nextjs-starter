import type { ExtendedStory } from '@prezly/sdk';
import { ArticleJsonLd, NextSeo } from 'next-seo';

interface Props {
    story: ExtendedStory;
}

export function StorySeo({ story }: Props) {
    const { title, subtitle, published_at, updated_at, author, oembed, newsroom } = story;
    const authorName = author?.display_name || author?.email || 'Unknown';

    return (
        <>
            <NextSeo
                title={title}
                description={subtitle}
                canonical={oembed.url}
                openGraph={{
                    title,
                    description: subtitle,
                    url: oembed.url,
                    site_name: newsroom.display_name,
                    type: 'article',
                    article: {
                        publishedTime: published_at || undefined,
                        modifiedTime: updated_at,
                        authors: [authorName],
                    },
                    ...(oembed.thumbnail_url && {
                        images: [
                            {
                                url: oembed.thumbnail_url,
                                alt: oembed.title,
                                width: oembed.thumbnail_width,
                                height: oembed.thumbnail_height,
                            },
                        ],
                    }),
                }}
                additionalMetaTags={
                    oembed.thumbnail_url
                        ? [
                              { name: 'twitter:card', content: 'summary_large_image' },
                              { name: 'twitter:image', content: oembed.thumbnail_url },
                          ]
                        : undefined
                }
            />
            <ArticleJsonLd
                url={oembed.url}
                title={title}
                images={oembed.thumbnail_url ? [oembed.thumbnail_url] : []}
                datePublished={published_at || ''}
                dateModified={updated_at}
                authorName={[authorName]}
                publisherName={newsroom.display_name}
                publisherLogo={newsroom.thumbnail_url}
                description={subtitle}
            />
        </>
    );
}
