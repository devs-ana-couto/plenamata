<?php
function pkmimes( $search = false, $revert = false ){

	$types = [
		'application/arj' => 'arj',
		'application/acad' => 'dwg',
		'application/base64' => [ 'mm', 'mme' ],
		'application/book' => [ 'boo', 'book' ],
		'application/binhex' => 'hqx',
		'application/binhex4' => 'hqx',
		'application/clariscad' => 'ccad',
		'application/cdf' => 'cdf',
		'application/commonground' => 'dp',
		'application/drafting' => 'drw',
		'application/dxf' => 'dxf',
		'application/excel' => [ 'xlt', 'xlv', 'xlw', 'xl', 'xlc', 'xla', 'xlb', 'xls', 'xlm', 'xld', 'xlk', 'xll' ],
		'application/ecmascript' => 'js',
		'application/envoy' => 'evy',
		'application/fractals' => 'fif',
		'application/freeloader' => 'frl',
		'application/hta' => 'hta',
		'application/hlp' => 'hlp',
		'application/iges' => 'iges',
		'application/inf' => 'inf',
		'application/iges' => 'igs',
		'application/java' => 'class',
		'application/javascript' => 'js',
		'application/java-byte-code' => 'class',
		'application/lha' => 'lha',
		'application/lzx' => 'lzx',
		'application/macbinary' => 'bin',
		'application/mac-binhex' => 'hqx',
		'application/mac-binhex40' => 'hqx',
		'application/marc' => 'mrc',
		'application/mac-binary' => 'bin',
		'application/mac-compactpro' => 'cpt',
		'application/mime' => 'aps',
		'application/msword' => [ 'doc', 'docx', 'dot', 'wiz', 'w6w', 'word' ],
		'application/mbedlet' => 'mbd',
		'application/mcad' => 'mcd',
		'application/netmc' => 'mcp',
		'application/octet-stream' => [ 'arc', 'arj', 'a', 'bin', 'com', 'dump', 'exe', 'psd', 'lha', 'lhx', 'lzh', 'lzx', 'o', 'saveme', 'zoo', 'uu' ],
		'application/oda' => 'oda',
		'application/postscript' => [ 'ai', 'ps', 'eps' ],
		'application/pkix-cert' => [ 'cer', 'crt' ],
		'application/pkcs-crl' => [ 'crl', 'crl' ],
		'application/pro_eng' => [ 'prt', 'part' ],
		'application/pkcs10' => 'p10',
		'application/pkcs-12' => 'p12',
		'application/pkcs7-mime' => [ 'p7c', 'p7m' ],
		'application/pkcs7-signature' => 'p7s',
		'application/vnd.ms-pki.seccat' => 'cat',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx',
		'application/vnd.fdf' => 'fdf',
		'application/vnd.hp-hpgl' => [ 'hgl', 'hpg', 'hpgl' ],
		'application/vnd.ms-project' => 'mpp',
		'application/vnd.nokia.configuration-message' => 'ncm',
		'application/ringing-tones' => 'rng',
		'application/powerpoint' => 'ppt',
		'application/mspowerpoint' => [ 'pot', 'pps', 'ppt', 'ppz' ],
		'application/futuresplash' => 'spl',
		'application/streamingmedia' => 'ssm',
		'application/step' => 'step',
		'application/sla' => 'stl',
		'application/step' => 'stp',
		'application/solids' => 'sol',
		'application/toolbook' => 'tbk',
		'application/plain' => 'text',
		'application/gnutar' => 'tgz',
		'application/dsptype' => 'tsp',
		'application/vnd.ms-powerpoint' => [ 'pot', 'ppa', 'ppt', 'pps', 'pwz' ],
		'application/vnd.rn-realplayer' => 'rnx',
		'application/vnd.rn-realmedia' => 'rm',
		'application/vnd.nokia.ringing-tone' => 'rng',
		'application/vnd.ms-pki.certstore' => 'sst',
		'application/vnd.ms-pki.stl' => 'stl',
		'application/vnd.hp-pcl' => 'pcl',
		'application/vnd.ms-excel' => [ 'xlw', 'xlb', 'xlc', 'xll', 'xlm', 'xls' ],
		'application/vnd.ms-pki.pko' => 'pko',
		'application/vda' => 'vda',
		'application/vnd.xara' => 'web',
		'application/vnd.wap.wmlc' => 'wmlc',
		'application/vnd.wap.wmlscriptc' => 'wmlsc',
		'application/xml' => 'xml',
		'application/zip' => 'zip',
		'application/rtf' => [ 'rtf', 'rtx' ],
		'application/sdp' => 'sdp',
		'application/sounder' => 'sdr',
		'application/sea' => [ 'sea', 'set' ],
		'application/smil' => [ 'smi', 'smil' ],
		'application/wordperfect' => [ 'wp', 'wp5', 'wp6', 'wpd' ],
		'application/wordperfect6.0' => [ 'w60', 'wp5' ],
		'application/wordperfect6.1' => 'w61',
		'application/i-deas' => 'unv',
		'application/mswrite' => 'wri',
		'application/groupwise' => 'vew',
		'application/vocaltec-media-desc' => 'vmd',
		'application/vocaltec-media-file' => 'vmf',
		'application/x-internett-signup' => 'ins',
		'application/x-mplayer2' => 'asx',
		'application/x-compressed' => 'tgz',
		'application/x-ima' => 'ima',
		'application/x-httpd-imap' => 'imap',
		'application/x-ip2' => 'ip',
		'application/x-inventor' => 'iv',
		'application/x-java-commerce' => 'jcm',
		'application/x-javascript' => 'js',
		'application/x-lha' => 'lha',
		'application/x-lisp' => 'lsp',
		'application/x-latex' => [ 'latex', 'ltx' ],
		'application/x-lzh' => 'lzh',
		'application/x-lzx' => 'lzx',
		'application/x-magic-cap-package-1.0' => 'mc' ,
		'application/x-mathcad' => 'mcd',
		'application/x-troff-me' => 'me',
		'application/x-frame' => 'mif',
		'application/x-livescreen' => 'ivy',
		'application/x-mif' => 'mif',
		'application/x-meme' => 'mm',
		'application/x-midi' => [ 'mid', 'midi' ],
		'application/x-ksh' => 'ksh',
		'application/x-troff-man' => 'man',
		'application/x-navimap' => 'map',
		'application/x-project' => [ 'mpc', 'mpt', 'mpv', 'mpx' ],
		'application/x-troff-ms' => 'ms',
		'application/x-vnd.audioexplosion.mzz' => 'mzz',
		'application/x-netcdf' => 'nc',
		'application/x-mix-transfer' => 'nix',
		'application/x-conference' => 'nsc',
		'application/x-navidoc' => 'nvd',
		'application/x-omc' => 'omc',
		'application/x-omcdatamaker' => 'omcd',
		'application/x-omcregerator' => 'omcr',
		'application/x-pkcs10' => 'p10',
		'application/x-pkcs12' => 'p12',
		'application/x-pkcs7-signature' => 'p7a',
		'application/x-pkcs7-mime' => [ 'p7c', 'p7m' ],
		'application/x-pkcs7-certreqresp' => 'p7r',
		'application/x-mspowerpoint' => 'ppt',
		'application/x-freelance' => 'pre',
		'application/x-bytecode.python' => 'pyc',
		'application/x-cmu-raster' => 'ras',
		'application/x-troff' => 'roff',
		'application/x-sprite' => [ 'spr', 'sprite' ],
		'application/x-wais-source' => 'src',
		'application/x-navistyle' => 'stl',
		'application/x-sv4cpio' => 'sv4cpio',
		'application/x-sv4crc' => 'sv4crc',
		'application/x-pkcs7-certificates' => 'spc',
		'application/x-shockwave-flash' => 'swf',
		'application/x-tar' => 'tar',
		'application/x-tbook' => 'tbk',
		'application/x-tcl' => 'tcl',
		'application/x-tex' => 'tex',
		'application/x-texinfo' => [ 'texi', 'texinfo' ],
		'application/x-excel' => [ 'xla', 'xlb', 'xlc', 'xld', 'xlk', 'xlm', 'xls', 'xlt', 'xlv', 'xlw', 'xll' ],
		'application/x-msexcel' => [ 'xls', 'xla', 'xlw' ],
		'application/x-vnd.ls-xpix' => 'xpix',
		'application/x-compress' => 'z',
		'application/x-compressed' => 'zip',
		'application/x-zip-compressed' => 'zip',
		'application/x-pcl' => 'pcl',
		'application/x-newton-compatible-pkg' => 'pkg',
		'application/x-pixclscript' => 'plx',
		'application/x-pagemaker' => [ 'pm4', 'pm5' ],
		'application/x-portable-anymap' => 'pnm',
		'application/x-rtf' => 'rtf',
		'application/x-tbook' => 'sbk',
		'application/x-lotusscreencam' => 'scm',
		'application/x-sdp' => 'sdp',
		'application/x-sea' => 'sea',
		'application/x-bsh' => 'sh',
		'application/x-sh' => 'sh',
		'application/x-shar' => [ 'shar', 'sh' ],
		'application/x-bsh' => 'shar',
		'application/x-sit' => 'sit',
		'application/x-stuffit' => 'sit',
		'application/x-koan' => [ 'skd', 'skm', 'skp', 'skt' ],
		'application/x-seelogo' => 'sl',
		'application/x-visio' => [ 'vsd', 'vst', 'vsw' ],
		'application/x-qpro' => 'wb1',
		'application/x-123' => 'wk1',
		'application/x-wpwin' => 'wpd',
		'application/x-lotus' => 'wq1',
		'application/x-wri' => 'wri',
		'application/x-world' => 'wrl',
		'application/x-wais-source' => 'wsrc',
		'application/x-wintalk' => 'wtk',
		'application/x-cdlink' => 'vcd',
		'application/x-authorware-bin' => 'aab',
		'application/x-authorware-map' => 'aam',
		'application/x-authorware-seg' => 'aas',
		'application/x-aim' => 'aim',
		'application/x-navi-animation' => 'ani',
		'application/x-nokia-9000-communicator-add-on-software' => 'aos',
		'application/x-bcpio' => 'bcpio',
		'application/x-binary' => 'bin',
		'application/x-macbinary' => 'bin',
		'application/x-troff-msvideo' => 'avi',
		'application/x-bsh' => 'bsh',
		'application/x-bzip' => 'bz',
		'application/x-bzip2' => [ 'boz', 'bz2' ],
		'application/x-gzip' => [ 'gzip', 'gz' ],
		'application/x-cocoa' => 'cco',
		'application/x-cdf' => 'cdf',
		'application/x-netcdf' => 'cdf',
		'application/x-x509-ca-cert' => 'cer',
		'application/x-chat' => [ 'cha', 'chat' ],
		'application/x-java-class' => 'class',
		'application/x-cpio' => 'cpio',
		'application/x-compactpro' => 'cpt',
		'application/x-cpt' => 'cpt',
		'application/x-x509-ca-cert' => 'crt',
		'application/x-x509-user-cert' => 'crt',
		'application/x-csh' => 'csh',
		'application/x-director' => 'dcr',
		'application/x-deepv' => 'deepv',
		'application/x-x509-ca-cert' => 'der',
		'application/x-director' => 'dir',
		'application/x-dvi' => 'dvi',
		'application/x-pointplus' => 'css',
		'application/x-director' => 'dxr',
		'application/x-bytecode.elisp (compiled elisp)' => 'elc',
		'application/x-elc' => 'elc',
		'application/x-envoy' => 'env',
		'application/x-esrehber' => 'es',
		'application/x-envoy' => 'evy',
		'application/x-gsp' => 'gsp',
		'application/x-gss' => 'gss',
		'application/x-gtar' => 'gtar',
		'application/x-compressed' => 'gz',
		'application/x-hdf' => 'hdf',
		'application/x-helpfile' => [ 'help', 'hlp' ],
		'application/x-winhelp' => 'hlp',
		'application/x-binhex40' => 'hqx',
		'application/x-mac-binhex40' => 'hqx',
		'application/x-ustar' => 'ustar',
		'application/x-troff' => [ 't', 'tr' ],
		'application/x-world' => 'svr',

		// Audio
		'audio/aiff' => [ 'aif', 'aifc', 'aiff' ],
		'audio/basic' => [ 'snd', 'au' ],
		'audio/it' => 'it',
		'audio/make' => [ 'my', 'funk', 'pfunk' ],
		'audio/make.my.funk' => 'pfunk',
		'audio/midi' => [ 'mid', 'midi', 'kar', 'rmi' ],
		'audio/mod' => 'mod',
		'audio/mpeg' => [ 'mp3', 'm2a', 'mpa', 'mpg', 'mp2', 'mpga' ],
		'audio/mpeg3' => 'mp3',
		'audio/nspaudio' => [ 'la', 'lma' ],
		'audio/s3m' => 's3m',
		'audio/tsp-audio' => 'tsi',
		'audio/tsplayer' => 'tsp',
		'audio/vnd.qcelp' => 'qcp',
		'audio/voc' => 'voc',
		'audio/voxware' => 'vox',
		'audio/wav' => 'wav',
		'audio/x-adpcm' => 'snd',
		'audio/x-aiff' => [ 'aif', 'aifc', 'aiff' ],
		'audio/x-au' => 'au',
		'audio/x-gsm' => [ 'gsd', 'gsm' ],
		'audio/x-jam' => 'jam',
		'audio/x-liveaudio' => 'lam',
		'audio/x-mpequrl' => 'm3u',
		'audio/x-mid' => [ 'mid', 'midi' ],
		'audio/x-midi' => [ 'mid', 'midi' ],
		'audio/x-mpeg-3' => 'mp3',
		'audio/x-mod' => 'mod',
		'audio/x-mpeg' => 'mp2',
		'audio/x-nspaudio' => [ 'lma', 'la' ],
		'audio/x-psid' => 'sid',
		'audio/x-pn-realaudio' => [ 'ra', 'ram', 'rm', 'rmm', 'rmp' ],
		'audio/x-pn-realaudio-plugin' => [ 'ra', 'rmp', 'rpm' ],
		'audio/x-realaudio' => 'ra',
		'audio/x-twinvq-plugin' => 'vqe',
		'audio/x-twinvq-plugin' => 'vql',
		'audio/x-twinvq' => 'vqf',
		'audio/x-vnd.audioexplosion.mjuicemediafile' => 'mjf',
		'audio/x-voc' => 'voc',
		'audio/x-wav' => 'wav',

		// V??deo
		'video/x-ms-asf-plugin' => 'asx',
		'video/avi' => 'avi',
		'video/msvideo' => 'avi',
		'video/x-msvideo' => 'avi',
		'video/x-ms-asf' => [ 'asf', 'asx' ],
		'video/avs-video' => 'avs',
		'video/dl' => 'dl',
		'video/x-dl' => 'dl',
		'video/x-dv' => [ 'dif', 'dv' ],
		'video/fli' => 'fli',
		'video/x-fli' => 'fli',
		'video/x-atomic3d-feature' => 'fmf',
		'video/gl' => 'gl',
		'video/x-gl' => 'gl',
		'video/x-isvideo' => 'isu',

		'drawing/x-dwf (old)' => 'dwf',
		'multipart/x-gzip' => 'gzip',
		'model/iges' => 'iges',
		'model/vnd.dwf' => 'dwf',
		'model/iges' => 'igs',
		'i-world/i-vrml' => 'ivr',
		'tbnl	image/jpeg' => 'jfif',

		// Image
		'image/x-jg' => 'art',
		'image/bmp' => [ 'bm', 'bmp' ],
		'image/x-windows-bmp' => 'bmp',
		'image/x-icon' => 'ico',
		'image/vnd.dwg' => 'dwg',
		'image/x-dwg' => [ 'dwg', 'dxf' ],
		'image/vnd.dwg' => 'dxf',
		'image/fif' => 'fif',
		'image/florian' => 'flo',
		'image/vnd.fpx' => 'fpx',
		'image/vnd.net-fpx' => 'fpx',
		'image/g3fax' => 'g3',
		'image/gif' => 'gif',
		'image/ief' => [ 'ief', 'iefs' ],
		'image/jpeg' => [ 'jpeg', 'jfif', 'jpe', 'jpg' ],
		'image/x-jps' => 'jps',
		'image/naplps' => [ 'nap', 'naplps' ],
		'image/x-niff' => [ 'nif', 'niff' ],
		'image/png' => 'png',
		'image/x-portable-bitmap' => 'pbm',
		'image/x-pict' => 'pct',
		'image/x-pcx' => 'pcx',
		'image/jutvision' => 'jut',
		'image/x-portable-graymap' => 'pgm',
		'image/x-portable-greymap' => 'pgm',
		'image/pict' => 'pic',
		'image/pict' => 'pict',
		'image/x-xbm' => 'xbm',
		'image/xbm' => 'xbm',
		'image/x-xpixmap' => 'xpm',
		'image/x-xwd' => 'xwd',
		'image/x-xwindowdump' => 'xwd',
		'image/xpm' => 'xpm',
		'image/vnd.xiff' => 'xif',
		'image/x-xbitmap' => 'xbm',
		'image/vnd.wap.wbmp' => 'wbmp',
		'image/florian' => 'turbot',
		'image/tiff' => 'tif',
		'image/x-tiff' => 'tif',
		'image/tiff' => 'tiff',
		'image/x-tiff' => 'tiff',
		'image/vnd.dwg' => 'svf',
		'image/x-dwg' => 'svf',
		'image/vnd.rn-realpix' => 'rp',
		'image/cmu-raster' => 'ras',
		'image/x-cmu-raster' => 'ras',
		'image/cmu-raster' => 'rast',
		'image/vnd.rn-realflash' => 'rf',
		'image/x-rgb' => 'rgb',
		'image/x-quicktime' => 'qif',
		'image/x-quicktime' => 'qti',
		'image/x-quicktime' => 'qtif',
		'image/x-portable-anymap' => 'pnm',
		'image/x-xpixmap' => 'pm',
		'image/vasa' => 'mcf',

		'video/mpeg' => [ 'm1v', 'm2v' ],
		'message/rfc822' => 'mht',
		'message/rfc822' => 'mhtml',
		'music/crescendo' => 'mid',
		'music/x-karaoke' => 'kar',
		'music/crescendo' => 'midi',
		'message/rfc822' => 'mime',
		'www/mime' => 'mime',
		'chemical/x-pdb' => 'pdb',
		'application/pdf' => 'pdf',
		'model/x-pov' => 'pov',
		'image/x-portable-pixmap' => 'ppm',
		'paleovu/x-pv' => 'pvu',
		'text/x-script.sh' => 'sh',
		'multipart/x-ustar' => 'ustar',
		'application/x-vrml' => 'vrml',
		'model/vrml' => 'vrml',
		'windows/metafile' => 'wmf',
		'model/vrml' => 'wrl',
		'model/vrml' => 'wrz',
		'xgl/drawing' => 'xgz',
		'audio/xm' => 'xm',
		'xgl/movie' => 'xmz',
		'chemical/x-pdb' => 'xyz',
		'multipart/x-zip' => 'zip',

		// Text
		'text/asp' => 'asp',
		'text/css' => 'css',
		'text/ecmascript' => 'js',
		'text/html' => [ 'htm', 'html', 'htx', 'htmls', 'acgi', 'shtml' ],
		'text/javascript' => 'js',
		'text/mcf' => 'mcf',
		'text/plain' => [ 'h', 'f', 'hh', 'g', 'java', 'lst', 'm', 'jav', 'list', 'log', 'mar', 'idc' ],
		'text/pascal' => 'pas',
		'text/plain' => [ 'f90', 'cxx','def','com', 'conf', 'txt', 'c', 'cc', 'for', 'text', 'pl', 'sdml' ],
		'text/richtext' => [ 'rtf', 'rtx', 'rt' ],
		'text/scriplet' => 'wsc',
		'text/sgml' => [ 'sgm', 'sgml' ],
		'text/tab-separated-values' => 'tsv',
		'text/uri-list' => [ 'uri', 'uris', 'uni', 'unis' ],
		'text/vnd.rn-realtext' => 'rt',
		'text/vnd.abc' => 'abc',
		'text/vnd.fmi.flexstor' => 'flx',
		'text/vnd.wap.wml' => 'wml',
		'text/vnd.wap.wmlscript' => 'wmls',
		'text/webviewhtml' => 'htt',
		'text/xml' => 'xml',
		'text/x-asm' => 'asm',
		'text/x-audiosoft-intra' => 'aip',
		'text/x-c' => [ 'cpp', 'c', 'cc' ],
		'text/x-script.csh' => 'csh',
		'text/x-java-source' => [ 'jav', 'java' ],
		'text/x-script.ksh' => 'ksh',
		'text/x-script.lisp' => 'lsp',
		'text/x-la-asf' => 'lsx',
		'text/x-m' => 'm',
		'text/x-pascal' => 'p',
		'text/x-script.zsh' => 'zsh',
		'text/x-uuencode' => 'uu',
		'text/x-uuencode' => 'uue',
		'text/x-vcalendar' => 'vcs',
		'text/x-uil' => 'uil',
		'text/x-speech' => 'talk',
		'text/x-script.tcl' => 'tcl',
		'text/x-script.tcsh' => 'tcsh',
		'text/x-sgml' => 'sgm',
		'text/x-fortran' => 'for',
		'text/x-script.elisp' => 'el',
		'text/x-setext' => 'etx',
		'text/x-fortran' => [ 'f', 'f77', 'f90' ],
		'text/x-h' => [ 'h', 'hh' ],
		'text/x-script' => 'hlb',
		'text/x-component' => 'htc',
		'text/x-script.rexx' => 'rexx',
		'text/x-server-parsed-html' => 'shtml',
		'text/x-speech' => 'spc',
		'text/x-server-parsed-html' => 'ssi',
		'text/x-script.phyton' => 'py',
		'text/x-sgml' => 'sgml',
		'text/x-script.guile' => 'scm',
		'text/x-script.scheme' => 'scm',
		'text/x-asm' => 's',
		'text/x-script.perl-module' => 'pm',
		'text/x-script.perl' => 'pl',

		// V??deo
		'video/animaflex' => 'afl',
		'video/quicktime' => 'moov',
		'video/quicktime' => 'mov',
		'video/mpeg' => [ 'mp2', 'mp4', 'mpa', 'mpe', 'mpeg', 'mpg' ],
		'video/quicktime' => 'qt',
		'video/vnd.rn-realvideo' => 'rv',
		'video/vdo' => 'vdo',
		'video/vivo' => [ 'viv', 'vivo' ],
		'video/vnd.vivo' => [ 'viv', 'vivo' ],
		'video/vosaic' => 'vos',
		'video/x-amt-demorun' => 'xdr',
		'video/x-amt-showrun' => 'xsr',
		'video/x-motion-jpeg' => 'mjpg',
		'video/x-mpeq2a' => 'mp2',
		'video/x-mpeg' => [ 'mp2', 'mp4' ],
		'video/x-qtc' => 'qtc',
		'video/x-sgi-movie' => [ 'movie', 'mv' ],
		'video/x-scm' => 'scm',

		// Xs
		// 'x-music/x-midi' => [ 'midi', 'mid' ],
		//'image/x-png' => 'png',
		// 'x-world/x-3dmf' => [ 'qd3', 'qd3d' ],
		// 'x-world/x-svr' => 'svr',
		// 'x-world/x-vrt' => 'vrt',
		// 'x-world/x-vrml' => [ 'vrml', 'wrl', 'wrz' ],
		// 'x-world/x-3dmf' => [ '3dm', '3dmf' ],
		// 'x-conference/x-cooltalk' => 'ice',

	];
	if( !$search ) return $types;

	if( $revert ):
		
		$return = _array_get( $types, $search );
		if( !is_array( $return ) ):
			$return = [ $return ];
		endif;
	
	else:

		// Searching
		if( !is_array( $search ) ) $search = [ $search ];

		$return = [];
		foreach( $types as $key => $exts ):

			// Allways array
			if( !is_array( $exts ) ):
				$exts = [ $exts ];
			endif;			
			$has = array_intersect( $search, $exts );
			if( !empty( $has ) ):
				$return[] = $key;
			endif;		

		endforeach;

	endif;

	return empty( $return ) ? false : $return;

}
