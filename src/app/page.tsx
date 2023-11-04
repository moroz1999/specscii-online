import { Metadata } from 'next';

import Editor from '@/app/editor';
import StoreProvider from '@/app/Provider';

export default function Home() {
    return (
        <StoreProvider>
            <Editor />
        </StoreProvider>
    );
}
export const metadata: Metadata = {
    title: 'SpecSCII editor',
    description: 'SpecSCII editor',
};
