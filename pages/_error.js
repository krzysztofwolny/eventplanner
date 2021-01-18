import React from 'react';
import Link from 'next/link';

import Header from '../components/Header/Header';

const Error404Page = () => {
    return(
        <div>
            <Header />
            <p>Page unavalible!</p>
            <Link href="/"><a>Go back!</a></Link>
        </div>
    );
}

export default Error404Page;