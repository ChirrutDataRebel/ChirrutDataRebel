(function(){


function interceptNewInputs() {
    const MARKER = "drnoparse-marker";
    [].slice.call(document.querySelectorAll(`textarea:not([${MARKER}])`))
    .forEach(textarea=>{
        console.log("drnoparse hooked", textarea);
        textarea.setAttribute(MARKER, true);
        textarea.addEventListener('keydown', e=>keydown(e,textarea));
    });
}

function nomodifiers(e) {
    let modifiers = false;
    modifiers |= e.ctrlKey;
    modifiers |= e.altKey;
    modifiers |= e.metaKey;
    return !modifiers;
}

const OPTIONS = {
    enabled: true,
}

function keydown(event, textarea) {
    if(!OPTIONS.enabled) return;
    if(event && event.key && event.key.length 
            && event.key.match(/^[\w]$/i)
            && nomodifiers(event)) {
        event.preventDefault();
        const replacement = obfuscated(event.key);
        if (textarea.selectionStart || textarea.selectionStart == '0') {
            const startPos = textarea.selectionStart;
            const endPos = textarea.selectionEnd;
            textarea.value = textarea.value.substring(0, startPos)
                + replacement
                + textarea.value.substring(endPos, textarea.value.length);
        } else {
            textarea.value += replacement;
        }
    }
}

const mappingconfig = (`
    Codes = 33, 451 chars = !, ǃ
    Codes = 59, 894 chars = ;, ;
    Codes = 65, 913, 1040 chars = A, Α, А
    Codes = 66, 914, 1042 chars = B, Β, В
    Codes = 67, 1017, 1057 chars = C, Ϲ, С
    Codes = 69, 917, 1045 chars = E, Ε, Е
    Codes = 72, 919, 1053 chars = H, Η, Н
    Codes = 73, 921, 1030, 1216 chars = I, Ι, І, Ӏ
    Codes = 74, 1032 chars = J, Ј
    Codes = 75, 922 chars = K, Κ
    Codes = 77, 924, 1052 chars = M, Μ, М
    Codes = 78, 925 chars = N, Ν
    Codes = 79, 927, 1054 chars = O, Ο, О
    Codes = 80, 929, 1056 chars = P, Ρ, Р
    Codes = 83, 1029 chars = S, Ѕ
    Codes = 84, 932, 1058 chars = T, Τ, Т
    Codes = 88, 935, 1061 chars = X, Χ, Х
    Codes = 89, 933 chars = Y, Υ
    Codes = 90, 918 chars = Z, Ζ
    `)+"Codes = 96, 715, 8175 chars = `, ˋ, `\n"+(`
    Codes = 97, 1072 chars = a, а
    Codes = 99, 1010, 1089, 7428 chars = c, ϲ, с, ᴄ
    Codes = 100, 1281 chars = d, ԁ
    Codes = 101, 1077 chars = e, е
    Codes = 103, 609 chars = g, ɡ
    Codes = 105, 1110 chars = i, і
    Codes = 106, 1011, 1112 chars = j, ϳ, ј
    Codes = 111, 959, 1086, 7439 chars = o, ο, о, ᴏ
    Codes = 112, 1088 chars = p, р
    Codes = 115, 1109 chars = s, ѕ
    Codes = 118, 7456 chars = v, ᴠ
    Codes = 119, 7457 chars = w, ᴡ
    Codes = 120, 1093 chars = x, х
    Codes = 121, 1091 chars = y, у
    Codes = 122, 7458 chars = z, ᴢ
    Codes = 180, 714, 900, 8189 chars = ´, ˊ, ΄, ´
    Codes = 181, 956 chars = µ, μ
    Codes = 198, 1236 chars = Æ, Ӕ
    Codes = 200, 1024 chars = È, Ѐ
    Codes = 207, 938, 1031 chars = Ï, Ϊ, Ї
    Codes = 208, 272, 393 chars = Ð, Đ, Ɖ
    Codes = 222, 1015 chars = Þ, Ϸ
    Codes = 230, 1237 chars = æ, ӕ
    Codes = 232, 1104 chars = è, ѐ
    Codes = 235, 1105 chars = ë, ё
    Codes = 239, 1111 chars = ï, ї
    Codes = 242, 8056 chars = ò, ὸ
    Codes = 243, 972, 8057 chars = ó, ό, ό
    Codes = 254, 1016 chars = þ, ϸ
    Codes = 376, 939 chars = Ÿ, Ϋ
    Codes = 386, 1041 chars = Ƃ, Б
    Codes = 390, 1021 chars = Ɔ, Ͻ
    Codes = 399, 1240 chars = Ə, Ә
    Codes = 400, 1296 chars = Ɛ, Ԑ
    Codes = 415, 1012 chars = Ɵ, ϴ
    Codes = 425, 931 chars = Ʃ, Σ
    Codes = 449, 8214 chars = ǁ, ‖
    Codes = 581, 923 chars = Ʌ, Λ
    Codes = 596, 891, 7440, 8580 chars = ɔ, ͻ, ᴐ, ↄ
    Codes = 601, 1241 chars = ə, ә
    Codes = 603, 1297 chars = ɛ, ԑ
    Codes = 604, 1079, 7432 chars = ɜ, з, ᴈ
    Codes = 617, 953 chars = ɩ, ι
    Codes = 652, 7463 chars = ʌ, ᴧ
    Codes = 658, 1249 chars = ʒ, ӡ
    Codes = 665, 1074 chars = ʙ, в
    Codes = 668, 1085 chars = ʜ, н
    Codes = 787, 835 chars = ̓, ̓
    Codes = 800, 817 chars = ̠, ̱
    Codes = 901, 8174 chars = ΅, ΅
    Codes = 1075, 7462 chars = г, ᴦ
    Codes = 1080, 7438 chars = и, ᴎ
    Codes = 1083, 7467 chars = л, ᴫ
    Codes = 1084, 7437 chars = м, ᴍ
    Codes = 1087, 7464 chars = п, ᴨ
    Codes = 1090, 7451 chars = т, ᴛ
    Codes = 1103, 7449 chars = я, ᴙ
    Codes = 1607, 1729, 1749 chars = ه, ہ, ە
    Codes = 1632, 1776 chars = ٠, ۰
    Codes = 1633, 1777 chars = ١, ۱
    Codes = 1634, 1778 chars = ٢, ۲
    Codes = 1635, 1779 chars = ٣, ۳
    Codes = 1640, 1784 chars = ٨, ۸
    Codes = 1641, 1785 chars = ٩, ۹
    Codes = 1728, 1730 chars = ۀ, ۂ
    Codes = 1759, 1772 chars = ۟, ۬
    Codes = 3360, 3430 chars = ഠ, ൦
    Codes = 3434, 3452 chars = ൪, ർ
    Codes = 3439, 3451 chars = ൯, ൻ
    Codes = 3938, 3946 chars = ར, ཪ
    Codes = 4352, 4520 chars = ᄀ, ᆨ
    Codes = 4353, 4521 chars = ᄁ, ᆩ
    Codes = 4354, 4523 chars = ᄂ, ᆫ
    Codes = 4355, 4526 chars = ᄃ, ᆮ
    Codes = 4357, 4527 chars = ᄅ, ᆯ
    Codes = 4358, 4535 chars = ᄆ, ᆷ
    Codes = 4359, 4536 chars = ᄇ, ᆸ
    Codes = 4361, 4538 chars = ᄉ, ᆺ
    Codes = 4362, 4539 chars = ᄊ, ᆻ
    Codes = 4363, 4540 chars = ᄋ, ᆼ
    Codes = 4364, 4541 chars = ᄌ, ᆽ
    Codes = 4366, 4542 chars = ᄎ, ᆾ
    Codes = 4367, 4543 chars = ᄏ, ᆿ
    Codes = 4368, 4544 chars = ᄐ, ᇀ
    Codes = 4369, 4545 chars = ᄑ, ᇁ
    Codes = 4370, 4546 chars = ᄒ, ᇂ
    Codes = 5820, 5857 chars = ᚼ, ᛡ
    Codes = 5833, 5859 chars = ᛉ, ᛣ
    Codes = 7448, 7465 chars = ᴘ, ᴩ
    Codes = 7500, 7583 chars = ᵌ, ᶟ
    Codes = 7501, 7586 chars = ᵍ, ᶢ
    Codes = 7547, 7548 chars = ᵻ, ᵼ
    Codes = 7589, 7590 chars = ᶥ, ᶦ
    Codes = 8125, 8127 chars = ᾽, ᾿
    Codes = 8208, 8209 chars = ‐, ‑
    Codes = 8210, 8211 chars = ‒, –
    Codes = 8260, 8725 chars = ⁄, ∕
    Codes = 9116, 9122, 9125, 9130 chars = ⎜, ⎢, ⎥, ⎪
`);

const mappings = mappingconfig
    .split(/[\r\n]+/gm)
    .map(l=>l.trim())
    .filter(l=>l)
    .map(l=>l.split(/= /g)[1]
        .replace(/ chars.*/,"")
        .trim().split(/,\s*/)
        .map(s=>+s))
    .reduce((acc,l)=>{
        l.forEach(i=>{acc[i]=l});
        return acc;
    },{})
    ;

function obfuscated(txt) {
    return (txt.match(/./g) || [])
        .map(c=>zalgoed(shuffle(mappings,c)))
        .join("");
}

function shuffle(m, c) {
    const i = c.charCodeAt(0);
    if(i in m) {
        const candidates = m[i];
        const n = Math.floor(Math.random()*candidates.length);
        return String.fromCharCode(candidates[n]);
    }
    return c;
}

const zalgo_up = [
    '\u030d','\u030e','\u0304','\u0305', '\u033f','\u0311','\u0306','\u0310',
    '\u0352','\u0357','\u0351','\u0307', '\u0308','\u030a','\u0342','\u0343',
    '\u0344','\u034a','\u034b','\u034c', '\u0303','\u0302','\u030c','\u0350',
    '\u0300','\u0301','\u030b','\u030f', '\u0312','\u0313','\u0314','\u033d',
    '\u0309','\u0363','\u0364','\u0365', '\u0366','\u0367','\u0368','\u0369',
    '\u036a','\u036b','\u036c','\u036d', '\u036e','\u036f','\u033e','\u035b',
    '\u0346','\u031a'
  ];
const zalgo_down = [
    '\u0316','\u0317','\u0318','\u0319', '\u031c','\u031d','\u031e','\u031f',
    '\u0320','\u0324','\u0325','\u0326', '\u0329','\u032a','\u032b','\u032c',
    '\u032d','\u032e','\u032f','\u0330', '\u0331','\u0332','\u0333','\u0339',
    '\u033a','\u033b','\u033c','\u0345', '\u0347','\u0348','\u0349','\u034d',
    '\u034e','\u0353','\u0354','\u0355', '\u0356','\u0359','\u035a','\u0323'
  ];
const zalgo_mid = [
    '\u0315','\u031b','\u0340','\u0341', '\u0358','\u0321','\u0322','\u0327',
    '\u0328','\u0334','\u0335','\u0336', '\u034f','\u035c','\u035d','\u035e',
    '\u035f','\u0360','\u0362','\u0338', '\u0337','\u0361','\u0489'
  ];
const zalgo = []
    .concat(zalgo_up)
    .concat(zalgo_down)
    //.concat(zalgo_mid)
    ;

function zalgoed(c) {
  const n = Math.floor(Math.random()*4);
  return [c].concat(Array(n).fill(0).map(_=>
    zalgo[Math.floor(Math.random()*zalgo.length)]
  )).join("");
}

browser.runtime.onMessage.addListener((message) => {
    if (message.command === "drnoparse") {
        if(message.action == "Disable") {
            OPTIONS.enabled = false;
        } else {
            OPTIONS.enabled = true;
        }
    }
});

document.body.style.border = "5px solid red";
interceptNewInputs();
window.setInterval(interceptNewInputs, 2000);

})();
