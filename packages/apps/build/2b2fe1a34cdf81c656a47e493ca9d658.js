ace.define("ace/mode/rst_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],(function(e,t,o){"use strict";var n=e("../lib/oop"),r=(e("../lib/lang"),e("./text_highlight_rules").TextHighlightRules),x=function(){var e="markup.heading",t="constant",o="keyword.operator",n="string",r="markup.underline.list",x="markup.bold",i="markup.italic",g="support.function",l="comment",s="(^|\\s|[\"'(<\\[{\\-/:])",k="(?:$|(?=\\s|[\\\\.,;!?\\-/:\"')>\\]}]))";this.$rules={start:[{token:"markup.heading",regex:"(^)([\\=\\-`:\\.'\"~\\^_\\*\\+#])(\\2{2,}\\s*$)"},{token:["text",o,g],regex:"(^\\s*\\.\\. )([^: ]+::)(.*$)",next:"codeblock"},{token:o,regex:"::$",next:"codeblock"},{token:[n,r],regex:"(^\\.\\. _[^:]+:)(.*$)"},{token:[n,r],regex:"(^__ )(https?://.*$)"},{token:n,regex:"^\\.\\. \\[[^\\]]+\\] "},{token:l,regex:"^\\.\\. .*$",next:"comment"},{token:e,regex:"^\\s*[\\*\\+-] "},{token:e,regex:"^\\s*(?:[A-Za-z]|[0-9]+|[ivxlcdmIVXLCDM]+)\\. "},{token:e,regex:"^\\s*\\(?(?:[A-Za-z]|[0-9]+|[ivxlcdmIVXLCDM]+)\\) "},{token:t,regex:"^={2,}(?: +={2,})+$"},{token:t,regex:"^\\+-{2,}(?:\\+-{2,})+\\+$"},{token:t,regex:"^\\+={2,}(?:\\+={2,})+\\+$"},{token:["text",g],regex:s+"(``)(?=\\S)",next:"code"},{token:["text",x],regex:s+"(\\*\\*)(?=\\S)",next:"bold"},{token:["text",i],regex:s+"(\\*)(?=\\S)",next:"italic"},{token:n,regex:"\\|[\\w\\-]+?\\|"},{token:n,regex:":[\\w-:]+:`\\S",next:"entity"},{token:["text",n],regex:s+"(_`)(?=\\S)",next:"entity"},{token:n,regex:"_[A-Za-z0-9\\-]+?"},{token:["text",r],regex:s+"(`)(?=\\S)",next:"link"},{token:r,regex:"[A-Za-z0-9\\-]+?__?"},{token:r,regex:"\\[[^\\]]+?\\]_"},{token:r,regex:"https?://\\S+"},{token:t,regex:"\\|"}],codeblock:[{token:g,regex:"^ +.+$",next:"codeblock"},{token:g,regex:"^$",next:"codeblock"},{token:"empty",regex:"",next:"start"}],code:[{token:g,regex:"\\S``"+k,next:"start"},{defaultToken:g}],bold:[{token:x,regex:"\\S\\*\\*"+k,next:"start"},{defaultToken:x}],italic:[{token:i,regex:"\\S\\*"+k,next:"start"},{defaultToken:i}],entity:[{token:n,regex:"\\S`"+k,next:"start"},{defaultToken:n}],link:[{token:r,regex:"\\S`__?"+k,next:"start"},{defaultToken:r}],comment:[{token:l,regex:"^ +.+$",next:"comment"},{token:l,regex:"^$",next:"comment"},{token:"empty",regex:"",next:"start"}]}};n.inherits(x,r),t.RSTHighlightRules=x})),ace.define("ace/mode/rst",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/rst_highlight_rules"],(function(e,t,o){"use strict";var n=e("../lib/oop"),r=e("./text").Mode,x=e("./rst_highlight_rules").RSTHighlightRules,i=function(){this.HighlightRules=x};n.inherits(i,r),function(){this.type="text",this.$id="ace/mode/rst",this.snippetFileId="ace/snippets/rst"}.call(i.prototype),t.Mode=i})),ace.require(["ace/mode/rst"],(function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)}));