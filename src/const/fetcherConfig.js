export const BILIBILI_OPTION = [
    {
        label: 'bilibili:dynamic-by-uid',
        value: 'bilibili:dynamic-by-uid',
    }
];

export const WEIBO_OPTION = [
    {
        label: 'weibo:dynamic-by-uid',
        value: 'weibo:dynamic-by-uid',
    }
];

export const NETEASE_OPTION = [
    {
        label: 'netease-cloud-music:albums-by-artist',
        value: 'netease-cloud-music:albums-by-artist',
    }
];

export const ARKNIGHTS_GAME_OPTION = [
    {
        label: 'arknights-game:announcement',
        value: 'arknights-game:announcement',
    },{
        label: 'arknights-game:bulletin-list',
        value: 'arknights-game:bulletin-list',
    },
    {
        label: 'arknights-game:version',
        value: 'arknights-game:version',
    }
];

export const ENDFIELD_GAME_OPTION = [
    {
        label: 'endfield-game:bulletin-list',
        value: 'endfield-game:bulletin-list',
    }
];

export const ARKNIHTS_WEBSITE_OPTION = [
    {
        label: 'arknights-website:monster-siren',
        value: 'arknights-website:monster-siren',
    },
    {
        label: 'arknights-website:official-website',
        value: 'arknights-website:official-website',
    },
    {
        label: 'arknights-website:terra-historicus',
        value: 'arknights-website:terra-historicus',
    }
];

export const DATASOURCE_UNIQUE_KEY = {
    'bilibili:dynamic-by-uid': 'uid',
    'weibo:dynamic-by-uid': 'uid',
    'netease-cloud-music:albums-by-artist': 'artistId',
    'arknights-game:announcement': 'platform',
    'arknights-game:version': 'platform',
    'arknights-game:bulletin-list': 'platform',
    'endfield-game:bulletin-list': 'platform',
    'arknights-website:monster-siren': null,
    'arknights-website:official-website': null,
    'arknights-website:terra-historicus': null,
};