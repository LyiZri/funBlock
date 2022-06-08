ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],(function(e,t,i){"use strict";var o=e("../lib/oop"),n=e("./text_highlight_rules").TextHighlightRules,a=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},a.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:!0}]}};o.inherits(a,n),a.getTagRule=function(e){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},a.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}},a.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}},t.DocCommentHighlightRules=a})),ace.define("ace/mode/edifact_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],(function(e,t,i){"use strict";var o=e("../lib/oop"),n=e("./doc_comment_highlight_rules").DocCommentHighlightRules,a=e("./text_highlight_rules").TextHighlightRules,r=function(){var e=this.createKeywordMapper({"variable.language":"this",keyword:"BY|SE|ON|INV|JP|UNOA","entity.name.segment":"ADR|AGR|AJT|ALC|ALI|APP|APR|ARD|ARR|ASI|ATT|AUT|BAS|BGM|BII|BUS|CAV|CCD|CCI|CDI|CDS|CDV|CED|CIN|CLA|CLI|CMP|CNI|CNT|COD|COM|COT|CPI|CPS|CPT|CST|CTA|CUX|DAM|DFN|DGS|DII|DIM|DLI|DLM|DMS|DOC|DRD|DSG|DSI|DTM|EDT|EFI|ELM|ELU|ELV|EMP|EQA|EQD|EQN|ERC|ERP|EVE|FCA|FII|FNS|FNT|FOR|FSQ|FTX|GDS|GEI|GID|GIN|GIR|GOR|GPO|GRU|HAN|HYN|ICD|IDE|IFD|IHC|IMD|IND|INP|INV|IRQ|LAN|LIN|LOC|MEA|MEM|MKS|MOA|MSG|MTD|NAD|NAT|PAC|PAI|PAS|PCC|PCD|PCI|PDI|PER|PGI|PIA|PNA|POC|PRC|PRI|PRV|PSD|PTY|PYT|QRS|QTY|QUA|QVR|RCS|REL|RFF|RJL|RNG|ROD|RSL|RTE|SAL|SCC|SCD|SEG|SEL|SEQ|SFI|SGP|SGU|SPR|SPS|STA|STC|STG|STS|TAX|TCC|TDT|TEM|TMD|TMP|TOD|TPL|TRU|TSR|UNB|UNZ|UNT|UGH|UGT|UNS|VLI","entity.name.header":"UNH","constant.language":"null|Infinity|NaN|undefined","support.function":""},"identifier");this.$rules={start:[{token:"punctuation.operator",regex:"\\+.\\+"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:e,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+"},{token:"punctuation.operator",regex:"\\:|'"},{token:"identifier",regex:"\\:D\\:"}]},this.embedRules(n,"doc-",[n.getEndRule("start")])};r.metaData={fileTypes:["edi"],keyEquivalent:"^~E",name:"Edifact",scopeName:"source.edifact"},o.inherits(r,a),t.EdifactHighlightRules=r})),ace.define("ace/mode/edifact",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/edifact_highlight_rules"],(function(e,t,i){"use strict";var o=e("../lib/oop"),n=e("./text").Mode,a=e("./edifact_highlight_rules").EdifactHighlightRules,r=function(){this.HighlightRules=a};o.inherits(r,n),function(){this.$id="ace/mode/edifact",this.snippetFileId="ace/snippets/edifact"}.call(r.prototype),t.Mode=r})),ace.require(["ace/mode/edifact"],(function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)}));