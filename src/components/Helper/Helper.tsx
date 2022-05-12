import { Container } from '@mui/material';
import React from 'react';

export default function Helper() {
    return <Container maxWidth={false} className="helper">
        <span className='helper_text'> If you want to change values in table just
            {' '}
            <b>double click</b>
            {' '}
            on
            it</span>
    </Container>;
}
