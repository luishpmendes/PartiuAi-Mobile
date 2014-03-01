var IcomaticUtils = (function() {
return {
fallbacks: [{ from: 'RoundedRectangleOutline', 'to': '\ue044' },{ from: 'RectangleOutline', 'to': '\ue041' },{ from: 'RoundedRectangle', 'to': '\ue058' },{ from: 'CircleOutline', 'to': '\ue015' },{ from: 'ImageOutline', 'to': '\ue02a' },{ from: 'VideoCamera', 'to': '\ue052' },{ from: 'ArrowRight', 'to': '\ue003' },{ from: 'Attachment', 'to': '\ue005' },{ from: 'GooglePlus', 'to': '\ue027' },{ from: 'ArrowDown', 'to': '\ue001' },{ from: 'ArrowLeft', 'to': '\ue002' },{ from: 'BackLight', 'to': '\ue008' },{ from: 'CheckMark', 'to': '\ue014' },{ from: 'Instagram', 'to': '\ue02c' },{ from: 'NextLight', 'to': '\ue033' },{ from: 'Pinterest', 'to': '\ue03a' },{ from: 'Rectangle', 'to': '\ue057' },{ from: 'WordPress', 'to': '\ue056' },{ from: 'AudioOff', 'to': '\ue006' },{ from: 'Bookmark', 'to': '\ue00b' },{ from: 'Calendar', 'to': '\ue00e' },{ from: 'Collapse', 'to': '\ue017' },{ from: 'Computer', 'to': '\ue019' },{ from: 'Download', 'to': '\ue01b' },{ from: 'Dribbble', 'to': '\ue01c' },{ from: 'Facebook', 'to': '\ue020' },{ from: 'Favorite', 'to': '\ue021' },{ from: 'Feedback', 'to': '\ue022' },{ from: 'LinkedIn', 'to': '\ue02e' },{ from: 'ListView', 'to': '\ue02f' },{ from: 'Location', 'to': '\ue030' },{ from: 'Question', 'to': '\ue03f' },{ from: 'Settings', 'to': '\ue047' },{ from: 'TileView', 'to': '\ue04b' },{ from: 'ArrowUp', 'to': '\ue004' },{ from: 'Behance', 'to': '\ue00a' },{ from: 'Comment', 'to': '\ue018' },{ from: 'Preview', 'to': '\ue03d' },{ from: 'Refresh', 'to': '\ue042' },{ from: 'Retweet', 'to': '\ue043' },{ from: 'Twitter', 'to': '\ue04e' },{ from: 'Camera', 'to': '\ue010' },{ from: 'Cancel', 'to': '\ue011' },{ from: 'Delete', 'to': '\ue01a' },{ from: 'Expand', 'to': '\ue01f' },{ from: 'Flickr', 'to': '\ue023' },{ from: 'Folder', 'to': '\ue024' },{ from: 'GitHub', 'to': '\ue025' },{ from: 'Pencil', 'to': '\ue037' },{ from: 'Picasa', 'to': '\ue039' },{ from: 'Plugin', 'to': '\ue03b' },{ from: 'Search', 'to': '\ue046' },{ from: 'Tablet', 'to': '\ue049' },{ from: 'Tumblr', 'to': '\ue04d' },{ from: 'Unlock', 'to': '\ue04f' },{ from: 'Upload', 'to': '\ue050' },{ from: 'Alert', 'to': '\ue000' },{ from: 'Audio', 'to': '\ue007' },{ from: 'Brush', 'to': '\ue00c' },{ from: 'Build', 'to': '\ue00d' },{ from: 'Cloud', 'to': '\ue016' },{ from: 'Email', 'to': '\ue01d' },{ from: 'Error', 'to': '\ue01e' },{ from: 'Group', 'to': '\ue028' },{ from: 'Image', 'to': '\ue02b' },{ from: 'Minus', 'to': '\ue032' },{ from: 'Phone', 'to': '\ue038' },{ from: 'Print', 'to': '\ue03e' },{ from: 'Share', 'to': '\ue048' },{ from: 'Vimeo', 'to': '\ue054' },{ from: 'Back', 'to': '\ue009' },{ from: 'Call', 'to': '\ue00f' },{ from: 'Cart', 'to': '\ue012' },{ from: 'Chat', 'to': '\ue013' },{ from: 'Home', 'to': '\ue029' },{ from: 'Like', 'to': '\ue02d' },{ from: 'Lock', 'to': '\ue031' },{ from: 'Next', 'to': '\ue034' },{ from: 'Page', 'to': '\ue035' },{ from: 'Path', 'to': '\ue036' },{ from: 'Plus', 'to': '\ue03c' },{ from: 'Save', 'to': '\ue045' },{ from: 'Text', 'to': '\ue04a' },{ from: 'Time', 'to': '\ue04c' },{ from: 'User', 'to': '\ue051' },{ from: 'View', 'to': '\ue053' },{ from: 'WiFi', 'to': '\ue055' },{ from: 'Git', 'to': '\ue026' },{ from: 'RSS', 'to': '\ue040' },{ from: 'W3C', 'to': '\ue059' }],
substitute: function(el) {
    var curr = el.firstChild;
    var next, alt;
    var content;
    while (curr) {
        next = curr.nextSibling;
        if (curr.nodeType === Node.TEXT_NODE) {
            content = curr.nodeValue;
            for (var i = 0; i < IcomaticUtils.fallbacks.length; i++) {
                content = content.replace( IcomaticUtils.fallbacks[i].from, function(match) {
                    alt = document.createElement('span');
                    alt.setAttribute('class', 'icomatic-alt');
                    alt.innerHTML = match;
                    el.insertBefore(alt, curr);
                    return IcomaticUtils.fallbacks[i].to;
                });
            }
            alt = document.createTextNode(content);
            el.replaceChild(alt, curr);
        }
        curr = next;
    }
},
run: function(force) {
    force = typeof force !== 'undefined' ? force : false;
    var s = getComputedStyle(document.body);
    if (('WebkitFontFeatureSettings' in s)
        || ('MozFontFeatureSettings' in s)
        || ('MsFontFeatureSettings' in s)
        || ('OFontFeatureSettings' in s)
        || ('fontFeatureSettings' in s))
        if (!force)
            return;
    var els = document.querySelectorAll('.icomatic');
    for (var i = 0; i < els.length; i++)
        IcomaticUtils.substitute(els[i]);
}
} // end of object
} // end of fn
)()