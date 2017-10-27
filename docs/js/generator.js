/*  Random-Required
 *  Copyright (C) coddec https://github.com/coddec
 *  Free to use/modify/improve/fork (credits/author information must not be removed or modified), no commercial use allowed at all.
 *  For commercial use or other matters, contact me at https://goo.gl/AKt4Vr
*/
function RdnIntInclusiveWorse(a,b){"use strict";return a=Math.ceil(a),b=Math.floor(b),Math.floor(Math.random()*(b-a+1))+a}function generate(a,b,c,d){"use strict";var f=0,g=0,h="",k="",l="";if(!0!==d)for(f=0;f<c;f++){for(g=0;g<b;g++)l=RdnIntInclusiveWorse(0,a.length-1),k+=a.charAt(l);k+="\n"}else{var m=a,n=b;for(f=0;f<c;f++){for(m=a,n=b,g=n;0<g;g--)l=RdnIntInclusiveWorse(0,m.length-1),k+=m.charAt(l),m=m.slice(0,l)+m.slice(l+1),n-=1;k+="\n"}}return h=k,h}self.addEventListener("message",function(a){"use strict";var b=a.data[0],c=a.data[1],d=a.data[2],f=a.data[3],g=a.data[4],h=generate(b,c,d,f,g);postMessage(h)},!1);
