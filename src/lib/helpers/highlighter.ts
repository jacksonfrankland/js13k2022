import { getHighlighter, setCDN } from 'shiki'

setCDN('https://unpkg.com/shiki/')

const THEME = 'github-dark'

export default async function (code: string, lang: string) {
    const shikiHighlighter = await getHighlighter({
        theme: THEME,
    });
    const html = shikiHighlighter.codeToHtml(code, {
        lang,
    });
    return html;
}
