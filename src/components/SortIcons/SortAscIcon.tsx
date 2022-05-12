import React from 'react';

type Props = {
    isActive: boolean
}

export default function SortAscIcon(props: Props) {
    const { isActive } = props
    const changeColor = isActive ?
        'green' :
        ''
    return <svg className='asc_svg' version="1.1" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
        <title></title>
        <g id="icomoon-ignore">
        </g>
        <path fill={changeColor} d="M160 384v-384h-64v384h-80l112 112 112-112h-80z"></path>
        <path fill={changeColor} d="M432 224c-8.837 0-16-7.164-16-16v-176h-16c-8.837 0-16-7.164-16-16s7.163-16 16-16h32c8.837 0 16 7.164 16 16v192c0 8.836-7.163 16-16 16z"></path>
        <path fill={changeColor} d="M464 288h-96c-8.837 0-16 7.163-16 16v96c0 8.837 7.163 16 16 16h80v64h-80c-8.837 0-16 7.163-16 16s7.163 16 16 16h96c8.837 0 16-7.163 16-16v-192c0-8.837-7.163-16-16-16zM384 320h64v64h-64v-64z"></path>
    </svg>
        ;
}
