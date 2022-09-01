// jQuery Mask Plugin v1.14.16
// github.com/igorescobar/jQuery-Mask-Plugin
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(a,n,f){a instanceof String&&(a=String(a));for(var p=a.length,k=0;k<p;k++){var b=a[k];if(n.call(f,b,k,a))return{i:k,v:b}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,n,f){a!=Array.prototype&&a!=Object.prototype&&(a[n]=f.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,n,f,p){if(n){f=$jscomp.global;a=a.split(".");for(p=0;p<a.length-1;p++){var k=a[p];k in f||(f[k]={});f=f[k]}a=a[a.length-1];p=f[a];n=n(p);n!=p&&null!=n&&$jscomp.defineProperty(f,a,{configurable:!0,writable:!0,value:n})}};$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,f){return $jscomp.findInternal(this,a,f).v}},"es6","es3");
(function(a,n,f){"function"===typeof define&&define.amd?define(["jquery"],a):"object"===typeof exports&&"undefined"===typeof Meteor?module.exports=a(require("jquery")):a(n||f)})(function(a){var n=function(b,d,e){var c={invalid:[],getCaret:function(){try{var a=0,r=b.get(0),h=document.selection,d=r.selectionStart;if(h&&-1===navigator.appVersion.indexOf("MSIE 10")){var e=h.createRange();e.moveStart("character",-c.val().length);a=e.text.length}else if(d||"0"===d)a=d;return a}catch(C){}},setCaret:function(a){try{if(b.is(":focus")){var c=
b.get(0);if(c.setSelectionRange)c.setSelectionRange(a,a);else{var g=c.createTextRange();g.collapse(!0);g.moveEnd("character",a);g.moveStart("character",a);g.select()}}}catch(B){}},events:function(){b.on("keydown.mask",function(a){b.data("mask-keycode",a.keyCode||a.which);b.data("mask-previus-value",b.val());b.data("mask-previus-caret-pos",c.getCaret());c.maskDigitPosMapOld=c.maskDigitPosMap}).on(a.jMaskGlobals.useInput?"input.mask":"keyup.mask",c.behaviour).on("paste.mask drop.mask",function(){setTimeout(function(){b.keydown().keyup()},
100)}).on("change.mask",function(){b.data("changed",!0)}).on("blur.mask",function(){f===c.val()||b.data("changed")||b.trigger("change");b.data("changed",!1)}).on("blur.mask",function(){f=c.val()}).on("focus.mask",function(b){!0===e.selectOnFocus&&a(b.target).select()}).on("focusout.mask",function(){e.clearIfNotMatch&&!k.test(c.val())&&c.val("")})},getRegexMask:function(){for(var a=[],b,c,e,t,f=0;f<d.length;f++)(b=l.translation[d.charAt(f)])?(c=b.pattern.toString().replace(/.{1}$|^.{1}/g,""),e=b.optional,
(b=b.recursive)?(a.push(d.charAt(f)),t={digit:d.charAt(f),pattern:c}):a.push(e||b?c+"?":c)):a.push(d.charAt(f).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"));a=a.join("");t&&(a=a.replace(new RegExp("("+t.digit+"(.*"+t.digit+")?)"),"($1)?").replace(new RegExp(t.digit,"g"),t.pattern));return new RegExp(a)},destroyEvents:function(){b.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "))},val:function(a){var c=b.is("input")?"val":"text";if(0<arguments.length){if(b[c]()!==a)b[c](a);
c=b}else c=b[c]();return c},calculateCaretPosition:function(a){var d=c.getMasked(),h=c.getCaret();if(a!==d){var e=b.data("mask-previus-caret-pos")||0;d=d.length;var g=a.length,f=a=0,l=0,k=0,m;for(m=h;m<d&&c.maskDigitPosMap[m];m++)f++;for(m=h-1;0<=m&&c.maskDigitPosMap[m];m--)a++;for(m=h-1;0<=m;m--)c.maskDigitPosMap[m]&&l++;for(m=e-1;0<=m;m--)c.maskDigitPosMapOld[m]&&k++;h>g?h=10*d:e>=h&&e!==g?c.maskDigitPosMapOld[h]||(e=h,h=h-(k-l)-a,c.maskDigitPosMap[h]&&(h=e)):h>e&&(h=h+(l-k)+f)}return h},behaviour:function(d){d=
d||window.event;c.invalid=[];var e=b.data("mask-keycode");if(-1===a.inArray(e,l.byPassKeys)){e=c.getMasked();var h=c.getCaret(),g=b.data("mask-previus-value")||"";setTimeout(function(){c.setCaret(c.calculateCaretPosition(g))},a.jMaskGlobals.keyStrokeCompensation);c.val(e);c.setCaret(h);return c.callbacks(d)}},getMasked:function(a,b){var h=[],f=void 0===b?c.val():b+"",g=0,k=d.length,n=0,p=f.length,m=1,r="push",u=-1,w=0;b=[];if(e.reverse){r="unshift";m=-1;var x=0;g=k-1;n=p-1;var A=function(){return-1<
g&&-1<n}}else x=k-1,A=function(){return g<k&&n<p};for(var z;A();){var y=d.charAt(g),v=f.charAt(n),q=l.translation[y];if(q)v.match(q.pattern)?(h[r](v),q.recursive&&(-1===u?u=g:g===x&&g!==u&&(g=u-m),x===u&&(g-=m)),g+=m):v===z?(w--,z=void 0):q.optional?(g+=m,n-=m):q.fallback?(h[r](q.fallback),g+=m,n-=m):c.invalid.push({p:n,v:v,e:q.pattern}),n+=m;else{if(!a)h[r](y);v===y?(b.push(n),n+=m):(z=y,b.push(n+w),w++);g+=m}}a=d.charAt(x);k!==p+1||l.translation[a]||h.push(a);h=h.join("");c.mapMaskdigitPositions(h,
b,p);return h},mapMaskdigitPositions:function(a,b,d){a=e.reverse?a.length-d:0;c.maskDigitPosMap={};for(d=0;d<b.length;d++)c.maskDigitPosMap[b[d]+a]=1},callbacks:function(a){var g=c.val(),h=g!==f,k=[g,a,b,e],l=function(a,b,c){"function"===typeof e[a]&&b&&e[a].apply(this,c)};l("onChange",!0===h,k);l("onKeyPress",!0===h,k);l("onComplete",g.length===d.length,k);l("onInvalid",0<c.invalid.length,[g,a,b,c.invalid,e])}};b=a(b);var l=this,f=c.val(),k;d="function"===typeof d?d(c.val(),void 0,b,e):d;l.mask=
d;l.options=e;l.remove=function(){var a=c.getCaret();l.options.placeholder&&b.removeAttr("placeholder");b.data("mask-maxlength")&&b.removeAttr("maxlength");c.destroyEvents();c.val(l.getCleanVal());c.setCaret(a);return b};l.getCleanVal=function(){return c.getMasked(!0)};l.getMaskedVal=function(a){return c.getMasked(!1,a)};l.init=function(g){g=g||!1;e=e||{};l.clearIfNotMatch=a.jMaskGlobals.clearIfNotMatch;l.byPassKeys=a.jMaskGlobals.byPassKeys;l.translation=a.extend({},a.jMaskGlobals.translation,e.translation);
l=a.extend(!0,{},l,e);k=c.getRegexMask();if(g)c.events(),c.val(c.getMasked());else{e.placeholder&&b.attr("placeholder",e.placeholder);b.data("mask")&&b.attr("autocomplete","off");g=0;for(var f=!0;g<d.length;g++){var h=l.translation[d.charAt(g)];if(h&&h.recursive){f=!1;break}}f&&b.attr("maxlength",d.length).data("mask-maxlength",!0);c.destroyEvents();c.events();g=c.getCaret();c.val(c.getMasked());c.setCaret(g)}};l.init(!b.is("input"))};a.maskWatchers={};var f=function(){var b=a(this),d={},e=b.attr("data-mask");
b.attr("data-mask-reverse")&&(d.reverse=!0);b.attr("data-mask-clearifnotmatch")&&(d.clearIfNotMatch=!0);"true"===b.attr("data-mask-selectonfocus")&&(d.selectOnFocus=!0);if(p(b,e,d))return b.data("mask",new n(this,e,d))},p=function(b,d,e){e=e||{};var c=a(b).data("mask"),f=JSON.stringify;b=a(b).val()||a(b).text();try{return"function"===typeof d&&(d=d(b)),"object"!==typeof c||f(c.options)!==f(e)||c.mask!==d}catch(w){}},k=function(a){var b=document.createElement("div");a="on"+a;var e=a in b;e||(b.setAttribute(a,
"return;"),e="function"===typeof b[a]);return e};a.fn.mask=function(b,d){d=d||{};var e=this.selector,c=a.jMaskGlobals,f=c.watchInterval;c=d.watchInputs||c.watchInputs;var k=function(){if(p(this,b,d))return a(this).data("mask",new n(this,b,d))};a(this).each(k);e&&""!==e&&c&&(clearInterval(a.maskWatchers[e]),a.maskWatchers[e]=setInterval(function(){a(document).find(e).each(k)},f));return this};a.fn.masked=function(a){return this.data("mask").getMaskedVal(a)};a.fn.unmask=function(){clearInterval(a.maskWatchers[this.selector]);
delete a.maskWatchers[this.selector];return this.each(function(){var b=a(this).data("mask");b&&b.remove().removeData("mask")})};a.fn.cleanVal=function(){return this.data("mask").getCleanVal()};a.applyDataMask=function(b){b=b||a.jMaskGlobals.maskElements;(b instanceof a?b:a(b)).filter(a.jMaskGlobals.dataMaskAttr).each(f)};k={maskElements:"input,td,span,div",dataMaskAttr:"*[data-mask]",dataMask:!0,watchInterval:300,watchInputs:!0,keyStrokeCompensation:10,useInput:!/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent)&&
k("input"),watchDataMask:!1,byPassKeys:[9,16,17,18,36,37,38,39,40,91],translation:{0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},S:{pattern:/[a-zA-Z]/}}};a.jMaskGlobals=a.jMaskGlobals||{};k=a.jMaskGlobals=a.extend(!0,{},k,a.jMaskGlobals);k.dataMask&&a.applyDataMask();setInterval(function(){a.jMaskGlobals.watchDataMask&&a.applyDataMask()},k.watchInterval)},window.jQuery,window.Zepto);
// jquery-maskmoney - v3.0.2
!function($){"use strict";$.browser||($.browser={},$.browser.mozilla=/mozilla/.test(navigator.userAgent.toLowerCase())&&!/webkit/.test(navigator.userAgent.toLowerCase()),$.browser.webkit=/webkit/.test(navigator.userAgent.toLowerCase()),$.browser.opera=/opera/.test(navigator.userAgent.toLowerCase()),$.browser.msie=/msie/.test(navigator.userAgent.toLowerCase()));var a={destroy:function(){return $(this).unbind(".maskMoney"),$.browser.msie&&(this.onpaste=null),this},mask:function(a){return this.each(function(){var b,c=$(this);return"number"==typeof a&&(c.trigger("mask"),b=$(c.val().split(/\D/)).last()[0].length,a=a.toFixed(b),c.val(a)),c.trigger("mask")})},unmasked:function(){return this.map(function(){var a,b=$(this).val()||"0",c=-1!==b.indexOf("-");return $(b.split(/\D/).reverse()).each(function(b,c){return c?(a=c,!1):void 0}),b=b.replace(/\D/g,""),b=b.replace(new RegExp(a+"$"),"."+a),c&&(b="-"+b),parseFloat(b)})},init:function(a){return a=$.extend({prefix:"",suffix:"",affixesStay:!0,thousands:",",decimal:".",precision:2,allowZero:!1,allowNegative:!1},a),this.each(function(){function b(){var a,b,c,d,e,f=s.get(0),g=0,h=0;return"number"==typeof f.selectionStart&&"number"==typeof f.selectionEnd?(g=f.selectionStart,h=f.selectionEnd):(b=document.selection.createRange(),b&&b.parentElement()===f&&(d=f.value.length,a=f.value.replace(/\r\n/g,"\n"),c=f.createTextRange(),c.moveToBookmark(b.getBookmark()),e=f.createTextRange(),e.collapse(!1),c.compareEndPoints("StartToEnd",e)>-1?g=h=d:(g=-c.moveStart("character",-d),g+=a.slice(0,g).split("\n").length-1,c.compareEndPoints("EndToEnd",e)>-1?h=d:(h=-c.moveEnd("character",-d),h+=a.slice(0,h).split("\n").length-1)))),{start:g,end:h}}function c(){var a=!(s.val().length>=s.attr("maxlength")&&s.attr("maxlength")>=0),c=b(),d=c.start,e=c.end,f=c.start!==c.end&&s.val().substring(d,e).match(/\d/)?!0:!1,g="0"===s.val().substring(0,1);return a||f||g}function d(a){s.each(function(b,c){if(c.setSelectionRange)c.focus(),c.setSelectionRange(a,a);else if(c.createTextRange){var d=c.createTextRange();d.collapse(!0),d.moveEnd("character",a),d.moveStart("character",a),d.select()}})}function e(b){var c="";return b.indexOf("-")>-1&&(b=b.replace("-",""),c="-"),c+a.prefix+b+a.suffix}function f(b){var c,d,f,g=b.indexOf("-")>-1&&a.allowNegative?"-":"",h=b.replace(/[^0-9]/g,""),i=h.slice(0,h.length-a.precision);return i=i.replace(/^0*/g,""),i=i.replace(/\B(?=(\d{3})+(?!\d))/g,a.thousands),""===i&&(i="0"),c=g+i,a.precision>0&&(d=h.slice(h.length-a.precision),f=new Array(a.precision+1-d.length).join(0),c+=a.decimal+f+d),e(c)}function g(a){var b,c=s.val().length;s.val(f(s.val())),b=s.val().length,a-=c-b,d(a)}function h(){var a=s.val();s.val(f(a))}function i(){var b=s.val();return a.allowNegative?""!==b&&"-"===b.charAt(0)?b.replace("-",""):"-"+b:b}function j(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function k(a){a=a||window.event;var d,e,f,h,k,l=a.which||a.charCode||a.keyCode;return void 0===l?!1:48>l||l>57?45===l?(s.val(i()),!1):43===l?(s.val(s.val().replace("-","")),!1):13===l||9===l?!0:!$.browser.mozilla||37!==l&&39!==l||0!==a.charCode?(j(a),!0):!0:c()?(j(a),d=String.fromCharCode(l),e=b(),f=e.start,h=e.end,k=s.val(),s.val(k.substring(0,f)+d+k.substring(h,k.length)),g(f+1),!1):!1}function l(c){c=c||window.event;var d,e,f,h,i,k=c.which||c.charCode||c.keyCode;return void 0===k?!1:(d=b(),e=d.start,f=d.end,8===k||46===k||63272===k?(j(c),h=s.val(),e===f&&(8===k?""===a.suffix?e-=1:(i=h.split("").reverse().join("").search(/\d/),e=h.length-i-1,f=e+1):f+=1),s.val(h.substring(0,e)+h.substring(f,h.length)),g(e),!1):9===k?!0:!0)}function m(){r=s.val(),h();var a,b=s.get(0);b.createTextRange&&(a=b.createTextRange(),a.collapse(!1),a.select())}function n(){setTimeout(function(){h()},0)}function o(){var b=parseFloat("0")/Math.pow(10,a.precision);return b.toFixed(a.precision).replace(new RegExp("\\.","g"),a.decimal)}function p(b){if($.browser.msie&&k(b),""===s.val()||s.val()===e(o()))a.allowZero?a.affixesStay?s.val(e(o())):s.val(o()):s.val("");else if(!a.affixesStay){var c=s.val().replace(a.prefix,"").replace(a.suffix,"");s.val(c)}s.val()!==r&&s.change()}function q(){var a,b=s.get(0);b.setSelectionRange?(a=s.val().length,b.setSelectionRange(a,a)):s.val(s.val())}var r,s=$(this);a=$.extend(a,s.data()),s.unbind(".maskMoney"),s.bind("keypress.maskMoney",k),s.bind("keydown.maskMoney",l),s.bind("blur.maskMoney",p),s.bind("focus.maskMoney",m),s.bind("click.maskMoney",q),s.bind("cut.maskMoney",n),s.bind("paste.maskMoney",n),s.bind("mask.maskMoney",h)})}};$.fn.maskMoney=function(b){return a[b]?a[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?($.error("Method "+b+" does not exist on jQuery.maskMoney"),void 0):a.init.apply(this,arguments)}}(window.jQuery||window.Zepto);
// Textarea Characters Counter 
(function($){$.fn.textareaCount=function(options,fn){var defaults={maxCharacterSize:-1,originalStyle:'originalTextareaInfo',warningStyle:'warningTextareaInfo',warningNumber:20,displayFormat:'#input characters | #words words'};  var options=$.extend(defaults,options);var container=$(this);$("<div class='charleft'>&nbsp;</div>").insertAfter(container);var charLeftInfo=getNextCharLeftInformation(container);charLeftInfo.addClass(options.originalStyle);var numInput=0;var maxCharacters=options.maxCharacterSize;var numLeft=0;var numWords=0;container.bind('keyup',function(event){limitTextAreaByCharacterCount();}).bind('mouseover',function(event){setTimeout(function(){limitTextAreaByCharacterCount();},10);}).bind('paste',function(event){setTimeout(function(){limitTextAreaByCharacterCount();},10);});limitTextAreaByCharacterCount();function limitTextAreaByCharacterCount(){charLeftInfo.html(countByCharacters());if(typeof fn!='undefined'){fn.call(this,getInfo());}return true;}function countByCharacters(){var content=container.val();var contentLength=content.length;if(options.maxCharacterSize>0){if(contentLength>=options.maxCharacterSize){content=content.substring(0,options.maxCharacterSize);}var newlineCount=getNewlineCount(content);var systemmaxCharacterSize=options.maxCharacterSize-newlineCount;if(!isWin()){systemmaxCharacterSize=options.maxCharacterSize;}if(contentLength>systemmaxCharacterSize){var originalScrollTopPosition=this.scrollTop;container.val(content.substring(0,systemmaxCharacterSize));this.scrollTop=originalScrollTopPosition;}charLeftInfo.removeClass(options.warningStyle);if(systemmaxCharacterSize-contentLength<=options.warningNumber){charLeftInfo.addClass(options.warningStyle);}numInput=container.val().length+newlineCount;if(!isWin()){numInput=container.val().length;}numWords=countWord(getCleanedWordString(container.val()));numLeft=maxCharacters-numInput;}else {var newlineCount=getNewlineCount(content);numInput=container.val().length+newlineCount;if(!isWin()){numInput=container.val().length;}numWords=countWord(getCleanedWordString(container.val()));}return formatDisplayInfo();}function formatDisplayInfo(){var format=options.displayFormat;format=format.replace('#input',numInput);format=format.replace('#words',numWords);if(maxCharacters>0){format=format.replace('#max',maxCharacters);format=format.replace('#left',numLeft);}return format;}function getInfo(){var info={input:numInput,max:maxCharacters,left:numLeft,words:numWords};return info;}function getNextCharLeftInformation(container){return container.next('.charleft');}function isWin(){var strOS = navigator.appVersion;if (strOS.toLowerCase().indexOf('win')!=-1){return true;}return false;}function getNewlineCount(content){var newlineCount = 0;for(var i=0;i<content.length;i++){if(content.charAt(i)=='\n'){newlineCount++;}}return newlineCount;}function getCleanedWordString(content){var fullStr=content+" ";var initial_whitespace_rExp=/^[^A-Za-z0-9]+/gi;var left_trimmedStr=fullStr.replace(initial_whitespace_rExp,"");var non_alphanumerics_rExp=rExp=/[^A-Za-z0-9]+/gi;var cleanedStr=left_trimmedStr.replace(non_alphanumerics_rExp," ");var splitString=cleanedStr.split(" ");return splitString;}function countWord(cleanedWordString){var word_count=cleanedWordString.length-1;return word_count;}};})(jQuery); 

window.mobileAndTabletCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

(function($){

	var _body = $( 'body' );

	var PikiMasks = {

		init : function(){

			PikiMasks.configureAll();
			PikiMasks.bindAll();

		},

		configureAll : function(){

		    $( 'input.ftype-number' ).each(function(){
		    	PikiMasks.configure( this, 'number' );
		    });

		    $( '.ftype-telephone' ).each(function(){

		    	this.$ = this.$ || $( this );

		    	var $wrapper = $( '.ftype-phone-wrapper', this.$ );
		    	if( $wrapper.length ){
				
				    $( 'input.prefix', $wrapper ).each(function(){
				    	PikiMasks.configure( this, 'phonePrefix' );
				    });
				    $( 'input.number', $wrapper ).each(function(){
				    	PikiMasks.configure( this, 'phoneNumber' );
				    });

		    	}
		    	else {

					$( 'input.number', this.$ ).each(function(){
						PikiMasks.configure( this, 'phone' );
					});
		    	
		    	}

			});
		    
		    $( 'textarea[data-show-counter],input[show-counter]' ).each(function(){
		    	PikiMasks.configure( this, 'counter' );
		    });
		    $( 'input.ftype-cep' ).each(function(){
		    	PikiMasks.configure( this, 'cep' );
		    });
		    $( 'input.ftype-money' ).each(function(){
		    	PikiMasks.configure( this, 'money' );
		    });
		    $( 'input.ftype-time-hm' ).each(function(){
		    	PikiMasks.configure( this, 'time' );
		    });
		    $( 'input.ftype-time' ).each(function(){
		    	PikiMasks.configure( this, 'duration' );
		    });
		    $( 'input.ftype-cpf' ).each(function(){
		    	PikiMasks.configure( this, 'cpf' );
		    });
		    $( 'input.ftype-cnpj' ).each(function(){
		    	PikiMasks.configure( this, 'cnpj' );
		    });
		    $( 'input.ftype-date' ).each(function(){
		    	PikiMasks.configure( this, 'date' );
		    });
		
		},

		bindAll : function(){

		    _body.on( 'focus', 'input.ftype-number', function( event ){
		    	PikiMasks.configure( this, 'number' );
		    });
		    _body.on( 'focus', '.ftype-phone-wrapper input.prefix',function(){
		    	PikiMasks.configure( this, 'phonePrefix' );
		    });
		    _body.on( 'focus','.ftype-phone-wrapper input.number',function(){
		    	PikiMasks.configure( this, 'phone' );
		    });
		    _body.on( 'focus','textarea.with-counter,input.with-counter', function(){
		    	PikiMasks.configure( this, 'counter' );
		    });
		    _body.on( 'focus', 'input.ftype-cep',function(){
		    	PikiMasks.configure( this, 'cep' );
		    });
		    _body.on( 'focus', 'input.ftype-money', function(){
		    	PikiMasks.configure( this, 'money' );
		    });
		    _body.on( 'focus', 'input.ftype-time-hm', function(){
		    	PikiMasks.configure( this, 'time' );
		    });
		    _body.on( 'focus', 'input.ftype-cpf', function(){
		    	PikiMasks.configure( this, 'cpf' );
		    });
		    _body.on( 'focus', 'input.ftype-cnpj', function(){
		    	PikiMasks.configure( this, 'cnpj' );
		    });
		    _body.on( 'focus', 'input.ftype-date',function(event){
		    	PikiMasks.configure( this, 'date' );
		    });
		
		},

		configure : function( el, method ){

			el.$ = el.$ || $( el );
		
			if( el.$.hasClass( 'masked' ) ) return;
			el.$.addClass( 'masked' );
		
			PikiMasks[ method ]( el );
		
		},

		number : function( el ){
			el.$ = el.$ || $( el );

			el.$.on( 'keydown', function(e){

				// Verify if is delete
				free = ( event.keyCode == 8 || event.keyCode == 46 || ( event.keyCode >= 37 && event.keyCode <= 40 ) );

				// Check if is number key
				var isnumberkey = ( event.ctrlKey || event.altKey 
                || ( 47 < event.keyCode && event.keyCode < 58 && event.shiftKey == false )
                || ( 95 < event.keyCode && event.keyCode < 106 )
                || ( event.keyCode == 9 ) 
                || ( event.keyCode > 34 && event.keyCode < 40 ) );

				// Maxlength
				var maxlength = parseInt( el.$.attr( 'maxlength' ) );
				if( maxlength && el.$.val().length >= maxlength && isnumberkey && !free ){
					e.preventDefault();
					return false;
				}

				// Only numbers
	    		return isnumberkey || free;
			
			})
		
		},

		phonePrefix : function( el ){
	        el.$.addClass( 'masked' ).mask( '00' );
		},
		phoneNumber : function( el ){
	        var _mask = el.$.data( 'format' ) === 'mobile' ? '00000-0000' : '0000-0000';
	        el.$.addClass( 'masked' ).mask( _mask );
		},
		phone : function( el ){
	        var _mask = el.$.data( 'format' ) === 'mobile' ? '(00) 00000-0000' : '(00) 0000-0000';
	        el.$.addClass( 'masked' ).mask( _mask );
		},
		counter : function( el ){

			console.info( "el" );
			console.log( el );
			
    		var _maxlength = el.$.attr( 'maxlength' );
    		var _sent = ( _maxlength !== undefined && _maxlength > 0 ) ? 'down' : 'up';
    		var _format = el.$.data( 'counter-format' );
    		
    		el.$.textareaCount({
    			'maxCharacterSize' : _maxlength,
    			'warningNumber' : _maxlength*0.1,
    			'displayFormat' : _format ? _format : '#left Caracteres restantes'
    		});
		},
		cep : function( el ){
	    	el.$.mask( '00000-000' );
		},
		money : function( el ){


			console.info( "el.$.data( 'int' )" );
			console.log(  );
			var isInt = el.$.data( 'int' );

    		el.$.maskMoney({ 
    			allowNegative: false, 
    			thousands: '.', 
    			decimal: ',', 
    			affixesStay: false,
    			precision: ( isInt ? 0 : 2 )
    		});
		},
		time : function( el ){
	    	el.$.mask( '00:00', { reverse: false } );
		},
		duration : function( el ){
	    	el.$.mask( '00:00', { reverse: false } );
		},
		cpf : function( el ){
	    	el.$.mask( '999.999.999-99' );
		},
		cnpj : function( el ){
	    	el.$.mask( '00.000.000/0000-00' );
		},
		date : function( el ){
	        
	        var masktype = el.$.attr( 'masktype' );
	           
	        //el.$.mask( '00/00/0000' );

	        if( mobileAndTabletCheck() ){

	        	//el.$.attr( 'type', 'date' );

	        }
	        else if( 1 === 2 && masktype === 'datepicker' ){

	            el.$.datepicker({
	                showButtonPanel: true,
	                closeText: false,
	                currentText: false,
	                monthNames:['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
	                monthNamesShort:['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
	                dayNames:['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
	                dayNamesShort:['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
	                dayNamesMin:['D','S','T','Q','Q','S','S'],
	                dateFormat:'dd/mm/yy',
	                firstDay:0,
	                isRTL:false,
	                showOtherMonths:true,
	                selectOtherMonths:true,
					beforeShow: function(input, inst) {
						
						var calendar = inst.dpDiv;

						// Dirty hack, but we can't do anything without it (for now, in jQuery UI 1.8.20)
						setTimeout(function() {
							calendar.position({
								my: 'left top',
								at: 'left bottom',
								collision: 'none',
								of: input
							});
						}, 1 );
					}
	            });

	        }
	
		}
	
	};

	$(function(){
		PikiMasks.init();
	});

})(jQuery);
