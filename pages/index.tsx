import type { Story } from '@prezly/sdk';
import { getHomepageServerSideProps, type HomePageProps } from '@prezly/theme-kit-nextjs';
import dynamic from 'next/dynamic';
import type { FunctionComponent } from 'react';

import { importMessages } from '@/utils';
import type { BasePageProps } from 'types';

const Stories = dynamic(() => import('@/modules/Stories'), { ssr: true });

type Props = BasePageProps & HomePageProps<Story>;

const IndexPage: FunctionComponent<Props> = ({ stories, pagination }) => (
    <Stories stories={stories} pagination={pagination} />
);

export const getServerSideProps = getHomepageServerSideProps<BasePageProps, Story>(
    async (_, { newsroomContextProps }) => ({
        translations: await importMessages(newsroomContextProps.localeCode),
    }),
);

export default IndexPage;
