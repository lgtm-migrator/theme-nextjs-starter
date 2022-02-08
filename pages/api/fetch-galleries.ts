import { getPrezlyApi } from '@prezly/theme-kit-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

async function fetchGalleries(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405);
        return;
    }

    const { page, pageSize } = req.body;

    try {
        const api = getPrezlyApi(req);

        const { galleries } = await api.getGalleries({ page, pageSize });

        res.status(200).json({ galleries });
    } catch (error) {
        res.status(500).send({
            message: (error as Error).message,
        });
    }
}

export default fetchGalleries;
