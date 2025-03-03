function test1(){
function p(a,b,c,p){p=k.escapeString(p);c.strict||(p=p.replace(" a"," ?a"));return p.replace(/([a-z])\1*/ig,
    function(p){var l;l=p.charAt(0);var e=p.length,d="",f="";c.strict?(1<e&&(d="0{"+(e-1)+"}"),2<e&&(f="0{"+(e-2)+"}")):(d="0?",f="0{0,2}");switch(l){case "y":l="\\d{2,4}";break;case "M":case "L":l=2<e?"\\S+?":"1[0-2]|"+d+"[1-9]";break;case "D":l="[12][0-9][0-9]|3[0-5][0-9]|36[0-6]|"+d+"[1-9][0-9]|"+f+"[1-9]";break;case "d":l=
"3[01]|[12]\\d|"+d+"[1-9]";break;case "w":l="[1-4][0-9]|5[0-3]|"+d+"[1-9]";break;case "E":case "e":case "c":l=".+?";break;case "h":l="1[0-2]|"+d+"[1-9]";break;case "k":l="1[01]|"+d+"\\d";break;case "H":l="1\\d|2[0-3]|"+d+"\\d";break;case "K":l="1\\d|2[0-4]|"+d+"[1-9]";break;case "m":case "s":l="[0-5]\\d";break;case "S":l="\\d{"+e+"}";break;case "a":e=c.am||b["dayPeriods-format-wide-am"];d=c.pm||b["dayPeriods-format-wide-pm"];l=e+"|"+d;c.strict||(e!=e.toLowerCase()&&(l+="|"+e.toLowerCase()),d!=d.toLowerCase()&&
(l+="|"+d.toLowerCase()),-1!=l.indexOf(".")&&(l+="|"+l.replace(/\./g,"")));l=l.replace(/\./g,"\\.");break;default:l=".*"}a&&a.push(p);return"("+l+")"}).replace(/[\xa0 ]/g,"[\\s\\xa0]")}var q={};a.setObject(d.id.replace(/\//g,"."),q);q._getZone=function(a,b,c){
return b?m.getTimezoneName(a):a.getTimezoneOffset()};q.format=function(p,e){
    e=e||{};var d=g.normalizeLocale(e.locale),f=e.formatLength||"short",d=q._getGregorianBundle(d),k=[],l=a.hitch(this,c,p,d,e);if("year"==e.selector)return b(d["dateFormatItem-yyyy"]||
"yyyy",l);var w;"date"!=e.selector&&(w=e.timePattern||d["timeFormat-"+f])&&k.push(b(w,l));"time"!=e.selector&&(w=e.datePattern||d["dateFormat-"+f])&&k.push(b(w,l));return 1==k.length?k[0]:d["dateTimeFormat-"+f].replace(/\'/g,"").replace(/\{(\d+)\}/g,
}
