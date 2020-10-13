const bold = "\\bf";
const italic = "\\it";
const bolditalic = "\\bi";
const blackboard = "\\bb";
const italicblackboard = "\\bbi";
const script = "\\scr";
const boldscript = "\\bscr";
const sans = "\\sans";
const boldsans = "\\bsans";
const italicsans = "\\isans";
const bolditalicsans = "\\bisans";
const frak = "\\frak";
const boldfrak = "\\bfrak";
const mono = "\\tt";

const latex_symbols: { [key: string]: string } = {
  "\\sqrt": "\u221A",
  "\\cbrt": "\u221B",
  "\\female": "♀",
  "\\mars": "♂",
  "\\pprime": "″",
  "\\ppprime": "‴",
  "\\pppprime": "⁗",
  "\\backpprime": "‶",
  "\\backppprime": "‷",
  "\\xor": "⊻",
  "\\iff": "⟺",
  "\\implies": "⟹",
  "\\impliedby": "⟸",
  "\\to": "→",
  "\\euler": "ℯ",
  "\\ohm": "Ω",

  // Superscripts
  "\\^0": "⁰",
  "\\^1": "¹",
  "\\^2": "²",
  "\\^3": "³",
  "\\^4": "⁴",
  "\\^5": "⁵",
  "\\^6": "⁶",
  "\\^7": "⁷",
  "\\^8": "⁸",
  "\\^9": "⁹",
  "\\^+": "⁺",
  "\\^-": "⁻",
  "\\^=": "⁼",
  "\\^(": "⁽",
  "\\^)": "⁾",
  "\\^a": "ᵃ",
  "\\^b": "ᵇ",
  "\\^c": "ᶜ",
  "\\^d": "ᵈ",
  "\\^e": "ᵉ",
  "\\^f": "ᶠ",
  "\\^g": "ᵍ",
  "\\^h": "ʰ",
  "\\^i": "ⁱ",
  "\\^j": "ʲ",
  "\\^k": "ᵏ",
  "\\^l": "ˡ",
  "\\^m": "ᵐ",
  "\\^n": "ⁿ",
  "\\^o": "ᵒ",
  "\\^p": "ᵖ",
  "\\^r": "ʳ",
  "\\^s": "ˢ",
  "\\^t": "ᵗ",
  "\\^u": "ᵘ",
  "\\^v": "ᵛ",
  "\\^w": "ʷ",
  "\\^x": "ˣ",
  "\\^y": "ʸ",
  "\\^z": "ᶻ",
  "\\^A": "ᴬ",
  "\\^B": "ᴮ",
  "\\^D": "ᴰ",
  "\\^E": "ᴱ",
  "\\^G": "ᴳ",
  "\\^H": "ᴴ",
  "\\^I": "ᴵ",
  "\\^J": "ᴶ",
  "\\^K": "ᴷ",
  "\\^L": "ᴸ",
  "\\^M": "ᴹ",
  "\\^N": "ᴺ",
  "\\^O": "ᴼ",
  "\\^P": "ᴾ",
  "\\^R": "ᴿ",
  "\\^T": "ᵀ",
  "\\^U": "ᵁ",
  "\\^V": "ⱽ",
  "\\^W": "ᵂ",
  "\\^alpha": "ᵅ",
  "\\^beta": "ᵝ",
  "\\^gamma": "ᵞ",
  "\\^delta": "ᵟ",
  "\\^epsilon": "ᵋ",
  "\\^theta": "ᶿ",
  "\\^iota": "ᶥ",
  "\\^phi": "ᵠ",
  "\\^chi": "ᵡ",
  "\\^Phi": "ᶲ",
  "\\^uparrow": "ꜛ",
  "\\^downarrow": "ꜜ",
  "\\^!": "ꜝ",

  // Subscripts
  "\\_0": "₀",
  "\\_1": "₁",
  "\\_2": "₂",
  "\\_3": "₃",
  "\\_4": "₄",
  "\\_5": "₅",
  "\\_6": "₆",
  "\\_7": "₇",
  "\\_8": "₈",
  "\\_9": "₉",
  "\\_+": "₊",
  "\\_-": "₋",
  "\\_=": "₌",
  "\\_(": "₍",
  "\\_)": "₎",
  "\\_a": "ₐ",
  "\\_e": "ₑ",
  "\\_h": "ₕ",
  "\\_i": "ᵢ",
  "\\_j": "ⱼ",
  "\\_k": "ₖ",
  "\\_l": "ₗ",
  "\\_m": "ₘ",
  "\\_n": "ₙ",
  "\\_o": "ₒ",
  "\\_p": "ₚ",
  "\\_r": "ᵣ",
  "\\_s": "ₛ",
  "\\_t": "ₜ",
  "\\_u": "ᵤ",
  "\\_v": "ᵥ",
  "\\_x": "ₓ",
  "\\_schwa": "ₔ",
  "\\_beta": "ᵦ",
  "\\_gamma": "ᵧ",
  "\\_rho": "ᵨ",
  "\\_phi": "ᵩ",
  "\\_chi": "ᵪ",

  // Misc. Math and Physics
  "\\ldots": "…",
  "\\hbar": "ħ",
  "\\del": "∇",

  "\\sout": "̶", // ulem package, same as Elzbar
  "\\euro": "€",

  // 732 symbols generated from unicode.xml
  "\\exclamdown": "¡",
  "\\sterling": "£",
  "\\yen": "¥",
  "\\brokenbar": "¦",
  "\\S": "§",
  "\\copyright": "©",
  "\\ordfeminine": "ª",
  "\\neg": "¬",
  "\\circledR": "®",
  "\\highminus": "¯", // APL "high minus", or non-combining macron above
  "\\degree": "°",
  "\\pm": "±",
  "\\P": "¶",
  "\\cdotp": "·",
  "\\ordmasculine": "º",
  "\\questiondown": "¿",
  "\\AA": "Å",
  "\\AE": "Æ",
  "\\DH": "Ð",
  "\\times": "×",
  "\\O": "Ø",
  "\\TH": "Þ",
  "\\ss": "ß",
  "\\aa": "å",
  "\\ae": "æ",
  "\\eth": "ð",
  "\\dh": "ð",
  "\\div": "÷",
  "\\o": "ø",
  "\\th": "þ",
  "\\DJ": "Đ",
  "\\dj": "đ",
  "\\imath": "ı",
  "\\jmath": "ȷ",
  "\\L": "Ł",
  "\\l": "ł",
  "\\NG": "Ŋ",
  "\\ng": "ŋ",
  "\\OE": "Œ",
  "\\oe": "œ",
  "\\hvlig": "ƕ",
  "\\nrleg": "ƞ",
  "\\doublepipe": "ǂ",
  "\\trna": "ɐ",
  "\\trnsa": "ɒ",
  "\\openo": "ɔ",
  "\\rtld": "ɖ",
  "\\schwa": "ə",
  "\\varepsilon": "ε",
  "\\pgamma": "ɣ",
  "\\pbgam": "ɤ",
  "\\trnh": "ɥ",
  "\\btdl": "ɬ",
  "\\rtll": "ɭ",
  "\\trnm": "ɯ",
  "\\trnmlr": "ɰ",
  "\\ltlmr": "ɱ",
  "\\ltln": "ɲ",
  "\\rtln": "ɳ",
  "\\clomeg": "ɷ",
  "\\ltphi": "ɸ", // latin ϕ
  "\\trnr": "ɹ",
  "\\trnrl": "ɺ",
  "\\rttrnr": "ɻ",
  "\\rl": "ɼ",
  "\\rtlr": "ɽ",
  "\\fhr": "ɾ",
  "\\rtls": "ʂ",
  "\\esh": "ʃ",
  "\\trnt": "ʇ",
  "\\rtlt": "ʈ",
  "\\pupsil": "ʊ",
  "\\pscrv": "ʋ",
  "\\invv": "ʌ",
  "\\invw": "ʍ",
  "\\trny": "ʎ",
  "\\rtlz": "ʐ",
  "\\yogh": "ʒ",
  "\\glst": "ʔ",
  "\\reglst": "ʕ",
  "\\inglst": "ʖ",
  "\\turnk": "ʞ",
  "\\dyogh": "ʤ",
  "\\tesh": "ʧ",
  "\\rasp": "ʼ",
  "\\verts": "ˈ",
  "\\verti": "ˌ",
  "\\lmrk": "ː",
  "\\hlmrk": "ˑ",
  "\\sbrhr": "˒",
  "\\sblhr": "˓",
  "\\rais": "˔",
  "\\low": "˕",
  "\\u": "˘",
  "\\tildelow": "˜",
  "\\grave": "̀",
  "\\acute": "́",
  "\\hat": "̂",
  "\\tilde": "̃",
  "\\bar": "̄",
  "\\breve": "̆",
  "\\dot": "̇",
  "\\ddot": "̈",
  "\\ocirc": "̊",
  "\\H": "̋",
  "\\check": "̌",
  "\\palh": "̡",
  "\\rh": "̢",
  "\\c": "̧",
  "\\k": "̨",
  "\\sbbrg": "̪",
  "\\strike": "̶",
  "\\Alpha": "Α",
  "\\Beta": "Β",
  "\\Gamma": "Γ",
  "\\Delta": "Δ",
  "\\Epsilon": "Ε",
  "\\Zeta": "Ζ",
  "\\Eta": "Η",
  "\\Theta": "Θ",
  "\\Iota": "Ι",
  "\\Kappa": "Κ",
  "\\Lambda": "Λ",
  "\\Xi": "Ξ",
  "\\Pi": "Π",
  "\\Rho": "Ρ",
  "\\Sigma": "Σ",
  "\\Tau": "Τ",
  "\\Upsilon": "Υ",
  "\\Phi": "Φ",
  "\\Chi": "Χ",
  "\\Psi": "Ψ",
  "\\Omega": "Ω",
  "\\alpha": "α",
  "\\beta": "β",
  "\\gamma": "γ",
  "\\delta": "δ",
  "\\zeta": "ζ",
  "\\eta": "η",
  "\\theta": "θ",
  "\\iota": "ι",
  "\\kappa": "κ",
  "\\lambda": "λ",
  "\\mu": "μ",
  "\\nu": "ν",
  "\\xi": "ξ",
  "\\pi": "π",
  "\\rho": "ρ",
  "\\varsigma": "ς",
  "\\sigma": "σ",
  "\\tau": "τ",
  "\\upsilon": "υ",
  "\\varphi": "φ",
  "\\chi": "χ",
  "\\psi": "ψ",
  "\\omega": "ω",
  "\\vartheta": "ϑ",
  "\\phi": "ϕ",
  "\\varpi": "ϖ",
  "\\Stigma": "Ϛ",
  "\\Digamma": "Ϝ",
  "\\digamma": "ϝ",
  "\\Koppa": "Ϟ",
  "\\Sampi": "Ϡ",
  "\\varkappa": "ϰ",
  "\\varrho": "ϱ",
  "\\varTheta": "ϴ",
  "\\epsilon": "ϵ",
  "\\backepsilon": "϶",
  "\\enspace": " ",
  "\\quad": " ",
  "\\thickspace": " ",
  "\\thinspace": " ",
  "\\hspace": " ",
  "\\endash": "–",
  "\\emdash": "—",
  "\\Vert": "‖",
  "\\lq": "‘",
  "\\rq": "’",
  "\\reapos": "‛",
  "\\quotedblleft": "“",
  "\\quotedblright": "”",
  "\\dagger": "†",
  "\\ddagger": "‡",
  "\\bullet": "•",
  "\\dots": "…",
  "\\perthousand": "‰",
  "\\pertenthousand": "‱",
  "\\prime": "′",
  "\\backprime": "‵",
  "\\guilsinglleft": "‹",
  "\\guilsinglright": "›",
  "\\nolinebreak": "\u2060",
  "\\pes": "₧",
  "\\dddot": "⃛",
  "\\ddddot": "⃜",
  "\\hslash": "ℏ",
  "\\Im": "ℑ",
  "\\ell": "ℓ",
  "\\numero": "№",
  "\\wp": "℘",
  "\\Re": "ℜ",
  "\\xrat": "℞",
  "\\trademark": "™",
  "\\mho": "℧",
  "\\aleph": "ℵ",
  "\\beth": "ℶ",
  "\\gimel": "ℷ",
  "\\daleth": "ℸ",
  [blackboard + "Pi"]: "ℿ",
  "\\bbsum": "⅀",
  "\\Game": "⅁",
  "\\leftarrow": "←",
  "\\uparrow": "↑",
  "\\rightarrow": "→",
  "\\downarrow": "↓",
  "\\leftrightarrow": "↔",
  "\\updownarrow": "↕",
  "\\nwarrow": "↖",
  "\\nearrow": "↗",
  "\\searrow": "↘",
  "\\swarrow": "↙",
  "\\nleftarrow": "↚",
  "\\nrightarrow": "↛",
  "\\twoheadleftarrow": "↞",
  "\\twoheadrightarrow": "↠",
  "\\leftarrowtail": "↢",
  "\\rightarrowtail": "↣",
  "\\mapsto": "↦",
  "\\hookleftarrow": "↩",
  "\\hookrightarrow": "↪",
  "\\looparrowleft": "↫",
  "\\looparrowright": "↬",
  "\\leftrightsquigarrow": "↭",
  "\\nleftrightarrow": "↮",
  "\\Lsh": "↰",
  "\\Rsh": "↱",
  "\\curvearrowleft": "↶",
  "\\curvearrowright": "↷",
  "\\circlearrowleft": "↺",
  "\\circlearrowright": "↻",
  "\\leftharpoonup": "↼",
  "\\leftharpoondown": "↽",
  "\\upharpoonright": "↾",
  "\\upharpoonleft": "↿",
  "\\rightharpoonup": "⇀",
  "\\rightharpoondown": "⇁",
  "\\downharpoonright": "⇂",
  "\\downharpoonleft": "⇃",
  "\\rightleftarrows": "⇄",
  "\\dblarrowupdown": "⇅",
  "\\leftrightarrows": "⇆",
  "\\leftleftarrows": "⇇",
  "\\upuparrows": "⇈",
  "\\rightrightarrows": "⇉",
  "\\downdownarrows": "⇊",
  "\\leftrightharpoons": "⇋",
  "\\rightleftharpoons": "⇌",
  "\\nLeftarrow": "⇍",
  "\\nRightarrow": "⇏",
  "\\Leftarrow": "⇐",
  "\\Uparrow": "⇑",
  "\\Rightarrow": "⇒",
  "\\Downarrow": "⇓",
  "\\Leftrightarrow": "⇔",
  "\\Updownarrow": "⇕",
  "\\Lleftarrow": "⇚",
  "\\Rrightarrow": "⇛",
  "\\DownArrowUpArrow": "⇵",
  "\\leftarrowtriangle": "⇽",
  "\\rightarrowtriangle": "⇾",
  "\\forall": "∀",
  "\\complement": "∁",
  "\\partial": "∂",
  "\\exists": "∃",
  "\\nexists": "∄",
  "\\varnothing": "∅",
  "\\emptyset": "∅",
  "\\nabla": "∇",
  "\\in": "∈",
  "\\notin": "∉",
  "\\ni": "∋",
  "\\prod": "∏",
  "\\coprod": "∐",
  "\\sum": "∑",
  "\\minus": "−",
  "\\mp": "∓",
  "\\dotplus": "∔",
  "\\setminus": "∖",
  "\\ast": "∗",
  "\\circ": "∘",
  [blackboard + "semi"]: "⨟",
  "\\surd": "√",
  "\\propto": "∝",
  "\\infty": "∞",
  "\\rightangle": "∟",
  "\\angle": "∠",
  "\\measuredangle": "∡",
  "\\sphericalangle": "∢",
  "\\mid": "∣",
  "\\nmid": "∤",
  "\\parallel": "∥",
  "\\nparallel": "∦",
  "\\wedge": "∧",
  "\\vee": "∨",
  "\\cap": "∩",
  "\\cup": "∪",
  "\\int": "∫",
  "\\iint": "∬",
  "\\iiint": "∭",
  "\\oint": "∮",
  "\\oiint": "∯",
  "\\oiiint": "∰",
  "\\clwintegral": "∱",
  "\\therefore": "∴",
  "\\because": "∵",
  "\\Colon": "∷",
  "\\dotminus": "∸",
  "\\kernelcontraction": "∻",
  "\\sim": "∼",
  "\\backsim": "∽",
  "\\lazysinv": "∾",
  "\\wr": "≀",
  "\\nsim": "≁",
  "\\eqsim": "≂",
  "\\neqsim": "≂̸",
  "\\simeq": "≃",
  "\\nsime": "≄",
  "\\cong": "≅",
  "\\approxnotequal": "≆",
  "\\ncong": "≇",
  "\\approx": "≈",
  "\\napprox": "≉",
  "\\approxeq": "≊",
  "\\tildetrpl": "≋",
  "\\allequal": "≌",
  "\\asymp": "≍",
  "\\Bumpeq": "≎",
  "\\nBumpeq": "≎̸",
  "\\bumpeq": "≏",
  "\\nbumpeq": "≏̸",
  "\\doteq": "≐",
  "\\Doteq": "≑",
  "\\fallingdotseq": "≒",
  "\\risingdotseq": "≓",
  "\\coloneq": "≔",
  "\\eqcolon": "≕",
  "\\eqcirc": "≖",
  "\\circeq": "≗",
  "\\wedgeq": "≙",
  "\\starequal": "≛",
  "\\triangleq": "≜",
  "\\questeq": "≟",
  "\\ne": "≠",
  "\\equiv": "≡",
  "\\nequiv": "≢",
  "\\le": "≤",
  "\\leq": "≤",
  "\\ge": "≥",
  "\\geq": "≥",
  "\\leqq": "≦",
  "\\geqq": "≧",
  "\\lneqq": "≨",
  "\\lvertneqq": "≨︀",
  "\\gneqq": "≩",
  "\\gvertneqq": "≩︀",
  "\\ll": "≪",
  "\\NotLessLess": "≪̸",
  "\\gg": "≫",
  "\\NotGreaterGreater": "≫̸",
  "\\between": "≬",
  "\\nless": "≮",
  "\\ngtr": "≯",
  "\\nleq": "≰",
  "\\ngeq": "≱",
  "\\lesssim": "≲",
  "\\gtrsim": "≳",
  "\\lessgtr": "≶",
  "\\gtrless": "≷",
  "\\notlessgreater": "≸",
  "\\notgreaterless": "≹",
  "\\prec": "≺",
  "\\succ": "≻",
  "\\preccurlyeq": "≼",
  "\\succcurlyeq": "≽",
  "\\precsim": "≾",
  "\\nprecsim": "≾̸",
  "\\succsim": "≿",
  "\\nsuccsim": "≿̸",
  "\\nprec": "⊀",
  "\\nsucc": "⊁",
  "\\subset": "⊂",
  "\\supset": "⊃",
  "\\nsubset": "⊄",
  "\\nsupset": "⊅",
  "\\subseteq": "⊆",
  "\\supseteq": "⊇",
  "\\nsubseteq": "⊈",
  "\\nsupseteq": "⊉",
  "\\subsetneq": "⊊",
  "\\varsubsetneqq": "⊊︀",
  "\\supsetneq": "⊋",
  "\\varsupsetneq": "⊋︀",
  "\\cupdot": "⊍",
  "\\uplus": "⊎",
  "\\sqsubset": "⊏",
  "\\NotSquareSubset": "⊏̸",
  "\\sqsupset": "⊐",
  "\\NotSquareSuperset": "⊐̸",
  "\\sqsubseteq": "⊑",
  "\\sqsupseteq": "⊒",
  "\\sqcap": "⊓",
  "\\sqcup": "⊔",
  "\\oplus": "⊕",
  "\\ominus": "⊖",
  "\\otimes": "⊗",
  "\\oslash": "⊘",
  "\\odot": "⊙",
  "\\circledcirc": "⊚",
  "\\circledast": "⊛",
  "\\circleddash": "⊝",
  "\\boxplus": "⊞",
  "\\boxminus": "⊟",
  "\\boxtimes": "⊠",
  "\\boxdot": "⊡",
  "\\vdash": "⊢",
  "\\dashv": "⊣",
  "\\top": "⊤",
  "\\bot": "⊥",
  "\\models": "⊧",
  "\\vDash": "⊨",
  "\\Vdash": "⊩",
  "\\Vvdash": "⊪",
  "\\VDash": "⊫",
  "\\nvdash": "⊬",
  "\\nvDash": "⊭",
  "\\nVdash": "⊮",
  "\\nVDash": "⊯",
  "\\vartriangleleft": "⊲",
  "\\vartriangleright": "⊳",
  "\\trianglelefteq": "⊴",
  "\\trianglerighteq": "⊵",
  "\\original": "⊶",
  "\\image": "⊷",
  "\\multimap": "⊸",
  "\\hermitconjmatrix": "⊹",
  "\\intercal": "⊺",
  "\\veebar": "⊻",
  "\\rightanglearc": "⊾",
  "\\bigwedge": "⋀",
  "\\bigvee": "⋁",
  "\\bigcap": "⋂",
  "\\bigcup": "⋃",
  "\\diamond": "⋄",
  "\\cdot": "⋅",
  "\\star": "⋆",
  "\\divideontimes": "⋇",
  "\\bowtie": "⋈",
  "\\ltimes": "⋉",
  "\\rtimes": "⋊",
  "\\leftthreetimes": "⋋",
  "\\rightthreetimes": "⋌",
  "\\backsimeq": "⋍",
  "\\curlyvee": "⋎",
  "\\curlywedge": "⋏",
  "\\Subset": "⋐",
  "\\Supset": "⋑",
  "\\Cap": "⋒",
  "\\Cup": "⋓",
  "\\pitchfork": "⋔",
  "\\lessdot": "⋖",
  "\\gtrdot": "⋗",
  "\\verymuchless": "⋘",
  "\\ggg": "⋙",
  "\\lesseqgtr": "⋚",
  "\\gtreqless": "⋛",
  "\\curlyeqprec": "⋞",
  "\\curlyeqsucc": "⋟",
  "\\sqspne": "⋥",
  "\\lnsim": "⋦",
  "\\gnsim": "⋧",
  "\\precnsim": "⋨",
  "\\succnsim": "⋩",
  "\\ntriangleleft": "⋪",
  "\\ntriangleright": "⋫",
  "\\ntrianglelefteq": "⋬",
  "\\ntrianglerighteq": "⋭",
  "\\vdots": "⋮",
  "\\cdots": "⋯",
  "\\adots": "⋰",
  "\\ddots": "⋱",
  "\\lceil": "⌈",
  "\\rceil": "⌉",
  "\\lfloor": "⌊",
  "\\rfloor": "⌋",
  "\\recorder": "⌕",
  "\\ulcorner": "⌜",
  "\\urcorner": "⌝",
  "\\llcorner": "⌞",
  "\\lrcorner": "⌟",
  "\\frown": "⌢",
  "\\smile": "⌣",
  "\\langle": "⟨",
  "\\rangle": "⟩",
  "\\obar": "⌽",
  "\\dlcorn": "⎣",
  "\\lmoustache": "⎰",
  "\\rmoustache": "⎱",
  "\\visiblespace": "␣",
  "\\circledS": "Ⓢ",
  "\\dshfnc": "┆",
  "\\sqfnw": "┙",
  "\\diagup": "╱",
  "\\diagdown": "╲",
  "\\blacksquare": "■",
  "\\square": "□",
  "\\vrecto": "▯",
  "\\bigtriangleup": "△",
  "\\blacktriangle": "▴",
  "\\vartriangle": "▵",
  "\\bigtriangledown": "▽",
  "\\blacktriangledown": "▾",
  "\\triangledown": "▿",
  "\\lozenge": "◊",
  "\\bigcirc": "○",
  "\\cirfl": "◐",
  "\\cirfr": "◑",
  "\\cirfb": "◒",
  "\\rvbull": "◘",
  "\\sqfl": "◧",
  "\\sqfr": "◨",
  "\\sqfse": "◪",
  "\\bigstar": "★",
  "\\mercury": "☿",
  "\\venus": "♀",
  "\\male": "♂",
  "\\jupiter": "♃",
  "\\saturn": "♄",
  "\\uranus": "♅",
  "\\neptune": "♆",
  "\\pluto": "♇",
  "\\aries": "♈",
  "\\taurus": "♉",
  "\\gemini": "♊",
  "\\cancer": "♋",
  "\\leo": "♌",
  "\\virgo": "♍",
  "\\libra": "♎",
  "\\scorpio": "♏",
  "\\sagittarius": "♐",
  "\\capricornus": "♑",
  "\\aquarius": "♒",
  "\\pisces": "♓",
  "\\spadesuit": "♠",
  "\\heartsuit": "♡",
  "\\diamondsuit": "♢",
  "\\clubsuit": "♣",
  "\\quarternote": "♩",
  "\\eighthnote": "♪",
  "\\flat": "♭",
  "\\natural": "♮",
  "\\sharp": "♯",
  "\\checkmark": "✓",
  "\\maltese": "✠",
  "\\longleftarrow": "⟵",
  "\\longrightarrow": "⟶",
  "\\longleftrightarrow": "⟷",
  "\\Longleftarrow": "⟸",
  "\\Longrightarrow": "⟹",
  "\\Longleftrightarrow": "⟺",
  "\\longmapsto": "⟼",
  "\\Mapsfrom": "⤆",
  "\\Mapsto": "⤇",
  "\\Uuparrow": "⤊",
  "\\Ddownarrow": "⤋",
  "\\bkarow": "⤍",
  "\\dbkarow": "⤏",
  "\\drbkarrow": "⤐",
  "\\UpArrowBar": "⤒",
  "\\DownArrowBar": "⤓",
  "\\twoheadrightarrowtail": "⤖",
  "\\hksearow": "⤥",
  "\\hkswarow": "⤦",
  "\\tona": "⤧",
  "\\toea": "⤨",
  "\\tosa": "⤩",
  "\\towa": "⤪",
  "\\rdiagovfdiag": "⤫",
  "\\fdiagovrdiag": "⤬",
  "\\seovnearrow": "⤭",
  "\\neovsearrow": "⤮",
  "\\fdiagovnearrow": "⤯",
  "\\rdiagovsearrow": "⤰",
  "\\neovnwarrow": "⤱",
  "\\nwovnearrow": "⤲",
  "\\Rlarr": "⥂",
  "\\rLarr": "⥄",
  "\\rarrx": "⥇",
  "\\LeftRightVector": "⥎",
  "\\RightUpDownVector": "⥏",
  "\\DownLeftRightVector": "⥐",
  "\\LeftUpDownVector": "⥑",
  "\\LeftVectorBar": "⥒",
  "\\RightVectorBar": "⥓",
  "\\RightUpVectorBar": "⥔",
  "\\RightDownVectorBar": "⥕",
  "\\DownLeftVectorBar": "⥖",
  "\\DownRightVectorBar": "⥗",
  "\\LeftUpVectorBar": "⥘",
  "\\LeftDownVectorBar": "⥙",
  "\\LeftTeeVector": "⥚",
  "\\RightTeeVector": "⥛",
  "\\RightUpTeeVector": "⥜",
  "\\RightDownTeeVector": "⥝",
  "\\DownLeftTeeVector": "⥞",
  "\\DownRightTeeVector": "⥟",
  "\\LeftUpTeeVector": "⥠",
  "\\LeftDownTeeVector": "⥡",
  "\\UpEquilibrium": "⥮",
  "\\ReverseUpEquilibrium": "⥯",
  "\\RoundImplies": "⥰",
  "\\Vvert": "⦀",
  "\\Elroang": "⦆",
  "\\ddfnc": "⦙",
  "\\Angle": "⦜",
  "\\lpargt": "⦠",
  "\\obslash": "⦸",
  "\\boxdiag": "⧄",
  "\\boxbslash": "⧅",
  "\\boxast": "⧆",
  "\\boxcircle": "⧇",
  "\\Lap": "⧊",
  "\\defas": "⧋",
  "\\LeftTriangleBar": "⧏",
  "\\NotLeftTriangleBar": "⧏̸",
  "\\RightTriangleBar": "⧐",
  "\\NotRightTriangleBar": "⧐̸",
  "\\dualmap": "⧟",
  "\\shuffle": "⧢",
  "\\blacklozenge": "⧫",
  "\\RuleDelayed": "⧴",
  "\\bigodot": "⨀",
  "\\bigoplus": "⨁",
  "\\bigotimes": "⨂",
  "\\bigcupdot": "⨃",
  "\\biguplus": "⨄",
  "\\bigsqcap": "⨅",
  "\\bigsqcup": "⨆",
  "\\conjquant": "⨇",
  "\\disjquant": "⨈",
  "\\bigtimes": "⨉",
  "\\iiiint": "⨌",
  "\\intbar": "⨍",
  "\\intBar": "⨎",
  "\\clockoint": "⨏",
  "\\sqrint": "⨖",
  "\\intx": "⨘",
  "\\intcap": "⨙",
  "\\intcup": "⨚",
  "\\upint": "⨛",
  "\\lowint": "⨜",
  "\\plusdot": "⨥",
  "\\minusdot": "⨪",
  "\\Times": "⨯",
  "\\btimes": "⨲",
  "\\intprod": "⨼",
  "\\intprodr": "⨽",
  "\\amalg": "⨿",
  "\\And": "⩓",
  "\\Or": "⩔",
  "\\ElOr": "⩖",
  "\\perspcorrespond": "⩞",
  "\\minhat": "⩟",
  "\\Equal": "⩵",
  "\\ddotseq": "⩷",
  "\\leqslant": "⩽",
  "\\nleqslant": "⩽̸",
  "\\geqslant": "⩾",
  "\\ngeqslant": "⩾̸",
  "\\lessapprox": "⪅",
  "\\gtrapprox": "⪆",
  "\\lneq": "⪇",
  "\\gneq": "⪈",
  "\\lnapprox": "⪉",
  "\\gnapprox": "⪊",
  "\\lesseqqgtr": "⪋",
  "\\gtreqqless": "⪌",
  "\\eqslantless": "⪕",
  "\\eqslantgtr": "⪖",
  "\\NestedLessLess": "⪡",
  "\\NotNestedLessLess": "⪡̸",
  "\\NestedGreaterGreater": "⪢",
  "\\NotNestedGreaterGreater": "⪢̸",
  "\\partialmeetcontraction": "⪣",
  "\\bumpeqq": "⪮",
  "\\preceq": "⪯",
  "\\npreceq": "⪯̸",
  "\\succeq": "⪰",
  "\\nsucceq": "⪰̸",
  "\\precneqq": "⪵",
  "\\succneqq": "⪶",
  "\\precapprox": "⪷",
  "\\succapprox": "⪸",
  "\\precnapprox": "⪹",
  "\\succnapprox": "⪺",
  "\\subseteqq": "⫅",
  "\\nsubseteqq": "⫅̸",
  "\\supseteqq": "⫆",
  "\\nsupseteqq": "⫆̸",
  "\\subsetneqq": "⫋",
  "\\supsetneqq": "⫌",
  "\\mlcp": "⫛",
  "\\forks": "⫝̸",
  "\\forksnot": "⫝",
  "\\dashV": "⫣",
  "\\Dashv": "⫤",
  "\\interleave": "⫴",
  "\\tdcol": "⫶",
  "\\openbracketleft": "⟦",
  "\\llbracket": "⟦",
  "\\openbracketright": "⟧",
  "\\rrbracket": "⟧",
  "\\overbrace": "⏞",
  "\\underbrace": "⏟",

  // 1607 symbols generated from unicode-math-table.tex:
  "\\Zbar": "Ƶ", // impedance (latin capital letter z with stroke)
  "\\overbar": "̅", // overbar embellishment
  "\\ovhook": "̉", // combining hook above
  "\\candra": "̐", // candrabindu (non-spacing)
  "\\oturnedcomma": "̒", // combining turned comma above
  "\\ocommatopright": "̕", // combining comma above right
  "\\droang": "̚", // left angle above (non-spacing)
  "\\wideutilde": "̰", // under tilde accent (multiple characters and non-spacing)
  "\\not": "̸", // combining long solidus overlay
  "\\upMu": "Μ", // capital mu, greek
  "\\upNu": "Ν", // capital nu, greek
  "\\upOmicron": "Ο", // capital omicron, greek
  "\\upepsilon": "ε", // rounded small epsilon, greek
  "\\upomicron": "ο", // small omicron, greek
  "\\upvarbeta": "ϐ", // rounded small beta, greek
  "\\upoldKoppa": "Ϙ", // greek letter archaic koppa
  "\\upoldkoppa": "ϙ", // greek small letter archaic koppa
  "\\upstigma": "ϛ", // greek small letter stigma
  "\\upkoppa": "ϟ", // greek small letter koppa
  "\\upsampi": "ϡ", // greek small letter sampi
  "\\tieconcat": "⁀", // character tie, z notation sequence concatenation
  "\\leftharpoonaccent": "⃐", // combining left harpoon above
  "\\rightharpoonaccent": "⃑", // combining right harpoon above
  "\\vertoverlay": "⃒", // combining long vertical line overlay
  "\\overleftarrow": "⃖", // combining left arrow above
  "\\vec": "⃗", // combining right arrow above
  "\\enclosecircle": "⃝", // combining enclosing circle
  "\\enclosesquare": "⃞", // combining enclosing square
  "\\enclosediamond": "⃟", // combining enclosing diamond
  "\\overleftrightarrow": "⃡", // combining left right arrow above
  "\\enclosetriangle": "⃤", // combining enclosing upward pointing triangle
  "\\annuity": "⃧", // combining annuity symbol
  "\\threeunderdot": "⃨", // combining triple underdot
  "\\widebridgeabove": "⃩", // combining wide bridge above
  "\\underrightharpoondown": "\u20ec", // combining rightwards harpoon with barb downwards
  "\\underleftharpoondown": "\u20ed", // combining leftwards harpoon with barb downwards
  "\\underleftarrow": "\u20ee", // combining left arrow below
  "\\underrightarrow": "\u20ef", // combining right arrow below
  "\\asteraccent": "\u20f0", // combining asterisk above
  [blackboard + "C"]: "ℂ", // /bbb c, open face c
  "\\eulermascheroni": "ℇ", // euler-mascheroni constant U+2107
  [script + "g"]: "ℊ", // /scr g, script letter g
  [script + "H"]: "ℋ", // hamiltonian (script capital h)
  [frak + "H"]: "ℌ", // /frak h, upper case h
  [blackboard + "H"]: "ℍ", // /bbb h, open face h
  "\\planck": "ℎ", // planck constant
  [script + "I"]: "ℐ", // /scr i, script letter i
  [script + "L"]: "ℒ", // lagrangian (script capital l)
  [blackboard + "N"]: "ℕ", // /bbb n, open face n
  [blackboard + "P"]: "ℙ", // /bbb p, open face p
  [blackboard + "Q"]: "ℚ", // /bbb q, open face q
  [script + "R"]: "ℛ", // /scr r, script letter r
  [blackboard + "R"]: "ℝ", // /bbb r, open face r
  [blackboard + "Z"]: "ℤ", // /bbb z, open face z
  [frak + "Z"]: "ℨ", // /frak z, upper case z
  "\\turnediota": "℩", // turned iota
  "\\Angstrom": "Å", // angstrom capital a, ring
  [script + "B"]: "ℬ", // bernoulli function (script capital b)
  [frak + "C"]: "ℭ", // black-letter capital c
  [script + "e"]: "ℯ", // /scr e, script letter e
  [script + "E"]: "ℰ", // /scr e, script letter e
  [script + "F"]: "ℱ", // /scr f, script letter f
  "\\Finv": "Ⅎ", // turned capital f
  [script + "M"]: "ℳ", // physics m-matrix (script capital m)
  [script + "o"]: "ℴ", // order of (script small o)
  [blackboard + "pi"]: "\u213c", // double-struck small pi
  [blackboard + "gamma"]: "ℽ", // double-struck small gamma
  [blackboard + "Gamma"]: "ℾ", // double-struck capital gamma
  "\\sansLturned": "⅂", // turned sans-serif capital l
  "\\sansLmirrored": "⅃", // reversed sans-serif capital l
  "\\Yup": "⅄", // turned sans-serif capital y
  [italicblackboard + "D"]: "ⅅ", // double-struck italic capital d
  [italicblackboard + "d"]: "ⅆ", // double-struck italic small d
  [italicblackboard + "e"]: "ⅇ", // double-struck italic small e
  [italicblackboard + "i"]: "ⅈ", // double-struck italic small i
  [italicblackboard + "j"]: "ⅉ", // double-struck italic small j
  "\\PropertyLine": "⅊", // property line
  "\\upand": "⅋", // turned ampersand
  "\\twoheaduparrow": "↟", // up two-headed arrow
  "\\twoheaddownarrow": "↡", // down two-headed arrow
  "\\mapsfrom": "↤", // maps to, leftward
  "\\mapsup": "↥", // maps to, upward
  "\\mapsdown": "↧", // maps to, downward
  "\\updownarrowbar": "↨", // up down arrow with base (perpendicular)
  "\\downzigzagarrow": "↯", // downwards zigzag arrow
  "\\Ldsh": "↲", // left down angled arrow
  "\\Rdsh": "↳", // right down angled arrow
  "\\linefeed": "↴", // rightwards arrow with corner downwards
  "\\carriagereturn": "↵", // downwards arrow with corner leftward = carriage return
  "\\barovernorthwestarrow": "↸", // north west arrow to long bar
  "\\barleftarrowrightarrowbar": "↹", // leftwards arrow to bar over rightwards arrow to bar
  "\\nLeftrightarrow": "⇎", // not left and right double arrows
  "\\Nwarrow": "⇖", // nw pointing double arrow
  "\\Nearrow": "⇗", // ne pointing double arrow
  "\\Searrow": "⇘", // se pointing double arrow
  "\\Swarrow": "⇙", // sw pointing double arrow
  "\\leftsquigarrow": "⇜", // leftwards squiggle arrow
  "\\rightsquigarrow": "⇝", // rightwards squiggle arrow
  "\\nHuparrow": "⇞", // upwards arrow with double stroke
  "\\nHdownarrow": "⇟", // downwards arrow with double stroke
  "\\leftdasharrow": "⇠", // leftwards dashed arrow
  "\\updasharrow": "⇡", // upwards dashed arrow
  "\\rightdasharrow": "⇢", // rightwards dashed arrow
  "\\downdasharrow": "⇣", // downwards dashed arrow
  "\\barleftarrow": "⇤", // leftwards arrow to bar
  "\\rightarrowbar": "⇥", // rightwards arrow to bar
  "\\leftwhitearrow": "⇦", // leftwards white arrow
  "\\upwhitearrow": "⇧", // upwards white arrow
  "\\rightwhitearrow": "⇨", // rightwards white arrow
  "\\downwhitearrow": "⇩", // downwards white arrow
  "\\whitearrowupfrombar": "⇪", // upwards white arrow from bar
  "\\circleonrightarrow": "⇴", // right arrow with small circle
  "\\rightthreearrows": "⇶", // three rightwards arrows
  "\\nvleftarrow": "⇷", // leftwards arrow with vertical stroke
  "\\nvrightarrow": "⇸", // rightwards arrow with vertical stroke
  "\\nvleftrightarrow": "⇹", // left right arrow with vertical stroke
  "\\nVleftarrow": "⇺", // leftwards arrow with double vertical stroke
  "\\nVrightarrow": "⇻", // rightwards arrow with double vertical stroke
  "\\nVleftrightarrow": "⇼", // left right arrow with double vertical stroke
  "\\leftrightarrowtriangle": "⇿", // left right open-headed arrow
  "\\increment": "∆", // laplacian (delta; nabla\string^2)
  "\\smallin": "∊", // set membership (small set membership)
  "\\nni": "∌", // negated contains, variant
  "\\smallni": "∍", // /ni /owns r: contains (small contains as member)
  "\\QED": "∎", // end of proof
  "\\vysmblkcircle": "∙", // bullet operator
  "\\fourthroot": "∜", // fourth root
  "\\varointclockwise": "∲", // contour integral, clockwise
  "\\ointctrclockwise": "∳", // contour integral, anticlockwise
  "\\dotsminusdots": "∺", // minus with four dots, geometric properties
  "\\sinewave": "∿", // sine wave
  "\\arceq": "≘", // arc, equals; corresponds to
  "\\veeeq": "≚", // logical or, equals
  "\\eqdef": "≝", // equals by definition
  "\\measeq": "≞", // measured by (m over equals)
  "\\Equiv": "≣", // strict equivalence (4 lines)
  "\\nasymp": "≭", // not asymptotically equal to
  "\\nlesssim": "≴", // not less, similar
  "\\ngtrsim": "≵", // not greater, similar
  "\\circledequal": "⊜", // equal in circle
  "\\prurel": "⊰", // element precedes under relation
  "\\scurel": "⊱", // succeeds under relation
  "\\barwedge": "⊼", // bar, wedge (large wedge)
  "\\barvee": "⊽", // bar, vee (large vee)
  "\\varlrtriangle": "⊿", // right triangle
  "\\equalparallel": "⋕", // parallel, equal; equal or parallel
  "\\eqless": "⋜", // equal-or-less
  "\\eqgtr": "⋝", // equal-or-greater
  "\\npreccurlyeq": "⋠", // not precedes, curly equals
  "\\nsucccurlyeq": "⋡", // not succeeds, curly equals
  "\\nsqsubseteq": "⋢", // not, square subset, equals
  "\\nsqsupseteq": "⋣", // not, square superset, equals
  "\\sqsubsetneq": "⋤", // square subset, not equals
  "\\disin": "⋲", // element of with long horizontal stroke
  "\\varisins": "⋳", // element of with vertical bar at end of horizontal stroke
  "\\isins": "⋴", // small element of with vertical bar at end of horizontal stroke
  "\\isindot": "⋵", // element of with dot above
  "\\varisinobar": "⋶", // element of with overbar
  "\\isinobar": "⋷", // small element of with overbar
  "\\isinvb": "⋸", // element of with underbar
  "\\isinE": "⋹", // element of with two horizontal strokes
  "\\nisd": "⋺", // contains with long horizontal stroke
  "\\varnis": "⋻", // contains with vertical bar at end of horizontal stroke
  "\\nis": "⋼", // small contains with vertical bar at end of horizontal stroke
  "\\varniobar": "⋽", // contains with overbar
  "\\niobar": "⋾", // small contains with overbar
  "\\bagmember": "⋿", // z notation bag membership
  "\\diameter": "⌀", // diameter sign
  "\\house": "⌂", // house
  "\\vardoublebarwedge": "⌆", // /doublebarwedge b: logical and, double bar above [perspective (double bar over small wedge)]
  "\\invnot": "⌐", // reverse not
  "\\sqlozenge": "⌑", // square lozenge
  "\\profline": "⌒", // profile of a line
  "\\profsurf": "⌓", // profile of a surface
  "\\viewdata": "⌗", // viewdata square
  "\\turnednot": "⌙", // turned not sign
  "\\varhexagonlrbonds": "⌬", // six carbon ring, corner down, double bonds lower right etc
  "\\conictaper": "⌲", // conical taper
  "\\topbot": "⌶", // top and bottom
  "\\notslash": "⌿", // solidus, bar through (apl functional symbol slash bar)
  "\\notbackslash": "⍀", // apl functional symbol backslash bar
  "\\boxupcaret": "⍓", // boxed up caret
  "\\boxquestion": "⍰", // boxed question mark
  "\\hexagon": "⎔", // horizontal benzene ring [hexagon flat open]
  "\\overbracket": "⎴", // top square bracket
  "\\underbracket": "⎵", // bottom square bracket
  "\\bbrktbrk": "⎶", // bottom square bracket over top square bracket
  "\\sqrtbottom": "⎷", // radical symbol bottom
  "\\lvboxline": "⎸", // left vertical box line
  "\\rvboxline": "⎹", // right vertical box line
  "\\varcarriagereturn": "⏎", // return symbol
  "\\trapezium": "\u23e2", // white trapezium
  "\\benzenr": "\u23e3", // benzene ring with circle
  "\\strns": "\u23e4", // straightness
  "\\fltns": "\u23e5", // flatness
  "\\accurrent": "\u23e6", // ac current
  "\\elinters": "\u23e7", // electrical intersection
  "\\blanksymbol": "␢", // blank symbol
  "\\blockuphalf": "▀", // upper half block
  "\\blocklowhalf": "▄", // lower half block
  "\\blockfull": "█", // full block
  "\\blocklefthalf": "▌", // left half block
  "\\blockrighthalf": "▐", // right half block
  "\\blockqtrshaded": "░", // 25\% shaded block
  "\\blockhalfshaded": "▒", // 50\% shaded block
  "\\blockthreeqtrshaded": "▓", // 75\% shaded block
  "\\squoval": "▢", // white square with rounded corners
  "\\blackinwhitesquare": "▣", // white square containing black small square
  "\\squarehfill": "▤", // square, horizontal rule filled
  "\\squarevfill": "▥", // square, vertical rule filled
  "\\squarehvfill": "▦", // square with orthogonal crosshatch fill
  "\\squarenwsefill": "▧", // square, nw-to-se rule filled
  "\\squareneswfill": "▨", // square, ne-to-sw rule filled
  "\\squarecrossfill": "▩", // square with diagonal crosshatch fill
  "\\smblksquare": "▪", // /blacksquare - sq bullet, filled
  "\\smwhtsquare": "▫", // white small square
  "\\hrectangleblack": "▬", // black rectangle
  "\\hrectangle": "▭", // horizontal rectangle, open
  "\\vrectangleblack": "▮", // black vertical rectangle
  "\\parallelogramblack": "▰", // black parallelogram
  "\\parallelogram": "▱", // parallelogram, open
  "\\bigblacktriangleup": "▲", //    0x25b2 6 6d      black up-pointing triangle
  "\\blacktriangleright": "▶", // (large) right triangle, filled
  "\\blackpointerright": "►", // black right-pointing pointer
  "\\whitepointerright": "▻", // white right-pointing pointer
  "\\bigblacktriangledown": "▼", // big down triangle, filled
  "\\blacktriangleleft": "◀", // (large) left triangle, filled
  "\\blackpointerleft": "◄", // black left-pointing pointer
  "\\whitepointerleft": "◅", // white left-pointing pointer
  "\\mdlgblkdiamond": "◆", // black diamond
  "\\mdlgwhtdiamond": "◇", // white diamond; diamond, open
  "\\blackinwhitediamond": "◈", // white diamond containing black small diamond
  "\\fisheye": "◉", // fisheye
  "\\dottedcircle": "◌", // dotted circle
  "\\circlevertfill": "◍", // circle with vertical fill
  "\\bullseye": "◎", // bullseye
  "\\mdlgblkcircle": "●", // circle, filled
  "\\circletophalfblack": "◓", // circle, filled top half
  "\\circleurquadblack": "◔", // circle with upper right quadrant black
  "\\blackcircleulquadwhite": "◕", // circle with all but upper left quadrant black
  "\\blacklefthalfcircle": "◖", // left half black circle
  "\\blackrighthalfcircle": "◗", // right half black circle
  "\\inversewhitecircle": "◙", // inverse white circle
  "\\invwhiteupperhalfcircle": "◚", // upper half inverse white circle
  "\\invwhitelowerhalfcircle": "◛", // lower half inverse white circle
  "\\ularc": "◜", // upper left quadrant circular arc
  "\\urarc": "◝", // upper right quadrant circular arc
  "\\lrarc": "◞", // lower right quadrant circular arc
  "\\llarc": "◟", // lower left quadrant circular arc
  "\\topsemicircle": "◠", // upper half circle
  "\\botsemicircle": "◡", // lower half circle
  "\\lrblacktriangle": "◢", // lower right triangle, filled
  "\\llblacktriangle": "◣", // lower left triangle, filled
  "\\ulblacktriangle": "◤", // upper left triangle, filled
  "\\urblacktriangle": "◥", // upper right triangle, filled
  "\\smwhtcircle": "◦", // white bullet
  "\\squareulblack": "◩", // square, filled top left corner
  "\\boxbar": "◫", // vertical bar in box
  "\\trianglecdot": "◬", // triangle with centered dot
  "\\triangleleftblack": "◭", // up-pointing triangle with left half black
  "\\trianglerightblack": "◮", // up-pointing triangle with right half black
  "\\lgwhtcircle": "◯", // large circle
  "\\squareulquad": "◰", // white square with upper left quadrant
  "\\squarellquad": "◱", // white square with lower left quadrant
  "\\squarelrquad": "◲", // white square with lower right quadrant
  "\\squareurquad": "◳", // white square with upper right quadrant
  "\\circleulquad": "◴", // white circle with upper left quadrant
  "\\circlellquad": "◵", // white circle with lower left quadrant
  "\\circlelrquad": "◶", // white circle with lower right quadrant
  "\\circleurquad": "◷", // white circle with upper right quadrant
  "\\ultriangle": "◸", // upper left triangle
  "\\urtriangle": "◹", // upper right triangle
  "\\lltriangle": "◺", // lower left triangle
  "\\mdwhtsquare": "◻", // white medium square
  "\\mdblksquare": "◼", // black medium square
  "\\mdsmwhtsquare": "◽", // white medium small square
  "\\mdsmblksquare": "◾", // black medium small square
  "\\lrtriangle": "◿", // lower right triangle
  "\\bigwhitestar": "☆", // star, open
  "\\astrosun": "☉", // sun
  "\\danger": "☡", // dangerous bend (caution sign)
  "\\blacksmiley": "☻", // black smiling face
  "\\sun": "☼", // white sun with rays
  "\\rightmoon": "☽", // first quarter moon
  "\\varspadesuit": "♤", // spade, white (card suit)
  "\\varheartsuit": "♥", // filled heart (card suit)
  "\\vardiamondsuit": "♦", // filled diamond (card suit)
  "\\varclubsuit": "♧", // club, white (card suit)
  "\\twonotes": "♫", // beamed eighth notes
  "\\acidfree": "\u267e", // permanent paper sign
  "\\dicei": "⚀", // die face-1
  "\\diceii": "⚁", // die face-2
  "\\diceiii": "⚂", // die face-3
  "\\diceiv": "⚃", // die face-4
  "\\dicev": "⚄", // die face-5
  "\\dicevi": "⚅", // die face-6
  "\\circledrightdot": "⚆", // white circle with dot right
  "\\circledtwodots": "⚇", // white circle with two dots
  "\\blackcircledrightdot": "⚈", // black circle with white dot right
  "\\blackcircledtwodots": "⚉", // black circle with two white dots
  "\\hermaphrodite": "\u26a5", // male and female sign
  "\\mdwhtcircle": "\u26aa", // medium white circle
  "\\mdblkcircle": "\u26ab", // medium black circle
  "\\mdsmwhtcircle": "\u26ac", // medium small white circle
  "\\neuter": "\u26b2", // neuter
  "\\circledstar": "✪", // circled white star
  "\\varstar": "✶", // six pointed black star
  "\\dingasterisk": "✽", // heavy teardrop-spoked asterisk
  "\\draftingarrow": "➛", // right arrow with bold head (drafting)
  "\\threedangle": "\u27c0", // three dimensional angle
  "\\whiteinwhitetriangle": "\u27c1", // white triangle containing small white triangle
  "\\perp": "\u27c2", // perpendicular
  "\\bsolhsub": "\u27c8", // reverse solidus preceding subset
  "\\suphsol": "\u27c9", // superset preceding solidus
  "\\wedgedot": "⟑", // and with dot
  "\\upin": "⟒", // element of opening upwards
  "\\bigbot": "⟘", // large up tack
  "\\bigtop": "⟙", // large down tack
  "\\UUparrow": "⟰", // upwards quadruple arrow
  "\\DDownarrow": "⟱", // downwards quadruple arrow
  "\\longmapsfrom": "⟻", // long leftwards arrow from bar
  "\\Longmapsfrom": "⟽", // long leftwards double arrow from bar
  "\\Longmapsto": "⟾", // long rightwards double arrow from bar
  "\\longrightsquigarrow": "⟿", // long rightwards squiggle arrow
  "\\nvtwoheadrightarrow": "⤀", // rightwards two-headed arrow with vertical stroke
  "\\nVtwoheadrightarrow": "⤁", // rightwards two-headed arrow with double vertical stroke
  "\\nvLeftarrow": "⤂", // leftwards double arrow with vertical stroke
  "\\nvRightarrow": "⤃", // rightwards double arrow with vertical stroke
  "\\nvLeftrightarrow": "⤄", // left right double arrow with vertical stroke
  "\\twoheadmapsto": "⤅", // rightwards two-headed arrow from bar
  "\\downarrowbarred": "⤈", // downwards arrow with horizontal stroke
  "\\uparrowbarred": "⤉", // upwards arrow with horizontal stroke
  "\\leftbkarrow": "⤌", // leftwards double dash arrow
  "\\leftdbkarrow": "⤎", // leftwards triple dash arrow
  "\\rightdotarrow": "⤑", // rightwards arrow with dotted stem
  "\\nvrightarrowtail": "⤔", // rightwards arrow with tail with vertical stroke
  "\\nVrightarrowtail": "⤕", // rightwards arrow with tail with double vertical stroke
  "\\nvtwoheadrightarrowtail": "⤗", // rightwards two-headed arrow with tail with vertical stroke
  "\\nVtwoheadrightarrowtail": "⤘", // rightwards two-headed arrow with tail with double vertical stroke
  "\\diamondleftarrow": "⤝", // leftwards arrow to black diamond
  "\\rightarrowdiamond": "⤞", // rightwards arrow to black diamond
  "\\diamondleftarrowbar": "⤟", // leftwards arrow from bar to black diamond
  "\\barrightarrowdiamond": "⤠", // rightwards arrow from bar to black diamond
  "\\rightarrowplus": "⥅", // rightwards arrow with plus below
  "\\leftarrowplus": "⥆", // leftwards arrow with plus below
  "\\leftrightarrowcircle": "⥈", // left right arrow through small circle
  "\\twoheaduparrowcircle": "⥉", // upwards two-headed arrow from small circle
  "\\leftrightharpoonupdown": "⥊", // left barb up right barb down harpoon
  "\\leftrightharpoondownup": "⥋", // left barb down right barb up harpoon
  "\\updownharpoonrightleft": "⥌", // up barb right down barb left harpoon
  "\\updownharpoonleftright": "⥍", // up barb left down barb right harpoon
  "\\leftharpoonsupdown": "⥢", // leftwards harpoon with barb up above leftwards harpoon with barb down
  "\\upharpoonsleftright": "⥣", // upwards harpoon with barb left beside upwards harpoon with barb right
  "\\rightharpoonsupdown": "⥤", // rightwards harpoon with barb up above rightwards harpoon with barb down
  "\\downharpoonsleftright": "⥥", // downwards harpoon with barb left beside downwards harpoon with barb right
  "\\leftrightharpoonsup": "⥦", // leftwards harpoon with barb up above rightwards harpoon with barb up
  "\\leftrightharpoonsdown": "⥧", // leftwards harpoon with barb down above rightwards harpoon with barb down
  "\\rightleftharpoonsup": "⥨", // rightwards harpoon with barb up above leftwards harpoon with barb up
  "\\rightleftharpoonsdown": "⥩", // rightwards harpoon with barb down above leftwards harpoon with barb down
  "\\leftharpoonupdash": "⥪", // leftwards harpoon with barb up above long dash
  "\\dashleftharpoondown": "⥫", // leftwards harpoon with barb down below long dash
  "\\rightharpoonupdash": "⥬", // rightwards harpoon with barb up above long dash
  "\\dashrightharpoondown": "⥭", // rightwards harpoon with barb down below long dash
  "\\measuredangleleft": "⦛", // measured angle opening left
  "\\rightanglemdot": "⦝", // measured right angle with dot
  "\\angles": "⦞", // angle with s inside
  "\\angdnr": "⦟", // acute angle
  "\\sphericalangleup": "⦡", // spherical angle opening up
  "\\turnangle": "⦢", // turned angle
  "\\revangle": "⦣", // reversed angle
  "\\angleubar": "⦤", // angle with underbar
  "\\revangleubar": "⦥", // reversed angle with underbar
  "\\wideangledown": "⦦", // oblique angle opening up
  "\\wideangleup": "⦧", // oblique angle opening down
  "\\measanglerutone": "⦨", // measured angle with open arm ending in arrow pointing up and right
  "\\measanglelutonw": "⦩", // measured angle with open arm ending in arrow pointing up and left
  "\\measanglerdtose": "⦪", // measured angle with open arm ending in arrow pointing down and right
  "\\measangleldtosw": "⦫", // measured angle with open arm ending in arrow pointing down and left
  "\\measangleurtone": "⦬", // measured angle with open arm ending in arrow pointing right and up
  "\\measangleultonw": "⦭", // measured angle with open arm ending in arrow pointing left and up
  "\\measangledrtose": "⦮", // measured angle with open arm ending in arrow pointing right and down
  "\\measangledltosw": "⦯", // measured angle with open arm ending in arrow pointing left and down
  "\\revemptyset": "⦰", // reversed empty set
  "\\emptysetobar": "⦱", // empty set with overbar
  "\\emptysetocirc": "⦲", // empty set with small circle above
  "\\emptysetoarr": "⦳", // empty set with right arrow above
  "\\emptysetoarrl": "⦴", // empty set with left arrow above
  "\\circledparallel": "⦷", // circled parallel
  "\\odotslashdot": "⦼", // circled anticlockwise-rotated division sign
  "\\circledwhitebullet": "⦾", // circled white bullet
  "\\circledbullet": "⦿", // circled bullet
  "\\olessthan": "⧀", // circled less-than
  "\\ogreaterthan": "⧁", // circled greater-than
  "\\lrtriangleeq": "⧡", // increases as
  "\\eparsl": "⧣", // equals sign and slanted parallel
  "\\smeparsl": "⧤", // equals sign and slanted parallel with tilde above
  "\\eqvparsl": "⧥", // identical to and slanted parallel
  "\\dsol": "⧶", // solidus with overbar
  "\\rsolbar": "⧷", // reverse solidus with horizontal stroke
  "\\doubleplus": "⧺", // double plus
  "\\tripleplus": "⧻", // triple plus
  "\\modtwosum": "⨊", // modulo two sum
  "\\sumint": "⨋", // summation with integral
  "\\cirfnint": "⨐", // circulation function
  "\\awint": "⨑", // anticlockwise integration
  "\\rppolint": "⨒", // line integration with rectangular path around pole
  "\\scpolint": "⨓", // line integration with semicircular path around pole
  "\\npolint": "⨔", // line integration not including the pole
  "\\pointint": "⨕", // integral around a point operator
  "\\ringplus": "⨢", // plus sign with small circle above
  "\\plushat": "⨣", // plus sign with circumflex accent above
  "\\simplus": "⨤", // plus sign with tilde above
  "\\plussim": "⨦", // plus sign with tilde below
  "\\plussubtwo": "⨧", // plus sign with subscript two
  "\\plustrif": "⨨", // plus sign with black triangle
  "\\commaminus": "⨩", // minus sign with comma above
  "\\minusfdots": "⨫", // minus sign with falling dots
  "\\minusrdots": "⨬", // minus sign with rising dots
  "\\opluslhrim": "⨭", // plus sign in left half circle
  "\\oplusrhrim": "⨮", // plus sign in right half circle
  "\\dottimes": "⨰", // multiplication sign with dot above
  "\\timesbar": "⨱", // multiplication sign with underbar
  "\\smashtimes": "⨳", // smash product
  "\\otimeslhrim": "⨴", // multiplication sign in left half circle
  "\\otimesrhrim": "⨵", // multiplication sign in right half circle
  "\\otimeshat": "⨶", // circled multiplication sign with circumflex accent
  "\\Otimes": "⨷", // multiplication sign in double circle
  "\\odiv": "⨸", // circled division sign
  "\\triangleplus": "⨹", // plus sign in triangle
  "\\triangleminus": "⨺", // minus sign in triangle
  "\\triangletimes": "⨻", // multiplication sign in triangle
  "\\capdot": "⩀", // intersection with dot
  "\\uminus": "⩁", // union with minus sign
  "\\barcup": "⩂", // union with overbar
  "\\barcap": "⩃", // intersection with overbar
  "\\capwedge": "⩄", // intersection with logical and
  "\\cupvee": "⩅", // union with logical or
  "\\twocups": "⩊", // union beside and joined with union
  "\\twocaps": "⩋", // intersection beside and joined with intersection
  "\\closedvarcup": "⩌", // closed union with serifs
  "\\closedvarcap": "⩍", // closed intersection with serifs
  "\\Sqcap": "⩎", // double square intersection
  "\\Sqcup": "⩏", // double square union
  "\\closedvarcupsmashprod": "⩐", // closed union with serifs and smash product
  "\\wedgeodot": "⩑", // logical and with dot above
  "\\veeodot": "⩒", // logical or with dot above
  "\\wedgeonwedge": "⩕", // two intersecting logical and
  "\\bigslopedvee": "⩗", // sloping large or
  "\\bigslopedwedge": "⩘", // sloping large and
  "\\wedgemidvert": "⩚", // logical and with middle stem
  "\\veemidvert": "⩛", // logical or with middle stem
  "\\midbarwedge": "⩜", // ogical and with horizontal dash
  "\\midbarvee": "⩝", // logical or with horizontal dash
  "\\wedgedoublebar": "⩠", // logical and with double underbar
  "\\varveebar": "⩡", // small vee with underbar
  "\\doublebarvee": "⩢", // logical or with double overbar
  "\\veedoublebar": "⩣", // logical or with double underbar
  "\\eqdot": "⩦", // equals sign with dot below
  "\\dotequiv": "⩧", // identical with dot above
  "\\dotsim": "⩪", // tilde operator with dot above
  "\\simrdots": "⩫", // tilde operator with rising dots
  "\\simminussim": "⩬", // similar minus similar
  "\\congdot": "⩭", // congruent with dot above
  "\\asteq": "⩮", // equals with asterisk
  "\\hatapprox": "⩯", // almost equal to with circumflex accent
  "\\approxeqq": "⩰", // approximately equal or equal to
  "\\eqqplus": "⩱", // equals sign above plus sign
  "\\pluseqq": "⩲", // plus sign above equals sign
  "\\eqqsim": "⩳", // equals sign above tilde operator
  "\\Coloneq": "⩴", // double colon equal
  "\\eqeqeq": "⩶", // three consecutive equals signs
  "\\equivDD": "⩸", // equivalent with four dots above
  "\\ltcir": "⩹", // less-than with circle inside
  "\\gtcir": "⩺", // greater-than with circle inside
  "\\ltquest": "⩻", // less-than with question mark above
  "\\gtquest": "⩼", // greater-than with question mark above
  "\\lesdot": "⩿", // less-than or slanted equal to with dot inside
  "\\gesdot": "⪀", // greater-than or slanted equal to with dot inside
  "\\lesdoto": "⪁", // less-than or slanted equal to with dot above
  "\\gesdoto": "⪂", // greater-than or slanted equal to with dot above
  "\\lesdotor": "⪃", // less-than or slanted equal to with dot above right
  "\\gesdotol": "⪄", // greater-than or slanted equal to with dot above left
  "\\lsime": "⪍", // less-than above similar or equal
  "\\gsime": "⪎", // greater-than above similar or equal
  "\\lsimg": "⪏", // less-than above similar above greater-than
  "\\gsiml": "⪐", // greater-than above similar above less-than
  "\\lgE": "⪑", // less-than above greater-than above double-line equal
  "\\glE": "⪒", // greater-than above less-than above double-line equal
  "\\lesges": "⪓", // less-than above slanted equal above greater-than above slanted equal
  "\\gesles": "⪔", // greater-than above slanted equal above less-than above slanted equal
  "\\elsdot": "⪗", // slanted equal to or less-than with dot inside
  "\\egsdot": "⪘", // slanted equal to or greater-than with dot inside
  "\\eqqless": "⪙", // double-line equal to or less-than
  "\\eqqgtr": "⪚", // double-line equal to or greater-than
  "\\eqqslantless": "⪛", // double-line slanted equal to or less-than
  "\\eqqslantgtr": "⪜", // double-line slanted equal to or greater-than
  "\\simless": "⪝", // similar or less-than
  "\\simgtr": "⪞", // similar or greater-than
  "\\simlE": "⪟", // similar above less-than above equals sign
  "\\simgE": "⪠", // similar above greater-than above equals sign
  "\\glj": "⪤", // greater-than overlapping less-than
  "\\gla": "⪥", // greater-than beside less-than
  "\\ltcc": "⪦", // less-than closed by curve
  "\\gtcc": "⪧", // greater-than closed by curve
  "\\lescc": "⪨", // less-than closed by curve above slanted equal
  "\\gescc": "⪩", // greater-than closed by curve above slanted equal
  "\\smt": "⪪", // smaller than
  "\\lat": "⪫", // larger than
  "\\smte": "⪬", // smaller than or equal to
  "\\late": "⪭", // larger than or equal to
  "\\precneq": "⪱", // precedes above single-line not equal to
  "\\succneq": "⪲", // succeeds above single-line not equal to
  "\\preceqq": "⪳", // precedes above equals sign
  "\\succeqq": "⪴", // succeeds above equals sign
  "\\Prec": "⪻", // double precedes
  "\\Succ": "⪼", // double succeeds
  "\\subsetdot": "⪽", // subset with dot
  "\\supsetdot": "⪾", // superset with dot
  "\\subsetplus": "⪿", // subset with plus sign below
  "\\supsetplus": "⫀", // superset with plus sign below
  "\\submult": "⫁", // subset with multiplication sign below
  "\\supmult": "⫂", // superset with multiplication sign below
  "\\subedot": "⫃", // subset of or equal to with dot above
  "\\supedot": "⫄", // superset of or equal to with dot above
  "\\subsim": "⫇", // subset of above tilde operator
  "\\supsim": "⫈", // superset of above tilde operator
  "\\subsetapprox": "⫉", // subset of above almost equal to
  "\\supsetapprox": "⫊", // superset of above almost equal to
  "\\lsqhook": "⫍", // square left open box operator
  "\\rsqhook": "⫎", // square right open box operator
  "\\csub": "⫏", // closed subset
  "\\csup": "⫐", // closed superset
  "\\csube": "⫑", // closed subset or equal to
  "\\csupe": "⫒", // closed superset or equal to
  "\\subsup": "⫓", // subset above superset
  "\\supsub": "⫔", // superset above subset
  "\\subsub": "⫕", // subset above subset
  "\\supsup": "⫖", // superset above superset
  "\\suphsub": "⫗", // superset beside subset
  "\\supdsub": "⫘", // superset beside and joined by dash with subset
  "\\forkv": "⫙", // element of opening downwards
  "\\lllnest": "⫷", // stacked very much less-than
  "\\gggnest": "⫸", // stacked very much greater-than
  "\\leqqslant": "⫹", // double-line slanted less-than or equal to
  "\\geqqslant": "⫺", // double-line slanted greater-than or equal to
  "\\squaretopblack": "\u2b12", // square with top half black
  "\\squarebotblack": "\u2b13", // square with bottom half black
  "\\squareurblack": "\u2b14", // square with upper right diagonal half black
  "\\squarellblack": "\u2b15", // square with lower left diagonal half black
  "\\diamondleftblack": "\u2b16", // diamond with left half black
  "\\diamondrightblack": "\u2b17", // diamond with right half black
  "\\diamondtopblack": "\u2b18", // diamond with top half black
  "\\diamondbotblack": "\u2b19", // diamond with bottom half black
  "\\dottedsquare": "\u2b1a", // dotted square
  "\\lgblksquare": "\u2b1b", // black large square
  "\\lgwhtsquare": "\u2b1c", // white large square
  "\\vysmblksquare": "\u2b1d", // black very small square
  "\\vysmwhtsquare": "\u2b1e", // white very small square
  "\\pentagonblack": "\u2b1f", // black pentagon
  "\\pentagon": "\u2b20", // white pentagon
  "\\varhexagon": "\u2b21", // white hexagon
  "\\varhexagonblack": "\u2b22", // black hexagon
  "\\hexagonblack": "\u2b23", // horizontal black hexagon
  "\\lgblkcircle": "\u2b24", // black large circle
  "\\mdblkdiamond": "\u2b25", // black medium diamond
  "\\mdwhtdiamond": "\u2b26", // white medium diamond
  "\\mdblklozenge": "\u2b27", // black medium lozenge
  "\\mdwhtlozenge": "\u2b28", // white medium lozenge
  "\\smblkdiamond": "\u2b29", // black small diamond
  "\\smblklozenge": "\u2b2a", // black small lozenge
  "\\smwhtlozenge": "\u2b2b", // white small lozenge
  "\\blkhorzoval": "\u2b2c", // black horizontal ellipse
  "\\whthorzoval": "\u2b2d", // white horizontal ellipse
  "\\blkvertoval": "\u2b2e", // black vertical ellipse
  "\\whtvertoval": "\u2b2f", // white vertical ellipse
  "\\circleonleftarrow": "\u2b30", // left arrow with small circle
  "\\leftthreearrows": "\u2b31", // three leftwards arrows
  "\\leftarrowonoplus": "\u2b32", // left arrow with circled plus
  "\\longleftsquigarrow": "\u2b33", // long leftwards squiggle arrow
  "\\nvtwoheadleftarrow": "\u2b34", // leftwards two-headed arrow with vertical stroke
  "\\nVtwoheadleftarrow": "\u2b35", // leftwards two-headed arrow with double vertical stroke
  "\\twoheadmapsfrom": "\u2b36", // leftwards two-headed arrow from bar
  "\\twoheadleftdbkarrow": "\u2b37", // leftwards two-headed triple-dash arrow
  "\\leftdotarrow": "\u2b38", // leftwards arrow with dotted stem
  "\\nvleftarrowtail": "\u2b39", // leftwards arrow with tail with vertical stroke
  "\\nVleftarrowtail": "\u2b3a", // leftwards arrow with tail with double vertical stroke
  "\\twoheadleftarrowtail": "\u2b3b", // leftwards two-headed arrow with tail
  "\\nvtwoheadleftarrowtail": "\u2b3c", // leftwards two-headed arrow with tail with vertical stroke
  "\\nVtwoheadleftarrowtail": "\u2b3d", // leftwards two-headed arrow with tail with double vertical stroke
  "\\leftarrowx": "\u2b3e", // leftwards arrow through x
  "\\leftcurvedarrow": "\u2b3f", // wave arrow pointing directly left
  "\\equalleftarrow": "\u2b40", // equals sign above leftwards arrow
  "\\bsimilarleftarrow": "\u2b41", // reverse tilde operator above leftwards arrow
  "\\leftarrowbackapprox": "\u2b42", // leftwards arrow above reverse almost equal to
  "\\rightarrowgtr": "\u2b43", // rightwards arrow through greater-than
  "\\rightarrowsupset": "\u2b44", // rightwards arrow through subset
  "\\LLeftarrow": "\u2b45", // leftwards quadruple arrow
  "\\RRightarrow": "\u2b46", // rightwards quadruple arrow
  "\\bsimilarrightarrow": "\u2b47", // reverse tilde operator above rightwards arrow
  "\\rightarrowbackapprox": "\u2b48", // rightwards arrow above reverse almost equal to
  "\\similarleftarrow": "\u2b49", // tilde operator above leftwards arrow
  "\\leftarrowapprox": "\u2b4a", // leftwards arrow above almost equal to
  "\\leftarrowbsimilar": "\u2b4b", // leftwards arrow above reverse tilde operator
  "\\rightarrowbsimilar": "\u2b4c", // righttwards arrow above reverse tilde operator
  "\\medwhitestar": "\u2b50", // white medium star
  "\\medblackstar": "\u2b51", // black medium star
  "\\smwhitestar": "\u2b52", // white small star
  "\\rightpentagonblack": "\u2b53", // black right-pointing pentagon
  "\\rightpentagon": "\u2b54", // white right-pointing pentagon
  "\\postalmark": "〒", // postal mark
  [bold + "A"]: "𝐀", // mathematical bold capital a
  [bold + "B"]: "𝐁", // mathematical bold capital b
  [bold + "C"]: "𝐂", // mathematical bold capital c
  [bold + "D"]: "𝐃", // mathematical bold capital d
  [bold + "E"]: "𝐄", // mathematical bold capital e
  [bold + "F"]: "𝐅", // mathematical bold capital f
  [bold + "G"]: "𝐆", // mathematical bold capital g
  [bold + "H"]: "𝐇", // mathematical bold capital h
  [bold + "I"]: "𝐈", // mathematical bold capital i
  [bold + "J"]: "𝐉", // mathematical bold capital j
  [bold + "K"]: "𝐊", // mathematical bold capital k
  [bold + "L"]: "𝐋", // mathematical bold capital l
  [bold + "M"]: "𝐌", // mathematical bold capital m
  [bold + "N"]: "𝐍", // mathematical bold capital n
  [bold + "O"]: "𝐎", // mathematical bold capital o
  [bold + "P"]: "𝐏", // mathematical bold capital p
  [bold + "Q"]: "𝐐", // mathematical bold capital q
  [bold + "R"]: "𝐑", // mathematical bold capital r
  [bold + "S"]: "𝐒", // mathematical bold capital s
  [bold + "T"]: "𝐓", // mathematical bold capital t
  [bold + "U"]: "𝐔", // mathematical bold capital u
  [bold + "V"]: "𝐕", // mathematical bold capital v
  [bold + "W"]: "𝐖", // mathematical bold capital w
  [bold + "X"]: "𝐗", // mathematical bold capital x
  [bold + "Y"]: "𝐘", // mathematical bold capital y
  [bold + "Z"]: "𝐙", // mathematical bold capital z
  [bold + "a"]: "𝐚", // mathematical bold small a
  [bold + "b"]: "𝐛", // mathematical bold small b
  [bold + "c"]: "𝐜", // mathematical bold small c
  [bold + "d"]: "𝐝", // mathematical bold small d
  [bold + "e"]: "𝐞", // mathematical bold small e
  [bold + "f"]: "𝐟", // mathematical bold small f
  [bold + "g"]: "𝐠", // mathematical bold small g
  [bold + "h"]: "𝐡", // mathematical bold small h
  [bold + "i"]: "𝐢", // mathematical bold small i
  [bold + "j"]: "𝐣", // mathematical bold small j
  [bold + "k"]: "𝐤", // mathematical bold small k
  [bold + "l"]: "𝐥", // mathematical bold small l
  [bold + "m"]: "𝐦", // mathematical bold small m
  [bold + "n"]: "𝐧", // mathematical bold small n
  [bold + "o"]: "𝐨", // mathematical bold small o
  [bold + "p"]: "𝐩", // mathematical bold small p
  [bold + "q"]: "𝐪", // mathematical bold small q
  [bold + "r"]: "𝐫", // mathematical bold small r
  [bold + "s"]: "𝐬", // mathematical bold small s
  [bold + "t"]: "𝐭", // mathematical bold small t
  [bold + "u"]: "𝐮", // mathematical bold small u
  [bold + "v"]: "𝐯", // mathematical bold small v
  [bold + "w"]: "𝐰", // mathematical bold small w
  [bold + "x"]: "𝐱", // mathematical bold small x
  [bold + "y"]: "𝐲", // mathematical bold small y
  [bold + "z"]: "𝐳", // mathematical bold small z
  [italic + "A"]: "𝐴", // mathematical italic capital a
  [italic + "B"]: "𝐵", // mathematical italic capital b
  [italic + "C"]: "𝐶", // mathematical italic capital c
  [italic + "D"]: "𝐷", // mathematical italic capital d
  [italic + "E"]: "𝐸", // mathematical italic capital e
  [italic + "F"]: "𝐹", // mathematical italic capital f
  [italic + "G"]: "𝐺", // mathematical italic capital g
  [italic + "H"]: "𝐻", // mathematical italic capital h
  [italic + "I"]: "𝐼", // mathematical italic capital i
  [italic + "J"]: "𝐽", // mathematical italic capital j
  [italic + "K"]: "𝐾", // mathematical italic capital k
  [italic + "L"]: "𝐿", // mathematical italic capital l
  [italic + "M"]: "𝑀", // mathematical italic capital m
  [italic + "N"]: "𝑁", // mathematical italic capital n
  [italic + "O"]: "𝑂", // mathematical italic capital o
  [italic + "P"]: "𝑃", // mathematical italic capital p
  [italic + "Q"]: "𝑄", // mathematical italic capital q
  [italic + "R"]: "𝑅", // mathematical italic capital r
  [italic + "S"]: "𝑆", // mathematical italic capital s
  [italic + "T"]: "𝑇", // mathematical italic capital t
  [italic + "U"]: "𝑈", // mathematical italic capital u
  [italic + "V"]: "𝑉", // mathematical italic capital v
  [italic + "W"]: "𝑊", // mathematical italic capital w
  [italic + "X"]: "𝑋", // mathematical italic capital x
  [italic + "Y"]: "𝑌", // mathematical italic capital y
  [italic + "Z"]: "𝑍", // mathematical italic capital z
  [italic + "a"]: "𝑎", // mathematical italic small a
  [italic + "b"]: "𝑏", // mathematical italic small b
  [italic + "c"]: "𝑐", // mathematical italic small c
  [italic + "d"]: "𝑑", // mathematical italic small d
  [italic + "e"]: "𝑒", // mathematical italic small e
  [italic + "f"]: "𝑓", // mathematical italic small f
  [italic + "g"]: "𝑔", // mathematical italic small g
  [italic + "h"]: "ℎ", // mathematical italic small h (planck constant)
  [italic + "i"]: "𝑖", // mathematical italic small i
  [italic + "j"]: "𝑗", // mathematical italic small j
  [italic + "k"]: "𝑘", // mathematical italic small k
  [italic + "l"]: "𝑙", // mathematical italic small l
  [italic + "m"]: "𝑚", // mathematical italic small m
  [italic + "n"]: "𝑛", // mathematical italic small n
  [italic + "o"]: "𝑜", // mathematical italic small o
  [italic + "p"]: "𝑝", // mathematical italic small p
  [italic + "q"]: "𝑞", // mathematical italic small q
  [italic + "r"]: "𝑟", // mathematical italic small r
  [italic + "s"]: "𝑠", // mathematical italic small s
  [italic + "t"]: "𝑡", // mathematical italic small t
  [italic + "u"]: "𝑢", // mathematical italic small u
  [italic + "v"]: "𝑣", // mathematical italic small v
  [italic + "w"]: "𝑤", // mathematical italic small w
  [italic + "x"]: "𝑥", // mathematical italic small x
  [italic + "y"]: "𝑦", // mathematical italic small y
  [italic + "z"]: "𝑧", // mathematical italic small z
  [bolditalic + "A"]: "𝑨", // mathematical bold italic capital a
  [bolditalic + "B"]: "𝑩", // mathematical bold italic capital b
  [bolditalic + "C"]: "𝑪", // mathematical bold italic capital c
  [bolditalic + "D"]: "𝑫", // mathematical bold italic capital d
  [bolditalic + "E"]: "𝑬", // mathematical bold italic capital e
  [bolditalic + "F"]: "𝑭", // mathematical bold italic capital f
  [bolditalic + "G"]: "𝑮", // mathematical bold italic capital g
  [bolditalic + "H"]: "𝑯", // mathematical bold italic capital h
  [bolditalic + "I"]: "𝑰", // mathematical bold italic capital i
  [bolditalic + "J"]: "𝑱", // mathematical bold italic capital j
  [bolditalic + "K"]: "𝑲", // mathematical bold italic capital k
  [bolditalic + "L"]: "𝑳", // mathematical bold italic capital l
  [bolditalic + "M"]: "𝑴", // mathematical bold italic capital m
  [bolditalic + "N"]: "𝑵", // mathematical bold italic capital n
  [bolditalic + "O"]: "𝑶", // mathematical bold italic capital o
  [bolditalic + "P"]: "𝑷", // mathematical bold italic capital p
  [bolditalic + "Q"]: "𝑸", // mathematical bold italic capital q
  [bolditalic + "R"]: "𝑹", // mathematical bold italic capital r
  [bolditalic + "S"]: "𝑺", // mathematical bold italic capital s
  [bolditalic + "T"]: "𝑻", // mathematical bold italic capital t
  [bolditalic + "U"]: "𝑼", // mathematical bold italic capital u
  [bolditalic + "V"]: "𝑽", // mathematical bold italic capital v
  [bolditalic + "W"]: "𝑾", // mathematical bold italic capital w
  [bolditalic + "X"]: "𝑿", // mathematical bold italic capital x
  [bolditalic + "Y"]: "𝒀", // mathematical bold italic capital y
  [bolditalic + "Z"]: "𝒁", // mathematical bold italic capital z
  [bolditalic + "a"]: "𝒂", // mathematical bold italic small a
  [bolditalic + "b"]: "𝒃", // mathematical bold italic small b
  [bolditalic + "c"]: "𝒄", // mathematical bold italic small c
  [bolditalic + "d"]: "𝒅", // mathematical bold italic small d
  [bolditalic + "e"]: "𝒆", // mathematical bold italic small e
  [bolditalic + "f"]: "𝒇", // mathematical bold italic small f
  [bolditalic + "g"]: "𝒈", // mathematical bold italic small g
  [bolditalic + "h"]: "𝒉", // mathematical bold italic small h
  [bolditalic + "i"]: "𝒊", // mathematical bold italic small i
  [bolditalic + "j"]: "𝒋", // mathematical bold italic small j
  [bolditalic + "k"]: "𝒌", // mathematical bold italic small k
  [bolditalic + "l"]: "𝒍", // mathematical bold italic small l
  [bolditalic + "m"]: "𝒎", // mathematical bold italic small m
  [bolditalic + "n"]: "𝒏", // mathematical bold italic small n
  [bolditalic + "o"]: "𝒐", // mathematical bold italic small o
  [bolditalic + "p"]: "𝒑", // mathematical bold italic small p
  [bolditalic + "q"]: "𝒒", // mathematical bold italic small q
  [bolditalic + "r"]: "𝒓", // mathematical bold italic small r
  [bolditalic + "s"]: "𝒔", // mathematical bold italic small s
  [bolditalic + "t"]: "𝒕", // mathematical bold italic small t
  [bolditalic + "u"]: "𝒖", // mathematical bold italic small u
  [bolditalic + "v"]: "𝒗", // mathematical bold italic small v
  [bolditalic + "w"]: "𝒘", // mathematical bold italic small w
  [bolditalic + "x"]: "𝒙", // mathematical bold italic small x
  [bolditalic + "y"]: "𝒚", // mathematical bold italic small y
  [bolditalic + "z"]: "𝒛", // mathematical bold italic small z
  [script + "A"]: "𝒜", // mathematical script capital a
  [script + "C"]: "𝒞", // mathematical script capital c
  [script + "D"]: "𝒟", // mathematical script capital d
  [script + "G"]: "𝒢", // mathematical script capital g
  [script + "J"]: "𝒥", // mathematical script capital j
  [script + "K"]: "𝒦", // mathematical script capital k
  [script + "N"]: "𝒩", // mathematical script capital n
  [script + "O"]: "𝒪", // mathematical script capital o
  [script + "P"]: "𝒫", // mathematical script capital p
  [script + "Q"]: "𝒬", // mathematical script capital q
  [script + "S"]: "𝒮", // mathematical script capital s
  [script + "T"]: "𝒯", // mathematical script capital t
  [script + "U"]: "𝒰", // mathematical script capital u
  [script + "V"]: "𝒱", // mathematical script capital v
  [script + "W"]: "𝒲", // mathematical script capital w
  [script + "X"]: "𝒳", // mathematical script capital x
  [script + "Y"]: "𝒴", // mathematical script capital y
  [script + "Z"]: "𝒵", // mathematical script capital z
  [script + "a"]: "𝒶", // mathematical script small a
  [script + "b"]: "𝒷", // mathematical script small b
  [script + "c"]: "𝒸", // mathematical script small c
  [script + "d"]: "𝒹", // mathematical script small d
  [script + "f"]: "𝒻", // mathematical script small f
  [script + "h"]: "𝒽", // mathematical script small h
  [script + "i"]: "𝒾", // mathematical script small i
  [script + "j"]: "𝒿", // mathematical script small j
  [script + "k"]: "𝓀", // mathematical script small k
  [script + "l"]: "U1d4c1", // mathematical script small l
  [script + "m"]: "𝓂", // mathematical script small m
  [script + "n"]: "𝓃", // mathematical script small n
  [script + "p"]: "𝓅", // mathematical script small p
  [script + "q"]: "𝓆", // mathematical script small q
  [script + "r"]: "𝓇", // mathematical script small r
  [script + "s"]: "𝓈", // mathematical script small s
  [script + "t"]: "𝓉", // mathematical script small t
  [script + "u"]: "𝓊", // mathematical script small u
  [script + "v"]: "𝓋", // mathematical script small v
  [script + "w"]: "𝓌", // mathematical script small w
  [script + "x"]: "𝓍", // mathematical script small x
  [script + "y"]: "𝓎", // mathematical script small y
  [script + "z"]: "𝓏", // mathematical script small z
  [boldscript + "A"]: "𝓐", // mathematical bold script capital a
  [boldscript + "B"]: "𝓑", // mathematical bold script capital b
  [boldscript + "C"]: "𝓒", // mathematical bold script capital c
  [boldscript + "D"]: "𝓓", // mathematical bold script capital d
  [boldscript + "E"]: "𝓔", // mathematical bold script capital e
  [boldscript + "F"]: "𝓕", // mathematical bold script capital f
  [boldscript + "G"]: "𝓖", // mathematical bold script capital g
  [boldscript + "H"]: "𝓗", // mathematical bold script capital h
  [boldscript + "I"]: "𝓘", // mathematical bold script capital i
  [boldscript + "J"]: "𝓙", // mathematical bold script capital j
  [boldscript + "K"]: "𝓚", // mathematical bold script capital k
  [boldscript + "L"]: "𝓛", // mathematical bold script capital l
  [boldscript + "M"]: "𝓜", // mathematical bold script capital m
  [boldscript + "N"]: "𝓝", // mathematical bold script capital n
  [boldscript + "O"]: "𝓞", // mathematical bold script capital o
  [boldscript + "P"]: "𝓟", // mathematical bold script capital p
  [boldscript + "Q"]: "𝓠", // mathematical bold script capital q
  [boldscript + "R"]: "𝓡", // mathematical bold script capital r
  [boldscript + "S"]: "𝓢", // mathematical bold script capital s
  [boldscript + "T"]: "𝓣", // mathematical bold script capital t
  [boldscript + "U"]: "𝓤", // mathematical bold script capital u
  [boldscript + "V"]: "𝓥", // mathematical bold script capital v
  [boldscript + "W"]: "𝓦", // mathematical bold script capital w
  [boldscript + "X"]: "𝓧", // mathematical bold script capital x
  [boldscript + "Y"]: "𝓨", // mathematical bold script capital y
  [boldscript + "Z"]: "𝓩", // mathematical bold script capital z
  [boldscript + "a"]: "𝓪", // mathematical bold script small a
  [boldscript + "b"]: "𝓫", // mathematical bold script small b
  [boldscript + "c"]: "𝓬", // mathematical bold script small c
  [boldscript + "d"]: "𝓭", // mathematical bold script small d
  [boldscript + "e"]: "𝓮", // mathematical bold script small e
  [boldscript + "f"]: "𝓯", // mathematical bold script small f
  [boldscript + "g"]: "𝓰", // mathematical bold script small g
  [boldscript + "h"]: "𝓱", // mathematical bold script small h
  [boldscript + "i"]: "𝓲", // mathematical bold script small i
  [boldscript + "j"]: "𝓳", // mathematical bold script small j
  [boldscript + "k"]: "𝓴", // mathematical bold script small k
  [boldscript + "l"]: "𝓵", // mathematical bold script small l
  [boldscript + "m"]: "𝓶", // mathematical bold script small m
  [boldscript + "n"]: "𝓷", // mathematical bold script small n
  [boldscript + "o"]: "𝓸", // mathematical bold script small o
  [boldscript + "p"]: "𝓹", // mathematical bold script small p
  [boldscript + "q"]: "𝓺", // mathematical bold script small q
  [boldscript + "r"]: "𝓻", // mathematical bold script small r
  [boldscript + "s"]: "𝓼", // mathematical bold script small s
  [boldscript + "t"]: "𝓽", // mathematical bold script small t
  [boldscript + "u"]: "𝓾", // mathematical bold script small u
  [boldscript + "v"]: "𝓿", // mathematical bold script small v
  [boldscript + "w"]: "𝔀", // mathematical bold script small w
  [boldscript + "x"]: "𝔁", // mathematical bold script small x
  [boldscript + "y"]: "𝔂", // mathematical bold script small y
  [boldscript + "z"]: "𝔃", // mathematical bold script small z
  [frak + "A"]: "𝔄", // mathematical fraktur capital a
  [frak + "B"]: "𝔅", // mathematical fraktur capital b
  [frak + "D"]: "𝔇", // mathematical fraktur capital d
  [frak + "E"]: "𝔈", // mathematical fraktur capital e
  [frak + "F"]: "𝔉", // mathematical fraktur capital f
  [frak + "G"]: "𝔊", // mathematical fraktur capital g
  [frak + "J"]: "𝔍", // mathematical fraktur capital j
  [frak + "K"]: "𝔎", // mathematical fraktur capital k
  [frak + "L"]: "𝔏", // mathematical fraktur capital l
  [frak + "M"]: "𝔐", // mathematical fraktur capital m
  [frak + "N"]: "𝔑", // mathematical fraktur capital n
  [frak + "O"]: "𝔒", // mathematical fraktur capital o
  [frak + "P"]: "𝔓", // mathematical fraktur capital p
  [frak + "Q"]: "𝔔", // mathematical fraktur capital q
  [frak + "S"]: "𝔖", // mathematical fraktur capital s
  [frak + "T"]: "𝔗", // mathematical fraktur capital t
  [frak + "U"]: "𝔘", // mathematical fraktur capital u
  [frak + "V"]: "𝔙", // mathematical fraktur capital v
  [frak + "W"]: "𝔚", // mathematical fraktur capital w
  [frak + "X"]: "𝔛", // mathematical fraktur capital x
  [frak + "Y"]: "𝔜", // mathematical fraktur capital y
  [frak + "a"]: "𝔞", // mathematical fraktur small a
  [frak + "b"]: "𝔟", // mathematical fraktur small b
  [frak + "c"]: "𝔠", // mathematical fraktur small c
  [frak + "d"]: "𝔡", // mathematical fraktur small d
  [frak + "e"]: "𝔢", // mathematical fraktur small e
  [frak + "f"]: "𝔣", // mathematical fraktur small f
  [frak + "g"]: "𝔤", // mathematical fraktur small g
  [frak + "h"]: "𝔥", // mathematical fraktur small h
  [frak + "i"]: "𝔦", // mathematical fraktur small i
  [frak + "j"]: "𝔧", // mathematical fraktur small j
  [frak + "k"]: "𝔨", // mathematical fraktur small k
  [frak + "l"]: "𝔩", // mathematical fraktur small l
  [frak + "m"]: "𝔪", // mathematical fraktur small m
  [frak + "n"]: "𝔫", // mathematical fraktur small n
  [frak + "o"]: "𝔬", // mathematical fraktur small o
  [frak + "p"]: "𝔭", // mathematical fraktur small p
  [frak + "q"]: "𝔮", // mathematical fraktur small q
  [frak + "r"]: "𝔯", // mathematical fraktur small r
  [frak + "s"]: "𝔰", // mathematical fraktur small s
  [frak + "t"]: "𝔱", // mathematical fraktur small t
  [frak + "u"]: "𝔲", // mathematical fraktur small u
  [frak + "v"]: "𝔳", // mathematical fraktur small v
  [frak + "w"]: "𝔴", // mathematical fraktur small w
  [frak + "x"]: "𝔵", // mathematical fraktur small x
  [frak + "y"]: "𝔶", // mathematical fraktur small y
  [frak + "z"]: "𝔷", // mathematical fraktur small z
  [blackboard + "A"]: "𝔸", // mathematical double-struck capital a
  [blackboard + "B"]: "𝔹", // mathematical double-struck capital b
  [blackboard + "D"]: "𝔻", // mathematical double-struck capital d
  [blackboard + "E"]: "𝔼", // mathematical double-struck capital e
  [blackboard + "F"]: "𝔽", // mathematical double-struck capital f
  [blackboard + "G"]: "𝔾", // mathematical double-struck capital g
  [blackboard + "I"]: "𝕀", // mathematical double-struck capital i
  [blackboard + "J"]: "𝕁", // mathematical double-struck capital j
  [blackboard + "K"]: "𝕂", // mathematical double-struck capital k
  [blackboard + "L"]: "𝕃", // mathematical double-struck capital l
  [blackboard + "M"]: "𝕄", // mathematical double-struck capital m
  [blackboard + "O"]: "𝕆", // mathematical double-struck capital o
  [blackboard + "S"]: "𝕊", // mathematical double-struck capital s
  [blackboard + "T"]: "𝕋", // mathematical double-struck capital t
  [blackboard + "U"]: "𝕌", // mathematical double-struck capital u
  [blackboard + "V"]: "𝕍", // mathematical double-struck capital v
  [blackboard + "W"]: "𝕎", // mathematical double-struck capital w
  [blackboard + "X"]: "𝕏", // mathematical double-struck capital x
  [blackboard + "Y"]: "𝕐", // mathematical double-struck capital y
  [blackboard + "a"]: "𝕒", // mathematical double-struck small a
  [blackboard + "b"]: "𝕓", // mathematical double-struck small b
  [blackboard + "c"]: "𝕔", // mathematical double-struck small c
  [blackboard + "d"]: "𝕕", // mathematical double-struck small d
  [blackboard + "e"]: "𝕖", // mathematical double-struck small e
  [blackboard + "f"]: "𝕗", // mathematical double-struck small f
  [blackboard + "g"]: "𝕘", // mathematical double-struck small g
  [blackboard + "h"]: "𝕙", // mathematical double-struck small h
  [blackboard + "i"]: "𝕚", // mathematical double-struck small i
  [blackboard + "j"]: "𝕛", // mathematical double-struck small j
  [blackboard + "k"]: "𝕜", // mathematical double-struck small k
  [blackboard + "l"]: "𝕝", // mathematical double-struck small l
  [blackboard + "m"]: "𝕞", // mathematical double-struck small m
  [blackboard + "n"]: "𝕟", // mathematical double-struck small n
  [blackboard + "o"]: "𝕠", // mathematical double-struck small o
  [blackboard + "p"]: "𝕡", // mathematical double-struck small p
  [blackboard + "q"]: "𝕢", // mathematical double-struck small q
  [blackboard + "r"]: "𝕣", // mathematical double-struck small r
  [blackboard + "s"]: "𝕤", // mathematical double-struck small s
  [blackboard + "t"]: "𝕥", // mathematical double-struck small t
  [blackboard + "u"]: "𝕦", // mathematical double-struck small u
  [blackboard + "v"]: "𝕧", // mathematical double-struck small v
  [blackboard + "w"]: "𝕨", // mathematical double-struck small w
  [blackboard + "x"]: "𝕩", // mathematical double-struck small x
  [blackboard + "y"]: "𝕪", // mathematical double-struck small y
  [blackboard + "z"]: "𝕫", // mathematical double-struck small z
  [boldfrak + "A"]: "𝕬", // mathematical bold fraktur capital a
  [boldfrak + "B"]: "𝕭", // mathematical bold fraktur capital b
  [boldfrak + "C"]: "𝕮", // mathematical bold fraktur capital c
  [boldfrak + "D"]: "𝕯", // mathematical bold fraktur capital d
  [boldfrak + "E"]: "𝕰", // mathematical bold fraktur capital e
  [boldfrak + "F"]: "𝕱", // mathematical bold fraktur capital f
  [boldfrak + "G"]: "𝕲", // mathematical bold fraktur capital g
  [boldfrak + "H"]: "𝕳", // mathematical bold fraktur capital h
  [boldfrak + "I"]: "𝕴", // mathematical bold fraktur capital i
  [boldfrak + "J"]: "𝕵", // mathematical bold fraktur capital j
  [boldfrak + "K"]: "𝕶", // mathematical bold fraktur capital k
  [boldfrak + "L"]: "𝕷", // mathematical bold fraktur capital l
  [boldfrak + "M"]: "𝕸", // mathematical bold fraktur capital m
  [boldfrak + "N"]: "𝕹", // mathematical bold fraktur capital n
  [boldfrak + "O"]: "𝕺", // mathematical bold fraktur capital o
  [boldfrak + "P"]: "𝕻", // mathematical bold fraktur capital p
  [boldfrak + "Q"]: "𝕼", // mathematical bold fraktur capital q
  [boldfrak + "R"]: "𝕽", // mathematical bold fraktur capital r
  [boldfrak + "S"]: "𝕾", // mathematical bold fraktur capital s
  [boldfrak + "T"]: "𝕿", // mathematical bold fraktur capital t
  [boldfrak + "U"]: "𝖀", // mathematical bold fraktur capital u
  [boldfrak + "V"]: "𝖁", // mathematical bold fraktur capital v
  [boldfrak + "W"]: "𝖂", // mathematical bold fraktur capital w
  [boldfrak + "X"]: "𝖃", // mathematical bold fraktur capital x
  [boldfrak + "Y"]: "𝖄", // mathematical bold fraktur capital y
  [boldfrak + "Z"]: "𝖅", // mathematical bold fraktur capital z
  [boldfrak + "a"]: "𝖆", // mathematical bold fraktur small a
  [boldfrak + "b"]: "𝖇", // mathematical bold fraktur small b
  [boldfrak + "c"]: "𝖈", // mathematical bold fraktur small c
  [boldfrak + "d"]: "𝖉", // mathematical bold fraktur small d
  [boldfrak + "e"]: "𝖊", // mathematical bold fraktur small e
  [boldfrak + "f"]: "𝖋", // mathematical bold fraktur small f
  [boldfrak + "g"]: "𝖌", // mathematical bold fraktur small g
  [boldfrak + "h"]: "𝖍", // mathematical bold fraktur small h
  [boldfrak + "i"]: "𝖎", // mathematical bold fraktur small i
  [boldfrak + "j"]: "𝖏", // mathematical bold fraktur small j
  [boldfrak + "k"]: "𝖐", // mathematical bold fraktur small k
  [boldfrak + "l"]: "𝖑", // mathematical bold fraktur small l
  [boldfrak + "m"]: "𝖒", // mathematical bold fraktur small m
  [boldfrak + "n"]: "𝖓", // mathematical bold fraktur small n
  [boldfrak + "o"]: "𝖔", // mathematical bold fraktur small o
  [boldfrak + "p"]: "𝖕", // mathematical bold fraktur small p
  [boldfrak + "q"]: "𝖖", // mathematical bold fraktur small q
  [boldfrak + "r"]: "𝖗", // mathematical bold fraktur small r
  [boldfrak + "s"]: "𝖘", // mathematical bold fraktur small s
  [boldfrak + "t"]: "𝖙", // mathematical bold fraktur small t
  [boldfrak + "u"]: "𝖚", // mathematical bold fraktur small u
  [boldfrak + "v"]: "𝖛", // mathematical bold fraktur small v
  [boldfrak + "w"]: "𝖜", // mathematical bold fraktur small w
  [boldfrak + "x"]: "𝖝", // mathematical bold fraktur small x
  [boldfrak + "y"]: "𝖞", // mathematical bold fraktur small y
  [boldfrak + "z"]: "𝖟", // mathematical bold fraktur small z
  [sans + "A"]: "𝖠", // mathematical sans-serif capital a
  [sans + "B"]: "𝖡", // mathematical sans-serif capital b
  [sans + "C"]: "𝖢", // mathematical sans-serif capital c
  [sans + "D"]: "𝖣", // mathematical sans-serif capital d
  [sans + "E"]: "𝖤", // mathematical sans-serif capital e
  [sans + "F"]: "𝖥", // mathematical sans-serif capital f
  [sans + "G"]: "𝖦", // mathematical sans-serif capital g
  [sans + "H"]: "𝖧", // mathematical sans-serif capital h
  [sans + "I"]: "𝖨", // mathematical sans-serif capital i
  [sans + "J"]: "𝖩", // mathematical sans-serif capital j
  [sans + "K"]: "𝖪", // mathematical sans-serif capital k
  [sans + "L"]: "𝖫", // mathematical sans-serif capital l
  [sans + "M"]: "𝖬", // mathematical sans-serif capital m
  [sans + "N"]: "𝖭", // mathematical sans-serif capital n
  [sans + "O"]: "𝖮", // mathematical sans-serif capital o
  [sans + "P"]: "𝖯", // mathematical sans-serif capital p
  [sans + "Q"]: "𝖰", // mathematical sans-serif capital q
  [sans + "R"]: "𝖱", // mathematical sans-serif capital r
  [sans + "S"]: "𝖲", // mathematical sans-serif capital s
  [sans + "T"]: "𝖳", // mathematical sans-serif capital t
  [sans + "U"]: "𝖴", // mathematical sans-serif capital u
  [sans + "V"]: "𝖵", // mathematical sans-serif capital v
  [sans + "W"]: "𝖶", // mathematical sans-serif capital w
  [sans + "X"]: "𝖷", // mathematical sans-serif capital x
  [sans + "Y"]: "𝖸", // mathematical sans-serif capital y
  [sans + "Z"]: "𝖹", // mathematical sans-serif capital z
  [sans + "a"]: "𝖺", // mathematical sans-serif small a
  [sans + "b"]: "𝖻", // mathematical sans-serif small b
  [sans + "c"]: "𝖼", // mathematical sans-serif small c
  [sans + "d"]: "𝖽", // mathematical sans-serif small d
  [sans + "e"]: "𝖾", // mathematical sans-serif small e
  [sans + "f"]: "𝖿", // mathematical sans-serif small f
  [sans + "g"]: "𝗀", // mathematical sans-serif small g
  [sans + "h"]: "𝗁", // mathematical sans-serif small h
  [sans + "i"]: "𝗂", // mathematical sans-serif small i
  [sans + "j"]: "𝗃", // mathematical sans-serif small j
  [sans + "k"]: "𝗄", // mathematical sans-serif small k
  [sans + "l"]: "𝗅", // mathematical sans-serif small l
  [sans + "m"]: "𝗆", // mathematical sans-serif small m
  [sans + "n"]: "𝗇", // mathematical sans-serif small n
  [sans + "o"]: "𝗈", // mathematical sans-serif small o
  [sans + "p"]: "𝗉", // mathematical sans-serif small p
  [sans + "q"]: "𝗊", // mathematical sans-serif small q
  [sans + "r"]: "𝗋", // mathematical sans-serif small r
  [sans + "s"]: "𝗌", // mathematical sans-serif small s
  [sans + "t"]: "𝗍", // mathematical sans-serif small t
  [sans + "u"]: "𝗎", // mathematical sans-serif small u
  [sans + "v"]: "𝗏", // mathematical sans-serif small v
  [sans + "w"]: "𝗐", // mathematical sans-serif small w
  [sans + "x"]: "𝗑", // mathematical sans-serif small x
  [sans + "y"]: "𝗒", // mathematical sans-serif small y
  [sans + "z"]: "𝗓", // mathematical sans-serif small z
  [boldsans + "A"]: "𝗔", // mathematical sans-serif bold capital a
  [boldsans + "B"]: "𝗕", // mathematical sans-serif bold capital b
  [boldsans + "C"]: "𝗖", // mathematical sans-serif bold capital c
  [boldsans + "D"]: "𝗗", // mathematical sans-serif bold capital d
  [boldsans + "E"]: "𝗘", // mathematical sans-serif bold capital e
  [boldsans + "F"]: "𝗙", // mathematical sans-serif bold capital f
  [boldsans + "G"]: "𝗚", // mathematical sans-serif bold capital g
  [boldsans + "H"]: "𝗛", // mathematical sans-serif bold capital h
  [boldsans + "I"]: "𝗜", // mathematical sans-serif bold capital i
  [boldsans + "J"]: "𝗝", // mathematical sans-serif bold capital j
  [boldsans + "K"]: "𝗞", // mathematical sans-serif bold capital k
  [boldsans + "L"]: "𝗟", // mathematical sans-serif bold capital l
  [boldsans + "M"]: "𝗠", // mathematical sans-serif bold capital m
  [boldsans + "N"]: "𝗡", // mathematical sans-serif bold capital n
  [boldsans + "O"]: "𝗢", // mathematical sans-serif bold capital o
  [boldsans + "P"]: "𝗣", // mathematical sans-serif bold capital p
  [boldsans + "Q"]: "𝗤", // mathematical sans-serif bold capital q
  [boldsans + "R"]: "𝗥", // mathematical sans-serif bold capital r
  [boldsans + "S"]: "𝗦", // mathematical sans-serif bold capital s
  [boldsans + "T"]: "𝗧", // mathematical sans-serif bold capital t
  [boldsans + "U"]: "𝗨", // mathematical sans-serif bold capital u
  [boldsans + "V"]: "𝗩", // mathematical sans-serif bold capital v
  [boldsans + "W"]: "𝗪", // mathematical sans-serif bold capital w
  [boldsans + "X"]: "𝗫", // mathematical sans-serif bold capital x
  [boldsans + "Y"]: "𝗬", // mathematical sans-serif bold capital y
  [boldsans + "Z"]: "𝗭", // mathematical sans-serif bold capital z
  [boldsans + "a"]: "𝗮", // mathematical sans-serif bold small a
  [boldsans + "b"]: "𝗯", // mathematical sans-serif bold small b
  [boldsans + "c"]: "𝗰", // mathematical sans-serif bold small c
  [boldsans + "d"]: "𝗱", // mathematical sans-serif bold small d
  [boldsans + "e"]: "𝗲", // mathematical sans-serif bold small e
  [boldsans + "f"]: "𝗳", // mathematical sans-serif bold small f
  [boldsans + "g"]: "𝗴", // mathematical sans-serif bold small g
  [boldsans + "h"]: "𝗵", // mathematical sans-serif bold small h
  [boldsans + "i"]: "𝗶", // mathematical sans-serif bold small i
  [boldsans + "j"]: "𝗷", // mathematical sans-serif bold small j
  [boldsans + "k"]: "𝗸", // mathematical sans-serif bold small k
  [boldsans + "l"]: "𝗹", // mathematical sans-serif bold small l
  [boldsans + "m"]: "𝗺", // mathematical sans-serif bold small m
  [boldsans + "n"]: "𝗻", // mathematical sans-serif bold small n
  [boldsans + "o"]: "𝗼", // mathematical sans-serif bold small o
  [boldsans + "p"]: "𝗽", // mathematical sans-serif bold small p
  [boldsans + "q"]: "𝗾", // mathematical sans-serif bold small q
  [boldsans + "r"]: "𝗿", // mathematical sans-serif bold small r
  [boldsans + "s"]: "𝘀", // mathematical sans-serif bold small s
  [boldsans + "t"]: "𝘁", // mathematical sans-serif bold small t
  [boldsans + "u"]: "𝘂", // mathematical sans-serif bold small u
  [boldsans + "v"]: "𝘃", // mathematical sans-serif bold small v
  [boldsans + "w"]: "𝘄", // mathematical sans-serif bold small w
  [boldsans + "x"]: "𝘅", // mathematical sans-serif bold small x
  [boldsans + "y"]: "𝘆", // mathematical sans-serif bold small y
  [boldsans + "z"]: "𝘇", // mathematical sans-serif bold small z
  [italicsans + "A"]: "𝘈", // mathematical sans-serif italic capital a
  [italicsans + "B"]: "𝘉", // mathematical sans-serif italic capital b
  [italicsans + "C"]: "𝘊", // mathematical sans-serif italic capital c
  [italicsans + "D"]: "𝘋", // mathematical sans-serif italic capital d
  [italicsans + "E"]: "𝘌", // mathematical sans-serif italic capital e
  [italicsans + "F"]: "𝘍", // mathematical sans-serif italic capital f
  [italicsans + "G"]: "𝘎", // mathematical sans-serif italic capital g
  [italicsans + "H"]: "𝘏", // mathematical sans-serif italic capital h
  [italicsans + "I"]: "𝘐", // mathematical sans-serif italic capital i
  [italicsans + "J"]: "𝘑", // mathematical sans-serif italic capital j
  [italicsans + "K"]: "𝘒", // mathematical sans-serif italic capital k
  [italicsans + "L"]: "𝘓", // mathematical sans-serif italic capital l
  [italicsans + "M"]: "𝘔", // mathematical sans-serif italic capital m
  [italicsans + "N"]: "𝘕", // mathematical sans-serif italic capital n
  [italicsans + "O"]: "𝘖", // mathematical sans-serif italic capital o
  [italicsans + "P"]: "𝘗", // mathematical sans-serif italic capital p
  [italicsans + "Q"]: "𝘘", // mathematical sans-serif italic capital q
  [italicsans + "R"]: "𝘙", // mathematical sans-serif italic capital r
  [italicsans + "S"]: "𝘚", // mathematical sans-serif italic capital s
  [italicsans + "T"]: "𝘛", // mathematical sans-serif italic capital t
  [italicsans + "U"]: "𝘜", // mathematical sans-serif italic capital u
  [italicsans + "V"]: "𝘝", // mathematical sans-serif italic capital v
  [italicsans + "W"]: "𝘞", // mathematical sans-serif italic capital w
  [italicsans + "X"]: "𝘟", // mathematical sans-serif italic capital x
  [italicsans + "Y"]: "𝘠", // mathematical sans-serif italic capital y
  [italicsans + "Z"]: "𝘡", // mathematical sans-serif italic capital z
  [italicsans + "a"]: "𝘢", // mathematical sans-serif italic small a
  [italicsans + "b"]: "𝘣", // mathematical sans-serif italic small b
  [italicsans + "c"]: "𝘤", // mathematical sans-serif italic small c
  [italicsans + "d"]: "𝘥", // mathematical sans-serif italic small d
  [italicsans + "e"]: "𝘦", // mathematical sans-serif italic small e
  [italicsans + "f"]: "𝘧", // mathematical sans-serif italic small f
  [italicsans + "g"]: "𝘨", // mathematical sans-serif italic small g
  [italicsans + "h"]: "𝘩", // mathematical sans-serif italic small h
  [italicsans + "i"]: "𝘪", // mathematical sans-serif italic small i
  [italicsans + "j"]: "𝘫", // mathematical sans-serif italic small j
  [italicsans + "k"]: "𝘬", // mathematical sans-serif italic small k
  [italicsans + "l"]: "𝘭", // mathematical sans-serif italic small l
  [italicsans + "m"]: "𝘮", // mathematical sans-serif italic small m
  [italicsans + "n"]: "𝘯", // mathematical sans-serif italic small n
  [italicsans + "o"]: "𝘰", // mathematical sans-serif italic small o
  [italicsans + "p"]: "𝘱", // mathematical sans-serif italic small p
  [italicsans + "q"]: "𝘲", // mathematical sans-serif italic small q
  [italicsans + "r"]: "𝘳", // mathematical sans-serif italic small r
  [italicsans + "s"]: "𝘴", // mathematical sans-serif italic small s
  [italicsans + "t"]: "𝘵", // mathematical sans-serif italic small t
  [italicsans + "u"]: "𝘶", // mathematical sans-serif italic small u
  [italicsans + "v"]: "𝘷", // mathematical sans-serif italic small v
  [italicsans + "w"]: "𝘸", // mathematical sans-serif italic small w
  [italicsans + "x"]: "𝘹", // mathematical sans-serif italic small x
  [italicsans + "y"]: "𝘺", // mathematical sans-serif italic small y
  [italicsans + "z"]: "𝘻", // mathematical sans-serif italic small z
  [bolditalicsans + "A"]: "𝘼", // mathematical sans-serif bold italic capital a
  [bolditalicsans + "B"]: "𝘽", // mathematical sans-serif bold italic capital b
  [bolditalicsans + "C"]: "𝘾", // mathematical sans-serif bold italic capital c
  [bolditalicsans + "D"]: "𝘿", // mathematical sans-serif bold italic capital d
  [bolditalicsans + "E"]: "𝙀", // mathematical sans-serif bold italic capital e
  [bolditalicsans + "F"]: "𝙁", // mathematical sans-serif bold italic capital f
  [bolditalicsans + "G"]: "𝙂", // mathematical sans-serif bold italic capital g
  [bolditalicsans + "H"]: "𝙃", // mathematical sans-serif bold italic capital h
  [bolditalicsans + "I"]: "𝙄", // mathematical sans-serif bold italic capital i
  [bolditalicsans + "J"]: "𝙅", // mathematical sans-serif bold italic capital j
  [bolditalicsans + "K"]: "𝙆", // mathematical sans-serif bold italic capital k
  [bolditalicsans + "L"]: "𝙇", // mathematical sans-serif bold italic capital l
  [bolditalicsans + "M"]: "𝙈", // mathematical sans-serif bold italic capital m
  [bolditalicsans + "N"]: "𝙉", // mathematical sans-serif bold italic capital n
  [bolditalicsans + "O"]: "𝙊", // mathematical sans-serif bold italic capital o
  [bolditalicsans + "P"]: "𝙋", // mathematical sans-serif bold italic capital p
  [bolditalicsans + "Q"]: "𝙌", // mathematical sans-serif bold italic capital q
  [bolditalicsans + "R"]: "𝙍", // mathematical sans-serif bold italic capital r
  [bolditalicsans + "S"]: "𝙎", // mathematical sans-serif bold italic capital s
  [bolditalicsans + "T"]: "𝙏", // mathematical sans-serif bold italic capital t
  [bolditalicsans + "U"]: "𝙐", // mathematical sans-serif bold italic capital u
  [bolditalicsans + "V"]: "𝙑", // mathematical sans-serif bold italic capital v
  [bolditalicsans + "W"]: "𝙒", // mathematical sans-serif bold italic capital w
  [bolditalicsans + "X"]: "𝙓", // mathematical sans-serif bold italic capital x
  [bolditalicsans + "Y"]: "𝙔", // mathematical sans-serif bold italic capital y
  [bolditalicsans + "Z"]: "𝙕", // mathematical sans-serif bold italic capital z
  [bolditalicsans + "a"]: "𝙖", // mathematical sans-serif bold italic small a
  [bolditalicsans + "b"]: "𝙗", // mathematical sans-serif bold italic small b
  [bolditalicsans + "c"]: "𝙘", // mathematical sans-serif bold italic small c
  [bolditalicsans + "d"]: "𝙙", // mathematical sans-serif bold italic small d
  [bolditalicsans + "e"]: "𝙚", // mathematical sans-serif bold italic small e
  [bolditalicsans + "f"]: "𝙛", // mathematical sans-serif bold italic small f
  [bolditalicsans + "g"]: "𝙜", // mathematical sans-serif bold italic small g
  [bolditalicsans + "h"]: "𝙝", // mathematical sans-serif bold italic small h
  [bolditalicsans + "i"]: "𝙞", // mathematical sans-serif bold italic small i
  [bolditalicsans + "j"]: "𝙟", // mathematical sans-serif bold italic small j
  [bolditalicsans + "k"]: "𝙠", // mathematical sans-serif bold italic small k
  [bolditalicsans + "l"]: "𝙡", // mathematical sans-serif bold italic small l
  [bolditalicsans + "m"]: "𝙢", // mathematical sans-serif bold italic small m
  [bolditalicsans + "n"]: "𝙣", // mathematical sans-serif bold italic small n
  [bolditalicsans + "o"]: "𝙤", // mathematical sans-serif bold italic small o
  [bolditalicsans + "p"]: "𝙥", // mathematical sans-serif bold italic small p
  [bolditalicsans + "q"]: "𝙦", // mathematical sans-serif bold italic small q
  [bolditalicsans + "r"]: "𝙧", // mathematical sans-serif bold italic small r
  [bolditalicsans + "s"]: "𝙨", // mathematical sans-serif bold italic small s
  [bolditalicsans + "t"]: "𝙩", // mathematical sans-serif bold italic small t
  [bolditalicsans + "u"]: "𝙪", // mathematical sans-serif bold italic small u
  [bolditalicsans + "v"]: "𝙫", // mathematical sans-serif bold italic small v
  [bolditalicsans + "w"]: "𝙬", // mathematical sans-serif bold italic small w
  [bolditalicsans + "x"]: "𝙭", // mathematical sans-serif bold italic small x
  [bolditalicsans + "y"]: "𝙮", // mathematical sans-serif bold italic small y
  [bolditalicsans + "z"]: "𝙯", // mathematical sans-serif bold italic small z
  [mono + "A"]: "𝙰", // mathematical monospace capital a
  [mono + "B"]: "𝙱", // mathematical monospace capital b
  [mono + "C"]: "𝙲", // mathematical monospace capital c
  [mono + "D"]: "𝙳", // mathematical monospace capital d
  [mono + "E"]: "𝙴", // mathematical monospace capital e
  [mono + "F"]: "𝙵", // mathematical monospace capital f
  [mono + "G"]: "𝙶", // mathematical monospace capital g
  [mono + "H"]: "𝙷", // mathematical monospace capital h
  [mono + "I"]: "𝙸", // mathematical monospace capital i
  [mono + "J"]: "𝙹", // mathematical monospace capital j
  [mono + "K"]: "𝙺", // mathematical monospace capital k
  [mono + "L"]: "𝙻", // mathematical monospace capital l
  [mono + "M"]: "𝙼", // mathematical monospace capital m
  [mono + "N"]: "𝙽", // mathematical monospace capital n
  [mono + "O"]: "𝙾", // mathematical monospace capital o
  [mono + "P"]: "𝙿", // mathematical monospace capital p
  [mono + "Q"]: "𝚀", // mathematical monospace capital q
  [mono + "R"]: "𝚁", // mathematical monospace capital r
  [mono + "S"]: "𝚂", // mathematical monospace capital s
  [mono + "T"]: "𝚃", // mathematical monospace capital t
  [mono + "U"]: "𝚄", // mathematical monospace capital u
  [mono + "V"]: "𝚅", // mathematical monospace capital v
  [mono + "W"]: "𝚆", // mathematical monospace capital w
  [mono + "X"]: "𝚇", // mathematical monospace capital x
  [mono + "Y"]: "𝚈", // mathematical monospace capital y
  [mono + "Z"]: "𝚉", // mathematical monospace capital z
  [mono + "a"]: "𝚊", // mathematical monospace small a
  [mono + "b"]: "𝚋", // mathematical monospace small b
  [mono + "c"]: "𝚌", // mathematical monospace small c
  [mono + "d"]: "𝚍", // mathematical monospace small d
  [mono + "e"]: "𝚎", // mathematical monospace small e
  [mono + "f"]: "𝚏", // mathematical monospace small f
  [mono + "g"]: "𝚐", // mathematical monospace small g
  [mono + "h"]: "𝚑", // mathematical monospace small h
  [mono + "i"]: "𝚒", // mathematical monospace small i
  [mono + "j"]: "𝚓", // mathematical monospace small j
  [mono + "k"]: "𝚔", // mathematical monospace small k
  [mono + "l"]: "𝚕", // mathematical monospace small l
  [mono + "m"]: "𝚖", // mathematical monospace small m
  [mono + "n"]: "𝚗", // mathematical monospace small n
  [mono + "o"]: "𝚘", // mathematical monospace small o
  [mono + "p"]: "𝚙", // mathematical monospace small p
  [mono + "q"]: "𝚚", // mathematical monospace small q
  [mono + "r"]: "𝚛", // mathematical monospace small r
  [mono + "s"]: "𝚜", // mathematical monospace small s
  [mono + "t"]: "𝚝", // mathematical monospace small t
  [mono + "u"]: "𝚞", // mathematical monospace small u
  [mono + "v"]: "𝚟", // mathematical monospace small v
  [mono + "w"]: "𝚠", // mathematical monospace small w
  [mono + "x"]: "𝚡", // mathematical monospace small x
  [mono + "y"]: "𝚢", // mathematical monospace small y
  [mono + "z"]: "𝚣", // mathematical monospace small z
  [italic + "imath"]: "U1d6a4", // mathematical italic small dotless i
  [italic + "jmath"]: "U1d6a5", // mathematical italic small dotless j
  [bold + "Alpha"]: "𝚨", // mathematical bold capital alpha
  [bold + "Beta"]: "𝚩", // mathematical bold capital beta
  [bold + "Gamma"]: "𝚪", // mathematical bold capital gamma
  [bold + "Delta"]: "𝚫", // mathematical bold capital delta
  [bold + "Epsilon"]: "𝚬", // mathematical bold capital epsilon
  [bold + "Zeta"]: "𝚭", // mathematical bold capital zeta
  [bold + "Eta"]: "𝚮", // mathematical bold capital eta
  [bold + "Theta"]: "𝚯", // mathematical bold capital theta
  [bold + "Iota"]: "𝚰", // mathematical bold capital iota
  [bold + "Kappa"]: "𝚱", // mathematical bold capital kappa
  [bold + "Lambda"]: "𝚲", // mathematical bold capital lambda
  [bold + "Mu"]: "𝚳", // mathematical bold capital mu
  [bold + "Nu"]: "𝚴", // mathematical bold capital nu
  [bold + "Xi"]: "𝚵", // mathematical bold capital xi
  [bold + "Omicron"]: "𝚶", // mathematical bold capital omicron
  [bold + "Pi"]: "𝚷", // mathematical bold capital pi
  [bold + "Rho"]: "𝚸", // mathematical bold capital rho
  [bold + "varTheta"]: "𝚹", // mathematical bold capital theta symbol
  [bold + "Sigma"]: "𝚺", // mathematical bold capital sigma
  [bold + "Tau"]: "𝚻", // mathematical bold capital tau
  [bold + "Upsilon"]: "𝚼", // mathematical bold capital upsilon
  [bold + "Phi"]: "𝚽", // mathematical bold capital phi
  [bold + "Chi"]: "𝚾", // mathematical bold capital chi
  [bold + "Psi"]: "𝚿", // mathematical bold capital psi
  [bold + "Omega"]: "𝛀", // mathematical bold capital omega
  [bold + "nabla"]: "𝛁", // mathematical bold nabla
  [bold + "alpha"]: "𝛂", // mathematical bold small alpha
  [bold + "beta"]: "𝛃", // mathematical bold small beta
  [bold + "gamma"]: "𝛄", // mathematical bold small gamma
  [bold + "delta"]: "𝛅", // mathematical bold small delta
  [bold + "epsilon"]: "𝛆", // mathematical bold small epsilon
  [bold + "zeta"]: "𝛇", // mathematical bold small zeta
  [bold + "eta"]: "𝛈", // mathematical bold small eta
  [bold + "theta"]: "𝛉", // mathematical bold small theta
  [bold + "iota"]: "𝛊", // mathematical bold small iota
  [bold + "kappa"]: "𝛋", // mathematical bold small kappa
  [bold + "lambda"]: "𝛌", // mathematical bold small lambda
  [bold + "mu"]: "𝛍", // mathematical bold small mu
  [bold + "nu"]: "𝛎", // mathematical bold small nu
  [bold + "xi"]: "𝛏", // mathematical bold small xi
  [bold + "omicron"]: "𝛐", // mathematical bold small omicron
  [bold + "pi"]: "𝛑", // mathematical bold small pi
  [bold + "rho"]: "𝛒", // mathematical bold small rho
  [bold + "varsigma"]: "𝛓", // mathematical bold small final sigma
  [bold + "sigma"]: "𝛔", // mathematical bold small sigma
  [bold + "tau"]: "𝛕", // mathematical bold small tau
  [bold + "upsilon"]: "𝛖", // mathematical bold small upsilon
  [bold + "varphi"]: "𝛗", // mathematical bold small phi
  [bold + "chi"]: "𝛘", // mathematical bold small chi
  [bold + "psi"]: "𝛙", // mathematical bold small psi
  [bold + "omega"]: "𝛚", // mathematical bold small omega
  [bold + "partial"]: "𝛛", // mathematical bold partial differential
  [bold + "varepsilon"]: "𝛜", // mathematical bold epsilon symbol
  [bold + "vartheta"]: "𝛝", // mathematical bold theta symbol
  [bold + "varkappa"]: "𝛞", // mathematical bold kappa symbol
  [bold + "phi"]: "𝛟", // mathematical bold phi symbol
  [bold + "varrho"]: "𝛠", // mathematical bold rho symbol
  [bold + "varpi"]: "𝛡", // mathematical bold pi symbol
  [italic + "Alpha"]: "𝛢", // mathematical italic capital alpha
  [italic + "Beta"]: "𝛣", // mathematical italic capital beta
  [italic + "Gamma"]: "𝛤", // mathematical italic capital gamma
  [italic + "Delta"]: "𝛥", // mathematical italic capital delta
  [italic + "Epsilon"]: "𝛦", // mathematical italic capital epsilon
  [italic + "Zeta"]: "𝛧", // mathematical italic capital zeta
  [italic + "Eta"]: "𝛨", // mathematical italic capital eta
  [italic + "Theta"]: "𝛩", // mathematical italic capital theta
  [italic + "Iota"]: "𝛪", // mathematical italic capital iota
  [italic + "Kappa"]: "𝛫", // mathematical italic capital kappa
  [italic + "Lambda"]: "𝛬", // mathematical italic capital lambda
  [italic + "Mu"]: "𝛭", // mathematical italic capital mu
  [italic + "Nu"]: "𝛮", // mathematical italic capital nu
  [italic + "Xi"]: "𝛯", // mathematical italic capital xi
  [italic + "Omicron"]: "𝛰", // mathematical italic capital omicron
  [italic + "Pi"]: "𝛱", // mathematical italic capital pi
  [italic + "Rho"]: "𝛲", // mathematical italic capital rho
  [italic + "varTheta"]: "𝛳", // mathematical italic capital theta symbol
  [italic + "Sigma"]: "𝛴", // mathematical italic capital sigma
  [italic + "Tau"]: "𝛵", // mathematical italic capital tau
  [italic + "Upsilon"]: "𝛶", // mathematical italic capital upsilon
  [italic + "Phi"]: "𝛷", // mathematical italic capital phi
  [italic + "Chi"]: "𝛸", // mathematical italic capital chi
  [italic + "Psi"]: "𝛹", // mathematical italic capital psi
  [italic + "Omega"]: "𝛺", // mathematical italic capital omega
  [italic + "nabla"]: "𝛻", // mathematical italic nabla
  [italic + "alpha"]: "𝛼", // mathematical italic small alpha
  [italic + "beta"]: "𝛽", // mathematical italic small beta
  [italic + "gamma"]: "𝛾", // mathematical italic small gamma
  [italic + "delta"]: "𝛿", // mathematical italic small delta
  [italic + "epsilon"]: "𝜀", // mathematical italic small epsilon
  [italic + "zeta"]: "𝜁", // mathematical italic small zeta
  [italic + "eta"]: "𝜂", // mathematical italic small eta
  [italic + "theta"]: "𝜃", // mathematical italic small theta
  [italic + "iota"]: "𝜄", // mathematical italic small iota
  [italic + "kappa"]: "𝜅", // mathematical italic small kappa
  [italic + "lambda"]: "𝜆", // mathematical italic small lambda
  [italic + "mu"]: "𝜇", // mathematical italic small mu
  [italic + "nu"]: "𝜈", // mathematical italic small nu
  [italic + "xi"]: "𝜉", // mathematical italic small xi
  [italic + "omicron"]: "𝜊", // mathematical italic small omicron
  [italic + "pi"]: "𝜋", // mathematical italic small pi
  [italic + "rho"]: "𝜌", // mathematical italic small rho
  [italic + "varsigma"]: "𝜍", // mathematical italic small final sigma
  [italic + "sigma"]: "𝜎", // mathematical italic small sigma
  [italic + "tau"]: "𝜏", // mathematical italic small tau
  [italic + "upsilon"]: "𝜐", // mathematical italic small upsilon
  [italic + "phi"]: "𝜑", // mathematical italic small phi
  [italic + "chi"]: "𝜒", // mathematical italic small chi
  [italic + "psi"]: "𝜓", // mathematical italic small psi
  [italic + "omega"]: "𝜔", // mathematical italic small omega
  [italic + "partial"]: "𝜕", // mathematical italic partial differential
  [italic + "varepsilon"]: "𝜖", // mathematical italic epsilon symbol
  [italic + "vartheta"]: "𝜗", // mathematical italic theta symbol
  [italic + "varkappa"]: "𝜘", // mathematical italic kappa symbol
  [italic + "varphi"]: "𝜙", // mathematical italic phi symbol
  [italic + "varrho"]: "𝜚", // mathematical italic rho symbol
  [italic + "varpi"]: "𝜛", // mathematical italic pi symbol
  [bolditalic + "Alpha"]: "𝜜", // mathematical bold italic capital alpha
  [bolditalic + "Beta"]: "𝜝", // mathematical bold italic capital beta
  [bolditalic + "Gamma"]: "𝜞", // mathematical bold italic capital gamma
  [bolditalic + "Delta"]: "𝜟", // mathematical bold italic capital delta
  [bolditalic + "Epsilon"]: "𝜠", // mathematical bold italic capital epsilon
  [bolditalic + "Zeta"]: "𝜡", // mathematical bold italic capital zeta
  [bolditalic + "Eta"]: "𝜢", // mathematical bold italic capital eta
  [bolditalic + "Theta"]: "𝜣", // mathematical bold italic capital theta
  [bolditalic + "Iota"]: "𝜤", // mathematical bold italic capital iota
  [bolditalic + "Kappa"]: "𝜥", // mathematical bold italic capital kappa
  [bolditalic + "Lambda"]: "𝜦", // mathematical bold italic capital lambda
  [bolditalic + "Mu"]: "𝜧", // mathematical bold italic capital mu
  [bolditalic + "Nu"]: "𝜨", // mathematical bold italic capital nu
  [bolditalic + "Xi"]: "𝜩", // mathematical bold italic capital xi
  [bolditalic + "Omicron"]: "𝜪", // mathematical bold italic capital omicron
  [bolditalic + "Pi"]: "𝜫", // mathematical bold italic capital pi
  [bolditalic + "Rho"]: "𝜬", // mathematical bold italic capital rho
  [bolditalic + "varTheta"]: "𝜭", // mathematical bold italic capital theta symbol
  [bolditalic + "Sigma"]: "𝜮", // mathematical bold italic capital sigma
  [bolditalic + "Tau"]: "𝜯", // mathematical bold italic capital tau
  [bolditalic + "Upsilon"]: "𝜰", // mathematical bold italic capital upsilon
  [bolditalic + "Phi"]: "𝜱", // mathematical bold italic capital phi
  [bolditalic + "Chi"]: "𝜲", // mathematical bold italic capital chi
  [bolditalic + "Psi"]: "𝜳", // mathematical bold italic capital psi
  [bolditalic + "Omega"]: "𝜴", // mathematical bold italic capital omega
  [bolditalic + "nabla"]: "𝜵", // mathematical bold italic nabla
  [bolditalic + "alpha"]: "𝜶", // mathematical bold italic small alpha
  [bolditalic + "beta"]: "𝜷", // mathematical bold italic small beta
  [bolditalic + "gamma"]: "𝜸", // mathematical bold italic small gamma
  [bolditalic + "delta"]: "𝜹", // mathematical bold italic small delta
  [bolditalic + "epsilon"]: "𝜺", // mathematical bold italic small epsilon
  [bolditalic + "zeta"]: "𝜻", // mathematical bold italic small zeta
  [bolditalic + "eta"]: "𝜼", // mathematical bold italic small eta
  [bolditalic + "theta"]: "𝜽", // mathematical bold italic small theta
  [bolditalic + "iota"]: "𝜾", // mathematical bold italic small iota
  [bolditalic + "kappa"]: "𝜿", // mathematical bold italic small kappa
  [bolditalic + "lambda"]: "𝝀", // mathematical bold italic small lambda
  [bolditalic + "mu"]: "𝝁", // mathematical bold italic small mu
  [bolditalic + "nu"]: "𝝂", // mathematical bold italic small nu
  [bolditalic + "xi"]: "𝝃", // mathematical bold italic small xi
  [bolditalic + "omicron"]: "𝝄", // mathematical bold italic small omicron
  [bolditalic + "pi"]: "𝝅", // mathematical bold italic small pi
  [bolditalic + "rho"]: "𝝆", // mathematical bold italic small rho
  [bolditalic + "varsigma"]: "𝝇", // mathematical bold italic small final sigma
  [bolditalic + "sigma"]: "𝝈", // mathematical bold italic small sigma
  [bolditalic + "tau"]: "𝝉", // mathematical bold italic small tau
  [bolditalic + "upsilon"]: "𝝊", // mathematical bold italic small upsilon
  [bolditalic + "phi"]: "𝝋", // mathematical bold italic small phi
  [bolditalic + "chi"]: "𝝌", // mathematical bold italic small chi
  [bolditalic + "psi"]: "𝝍", // mathematical bold italic small psi
  [bolditalic + "omega"]: "𝝎", // mathematical bold italic small omega
  [bolditalic + "partial"]: "𝝏", // mathematical bold italic partial differential
  [bolditalic + "varepsilon"]: "𝝐", // mathematical bold italic epsilon symbol
  [bolditalic + "vartheta"]: "𝝑", // mathematical bold italic theta symbol
  [bolditalic + "varkappa"]: "𝝒", // mathematical bold italic kappa symbol
  [bolditalic + "varphi"]: "𝝓", // mathematical bold italic phi symbol
  [bolditalic + "varrho"]: "𝝔", // mathematical bold italic rho symbol
  [bolditalic + "varpi"]: "𝝕", // mathematical bold italic pi symbol
  [boldsans + "Alpha"]: "𝝖", // mathematical sans-serif bold capital alpha
  [boldsans + "Beta"]: "𝝗", // mathematical sans-serif bold capital beta
  [boldsans + "Gamma"]: "𝝘", // mathematical sans-serif bold capital gamma
  [boldsans + "Delta"]: "𝝙", // mathematical sans-serif bold capital delta
  [boldsans + "Epsilon"]: "𝝚", // mathematical sans-serif bold capital epsilon
  [boldsans + "Zeta"]: "𝝛", // mathematical sans-serif bold capital zeta
  [boldsans + "Eta"]: "𝝜", // mathematical sans-serif bold capital eta
  [boldsans + "Theta"]: "𝝝", // mathematical sans-serif bold capital theta
  [boldsans + "Iota"]: "𝝞", // mathematical sans-serif bold capital iota
  [boldsans + "Kappa"]: "𝝟", // mathematical sans-serif bold capital kappa
  [boldsans + "Lambda"]: "𝝠", // mathematical sans-serif bold capital lambda
  [boldsans + "Mu"]: "𝝡", // mathematical sans-serif bold capital mu
  [boldsans + "Nu"]: "𝝢", // mathematical sans-serif bold capital nu
  [boldsans + "Xi"]: "𝝣", // mathematical sans-serif bold capital xi
  [boldsans + "Omicron"]: "𝝤", // mathematical sans-serif bold capital omicron
  [boldsans + "Pi"]: "𝝥", // mathematical sans-serif bold capital pi
  [boldsans + "Rho"]: "𝝦", // mathematical sans-serif bold capital rho
  [boldsans + "varTheta"]: "𝝧", // mathematical sans-serif bold capital theta symbol
  [boldsans + "Sigma"]: "𝝨", // mathematical sans-serif bold capital sigma
  [boldsans + "Tau"]: "𝝩", // mathematical sans-serif bold capital tau
  [boldsans + "Upsilon"]: "𝝪", // mathematical sans-serif bold capital upsilon
  [boldsans + "Phi"]: "𝝫", // mathematical sans-serif bold capital phi
  [boldsans + "Chi"]: "𝝬", // mathematical sans-serif bold capital chi
  [boldsans + "Psi"]: "𝝭", // mathematical sans-serif bold capital psi
  [boldsans + "Omega"]: "𝝮", // mathematical sans-serif bold capital omega
  [boldsans + "nabla"]: "𝝯", // mathematical sans-serif bold nabla
  [boldsans + "alpha"]: "𝝰", // mathematical sans-serif bold small alpha
  [boldsans + "beta"]: "𝝱", // mathematical sans-serif bold small beta
  [boldsans + "gamma"]: "𝝲", // mathematical sans-serif bold small gamma
  [boldsans + "delta"]: "𝝳", // mathematical sans-serif bold small delta
  [boldsans + "epsilon"]: "𝝴", // mathematical sans-serif bold small epsilon
  [boldsans + "zeta"]: "𝝵", // mathematical sans-serif bold small zeta
  [boldsans + "eta"]: "𝝶", // mathematical sans-serif bold small eta
  [boldsans + "theta"]: "𝝷", // mathematical sans-serif bold small theta
  [boldsans + "iota"]: "𝝸", // mathematical sans-serif bold small iota
  [boldsans + "kappa"]: "𝝹", // mathematical sans-serif bold small kappa
  [boldsans + "lambda"]: "𝝺", // mathematical sans-serif bold small lambda
  [boldsans + "mu"]: "𝝻", // mathematical sans-serif bold small mu
  [boldsans + "nu"]: "𝝼", // mathematical sans-serif bold small nu
  [boldsans + "xi"]: "𝝽", // mathematical sans-serif bold small xi
  [boldsans + "omicron"]: "𝝾", // mathematical sans-serif bold small omicron
  [boldsans + "pi"]: "𝝿", // mathematical sans-serif bold small pi
  [boldsans + "rho"]: "𝞀", // mathematical sans-serif bold small rho
  [boldsans + "varsigma"]: "𝞁", // mathematical sans-serif bold small final sigma
  [boldsans + "sigma"]: "𝞂", // mathematical sans-serif bold small sigma
  [boldsans + "tau"]: "𝞃", // mathematical sans-serif bold small tau
  [boldsans + "upsilon"]: "𝞄", // mathematical sans-serif bold small upsilon
  [boldsans + "phi"]: "𝞅", // mathematical sans-serif bold small phi
  [boldsans + "chi"]: "𝞆", // mathematical sans-serif bold small chi
  [boldsans + "psi"]: "𝞇", // mathematical sans-serif bold small psi
  [boldsans + "omega"]: "𝞈", // mathematical sans-serif bold small omega
  [boldsans + "partial"]: "𝞉", // mathematical sans-serif bold partial differential
  [boldsans + "varepsilon"]: "𝞊", // mathematical sans-serif bold epsilon symbol
  [boldsans + "vartheta"]: "𝞋", // mathematical sans-serif bold theta symbol
  [boldsans + "varkappa"]: "𝞌", // mathematical sans-serif bold kappa symbol
  [boldsans + "varphi"]: "𝞍", // mathematical sans-serif bold phi symbol
  [boldsans + "varrho"]: "𝞎", // mathematical sans-serif bold rho symbol
  [boldsans + "varpi"]: "𝞏", // mathematical sans-serif bold pi symbol
  [bolditalicsans + "Alpha"]: "𝞐", // mathematical sans-serif bold italic capital alpha
  [bolditalicsans + "Beta"]: "𝞑", // mathematical sans-serif bold italic capital beta
  [bolditalicsans + "Gamma"]: "𝞒", // mathematical sans-serif bold italic capital gamma
  [bolditalicsans + "Delta"]: "𝞓", // mathematical sans-serif bold italic capital delta
  [bolditalicsans + "Epsilon"]: "𝞔", // mathematical sans-serif bold italic capital epsilon
  [bolditalicsans + "Zeta"]: "𝞕", // mathematical sans-serif bold italic capital zeta
  [bolditalicsans + "Eta"]: "𝞖", // mathematical sans-serif bold italic capital eta
  [bolditalicsans + "Theta"]: "𝞗", // mathematical sans-serif bold italic capital theta
  [bolditalicsans + "Iota"]: "𝞘", // mathematical sans-serif bold italic capital iota
  [bolditalicsans + "Kappa"]: "𝞙", // mathematical sans-serif bold italic capital kappa
  [bolditalicsans + "Lambda"]: "𝞚", // mathematical sans-serif bold italic capital lambda
  [bolditalicsans + "Mu"]: "𝞛", // mathematical sans-serif bold italic capital mu
  [bolditalicsans + "Nu"]: "𝞜", // mathematical sans-serif bold italic capital nu
  [bolditalicsans + "Xi"]: "𝞝", // mathematical sans-serif bold italic capital xi
  [bolditalicsans + "Omicron"]: "𝞞", // mathematical sans-serif bold italic capital omicron
  [bolditalicsans + "Pi"]: "𝞟", // mathematical sans-serif bold italic capital pi
  [bolditalicsans + "Rho"]: "𝞠", // mathematical sans-serif bold italic capital rho
  [bolditalicsans + "varTheta"]: "𝞡", // mathematical sans-serif bold italic capital theta symbol
  [bolditalicsans + "Sigma"]: "𝞢", // mathematical sans-serif bold italic capital sigma
  [bolditalicsans + "Tau"]: "𝞣", // mathematical sans-serif bold italic capital tau
  [bolditalicsans + "Upsilon"]: "𝞤", // mathematical sans-serif bold italic capital upsilon
  [bolditalicsans + "Phi"]: "𝞥", // mathematical sans-serif bold italic capital phi
  [bolditalicsans + "Chi"]: "𝞦", // mathematical sans-serif bold italic capital chi
  [bolditalicsans + "Psi"]: "𝞧", // mathematical sans-serif bold italic capital psi
  [bolditalicsans + "Omega"]: "𝞨", // mathematical sans-serif bold italic capital omega
  [bolditalicsans + "nabla"]: "𝞩", // mathematical sans-serif bold italic nabla
  [bolditalicsans + "alpha"]: "𝞪", // mathematical sans-serif bold italic small alpha
  [bolditalicsans + "beta"]: "𝞫", // mathematical sans-serif bold italic small beta
  [bolditalicsans + "gamma"]: "𝞬", // mathematical sans-serif bold italic small gamma
  [bolditalicsans + "delta"]: "𝞭", // mathematical sans-serif bold italic small delta
  [bolditalicsans + "epsilon"]: "𝞮", // mathematical sans-serif bold italic small epsilon
  [bolditalicsans + "zeta"]: "𝞯", // mathematical sans-serif bold italic small zeta
  [bolditalicsans + "eta"]: "𝞰", // mathematical sans-serif bold italic small eta
  [bolditalicsans + "theta"]: "𝞱", // mathematical sans-serif bold italic small theta
  [bolditalicsans + "iota"]: "𝞲", // mathematical sans-serif bold italic small iota
  [bolditalicsans + "kappa"]: "𝞳", // mathematical sans-serif bold italic small kappa
  [bolditalicsans + "lambda"]: "𝞴", // mathematical sans-serif bold italic small lambda
  [bolditalicsans + "mu"]: "𝞵", // mathematical sans-serif bold italic small mu
  [bolditalicsans + "nu"]: "𝞶", // mathematical sans-serif bold italic small nu
  [bolditalicsans + "xi"]: "𝞷", // mathematical sans-serif bold italic small xi
  [bolditalicsans + "omicron"]: "𝞸", // mathematical sans-serif bold italic small omicron
  [bolditalicsans + "pi"]: "𝞹", // mathematical sans-serif bold italic small pi
  [bolditalicsans + "rho"]: "𝞺", // mathematical sans-serif bold italic small rho
  [bolditalicsans + "varsigma"]: "𝞻", // mathematical sans-serif bold italic small final sigma
  [bolditalicsans + "sigma"]: "𝞼", // mathematical sans-serif bold italic small sigma
  [bolditalicsans + "tau"]: "𝞽", // mathematical sans-serif bold italic small tau
  [bolditalicsans + "upsilon"]: "𝞾", // mathematical sans-serif bold italic small upsilon
  [bolditalicsans + "phi"]: "𝞿", // mathematical sans-serif bold italic small phi
  [bolditalicsans + "chi"]: "𝟀", // mathematical sans-serif bold italic small chi
  [bolditalicsans + "psi"]: "𝟁", // mathematical sans-serif bold italic small psi
  [bolditalicsans + "omega"]: "𝟂", // mathematical sans-serif bold italic small omega
  [bolditalicsans + "partial"]: "𝟃", // mathematical sans-serif bold italic partial differential
  [bolditalicsans + "varepsilon"]: "𝟄", // mathematical sans-serif bold italic epsilon symbol
  [bolditalicsans + "vartheta"]: "𝟅", // mathematical sans-serif bold italic theta symbol
  [bolditalicsans + "varkappa"]: "𝟆", // mathematical sans-serif bold italic kappa symbol
  [bolditalicsans + "varphi"]: "𝟇", // mathematical sans-serif bold italic phi symbol
  [bolditalicsans + "varrho"]: "𝟈", // mathematical sans-serif bold italic rho symbol
  [bolditalicsans + "varpi"]: "𝟉", // mathematical sans-serif bold italic pi symbol
  [bold + "Digamma"]: "U1d7ca", // mathematical bold capital digamma
  [bold + "digamma"]: "U1d7cb", // mathematical bold small digamma
  [bold + "zero"]: "𝟎", // mathematical bold digit 0
  [bold + "one"]: "𝟏", // mathematical bold digit 1
  [bold + "two"]: "𝟐", // mathematical bold digit 2
  [bold + "three"]: "𝟑", // mathematical bold digit 3
  [bold + "four"]: "𝟒", // mathematical bold digit 4
  [bold + "five"]: "𝟓", // mathematical bold digit 5
  [bold + "six"]: "𝟔", // mathematical bold digit 6
  [bold + "seven"]: "𝟕", // mathematical bold digit 7
  [bold + "eight"]: "𝟖", // mathematical bold digit 8
  [bold + "nine"]: "𝟗", // mathematical bold digit 9
  [blackboard + "zero"]: "𝟘", // mathematical double-struck digit 0
  [blackboard + "one"]: "𝟙", // mathematical double-struck digit 1
  [blackboard + "two"]: "𝟚", // mathematical double-struck digit 2
  [blackboard + "three"]: "𝟛", // mathematical double-struck digit 3
  [blackboard + "four"]: "𝟜", // mathematical double-struck digit 4
  [blackboard + "five"]: "𝟝", // mathematical double-struck digit 5
  [blackboard + "six"]: "𝟞", // mathematical double-struck digit 6
  [blackboard + "seven"]: "𝟟", // mathematical double-struck digit 7
  [blackboard + "eight"]: "𝟠", // mathematical double-struck digit 8
  [blackboard + "nine"]: "𝟡", // mathematical double-struck digit 9
  [sans + "zero"]: "𝟢", // mathematical sans-serif digit 0
  [sans + "one"]: "𝟣", // mathematical sans-serif digit 1
  [sans + "two"]: "𝟤", // mathematical sans-serif digit 2
  [sans + "three"]: "𝟥", // mathematical sans-serif digit 3
  [sans + "four"]: "𝟦", // mathematical sans-serif digit 4
  [sans + "five"]: "𝟧", // mathematical sans-serif digit 5
  [sans + "six"]: "𝟨", // mathematical sans-serif digit 6
  [sans + "seven"]: "𝟩", // mathematical sans-serif digit 7
  [sans + "eight"]: "𝟪", // mathematical sans-serif digit 8
  [sans + "nine"]: "𝟫", // mathematical sans-serif digit 9
  [boldsans + "zero"]: "𝟬", // mathematical sans-serif bold digit 0
  [boldsans + "one"]: "𝟭", // mathematical sans-serif bold digit 1
  [boldsans + "two"]: "𝟮", // mathematical sans-serif bold digit 2
  [boldsans + "three"]: "𝟯", // mathematical sans-serif bold digit 3
  [boldsans + "four"]: "𝟰", // mathematical sans-serif bold digit 4
  [boldsans + "five"]: "𝟱", // mathematical sans-serif bold digit 5
  [boldsans + "six"]: "𝟲", // mathematical sans-serif bold digit 6
  [boldsans + "seven"]: "𝟳", // mathematical sans-serif bold digit 7
  [boldsans + "eight"]: "𝟴", // mathematical sans-serif bold digit 8
  [boldsans + "nine"]: "𝟵", // mathematical sans-serif bold digit 9
  [mono + "zero"]: "𝟶", // mathematical monospace digit 0
  [mono + "one"]: "𝟷", // mathematical monospace digit 1
  [mono + "two"]: "𝟸", // mathematical monospace digit 2
  [mono + "three"]: "𝟹", // mathematical monospace digit 3
  [mono + "four"]: "𝟺", // mathematical monospace digit 4
  [mono + "five"]: "𝟻", // mathematical monospace digit 5
  [mono + "six"]: "𝟼", // mathematical monospace digit 6
  [mono + "seven"]: "𝟽", // mathematical monospace digit 7
  [mono + "eight"]: "𝟾", // mathematical monospace digit 8
  [mono + "nine"]: "𝟿", // mathematical monospace digit 9

  "\\triangleright": "▷", // (large) right triangle, open; z notation range restriction
  "\\triangleleft": "◁", // (large) left triangle, open; z notation domain restriction
  "\\leftouterjoin": "⟕", // left outer join
  "\\rightouterjoin": "⟖", // right outer join
  "\\fullouterjoin": "⟗", // full outer join
  "\\Join": "⨝", // join
  "\\join": "⨝", // join
  "\\underbar": "̲", // combining low line
  "\\underleftrightarrow": "͍", // underleftrightarrow accent
  "\\leftwavearrow": "↜", // left arrow-wavy
  "\\rightwavearrow": "↝", // right arrow-wavy
  "\\varbarwedge": "⌅", // /barwedge b: logical and, bar above [projective (bar over small wedge)]
  "\\smallblacktriangleright": "▸", // right triangle, filled
  "\\smallblacktriangleleft": "◂", // left triangle, filled
  "\\leftmoon": "☾", // last quarter moon
  "\\smalltriangleright": "▹", // right triangle, open
  "\\smalltriangleleft": "◃", // left triangle, open

  "\\tricolon": "⁝", // tricolon

  // fractions
  "\\1/4": "¼", // vulgar fraction one quarter
  "\\1/2": "½", // vulgar fraction one half
  "\\3/4": "¾", // vulgar fraction three quarters
  "\\1/7": "⅐", // vulgar fraction one seventh
  "\\1/9": "⅑", // vulgar fraction one ninth
  "\\1/10": "⅒", // vulgar fraction one tenth
  "\\1/3": "⅓", // vulgar fraction one third
  "\\2/3": "⅔", // vulgar fraction two thirds
  "\\1/5": "⅕", // vulgar fraction one fifth
  "\\2/5": "⅖", // vulgar fraction two fifths
  "\\3/5": "⅗", // vulgar fraction three fifths
  "\\4/5": "⅘", // vulgar fraction four fifths
  "\\1/6": "⅙", // vulgar fraction one sixth
  "\\5/6": "⅚", // vulgar fraction five sixths
  "\\1/8": "⅛", // vulgar fraction one eigth
  "\\3/8": "⅜", // vulgar fraction three eigths
  "\\5/8": "⅝", // vulgar fraction five eigths
  "\\7/8": "⅞", // vulgar fraction seventh eigths
  "\\1/": "⅟", // fraction numerator one
  "\\0/3": "↉", // vulgar fraction zero thirds
};

export default latex_symbols;
