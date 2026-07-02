const SAFE_TAGS = new Set([
    'A',
    'BLOCKQUOTE',
    'BR',
    'CODE',
    'DIV',
    'EM',
    'H1',
    'H2',
    'H3',
    'HR',
    'IMG',
    'INPUT',
    'LABEL',
    'LI',
    'MARK',
    'OL',
    'P',
    'PRE',
    'S',
    'SPAN',
    'STRONG',
    'SUB',
    'SUP',
    'U',
    'UL',
]);
const SAFE_ATTRIBUTES = new Set(['alt', 'checked', 'class', 'data-checked', 'data-color', 'data-type', 'disabled', 'href', 'src', 'style', 'target', 'title', 'type']);
const SAFE_URL_PATTERN = /^(https?:|mailto:|tel:|\/|#|data:image\/(?:png|jpe?g|gif|webp|bmp|svg\+xml);base64,)/i;
const HTML_TAG_PATTERN = /<\/?[a-z][\s\S]*>/i;
const SAFE_HIGHLIGHT_COLOR_PATTERN =
    /(?:^|;)\s*background-color\s*:\s*(var\(--tt-color-highlight-[a-z-]+\)|#[0-9a-f]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\)|[a-z]+)\s*;?\s*$/i;

const sanitizeStyleValue = (styleValue: string) => {
    const allowedStyles: string[] = [];

    styleValue
        .split(';')
        .map((style) => style.trim())
        .filter(Boolean)
        .forEach((style) => {
            const [property, ...rawValue] = style.split(':');
            const propertyName = property?.trim().toLowerCase();
            const propertyValue = rawValue.join(':').trim();

            if (!propertyName || !propertyValue) {
                return;
            }

            if (propertyName === 'text-align' && /^(left|center|right|justify)$/i.test(propertyValue)) {
                allowedStyles.push(`text-align: ${propertyValue.toLowerCase()}`);
                return;
            }

            if (propertyName === 'background-color' && SAFE_HIGHLIGHT_COLOR_PATTERN.test(`background-color: ${propertyValue}`)) {
                allowedStyles.push(`background-color: ${propertyValue}`);
            }
        });

    return allowedStyles.length > 0 ? `${allowedStyles.join('; ')};` : '';
};

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

const sanitizeHtmlFallback = (html: string) => {
    return html
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
        .replace(/<\/?(iframe|object|embed|form|input|button|textarea|select|option|meta|link)[^>]*>/gi, '')
        .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, '')
        .replace(/\sstyle\s*=\s*(['"])(.*?)\1/gi, (match, quote, value) => {
            const sanitizedStyle = sanitizeStyleValue(value);

            return sanitizedStyle ? ` style=${quote}${sanitizedStyle}${quote}` : '';
        })
        .replace(/\s(href|src)\s*=\s*(['"])\s*javascript:[\s\S]*?\2/gi, '');
};

export const sanitizeEditorHtml = (html: string) => {
    if (!html.trim()) {
        return '';
    }

    if (typeof DOMParser === 'undefined') {
        return sanitizeHtmlFallback(html);
    }

    const parser = new DOMParser();
    const document = parser.parseFromString(html, 'text/html');
    const elements = Array.from(document.body.querySelectorAll('*'));

    elements.forEach((element) => {
        if (!SAFE_TAGS.has(element.tagName)) {
            element.replaceWith(...Array.from(element.childNodes));
            return;
        }

        Array.from(element.attributes).forEach((attribute) => {
            const attributeName = attribute.name.toLowerCase();
            const attributeValue = attribute.value.trim();

            if (attributeName.startsWith('on') || !SAFE_ATTRIBUTES.has(attributeName)) {
                element.removeAttribute(attribute.name);
                return;
            }

            if (attributeName === 'style') {
                const sanitizedStyle = sanitizeStyleValue(attributeValue);

                if (sanitizedStyle) {
                    element.setAttribute('style', sanitizedStyle);
                    return;
                }

                element.removeAttribute(attribute.name);
                return;
            }

            if ((attributeName === 'href' || attributeName === 'src') && !SAFE_URL_PATTERN.test(attributeValue)) {
                element.removeAttribute(attribute.name);
            }
        });

        if (element.tagName === 'INPUT') {
            const type = element.getAttribute('type');

            if (type !== 'checkbox') {
                element.remove();
                return;
            }

            element.setAttribute('disabled', '');
        }
    });

    document.body.querySelectorAll('a[href]').forEach((link) => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    return document.body.innerHTML;
};

export const hasHtmlTag = (value: string) => HTML_TAG_PATTERN.test(value);

export const plainTextToHtml = (value: string) => {
    const lines = value
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);
    const paragraphs: string[] = [];
    const listItems: string[] = [];

    lines.forEach((line) => {
        if (/^[-•]\s+/.test(line)) {
            listItems.push(`<li>${escapeHtml(line.replace(/^[-•]\s+/, ''))}</li>`);
            return;
        }

        if (listItems.length > 0) {
            paragraphs.push(`<ul>${listItems.splice(0).join('')}</ul>`);
        }

        paragraphs.push(`<p>${escapeHtml(line)}</p>`);
    });

    if (listItems.length > 0) {
        paragraphs.push(`<ul>${listItems.join('')}</ul>`);
    }

    return paragraphs.join('');
};

export const getPlainTextFromHtml = (html: string) => {
    if (!html.trim()) {
        return '';
    }

    if (typeof DOMParser === 'undefined') {
        return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    }

    const parser = new DOMParser();
    const document = parser.parseFromString(html, 'text/html');

    return document.body.textContent?.replace(/\s+/g, ' ').trim() ?? '';
};
