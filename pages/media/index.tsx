import { type GalleryPageProps, getGalleryPageServerSideProps } from '@prezly/theme-kit-nextjs';
import dynamic from 'next/dynamic';
import type { FunctionComponent } from 'react';

import { importMessages } from '@/utils';
import type { BasePageProps } from 'types';

const Galleries = dynamic(() => import('@/modules/Galleries'), { ssr: true });

type Props = BasePageProps & GalleryPageProps;

const GalleriesPage: FunctionComponent<Props> = ({ galleries, pagination }) => (
    <Galleries initialGalleries={galleries} pagination={pagination} />
);

export const getServerSideProps = getGalleryPageServerSideProps<BasePageProps>(
    async (_, { newsroomContextProps }) => ({
        translations: await importMessages(newsroomContextProps.localeCode),
    }),
);

export default GalleriesPage;
