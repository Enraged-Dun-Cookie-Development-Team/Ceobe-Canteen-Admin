import defaultSettings from '@/settings';

const title = defaultSettings.title || '小刻食堂';

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle}`;
    }
    return `${title}`;
}
