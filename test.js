function (states, text, in_php, escape) {
		var php = /<\?(?!xml)(?:php)?|<script\s+language\s*=\s*(?:"php"|'php'|php)\s*>/i; // asp_tags=0, short_open_tag=1
		var num = /(?:\b[0-9]+\.?[0-9]*|\.[0-9]+)(?:[eE][+-]?[0-9]+)?/;
		var tr = { // transitions
			htm: { php: php, tag_css: /(<)(style)\b/i, tag_js: /(<)(script)\b/i, htm_com: /<!--/, 0: /(<!)([^>]*)(>)/, tag: /(<)([^<>\s]+)/, ent: /&/ },
			htm_com: { php: php, 1: /-->/ },
			ent: { php: php, 1: /;/ },
			tag: { php: php, att_css: /(\s+)(style)(\s*=\s*)/i, att_js: /(\s+)(on[^=<>\s]+)(\s*=\s*)/i, att: /(\s+)([^=<>\s]*)(\s*)/, 1: />/ }
}
}
