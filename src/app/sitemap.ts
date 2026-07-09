import type { MetadataRoute } from 'next';

const SITE_URL = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://help.bizbee.co.kr').replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${SITE_URL}/faq`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
    ];
}
