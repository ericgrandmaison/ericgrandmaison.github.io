/*!
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * v4.0.11-development - 2015-01-28
 *
 *//**
 * @title WET-BOEW JQuery Helper Methods
 * @overview Helper methods for WET
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author WET Community
 * Credits: http://kaibun.net/blog/2013/04/19/a-fully-fledged-coffeescript-boilerplate-for-jquery-plugins/
 */
(function( $, wb ) {
	wb.getData = function( element, dataName ) {
		var elm = !element.jquery ? element : element[ 0 ],
			dataAttr = elm.getAttribute( "data-" + dataName ),
			dataObj;

		if ( dataAttr ) {
			try {
				dataObj = JSON.parse( dataAttr );
				$.data( elm, dataName, dataObj );
			} catch ( error ) {
				$.error( "Bad JSON array in data-" + dataName + " attribute" );
			}
		}

		return dataObj;
	};
})( jQuery, wb );

(function( wb ) {
	"use strict";

	// Escapes the characters in a string for use in a jQuery selector
	// Based on http://totaldev.com/content/escaping-characters-get-valid-jquery-id
	wb.jqEscape = function( selector ) {
		return selector.replace( /([;&,\.\+\*\~':"\!\^\/#$%@\[\]\(\)=>\|])/g, "\\$1" );
	};

	// RegEx used by formattedNumCompare
	wb.formattedNumCompareRegEx = /(<[^>]*>|[^\d\.])/g;

	// Compares two formatted numbers (e.g., 1.2.12 or 1,000,345)
	wb.formattedNumCompare = function( a, b ) {
		var regEx = wb.formattedNumCompareRegEx,
			aMultiple = a.indexOf( "-" ) === -1 ? 1 : -1,
			aNumbers = ( ( a === "-" || a === "" ) ? "0" : a.replace( regEx, "" ) ).split( "." ),
			bMultiple = b.indexOf( "-" ) === -1 ? 1 : -1,
			bNumbers = ( ( b === "-" || b === "" ) ? "0" : b.replace( regEx, "" ) ).split( "." ),
			len = aNumbers.length,
			i, result;

		for ( i = 0; i !== len; i += 1 ) {
			result = parseInt( aNumbers[ i ], 10 ) * aMultiple - parseInt( bNumbers[ i ], 10 ) * bMultiple;
			if ( result !== 0 ) {
				break;
			}
		}
		return result;
	};

	// Compare two strings with special characters (e.g., Cyrillic or Chinese characters)
	wb.i18nTextCompare = function( a, b ) {
		return wb.normalizeDiacritics( a ).localeCompare( wb.normalizeDiacritics( b ) );
	};

	// Based upon https://gist.github.com/instanceofme/1731620
	// Licensed under WTFPL v2 http://sam.zoy.org/wtfpl/COPYING
	wb.normalizeDiacritics = function( str ) {
		var diacritics = {
				"\u24B6": "A",
				"\uFF21": "A",
				"\u00C0": "A",
				"\u00C1": "A",
				"\u00C2": "A",
				"\u1EA6": "A",
				"\u1EA4": "A",
				"\u1EAA": "A",
				"\u1EA8": "A",
				"\u00C3": "A",
				"\u0100": "A",
				"\u0102": "A",
				"\u1EB0": "A",
				"\u1EAE": "A",
				"\u1EB4": "A",
				"\u1EB2": "A",
				"\u0226": "A",
				"\u01E0": "A",
				"\u00C4": "A",
				"\u01DE": "A",
				"\u1EA2": "A",
				"\u00C5": "A",
				"\u01FA": "A",
				"\u01CD": "A",
				"\u0200": "A",
				"\u0202": "A",
				"\u1EA0": "A",
				"\u1EAC": "A",
				"\u1EB6": "A",
				"\u1E00": "A",
				"\u0104": "A",
				"\u023A": "A",
				"\u2C6F": "A",
				"\uA732": "AA",
				"\u00C6": "AE",
				"\u01FC": "AE",
				"\u01E2": "AE",
				"\uA734": "AO",
				"\uA736": "AU",
				"\uA738": "AV",
				"\uA73A": "AV",
				"\uA73C": "AY",
				"\u24B7": "B",
				"\uFF22": "B",
				"\u1E02": "B",
				"\u1E04": "B",
				"\u1E06": "B",
				"\u0243": "B",
				"\u0182": "B",
				"\u0181": "B",
				"\u24B8": "C",
				"\uFF23": "C",
				"\u0106": "C",
				"\u0108": "C",
				"\u010A": "C",
				"\u010C": "C",
				"\u00C7": "C",
				"\u1E08": "C",
				"\u0187": "C",
				"\u023B": "C",
				"\uA73E": "C",
				"\u24B9": "D",
				"\uFF24": "D",
				"\u1E0A": "D",
				"\u010E": "D",
				"\u1E0C": "D",
				"\u1E10": "D",
				"\u1E12": "D",
				"\u1E0E": "D",
				"\u0110": "D",
				"\u018B": "D",
				"\u018A": "D",
				"\u0189": "D",
				"\uA779": "D",
				"\u01F1": "DZ",
				"\u01C4": "DZ",
				"\u01F2": "Dz",
				"\u01C5": "Dz",
				"\u24BA": "E",
				"\uFF25": "E",
				"\u00C8": "E",
				"\u00C9": "E",
				"\u00CA": "E",
				"\u1EC0": "E",
				"\u1EBE": "E",
				"\u1EC4": "E",
				"\u1EC2": "E",
				"\u1EBC": "E",
				"\u0112": "E",
				"\u1E14": "E",
				"\u1E16": "E",
				"\u0114": "E",
				"\u0116": "E",
				"\u00CB": "E",
				"\u1EBA": "E",
				"\u011A": "E",
				"\u0204": "E",
				"\u0206": "E",
				"\u1EB8": "E",
				"\u1EC6": "E",
				"\u0228": "E",
				"\u1E1C": "E",
				"\u0118": "E",
				"\u1E18": "E",
				"\u1E1A": "E",
				"\u0190": "E",
				"\u018E": "E",
				"\u24BB": "F",
				"\uFF26": "F",
				"\u1E1E": "F",
				"\u0191": "F",
				"\uA77B": "F",
				"\u24BC": "G",
				"\uFF27": "G",
				"\u01F4": "G",
				"\u011C": "G",
				"\u1E20": "G",
				"\u011E": "G",
				"\u0120": "G",
				"\u01E6": "G",
				"\u0122": "G",
				"\u01E4": "G",
				"\u0193": "G",
				"\uA7A0": "G",
				"\uA77D": "G",
				"\uA77E": "G",
				"\u24BD": "H",
				"\uFF28": "H",
				"\u0124": "H",
				"\u1E22": "H",
				"\u1E26": "H",
				"\u021E": "H",
				"\u1E24": "H",
				"\u1E28": "H",
				"\u1E2A": "H",
				"\u0126": "H",
				"\u2C67": "H",
				"\u2C75": "H",
				"\uA78D": "H",
				"\u24BE": "I",
				"\uFF29": "I",
				"\u00CC": "I",
				"\u00CD": "I",
				"\u00CE": "I",
				"\u0128": "I",
				"\u012A": "I",
				"\u012C": "I",
				"\u0130": "I",
				"\u00CF": "I",
				"\u1E2E": "I",
				"\u1EC8": "I",
				"\u01CF": "I",
				"\u0208": "I",
				"\u020A": "I",
				"\u1ECA": "I",
				"\u012E": "I",
				"\u1E2C": "I",
				"\u0197": "I",
				"\u24BF": "J",
				"\uFF2A": "J",
				"\u0134": "J",
				"\u0248": "J",
				"\u24C0": "K",
				"\uFF2B": "K",
				"\u1E30": "K",
				"\u01E8": "K",
				"\u1E32": "K",
				"\u0136": "K",
				"\u1E34": "K",
				"\u0198": "K",
				"\u2C69": "K",
				"\uA740": "K",
				"\uA742": "K",
				"\uA744": "K",
				"\uA7A2": "K",
				"\u24C1": "L",
				"\uFF2C": "L",
				"\u013F": "L",
				"\u0139": "L",
				"\u013D": "L",
				"\u1E36": "L",
				"\u1E38": "L",
				"\u013B": "L",
				"\u1E3C": "L",
				"\u1E3A": "L",
				"\u0141": "L",
				"\u023D": "L",
				"\u2C62": "L",
				"\u2C60": "L",
				"\uA748": "L",
				"\uA746": "L",
				"\uA780": "L",
				"\u01C7": "LJ",
				"\u01C8": "Lj",
				"\u24C2": "M",
				"\uFF2D": "M",
				"\u1E3E": "M",
				"\u1E40": "M",
				"\u1E42": "M",
				"\u2C6E": "M",
				"\u019C": "M",
				"\u24C3": "N",
				"\uFF2E": "N",
				"\u01F8": "N",
				"\u0143": "N",
				"\u00D1": "N",
				"\u1E44": "N",
				"\u0147": "N",
				"\u1E46": "N",
				"\u0145": "N",
				"\u1E4A": "N",
				"\u1E48": "N",
				"\u0220": "N",
				"\u019D": "N",
				"\uA790": "N",
				"\uA7A4": "N",
				"\u01CA": "NJ",
				"\u01CB": "Nj",
				"\u24C4": "O",
				"\uFF2F": "O",
				"\u00D2": "O",
				"\u00D3": "O",
				"\u00D4": "O",
				"\u1ED2": "O",
				"\u1ED0": "O",
				"\u1ED6": "O",
				"\u1ED4": "O",
				"\u00D5": "O",
				"\u1E4C": "O",
				"\u022C": "O",
				"\u1E4E": "O",
				"\u014C": "O",
				"\u1E50": "O",
				"\u1E52": "O",
				"\u014E": "O",
				"\u022E": "O",
				"\u0230": "O",
				"\u00D6": "O",
				"\u022A": "O",
				"\u1ECE": "O",
				"\u0150": "O",
				"\u01D1": "O",
				"\u020C": "O",
				"\u020E": "O",
				"\u01A0": "O",
				"\u1EDC": "O",
				"\u1EDA": "O",
				"\u1EE0": "O",
				"\u1EDE": "O",
				"\u1EE2": "O",
				"\u1ECC": "O",
				"\u1ED8": "O",
				"\u01EA": "O",
				"\u01EC": "O",
				"\u00D8": "O",
				"\u01FE": "O",
				"\u0186": "O",
				"\u019F": "O",
				"\uA74A": "O",
				"\uA74C": "O",
				"\u0152": "OE",
				"\u01A2": "OI",
				"\uA74E": "OO",
				"\u0222": "OU",
				"\u24C5": "P",
				"\uFF30": "P",
				"\u1E54": "P",
				"\u1E56": "P",
				"\u01A4": "P",
				"\u2C63": "P",
				"\uA750": "P",
				"\uA752": "P",
				"\uA754": "P",
				"\u24C6": "Q",
				"\uFF31": "Q",
				"\uA756": "Q",
				"\uA758": "Q",
				"\u024A": "Q",
				"\u24C7": "R",
				"\uFF32": "R",
				"\u0154": "R",
				"\u1E58": "R",
				"\u0158": "R",
				"\u0210": "R",
				"\u0212": "R",
				"\u1E5A": "R",
				"\u1E5C": "R",
				"\u0156": "R",
				"\u1E5E": "R",
				"\u024C": "R",
				"\u2C64": "R",
				"\uA75A": "R",
				"\uA7A6": "R",
				"\uA782": "R",
				"\u24C8": "S",
				"\uFF33": "S",
				"\u015A": "S",
				"\u1E64": "S",
				"\u015C": "S",
				"\u1E60": "S",
				"\u0160": "S",
				"\u1E66": "S",
				"\u1E62": "S",
				"\u1E68": "S",
				"\u0218": "S",
				"\u015E": "S",
				"\u2C7E": "S",
				"\uA7A8": "S",
				"\uA784": "S",
				"\u1E9E": "SS",
				"\u24C9": "T",
				"\uFF34": "T",
				"\u1E6A": "T",
				"\u0164": "T",
				"\u1E6C": "T",
				"\u021A": "T",
				"\u0162": "T",
				"\u1E70": "T",
				"\u1E6E": "T",
				"\u0166": "T",
				"\u01AC": "T",
				"\u01AE": "T",
				"\u023E": "T",
				"\uA786": "T",
				"\uA728": "TZ",
				"\u24CA": "U",
				"\uFF35": "U",
				"\u00D9": "U",
				"\u00DA": "U",
				"\u00DB": "U",
				"\u0168": "U",
				"\u1E78": "U",
				"\u016A": "U",
				"\u1E7A": "U",
				"\u016C": "U",
				"\u00DC": "U",
				"\u01DB": "U",
				"\u01D7": "U",
				"\u01D5": "U",
				"\u01D9": "U",
				"\u1EE6": "U",
				"\u016E": "U",
				"\u0170": "U",
				"\u01D3": "U",
				"\u0214": "U",
				"\u0216": "U",
				"\u01AF": "U",
				"\u1EEA": "U",
				"\u1EE8": "U",
				"\u1EEE": "U",
				"\u1EEC": "U",
				"\u1EF0": "U",
				"\u1EE4": "U",
				"\u1E72": "U",
				"\u0172": "U",
				"\u1E76": "U",
				"\u1E74": "U",
				"\u0244": "U",
				"\u24CB": "V",
				"\uFF36": "V",
				"\u1E7C": "V",
				"\u1E7E": "V",
				"\u01B2": "V",
				"\uA75E": "V",
				"\u0245": "V",
				"\uA760": "VY",
				"\u24CC": "W",
				"\uFF37": "W",
				"\u1E80": "W",
				"\u1E82": "W",
				"\u0174": "W",
				"\u1E86": "W",
				"\u1E84": "W",
				"\u1E88": "W",
				"\u2C72": "W",
				"\u24CD": "X",
				"\uFF38": "X",
				"\u1E8A": "X",
				"\u1E8C": "X",
				"\u24CE": "Y",
				"\uFF39": "Y",
				"\u1EF2": "Y",
				"\u00DD": "Y",
				"\u0176": "Y",
				"\u1EF8": "Y",
				"\u0232": "Y",
				"\u1E8E": "Y",
				"\u0178": "Y",
				"\u1EF6": "Y",
				"\u1EF4": "Y",
				"\u01B3": "Y",
				"\u024E": "Y",
				"\u1EFE": "Y",
				"\u24CF": "Z",
				"\uFF3A": "Z",
				"\u0179": "Z",
				"\u1E90": "Z",
				"\u017B": "Z",
				"\u017D": "Z",
				"\u1E92": "Z",
				"\u1E94": "Z",
				"\u01B5": "Z",
				"\u0224": "Z",
				"\u2C7F": "Z",
				"\u2C6B": "Z",
				"\uA762": "Z",
				"\u24D0": "a",
				"\uFF41": "a",
				"\u1E9A": "a",
				"\u00E0": "a",
				"\u00E1": "a",
				"\u00E2": "a",
				"\u1EA7": "a",
				"\u1EA5": "a",
				"\u1EAB": "a",
				"\u1EA9": "a",
				"\u00E3": "a",
				"\u0101": "a",
				"\u0103": "a",
				"\u1EB1": "a",
				"\u1EAF": "a",
				"\u1EB5": "a",
				"\u1EB3": "a",
				"\u0227": "a",
				"\u01E1": "a",
				"\u00E4": "a",
				"\u01DF": "a",
				"\u1EA3": "a",
				"\u00E5": "a",
				"\u01FB": "a",
				"\u01CE": "a",
				"\u0201": "a",
				"\u0203": "a",
				"\u1EA1": "a",
				"\u1EAD": "a",
				"\u1EB7": "a",
				"\u1E01": "a",
				"\u0105": "a",
				"\u2C65": "a",
				"\u0250": "a",
				"\uA733": "aa",
				"\u00E6": "ae",
				"\u01FD": "ae",
				"\u01E3": "ae",
				"\uA735": "ao",
				"\uA737": "au",
				"\uA739": "av",
				"\uA73B": "av",
				"\uA73D": "ay",
				"\u24D1": "b",
				"\uFF42": "b",
				"\u1E03": "b",
				"\u1E05": "b",
				"\u1E07": "b",
				"\u0180": "b",
				"\u0183": "b",
				"\u0253": "b",
				"\u24D2": "c",
				"\uFF43": "c",
				"\u0107": "c",
				"\u0109": "c",
				"\u010B": "c",
				"\u010D": "c",
				"\u00E7": "c",
				"\u1E09": "c",
				"\u0188": "c",
				"\u023C": "c",
				"\uA73F": "c",
				"\u2184": "c",
				"\u24D3": "d",
				"\uFF44": "d",
				"\u1E0B": "d",
				"\u010F": "d",
				"\u1E0D": "d",
				"\u1E11": "d",
				"\u1E13": "d",
				"\u1E0F": "d",
				"\u0111": "d",
				"\u018C": "d",
				"\u0256": "d",
				"\u0257": "d",
				"\uA77A": "d",
				"\u01F3": "dz",
				"\u01C6": "dz",
				"\u24D4": "e",
				"\uFF45": "e",
				"\u00E8": "e",
				"\u00E9": "e",
				"\u00EA": "e",
				"\u1EC1": "e",
				"\u1EBF": "e",
				"\u1EC5": "e",
				"\u1EC3": "e",
				"\u1EBD": "e",
				"\u0113": "e",
				"\u1E15": "e",
				"\u1E17": "e",
				"\u0115": "e",
				"\u0117": "e",
				"\u00EB": "e",
				"\u1EBB": "e",
				"\u011B": "e",
				"\u0205": "e",
				"\u0207": "e",
				"\u1EB9": "e",
				"\u1EC7": "e",
				"\u0229": "e",
				"\u1E1D": "e",
				"\u0119": "e",
				"\u1E19": "e",
				"\u1E1B": "e",
				"\u0247": "e",
				"\u025B": "e",
				"\u01DD": "e",
				"\u24D5": "f",
				"\uFF46": "f",
				"\u1E1F": "f",
				"\u0192": "f",
				"\uA77C": "f",
				"\u24D6": "g",
				"\uFF47": "g",
				"\u01F5": "g",
				"\u011D": "g",
				"\u1E21": "g",
				"\u011F": "g",
				"\u0121": "g",
				"\u01E7": "g",
				"\u0123": "g",
				"\u01E5": "g",
				"\u0260": "g",
				"\uA7A1": "g",
				"\u1D79": "g",
				"\uA77F": "g",
				"\u24D7": "h",
				"\uFF48": "h",
				"\u0125": "h",
				"\u1E23": "h",
				"\u1E27": "h",
				"\u021F": "h",
				"\u1E25": "h",
				"\u1E29": "h",
				"\u1E2B": "h",
				"\u1E96": "h",
				"\u0127": "h",
				"\u2C68": "h",
				"\u2C76": "h",
				"\u0265": "h",
				"\u0195": "hv",
				"\u24D8": "i",
				"\uFF49": "i",
				"\u00EC": "i",
				"\u00ED": "i",
				"\u00EE": "i",
				"\u0129": "i",
				"\u012B": "i",
				"\u012D": "i",
				"\u00EF": "i",
				"\u1E2F": "i",
				"\u1EC9": "i",
				"\u01D0": "i",
				"\u0209": "i",
				"\u020B": "i",
				"\u1ECB": "i",
				"\u012F": "i",
				"\u1E2D": "i",
				"\u0268": "i",
				"\u0131": "i",
				"\u24D9": "j",
				"\uFF4A": "j",
				"\u0135": "j",
				"\u01F0": "j",
				"\u0249": "j",
				"\u24DA": "k",
				"\uFF4B": "k",
				"\u1E31": "k",
				"\u01E9": "k",
				"\u1E33": "k",
				"\u0137": "k",
				"\u1E35": "k",
				"\u0199": "k",
				"\u2C6A": "k",
				"\uA741": "k",
				"\uA743": "k",
				"\uA745": "k",
				"\uA7A3": "k",
				"\u24DB": "l",
				"\uFF4C": "l",
				"\u0140": "l",
				"\u013A": "l",
				"\u013E": "l",
				"\u1E37": "l",
				"\u1E39": "l",
				"\u013C": "l",
				"\u1E3D": "l",
				"\u1E3B": "l",
				"\u0142": "l",
				"\u019A": "l",
				"\u026B": "l",
				"\u2C61": "l",
				"\uA749": "l",
				"\uA781": "l",
				"\uA747": "l",
				"\u01C9": "lj",
				"\u24DC": "m",
				"\uFF4D": "m",
				"\u1E3F": "m",
				"\u1E41": "m",
				"\u1E43": "m",
				"\u0271": "m",
				"\u026F": "m",
				"\u24DD": "n",
				"\uFF4E": "n",
				"\u01F9": "n",
				"\u0144": "n",
				"\u00F1": "n",
				"\u1E45": "n",
				"\u0148": "n",
				"\u1E47": "n",
				"\u0146": "n",
				"\u1E4B": "n",
				"\u1E49": "n",
				"\u019E": "n",
				"\u0272": "n",
				"\u0149": "n",
				"\uA791": "n",
				"\uA7A5": "n",
				"\u01CC": "nj",
				"\u24DE": "o",
				"\uFF4F": "o",
				"\u00F2": "o",
				"\u00F3": "o",
				"\u00F4": "o",
				"\u1ED3": "o",
				"\u1ED1": "o",
				"\u1ED7": "o",
				"\u1ED5": "o",
				"\u00F5": "o",
				"\u1E4D": "o",
				"\u022D": "o",
				"\u1E4F": "o",
				"\u014D": "o",
				"\u1E51": "o",
				"\u1E53": "o",
				"\u014F": "o",
				"\u022F": "o",
				"\u0231": "o",
				"\u00F6": "o",
				"\u022B": "o",
				"\u1ECF": "o",
				"\u0151": "o",
				"\u01D2": "o",
				"\u020D": "o",
				"\u020F": "o",
				"\u01A1": "o",
				"\u1EDD": "o",
				"\u1EDB": "o",
				"\u1EE1": "o",
				"\u1EDF": "o",
				"\u1EE3": "o",
				"\u1ECD": "o",
				"\u1ED9": "o",
				"\u01EB": "o",
				"\u01ED": "o",
				"\u00F8": "o",
				"\u01FF": "o",
				"\u0254": "o",
				"\uA74B": "o",
				"\uA74D": "o",
				"\u0275": "o",
				"\u0153": "oe",
				"\u0276": "oe",
				"\u01A3": "oi",
				"\u0223": "ou",
				"\uA74F": "oo",
				"\u24DF": "p",
				"\uFF50": "p",
				"\u1E55": "p",
				"\u1E57": "p",
				"\u01A5": "p",
				"\u1D7D": "p",
				"\uA751": "p",
				"\uA753": "p",
				"\uA755": "p",
				"\u24E0": "q",
				"\uFF51": "q",
				"\u024B": "q",
				"\uA757": "q",
				"\uA759": "q",
				"\u24E1": "r",
				"\uFF52": "r",
				"\u0155": "r",
				"\u1E59": "r",
				"\u0159": "r",
				"\u0211": "r",
				"\u0213": "r",
				"\u1E5B": "r",
				"\u1E5D": "r",
				"\u0157": "r",
				"\u1E5F": "r",
				"\u024D": "r",
				"\u027D": "r",
				"\uA75B": "r",
				"\uA7A7": "r",
				"\uA783": "r",
				"\u24E2": "s",
				"\uFF53": "s",
				"\u015B": "s",
				"\u1E65": "s",
				"\u015D": "s",
				"\u1E61": "s",
				"\u0161": "s",
				"\u1E67": "s",
				"\u1E63": "s",
				"\u1E69": "s",
				"\u0219": "s",
				"\u015F": "s",
				"\u023F": "s",
				"\uA7A9": "s",
				"\uA785": "s",
				"\u017F": "s",
				"\u1E9B": "s",
				"\u00DF": "ss",
				"\u24E3": "t",
				"\uFF54": "t",
				"\u1E6B": "t",
				"\u1E97": "t",
				"\u0165": "t",
				"\u1E6D": "t",
				"\u021B": "t",
				"\u0163": "t",
				"\u1E71": "t",
				"\u1E6F": "t",
				"\u0167": "t",
				"\u01AD": "t",
				"\u0288": "t",
				"\u2C66": "t",
				"\uA787": "t",
				"\uA729": "tz",
				"\u24E4": "u",
				"\uFF55": "u",
				"\u00F9": "u",
				"\u00FA": "u",
				"\u00FB": "u",
				"\u0169": "u",
				"\u1E79": "u",
				"\u016B": "u",
				"\u1E7B": "u",
				"\u016D": "u",
				"\u00FC": "u",
				"\u01DC": "u",
				"\u01D8": "u",
				"\u01D6": "u",
				"\u01DA": "u",
				"\u1EE7": "u",
				"\u016F": "u",
				"\u0171": "u",
				"\u01D4": "u",
				"\u0215": "u",
				"\u0217": "u",
				"\u01B0": "u",
				"\u1EEB": "u",
				"\u1EE9": "u",
				"\u1EEF": "u",
				"\u1EED": "u",
				"\u1EF1": "u",
				"\u1EE5": "u",
				"\u1E73": "u",
				"\u0173": "u",
				"\u1E77": "u",
				"\u1E75": "u",
				"\u0289": "u",
				"\u24E5": "v",
				"\uFF56": "v",
				"\u1E7D": "v",
				"\u1E7F": "v",
				"\u028B": "v",
				"\uA75F": "v",
				"\u028C": "v",
				"\uA761": "vy",
				"\u24E6": "w",
				"\uFF57": "w",
				"\u1E81": "w",
				"\u1E83": "w",
				"\u0175": "w",
				"\u1E87": "w",
				"\u1E85": "w",
				"\u1E98": "w",
				"\u1E89": "w",
				"\u2C73": "w",
				"\u24E7": "x",
				"\uFF58": "x",
				"\u1E8B": "x",
				"\u1E8D": "x",
				"\u24E8": "y",
				"\uFF59": "y",
				"\u1EF3": "y",
				"\u00FD": "y",
				"\u0177": "y",
				"\u1EF9": "y",
				"\u0233": "y",
				"\u1E8F": "y",
				"\u00FF": "y",
				"\u1EF7": "y",
				"\u1E99": "y",
				"\u1EF5": "y",
				"\u01B4": "y",
				"\u024F": "y",
				"\u1EFF": "y",
				"\u24E9": "z",
				"\uFF5A": "z",
				"\u017A": "z",
				"\u1E91": "z",
				"\u017C": "z",
				"\u017E": "z",
				"\u1E93": "z",
				"\u1E95": "z",
				"\u01B6": "z",
				"\u0225": "z",
				"\u0240": "z",
				"\u2C6C": "z",
				"\uA763": "z",
				"\uFF10": "0",
				"\u2080": "0",
				"\u24EA": "0",
				"\u2070": "0",
				"\u00B9": "1",
				"\u2474": "1",
				"\u2081": "1",
				"\u2776": "1",
				"\u24F5": "1",
				"\u2488": "1",
				"\u2460": "1",
				"\uFF11": "1",
				"\u00B2": "2",
				"\u2777": "2",
				"\u2475": "2",
				"\uFF12": "2",
				"\u2082": "2",
				"\u24F6": "2",
				"\u2461": "2",
				"\u2489": "2",
				"\u00B3": "3",
				"\uFF13": "3",
				"\u248A": "3",
				"\u2476": "3",
				"\u2083": "3",
				"\u2778": "3",
				"\u24F7": "3",
				"\u2462": "3",
				"\u24F8": "4",
				"\u2463": "4",
				"\u248B": "4",
				"\uFF14": "4",
				"\u2074": "4",
				"\u2084": "4",
				"\u2779": "4",
				"\u2477": "4",
				"\u248C": "5",
				"\u2085": "5",
				"\u24F9": "5",
				"\u2478": "5",
				"\u277A": "5",
				"\u2464": "5",
				"\uFF15": "5",
				"\u2075": "5",
				"\u2479": "6",
				"\u2076": "6",
				"\uFF16": "6",
				"\u277B": "6",
				"\u2086": "6",
				"\u2465": "6",
				"\u24FA": "6",
				"\u248D": "6",
				"\uFF17": "7",
				"\u2077": "7",
				"\u277C": "7",
				"\u24FB": "7",
				"\u248E": "7",
				"\u2087": "7",
				"\u247A": "7",
				"\u2466": "7",
				"\u2467": "8",
				"\u248F": "8",
				"\u24FC": "8",
				"\u247B": "8",
				"\u2078": "8",
				"\uFF18": "8",
				"\u277D": "8",
				"\u2088": "8",
				"\u24FD": "9",
				"\uFF19": "9",
				"\u2490": "9",
				"\u277E": "9",
				"\u247C": "9",
				"\u2089": "9",
				"\u2468": "9",
				"\u2079": "9"
			},
			chars = str.split( "" ),
			len = chars.length,
			normalized = false,
			i, character;
		for ( i = 0; i !== len; i += 1 ) {
			character = chars[ i ];
			if ( diacritics.hasOwnProperty( character ) ) {
				chars[ i ] = diacritics[ character ];
				normalized = true;
			}
		}
		return ( normalized ? chars.join( "" ) : str );
	};

	/**
	 * @namespace wb.string
	 */
	wb.string = {
		/*
		 * Left-pads a number with zeros.
		 * @memberof wb.string
		 * @param {number} number The original number to pad.
		 * @param {number} length The width of the resulting padded number, not the number of zeros to add to the front of the string.
		 * @return {string} The padded string
		 */
		pad: function( number, length ) {
			var str = number + "",
				diff = length - str.length,
				i;
			for ( i = 0; i !== diff; i += 1 ) {
				str = "0" + str;
			}
			return str;
		}
	};

	/*
	 * A suite of date related functions for easier parsing of dates
	 * @namespace wb.date
	 */
	wb.date = {
		/*
		 * Converts the date to a date-object. The input can be:
		 * <ul>
		 * <li>a Date object: returned without modification.</li>
		 * <li>an array: Interpreted as [year,month,day]. NOTE: month is 0-11.</li>
		 * <li>a number: Interpreted as number of milliseconds since 1 Jan 1970 (a timestamp).</li>
		 * <li>a string: Any format supported by the javascript engine, like 'YYYY/MM/DD', 'MM/DD/YYYY', 'Jan 31 2009' etc.</li>
		 * <li>an object: Interpreted as an object with year, month and date attributes. **NOTE** month is 0-11.</li>
		 * </ul>
		 * @memberof wb.date
		 * @param {Date | number[] | number | string | object} dateValue
		 * @return {Date | NaN}
		 */
		convert: function( dateValue ) {
			var dateConstructor = dateValue.constructor;

			switch ( dateConstructor ) {
			case Date:
				return dateConstructor;
			case Array:
				return new Date( dateValue[ 0 ], dateValue[ 1 ], dateValue[ 2 ] );
			case Number:
			case String:
				return new Date( dateValue );
			default:
				return typeof dateValue === "object" ? new Date( dateValue.year, dateValue.month, dateValue.date ) : NaN;
			}
		},

		/*
		 * Compares two dates (input can be any type supported by the convert function).
		 * @memberof wb.date
		 * @param {Date | number[] | number | string | object} dateValue1
		 * @param {Date | number[] | number | string | object} dateValue2
		 * @return {number | NaN}
		 * @example returns
		 * -1 if dateValue1 < dateValue2
		 * 0 if dateValue1 = dateValue2
		 * 1 if dateValue1 > dateValue2
		 * NaN if dateValue1 or dateValue2 is an illegal date
		 */
		compare: function( dateValue1, dateValue2 ) {
			var convert = wb.date.convert;

			if ( isFinite( dateValue1 = convert( dateValue1 ).valueOf() ) && isFinite( dateValue2 = convert( dateValue2 ).valueOf() ) ) {
				return ( dateValue1 > dateValue2 ) - ( dateValue1 < dateValue2 );
			}
			return NaN;
		},

		/*
		 * Cross-browser safe way of translating a date to ISO format
		 * @memberof wb.date
		 * @param {Date | number[] | number | string | object} dateValue
		 * @param {boolean} withTime Optional. Whether to include the time in the result, or just the date. False if blank.
		 * @return {string}
		 * @example
		 * toDateISO( new Date() )
		 * returns "2012-04-27"
		 * toDateISO( new Date(), true )
		 * returns "2012-04-27 13:46"
		 */
		toDateISO: function( dateValue, withTime ) {
			var date = wb.date.convert( dateValue ),
				pad = wb.string.pad;

			return date.getFullYear() + "-" + pad( date.getMonth() + 1, 2, "0" ) + "-" + pad( date.getDate(), 2, "0" ) +
				( withTime ? " " + pad( date.getHours(), 2, "0" ) + ":" + pad( date.getMinutes(), 2, "0" ) : "" );
		},

		/*
		 * Cross-browser safe way of creating a date object from a date string in ISO format
		 * @memberof wb.date
		 * @param {string} dateISO Date string in ISO format
		 * @return {Date}
		 */
		fromDateISO: function( dateISO ) {
			var date = null;

			if ( dateISO && dateISO.match( /\d{4}-\d{2}-\d{2}/ ) ) {
				date = new Date( dateISO.substr( 0, 4 ), dateISO.substr( 5, 2 ) - 1, dateISO.substr( 8, 2 ), 0, 0, 0, 0 );
			}
			return date;
		}
	};

	/*
	 * Returns a RFC4122 compliant Global Unique ID (GUID).
	 * Originally from http://stackoverflow.com/a/2117523/455535
	 */
	wb.guid = function() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function( replacementChar ) {
			var rand = Math.random() * 16 | 0,
				newChar = replacementChar === "x" ? rand : ( rand & 0x3 | 0x8 );
			return newChar.toString(16);
		});
	};

})( wb );

(function( $, undef ) {
	"use strict";

	var methods,
		settings = {
			"default": "wet-boew"
		};

	methods = {

		init: function( options ) {
			return $.extend( settings, options || {} );
		},

		show: function( onlyAria ) {
			$( this ).each( function() {
				var $elm = $( this );
				$elm.attr( "aria-hidden", "false" );
				if ( onlyAria === undef ) {
					$elm.removeClass( "wb-inv" );
				}
			} );
		},

		hide: function( onlyAria ) {
			$( this )
				.each( function() {
					var $elm = $( this );
					$elm.attr( "aria-hidden", "true" );
					if ( onlyAria === undef ) {
						return $elm.addClass( "wb-inv" );
					}
				} );
		},

		toggle: function( to, from ) {
			$( this )
				.addClass( to )
				.removeClass( from );
		}
	};

	$.fn.wb = function( method ) {

		if ( methods[ method ] ) {
			methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ) );
		} else if ( typeof method === "object" || !method ) {
			methods.init.apply( this, arguments );
		} else {
			$.error( "Method " + method + " does not exist on jquery.wb" );
		}
	};

})( jQuery );

/*
:focusable and :tabable jQuery helper expressions - https://github.com/jquery/jquery-ui/blob/24756a978a977d7abbef5e5bce403837a01d964f/ui/jquery.ui.core.js
*/
(function( $ ) {
	"use strict";

	function focusable( element, isTabIndexNotNaN, visibility ) {
		var map, mapName, img,
			nodeName = element.nodeName.toLowerCase( );
		if ( nodeName === "area" ) {
			map = element.parentNode;
			mapName = map.name;
			if ( !element.href || !mapName || map.nodeName.toLowerCase( ) !== "map" ) {
				return false;
			}
			img = $( "img[usemap=#" + mapName + "]" )[ 0 ];
			return !!img && visible( img );
		}
		if ( visibility ) {
			return ( /input|select|textarea|button|object/.test( nodeName ) ? !element.disabled :
				nodeName === "a" ?
				element.href || isTabIndexNotNaN :
				isTabIndexNotNaN ) &&
			// the element and all of its ancestors must be visible
			visible( element );
		} else {
			return ( /input|select|textarea|button|object/.test( nodeName ) ? !element.disabled :
				nodeName === "a" ?
				element.href || isTabIndexNotNaN :
				isTabIndexNotNaN );
		}
	}

	function visible( element ) {
		return $.expr.filters.visible( element ) && !$( element )
			.parents( )
			.addBack( )
			.filter(function() {
				return $.css( this, "visibility" ) === "hidden";
			})
			.length;
	}

	$.extend( $.expr[ ":" ], {
		data: $.expr.createPseudo ? $.expr.createPseudo(function(dataName ) {
			return function( elem ) {
				return !!$.data( elem, dataName );
			};
		} ) :
		// support: jQuery <1.8

		function( elem, i, match ) {
			return !!$.data( elem, match[ 3 ] );
		},
		focusable: function( element ) {
			return focusable( element, !isNaN( $.attr( element, "tabindex" ) ), true );
		},
		discoverable: function( element ) {
			return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
		},
		tabbable: function( element ) {
			var tabIndex = $.attr( element, "tabindex" ),
				isTabIndexNaN = isNaN( tabIndex );
			return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
		}
	});

})( jQuery );

/**
 * @title WET-BOEW Ajax Fetch [ ajax-fetch ]
 * @overview A basic AjaxLoader wrapper for WET-BOEW
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author WET Community
 */
(function( $, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var $document = wb.doc;

// Event binding
$document.on( "ajax-fetch.wb", function( event ) {

	// TODO: Remove event.element in future versions
	var caller = event.element || event.target,
		fetchOpts = event.fetch,
		fetchData, callerId;

	// Filter out any events triggered by descendants
	if ( caller === event.target || event.currentTarget === event.target ) {

		if ( !caller.id ) {
			caller.id = wb.getId();
		}
		callerId = caller.id;

		$.ajax( fetchOpts )
			.done(function( response, status, xhr ) {
				var responseType = typeof response;

				fetchData = {
					response: response,
					status: status,
					xhr: xhr
				};

				fetchData.pointer = $( "<div id='" + wb.getId() + "' data-type='" + responseType + "' />" )
										.append( responseType === "string" ? response : "" );

				$( "#" + callerId ).trigger({
					type: "ajax-fetched.wb",
					fetch: fetchData
				}, this );
			})
			.fail(function( xhr, status, error ) {
				$( "#" + callerId ).trigger({
					type: "ajax-failed.wb",
					fetch: {
						xhr: xhr,
						status: status,
						error: error
					}
				}, this );
			}, this );
	}
});

})( jQuery, wb );

/**
 * @title WET-BOEW Events Calendar
 * @overview Dynamically generates a calendar interface for navigating a list of events.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author WET Community
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "wb-calevt",
	selector = "." + componentName,
	initEvent = "wb-init" + selector,
	evDetails = "ev-details",
	$document = wb.doc,
	i18n, i18nText,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered this handler
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector ),
			$elm;

		if ( elm ) {
			$elm = $( elm );

			// Only initialize the i18nText once
			if ( !i18nText ) {
				i18n = wb.i18n;
				i18nText = {
					monthNames: i18n( "mnths" ),
					calendar: i18n( "cal" )
				};
			}

			// Load ajax content
			$.when.apply( $, $.map( $elm.find( "[data-calevt]" ), getAjax ) )
				.always( function() {
					processEvents( $elm );

					// Identify that initialization has completed
					wb.ready( $elm, componentName );
				});
		}
	},

	getAjax = function( ajaxContainer ) {
		var $ajaxContainer = $( ajaxContainer ),
			urls = $ajaxContainer.data( "calevt" ).split( /\s+/ ),
			dfd = $.Deferred(),
			len = urls.length,
			promises = [],
			i, appendData;

		appendData = function( data ) {
			$ajaxContainer.append( $.trim( data ) );
		};

		for ( i = 0; i < len; i += 1 ) {
			promises.push( $.get( urls[ i ], appendData, "html" ) );
		}

		$.when.apply( $, promises ).always(function() {
			dfd.resolve();
		});

		return dfd.promise();
	},

	processEvents = function( $elm ) {
		var date = new Date(),
			year = date.getFullYear(),
			month = date.getMonth(),
			elmYear = $elm.find( ".year" ),
			elmMonth = $elm.find( ".month" ),
			events, containerId, $container;

		if ( elmYear.length > 0 && elmMonth.length > 0 ) {

			// We are going to assume this is always a number.
			year = elmYear.text();

			month = elmMonth.hasClass( "textformat" ) ? $.inArray( elmMonth.text(), i18nText.monthNames ) : elmMonth.text() - 1;
		}

		events = getEvents( $elm );
		containerId = $elm.data( "calevtSrc" );
		$container = $( "#" + containerId )
			.addClass( componentName + "-cal" )
			.data( "calEvents", events );

		$document.trigger( "create.wb-cal", [
				containerId,
				year,
				month,
				true,
				events.minDate,
				events.maxDate
			]
		);
		$container.attr( "aria-label", i18nText.calendar );
	},

	daysBetween = function( dateLow, dateHigh ) {

		// Simplified conversion to date object
		var date1 = wb.date.convert( dateLow ),
			date2 = wb.date.convert( dateHigh ),
			dstAdjust = 0,
			oneMinute = 1000 * 60,
			oneDay = oneMinute * 60 * 24,
			diff;

		// Equalize times in case date objects have them
		date1.setHours( 0 );
		date1.setMinutes( 0 );
		date1.setSeconds( 0 );
		date2.setHours( 0 );
		date2.setMinutes( 0 );
		date2.setSeconds( 0 );

		// Take care of spans across Daylight Saving Time changes
		if ( date2 > date1 ) {
			dstAdjust = ( date2.getTimezoneOffset() - date1.getTimezoneOffset() ) * oneMinute;
		} else {
			dstAdjust = ( date1.getTimezoneOffset() - date2.getTimezoneOffset() ) * oneMinute;
		}
		diff = Math.abs( date2.getTime() - date1.getTime() ) - dstAdjust;
		return Math.ceil( diff / oneDay );
	},

	getEvents = function( obj ) {
		var directLinking = !( $( obj ).hasClass( "evt-anchor" ) ),
			events = {
				minDate: null,
				maxDate: null,
				iCount: 0,
				list: [
					{
						a: 1
					}
				]
			},
			objEventsList = obj.find( "ol > li, ul > li" ),
			iLen = objEventsList.length,
			dateTimeRegExp = /datetime\s+\{date\:\s*(\d+-\d+-\d+)\}/,
			i, $event, event, $objTitle, title, link, href, target,
			linkId, date, tCollection, tCollectionTemp,	strDate1,
			strDate2, z, zLen, className, dateClass;

		for ( i = 0; i !== iLen; i += 1 ) {
			$event = objEventsList.eq( i );
			event = $event[ 0 ];
			$objTitle = $event.find( "*:header:first" ),
			className = $objTitle.attr( "class" ),
			title = $objTitle.text(),
			link = $event.find( "a" )[ 0 ],
			href = link.getAttribute( "href" );
			target = link.getAttribute( "target" );
			zLen = 1;

			/*
			 * Modification direct-linking or page-linking
			 *	- added the ability  to have class set the behaviour of the links
			 *	- default is to use the link of the item as the event link in the calendar
			 *	- 'evt-anchor' class dynamically generates page anchors on the links it maps to the event
			 */
			if ( !directLinking ) {
				linkId = event.id || wb.getId();
				event.id = linkId;

				/*
				 * Fixes IE tabbing error:
				 * http://www.earthchronicle.com/ECv1point8/Accessibility01IEAnchoredKeyboardNavigation.aspx
				 */
				// TODO: Which versions of IE should this fix be limited to?
				if ( wb.ie ) {
					event.tabIndex = "-1";
				}
				href = "#" + linkId;
			}

			date = new Date();
			date.setHours( 0, 0, 0, 0 );
			tCollection = event.getElementsByTagName( "time" );

			/*
			 * Date spanning capability
			 *   - since there may be some dates that are capable of spanning over months we need to identify them
			 *     the process is see how many time nodes are in the event. 2 nodes will trigger a span
			 */
			if ( tCollection.length !== 0 ) {
				tCollectionTemp = tCollection[ 0 ];
				strDate1 = tCollectionTemp.nodeName.toLowerCase() === "time" ?
					tCollectionTemp.getAttribute( "datetime" ).substr( 0, 10 ).split( "-" ) :
					tCollectionTemp.className.match( dateTimeRegExp )[ 1 ].substr( 0, 10 ).split( "-" );

				// Convert to zero-based month
				strDate1[ 1 ] = strDate1[ 1 ] - 1;

				date.setFullYear( strDate1[ 0 ], strDate1[ 1 ], strDate1[ 2 ] );

				if ( tCollection.length !== 1 ) {

					// This is a spanning event
					tCollectionTemp = tCollection[ 1 ];
					strDate2 = tCollectionTemp.nodeName.toLowerCase() === "time" ?
						tCollectionTemp.getAttribute( "datetime" ).substr( 0, 10 ).split( "-" ) :
						tCollectionTemp.className.match( dateTimeRegExp )[ 1 ].substr( 0, 10 ).split( "-" );

					// Convert to zero-based month
					strDate2[ 1 ] = strDate2[ 1 ] - 1;

					zLen += daysBetween( strDate1, strDate2 );
				}

				// Now loop in events to load up all the days that it would be on tomorrow.setDate(tomorrow.getDate() + 1);
				for ( z = 0; z !== zLen; z += 1 ) {
					if ( z !== 0 ) {
						date = new Date( date.setDate( date.getDate() + 1 ) );
					}

					if ( events.minDate === null || date < events.minDate ) {
						events.minDate = date;
					}

					if ( events.maxDate === null || date > events.maxDate ) {
						events.maxDate = date;
					}

					events.list[ events.iCount ] = {
						title: title,
						date: date,
						href: href,
						target: target
					};

					// Add a viewfilter
					dateClass = "filter-" + ( date.getFullYear() ) + "-" +
						wb.string.pad( date.getMonth() + 1, 2 );
					if ( !className ) {
						className = dateClass;
					} else if ( className.indexOf( dateClass ) === -1 ) {
						className += " " + dateClass;
					}
					events.iCount += 1;
				}
				$objTitle.attr( "class", className );
			}

		// End of loop through objects/events
		}

		window.events = events;
		return events;
	},

	addEvents = function( year, month, $days, containerId, eventsList ) {
		var i, eLen, date, $day, $dayEvents, content, event, eventLink;

		// Fix required to make up with the IE z-index behaviour mismatch
		// TODO: Which versions of IE should this fix be limited to?
		if ( wb.ie ) {
			for ( i = 0, eLen = $days.length; i !== eLen; i += 1 ) {
				$days.eq( i ).css( "z-index", 31 - i );
			}
		}

		/*
		 * Determines for each event, if it occurs in the display month
		 * Modification - the author used a jQuery native $.each function for
		 * looping. This is a great function, but has a tendency to like
		 * HTMLELEMENTS and jQuery objects better. We have modified this
		 * to a for loop to ensure that all the elements are accounted for.
		 */
		for ( i = 0, eLen = eventsList.length; i !== eLen; i += 1 ) {
			event = eventsList[ i ];
			eventLink = "<li><a tabindex='-1' class='cal-evt-lnk' href='" +
				event.href + ( event.target ? "' target='" + event.target : "" ) +
				"'>" + event.title + "</a></li>";
			date = new Date( event.date );

			if ( date.getMonth() === month && date.getFullYear() === year ) {
				$day = $( $days[ date.getDate() - 1 ] );

				// Lets see if the cell is empty. If so lets create the cell
				if ( $day.children( "a" ).length === 0 ) {
					$dayEvents = $( "<ul class='wb-inv'>" + eventLink + "</ul>" );
					content = $day.children( "div" ).html();
					$day
						.empty()
						.append(
							"<a href='#ev-" + $day.attr( "id" ) +
								"' class='cal-evt' tabindex='-1'>" +
								content + "</a>",
							$dayEvents
						);
				} else {

					/*
					 * Modification - added an else to the date find due to
					 * event collisions not being handled. So the pointer was
					 * getting lost.
					 */
					$dayEvents = $day.find( "ul.wb-inv" );
					$dayEvents.append( eventLink );
				}

				$day.data( "dayEvents", $dayEvents );
			}
		}

		$days.find( ".cal-evt" )[ 0 ].tabIndex = "0";
	},

	showOnlyEventsFor = function( year, month, calendarId ) {
		$( "." + calendarId + " li.cal-disp-onshow" )
			.addClass( "wb-inv" )
			.has( ":header[class*=filter-" + year + "-" +
				wb.string.pad( parseInt( month, 10 ) + 1, 2 ) + "]" )
			.removeClass( "wb-inv" );
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

$document.on( "displayed.wb-cal", selector + "-cal", function( event, year, month, days, day ) {

	// Filter out any events triggered by descendants
	if ( event.currentTarget === event.target ) {
		var target = event.target,
			$target = $( target ),
			containerId = target.id,
			events = $target.data( "calEvents" );

		addEvents( year, month, days, containerId, events.list );
		showOnlyEventsFor( year, month, containerId );
		$target.find( ".cal-index-" + day + " .cal-evt" ).trigger( "setfocus.wb" );

		// Fire the wb-updated event on the wb-calevt element
		$( selector ).filter( "[data-calevt-src='" + $target[ 0 ].id + "']" )
				.trigger( "wb-updated" + selector );
	}
});

$document.on( "focusin focusout", ".wb-calevt-cal .cal-days a", function( event ) {
	var eventType = event.type,
		dayEvents = $( event.target ).closest( "td" ).data( "dayEvents" );

	switch ( eventType ) {
	case "focusin":
		dayEvents
			.closest( ".cal-days" )
				.find( "a[tabindex=0]" )
					.attr( "tabindex", "-1" );
		dayEvents
			.removeClass( "wb-inv" )
			.addClass( evDetails )
			.find( "a" )
				.attr( "tabindex", "0" );
		dayEvents.prev( "a" ).attr( "tabindex", "0" );
		break;

	case "focusout":
		setTimeout(function() {
			if ( dayEvents.find( "a:focus" ).length === 0 ) {
				dayEvents.removeClass( evDetails )
					.addClass( "wb-inv" )
					.find( "a" )
						.attr( "tabindex", "-1" );
			}
		}, 5 );
		break;
	}
});

$document.on( "mouseover mouseout", ".wb-calevt-cal .cal-days td", function( event ) {
	var target = event.currentTarget,
		eventType = event.type,
		dayEvents;

	// Only handle calendar cells with events
	if ( target.getElementsByTagName( "a" ).length !== 0 ) {
		dayEvents = $( target ).data( "dayEvents" );

		switch ( eventType ) {
		case "mouseover":
			dayEvents.dequeue()
				.removeClass( "wb-inv" )
				.addClass( evDetails );
			break;

		case "mouseout":
			dayEvents.delay( 100 ).queue(function() {
				$( this ).removeClass( evDetails )
					.addClass( "wb-inv" )
					.dequeue();
			});
			break;
		}
	}
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Calendar library
 * @overview A library for building calendar interfaces
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @pjackson28
 */
(function( $, window, document, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once
 * per page, not once per instance of plugin on the page. So, this is a good
 * place to define variables that are common to all instances of the plugin on a
 * page.
 */
var namespace = "wb-cal",
	setFocusEvent = "setfocus.wb",
	createEvent = "create." + namespace,
	displayedEvent = "displayed." + namespace,
	hideGoToFrmEvent = "hideGoToFrm." + namespace,
	setFocusCalEvent = "setFocus." + namespace,
	$document = wb.doc,
	i18n, i18nText,

	/**
	 * Creates a calendar instance
	 * @method create
	 */
	create = function( event, calendarId, year, month, shownav, mindate,
		maxdate, day, ariaControls, ariaLabelledBy ) {

		if ( event.namespace === namespace ) {
			var calendar = document.getElementById( calendarId ),
				$calendar = $( calendar ),
				objCalendarId = "#cal-" + calendarId + "-cnt",
				fromDateISO = wb.date.fromDateISO,
				$objCalendar, $calendarHeader, $oldCalendarHeader, $days, $daysList,
				maxDateYear, maxDateMonth, minDateYear, minDateMonth;

			// Only initialize the i18nText once
			if ( !i18nText ) {
				i18n = wb.i18n;
				i18nText = {
					monthNames: i18n( "mnths" ),
					prevMonth: i18n( "prvMnth" ),
					nextMonth: i18n( "nxtMnth" ),
					goToTitle: i18n( "cal-goToTtl" ),
					goToYear: i18n( "cal-goToYr" ),
					goToMonth: i18n( "cal-goToMnth" ),
					goToLink: i18n( "cal-goToLnk" ),
					goToBtn: i18n( "cal-goToBtn" ),
					cancelBtn: i18n( "cancel" ),
					dayNames: i18n( "days" ),
					currDay: i18n( "currDay" )
				};
			}

			$calendar
				.addClass( "cal-cnt" )
				.attr( "id", calendarId );

			if ( ariaLabelledBy ) {
				$calendar.attr({
					"aria-controls": ariaControls,
					"aria-labelledby": ariaLabelledBy
				});
			}

			// Converts min and max date from string to date objects
			if ( typeof mindate === "string" ) {
				mindate = fromDateISO( mindate );
			} else if ( !( typeof mindate === "object" && mindate.getFullYear() ) ) {
				mindate = null;
			}
			if ( mindate === null ) {
				mindate = new Date();
				mindate.setFullYear( year - 1, month, 1 );
			}

			if ( typeof maxdate === "string" ) {
				maxdate = fromDateISO( maxdate );
			} else if ( typeof maxdate !== "object" || maxdate.constructor !== Date ) {
				maxdate = new Date();
				maxdate.setFullYear( year + 1, month, 1 );
			}

			// Validates that the year and month are in the min and max date range
			maxDateYear = maxdate.getFullYear();
			maxDateMonth = maxdate.getMonth();
			minDateYear = mindate.getFullYear();
			minDateMonth = mindate.getMonth();
			if ( year > maxDateYear || ( year === maxDateYear && month > maxDateMonth ) ) {
				year = maxDateYear;
				month = maxDateMonth;
			} else if ( year < minDateYear || ( year === minDateYear && month < minDateMonth ) ) {
				year = minDateYear;
				month = minDateMonth;
			}

			// Reset calendar if the calendar previously existed
			$objCalendar = $( objCalendarId );
			if ( $objCalendar.length !== 0 ) {
				$objCalendar.find( "#cal-" + calendarId + "-wd, .cal-mnth, #cal-" + calendarId + "-days").remove();
				$objCalendar = $calendar.children("#cal-" + calendarId + "-cnt");
			} else {
				$objCalendar = $( "<table id='cal-" + calendarId + "-cnt' class='cal-cnt'></table>" );
				$calendar.append( $objCalendar );
			}

			// Creates the calendar header
			$calendarHeader = $( "<div class='cal-hd'></div>" );

			// Create the month navigation
			$calendarHeader.append( shownav ?
				createMonthNav( calendarId, year, month, mindate, maxdate, minDateYear, maxDateYear ) :
				"<div class='cal-mnth'>" + i18nText.monthNames[ month ] + " " + year + "</div>"
			);

			$oldCalendarHeader = $objCalendar.prev( ".cal-hd" );
			if ( $oldCalendarHeader.length === 0 ) {
				$objCalendar.before( $calendarHeader );
			} else {
				$oldCalendarHeader.replaceWith( $calendarHeader );
			}

			// Create the calendar body

			// Creates weekdays
			$objCalendar.append( createWeekdays( calendarId ) );

			// Creates the rest of the calendar
			$days = createDays( calendarId, year, month );
			$daysList = $days.find( "td:not(.cal-empty)" );

			$objCalendar.append( $days );

			// Trigger the displayed.wb-cal event
			$calendar.trigger( displayedEvent, [ year, month, $daysList, day ] );
		}
	},

	createMonthNav = function( calendarId, year, month, minDate, maxDate, minDateYear, maxDateYear ) {
		var monthNames = i18nText.monthNames,
			$monthNav = $( "<div id='cal-" + calendarId + "-mnthnav'></div>" ),
			buttonStart = "<button type='button' class='cal-",
			buttonSpecs = [
				[
					"prvmnth",
					-1,
					i18nText.prevMonth,
					"prepend"
				],
				[
					"nxtmnth",
					1,
					i18nText.nextMonth,
					"append"
				]
			],
			alt, $btn, buttonSpec, buttonClass, newMonth, newYear, hideButton, index;

		// Create the go to form
		$monthNav.append( createGoToForm( calendarId, year, month, minDate, maxDate ) );

		for ( index = 0; index !== 2; index += 1 ) {
			buttonSpec = buttonSpecs[ index ];
			buttonClass = buttonSpec[ 0 ];
			newMonth = month + buttonSpec[ 1 ];
			if ( newMonth < 0 ) {
				newMonth = 11;
				newYear = year - 1;
			} else if ( newMonth > 11 ) {
				newMonth = 0;
				newYear = year + 1;
			} else {
				newYear = year;
			}

			hideButton = ( index === 0 ?
				( ( newYear === minDateYear && newMonth < minDate.getMonth() ) || newYear < minDateYear ) :
				( ( newYear === maxDateYear && newMonth > maxDate.getMonth() ) || newYear > maxDateYear )
			);
			alt = buttonSpec[ 2 ] + monthNames[ newMonth ] + " " + newYear;
			$btn = $monthNav.find( ".cal-" + buttonClass );

			$btn = $( buttonStart + buttonClass + "' title='" + alt +
				"'><span class='glyphicon glyphicon-arrow-" +
				( buttonSpec[ 0 ] === "prvmnth" ? "left" : "right" ) +
				"'></span><span class='wb-inv'>" + alt + "</button>" );
			$monthNav[ buttonSpec[ 3 ] ]( $btn );

			$btn.toggleClass( "active", !hideButton );

			if ( !hideButton ) {
				$btn
					.removeAttr( "disabled" )
					.on( "click", {
						calID: calendarId,
						year: newYear,
						month: newMonth,
						mindate: minDate,
						maxdate: maxDate
					}, changeMonth );
			} else {
				$btn
					.attr( "disabled", "disabled" )
					.off( "click" );
			}
		}

		return $monthNav;
	},

	changeMonth = function( event ) {
		event.preventDefault();

		var which = event.which,
			btn = event.target,
			$btn = $( btn ),
			classes = btn.className,
			eventData = event.data,
			$container = $btn.closest( ".cal-cnt" );

		// Ignore middle/right mouse buttons
		if ( !which || which === 1 ) {

			if ( typeof eventData !== "undefined" ) {
				$document.trigger( createEvent, [
					eventData.calID,
					eventData.year,
					eventData.month,
					true,
					eventData.mindate,
					eventData.maxdate
				]);
			}

			$container.find( classes.indexOf( "wb-inv" ) !== -1 ?
				".cal-goto-lnk a" :
				"." + classes.match( /cal-[a-z]*mnth/i )
			).trigger( setFocusEvent );

			return false;
		}
	},

	yearChanged = function( event ) {
		var year = parseInt( this.value, 10 ),
			eventData = event.data,
			minDate = eventData.minDate,
			maxDate = eventData.maxDate,
			$monthField = eventData.monthField,
			value = $monthField.val(),
			month = value ? value : eventData.month,
			minMonth = 0,
			maxMonth = 12,
			monthNames = i18nText.monthNames,
			newMonthField = "<select id='" + $monthField.attr( "id" ) +
				"' title='" + $monthField.attr( "title" ) + "'>",
			i;

		if ( year === minDate.getFullYear() ) {
			minMonth = minDate.getMonth();
		}

		if ( year === maxDate.getFullYear() ) {
			maxMonth = maxDate.getMonth() + 1;
		}

		for ( i = minMonth; i !== maxMonth; i += 1 ) {
			newMonthField += "<option value='" + i + "'" + ( ( i === month ) ? " selected='selected'" : "" ) +
				">" + monthNames[ i ] + "</option>";
		}
		$monthField.replaceWith( newMonthField + "</select>" );
	},

	createGoToForm = function( calendarId, year, month, minDate, maxDate ) {
		var formId = "cal-" + calendarId + "-goto",
			monthFieldId = "cal-" + calendarId + "-goto-month",
			yearFieldId = "cal-" + calendarId + "-goto-year",
			form = "<div class='cal-goto'><div id='cal-" + calendarId + "-goto-lnk'>" +
				"<a href='javascript:;' role='button' aria-controls='cal-" +
				calendarId + "-goto' class='cal-goto-lnk' aria-expanded='false'>" +
				i18nText.monthNames[ month ] + " " + year + "</a></div>" +
				"<form id='" + formId + "' role='form' class='hide' action=''>",
			yearField = "<select title='" + i18nText.goToYear + "' id='" + yearFieldId + "'>",
			$form, y, ylen;

		// Create the year field entries
		for ( y = minDate.getFullYear(), ylen = maxDate.getFullYear() + 1; y !== ylen; y += 1 ) {
			yearField += "<option value='" + y + "'" + ( y === year ? " selected='selected'" : "" ) + ">" + y + "</option>";
		}

		// Create the month and year fields and the buttons
		form += "<div class='cal-goto-mnth'><select title='" + i18nText.goToMonth +
				"' id='" + monthFieldId + "'></select></div>" +
				"<div class='cal-goto-yr'>" + yearField + "</select></div>" +
				"<div class='clearfix'></div>" + "<div class='cal-goto-btn'>" +
				"<input type='submit' class='btn btn-primary' value='" +
				i18nText.goToBtn + "' /></div>" + "<div class='cal-goto-btn'>" +
				"<input type='button' class='btn btn-default cal-goto-cancel' value='" +
				i18nText.cancelBtn + "' /></div>";

		$form = $( form + "</form></div>" );
		$form
			.on( "submit", function( event ) {
				event.preventDefault();
				onGoTo( calendarId, minDate, maxDate );
				return false;
			})

			// Update the list of available months when changing the year
			// and populate the initial month list.
			.find( "#" + yearFieldId )
				.on( "change", {
						minDate: minDate,
						maxDate: maxDate,
						month: month,
						monthField: $form.find( "#" + monthFieldId )
					}, yearChanged )
				.trigger( "change" );

		return $form;
	},

	createWeekdays = function( calendarId ) {
		var weekdays = "<thead id='cal-" + calendarId + "-days' class='cal-wd' role='presentation'><tr>",
			dayNames = i18nText.dayNames,
			wd, wd1, dayName;
		for ( wd = 0; wd < 7; wd += 1 ) {
			dayName = dayNames[ wd ];
			wd1 = wd + 1;
			weekdays += "<th id='cal-" + calendarId + "-wd" + wd1 + "' class='cal-wd cal-wd" + wd1 +
				( wd === 0 || wd === 6 ? "we" : "" ) + "' role='columnheader'><abbr title='" + dayName + "'>" +
				dayName.charAt( 0 ) + "</abbr></th>";
		}

		return $( weekdays + "</tr></thead>" );
	},

	createDays = function( calendarId, year, month ) {
		var cells = "<tbody id='cal-" + calendarId + "-days' class='cal-days'>",
			date = new Date(),
			textWeekDayNames = i18nText.dayNames,
			textMonthNames = i18nText.monthNames,
			textCurrentDay = i18nText.currDay,
			frenchLang = ( document.documentElement.lang === "fr" ),
			breakAtEnd = false,
			dayCount = 0,
			firstDay, lastDay, week, day, currYear, currMonth, currDay, id, className, isCurrentDate;

		// Get the day of the week of the first day of the month | Determine le jour de la semaine du premier jour du mois
		date.setFullYear( year, month, 1 );
		firstDay = date.getDay();

		// Get the last day of the month | Determine le dernier jour du mois
		date.setFullYear( year, month + 1, 0 );
		lastDay = date.getDate() - 1;

		// Get the current date
		date = new Date();
		currYear = date.getFullYear();
		currMonth = date.getMonth();
		currDay = date.getDate();

		for ( week = 1; week < 7; week += 1 ) {
			cells += "<tr>";
			for ( day = 0; day < 7; day += 1 ) {

				id = "cal-" + calendarId + "-w" + week + "d" + ( day + 1 );
				className = ( day === 0 || day === 6 ? "cal-we" : "" ) +
					"cal-w" + week + "d" + ( day + 1 );

				if ( ( week === 1 && day < firstDay ) || ( dayCount > lastDay ) ) {

					// Creates empty cells | Cree les cellules vides
					cells += "<td id='" + id + "' class='cal-empty " + className + "'>&#160;</td>";
				} else {

					// Creates date cells | Cree les cellules de date
					dayCount += 1;
					className += " cal-index-" + dayCount;
					isCurrentDate = ( dayCount === currDay && month === currMonth && year === currYear );

					cells += "<td id='" + id + "' class='" + ( isCurrentDate ? "cal-currday " : "" ) +
						className + "'><div><time datetime='" + year + "-" +
						( month < 9 ? "0" : "" ) + ( month + 1 ) + "-" + ( dayCount < 10 ? "0" : "" ) +
						dayCount + "'><span class='wb-inv'>" + textWeekDayNames[ day ] +
						( frenchLang ? ( " </span>" + dayCount + "<span class='wb-inv'> " +
						textMonthNames[ month ].toLowerCase() + " " ) :
						( " " + textMonthNames[ month ] + " </span>" + dayCount +
						"<span class='wb-inv'>&#160;" ) ) + year +
						( isCurrentDate ? textCurrentDay : "" ) + "</span></time></div></td>";

					if ( dayCount > lastDay ) {
						breakAtEnd = true;
					}
				}
			}
			cells += "</tr>";
			if ( breakAtEnd ) {
				break;
			}
		}
		cells += "</tbody>";

		return $( cells );
	},

	showGoToForm = function( calendarId ) {
		var gotoId = "#cal-" + calendarId + "-goto";

		$( "#" + calendarId )
			.find( gotoId + "-lnk, .cal-prvmnth, .cal-nxtmnth" )
				.addClass( "hide" )
				.attr( "aria-hidden", "true" )
				.filter( "div" )
					.children()
						.attr( "aria-expanded", "true" );

		$( gotoId )
			.removeClass( "hide" )
			.find( ":input:eq(0)" )
				.trigger( setFocusEvent );
	},

	hideGoToFrm = function( event ) {
		if ( event.namespace === namespace ) {
			var calendarId = event.target.id,
				gotoId = "#cal-" + calendarId + "-goto";

			$( "#" + calendarId )
				.find( gotoId + "-lnk, .cal-prvmnth, .cal-nxtmnth" )
					.removeClass( "hide" )
					.attr( "aria-hidden", "false" )
					.filter( "div" )
						.children()
							.attr( "aria-expanded", "false" );

			$( gotoId ).addClass( "hide" );
		}
	},

	onGoTo = function( calendarId, minDate, maxDate ) {
		var $container = $( "#" + calendarId ),
			$form = $container.find( "#cal-" + calendarId + "-goto" ),
			month = parseInt( $form.find( ".cal-goto-mnth select option:selected" ).val(), 10 ),
			year = parseInt( $form.find( ".cal-goto-yr select" ).val(), 10 );

		if ( !( month < minDate.getMonth() && year <= minDate.getFullYear() ) && !( month > maxDate.getMonth() && year >= maxDate.getFullYear() ) ) {
			$document.trigger( createEvent, [
				calendarId,
				year,
				month,
				true,
				minDate,
				maxDate
			]);
			$container.trigger( hideGoToFrmEvent );

			// Go to the first day to avoid having to tab over the navigation again.
			$( "#cal-" + calendarId + "-days a" )
				.eq( 0 )
				.trigger( setFocusEvent );
		}
	},

	setFocus = function( event, calendarId, year, month, minDate, maxDate, targetDate ) {
		var time;

		if ( event.namespace === namespace ) {
			time = targetDate.getTime();

			if ( time < minDate.getTime() ) {
				targetDate = minDate;
			} else if ( time > maxDate.getTime() ) {
				targetDate = maxDate;
			}

			if ( targetDate.getMonth() !== month || targetDate.getFullYear() !== year ) {
				$document.trigger( createEvent, [
						calendarId,
						targetDate.getFullYear(),
						targetDate.getMonth(),
						true,
						minDate,
						maxDate,
						targetDate.getDate()
					]
				);
			}
		}
	};

// Event binding
$document.on( createEvent, create );

// Keyboard nav
$document.on( "keydown", ".cal-days a", function( event ) {
	var elm = event.target,
		$elm = $( elm ),
		$monthContainer = $elm.closest( ".cal-cnt" ),
		$container = $monthContainer.parent().closest( ".cal-cnt" ),
		calendarId = $container.attr( "id" ),
		fieldId = $container.attr( "aria-controls" ),
		which = event.which,
		fromDateISO = wb.date.fromDateISO,
		date = fromDateISO(
			(
				elm.className.indexOf( "cal-evt-lnk" ) === -1 ?
					elm : elm.parentNode.parentNode.previousSibling
			).getElementsByTagName( "time" )[ 0 ].getAttribute( "datetime" )
		),

		// Clone the date to keep a copy of the current date
		currDate = new Date( date.getTime() ),
		currYear = currDate.getFullYear(),
		currMonth = currDate.getMonth(),
		currDay = currDate.getDate(),
		field, minDate, maxDate, modifier, $links, $link,
		events, i, len, eventDate;

	if ( fieldId ) {
		field = document.getElementById( fieldId );
		minDate = field.getAttribute( "min" );
		maxDate = field.getAttribute( "max" );
	} else {
		minDate = $container.data( "minDate" );
		maxDate = $container.data( "maxDate" );
	}

	minDate = fromDateISO( ( minDate ? minDate : "1800-01-01" ) );
	maxDate = fromDateISO( ( maxDate ? maxDate : "2100-01-01" ) );

	if ( !event.altKey && !event.metaKey && which > 31 && which < 41 ) {
		switch ( which ) {

		// spacebar
		case 32:
			$elm.trigger( "click" );
			return false;

		// page up / page down
		case 33:
		case 34:
			modifier = ( which === 33 ? -1 : 1 );

			if ( event.ctrlKey ) {
				date.setYear( currYear + modifier );
			} else {
				date.setMonth( currMonth + modifier );
			}
			break;

		// end / home
		case 35:
		case 36:
			$links = $monthContainer.find( "td > a" );
			$link = which === 35 ? $links.last() : $links.first();
			date.setDate( fromDateISO( $link.find( "time" ).attr( "datetime" ) ).getDate() );
			break;

		// left arrow key
		case 37:
			date.setDate( currDay - 1 );
			break;

		// up arrow key
		case 38:
			date.setDate( currDay - 7 );
			break;

		// right arrow key
		case 39:
			date.setDate( currDay + 1 );
			break;

		// down arrow key
		case 40:
			date.setDate( currDay + 7 );
			break;
		}

		// If in a calendar of events then correct the date to the
		// appropriate event date if the new date is in a different year
		// or month or the date in the current month doesn't have a link
		if ( $container.hasClass( "wb-calevt-cal" ) &&
			( currYear !== date.getFullYear() || currMonth !== date.getMonth() ||
			$monthContainer.find( ".cal-index-" + date.getDate() + " > a" ).length === 0 ) ) {

			events = $container.data( "calEvents" ).list;
			len = events.length;

			// New date is later than the current date so find
			// the first event date after the new date
			if ( currDate < date ) {
				for ( i = 0; i !== len; i += 1 ) {
					eventDate = events[ i ].date;
					if ( eventDate.getTime() >= date.getTime() ) {
						break;
					}
				}

			// New date is earlier than the current date so find
			// the first event date before the new date
			} else {
				for ( i = len - 1; i !== -1; i -= 1 ) {
					eventDate = events[ i ].date;
					if ( eventDate.getTime() <= date.getTime() ) {
						break;
					}
				}
			}

			// Update new date if appropriate event date was found
			if ( ( i !== len && i !== -1 ) ||
				( i === len && currDate < eventDate ) ||
				( i === -1 && currDate > eventDate ) ) {

				date = eventDate;
			} else {
				date = currDate;
			}
		}

		// Move focus to the new date
		if ( currYear !== date.getFullYear() || currMonth !== date.getMonth() ) {
			$document.trigger( setFocusCalEvent, [
					calendarId,
					currYear,
					currMonth,
					minDate,
					maxDate,
					date
				]
			);
		} else if ( currDay !== date.getDate() ) {
			$monthContainer.find( ".cal-index-" + date.getDate() + " > a" ).trigger( setFocusEvent );
		}

		return false;
	}
});

$document.on( hideGoToFrmEvent, ".cal-cnt", hideGoToFrm );

$document.on( setFocusCalEvent, setFocus );

$document.on( "click", ".cal-goto-lnk", function( event ) {
	event.preventDefault();

	var which = event.which;

	// Ignore middle/right mouse buttons
	if ( !which || which === 1 ) {
		showGoToForm( $( event.currentTarget ).closest( ".cal-cnt" ).attr( "id" ) );
	}
});

$document.on( "click", ".cal-goto-cancel", function( event ) {
	var which = event.which;

	// Ignore middle/right mouse buttons
	if ( !which || which === 1 ) {
		$( event.currentTarget ).closest( ".cal-cnt" ).trigger( hideGoToFrmEvent );
	}
});

})( jQuery, window, document, wb );

/**
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * @title Charts and Graph
 * @overview Draw charts from an html simple and complex data table
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @duboisp
 *
 */
(function( $, window, document, wb ) {
"use strict";

/**
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
 var componentName = "wb-charts",
	selector = "." + componentName,
	initEvent = "wb-init" + selector,
	tableParsingEvent = "passiveparse.wb-tableparser",
	tableParsingCompleteEvent = "parsecomplete.wb-tableparser",
	$document = wb.doc,
	i18n, i18nText,

	/**
	 * Main Entry function to create the charts
	 * @method createCharts
	 * @param {jQuery DOM element} $elm table element use to create the chart
	 */
	createCharts = function( $elm ) {
		var allSeries = [],
			chartslabels = [],
			dataSeries = [],
			nbBarChart = 0,
			$caption = $( "caption", $elm ),
			captionHtml = $caption.html() || "",
			captionText = $caption.text() || "",
			valuePoint = 0,
			floatRegExp = /[\+\-0-9]+[0-9,\. ]*/,
			floatRegExp2 = /[^\+\-\.\, 0-9]+[^\-\+0-9]*/,
			lowestFlotDelta, $imgContainer, $placeHolder,
			$wetChartContainer, htmlPlaceHolder, figurehtml,
			cellValue, datacolgroupfound, dataGroup, header,
			i, iLength, j, jLength, parsedData, rIndex, currVectorOptions,
			currentRowGroup, reverseTblParsing, dataGroupVector,
			currentDataGroupVector, dataCell, previousDataCell, currDataVector,
			pieQuaterFlotSeries, optionFlot, optionsCharts, globalOptions,
			defaultsOptions = {

				// Flot Global Options
				flot: {
					prefix: "wb-charts-",
					defaults: {
						colors: wb.drawColours,
						canvas: true,
						xaxis: {
							ticks: { }
						}
					},
					line: { },
					area: {
						lines: {
							show: true,
							fill: true
						}
					},
					bar: {
						bars: {
							show: true,
							barWidth: 1,
							align: "center"
						}
					},
					pie: {
						series: {
							pie: {
								show: true
							}
						},
						fn: {
							"/series/pie/label/formatter": function( label, series ) {
								var textlabel;
								if ( !optionsCharts.decimal ) {
									textlabel = Math.round( series.percent );
								} else {
									textlabel = Math.round( series.percent * Math.pow( 10, optionsCharts.decimal ) );
									textlabel = textlabel / Math.pow( 10, optionsCharts.decimal );
								}

								if ( optionsCharts.nolegend ) {

									// Add the series label
									textlabel = label + "<br />" + textlabel;
								}
								return textlabel + "%";
							}
						}
					},
					donut: {
						base: "pie",
						series: {
							pie: {
								radius: 1,
								label: {
									show: true,
									radius: 1,
									threshold: 0.08
								},
								tilt: 0.5,
								innerRadius: 0.45,
								startAngle: 1
							}
						},
						grid: {
							hoverable: true
						}
					}
				},

				// Flot Series Options
				series: {
					prefix: "wb-charts-",
					defaults: { },
					line: { },
					area: {
						lines: {
							show: true,
							fill: true
						}
					},
					bar: {
						bars: {
							show: true,
							barWidth: 1,
							align: "center"
						}
					},
					stacked: {
						base: "bar"
					}
				},

				// Wet-boew Charts Options
				charts: {
					prefix: "wb-charts-",
					defaults: {

						// [string] Class name added at the figure element container
						graphclass: "wb-graph",

						// [boolean] Wrap or not the table in a details/summary elements
						noencapsulation: false,

						// [number] false means the deepest vector will be used for labelling
						labelposition: false,

						// [number] false means the deepest vector will be used for calculate the reference
						referencevalue: false,

						// [boolean] false means to move the legend from inside the charts to next to it
						legendinline: false,

						// [boolean] true means that the legend will be destroyed and the label for pie chart will include the legend
						nolegend: false,

						// [number] Literal number of displayed decimal for a pie charts
						decimal: 0,

						// [number] Provide a default width for the charts that will be rendered
						width: $elm.width(),

						// [number] Provide a default height for the charts that will be rendered
						height: $elm.height(),

						// [boolean] Flag for defining if the data table should be read in reverse compared to HTML spec
						reversettblparsing: false,
						fn: {
							"/getcellvalue": function( elem ) {

								// Default Cell value extraction
								var cellRawValue = $.trim( $( elem ).text() ).replace( /\s/g, "" );

								return [
									parseFloat( cellRawValue.match( floatRegExp ) ),
									cellRawValue.match ( floatRegExp2 )
								];
							}
						}

					},
					donut: {
						decimal: 1
					},
					thousandcomma: {
						fn: {
							"/getcellvalue": function( elem ) {
								var raw = $.trim( $( elem ).text() ).replace( /,/g, "" );
								return [
									parseFloat( raw.match( floatRegExp ) ),
									raw.match( floatRegExp2 )
								];
							}
						}
					},
					thousanddot: {
						fn: {
							"/getcellvalue": function( elem ) {
								var raw = $.trim( $( elem ).text() ).replace( /\./g, "" );
								return [
									parseFloat( raw.match( floatRegExp ) ),
									raw.match( floatRegExp2 )
								];
							}
						}
					}
				}
			};

		/**
		 * A little function to overwrite and add preset into the default options
		 *
		 * @method overwriteDefaultsOptions
		 * @param {string} scopekey - Key that represent the subject of the setting, [flot, charts, series,...]
		 * @param {json object} target - DefaultOptions that will be overwritten
		 * @param {json object} object - User defined object for overwriting options
		 * @return {json object} - Return the new object
		 */
		function overwriteDefaultsOptions( scopekey, target, object ) {
			var cachedObj, key;

			cachedObj = object[ scopekey ];
			if ( !cachedObj ) {
				return target;
			}
			for ( key in cachedObj ) {
				if ( !cachedObj.hasOwnProperty( key ) ) {
					continue;
				}
				target[ scopekey ][ key ] = cachedObj[ key ];
			}
			return target;
		}

		// User defined options
		if ( !window.chartsGraphOpts ) {
			globalOptions = window[ componentName ];

			// Global setting
			if ( globalOptions ) {
				overwriteDefaultsOptions( "flot", defaultsOptions, globalOptions );
				overwriteDefaultsOptions( "series", defaultsOptions, globalOptions );
				overwriteDefaultsOptions( "charts", defaultsOptions, globalOptions );
			}

			// Save the setting here in a case of a second graphic on the same page
			window.chartsGraphOpts = defaultsOptions;
		}
		defaultsOptions = window.chartsGraphOpts;

		/**
		 * A little function to ease the web editor life
		 *
		 * Apply preset defined by a set of space-separated tokens from a baseline json object and at the same time extend the result by using the HTML5 data attribute
		 *
		 * @method applyPreset
		 * @param {json object} baseline - Base line json object that includes predefined and userdefined preset
		 * @param {jQuery} $elem - Element on which the class attribute will be taken for a set of space-separated tokens
		 * @param {string} attribute - Name of the HTML5 data attribute for extending the object at the end
		 * @return {json object} - Return a new object build from the ```baseline``` or ```baseline.default``` object with the preset applied.
		 */
		function applyPreset( baseline, $elem, attribute ) {

			var config = $.extend( true, {}, baseline.defaults || baseline ),
				fn = $.extend( true, {}, baseline.defaults && baseline.defaults.fn || { } ),
				tokens = $elem.attr( "class" ) || "",
				tblTokens, i, iLength, token, tokenLength,

				// Prefix used in front of the token
				prefix, prefixLength,
				preset, key, tblFn, localKey, currObj;

			if ( tokens.length ) {

				prefix = ( baseline.prefix || "" );
				prefixLength = prefix.length;

				// split the set of space-separated tokens
				tblTokens = tokens.split( " " );

				for ( i = 0, iLength = tblTokens.length; i !== iLength; i += 1 ) {

					// Get the current token
					token = tblTokens[ i ];
					tokenLength = token.length;

					// Remove the token is used
					if ( tokenLength <= prefixLength || token.slice( 0, prefixLength ) !== prefix ) {
						continue;
					}
					token = token.slice( prefixLength, tokenLength );

					preset = baseline[ token ];

					// Apply the preset
					if ( preset ) {
						if ( preset.base ) {

							// Like setting herited from a parent config
							config = $.extend( true, config, baseline[ preset.base ] );
							fn = $.extend( true, fn, baseline[ preset.base ].fn || { } );
						}
						config = $.extend( true, config, preset );
						fn = $.extend( true, fn, preset.fn || { } );
					}
				}
			}

			// Extend the config from the element @data attribute
			config = $.extend( true, config, wb.getData( $elem, attribute ) );

			// Merge and override the function.
			for ( key in fn ) {
				if ( !fn.hasOwnProperty( key ) ) {
					continue;
				}
				tblFn = key.split( "/" );
				currObj = config;
				for ( i = 0, iLength = tblFn.length - 1; i !== iLength; i += 1 ) {
					localKey = tblFn.shift();
					if ( localKey === "" ) {
						continue;
					}
					if ( !currObj[ localKey ] ) {
						currObj[ localKey ] = { };
					}
					currObj = currObj[ localKey ];
				}
				localKey = tblFn.shift();
				currObj[ localKey ] = fn[ key ];
			}
			return config;
		}

		// Apply any preset
		optionFlot = applyPreset( defaultsOptions.flot, $elm, "flot" );

		// Apply any preset
		optionsCharts = applyPreset( defaultsOptions.charts, $elm, componentName );

		// Fix default width and height in case the table is hidden or too small.
		optionsCharts.width = ( optionsCharts.width && optionsCharts.width > 250 ? optionsCharts.width : 250 );
		optionsCharts.height = ( optionsCharts.height && optionsCharts.height > 250 ? optionsCharts.height : 250 );

		/**
		 * @method getColumnGroupHeaderCalculateSteps
		 * @param {object} colGroupHead - Column Group Header Object from the table parser
		 * @param {number} referenceValuePosition - Vector position use as reference for defining the steps, zero based position
		 */
		function getColumnGroupHeaderCalculateSteps( colGroupHead, referenceValuePosition ) {

			// Get the appropriate ticks
			var headerCell, i, iLen,
				calcStep = 1,
				colRefValue, colCurent;

			if ( !colGroupHead ) {

				// There is an error. Possibly the series are missing a header.
				return;
			}

			colRefValue = colGroupHead.col[ referenceValuePosition ];
			colCurent = colGroupHead.col[ 0 ];

			for ( i = 0, iLen = colRefValue.cell.length; i !== iLen; i += 1 ) {

				headerCell = colRefValue.cell[ i ];

				if ( i === 0 || ( i > 0 && colCurent.cell[ i - 1 ].uid !== headerCell.uid ) ) {

					if ( headerCell.rowgroup && headerCell.rowgroup.type === 3 ) {

						// We only process the first column data group
						break;
					}

					if ( headerCell.type === 1 || headerCell.type === 7 ) {
						if ( headerCell.child.length !== 0 ) {
							calcStep = calcStep * groupHeaderCalculateStepsRecursive( headerCell, 1 );
						}
					}
				}
			}

			return calcStep;
		}

		/**
		 * @method getRowGroupHeaderCalculateSteps
		 * @param {object} rowGroupHead - Row Group Header Object from the table parser
		 * @param {number} referenceValuePosition - Vector position use as reference for defining the steps, zero based position
		 * @param {number} dataColgroupStart - Column position where the column data group start
		 */
		function getRowGroupHeaderCalculateSteps( rowGroupHead, referenceValuePosition, dataColgroupStart ) {

			// Find the range of the first data colgroup
			var headerCell, i, iLen,
				calcStep = 1,
				rowRefValueCells = rowGroupHead[ referenceValuePosition ].elem.cells;

			for ( i = 0, iLen = rowRefValueCells.length; i !== iLen; i += 1 ) {

				headerCell = $( rowRefValueCells[ i ] ).data().tblparser;

				if ( headerCell.colgroup && headerCell.colgroup.type === 3 ) {

					// We only process the first column data group
					break;
				}

				if ( headerCell.colpos >= dataColgroupStart && ( headerCell.type === 1 || headerCell.type === 7 ) ) {
					if ( headerCell.child.length !== 0 ) {
						calcStep = calcStep * headerCell.child.length * groupHeaderCalculateStepsRecursive( headerCell, 1 );
					}
				}
			}

			return calcStep;
		}

		/**
		 * @method groupHeaderCalculateStepsRecursive
		 * @param {object} headerCell - Header cell object from the table parser
		 * @param {number} refValue - Reference Value (Dénominateur) of headerCell
		 */
		function groupHeaderCalculateStepsRecursive( headerCell, refValue ) {
			var childLength = headerCell.child.length,
				calcStep = 1,
				kIndex, subRefValue, headerCellChild;

			if ( childLength === 0 ) {
				return calcStep;
			}

			subRefValue = childLength * refValue;

			calcStep = calcStep * subRefValue;

			for ( kIndex = 0; kIndex !== childLength; kIndex += 1 ) {
				headerCellChild = headerCell.child[ kIndex ];
				if ( headerCellChild.child.length !== 0 ) {
					calcStep = calcStep * groupHeaderCalculateStepsRecursive( headerCellChild, subRefValue );
				}
			}
			return calcStep;
		}

		/**
		 * Set the inner step value (divisor) of an header cell and for his child
		 *
		 * @method setInnerStepValues
		 * @param {object} vectorHead - Group Header Object from the table parser
		 * @param {number} headerLevel - Hiearchical Level of heading
		 * @param {number} stepsValue - Step Value for the reference value vector
		 * @param {number} referenceValue - Reference Value Vector ID
		 * @param {number} dataColgroupStart - Column position where the column data group start
		 *
		 */
		function setInnerStepValues( vectorHead, headerLevel, stepsValue, referenceValue, dataColgroupStart ) {
			var i, iLength,
				headerCell,
				cumulativeValue = 0;

			for ( i = 0, iLength = vectorHead.cell.length; i !== iLength; i += 1 ) {
				headerCell = vectorHead.cell[ i ];
				if ( i !== 0 && headerCell.uid === vectorHead.cell[ i - 1 ].uid || ( dataColgroupStart && headerCell.colpos < dataColgroupStart ) ) {
					continue;
				}

				// Only process the first data group
				if ( !reverseTblParsing ) {
					if ( headerCell.colgroup && headerCell.colgroup.type === 3 ) {
						break;
					}
				} else {
					if ( headerCell.rowgroup && headerCell.rowgroup.type === 3 ) {
						break;
					}
				}
				if ( headerCell.child > 0 && headerLevel < referenceValue ) {
					headerCell.flotDelta = stepsValue * headerCell.child.length;
				} else {
					headerCell.flotDelta = stepsValue;
				}
				if ( headerCell.type === 1 || headerCell.type === 7  ) {

					if ( !lowestFlotDelta || headerCell.flotDelta < lowestFlotDelta ) {
						lowestFlotDelta = headerCell.flotDelta;
					}
					headerCell.flotValue = cumulativeValue;

					cumulativeValue = cumulativeValue + stepsValue;

					if ( headerCell.child.length > 0 ) {
						setInnerStepValuesChildRecursive( headerCell, headerLevel, stepsValue, referenceValue );
					}
				}
			}
		}

		/**
		 * Recursize - Set the inner step value (divisor) of an sub header cell
		 *
		 * @method setInnerStepValuesChildRecursive
		 * @param {object} headerCell - Header cell object from the table parser
		 * @param {number} headerLevel - Hiearchical Level of heading
		 * @param {number} stepsValue - Specific Step Value applied for current headerCell
		 * @param {number} referenceValue - Reference Value Vector ID
		 */
		function setInnerStepValuesChildRecursive( headerCell, headerLevel, stepsValue, referenceValue ) {
			var cumulativeValue = 0,

				// Step Values for childs header in headerCell
				flotDelta,
				i, iLength,	currentHeaderCellChild;

			headerLevel += 1;
			cumulativeValue = headerCell.flotValue;
			flotDelta = stepsValue / headerCell.child.length;

			// Use to calculate the largest width for a bar in a bar chart
			if ( !lowestFlotDelta || flotDelta < lowestFlotDelta ) {
				lowestFlotDelta = flotDelta;
			}

			for ( i = 0, iLength = headerCell.child.length; i !== iLength; i += 1 ) {
				currentHeaderCellChild = headerCell.child[ i ];
				if ( headerLevel < referenceValue ) {
					currentHeaderCellChild.flotDelta = flotDelta * currentHeaderCellChild.child.length;
				} else {
					currentHeaderCellChild.flotDelta = flotDelta;
				}
				currentHeaderCellChild.flotValue = cumulativeValue;
				if ( currentHeaderCellChild.child.length > 0 ) {
					setInnerStepValuesChildRecursive( currentHeaderCellChild, headerLevel, flotDelta, referenceValue );
				}
				cumulativeValue = cumulativeValue + flotDelta;
			}
		}

		/**
		 * Set the header cell step value (flotDelta) for vector that regroup more than one reference
		 *
		 * @method setUpperStepValues
		 * @param {object} vectorHead - Group Header Object from the table parser
		 * @param {number} referenceValue - Reference Value Vector ID
		 */
		function setUpperStepValues( vectorHead, referenceValue ) {
			var i, k, m, kLen, mLen,
				cumulativeValue,
				currentCell,
				currentCellChild,
				currentVectorHead;

			// Calculate upper-step for cells that are
			// less precise than the reference value vector
			for ( i = referenceValue - 1; i !== -1; i -= 1 ) {
				currentVectorHead = vectorHead[ i ];

				for ( k = 0, kLen = currentVectorHead.cell.length; k !== kLen; k += 1 ) {
					currentCell = currentVectorHead.cell[ k ];

					if ( currentCell.flotDelta || k > 0 &&
						currentCell.uid === currentVectorHead.cell[ k - 1 ].uid ) {

						continue;
					}

					if ( !( currentCell.type === 1 || currentCell.type === 7 ) ) {
						continue;
					}

					cumulativeValue = 0;
					for ( m = 0, mLen = currentCell.child.length; m !== mLen; m += 1 ) {
						currentCellChild = currentCell.child[ m ];

						cumulativeValue = currentCellChild.flotDelta;
						if ( !currentCell.flotValue ) {
							currentCell.flotValue = currentCellChild.flotValue;
						}
					}
					currentCell.flotDelta = cumulativeValue;
				}
			}
		}

		/**
		 * Get labels for a specific vector
		 *
		 * @method getLabels
		 * @param {object} labelVector - Vector Header Object from the table parser
		 * @param {number} dataColgroupStart - Column position where the column data group start
		 */
		function getLabels( labelVector, dataColgroupStart ) {
			var labels = [],
				i, iLen, currentCell;

			for ( i = 0, iLen = labelVector.cell.length; i !== iLen; i += 1 ) {
				currentCell = labelVector.cell[ i ];

				if ( ( i !== 0 && currentCell.uid === labelVector.cell[ i - 1 ].uid ) ||
						( !( currentCell.type === 1 || currentCell.type === 7 ) ) ||
						( dataColgroupStart && currentCell.colpos < dataColgroupStart ) ) {
					continue;
				}

				labels.push( [ currentCell.flotValue, $( currentCell.elem ).text() ] );
			}
			return labels;
		}

		/**
		 * Get the vector that would be used for labelling x-axis
		 *
		 * @method getlabelsVectorPosition
		 * @param {object[]} arrVectorHeaders - Collection of vector headers
		 */
		function getlabelsVectorPosition( arrVectorHeaders ) {
			var labelPosition = optionsCharts.labelposition;
			return ( !labelPosition || ( labelPosition && labelPosition > arrVectorHeaders.length ) ?
				parsedData.theadRowStack.length : labelPosition ) - 1;
		}

		/**
		 * Get the vertical label and set the appropriate header cell x-axis Value
		 *
		 * @method verticalLabels
		 * @param {object} parsedData - Generic object generated by the table parser
		 */
		function verticalLabels( parsedData ) {

			// Get the appropriate ticks
			var headerlevel = 0,
				labelsVectorPosition, stepsValue, columnReferenceValue;

			if ( !reverseTblParsing || ( reverseTblParsing && optionsCharts.referencevalue === false ) ) {
				columnReferenceValue = parsedData.colgrouphead.col.length;
			} else {
				columnReferenceValue = optionsCharts.referencevalue;
			}

			columnReferenceValue = columnReferenceValue - 1;

			stepsValue = getColumnGroupHeaderCalculateSteps( parsedData.colgrouphead, columnReferenceValue );

			if ( !reverseTblParsing ) {
				labelsVectorPosition = parsedData.colgrouphead.col.length - 1;
			} else {
				labelsVectorPosition = getlabelsVectorPosition( parsedData.colgrouphead.col );
			}

			headerlevel = columnReferenceValue;

			// Calculate inner-step for cells that are more precise than the reference value vector
			setInnerStepValues( parsedData.colgrouphead.col[ columnReferenceValue ], headerlevel, stepsValue, columnReferenceValue );

			// Calculate upper-step for cells that are less precise than the reference value vector
			setUpperStepValues( parsedData.colgrouphead.col, columnReferenceValue );

			// Get the labelling
			return getLabels( parsedData.colgrouphead.col[ labelsVectorPosition ] );
		}

		/**
		 * Get the horizontal label and set the appropriate header cell x-axis Value
		 *
		 * @method horizontalLabels
		 * @param {object} parsedData - Generic object generated by the table parser
		 */
		function horizontalLabels( parsedData ) {
			// Find the range of the first data colgroup
			var dataColgroupStart = -1,
				headerlevel = 0,
				theadRowStack = parsedData.theadRowStack,
				i, iLength, labelsVectorPosition,
				stepsValue, rowReferenceValue;

			if ( !theadRowStack ) {
				return;
			}

			for ( i = 0, iLength = parsedData.colgroup.length; i !== iLength; i += 1 ) {
				if ( parsedData.colgroup[ i ].type === 2 ) {
					dataColgroupStart = parsedData.colgroup[ i ].start;
					break;
				}
			}

			if ( ( !reverseTblParsing && optionsCharts.referencevalue === false ) || reverseTblParsing ) {
				rowReferenceValue = theadRowStack.length;
			} else {
				rowReferenceValue = optionsCharts.referencevalue;
			}

			rowReferenceValue = rowReferenceValue - 1;

			stepsValue = getRowGroupHeaderCalculateSteps( theadRowStack, rowReferenceValue, dataColgroupStart );

			if ( !reverseTblParsing ) {
				labelsVectorPosition = getlabelsVectorPosition( theadRowStack );
			} else {
				labelsVectorPosition = theadRowStack.length - 1;
			}

			headerlevel = rowReferenceValue;

			// Calculate inner-step for cells that are more precise than the reference value vector
			setInnerStepValues( theadRowStack[ rowReferenceValue ], headerlevel, stepsValue, rowReferenceValue, dataColgroupStart );

			// Calculate upper-step for cells that are less precise than the reference value vector
			setUpperStepValues( theadRowStack, rowReferenceValue );

			// Get the labelling
			return getLabels( theadRowStack[ labelsVectorPosition ], dataColgroupStart );

		}

		/**
		 * Wrap the table into a smart details/summary element
		 *
		 * @method wrapTableIntoDetails
		 */
		function wrapTableIntoDetails() {
			if ( !captionHtml.length ) {
				return;
			}

			$elm
				.wrap( "<details/>" )
				.before( "<summary>" + captionHtml + i18nText.tableMention + "</summary>" );
		}

		function createContainer( withDimension ) {
			$elm
				.wrap( "<figure class='" + optionsCharts.graphclass + "'/>" )
				.before(

					// Copy to the inner table caption
					( captionHtml.length ? "<figcaption>" + captionHtml + "</figcaption>" : "" ) +

					// Image Container
					"<div role='img' aria-label='" + captionText + i18nText.tableFollowing + "'" +

					// Add Dimension
					( withDimension ? "style='height:" + optionsCharts.height +
					"px; width:" + optionsCharts.width + "px'" : "" ) + "></div>"
				);

			return $( "div:eq(0)", $elm.parent() );
		}

		// Retrieve the parsed data
		parsedData = $elm.data().tblparser;

		// Reverse table parsing
		reverseTblParsing = optionsCharts.reversettblparsing;

		// first data row group
		currentRowGroup = parsedData.lstrowgroup[ 0 ];

		if ( optionFlot.series && optionFlot.series.pie ) {

			// WET Charts placeholder
			$wetChartContainer = createContainer( false );

			// Flot pie chart placeholder
			htmlPlaceHolder = "<div style='height:" + optionsCharts.height +
				"px; width:" + optionsCharts.width + "px'></div>";

			if ( !reverseTblParsing ) {

				// If normal parsing
				dataGroup = parsedData.colgroup[ 0 ].type === 1 ?
					parsedData.colgroup[ 1 ] :
					parsedData.colgroup[ 0 ];

				rIndex = currentRowGroup.row.length - 1;
			} else {

				// If reverse parsing
				dataGroup = currentRowGroup;
				rIndex = ( parsedData.colgroup[ 0 ].type === 1 ?
					parsedData.colgroup[ 1 ].col.length :
					parsedData.colgroup[ 0 ].col.length ) - 1;
			}

			for ( rIndex; rIndex >= 0; rIndex -= 1 ) {

				dataGroupVector = !reverseTblParsing ? dataGroup.col : dataGroup.row;

				// For each row or column
				for ( i = 0, iLength = dataGroupVector.length; i !== iLength; i += 1 ) {
					dataSeries = [];
					valuePoint = 0;
					currentDataGroupVector = dataGroupVector[ i ];

					// For each cells
					for ( j = 0, jLength = currentDataGroupVector.cell.length; j !== jLength; j += 1 ) {

						dataCell = currentDataGroupVector.cell[ j ];

						// Skip the column if
						if ( reverseTblParsing && dataCell.col.type === 1 ) {
							continue;
						}

						previousDataCell = undefined;
						if ( j !== 0 ) {
							previousDataCell = currentDataGroupVector.cell[ j - 1 ];
						}

						// Verify if the selected cell still in the scope of a data group in his another axes (eg. row/col)
						// Verify if we are still in the same datagroup as the previous data cell
						if ( ( !reverseTblParsing && ( dataCell.row.type !== 2  || ( previousDataCell &&
								previousDataCell.rowgroup.uid !== dataCell.rowgroup.uid ) ) ) ||
								( reverseTblParsing && ( dataCell.col.type !== 2 ) || ( previousDataCell &&
								previousDataCell.col.type !== 1 &&
								previousDataCell.col.groupstruct.uid !== dataCell.col.groupstruct.uid ) ) ) {
							break;
						}

						// Gets the value
						header = !reverseTblParsing ? dataCell.row.header : dataCell.col.header;

						cellValue = optionsCharts.getcellvalue( !reverseTblParsing ?
							currentDataGroupVector.cell[ rIndex ].elem :
							currentDataGroupVector.datacell[ rIndex ].elem );

						dataSeries.push(
							[
								valuePoint,
								typeof cellValue === "object" ?
									cellValue[ 0 ] :
									cellValue
							]
						);

						valuePoint += header[ header.length - 1 ].flotDelta;

						break;
					}

					pieQuaterFlotSeries = { };

					// Get the setting from the associative cell header
					dataCell = !reverseTblParsing ?
						currentDataGroupVector.cell[ rIndex ] :
						currentDataGroupVector.datacell[ rIndex ];
					header = !reverseTblParsing ?
						dataCell.col.header :
						dataCell.row.header;
					header = header[ header.length - 1 ];

					// Apply any preset
					pieQuaterFlotSeries = applyPreset( defaultsOptions.series, $( header.elem ), "flot" );

					// Set the data issue from the table
					pieQuaterFlotSeries.data = dataSeries;
					pieQuaterFlotSeries.label = ( !reverseTblParsing ?
						$( currentDataGroupVector.dataheader[ currentDataGroupVector.dataheader.length - 1 ].elem ).text() :
						$( currentDataGroupVector.header[ currentDataGroupVector.header.length - 1 ].elem ).text() );

					// Add the series
					allSeries.push(pieQuaterFlotSeries);
				}

				// Create a sub Figure or use the main one
				if ( currentRowGroup.row.length === 1 &&
					( currentRowGroup.row[ 0 ].header[ 0 ].elem.innerHTML === captionHtml ||
					currentRowGroup.row[ 0 ].header.length === 0 ) ) {

					$placeHolder = $wetChartContainer;
					$placeHolder.css({
						height: optionsCharts.height,
						width: optionsCharts.width
					});

				} else {

					header = currentRowGroup.row[ rIndex ].header;

					figurehtml = "<figure><figcaption>" +
						header[ header.length - 1 ].elem.innerHTML +
						"</figcaption>" + htmlPlaceHolder + "</figure>";

					$wetChartContainer.append( $( figurehtml ) );

					$placeHolder = $( "div:last()", $wetChartContainer );
				}

				// Create the graphic
				$.plot( $placeHolder, allSeries, optionFlot );

				if ( !optionsCharts.legendinline ) {

					// Move the legend under the graphic
					$( ".legend", $placeHolder ).appendTo( $wetChartContainer );
				}

				allSeries = [];
			}

			if ( optionsCharts.nolegend ) {

				// Remove the legend
				$( ".legend", $wetChartContainer ).remove();
			}
			if ( !optionsCharts.legendinline ) {

				// Fix the legend that appear under the graphic
				$( ".legend > div", $wetChartContainer ).remove();
				$( ".legend > table", $wetChartContainer ).removeAttr( "style" ).addClass( "font-small" );
				$( ".legend", $placeHolder ).appendTo( $imgContainer );
			}

			// Remove any "pieLabel" ids set by the flotPie.js plugin at line #457
			$( ".pieLabel" ).removeAttr( "id" );

			if ( !optionsCharts.noencapsulation ) {
				wrapTableIntoDetails();
			}

			return;
		}

		if ( !reverseTblParsing ) {
			// If normal parsing
			dataGroup = currentRowGroup;
			rIndex = ( parsedData.colgroup[ 0 ].type === 1 ?
				parsedData.colgroup[ 1 ].col.length :
				parsedData.colgroup[ 0 ].col.length ) - 1;
			chartslabels = horizontalLabels( parsedData );
		} else {
			// If reverse parsing
			dataGroup = parsedData.colgroup[ 0 ].type === 1 ?
				parsedData.colgroup[ 1 ] :
				parsedData.colgroup[ 0 ];
			rIndex = currentRowGroup.row.length - 1;
			chartslabels = verticalLabels( parsedData );
		}

		// Add the labels at the Flot options
		optionFlot.xaxis.ticks = chartslabels;

		dataGroupVector = !reverseTblParsing ? dataGroup.row : dataGroup.col;

		// Count the number of bar charts,
		for ( i = 0, iLength = dataGroupVector.length; i !== iLength; i += 1 ) {
			currentDataGroupVector = dataGroupVector[ i ];
			currDataVector = currentDataGroupVector.header[ currentDataGroupVector.header.length - 1 ];

			// Apply any preset
			currVectorOptions = applyPreset( defaultsOptions.series, $( currDataVector.elem ), "flot" );

			if ( currVectorOptions.bars || ( optionFlot.bars && !currVectorOptions.lines ) ) {

				// Count number of bars, this number is use to calculate the bar width.
				nbBarChart += 1;

				// Set a default setting specially for bar charts
				if (!currVectorOptions.bars) {
					currVectorOptions.bars = { show: true, barWidth: 0.9 };
				}

				// Set a default order for orderBars flot plugin
				if (!currVectorOptions.bars.order) {
					currVectorOptions.bars.order = nbBarChart;
				}
			}

			// cache the compiled setting
			currDataVector.chartOption = currVectorOptions;
		}

		// First rowgroup assume is a data row group.
		// For all row....
		for ( i = 0, iLength = dataGroupVector.length; i !== iLength; i += 1 ) {
			dataSeries = [];
			datacolgroupfound = 0;
			valuePoint = 0;
			currDataVector = dataGroupVector[ i ];

			currVectorOptions = currDataVector.header[ currDataVector.header.length - 1 ].chartOption;

			// For each cells
			for ( j = 0, jLength = currDataVector.cell.length; j !== jLength; j += 1 ) {

				dataCell = currDataVector.cell[ j ];

				if ( datacolgroupfound > 1 && dataCell.col.groupstruct.type !== 2 ) {
					break;
				}

				if ( ( !reverseTblParsing && dataCell.col.groupstruct.type === 2 ) ||
						( reverseTblParsing && dataCell.row.rowgroup.type === 2 ) ) {

					// Gets the value
					header = !reverseTblParsing ? dataCell.col.header : dataCell.row.header;

					cellValue = optionsCharts.getcellvalue( dataCell.elem );

					// Add the data point
					dataSeries.push(
						[
							valuePoint,
							typeof cellValue === "object" ?
								cellValue[ 0 ] :
								cellValue
						]
					);
					valuePoint += header[ header.length - 1 ].flotDelta;
					datacolgroupfound += 1;
				}
			}

			currVectorOptions.data = dataSeries;
			currVectorOptions.label = $( currDataVector.header[ currDataVector.header.length - 1 ].elem ).text();

			if ( currVectorOptions.bars ) {

				// Adjust the bars width
				currVectorOptions.bars.barWidth = currVectorOptions.bars.barWidth * ( 1 / nbBarChart );
			}

			allSeries.push( currVectorOptions );

		}

		if ( optionFlot.bars ) {

			// Adjust the bars width
			optionFlot.bars.barWidth = optionFlot.bars.barWidth * ( 1 / nbBarChart );
		}

		// WET Charts Placeholder
		$placeHolder = createContainer( true );

		// Maximum width
		$placeHolder.css( "width", "100%" );

		// Create the graphic
		$.plot( $placeHolder, allSeries, optionFlot );

		if ( !optionsCharts.legendinline ) {

			// Move the legend under the graphic
			$( ".legend > div", $placeHolder ).remove();
			$( ".legend > table", $placeHolder ).removeAttr( "style" ).addClass( "font-small" );
			$placeHolder.css( "height", "auto" );
		}
		if ( optionsCharts.nolegend ) {

			// Remove the legend
			$( ".legend", $placeHolder ).remove();
		}

		if ( !optionsCharts.noencapsulation ) {
			wrapTableIntoDetails();
		}

		$( "canvas:eq(1)", $placeHolder ).css( "position", "static" );
		$( "canvas:eq(0)", $placeHolder ).css( "width", "100%" );

		$elm.trigger( "wb-updated" + selector );
	},

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered this handler
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector, true ),
			elmId, modeJS, deps;

		if ( elm ) {
			elmId = elm.id;
			modeJS = wb.getMode() + ".js";
			deps = [
				"site!deps/jquery.flot" + modeJS,
				"site!deps/jquery.flot.pie" + modeJS,
				"site!deps/jquery.flot.canvas" + modeJS,
				"site!deps/jquery.flot.orderBars" + modeJS,
				"site!deps/tableparser" + modeJS
			];

			// Only initialize the i18nText once
			if ( !i18nText ) {
				i18n = wb.i18n;
				i18nText = {
					tableMention: i18n( "hyphen" ) + i18n( "tbl-txt" ),
					tableFollowing: i18n( "hyphen" ) + i18n( "tbl-dtls" )
				};
			}

			// Load the required dependencies
			Modernizr.load({

				// For loading multiple dependencies
				load: deps,
				complete: function() {
					var $elm = $( "#" + elmId );

					// Let's parse the table
					$elm.trigger( tableParsingEvent );

					// Identify that initialization has completed
					wb.ready( $elm, componentName );
				}
			});
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent + " " + tableParsingCompleteEvent, selector, function( event ) {
	var eventType = event.type,
		elm = event.target;

	switch ( eventType ) {

	/*
	 * Init
	 */
	case "timerpoke":
	case "wb-init":
		init( event );
		break;

	/*
	 * Data table parsed
	 */
	case "parsecomplete":
		if ( event.currentTarget === elm ) {
			createCharts( $( elm ) );
		}
		break;
	}

	/*
	 * Since we are working with events we want to ensure that we are being passive about our control,
	 * so returning true allows for events to always continue
	 */
	return true;
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, document, wb );

/**
 * @title WET-BOEW Collapsible alerts plugin
 * @overview Collapsible alerts (details/summary)
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author WET community
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the event - meaning that they will be initialized once per page,
 * not once per instance of event on the page.
 */
var componentName = "wb-collapsible",
	selector = "details.alert",
	initEvent = "wb-init." + componentName,
	$document = wb.doc,
	details, key,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		details = wb.init( event, componentName, selector );

		if ( details ) {

			key = "alert-collapsible-state-" + details.getAttribute("id");

			try {
				if ( localStorage.getItem( key ) ) {

					// Set open/closed state for existing localStorage keys
					if ( localStorage.getItem( key ) === "open" ) {
						details.setAttribute( "open", "open" );
						details.className += " open";
					} else if ( localStorage.getItem( key ) === "closed" ) {
						details.removeAttribute( "open" );
						details.className = details.className.replace( " open", "" );
					}

				} else {

					// Set new localStorage values
					if ( details.hasAttribute( "open" ) ) {
						localStorage.setItem( key, "open" );
					} else {
						localStorage.setItem( key, "closed" );
					}

				}
			} catch ( e ) {}

			// Identify that initialization has completed
			wb.ready( $document, componentName );
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

$document.on( "timerpoke.wb", function() {

	// Do not bind events if details polyfill is active
	if ( Modernizr.details ) {

		// Bind the the event handlers of the plugin
		$document.on( "click keydown toggle." + componentName, selector + " summary", function( event ) {
			var which = event.which,
				currentTarget = event.currentTarget,
				isClosed;

			// Ignore middle/right mouse buttons and wb-toggle enhanced summary elements (except for toggle)
			if ( ( !which || which === 1 ) &&
				( currentTarget.className.indexOf( "wb-toggle" ) === -1 ||
				( event.type === "toggle" && event.namespace === componentName ) ) ) {

				details = currentTarget.parentNode;
				isClosed = details.getAttribute( "open" ) === null ;
				key = "alert-collapsible-state-" + details.getAttribute( "id" );

				if ( isClosed ) {
					try {
						localStorage.setItem( key, "open" );
					} catch ( e ) {}
				} else {
					try {
						localStorage.setItem( key, "closed" );
					} catch ( e ) {}
				}
			} else if ( which === 13 || which === 32 ) {
				event.preventDefault();
				$( currentTarget ).trigger( "click" );
			}

			/*
			 * Since we are working with events we want to ensure that we are being passive about our control,
			 * so returning true allows for events to always continue
			 */
			return true;
		});
	}

});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Country Content
 * @overview A basic AjaxLoader wrapper that inserts AJAXed in content based on a visitors country as resolved by http://freegeoip.net
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @nschonni
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once
 * per page, not once per instance of plugin on the page. So, this is a good
 * place to define variables that are common to all instances of the plugin on a
 * page.
 */
var componentName = "wb-ctrycnt",
	selector = "[data-ctrycnt]",
	initEvent = "wb-init." + componentName,
	$document = wb.doc,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered this handler
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector ),
			$elm, url;

		if ( elm ) {
			$elm = $( elm );
			url = $elm.data( "ctrycnt" );

			$.when( getCountry() ).then( function( countryCode ) {

				if ( countryCode === "" ) {

					// Leave default content since we couldn't find the country
					return;
				} else {

					// @TODO: Handle bad country values or any whitelist of countries.
				}

				url = url.replace( "{country}", countryCode.toLowerCase() );

				$elm.load( url, function() {

					// Identify that initialization has completed
					wb.ready( $elm, componentName );
				});
			});
		}
	},
	getCountry = function() {
		var dfd = $.Deferred(),
			countryCode = localStorage.getItem( "countryCode" );

		// Couldn"t find a value in the session
		if ( countryCode === null ) {

			// From https://github.com/aFarkas/webshim/blob/master/src/shims/geolocation.js#L89-L127
			$.ajax({
				url: "http://freegeoip.net/json/",
				dataType: "jsonp",
				cache: true,
				jsonp: "callback",
				success: function( data ) {
					if ( data ) {
						countryCode = data.country_code;
						try {
							localStorage.setItem( "countryCode", countryCode );
						} catch ( error ) {
						}
					}

					dfd.resolve( countryCode );
				},
				error: function() {
					dfd.reject( "" );
				}
			});
		} else {
			dfd.resolve( countryCode );
		}

		return dfd.promise();
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Data Ajax [data-ajax-after], [data-ajax-append],
 * [data-ajax-before], [data-ajax-prepend] and [data-ajax-replace]
 * @overview A basic AjaxLoader wrapper that inserts AJAXed-in content
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author WET Community
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once
 * per page, not once per instance of plugin on the page. So, this is a good
 * place to define variables that are common to all instances of the plugin on a
 * page.
 */
var componentName = "wb-data-ajax",
	selectors = [
		"[data-ajax-after]",
		"[data-ajax-append]",
		"[data-ajax-before]",
		"[data-ajax-prepend]",
		"[data-ajax-replace]"
	],
	selectorsLength = selectors.length,
	selector = selectors.join( "," ),
	initEvent = "wb-init." + componentName,
	updateEvent = "wb-update." + componentName,
	$document = wb.doc,
	s,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered this handler
	 * @param {string} ajaxType The type of AJAX operation, either after, append, before or replace
	 */
	init = function( event, ajaxType ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName + "-" + ajaxType, selector, true );

		if ( elm ) {

			ajax.apply( this, arguments );

			// Identify that initialization has completed
			wb.ready( $( elm ), componentName, [ ajaxType ] );
		}
	},

	ajax = function( event, ajaxType ) {
		var elm = event.target,
			$elm = $( elm ),
			settings = window[ componentName ],
			url = elm.getAttribute( "data-ajax-" + ajaxType ),
			fetchObj = {
				url: url
			},
			urlParts;

		// Detect CORS requests
		if ( settings && ( url.substr( 0, 4 ) === "http" || url.substr( 0, 2 ) === "//" ) ) {
			urlParts = wb.getUrlParts( url );
			if ( ( wb.pageUrlParts.protocol !== urlParts.protocol || wb.pageUrlParts.host !== urlParts.host ) && ( !Modernizr.cors || settings.forceCorsFallback ) ) {
				if ( typeof settings.corsFallback === "function" ) {
					fetchObj.dataType = "jsonp";
					fetchObj.jsonp = "callback";
					fetchObj = settings.corsFallback(fetchObj);
				}
			}
		}

		$elm.trigger({
			type: "ajax-fetch.wb",
			fetch: fetchObj
		});
	};

$document.on( "timerpoke.wb " + initEvent + " " + updateEvent + " ajax-fetched.wb", selector, function( event ) {
	var eventTarget = event.target,
		ajaxTypes = [
			"before",
			"replace",
			"after",
			"append",
			"prepend"
		],
		len = ajaxTypes.length,
		$elm, ajaxType, i, content, jQueryCaching;

	for ( i = 0; i !== len; i += 1 ) {
		ajaxType = ajaxTypes[ i ];
		if ( this.getAttribute( "data-ajax-" + ajaxType ) !== null ) {
			break;
		}
	}

	switch ( event.type ) {

	case "timerpoke":
	case "wb-init":
		init( event, ajaxType );
		break;
	case "wb-update":
		ajax( event, ajaxType );
		break;
	default:

		// Filter out any events triggered by descendants
		if ( event.currentTarget === eventTarget ) {
			$elm = $( eventTarget );

			// ajax-fetched event
			content = event.fetch.response;
			if ( content ) {

				//Prevents the force caching of nested resources
				jQueryCaching = jQuery.ajaxSettings.cache;
				jQuery.ajaxSettings.cache = true;

				// "replace" is the only event that doesn't map to a jQuery function
				if ( ajaxType === "replace") {
					$elm.html( content );
				} else {
					$elm[ ajaxType ]( content );
				}

				//Resets the initial jQuery caching setting
				jQuery.ajaxSettings.cache = jQueryCaching;
			}
		}
	}

	/*
	 * Since we are working with events we want to ensure that we are being
	 * passive about our control, so returning true allows for events to always
	 * continue
	 */
	return true;
} );

// Add the timerpoke to initialize the plugin
for ( s = 0; s !== selectorsLength; s += 1 ) {
	wb.add( selectors[ s ] );
}

})( jQuery, window, wb );

/**
 * @title WET-BOEW Data InView
 * @overview A simplified data-attribute driven plugin that responds to moving in and out of the viewport.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author WET Community
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "wb-inview",
	selector = "." + componentName,
	initEvent = "wb-init" + selector,
	scrollEvent = "scroll" + selector,
	$document = wb.doc,
	$window = wb.win,
	$elms = $(),

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered this handler
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector ),
			$elm;

		if ( elm ) {
			$elm = $( elm );
			$elms = $elms.add( $elm );

			// Allow other plugins to run first
			setTimeout(function() {
				onInView( $elm );

				// Identify that initialization has completed
				wb.ready( $elm, componentName );
			}, 1 );
		}
	},

	/**
	 * @method onInView
	 * @param {jQuery DOM element} $elm The plugin element
	 */
	onInView = function( $elm ) {
		var elementWidth = $elm.outerWidth(),
			elementHeight = $elm.outerHeight(),
			scrollTop = $window.scrollTop(),
			scrollBottom = scrollTop + $window.height(),
			scrollRight = $window.scrollLeft() + elementWidth,
			x1 = $elm.offset().left,
			x2 = x1 + elementWidth,
			y1 = $elm.offset().top,
			y2 = y1 + elementHeight,
			oldViewState = $elm.attr( "data-inviewstate" ),
			inView = ( scrollBottom < y1 || scrollTop > y2 ) || ( scrollRight < x1 || scrollRight > x2 ),

			// this is a bit of a play on true/false to get the desired effect. In short this variable depicts
			// the view state of the element
			// all - the whole element is in the viewport
			// partial - part of the element is in the viewport
			// none - no part of the element is in the viewport
			viewState = ( scrollBottom > y2 && scrollTop < y1 ) ? "all" : inView ? "none" : "partial",
			$dataInView, show;

		// Only if the view state has changed
		if ( viewState !== oldViewState ) {

			// Show on "partial"/"none" (default) or just "none" (requires "show-none" class)
			show = inView || ( $elm.hasClass( "show-none" ) ? false : viewState === "partial" );

			$elm.attr( "data-inviewstate", viewState );
			$dataInView = $( "#" + $elm.attr( "data-inview" ) );

			if ( $dataInView.length !== 0 ) {

				// Keep closed if the user closed the inView result
				if ( !$dataInView.hasClass( "user-closed" ) ) {
					if ( $dataInView.hasClass( "wb-overlay" ) ) {
						if ( !oldViewState ) {
							$dataInView.addClass( "outside-off" );
						}
						$dataInView.trigger({
							type: ( show ? "open" : "close" ),
							namespace: "wb-overlay",
							noFocus: true
						});
					} else {
						$dataInView
							.attr( "aria-hidden", !show )
							.toggleClass( "in", !show )
							.toggleClass( "out", show );
					}
				}
			}

			// Trigger an event on the element identifying that the view state has changed
			// (e.g., "all.wb-inview", "partial.wb-inview", "none.wb-inview")
			$elm.trigger( viewState + selector );
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent + " " + scrollEvent, selector, function( event ) {
	var eventTarget = event.target,
		eventType = event.type;

	switch ( eventType ) {
	case "timerpoke":
	case "wb-init":
		init( event );
		break;

	case "scroll":

		// Filter out any events triggered by descendants
		if ( event.currentTarget === eventTarget ) {
			onInView( $( eventTarget ) );
		}
		break;
	}

	/*
	 * Since we are working with events we want to ensure that we are being passive about our control,
	 * so returning true allows for events to always continue
	 */
	return true;
});

$window.on( "scroll scrollstop", function() {
	$elms.trigger( scrollEvent );
});

$document.on( "txt-rsz.wb win-rsz-width.wb win-rsz-height.wb", function() {
	$elms.trigger( scrollEvent );
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Data Picture
 * @overview Event driven port of the Picturefill library: https://github.com/scottjehl/picturefill
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @patheard
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var imgClass,
	componentName = "wb-pic",
	selector = "[data-pic]",
	initEvent = "wb-init." + componentName,
	picturefillEvent = "picfill." + componentName,
	$document = wb.doc,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered this handler
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector ),
			$elm;

		if ( elm ) {
			$elm = $( elm );

			// Store the class attribute of the plugin element.  It
			// will be added to the image created by the plugin.
			imgClass = $elm.data( "class" ) || "";

			$elm.trigger( picturefillEvent );

			// Identify that initialization has completed
			wb.ready( $elm, componentName );
		}
	},

	/**
	 * Updates the image displayed according to media queries.
	 * This is the logic ported from Picturefill.
	 * @method picturefill
	 * @param {DOM element} elm The element containing the images to be updated
	 */
	picturefill = function( elm ) {
		var matches = [],
			img = elm.getElementsByTagName( "img" )[ 0 ],
			sources = elm.getElementsByTagName( "span" ),
			i, len, matchedElm, media;

		// Loop over the data-media elements and find matching media queries
		for ( i = 0, len = sources.length; i !== len; i += 1 ) {
			media = sources[ i ].getAttribute( "data-media" );
			if ( !media || Modernizr.mq( media ) ) {
				matches.push( sources[ i ] );
			}
		}

		// If a media query match was found, add the image to the page
		if ( matches.length !== 0 ) {
			matchedElm = matches.pop();
			if ( !img ) {
				img = $document[ 0 ].createElement( "img" );
				img.alt = elm.getAttribute( "data-alt" );
				img.className = imgClass;
			}
			img.src = matchedElm.getAttribute( "data-src" );
			matchedElm.appendChild( img );

			// Fixes bug with IE8 constraining the height of the image
			// when the .img-responsive class is used.
			if ( wb.ielt9 ) {
				img.removeAttribute( "width" );
				img.removeAttribute( "height" );
			}

		// No match and an image exists: delete it
		} else if ( img ) {
			img.parentNode.removeChild( img );
		}

		// Identify that the picture has been updated
		$( elm ).trigger( "wb-updated." + componentName );
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent + " " + picturefillEvent, selector, function( event ) {
	var eventTarget = event.target,
		eventType = event.type;

	switch ( eventType ) {
	case "timerpoke":
	case "wb-init":
		init( event );
		break;

	case "picfill":

		// Filter out any events triggered by descendants
		if ( event.currentTarget === eventTarget ) {
			picturefill( eventTarget );
		}
		break;
	}
});

// Handles window resize so images can be updated as new media queries match
$document.on( "txt-rsz.wb win-rsz-width.wb win-rsz-height.wb", function() {
	$( selector ).trigger( picturefillEvent );
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Responsive equal height
 * @overview Sets the same height for all elements in a container that are rendered on the same baseline (row). Adapted from http://codepen.io/micahgodbolt/pen/FgqLc.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @thomasgohard
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "wb-eqht",
	selector = "." + componentName,
	$document = wb.doc,
	eventTimerpoke = "timerpoke.wb",
	initEvent = "wb-init" + selector,
	vAlignCSS = "vertical-align",
	vAlignDefault = "top",
	minHeightCSS = "min-height",
	minHeightDefault = "0",
	cssValueSeparator = ":",
	cssPropertySeparator = ";",
	regexCSSValue = " ?[^;]+",
	regexVAlign = new RegExp( vAlignCSS + cssValueSeparator + " ?" + regexCSSValue + cssPropertySeparator + "?", "i" ),
	regexMinHeight = new RegExp( minHeightCSS + cssValueSeparator + " ?" + regexCSSValue + cssPropertySeparator + "?", "i" ),

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector );

		if ( elm ) {

			// Remove the event handler since only want init fired once per page (not per element)
			$document.off( eventTimerpoke, selector );

			onResize();

			// Identify that initialization has completed
			wb.ready( $document, componentName );
		}
	},

	/**
	 * Re-equalise any time the window/document or a child element of 'selector' is resized.
	 * @method onResize
	 */
	onResize = function() {
		var $elm, $children, $anchor, currentChild, childCSS, minHeight, i, j,
			$elms = $( selector ),
			row = [],
			rowTop = -1,
			currentChildTop = -1,
			currentChildHeight = -1,
			tallestHeight = -1;

		for ( i = $elms.length - 1; i !== -1; i -= 1 ) {
			$elm = $elms.eq( i );
			$children = $elm.children();

			$anchor = detachElement( $elm );
			for ( j = $children.length - 1; j !== -1; j -= 1 ) {
				currentChild = $children[ j ];
				childCSS = currentChild.style.cssText.toLowerCase();

				//Ensure the CSS string ends by a seperator
				if ( childCSS.length > 0 && childCSS.substr( childCSS.length - 1 ) !== cssPropertySeparator ) {
					childCSS += cssPropertySeparator;
				}

				// Ensure all children that are on the same baseline have the same 'top' value.
				if ( childCSS.indexOf( vAlignCSS ) !== -1 ) {
					childCSS = childCSS.replace( regexVAlign, vAlignCSS + cssValueSeparator + vAlignDefault + cssPropertySeparator );
				} else {
					childCSS += " " + vAlignCSS + cssValueSeparator + vAlignDefault + cssPropertySeparator;
				}

				// Remove any previously set min height
				if ( childCSS.indexOf( minHeightCSS ) !== -1 ) {
					childCSS = childCSS.replace( regexMinHeight, minHeightCSS + cssValueSeparator + minHeightDefault + cssPropertySeparator );
				} else {
					childCSS += " " + minHeightCSS + cssValueSeparator + minHeightDefault + cssPropertySeparator;
				}

				currentChild.style.cssText = childCSS;
				$children.eq( j ).data( minHeightCSS, minHeightDefault );
			}
			$elm = reattachElement( $anchor );

			for ( j = $children.length - 1; j !== -1; j -= 1 ) {
				currentChild = $children[ j ];

				currentChildTop = currentChild.offsetTop;
				currentChildHeight = currentChild.offsetHeight;

				if ( currentChildTop !== rowTop ) {
					recordRowHeight( row, tallestHeight );

					rowTop = currentChildTop;
					tallestHeight = currentChildHeight;
				} else {
					tallestHeight = ( currentChildHeight > tallestHeight ) ? currentChildHeight : tallestHeight;
				}

				row.push( $children.eq( j ) );
			}
			recordRowHeight( row, tallestHeight );

			$anchor = detachElement( $elm );
			for ( j = $children.length - 1; j !== -1; j -= 1 ) {
				minHeight = $children.eq( j ).data( minHeightCSS );

				if ( minHeight ) {
					$children[ j ].style.minHeight = minHeight + "px";
				}
			}
			$elm = reattachElement( $anchor );

			// Identify that the height equalization was updated
			$document.trigger( "wb-updated" + selector );
		}
	},

	/**
	 * @method detachElement
	 * @param {jQuery object} $elm The element to detach
	 * @returns {object} The detached element
	 */
	detachElement = function( $elm ) {
		var $prev = $elm.prev(),
			$next = $elm.next(),
			$parent = $elm.parent();

		if ( $prev.length ) {
			$elm.data( { anchor: $prev, anchorRel: "prev" } );
		} else if ( $next.length ) {
			$elm.data( { anchor: $next, anchorRel: "next" } );
		} else if ( $parent.length ) {
			$elm.data( { anchor: $parent, anchorRel: "parent" } );
		}

		return $elm.detach();
	},

	/**
	 * @method reattachElement
	 * @param {jQuery object} $elm The element to reattach
	 * @returns {object} The reattached element
	 */
	reattachElement = function( $elm ) {
		var $anchor = $elm.data( "anchor" ),
			anchorRel = $elm.data( "anchorRel" );

		switch ( anchorRel ) {
		case "prev":
			$anchor.after( $elm );
			break;
		case "next":
			$anchor.before( $elm );
			break;
		case "parent":
			$anchor.append( $elm );
			break;
		}

		return $elm;
	},

	/**
	 * @method recordRowHeight
	 * @param {array} row The elements for which to record the height
	 * @param {integer} height The height to record
	 */
	recordRowHeight = function( row, height ) {
		var i = row.length - 1;

		// only set a height if more than one element exists in the row
		if ( i ) {
			for ( ; i !== -1; i -= 1 ) {
				row[ i ].data( minHeightCSS, height );
			}
		}
		row.length = 0;
	};

// Bind the init event of the plugin
$document.on( eventTimerpoke + " " + initEvent, selector, init );

// Handle text and window resizing
$document.on( "txt-rsz.wb win-rsz-width.wb win-rsz-height.wb wb-updated.wb-tables wb-update" + selector, onResize );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Favicon Plugin
 * @overview Provides the ability to add and update a page's favicons
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @patheard
 *
 * This plugin provides the ability to add and update the favicon's on a web page. Its default behaviour is to add a mobile favicon to web pages that have a favicon defined by a `<link rel='icon'>` element.
 *
 * The mobile favicon's file name, rel, path and sizes can be set with data attributes on the `<link rel='icon'>`:
 *
 * -**data-filename:** filename of the mobile favicon (defaults to "favicon-mobile.png"). This will be appended to the favicon's path.
 * -**data-path:** path to the mobile favicon (defaults to using the same path as the shortcut icon).
 * -**data-rel:** rel attribute of the mobile favicon (defaults to "apple-touch-icon").
 * -**data-sizes:** sizes attribute of the mobile favicon (defaults to "57x57 72x72 114x114 144x144 150x150").
 *
 * For example, the following overides the rel and file name attributes of the mobile favicon:
 *
 *     <link href="favion.ico" rel='icon' data-rel="apple-touch-icon-precomposed" data-filename="my-mobile-favicon.ico">
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "wb-favicon",
	selector = "link[rel='icon']",
	initEvent = "wb-init." + componentName,
	updatedEvent = "wb-updated." + componentName,
	mobileEvent = "mobile." + componentName,
	iconEvent = "icon." + componentName,
	$document = wb.doc,

	/*
	 * Plugin users can override these defaults by setting attributes on the html elements that the
	 * selector matches.
	 * For example, adding the attribute data-option1="false", will override option1 for that plugin instance.
	 */
	defaults = {
		filename: "favicon-mobile.png",
		path: null,
		rel: "apple-touch-icon",
		sizes: "57x57 72x72 114x114 144x144 150x150"
	},

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector ),
			$favicon, settings;

		if ( elm ) {
			$favicon = $( elm );

			// Merge default settings with overrides from the selected plugin element.
			settings = $.extend( {}, defaults, $favicon.data() );

			$favicon.trigger( mobileEvent, settings );

			// Identify that initialization has completed
			wb.ready( $document, componentName );
		}
	},

	/**
	 * Adds, or updates, the mobile favicon on a page. Mobile favicons are identified by the
	 * `apple` prefix in the `<link>` elements rel attribute.
	 * @method mobile
	 * @param {DOM element} favicon Favicon element
	 * @param {jQuery Event} event Event that triggered this handler
	 * @param {Object} data Key-value data object passed with the event
	 */
	mobile = function( favicon, event, data ) {
		var faviconPath,
			faviconMobile = $( "link[rel^='apple']" ),
			isFaviconMobile = faviconMobile.length !== 0;

		// Create the mobile favicon if it doesn't exist
		if ( !isFaviconMobile ) {
			faviconMobile = $( "<link rel='" + data.rel + "' sizes='" + data.sizes + "' class='" + componentName + "'>" );
		}

		// Only add/update a mobile favicon that was created by the plugin
		if ( faviconMobile.hasClass( componentName ) ) {
			faviconPath = data.path !== null ? data.path : getPath( favicon.getAttribute( "href" ) );
			faviconMobile.attr( "href", faviconPath + data.filename );

			if ( !isFaviconMobile ) {
				favicon.parentNode.insertBefore( faviconMobile[ 0 ], favicon );
			}
		}

		$document.trigger( updatedEvent, [ "mobile" ] );
	},

	/**
	 * Updates the the page's shortcut icon
	 * @method icon
	 * @param {DOM element} favicon Favicon element
	 * @param {jQuery Event} event Event that triggered this handler
	 * @param {Object} data Key-value data object passed with the event
	 */
	icon = function( favicon, event, data ) {
		var faviconPath = data.path !== null ? data.path : getPath( favicon.getAttribute( "href" ) );
		favicon.setAttribute( "href", faviconPath + data.filename );

		$document.trigger( updatedEvent, [ "icon" ] );
	},

	/**
	 * Given a full file path, returns the path without the filename
	 * @method getPath
	 * @param {string} filepath The full path to file, including filename
	 * @returns {string} The path to the file
	 */
	getPath = function( filepath ) {
		return filepath.substring( 0, filepath.lastIndexOf( "/" ) + 1 );
	};

// Bind the init event
$document.on( "timerpoke.wb " + initEvent, selector, init );

// Bind the mobile and icon events
$document.on( mobileEvent + " " + iconEvent, selector, function( event, data ) {
	var eventTarget = event.target;

	// Filter out any events triggered by descendants
	if ( event.currentTarget === eventTarget ) {
		switch ( event.type ) {
		case "mobile":
			mobile( eventTarget, event, data );
			break;

		case "icon":
			icon( eventTarget, event, data );
			break;
		}
	}

	/*
	 * Since we are working with events we want to ensure that we are being passive about our control,
	 * so returning true allows for events to always continue
	 */
	return true;
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Feeds
 * @overview Aggregates and displays entries from one or more Web feeds.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @pjackson28
 */
(function( $, window, wb, undef ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "wb-feeds",
	selector = "." + componentName,
	feedLinkSelector = "li > a",
	initEvent = "wb-init" + selector,
	$document = wb.doc,
	patt = /\\u([\d\w]{4})/g,

	/**
	 * @object Templates
	 * @properties {function}
	 * @param {object} requires a entry object of various ATOM based properties
	 * @returns {string} modified string with appropiate markup/format for a entry object
	 */
	Templates = {

		/**
		 * [facebook template]
		 * @param  {entry object} data
		 * @return {string}	HTML string of formatted using Media Object (twitter bootstrap)
		 */
		facebook: function( data ) {

			// Facebook feeds does not really do titles in ATOM RSS. It simply truncates content at 150 characters. We are using a JS based sentence
			// detection algorithm to better split content and titles
			var content = fromCharCode( data.content ),
				title = content.replace( /(<([^>]+)>)/ig, "" ).match( /\(?[^\.\?\!]+[\.!\?]\)?/g ),
				author = data.author.replace( /&amp;/g, "&" );

			// Sanitize the HTML from Facebook - extra 'br' tags
			content = content.replace( /(<br>\n?)+/gi, "<br />" );

			return "<li class='media'><a class='pull-left' href=''><img src='" +
				data.fIcon + "' alt='" + author +
				"' height='64px' width='64px' class='media-object'/></a><div class='media-body'>" +
				"<h4 class='media-heading'><a href='" + data.link + "'><span class='wb-inv'>" +
				title[ 0 ] + " - </span>" + author + "</a><br />" +
				( data.publishedDate !== "" ? " <small class='feeds-date text-right'><time>" +
				wb.date.toDateISO( data.publishedDate, true ) + "</time></small>" : "" ) +
				"</h4><p>" + content + "</p></div></li>";
		},

		/**
		 * [fickr template]
		 * @param  {entry object} data
		 * @return {string}	HTML string for creating a photowall effect
		 */
		flickr: function( data ) {

			var seed = wb.getId(),
				title = data.title,
				media = data.media.m,
				thumbnail = media.replace( "_m.", "_s." ),
				image = media.replace("_m", ""),
				description = data.description.replace( /^\s*<p>(.*?)<\/p>\s*<p>(.*?)<\/p>/i, "");

			// due to CORS we cannot default to simple ajax pulls of the image. We have to inline the content box
			return "<li><a class='wb-lbx' href='#" + seed + "'><img src='" + thumbnail + "' alt='" + title + "' title='" + title + "' class='img-responsive'/></a>" +
					"<section id='" + seed + "' class='mfp-hide modal-dialog modal-content overlay-def'>" +
					"<header class='modal-header'><h2 class='modal-title'>" + title + "</h2></header>" +
					"<div class='modal-body'><img src='" + image + "' class='thumbnail center-block' alt='" + title + "' />" +
					description + "</div></section>" +
					"</li>";
		},

		/**
		 * [Youtube template]
		 * @param  {entry object} data
		 * @return {string}	HTML string for creating a photowall effect
		 */
		youtube: function( data ) {
			var seed = wb.getId(),
				mediaGroup = data.media$group,
				title = mediaGroup.media$title.$t,
				thumbnail = mediaGroup.media$thumbnail[ 1 ].url,
				description = mediaGroup.media$description.$t,
				videoid = mediaGroup.yt$videoid.$t;

			// Due to CORS we cannot default to simple ajax pulls of the image. We have to inline the content box
			return "<li class='col-md-4 col-sm-6' ><a class='wb-lbx' href='#" + seed + "'><img src='" + thumbnail + "' alt='" + title + "' title='" + title + "' class='img-responsive' /></a>" +
					"<section id='" + seed + "' class='mfp-hide modal-dialog modal-content overlay-def'>" +
					"<header class='modal-header'><h2 class='modal-title'>" + title + "</h2></header>" +
					"<div class='modal-body'>" +
					"<figure class='wb-mltmd'><video title='" + title + "'>" +
					"<source type='video/youtube' src='http://www.youtube.com/watch?v=" + videoid + "' />" +
					"</video><figcaption><p>" +  description + "</p>" +
					"</figcaption></figure>" +
					"</div></section>" +
					"</li>";
		},
		/**
		 * [pinterest template]
		 * @param  {entry object}    data
		 * @return {string}    HTML string of formatted using a simple list / anchor view
		 */
		pinterest: function( data ) {
			var content = fromCharCode( data.content ).replace(/<a href="\/pin[^"]*"><img ([^>]*)><\/a>([^<]*)(<a .*)?/, "<a href='" + data.link + "'><img alt='' class='center-block' $1><br/>$2</a>$3");
			return "<li class='media'>" + content +
			( data.publishedDate !== "" ? " <small class='small feeds-date'><time>" +
			wb.date.toDateISO( data.publishedDate, true ) + "</time></small>" : "" ) + "</li>";
		},
		/**
		 * [generic template]
		 * @param  {entry object}	data
		 * @return {string}	HTML string of formatted using a simple list / anchor view
		 */
		generic: function( data ) {

			return "<li><a href='" + data.link + "'>" + data.title + "</a><br />" +
				( data.publishedDate !== "" ? " <small class='feeds-date'><time>" +
				wb.date.toDateISO( data.publishedDate, true ) + "</time></small>" : "" ) + "</li>";
		}
	},

	/**
	 * Helper function that returns the string representaion of a unicode character
	 * @method decode
	 * @param  {regex} match  unicode pattern
	 * @param  {string} code  string where unicode is needed to be converted
	 * @return {string}	unicode string character
	 */
	decode = function( match, code ) {
		return String.fromCharCode( parseInt( code, 16 ) );
	},

	/**
	 * Helper wrapper function that performs unicode decodes on a string
	 * @method fromCharCode
	 * @param  {string} s string to sanitize with escaped unicode characters
	 * @return {string}	sanitized string
	 */
	fromCharCode = function(s) {
		return s.replace( patt, decode );
	},

	/**
	 * Helper function that returns a class-based set limit on plugin instances
	 * @method getLimit
	 * @param {DOM object} elm The element to search for a class of the form limit-5
	 * @return {number} 0 if none found, which means the plugin default
	 */
	getLimit = function( elm ) {
		var count = elm.className.match( /\blimit-\d+/ );
		if ( !count ) {
			return 0;
		}
		return Number( count[ 0 ].replace( /limit-/i, "" ) );
	},

	/**
	 * Helper function that builds the URL for the JSON request
	 * @method jsonRequest
	 * http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=https%3A%2F%2Fwww.facebook.com%2Ffeeds%2Fpage.php%3Fid%3D318424514044%26format%3Drss20&num=20
	 * @param {url} url URL of the feed.
	 * @param {integer} limit Limit on the number of results for the JSON request to return.
	 * @return {url} The URL for the JSON request
	 */
	jsonRequest = function( url, limit ) {

		var requestURL = wb.pageUrlParts.protocol + "//ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=" + encodeURIComponent( decodeURIComponent( url ) );

		// API returns a maximum of 4 entries by default so only override if more entries should be returned
		if ( limit > 4 ) {
			requestURL += "&num=" + limit;
		}
		return requestURL;
	},

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector ),
			fetch, url, $content, limit, feeds, fType, last, i, callback, fElem, fIcon;

		if ( elm ) {
			$content = $( elm ).find( ".feeds-cont" );
			limit = getLimit( elm );
			feeds = $content.find( feedLinkSelector );
			last = feeds.length - 1;

			// Lets bind some variables to the node to ensure safe ajax thread counting

			$content.data( "toProcess", feeds.length )
					.data( "feedLimit", limit )
					.data( "entries", [] );

			for ( i = last; i !== -1; i -= 1 ) {
				fElem = feeds.eq( i );
				fIcon = fElem.find( "> img" );

				fetch = {
					dataType: "jsonp",
					timeout: 3000
				};

				if ( fElem.attr( "data-ajax" ) ) {

					if ( fElem.attr( "href" ).indexOf( "flickr" ) !== -1 ) {
						fType =  "flickr";
						callback = "jsoncallback";
						$content.data( componentName + "-postProcess", [ ".wb-lbx" ] );
					} else {
						fType = "youtube";
						$content.data( componentName + "-postProcess", [ ".wb-lbx", ".wb-mltmd" ] );
					}

					// We need a Gallery so lets add another plugin
					// #TODO: Lightbox review for more abstraction we should not have to add a wb.add() for overlaying
					fetch.url = fElem.attr( "data-ajax" );
					fetch.jsonp = callback;
				} else {
					url = jsonRequest( fElem.attr( "href" ), limit );
					fetch.url = url;

					// Let's bind the template to the Entries
					if ( url.indexOf( "facebook.com" ) !== -1 ) {
						fType = "facebook";
					} else if ( url.indexOf( "pinterest.com" ) > -1  ) {
						fType = "pinterest";
					} else {
						fType = "generic";
					}
				}

				fetch.jsonp = callback;

				fetch.context = {
					fIcon: ( fIcon.length !== 0 ) ? fIcon.attr( "src" ) : "",
					feedType: fType,
					_content: $content
				};

				fElem.trigger({
					type: "ajax-fetch.wb",
					fetch: fetch
				});
			}
		}
	},

	/**
	 * Process Feed/JSON Entries
	 * @method processEntries
	 * @param  {data} JSON formatted data to process
	 * @return {string}	of HTML output
	 */
	processEntries = function( data ) {
		var items = data,
			entries = [],
			icon = this.fIcon,
			$content = this._content,
			toProcess = $content.data( "toProcess" ),
			i, len;

		len = items.length;
		for ( i = 0; i !== len; i += 1 ) {
			items[ i ].fIcon =  icon ;

			if ( items[ i ].publishedDate === undef && items[ i ].published !== undef ) {
				items[ i ].publishedDate = items[ i ].published;
			}

			entries.push( items[ i ] );
		}
		// lets merge with latest entries
		entries = $.merge( entries, $content.data( "entries" ) );

		if ( toProcess === 1 ) {
			parseEntries( entries, $content.data( "feedLimit" ), $content, this.feedType );
			return 0;
		}

		toProcess -= 1 ;
		$content.data({
			"toProcess": toProcess,
			"entries": entries
		});

		return toProcess;
	},

	/**
	 * Parses the results from a JSON request and appends to an element
	 * @method parseEntries
	 * @param {object} entries Results from a JSON request.
	 * @param {integer} limit Limit on the number of results to append to the element.
	 * @param {jQuery DOM element} $elm Element to which the elements will be appended.
	 * @return {url} The URL for the JSON request
	 */
	parseEntries = function( entries, limit, $elm, feedtype ) {
		var cap = ( limit > 0 && limit < entries.length ? limit : entries.length ),
			result = "",
			compare = wb.date.compare,
			$details = $elm.closest( "details" ),
			activate = true,
			feedContSelector = ".feeds-cont",
			hasVisibilityHandler = "vis-handler",
			i, sorted, sortedEntry, $tabs;

		sorted = entries.sort( function( a, b ) {
			return compare( b.publishedDate, a.publishedDate );
		});

		for ( i = 0; i !== cap; i += 1 ) {
			sortedEntry = sorted[ i ];
			result += Templates[ feedtype ]( sortedEntry );
		}
		$elm.data( componentName + "-result", result );

		// Check to see if feed should be activated (only if visible)
		// and add handler to determine visibility
		if ( $details.length !== 0 ) {
			if ( $details.attr( "role" ) === "tabpanel" ) {
				if ( $details.attr( "aria-hidden" ) === "true" ) {
					activate = false;
					$elm.empty().addClass( "waiting" );
					$tabs = $details.closest( ".wb-tabs" );
					if ( !$tabs.hasClass( hasVisibilityHandler ) ) {
						$tabs
							.on( "wb-updated.wb-tabs", function( event, $newPanel ) {
								var $feedCont = $newPanel.find( feedContSelector );
								if ( !$feedCont.hasClass( "feed-active" ) ) {
									activateFeed( $feedCont );
								}
							})
							.addClass( hasVisibilityHandler );
					}
				}
			} else if ( !$details.attr( "open" ) ) {
				activate = false;
				$elm.empty().addClass( "waiting" );
				$details
					.children( "summary" )
						.on( "click.wb-feeds", function( event ) {
							var $summary = $( event.currentTarget ).off( "click.wb-feeds" );
							activateFeed( $summary.parent().find( feedContSelector ) );
						});
			}
		}

		if ( activate ) {
			activateFeed( $elm );
		}

		return true;
	},

	/**
	 * Activates feed results view
	 * @method activateFeed
	 * @param = {jQuery object} $elm Feed container
	 */
	activateFeed = function( $elm ) {
		var result = $elm.data( componentName + "-result" ),
			postProcess = $elm.data( componentName + "-postProcess" ),
			i, postProcessSelector;

		$elm.empty()
			.removeClass( "waiting" )
			.addClass( "feed-active" )
			.append( result );

		if ( postProcess ) {
			for ( i = postProcess.length - 1; i !== -1; i -= 1 ) {
				postProcessSelector = postProcess[ i ];
				$elm.find( postProcessSelector )
					.trigger( "wb-init" + postProcessSelector );
			}
		}

		// Identify that the feed has now been displayed
		$elm.trigger( "wb-feed-ready" + selector );
	};

$document.on( "ajax-fetched.wb", selector + " " + feedLinkSelector, function( event, context ) {
	var response = event.fetch.response,
		eventTarget = event.target,
		data;

	// Filter out any events triggered by descendants
	if ( event.currentTarget === eventTarget ) {
		data = ( response.responseData ) ? response.responseData.feed.entries : response.items || response.feed.entry;

		// Identify that initialization has completed
		// if there are no entries left to process
		if ( processEntries.apply( context, [ data ] ) === 0 ) {
			wb.ready( $( eventTarget ).closest( selector ), componentName );
		}
	}
});

// Bind the init event to the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Footnotes
 * @overview Provides a consistent, accessible way of handling footnotes across websites.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @EricDunsworth
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "wb-fnote",
	selector = "." + componentName,
	initEvent = "wb-init" + selector,
	setFocusEvent = "setfocus.wb",
	$document = wb.doc,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector ),
			$elm, footnoteDd, footnoteDt, i, len, dd, dt, dtId, $returnLinks;

		if ( elm ) {
			$elm = $( elm );
			footnoteDd = elm.getElementsByTagName( "dd" );
			footnoteDt = elm.getElementsByTagName( "dt" );

			// Apply aria-labelledby and set initial event handlers for return to referrer links
			len = footnoteDd.length;
			for ( i = 0; i !== len; i += 1 ) {
				dd = footnoteDd[ i ];
				dt = footnoteDt[ i ];
				dtId = dd.id + "-dt";
				dd.setAttribute( "tabindex", "-1" );
				dd.setAttribute( "aria-labelledby", dtId );
				dt.id = dtId ;
			}

			// Remove "first/premier/etc"-style text from certain footnote return links (via the child spans that hold those bits of text)
			$returnLinks = $elm.find( "dd p.fn-rtn a span span" ).remove();

			// Identify that initialization has completed
			wb.ready( $elm, componentName );
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

// Listen for footnote reference links that get clicked
$document.on( "click vclick", "main :not(" + selector + ") sup a.fn-lnk", function( event ) {
	var eventTarget = event.target,
		which = event.which,
		refId, $refLinkDest;

	// Ignore middle/right mouse button
	if ( !which || which === 1 ) {
		refId = "#" + wb.jqEscape( eventTarget.getAttribute( "href" ).substring( 1 ) );
		$refLinkDest = $document.find( refId );

		$refLinkDest.find( "p.fn-rtn a" )
					.attr( "href", "#" + eventTarget.parentNode.id );

		// Assign focus to $refLinkDest
		$refLinkDest.trigger( setFocusEvent );
		return false;
	}
} );

// Listen for footnote return links that get clicked
$document.on( "click vclick", selector + " dd p.fn-rtn a", function( event ) {
	var which = event.which,
		refId;

	// Ignore middle/right mouse button
	if ( !which || which === 1 ) {
		refId = "#" + wb.jqEscape( event.target.getAttribute( "href" ).substring( 1 ) );

		// Assign focus to the link
		$document.find( refId + " a" ).trigger( setFocusEvent );
		return false;
	}
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Form validation
 * @overview Provides generic validation and error message handling for Web forms.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @pjackson28
 */
(function( $, window, document, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "wb-frmvld",
	selector = "." + componentName,
	initEvent = "wb-init" + selector,
	setFocusEvent = "setfocus.wb",
	$document = wb.doc,
	idCount = 0,
	i18n, i18nText,

	defaults = {
		hdLvl: "h2",
		ignore: ":hidden"
	},

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var eventTarget = wb.init( event, componentName, selector ),
			elmId, modeJS;

		if ( eventTarget ) {
			elmId = eventTarget.id;

			// Ensure there is a unique id on the element
			if ( !elmId ) {
				elmId = componentName + "-id-" + idCount;
				idCount += 1;
				eventTarget.id = elmId;
			}

			// Read the selector node for parameters
			modeJS = wb.getMode() + ".js";

			// Only initialize the i18nText once
			if ( !i18nText ) {
				i18n = wb.i18n;
				i18nText = {
					colon: i18n( "colon" ),
					hyphen: i18n( "hyphen" ),
					error: i18n( "err" ),
					errorFound: i18n( "err-fnd" ),
					errorsFound: i18n( "errs-fnd" ),
					formNotSubmitted: i18n( "frm-nosubmit" )
				};
			}

			Modernizr.load({

				// For loading multiple dependencies
				both: [
					"site!deps/jquery.validate" + modeJS,
					"site!deps/additional-methods" + modeJS
				],
				complete: function() {
					var $elm = $( "#" + elmId ),
						$form = $elm.find( "form" ),
						formDOM = $form.get( 0 ),
						formId = $form.attr( "id" ),
						labels = formDOM.getElementsByTagName( "label" ),
						$formElms = $form.find( "input, select, textarea" ),
						$inputs = $formElms.filter( "input" ),
						$pattern = $inputs.filter( "[pattern]" ),
						submitted = false,
						$required = $formElms.filter( "[required], [data-rule-required], .required" ),
						errorFormId = "errors-" + ( !formId ? "default" : formId ),
						settings = $.extend(
							true,
							{},
							defaults,
							window[ componentName ],
							wb.getData( $elm, componentName )
						),
						summaryHeading = settings.hdLvl,
						i, len, validator;

					// Append the aria-live region (for provide message updates to screen readers)
					$elm.append( "<div class='arialive wb-inv' aria-live='polite' aria-relevant='all'></div>" );

					// Add space to the end of the labels (so separation between label and error when CSS turned off)
					len = labels.length;
					for ( i = 0; i !== len; i += 1 ) {
						labels[ i ].innerHTML += " ";
					}

					// Remove the pattern attribute until it is safe to use with jQuery Validation
					len = $pattern.length;
					for ( i = 0; i !== len; i += 1 ) {
						$pattern.eq( i ).removeAttr( "pattern" );
					}

					// Change form attributes and values that interfere with validation in IE7/8
					// TODO: Need better way of dealing with this rather than browser sniffing
					if ( wb.ieVersion > 0 && wb.ieVersion < 9 ) {
						len = $required.length;
						$required.removeAttr( "required" );
						for ( i = 0; i !== len; i += 1) {
							$required[ i ].setAttribute( "data-rule-required", "true" );
						}
						$inputs.filter( "[type=date]" ).each( function() {
							var $this = $( this ),
								$parent = $this.wrap( "<div/>" ).parent(),
								newElm = $( $parent.html().replace( "type=date", "type=text" ) );
							$parent.replaceWith( newElm );
						});
						$formElms = $form.find( "input, select, textarea" );
					}

					// The jQuery validation plug-in in action
					validator = $form.validate({
						meta: "validate",
						focusInvalid: false,
						ignore: settings.ignore,

						// Set the element which will wrap the inline error messages
						errorElement: "strong",

						// Location for the inline error messages
						// In this case we will place them in the associated label element
						errorPlacement: function( $error, $element ) {
							var type = $element.attr( "type" ),
								$fieldset, $legend;

							$error.data( "element-id", $element.attr( "id" ) );
							if ( type ) {
								type = type.toLowerCase();
								if ( type === "radio" || type === "checkbox" ) {
									$fieldset = $element.closest( "fieldset" );
									if ( $fieldset.length !== 0 ) {
										$legend = $fieldset.find( "legend" ).first();
										if ( $legend.length !== 0 && $fieldset.find( "input[name='" + $element.attr( "name" ) + "']" ) !== 1) {
											$error.appendTo( $legend );
											return;
										}
									}
								}
							}
							$error.appendTo( $form.find( "label[for='" + $element.attr( "id" ) + "']" ) );
							return;
						},

						// Create our error summary that will appear before the form
						showErrors: function( errorMap ) {
							this.defaultShowErrors();
							var $errors = $form.find( "strong.error" ).filter( ":not(:hidden)" ),
								$errorfields = $form.find( "input.error, select.error, textarea.error" ),
								$summaryContainer = $form.find( "#" + errorFormId ),
								prefixStart = "<span class='prefix'>" + i18nText.error + "&#160;",
								prefixEnd = i18nText.colon + " </span>",
								separator = i18nText.hyphen,
								ariaLive = $form.parent().find( ".arialive" )[ 0 ],
								summary, key, i, len, $error, prefix, $fieldName, $fieldset, label, labelString;

							$form
								.find( "[aria-invalid=true]" )
									.removeAttr( "aria-invalid" )
									.closest( ".form-group" )
										.removeClass( "has-error" );
							if ( $errors.length !== 0 ) {
								// Create our container if one doesn't already exist
								if ( $summaryContainer.length === 0 ) {
									$summaryContainer = $( "<section id='" + errorFormId + "' class='alert alert-danger' tabindex='-1'/>" ).prependTo( $form );
								} else {
									$summaryContainer.empty();
								}

								// Post process
								summary = "<" + summaryHeading + ">" +
									i18nText.formNotSubmitted + $errors.length +
									(
										$errors.length !== 1 ?
											i18nText.errorsFound :
											i18nText.errorFound
									) + "</" + summaryHeading + "><ul>";
								$errorfields
									.attr( "aria-invalid", "true" )
									.closest( ".form-group" )
										.addClass( "has-error" );
								len = $errors.length;
								for ( i = 0; i !== len; i += 1 ) {
									$error = $errors.eq( i );
									prefix = prefixStart + ( i + 1 ) + prefixEnd;
									$fieldName = $error.closest( "label" ).find( ".field-name" );

									// Try to find the field name in the legend (if one exists)
									if ( $fieldName.length === 0 ) {
										$fieldset = $error.closest( "fieldset" );
										if ( $fieldset.length !== 0 ) {
											$fieldName = $fieldset.find( "legend .field-name" );
										}
									}

									$error.find( "span.prefix" ).detach();
									summary += "<li><a href='#" + $error.data( "element-id" ) +
										"'>" + prefix + ( $fieldName.length !== 0 ? $fieldName.html() + separator : "" ) +
										$error.text() + "</a></li>";
									$error.html( "<span class='label label-danger'>" + prefix + $error.text() + "</span>" );
								}
								summary += "</ul>";

								// Output our error summary and place it in the error container
								$summaryContainer.append( summary );

								// Put focus on the error if the errors are generated by an attempted form submission
								if ( submitted ) {

									// Assign focus to $summaryContainer
									$summaryContainer.trigger( setFocusEvent );
								} else {

									// Update the aria-live region as necessary
									i = 0;
									for ( key in errorMap ) {
										if ( errorMap.hasOwnProperty( key ) ) {
											i += 1;
											break;
										}
									}
									if ( i !== 0 ) {
										len = $errors.length;
										for ( i = 0; i !== len; i += 1 ) {
											label = $errors[ i ].parentNode;
											if ( label.getAttribute( "for" ) === key ) {
												labelString = label.innerHTML;
												if ( labelString !== ariaLive.innerHTML ) {
													ariaLive.innerHTML = labelString;
												}
												break;
											}
										}
									} else if ( ariaLive.innerHTML.length !== 0 ) {
										ariaLive.innerHTML = "";
									}
								}

								submitted = false;
							} else {
								// Update the aria-live region as necessary
								if ( ariaLive.innerHTML.length !== 0 ) {
									ariaLive.innerHTML = "";
								}
								$summaryContainer.detach();
							}
						}, // End of showErrors()
						invalidHandler: function() {
							submitted = true;
						}
					} ); //end of validate()

					// Clear the form and remove error messages on reset
					$document.on( "click vclick touchstart", selector + " input[type=reset]", function( event ) {
						var $summaryContainer,
							which = event.which,
							ariaLive;

						// Ignore middle/right mouse buttons
						if ( !which || which === 1 ) {
							validator.resetForm();
							$summaryContainer = $form.find( "#" + errorFormId );
							if ( $summaryContainer.length > 0 ) {
								$summaryContainer.empty();
							}

							$form.find( "[aria-invalid=true]" ).removeAttr( "aria-invalid" );
							ariaLive = $form.parent().find( ".arialive" )[ 0 ];
							if ( ariaLive.innerHTML.length !== 0 ) {
								ariaLive.innerHTML = "";
							}
						}
					});

					// Tell the i18n file to execute to run any $.validator extends
					$form.trigger( "formLanguages.wb" );

					// Identify that initialization has completed
					wb.ready( $( eventTarget ), componentName );
				}
			});
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, document, wb );

/*
 * @title WET-BOEW Geomap
 * @overview Displays a dynamic map over which information from additional sources can be overlaid.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @pjackson28
 */
(function( $, wb ) {
"use strict";

var componentName = "wb-geomap",
	selector = "." + componentName,
	initEvent = "wb-init" + selector,
	$document = wb.doc,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector, true ),
			$elm, modeJS;

		if ( elm ) {
			$elm = $( elm );
			modeJS = wb.getMode() + ".js";

			Modernizr.load([ {

				// For loading multiple dependencies
				both: [
					"site!deps/proj4" + modeJS,
					"site!deps/OpenLayers" + modeJS,
					"site!deps/geomap-lib" + modeJS
				],
				complete: function() {
					$elm.trigger( "geomap.wb" );
				}
			} ]);
		}
	};

// Bind the init function to the timerpoke event
$document.on( "timerpoke.wb " + initEvent, selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, wb );

/**
 * @title WET-BOEW Lightbox
 * @overview Helps build a photo gallery on a web page.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @pjackson28
 */
(function( $, window, document, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "wb-lbx",
	selector = "." + componentName,
	initEvent = "wb-init" + selector,
	setFocusEvent = "setfocus.wb",
	dependenciesLoadedEvent = "deps-loaded" + selector,
	extendedGlobal = false,
	$document = wb.doc,
	callbacks, i18n, i18nText,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector, true ),
			elmId;

		if ( elm ) {
			elmId = elm.id;

			// Ensure the dependencies are loaded first
			$document.one( dependenciesLoadedEvent, function() {
				var elm = document.getElementById( elmId ),
					$elm = $( elm ),
					settings = {},
					firstLink;

				if ( !elm ) {
					return;
				}

				// TODO: Add swipe support

				settings.callbacks = callbacks;

				if ( elm.nodeName.toLowerCase() !== "a" ) {
					settings.delegate = "a";
					firstLink = elm.getElementsByTagName( "a" )[ 0 ];

					// Is the element a gallery?
					if ( elm.className.indexOf( "-gal" ) !== -1 ) {
						settings.gallery = {
							enabled: true
						};
					}
				} else {
					firstLink = elm;
				}

				if ( firstLink ) {
					if ( firstLink.getAttribute( "href" ).charAt( 0 ) === "#" ) {
						settings.type = "inline";
					} else if ( firstLink.className.indexOf( "lbx-iframe" ) !== -1 ) {
						settings.type = "iframe";
					} else if ( firstLink.getElementsByTagName( "img" ).length === 0 ) {
						settings.type = "ajax";
					} else {
						settings.type = "image";
					}

					if ( elm.className.indexOf( "lbx-modal" ) !== -1 ) {
						settings.modal = true;
					}
					if ( elm.className.indexOf( "lbx-ajax" ) !== -1 ) {
						settings.type = "ajax";
					}
					if ( elm.className.indexOf( "lbx-image" ) !== -1 ) {
						settings.type = "image";
					}
					if ( elm.className.indexOf( "lbx-inline" ) !== -1 ) {
						settings.type = "inline";
					}

					// Extend the settings with window[ "wb-lbx" ] then data-wb-lbx
					$elm.magnificPopup(
						$.extend(
							true,
							settings,
							window[ componentName ],
							wb.getData( $elm, componentName )
						)
					);
				}

				// Identify that initialization has completed
				wb.ready( $elm, componentName );
			});

			// Load dependencies as needed
			setup();
		}
	},

	/**
	 * @method setup
	 */
	setup = function() {

		// Only initialize the i18nText and callbacks once
		if ( !i18nText ) {
			i18n = wb.i18n;
			i18nText = {
				tClose: i18n( "overlay-close" ) + i18n( "space" ) + i18n( "esc-key" ),
				tLoading: i18n( "load" ),
				gallery: {
					tPrev: i18n( "prv-l" ),
					tNext: i18n( "nxt-r" ),
					tCounter: i18n( "lb-curr" )
				},
				image: {
					tError: i18n( "lb-img-err" ) + " (<a href=\"url%\">)"
				},
				ajax: {
					tError: i18n( "lb-xhr-err" ) + " (<a href=\"url%\">)"
				}
			};

			callbacks = {
				open: function() {

					// TODO: Better if dealt with upstream by Magnific popup
					var $item = this.currItem,
						$content = this.contentContainer,
						$wrap = this.wrap,
						$buttons = $wrap.find( ".mfp-close, .mfp-arrow" ),
						len = $buttons.length,
						i, button, $bottomBar;

					for ( i = 0; i !== len; i += 1 ) {
						button = $buttons[ i ];
						button.innerHTML += "<span class='wb-inv'> " + button.title + "</span>";
					}

					if ( $item.type === "image" ) {
						$bottomBar = $content.find( ".mfp-bottom-bar" ).attr( "id", "lbx-title" );
					} else {
						$content.attr( "role", "document" );
					}

					$wrap.append( "<span tabindex='0' class='lbx-end wb-inv'></span>" )
                        .find( ".activate-open" )
                        .trigger( "wb-activate" );

				},
				change: function() {
					var $item = this.currItem,
						$content = this.contentContainer,
						$el, $bottomBar, $source, $target,
						description, altTitleId, altTitle;

					if ( $item.type === "image" ) {
						$el = $item.el;
						$target = $item.img;
						$bottomBar = $content.find( ".mfp-bottom-bar" );

						if ( $el ) {
							$source = $el.find( "img" );
							$target.attr( "alt", $source.attr( "alt" ) );

							// Replicate aria-describedby if it exists
							description = $source.attr( "aria-describedby" );
							if ( description ) {
								$target.attr( "aria-describedby", description );
							}

							// Replicate longdesc if it exists
							description = $source.attr( "longdesc" );
							if ( description ) {
								$target.attr( "longdesc", description );
							}

							// Handle alternate titles
							altTitleId = $el.attr( "data-title" );
							if ( altTitleId ) {
								altTitle = document.getElementById( altTitleId );
								if ( altTitle !== null ) {
									$bottomBar.find( ".mfp-title" ).html( altTitle.innerHTML );
								}
							}
						} else {
							$target.attr( "alt", $bottomBar.find( ".mfp-title" ).html() );
						}
					} else {
						$content
							.find( ".modal-title, h1" )
							.first()
							.attr( "id", "lbx-title" );
					}

					$content.attr( "aria-labelledby", "lbx-title" );
				},
				parseAjax: function( mfpResponse ) {
					var urlHash = this.currItem.src.split( "#" )[ 1 ],
						$response = $( "<div>" + mfpResponse.data + "</div>" );

					// Provide the ability to filter the AJAX response HTML
					// by the URL hash
					// TODO: Should be dealt with upstream by Magnific Popup
					if ( urlHash ) {
						$response = $response.find( "#" + wb.jqEscape( urlHash ) );
					}

					$response
						.find( ".modal-title, h1" )
						.first()
						.attr( "id", "lbx-title" );

					mfpResponse.data = $response;
				}
			};
		}

		// Load Magnific Popup dependency and bind the init event handler
		Modernizr.load({
			load: "site!deps/jquery.magnific-popup" + wb.getMode() + ".js",
			complete: function() {

				// Set the dependency i18nText only once
				$.extend( true, $.magnificPopup.defaults, i18nText );
				extendedGlobal = true;

				$document.trigger( dependenciesLoadedEvent );
			}
		});
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

$document.on( "keydown", ".mfp-wrap", function( event ) {
	var $elm, $focusable, index, length;

	// If the tab key is used and filter out any events triggered by descendants
	if ( extendedGlobal && event.which === 9 ) {
		event.preventDefault();
		$elm = $( this );
		$focusable = $elm.find( ":focusable" );
		length = $focusable.length;
		index = $focusable.index( event.target ) + ( event.shiftKey ? -1 : 1 );
		if ( index === -1 ) {
			index = length - 2;
		} else if ( index === length - 1 ) {
			index = 0;
		}
		$focusable.eq( index ).trigger( setFocusEvent );
	}

	/*
	 * Since we are working with events we want to ensure that we are being passive about our control,
	 * so returning true allows for events to always continue
	 */
	return true;
});

/*
 * Sends focus to the close button if focus moves beyond the Lightbox (Jaws fix)
 */
$document.on( "focus", ".lbx-end", function( event ) {
	event.preventDefault();
	$( this )
		.closest( ".mfp-wrap" )
			.find( ":focusable" )
				.eq( 0 )
					.trigger( setFocusEvent );

	/*
	 * Since we are working with events we want to ensure that we are being passive about our control,
	 * so returning true allows for events to always continue
	 */
	return true;
});

// Outside focus detection (for screen readers that exit the lightbox
// outside the normal means)
$document.on( "focusin", "body", function( event ) {

	if ( extendedGlobal && $.magnificPopup.instance.currItem &&
		$( event.target ).closest( ".mfp-wrap" ).length === 0 &&
		$( ".popup-modal-dismiss" ).length === 0 ) {

		// Close the popup
		$.magnificPopup.close();
	}
});

// Handler for clicking on a same page link within the overlay to outside the overlay
$document.on( "click vclick", ".mfp-wrap a[href^='#']", function( event ) {
	var which = event.which,
		eventTarget = event.target,
		$lightbox, linkTarget;

	// Ignore middle/right mouse buttons
	if ( !which || which === 1 ) {
		$lightbox = $( eventTarget ).closest( ".mfp-wrap" );
		linkTarget = document.getElementById( eventTarget.getAttribute( "href" ).substring( 1 ) );

		// Ignore same page links to within the overlay and modal popups
		if ( linkTarget && !$.contains( $lightbox[ 0 ], linkTarget ) ) {
			if ( $lightbox.find( ".popup-modal-dismiss" ).length === 0 ) {

				// Stop propagation of the click event
				if ( event.stopPropagation ) {
					event.stopImmediatePropagation();
				} else {
					event.cancelBubble = true;
				}

				// Close the overlay and set focus to the same page link
				$.magnificPopup.close();
				$( linkTarget ).trigger( setFocusEvent );
			} else {
				return false;
			}
		}
	}
});

// Event handler for closing a modal popup
$( document ).on( "click", ".popup-modal-dismiss", function( event ) {
	event.preventDefault();
	$.magnificPopup.close();
});

// Event handler for opening a popup without a link
$( document ).on( "open" + selector, function( event, items, modal, title ) {
	if ( event.namespace === componentName ) {
		var isGallery = items.length > 1,
			isModal = modal && !isGallery ? modal : false,
			titleSrc = title ? function() {
					return title[ $.magnificPopup.instance.index ];
				} : "title";

		event.preventDefault();

		// Ensure the dependencies are loaded first
		$document.one( dependenciesLoadedEvent, function() {
			$.magnificPopup.open({
				items: items,
				modal: isModal,
				gallery: {
					enabled: isGallery
				},
				image: {
					titleSrc: titleSrc
				},
				callbacks: callbacks
			});
		});

		// Load dependencies as needed
		setup();
	}
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, document, wb );

/**
 * @title WET-BOEW Menu plugin
 * @overview A Menu plugin for WET
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author WET community
 */
(function( $, window, document, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "wb-menu",
	selector = "." + componentName,
	initEvent = "wb-init" + selector,
	breadcrumb = document.getElementById( "wb-bc" ),
	navCurrentEvent = "navcurr.wb",
	focusEvent = "setfocus.wb",
	menuItemSelector = "> a, > details > summary",
	$document = wb.doc,

	// Used for half second delay on showing/hiding menus because of mouse hover
	hoverDelay = 500,
	menuCount = 0,
	globalTimeout,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector ),
			$elm, ajaxFetch;

		if ( elm ) {
			$elm = $( elm );

			// Ensure the container has an id attribute
			if ( !$elm.attr( "id" ) ) {
				$elm.attr( "id", componentName + "-" + menuCount );
			}
			menuCount += 1;

			// Lets test to see if we have any menus to fetch
			// This is required for backwards compatibility. In previous versions, the menu was not integrated witht he data ajax plugin.
			ajaxFetch = $elm.data( "ajax-fetch" );
			if ( ajaxFetch ) {
				$elm.trigger({
					type: "ajax-fetch.wb",
					fetch: {
						url: ajaxFetch
					}
				});
			} else {

				//Enhance menus that don't rely on the data-ajax plugin
				ajaxFetch = $elm.data( "ajax-replace" ) || $elm.data( "ajax-append" ) || $elm.data( "ajax-prepend" );
				if ( !ajaxFetch ) {
					onAjaxLoaded( $elm, $elm );
				}
			}
		}
	},

	/**
	 * Lets set some aria states and attributes
	 * @method drizzleAria
	 * @param {jQuery DOM elements} $elements The collection of elements
	 */
	drizzleAria = function( $elements ) {
		var length = $elements.length,
			$elm, $subMenu, i;

		// Lets tweak for aria
		for ( i = 0; i !== length; i += 1 ) {
			$elm = $elements.eq( i );
			$subMenu = $elm.siblings( "ul" );

			$elm.attr({
				"aria-posinset": ( i + 1 ),
				"aria-setsize": length,
				role: "menuitem"
			});

			// if there is a submenu lets put in the aria for it
			if ( $subMenu.length !== 0 ) {

				$elm.attr( "aria-haspopup", "true" );

				$subMenu.attr({
					"aria-expanded": "false",
					"aria-hidden": "true"
				});

				// recurse into submenu
				drizzleAria( $subMenu.children( "li" ).find( menuItemSelector ) );
			}
		}
	},

	/**
	 * @method createCollapsibleSection
	 * @return {string}
	 */
	createCollapsibleSection = function( section, sectionIndex, sectionsLength, $items, itemsLength ) {

		// Use details/summary for the collapsible mechanism
		var k, $elm, elm, $item, $subItems, subItemsLength,
			$section = $( section ),
			posinset = "' aria-posinset='",
			menuitem = "role='menuitem' aria-setsize='",
			sectionHtml = "<li><details>" + "<summary class='mb-item" +
				( $section.hasClass( "wb-navcurr" ) || $section.children( ".wb-navcurr" ).length !== 0 ? " wb-navcurr'" : "'" ) +
				"' " + menuitem + sectionsLength + posinset + ( sectionIndex + 1 ) +
				"' aria-haspopup='true'>" + $section.text() + "</summary>" +
				"<ul class='list-unstyled mb-sm' role='menu' aria-expanded='false' aria-hidden='true'>";

		// Convert each of the list items into WAI-ARIA menuitems
		for ( k = 0; k !== itemsLength; k += 1 ) {
			$item = $items.eq( k );
			$elm = $item.find( menuItemSelector );
			elm = $elm[ 0 ];
			$subItems = $elm.parent().find( "> ul > li" );
			subItemsLength = $subItems.length;

			if ( subItemsLength === 0 && elm.nodeName.toLowerCase() === "a" ) {
				sectionHtml += "<li>" + $item[ 0 ].innerHTML.replace(
						/(<a\s)/,
						"$1 " + menuitem + itemsLength +
							posinset + ( k + 1 ) +
							"' tabindex='-1' "
					) + "</li>";
			} else {
				sectionHtml += createCollapsibleSection( elm, k, itemsLength, $subItems, $subItems.length );
			}
		}

		return sectionHtml + "</ul></details></li>";
	},

	/**
	 * @method createMobilePanelMenu
	 * @param {array} allProperties Properties used to build the menu system
	 * @return {string}
	 */
	createMobilePanelMenu = function( allProperties ) {
		var panel = "",
			sectionHtml, properties, sections, section, parent, $items,
			href, linkHtml, i, j, len, sectionsLength, itemsLength;

		// Process the secondary and site menus
		len = allProperties.length;
		for ( i = 0; i !== len; i += 1 ) {
			properties = allProperties[ i ];
			sectionHtml = "";
			sections = properties[ 0 ];
			sectionsLength = sections.length;
			for ( j = 0; j !== sectionsLength; j += 1 ) {
				section = sections[ j ];
				href = section.getAttribute( "href" );
				$items = $( section.parentNode ).find( "> ul > li" );
				itemsLength = $items.length;

				// Collapsible section
				if ( itemsLength !== 0 ) {
					sectionHtml += createCollapsibleSection( section, j, sectionsLength, $items, itemsLength );
				} else {
					parent = section.parentNode;

					// Menu item without a section
					if ( parent.nodeName.toLowerCase() === "li" ) {
						linkHtml = parent.innerHTML;

					// Non-list menu item without a section
					} else {
						linkHtml = "<a href='" +
							parent.getElementsByTagName( "a" )[ 0 ].href + "'>" +
							section.innerHTML + "</a>";
					}

					// Convert the list item to a WAI-ARIA menuitem
					sectionHtml += "<li class='no-sect'>" +
						linkHtml.replace(
							/(<a\s)/,
							"$1 class='mb-item' " + "role='menuitem' aria-setsize='" +
								sectionsLength + "' aria-posinset='" + ( j + 1 ) +
								"' tabindex='-1' "
						) + "</li>";
				}
			}

			// Create the panel section
			panel += "<nav role='navigation' typeof='SiteNavigationElement' id='" +
				properties[ 1 ] + "' class='" + properties[ 1 ] + " wb-menu'>" +
				"<h3>" + properties[ 2 ] + "</h3>" +
				"<ul class='list-unstyled mb-menu' role='menu'>" +
				sectionHtml + "</ul></nav>";
		}

		return panel.replace( /['"]?list-group-item['"]?/gi, "\"\"" ) + "</div>";
	},

	/**
	 * @method onAjaxLoaded
	 * @param {jQuery DOM element} $elm The plugin element
	 * @param {jQuery DOM element} $ajaxResult The AJAXed in menu content to import
	 */
	onAjaxLoaded = function( $elm, $ajaxResult ) {
		var $ajaxed = $ajaxResult && $ajaxResult.attr( "data-type" ) === "string" ? $ajaxResult : $elm,
			$menubar = $ajaxed.find( ".menu" ),
			$menu = $menubar.find( "> li > a" ),
			target = $elm.data( "trgt" ),
			$secnav = $( "#wb-sec" ),
			$info = $( "#wb-info" ),
			$language = $( "#wb-lng" ),
			search = document.getElementById( "wb-srch" ),
			panel = "",
			panelDOM = document.getElementById( target ),
			$panel = $( panelDOM ),
			allProperties = [],
			$navCurr, $menuItem, $langItems, len, i;

		/*
		 * Build the mobile panel
		 */

		// Add search
		if ( search !== null ) {
			panel += "<section class='srch-pnl'>" +
				search.innerHTML
					.replace( /h2>/i, "h3>" )
					.replace( /(for|id)="([^"]+)"/gi, "$1='$2-imprt'" ) +
				"</section>";
		}

		// Add active language offer
		if ( $language.length !== 0 ) {
			$langItems = $language.find( "li:not(.curr)" );
			len = $langItems.length;
			panel += "<section class='lng-ofr'>" +
				"<h3>" + $language.children( "h2" ).html() + "</h3>" +
				"<ul class='list-inline'>";
			for ( i = 0; i !== len; i += 1 ) {
				panel += $langItems[ i ].innerHTML
					.replace( /(<a\s.*<\/a>?)/, "<li>$1</li>" );
			}
			panel += "</ul></section>";
		}

		// Create menu system
		if ( $secnav.length !== 0 || $menubar.length !== 0 || $info.length !== 0 ) {

			// Add the secondary menu
			if ( $secnav.length !== 0 ) {
				allProperties.push([
					$secnav.find( "> ul > li > *:first-child" ).get(),
					"sec-pnl",
					$secnav.find( "h2" ).html()
				]);

				if ( $secnav.find( ".wb-navcurr" ).length === 0 ) {

					// Trigger the navcurrent plugin
					$secnav.trigger( navCurrentEvent, breadcrumb );
				}
			}

			// Add the site menu
			if ( $menubar.length !== 0 ) {

				// Add the menubar role if it is missing
				if ( !$menubar.attr( "role" ) ) {
					$menubar.attr( "role", "menubar" );
				}

				allProperties.push([
					$menu.get(),
					"sm-pnl",
					$ajaxed.find( "h2" ).html()
				]);
			}

			// Add the site information
			if ( $info.length !== 0 ) {
				allProperties.push([
					$info.find( "h3, a" ).not( "section a" ),
					"info-pnl",
					$info.find( "h2" ).html()
				]);

				if ( $info.find( ".wb-navcurr" ).length === 0 ) {

					// Trigger the navcurrent plugin
					$info.trigger( navCurrentEvent, breadcrumb );
				}
			}

			panel += createMobilePanelMenu( allProperties );
		}

		// Let's now populate the DOM since we have done all the work in a documentFragment
		panelDOM.innerHTML = "<header class='modal-header'><div class='modal-title'>" +
				document.getElementById( "wb-glb-mn" )
					.getElementsByTagName( "h2" )[ 0 ]
						.innerHTML +
				"</div></header><div class='modal-body'>" + panel + "</div>";
		panelDOM.className += " wb-overlay modal-content overlay-def wb-panel-r";
		$panel
			.trigger( "wb-init.wb-overlay" )
			.find( "summary" )
				.trigger( "wb-init.wb-details" )
				.attr( "tabindex", "-1" );
		$panel
			.find( ".mb-menu > li:first-child" )
				.find( ".mb-item" )
					.attr( "tabindex", "0" );

		/*
		 * Build the regular mega menu
		 */
		$ajaxed
			.find( ":discoverable" )
				.attr( "tabindex", "-1" );

		if ( $menu.length !== 0 ) {
			$menu[ 0 ].setAttribute( "tabindex", "0" );
			drizzleAria( $menu );
			$menu
				.filter( "[aria-haspopup=true]" )
					.append( "<span class='expicon glyphicon glyphicon-chevron-down'></span>" );
		}

		// Replace elements
		$elm.html( $ajaxed.html() );

		// Trigger the navcurrent plugin
		setTimeout(function() {
			$elm.trigger( navCurrentEvent, breadcrumb );
			$panel.find( "#sm-pnl" ).trigger( navCurrentEvent, breadcrumb );

			// Ensure that wb-navcurr is reflected in the top level
			$navCurr = $panel.find( ".wb-navcurr" );
			len = $navCurr.length;
			for ( i = 0; i !== len; i += 1 ) {
				$menuItem = $navCurr.eq( i );

				// If not at the top level, then add wb-navcurr to the top level
				if ( !$menuItem.hasClass( ".mb-item" ) ) {
					$menuItem = $menuItem
									.closest( "details" )
										.children( "summary" )
											.addClass( "wb-navcurr" );
				}
			}

			// Open up the secondary menu if it has wb-navcurr and has a submenu
			$menuItem = $panel.find( "#sec-pnl .wb-navcurr.mb-item" );
			if ( $menuItem.attr( "aria-haspopup" ) === "true" ) {
				$menuItem
					.trigger( "click" )
					.parent()
						.prop( "open", "open" );
			}

			// Identify that initialization has completed
			wb.ready( $elm, componentName );
		}, 1 );
	},

	/**
	 * @method menuIncrement
	 * @param {jQuery object} $menuItems Collection of of menu items to move between
	 * @param {jQuery object} $current Current menu item
	 * @param {integer} indexChange Requested relative change to the menu item index
	 */
	menuIncrement = function( $menuItems, $current, indexChange ) {
		var menuItemsLength = $menuItems.length,
			index = $menuItems.index( $current ) + indexChange;

		// Correct out-of-range indexes
		index = index === menuItemsLength ? 0 : index === -1 ? menuItemsLength - 1 : index;

		// Move to the new menu item
		$menuItems.eq( index ).trigger( focusEvent );
	},

	/**
	 * @method menuClose
	 * @param {jQuery DOM element} $elm Parent of the element to close
	 * @param {boolean} removeActive Whether or not to keep the active class
	 */
	menuClose = function( $elm, removeActive ) {
		$elm
			.removeClass( "sm-open" )
			.children( ".open" )
				.removeClass( "open" )
				.attr({
					"aria-hidden": "true",
					"aria-expanded": "false"
				});

		if ( removeActive ) {
			$elm.removeClass( "active" );
		}
	},

	/**
	 * @method menuDisplay
	 * @param {jQuery DOM element} $elm The plugin element
	 * @param {jQuery event} menu The menu to display
	 */
	menuDisplay = function( $elm, menu ) {
		var menuLink = menu.children( "a" );

		menuClose( $elm.find( ".active" ), true );

		// Ignore if doesn't have a submenu
		if ( menuLink.attr( "aria-haspopup" ) === "true" ) {

			// Add the open state classes
			menu
				.addClass( "active sm-open" )
				.children( ".sm" )
					.addClass( "open" )
					.attr({
						"aria-hidden": "false",
						"aria-expanded": "true"
					});
		}
	},

	/**
	 * Searches for the next link that has link text starting with a specific letter
	 * @method selectByLetter
	 * @param {integer} charCode The charCode of the letter to search for
	 * @param {DOM elements} links Collection of links to search
	 */
	selectByLetter = function( charCode, links ) {
		var len = links.length,
			keyChar = String.fromCharCode( charCode ),
			link, i;

		for ( i = 0; i !== len; i += 1 ) {
			link = links[ i ];
			if ( link.innerHTML.charAt( 0 ) === keyChar ) {
				$( link ).trigger( focusEvent );
				return true;
			}
		}

		return false;
	};

// Bind the events of the plugin
$document.on( "timerpoke.wb " + initEvent + " ajax-fetched.wb ajax-failed.wb", selector, function( event ) {

	var eventType = event.type,
		elm, $elm;

	switch ( eventType ) {
	case "ajax-fetched":
	case "ajax-failed":
		elm = event.target;

		// Filter out any events triggered by descendants
		if ( event.currentTarget === elm ) {
			$elm = $( elm );

			// Only replace the menu if there isn't an error
			onAjaxLoaded(
				$elm,
				eventType === "ajax-fetched" ? event.fetch.pointer : $elm
			);
		}
		return false;

	case "timerpoke":
	case "wb-init":
		init( event );
		break;
	}

	/*
	 * Since we are working with events we want to ensure that we are being passive about our control,
	 * so returning true allows for events to always continue
	 */
	return true;
});

$document.on( "mouseleave", selector + " .menu", function( event ) {
	// Clear the timeout for open/closing menus
	clearTimeout( globalTimeout );

	globalTimeout = setTimeout( function() {
		menuClose( $( event.currentTarget ).find( ".active" ), true );
	}, hoverDelay );
});

// Touchscreen "touches" on menubar items should close the submenu if it is open
$document.on( "touchstart click", selector + " .item[aria-haspopup=true]", function( event ) {
	var isTouchstart = event.type === "touchstart",
		which = event.which,
		$this, $parent;

	// Ignore middle and right mouse buttons
	if ( isTouchstart || ( !which || which === 1 ) ) {
		event.preventDefault();
		$this = $( this );
		$parent = $this.parent();

		// Open the submenu if it is closed
		if ( !$parent.hasClass( "sm-open" ) ) {
			$this.trigger( "focusin" );

		// Close the open submenu for a touch event
		} else if ( isTouchstart ) {
			menuClose( $parent, true );
		}
	}
});

// Click on menu items with submenus should open and close those submenus
$document.on( "click", selector + " [role=menu] [aria-haspopup=true]", function( event ) {
	var menuItem = event.currentTarget,
		parent = menuItem.parentNode,
		submenu = parent.getElementsByTagName( "ul" )[ 0 ],
		isOpen = submenu.getAttribute( "aria-hidden" ) === "false",
		menuItemOffsetTop, menuContainer;

		// Close any other open menus
		if ( !isOpen ) {
			$( parent )
				.closest( "[role^='menu']" )
					.find( "[aria-hidden=false]" )
						.parent()
							.find( "[aria-haspopup=true]" )
								.not( menuItem )
									.trigger( "click" );

			// Ensure the opened menu is in view if in a mobile panel
			menuContainer = document.getElementById( "mb-pnl" );
			menuItemOffsetTop = menuItem.offsetTop;
			if ( $.contains( menuContainer, menuItem ) &&
				menuItemOffsetTop < menuContainer.scrollTop ) {

				menuContainer.scrollTop = menuItemOffsetTop;
			}
		}

	submenu.setAttribute( "aria-expanded", !isOpen );
	submenu.setAttribute( "aria-hidden", isOpen );
});

// Clicks and touches outside of menus should close any open menus
$document.on( "click touchstart", function( event ) {
	var $openMenus,
		which = event.which;

	// Ignore middle and right mouse buttons
	if ( event.type === "touchstart" || ( !which || which === 1 ) ) {
		$openMenus = $( selector + " .sm-open" );
		if ( $openMenus.length !== 0 &&
			$( event.target ).closest( selector ).length === 0 ) {

			menuClose( $openMenus, true );
		}
	}
});

$document.on( "mouseover focusin", selector + " .item", function(event) {
	var $elm = $( event.currentTarget ),
		$parent = $elm.parent(),
		$container = $parent.closest( selector );

	// Clear the timeout for open/closing menus
	clearTimeout( globalTimeout );

	if ( event.type === "focusin" ) {
		menuDisplay( $container, $parent );
	} else {
		globalTimeout = setTimeout( function() {
			menuDisplay( $container, $parent );
		}, hoverDelay );
	}
});

/*
 * Keyboard bindings
 */
$document.on( "keydown", selector + " [role=menuitem]", function( event ) {
	var menuItem = event.currentTarget,
		which = event.which,
		$menuItem = $( menuItem ),
		hasPopup = $menuItem.attr( "aria-haspopup" ) === "true",
		$menu = $menuItem.parent().closest( "[role^='menu']" ),
		inMenuBar = $menu.attr( "role" ) === "menubar",
		$menuLink, $parentMenu, $parent, $subMenu, result,
		menuitemSelector, isOpen, menuItemOffsetTop, menuContainer;

	if ( !( event.ctrlKey || event.altKey || event.metaKey ) ) {

		// Tab key = Hide all sub-menus
		if ( which === 9 ) {
			menuClose( $( selector + " .active" ), true );

		// Menu item is within a menu bar
		} else if ( inMenuBar ) {

			// Left / right arrow = Previous / next menu item
			if ( which === 37 || which === 39 ) {
				event.preventDefault();
				menuIncrement(
					$menu.find( "> li > a" ),
					$menuItem,
					which === 37 ? -1 : 1
				);

			// Enter sub-menu
			} else if ( hasPopup && ( which === 13 || which === 38 || which === 40 ) ) {
				event.preventDefault();
				$parent = $menuItem.parent();
				$subMenu = $parent.find( ".sm" );

				// Open the submenu if it is not already open
				if ( !$subMenu.hasClass( "open" ) ) {
					menuDisplay( $menu.closest( selector ), $parent );
				}

				// Set focus on the first submenu item
				$subMenu.children( "li" ).eq( 0 ).find( menuItemSelector ).trigger( focusEvent );

			// Hide sub-menus and set focus
			} else if ( which === 27 ) {
				event.preventDefault();
				menuClose( $menu.closest( selector ).find( ".active" ), false );

			// Letters only
			} else if ( which > 64 && which < 91 ) {
				event.preventDefault();
				selectByLetter(
					which,
					$menuItem.parent().find( "> ul > li > a" ).get()
				);
			}

		// Menu item is not within a menu bar
		} else {
			menuitemSelector = menuItemSelector;

			// Up / down arrow = Previous / next menu item
			if ( which === 38 || which === 40 ) {
				event.preventDefault();
				menuIncrement(
					$menu.children( "li" ).find( menuitemSelector ),
					$menuItem,
					which === 38 ? -1 : 1
				);

			// Enter or right arrow with a submenu
			} else if ( hasPopup && ( which === 13 || which === 39 ) ) {
				$parent = $menuItem.parent();

				if ( which === 39 ) {
					event.preventDefault();
				}

				// If the menu item is a summary element
				if ( menuItem.nodeName.toLowerCase( "summary" ) ) {
					isOpen = !!$parent.attr( "open" );

					// Close any other open menus
					if ( !isOpen ) {
						$( parent )
							.closest( "[role^='menu']" )
								.find( "[aria-hidden=false]" )
									.parent()
										.find( "[aria-haspopup=true]" )
											.not( menuItem )
												.trigger( "click" );

						// Ensure the opened menu is in view if in a mobile panel
						menuContainer = document.getElementById( "mb-pnl" );
						menuItemOffsetTop = menuItem.offsetTop;
						if ( $.contains( menuContainer, menuItem ) &&
							menuItemOffsetTop < menuContainer.scrollTop ) {

							menuContainer.scrollTop = menuItemOffsetTop;
						}
					}

					// Ensure the menu is opened or stays open
					if ( ( !isOpen && which === 39 ) || ( isOpen && which === 13 ) ) {
						$menuItem.trigger( "click" );
					}

					// Update the WAI-ARIA states and move focus to
					// the first submenu item
					$parent.children( "ul" )
						.attr({
							"aria-expanded": "true",
							"aria-hidden": "false"
						})
						.find( "[role=menuitem]:first" )
							.trigger( "setfocus.wb" );
				}

			// Escape, left / right arrow without a submenu
			} else if ( which === 27 || which === 37 || which === 39 ) {
				$parent = $menu.parent();
				$parentMenu = $parent.closest( "[role^='menu']" );
				if ( which === 37 || which === 39 ) {
					event.preventDefault();
				}

				// If the parent menu is a menubar
				if ( $parentMenu.attr( "role" ) === "menubar" ) {
					$menuLink = $parent.children( "[href=#" + $menu.attr( "id" ) + "]" );

					// Escape key = Close menu and return to menu bar item
					if ( which === 27 ) {
						event.preventDefault();
						$menuLink.trigger( focusEvent );

						// Close the menu but keep the referring link active
						setTimeout(function() {
							menuClose( $menuLink.parent(), false );
						}, 1 );

					// Left / right key = Next / previous menu bar item
					} else if ( $parentMenu.attr( "role" ) === "menubar" ) {
						menuIncrement(
							$parentMenu.find( "> li > a" ),
							$menuLink,
							which === 37 ? -1 : 1
						);
					}

				// Escape or left arrow: Go up a level if there is a higher-level
				// menu or close the current submenu if there isn't
				} else if ( which !== 39 ) {
					$subMenu = $parentMenu.length !== 0 ? $menu : $menuItem;

					// There is a higher-level menu
					if ( $parentMenu.length !== 0 ) {
						event.preventDefault();
						$menu.closest( "li" )
							.find( menuitemSelector )
								.trigger( "click" )
								.trigger( "setfocus.wb" );

					// No higher-level menu but the current submenu is open
					} else if ( $menuItem.parent().children( "ul" ).attr( "aria-hidden" ) === "false" ) {
						event.preventDefault();
						$menuItem
							.trigger( "click" )
							.trigger( "setfocus.wb" );
					}
				}

			// Select a menu item in the current menu by the first letter
			} else if ( which > 64 && which < 91 ) {
				event.preventDefault();
				$parent = $menuItem.closest( "li" );

				// Try to find a match in the next siblings
				result = selectByLetter(
					which,
					$parent.nextAll().find( menuitemSelector ).get()
				);

				// If couldn't find a match, try the previous siblings
				if ( !result ) {
					result = selectByLetter(
						which,
						$parent.prevAll().find( menuitemSelector ).get()
					);
				}
			}
		}
	}
});

// Close the mobile panel if switching to medium, large or extra large view
$document.on( "mediumview.wb largeview.wb xlargeview.wb", function() {
	var mobilePanel = document.getElementById( "mb-pnl" );
	if ( mobilePanel && mobilePanel.getAttribute( "aria-hidden" ) === "false" ) {
		$( mobilePanel ).trigger( "close.wb-overlay" );
	}
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, document, wb );

/**
 * @title WET-BOEW Multimedia PLayer
 * @overview An accessible multimedia player for <audio> and <video> tags, including a Flash fallback
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author WET Community
 */
/* globals YT */
(function( $, window, wb, undef ) {
"use strict";

/* Local scoped variables*/
var componentName = "wb-mltmd",
	selector = "." + componentName,
	initEvent = "wb-init" + selector,
	template,
	i18n, i18nText,
	captionsLoadedEvent = "ccloaded" + selector,
	captionsLoadFailedEvent = "ccloadfail" + selector,
	captionsVisibleChangeEvent = "ccvischange" + selector,
	renderUIEvent = "renderui" + selector,
	initializedEvent = "inited" + selector,
	fallbackEvent = "fallback" + selector,
	youtubeEvent = "youtube" + selector,
	resizeEvent = "resize" + selector,
	templateLoadedEvent = "templateloaded" + selector,
	cuepointEvent = "cuepoint" + selector,
	captionClass = "cc_on",
	$document = wb.doc,
	$window = wb.win,

	/**
	 * @function init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var eventTarget = wb.init( event, componentName, selector, true ),
			elmId;

		if ( eventTarget ) {
			elmId = eventTarget.id;

			// Only initialize the i18nText once
			if ( !i18nText ) {
				i18n = wb.i18n;
				i18nText = {
					play: i18n( "mmp-play" ),
					pause: i18n( "pause" ),
					volume: i18n( "volume" ),
					cc_on: i18n( "cc", "on" ),
					cc_off: i18n( "cc", "off" ),
					cc_error: i18n ( "cc-err" ),
					mute_on: i18n( "mute", "on" ),
					mute_off: i18n( "mute", "off" ),
					duration: i18n( "dur" ),
					position: i18n( "pos" )
				};
			}

			if ( template === undef ) {
				template = "";
				$( eventTarget ).trigger({
					type: "ajax-fetch.wb",
					fetch: {
						url: wb.getPath( "/assets" ) + "/mediacontrols.html"
					}
				});
			} else if ( template !== "" ) {
				$( eventTarget ).trigger( templateLoadedEvent );
			}
		}
	},

	/* helper functions*/

	/**
	 * @method formatTime
	 * @description format a number of seconds to SMTPE Timecode format (HH:MM:SS.FF)
	 * @param {Float} time The time to format
	 * @returns {String} the formatted time
	 */
	formatTime = function( time ) {
		var index = 2,
			timecode = "",
			secondsIn, current, pad;

		pad = function( number, digits ) {
			return new Array( Math.max( digits - String( number ).length + 1, 0 ) ).join( 0 ) + number;
		};

		time = Math.floor( time );

		//Loop to extract hours, minutes and seconds
		while ( index >= 0 ) {
			//Get the number of seconds for the current iteration (hour, minute or second)
			secondsIn = Math.pow( 60, index );
			current = Math.floor( time / secondsIn );

			if ( timecode !== "" ) {
				timecode += ":";
			}

			timecode += pad( current, 2 );
			time -= secondsIn * current;
			index -= 1;
		}
		return timecode;
	},

	/**
	 * @method parseTime
	 * @description parse an SMTPE Timecode string (HH:MM:SS.FF) or duration (45s) and returns the number of seconds for the timecode
	 * @param {String} time The timecode or duration string to parse
	 * @returns {Float} the number of seconds in time
	 */
	parseTime = function( time ) {
		var i, parts, timeStringPortion, partLength, seconds;

		if ( time !== undef ) {
			if ( time.charAt( time.length - 1 ) === "s" ) {
				//Duration parsing
				return parseFloat( time.substring( 0, time.length - 1 ) );
			} else {
				//SMTPE Timecode Parsing
				parts = time.split( ":" ).reverse();
				seconds = 0;

				for ( i = 0, partLength = parts.length; i < partLength; i += 1 ) {
					timeStringPortion = i === 0 ?
						parseFloat( parts[ i ] ) :
						parseInt( parts[ i ], 10 );
					seconds += timeStringPortion * Math.pow( 60, i );
				}
				return seconds;
			}
		}
		return -1;
	},

	// TODO: Document this function
	expand = function( elm, withPlayer ) {
		var $this = $( elm ),
			data = $this.data( "properties" );

		return withPlayer !== undef ?
			[ $this, data, data.player ] :
			[ $this, data ];
	},

	/*
	 * Peformant micro templater
	 * @credit: https://github.com/premasagar/tim/blob/master/tinytim.js
	 * @todo: caching
	 */
	tmpl = (function() {
		var start = "{{",
			end = "}}",
			// e.g. config.person.name
			path = "[a-z0-9_$][\\.a-z0-9_]*",
			pattern = new RegExp( start + "\\s*(" + path + ")\\s*" + end, "gi" );
		return function( template, data ) {
			// Merge data into the template string
			return template.replace( pattern, function( tag, token ) {
				var path = token.split( "." ),
					len = path.length,
					lookup = data,
					i = 0;
				for ( ; i < len; i += 1 ) {
					lookup = lookup[ path[ i ] ];
					// Property not found
					if ( lookup === undef ) {
						throw "tim: '" + path[ i ] + "' not found in " + tag;
					}
					// Return the required value
					if ( i === len - 1 ) {
						return lookup;
					}
				}
			});
		};
	}()),

	/**
	 * @method parseHtml
	 * @description parse an HTML fragment and extract embed captions
	 * @param {String} content The HTML fragment containing the captions
	 * @returns {Array} An array of captions objects (ex: {text: "Caption", begin: 0, end :10})
	 */
	parseHtml = function( content ) {
		var captions = [],
			captionSelector = ".wb-tmtxt",
			captionElements = content.find( captionSelector ),
			len = captionElements.length,
			i, captionElement, json, begin, end;

		for ( i = 0; i !== len; i += 1 ) {
			captionElement = $( captionElements[ i ] );
			begin = -1;
			end = -1;

			if ( captionElement.attr( "data-begin" ) !== undef ) {
				begin = parseTime( captionElement.attr( "data-begin" ) );
				end = captionElement.attr( "data-end" ) !== undef ?
					parseTime( captionElement.attr( "data-end" ) ) :
					parseTime( captionElement.attr( "data-dur" ) ) + begin;
			} else if ( captionElement.attr( "data" ) !== undef ) {
				json = captionElement.attr( "data" )
					.replace( /(begin|dur|end)/g, "\"$1\"" )
					.replace( /'/g, "\"" );
				json = $.parseJSON( json );
				begin = parseTime( json.begin );
				end = json.end !== undef ?
					parseTime( json.end ) :
					parseTime( json.dur ) + begin;
			}

			//Removes nested captions if an
			captionElement = captionElement.clone();
			captionElement.find( captionSelector ).detach();

			captions[ captions.length ] = {
				text: captionElement.html(),
				begin: begin,
				end: end
			};
		}
		return captions;
	},

	/**
	 * @method parseXml
	 * @description parse an TTML (Xml) document and extract captions
	 * @param {String} content The TTML fragment containing the captions
	 * @returns {Array} An array of captions objects (ex: {text: "Caption", begin: 0, end :10})
	 */
	parseXml = function( content ) {
		var captions = [],
			captionSelector = "[begin]",
			captionElements = content.find( captionSelector ),
			len = captionElements.length,
			i, captionElement, begin, end;

		for ( i = 0; i !== len; i += 1 ) {
			captionElement = $( captionElements[ i ] );
			begin = parseTime( captionElement.attr( "begin" ) );
			end = captionElement.attr( "end" ) !== undef ?
				parseTime( captionElement.attr( "end" ) ) :
				parseTime( captionElement.attr( "dur" ) ) + begin;

			captionElement = captionElement.clone();
			captionElement.find( captionSelector ).detach();

			captions[ captions.length ] = {
				text: captionElement.html(),
				begin: begin,
				end: end
			};
		}
		return captions;
	},

	/**
	 * @method loadCaptionsExternal
	 * @description Loads captions from an external source (HTML embed or TTML)
	 * @param {Object} elm The jQuery object for the multimedia player loading the captions
	 * @param {String} url The url for the captions resource to load
	 * @fires ccloaded.wb-mltmd
	 * @fires ccloadfail.wb-mltmd
	 */
	loadCaptionsExternal = function( elm, url ) {
		$.ajax({
			url: url,
			dataType: "html",
			//Filters out images and objects from the content to avoid loading them
			dataFilter: function( data ) {
				return data.replace( /<img|object [^>]*>/g, "" );
			},
			success: function( data ) {
				elm.trigger({
					type: captionsLoadedEvent,
					captions: data.indexOf( "<html" ) !== -1 ?
						parseHtml( $( data ) ) :
						parseXml( $( data ) )
				});
			},
			error: function( response, textStatus, errorThrown ) {
				elm.trigger({
					type: captionsLoadFailedEvent,
					error: errorThrown
				});
			}
		});
	},

	/**
	 * @method loadCaptionsInternal
	 * @description Loads same page captions emebed in HTML
	 * @param {Object} elm The jQuery object for the multimedia player loading the captions
	 * @param {Object} obj The jQUery object containing the captions
	 * @fires ccloaded.wb-mltmd
	 */
	loadCaptionsInternal = function( elm, obj ) {
		elm.trigger({
			type: captionsLoadedEvent,
			captions: parseHtml( obj )
		});
	},

	/**
	 * @method updateCaptions
	 * @description Update the captions for a multimedia player (called from the timeupdate event of the HTML5 media API)
	 * @param {Object} area The jQuery object for the element where captions are displayed
	 * @param {Float} seconds The current time of the media (use to sync the captions)
	 * @param {Object} captions The JavaScript object containing the captions
	 */
	updateCaptions = function( area, seconds, captions ) {
		var caption, i,
			captionsLength = captions.length;

		// added &#160; (non-breaking space) to prevent caption space from collapsing
		// Used .html() instead of .append for performance purposes
		// http://jsperf.com/jquery-append-vs-html-list-performance/2
		area.html( "&#160;" );

		for ( i = 0; i < captionsLength; i += 1 ) {
			caption = captions[ i ];
			if ( seconds >= caption.begin && seconds <= caption.end ) {
				area.html( $( "<div>" + caption.text + "</div>" ) );
			}
		}
	},

	/**
	 * @method playerApi
	 * @description Normalizes the calls to the HTML5 media API and Flash Fallback
	 * @param {String} fn The function to call
	 * @param {object} args The arguments to send to the function call
	 */
	playerApi = function( fn, args ) {
		var $this, method;

		switch ( fn ) {
		case "play":
			try {
				this.object.play();
			} catch ( ex ) {
				this.object.doPlay();
			}
			break;
		case "pause":
			try {
				this.object.pause();
			} catch ( ex ) {
				this.object.doPause();
			}
			break;
		case "getCaptionsVisible":
			return $( this ).hasClass( captionClass );
		case "setCaptionsVisible":
			$this = $( this );
			if ( args ) {
				$this.addClass( captionClass );
			} else {
				$this.removeClass( captionClass );
			}
			$this.trigger( captionsVisibleChangeEvent );
			break;
		case "getBuffering":
			return this.object.buffering || false;
		case "setBuffering":
			this.object.buffering = args;
			break;
		case "getPreviousTime":
			return this.object.previousTime;
		case "setPreviousTime":
			this.object.previousTime = args;
			break;
		default:
			method = fn.charAt( 3 ).toLowerCase() + fn.substr( 4 );
			switch ( fn.substr( 0, 3 ) ) {
			case "get":
				return typeof this.object[ method ] !== "function" ?
					this.object[ method ] :
					this.object[ method ]();
			case "set":
				typeof this.object[ method ] !== "function" ?
					this.object[ method ] = args :
					this.object[ fn ]( args );
			}
		}
	},

	/**
	 * @method youTubeApi
	 * @description Normalizes the calls to the YouTube API
	 * @param {String} fn The function to call
	 * @param {object} args The arguments to send to the function call
	 */
	youTubeApi = function( fn, args ) {
		var $player = $( this.object.a ),
			state;

		switch ( fn ) {
		case "play":
			return this.object.playVideo();
		case "pause":
			return this.object.pauseVideo();
		case "getPaused":
			state = this.object.getPlayerState();
			return state === -1 || state === 0 || state === 2 || state === 5;
		case "getPlayed":
			return this.object.getPlayerState() > -1;
		case "getEnded":
			return this.object.getPlayerState() === 0;
		case "getDuration":
			return this.object.getDuration();
		case "getCurrentTime":
			return this.object.getCurrentTime();
		case "setCurrentTime":
			return this.object.seekTo( args, true );
		case "getMuted":
			return this.object.isMuted();
		case "setMuted":
			if ( args ) {
				this.object.mute();
			} else {
				this.object.unMute();
			}
			setTimeout( function() {
				$player.trigger( "volumechange" );
			}, 50 );
			break;
		case "getVolume":
			return this.object.getVolume() / 100;
		case "setVolume":
			this.object.setVolume( args * 100 );
			setTimeout( function() {
				$player.trigger( "volumechange" );
			}, 50 );
			break;
		case "getCaptionsVisible":
			return $( this ).hasClass( captionClass );
		case "setCaptionsVisible":
			if ( args ) {
				$( this).addClass( captionClass );
				this.object.loadModule("cc");
				this.object.loadModule("captions");
			} else {
				$( this ).removeClass( captionClass );
				this.object.unloadModule("cc");
				this.object.unloadModule("captions");
			}
			$player.trigger( "ccvischange" );
		}
	},

	/**
	 * @method youTubeEvents
	 * @description Youtube API event manager
	 * @param {object} event The event object fior the triggered event
	 */
	youTubeEvents = function( event ) {
		var playerTarget = event.target.getIframe(),
			$playerTarget = $( playerTarget ),
			timeline = function() {
				$playerTarget.trigger( "timeupdate" );
			};

		switch ( event.data ) {
		case null:
			$playerTarget.trigger( "canplay" );
			$playerTarget.trigger( "durationchange" );
			break;
		case -1:
			event.target.unMute();
			$playerTarget.trigger( "durationchange" );
			break;
		case 0:
			$playerTarget.trigger( "ended" );
			playerTarget.timeline = clearInterval( playerTarget.timeline );
			break;
		case 1:
			$playerTarget.trigger( "canplay" );
			$playerTarget.trigger( "play" );
			playerTarget.timeline = setInterval( timeline, 250 );
			break;
		case 2:
			$playerTarget.trigger( "pause" );
			playerTarget.timeline = clearInterval( playerTarget.timeline );
			break;
		case 3:
			playerTarget.timeline = clearInterval( playerTarget.timeline );
			break;
		}
	},

	youTubeAPIReady = function() {
		var youTube = window.youTube;
		youTube.ready = true;
		youTube.waitingPlayers.trigger( youtubeEvent );
	},

	onResize = function() {
		$( selector + " object, " + selector + " iframe, " +  selector + " video" ).trigger( resizeEvent );
	};

$document.on( "timerpoke.wb " + initEvent, selector, init );

$window.on( "resize", onResize );

$document.on( "ready", onResize );

$document.on( "ajax-fetched.wb " + templateLoadedEvent, selector, function( event ) {
	var $this = $( this );

	if ( event.type === "ajax-fetched" ) {
		template = event.fetch.pointer.html();

		//Notify all player waiting for the controls to load
		$this = $( selector );
	}

	$this.data( "template", template );

	$this.trigger({
		type: initializedEvent
	});
});

$document.on( initializedEvent, selector, function( event ) {
	if ( event.namespace === componentName ) {
		var $this = $( this ),
			$media = $this.children( "audio, video" ).eq( 0 ),
			captions = $media.children( "track[kind='captions']" ).attr( "src" ) || undef,
			id = $this.attr( "id" ),
			mId = $media.attr( "id" ) || id + "-md",
			type = $media.is( "audio" ) ? "audio" : "video",
			title = $media.attr( "title" ) || "",
			width = type === "video" ? $media.attr( "width" ) || $media.width() : 0,
			height = type === "video" ? $media.attr( "height" ) || $media.height() : 0,
			settings = wb.getData( $this, componentName ),
			data = $.extend({
				media: $media,
				captions: captions,
				id: id,
				mId: mId,
				type: type,
				title: title,
				height: height,
				width: width
			}, i18nText),
			media = $media.get( 0 ),
			youTube = window.youTube,
			url;

		if ( $media.attr( "id" ) === undef ) {
			$media.attr( "id", mId );
		}

		if ( settings !== undef ) {
			data.shareUrl = settings.shareUrl;
		}

		$this.addClass( type );

		$this.data( "properties", data );

		if ( $media.find( "[type='video/youtube']" ).length > 0 ) {
			// lets tweak some variables and start the load sequence
			url = wb.getUrlParts( $this.find( "[type='video/youtube']").attr( "src") );

			// lets set the flag for the call back
			$this.data( "youtube", url.params.v );

			// Method called the the YouTUbe API when ready

			if ( youTube.ready === false ) {
				if ( youTube.waitingPlayers === undef ) {
					youTube.waitingPlayers = $this;
				} else {
					youTube.waitingPlayers = youTube.waitingPlayers.add( $this );
				}
			} else {
				$this.trigger( youtubeEvent );
			}

			// finally lets load safely
			return Modernizr.load( {
				load: "https://www.youtube.com/iframe_api"
			} );

		} else if ( media.error === null && media.currentSrc !== "" && media.currentSrc !== undef ) {
			$this.trigger( type + selector );
		} else {
			$this.trigger( fallbackEvent );
		}

		// Identify that initialization has completed
		wb.ready( $this, componentName );
	}
});

$document.on( fallbackEvent, selector, function( event ) {
	if ( event.namespace === componentName ) {
		var ref = expand( this ),
			$this = ref[ 0 ],
			data = ref[ 1 ],
			$media = data.media,
			type = data.type,
			source = $media.find( ( type === "video" ? "[type='video/mp4']" : "[type='audio/mp3']" ) ).attr( "src" ),
			poster = $media.attr( "poster" ),
			flashvars = "id=" + data.mId,
			width = data.width,
			height = data.height > 0 ? data.height : Math.round( data.width / 1.777 ),
			playerresource = wb.getPath( "/assets" ) + "/multimedia.swf?" + new Date().getTime();

		flashvars += "&amp;media=" + encodeURI( wb.getUrlParts( source ).absolute );
		if ( type === "video" ) {
			data.poster = "<img src='" + poster + "' class='img-responsive' height='" +
				height + "' width='" + width + "' alt='" + $media.attr( "title" ) + "'/>";

			flashvars += "&amp;height=" + height + "&amp;width=" +
				width + "&amp;posterimg=" + encodeURI( wb.getUrlParts( poster ).absolute );
		}

		$this.find( "video, audio" ).replaceWith( "<object id='" + data.mId + "' width='" + width +
			"' height='" + height + "' class='" + type +
			"' type='application/x-shockwave-flash' data='" +
			playerresource + "' tabindex='-1' play='' pause=''>" +
			"<param name='movie' value='" + playerresource + "'/>" +
			"<param name='flashvars' value='" + flashvars + "'/>" +
			"<param name='allowScriptAccess' value='always'/>" +
			"<param name='bgcolor' value='#000000'/>" +
			"<param name='wmode' value='opaque'/>" +
			data.poster + "</object>" );
		$this.data( "properties", data );
		$this.trigger( renderUIEvent, type );
	}
});

/*
 *  Youtube Video mode Event
 */
$document.on( youtubeEvent, selector, function( event ) {
	if ( event.namespace === componentName ) {
		var ref = expand( this ),
			ytPlayer,
			$this = ref[ 0 ],
			data = ref[ 1 ],
			$media = data.media,
			id = $media.get( 0 ).id;

		$media.replaceWith( "<div id=" + id + "/>" );
		ytPlayer = new YT.Player( id, {
			videoId: $this.data( "youtube" ),
			playerVars: {
				autoplay: 0,
				controls: 0,
				origin: wb.pageUrlParts.host,
				modestbranding: 1,
				rel: 0,
				showinfo: 0,
				html5: 1,
				cc_load_policy: 1
			},
			events: {
				onReady: function( event ) {
					onResize();
					youTubeEvents( event );
				},
				onStateChange: youTubeEvents,
				onApiChange: function() {
					//If captions were enabled before the module was ready, re-enable them
					var t = $this.get( 0 );
					t.player( "setCaptionsVisible", t.player( "getCaptionsVisible" ) );
				}
			}
		});

		$this.addClass( "youtube" );

		$this.find( "iframe" ).attr( "tabindex", -1 );

		data.poster = "<img src='" + $media.attr( "poster" ) +
			"' class='img-responsive' height='" + data.height +
			"' width='" + data.width + "' alt='" + data.media.attr( "title" ) + "'/>";
		data.ytPlayer = ytPlayer;

		$this.data( "properties", data );
		$this.trigger( renderUIEvent, "youtube" );
	}
});

/*
 *  Native Video mode Event
 */
$document.on( "video" + selector, selector, function( event ) {
	if ( event.namespace === componentName ) {
		var ref = expand( this ),
			$this = ref[ 0 ],
			data = ref[ 1 ];

		data.poster = "<img src='" + data.media.attr( "poster" ) +
			"' class='img-responsive' height='" + data.height +
			"' width='" + data.width + "' alt='" + data.media.attr( "title" ) + "'/>";

		$this.data( "properties", data );

		$this.trigger( renderUIEvent, "video" );
	}
});

/*
 *  Native Audio mode Event
 */
$document.on( "audio" + selector, selector, function( event ) {
	if ( event.namespace === componentName ) {
		var ref = expand (this ),
			$this = ref[ 0 ],
			data = ref[ 1 ];

		data.poster = "";

		$this.data( "properties", data );

		$this.trigger( renderUIEvent, "audio" );
	}
});

$document.on( renderUIEvent, selector, function( event, type ) {
	if ( event.namespace === componentName ) {
		var ref = expand( this ),
			$this = ref[ 0 ],
			data = ref[ 1 ],
			captionsUrl = wb.getUrlParts( data.captions ),
			currentUrl = wb.getUrlParts( window.location.href ),
			$media = $this.find( "video, audio, iframe, object" ),
			$player, $overlay, $share;

		$media.after( tmpl( $this.data( "template" ), data ) );
		$overlay = $media.next().find( ".wb-mm-ovrly" ).after( $media );

		$player = $( "#" + data.mId );
		data.player = $player.is( "object" ) ? $player.children( ":first-child" ) : $player;

		// Create an adapter for the event management
		data.player.on( "durationchange play pause ended volumechange timeupdate " +
			captionsLoadedEvent + " " + captionsLoadFailedEvent + " " +
			captionsVisibleChangeEvent + " waiting canplay progress", function( event ) {
			$this.trigger( event );
		});

		this.object = data.ytPlayer || $player.get( 0 );
		this.player = ( data.ytPlayer ) ? youTubeApi : playerApi;
		$this.data( "properties", data );

		// Trigger the duration change for cases where the event was called before the event binding
		if ( type !== "youtube" && !isNaN( this.player( "getDuration" ) ) ) {
			data.player.trigger( "durationchange" );
		}

		// Load the progress polyfill if needed
		$this.find( "progress" ).trigger( "wb-init.wb-progress" );

		// Load the slider polyfill if needed
		$this.find( "input[type='range']" ).trigger( "wb-init.wb-slider" );

		// Create the share widgets if needed
		// TODO: Remove .parent() when getting rid of the overlay
		if ( data.shareUrl !== undef ) {
			$share = $( "<div class='wb-share' data-wb-share=\'{\"type\": \"" +
				( type === "audio" ? type : "video" ) + "\", \"title\": \"" +
				data.title.replace( "'", "&apos;" ) + "\", \"url\": \"" + data.shareUrl +
				"\", \"pnlId\": \"" + data.id + "-shr\"}\'></div>" )
				.insertBefore( $media.parent() )
				.trigger( "wb-init.wb-share" );
		}

		if ( data.captions === undef ) {
			return 1;
		}

		// Load the captions
		if ( currentUrl.absolute.replace( currentUrl.hash || "#", "" ) !== captionsUrl.absolute.replace( captionsUrl.hash || "#", "" ) ) {
			loadCaptionsExternal( $player, captionsUrl.absolute );
		} else {
			loadCaptionsInternal( $player, $( "#" + wb.jqEscape( captionsUrl.hash.substring( 1 ) ) ) );
		}
	}
});

/*
 * UI Bindings
 */

$document.on( "click", selector, function( event ) {
	var $target = $( event.target ),
		className = $target.attr( "class" ) || "";

	// Ignore middle and right mouse buttons
	if ( event.which === 2 || event.which === 3 ) {
		return true;
	}

	// Optimized multiple class tests to include child glyphicon because Safari was reporting the click event
	// from the child span not the parent button, forcing us to have to check for both elements
	// JSPerf for multiple class matching http://jsperf.com/hasclass-vs-is-stackoverflow/7
	if ( className.match( /playpause|-play|-pause|wb-mm-ovrly/ ) || $target.is( "object" ) ) {
		this.player( "getPaused" ) ? this.player( "play" ) : this.player( "pause" );
	} else if ( className.match( /\bcc\b|-subtitles/ )  ) {
		this.player( "setCaptionsVisible", !this.player( "getCaptionsVisible" ) );
	} else if ( className.match( /\bmute\b|-volume-(up|off)/ ) ) {
		this.player( "setMuted", !this.player( "getMuted" ) );
	} else if ( $target.is( "progress" ) || $target.hasClass( "progress" ) || $target.hasClass( "progress-bar" ) ) {
		this.player( "setCurrentTime", this.player( "getDuration" ) * ( ( event.pageX - $target.offset().left ) / $target.width() ) );
	} else if ( className.match( /\brewind\b|-backward/ ) ) {
		this.player( "setCurrentTime", this.player( "getCurrentTime" ) - this.player( "getDuration" ) * 0.05);
	} else if ( className.match( /\bfastforward\b|-forward/ ) ) {
		this.player( "setCurrentTime", this.player( "getCurrentTime" ) + this.player( "getDuration" ) * 0.05);
	} else if ( className.match( /cuepoint/ ) ) {
		$(this).trigger( { type: "cuepoint", cuepoint: $target.data( "cuepoint" ) } );
	}
});

$document.on( "input change", selector, function(event) {
	var target = event.target;

	if ( $( target ).hasClass( "volume" ) ) {
		event.currentTarget.player( "setMuted", false );
		event.currentTarget.player( "setVolume", target.value / 100 );
	}
});

$document.on( "keydown", selector, function( event ) {
	var playerTarget = event.currentTarget,
		which = event.which,
		ctrls = ".wb-mm-ctrls",
		ref = expand( playerTarget ),
		$this = ref[ 0 ],
		volume = 0,
		step = 0.05;

	if ( !( event.ctrlKey || event.altKey || event.metaKey ) ) {
		switch ( which ) {
		case 32:
			$this.find( ctrls + " .playpause" ).trigger( "click" );
			break;

		case 37:
			playerTarget.player( "setCurrentTime", this.player( "getCurrentTime" ) - this.player( "getDuration" ) * 0.05);
			break;

		case 39:
			playerTarget.player( "setCurrentTime", this.player( "getCurrentTime" ) + this.player( "getDuration" ) * 0.05);
			break;

		case 38:
			volume = Math.round( playerTarget.player( "getVolume" ) * 100 ) / 100 + step;
			playerTarget.player( "setVolume", volume < 1 ? volume : 1 );
			break;

		case 40:
			volume = Math.round( playerTarget.player( "getVolume" ) * 100 ) / 100 - step;
			playerTarget.player( "setVolume", volume > 0 ? volume : 0 );
			break;

		default:
			return true;
		}
		return false;
	}
});

$document.on( "keyup", selector, function( event ) {
	if ( event.which === 32 && !( event.ctrlKey || event.altKey || event.metaKey ) ) {

		// Allows the spacebar to be used for play/pause without double triggering
		return false;
	}
});

// TODO: recode with a more efficient to use the API than DOM crawling
$document.on( "wb-activate", selector, function( event ) {
    var playerTarget = event.currentTarget,
        ctrls = ".wb-mm-ctrls",
        ref = expand( playerTarget ),
        $this = ref[ 0 ];
    $this.find( ctrls + " .playpause" ).trigger( "click" );
});

$document.on( "durationchange play pause ended volumechange timeupdate " +
	captionsLoadedEvent + " " + captionsLoadFailedEvent + " " +
	captionsVisibleChangeEvent + " " + cuepointEvent +
	" waiting canplay", selector, function( event, simulated ) {

	var eventTarget = event.currentTarget,
		eventType = event.type,
		eventNamespace = event.namespace,
		$this = $( eventTarget ),
		invStart = "<span class='wb-inv'>",
		invEnd = "</span>",
		currentTime, $button, $slider, buttonData, isPlay, isMuted, isCCVisible, ref, skipTo, volume;
	switch ( eventType ) {
	case "play":
	case "pause":
	case "ended":
		isPlay = eventType === "play";
		$button = $this.find( ".playpause" );
		buttonData = $button.data( "state-" + ( isPlay ? "off" : "on" ) );
		if ( isPlay ) {
			$this.find( ".wb-mm-ovrly" ).addClass( "playing" );
			$this.find( ".progress" ).addClass( "active" );
		} else if ( eventType === "ended" ) {
			this.loading = clearTimeout( this.loading );
			$this.find( ".wb-mm-ovrly" ).removeClass( "playing" );
		}
		$button
			.attr( "title", buttonData )
			.children( "span" )
				.toggleClass( "glyphicon-play", !isPlay )
				.toggleClass( "glyphicon-pause", isPlay )
				.html( invStart + buttonData + invEnd );
		break;

	case "volumechange":
		isMuted = eventTarget.player( "getMuted" );
		$button = $this.find( ".mute" );
		buttonData = $button.data( "state-" + ( isMuted ? "off" : "on" ) );
		volume = eventTarget.player( "getVolume" ) * 100;
		$button
			.attr( {
				title: buttonData,
				"aria-pressed": isMuted
			} )
			.children( "span" )
				.toggleClass( "glyphicon-volume-up", !isMuted )
				.toggleClass( "glyphicon-volume-off", isMuted )
				.html( invStart + buttonData + invEnd );
		$slider = $this.find( "input[type='range']" );
		$slider[0].value = isMuted ? 0 : volume;
		$slider.trigger( "wb-update.wb-slider" );
		break;

	case "timeupdate":
		currentTime = eventTarget.player( "getCurrentTime" );
		$this.find( "progress" )
			.attr(
				"value",
				Math.round( currentTime / eventTarget.player( "getDuration" ) * 1000 ) / 10
			).trigger( "wb-update.wb-progress" );

		$this.find( ".wb-mm-tmln-crrnt span:nth-child(2)" )
			.text( formatTime( currentTime ) );

		if ( $this.hasClass( captionClass ) && $.data( eventTarget, "captions" ) !== undef ) {
			updateCaptions(
				$this.find( ".wb-mm-cc" ),
				currentTime,
				$.data( eventTarget, "captions" )
			);
		}
		break;

	case "durationchange":
		$this.find( ".wb-mm-tmln-ttl span:nth-child(2)" )
			.text( formatTime( eventTarget.player( "getDuration" ) ) );

		// Skip to pointer from the querystring
		ref = expand( this );
		skipTo = wb.pageUrlParts.params[ ref[ 1 ].id ];
		if ( skipTo ) {
				skipTo = parseTime( skipTo );
				eventTarget.player( "setCurrentTime", skipTo );
		}
		break;

	case "ccloaded":
		if ( eventNamespace === componentName ) {
			$.data( eventTarget, "captions", event.captions );
		}
		break;

	case "ccloadfail":
		if ( eventNamespace === componentName ) {
			$this.find( ".wb-mm-cc" )
				.append( "<p class='errmsg'><span>" + i18nText.cc_error + "</span></p>" )
				.end()
				.find( ".cc" )
				.attr( "disabled", "" );
		}
		break;

	case "ccvischange":
		if ( eventNamespace === componentName ) {
			isCCVisible = eventTarget.player( "getCaptionsVisible" );
			$button = $this.find( ".cc" );
			buttonData = $button.data( "state-" + ( isCCVisible ? "off" : "on" ) );
			$button.attr( {
				title: buttonData,
				"aria-pressed": isCCVisible
			} ).children( "span" ).html( invStart + buttonData + invEnd );
		}
		break;

	case "waiting":
		if ( !simulated ) {
			$document.off( "progress", selector );
		}
		this.loading = setTimeout( function() {
			$this.find( ".display" ).addClass( "waiting" );
		}, 500 );
		break;

	case "canplay":
		this.loading = clearTimeout( this.loading );
		$this.find( ".display" ).removeClass( "waiting" );
		break;
	case "cuepoint":
		eventTarget.player( "setCurrentTime", parseTime( event.cuepoint ) );
		break;
	}
});

// Fallback for browsers that don't implement the waiting events
$document.on( "progress", selector, function( event ) {
	var eventTarget = event.currentTarget,
		$this = $( eventTarget );

	// Waiting detected
	if ( this.player( "getPaused" ) === false && this.player( "getCurrentTime" ) === this.player( "getPreviousTime" ) ) {
		if ( eventTarget.player( "getBuffering" ) === false ) {
			eventTarget.player( "setBuffering", true );
			$this.trigger( "waiting", true );
		}

	// Waiting has ended
	} else if ( eventTarget.player( "getBuffering" ) === true ) {
		eventTarget.player( "setBuffering", false );
		$this.trigger( "canplay", true );
	}
	eventTarget.player( "setPreviousTime", eventTarget.player( "getCurrentTime" ) );
});

$document.on( resizeEvent, selector, function( event ) {
	if ( event.namespace === componentName ) {
		var player = event.target,
			$player = $( player ),
			ratio, newHeight;

		if ( $( event.currentTarget ).hasClass( "video" ) ) {
			if ( player.videoWidth === 0 || player.videoWidth === undef ) {
				ratio = $player.attr( "height" ) / $player.attr( "width" );

				// Calculate the new height based on the specified ratio or assume a default 16:9 ratio
				newHeight = Math.round( $player.width() * ( !isNaN( ratio ) ? ratio : 0.5625 ) );

				$player.css( "height", newHeight + "px" );
			} else {
				$player.css( "height", "" );
			}
		}
	}
});

window.onYouTubeIframeAPIReady = youTubeAPIReady;

window.youTube = {
	ready: false
};

wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW NavCurrent
 * @overview Identify URL in a navigation system that matches current page URL or a URL in the breadcrumb trail. Call by applying .trigger( "navcurr.wb", breadcrumb ) where the breadcrumb parameter is an optional object (DOM or jQuery)
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @pjackson28
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "wb-navcurr",
	selector = "." + componentName,
	$document = wb.doc,
	breadcrumbLinksArray, breadcrumbLinksUrlArray,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 * @param {jQuery DOM element | DOM element} breadcrumb Optional breadcrumb element
	 * @param {string} classNameOverride Optional class name override (default is wb-navcurr)
	 */
	init = function( event, breadcrumb, classNameOverride ) {
		if ( event.namespace === "wb" ) {

			// Start initialization
			// returns DOM object = proceed with init
			// returns undefined = do not proceed with init (e.g., already initialized)
			var menu = wb.init( event.target, componentName, selector ),
				menuLinks = menu.getElementsByTagName( "a" ),
				menuLinksArray = [],
				menuLinksUrlArray = [],
				windowLocation = window.location,
				pageUrl = windowLocation.hostname + windowLocation.pathname.replace( /^([^\/])/, "/$1" ),
				pageUrlQuery = windowLocation.search,
				match = false,
				className = classNameOverride ? classNameOverride : componentName,
				len, i, j, link, linkHref, linkUrl, linkQuery, linkQueryLen,
				localBreadcrumbLinks, localBreadcrumbLinksArray, localBreadcrumbLinksUrlArray,
				localBreadcrumbQuery, localBreadcrumbLinkUrl;

			if ( menu ) {

				// Try to find a match with the page Url and cache link + Url for later if no match found
				// Perform the check and caching in reverse to go from more specific links to more general links
				for ( i = menuLinks.length - 1; i !== -1; i -= 1 ) {
					link = menuLinks[ i ];
					linkHref = link.getAttribute( "href" );
					if ( linkHref !== null ) {
						if ( linkHref.length !== 0 && linkHref.charAt( 0 ) !== "#" ) {
							linkUrl = link.hostname + link.pathname.replace( /^([^\/])/, "/$1" );
							linkQuery = link.search;
							linkQueryLen = linkQuery.length;
							if ( pageUrl.slice( -linkUrl.length ) === linkUrl && ( linkQueryLen === 0 || pageUrlQuery.slice( -linkQueryLen ) === linkQuery ) ) {
								match = true;
								break;
							}
							menuLinksArray.push( link );
							menuLinksUrlArray.push( linkUrl );
						}
					}
				}

				// No page Url match found, try a breadcrumb link match instead
				if ( !match && breadcrumb ) {

					// Check to see if the data has been cached already
					if ( !breadcrumbLinksArray ) {

						// Pre-process the breadcrumb links
						localBreadcrumbLinksArray = [];
						localBreadcrumbLinksUrlArray = [];
						localBreadcrumbLinks = ( breadcrumb.jquery ? breadcrumb[ 0 ] : breadcrumb ).getElementsByTagName( "a" );
						len = localBreadcrumbLinks.length;
						for ( i = 0; i !== len; i += 1 ) {
							link = localBreadcrumbLinks[ i ];
							linkHref = link.getAttribute( "href" );
							if ( linkHref.length !== 0 && linkHref.charAt( 0 ) !== "#" ) {
								localBreadcrumbLinksArray.push( link );
								localBreadcrumbLinksUrlArray.push( link.hostname + link.pathname.replace( /^([^\/])/, "/$1" ) );
							}
						}

						// Cache the data in case of more than one execution (e.g., site menu + secondary navigation)
						breadcrumbLinksArray = localBreadcrumbLinksArray;
						breadcrumbLinksUrlArray = localBreadcrumbLinksUrlArray;
					} else {

						// Retrieve the cached data
						localBreadcrumbLinksArray = breadcrumbLinksArray;
						localBreadcrumbLinksUrlArray = breadcrumbLinksUrlArray;
					}

					// Try to match each breadcrumb link
					len = menuLinksArray.length;
					for ( j = localBreadcrumbLinksArray.length - 1; j !== -1; j -= 1 ) {
						localBreadcrumbLinkUrl = localBreadcrumbLinksUrlArray[ j ];
						localBreadcrumbQuery = localBreadcrumbLinksArray[ j ].search;

						for ( i = 0; i !== len; i += 1 ) {
							link = menuLinksArray[ i ];
							linkUrl = menuLinksUrlArray[ i ];
							linkQuery = link.search;
							linkQueryLen = linkQuery.length;

							if ( localBreadcrumbLinkUrl.slice( -linkUrl.length ) === linkUrl && ( linkQueryLen === 0 || localBreadcrumbQuery.slice( -linkQueryLen ) === linkQuery ) ) {
								match = true;
								break;
							}
						}
						if ( match ) {
							break;
						}
					}
				}

				if ( match ) {
					link.className += " " + className;
					if ( menu.className.indexOf( "wb-menu" ) !== -1 && link.className.indexOf( "item" ) === -1 ) {
						$( link ).closest( ".sm" ).parent().children( "a" ).addClass( className );
					}
				}

				// Identify that initialization has completed
				wb.ready( $( menu ), componentName );
			}
		}
	};

// Bind the navcurrent event of the plugin
$document.on( "navcurr.wb", init );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Overlay
 * @overview Provides multiple styles of overlays such as panels and pop-ups
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @thomasgohard, @pjackson28
 */
(function( $, window, document, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "wb-overlay",
	selector = "." + componentName,
	initEvent = "wb-init" + selector,
	closeClass = "overlay-close",
	linkClass = "overlay-lnk",
	ignoreOutsideClass = "outside-off",
	sourceLinks = {},
	setFocusEvent = "setfocus.wb",
	$document = wb.doc,
	i18n, i18nText,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector ),
			$elm, $header, closeText, overlayClose;

		if ( elm ) {
			$elm = $( elm );

			// Only initialize the i18nText once
			if ( !i18nText ) {
				i18n = wb.i18n;
				i18nText = {
					close: i18n( "close" ),
					colon: i18n( "colon" ),
					space: i18n( "space" ),
					esc: i18n( "esc-key" ),
					closeOverlay: i18n( closeClass )
				};
			}

			// Add close button
			$header = $elm.find( ".modal-title" );
			if ( $header.length !== 0 ) {
				closeText = i18nText.close + i18nText.colon + i18nText.space +
					$header.text() + i18nText.space + i18nText.esc;
			} else {
				closeText = i18nText.closeOverlay;
			}
			closeText = closeText.replace( "'", "&#39;" );
			overlayClose = "<button class='mfp-close " + closeClass +
				"' title='" + closeText + "'>&#xd7;<span class='wb-inv'> " +
				closeText + "</span></button>";

			$elm.append( overlayClose );
			elm.setAttribute( "aria-hidden", "true" );

			// Identify that initialization has completed
			wb.ready( $elm, componentName );
		}
	},

	openOverlay = function( overlayId, noFocus ) {
		var $overlay = $( "#" + wb.jqEscape( overlayId ) );

		$overlay
			.addClass( "open" )
			.attr( "aria-hidden", "false" );

		if ( !noFocus ) {
			$overlay
				.scrollTop( 0 )
				.trigger( setFocusEvent );
		}

		// Register the overlay if it wasn't previously registered
		// (only required when opening through an event)
		if ( !sourceLinks[ overlayId ] ) {
			setTimeout(function() {
				sourceLinks[ overlayId ] = null;
			}, 1 );
		}
	},

	closeOverlay = function( overlayId, noFocus, userClosed ) {
		var $overlay = $( "#" + overlayId ),
			sourceLink = sourceLinks[ overlayId ];

		$overlay
			.removeClass( "open" )
			.attr( "aria-hidden", "true" );

		if ( userClosed ) {
			$overlay.addClass( "user-closed" );
		}

		if ( !noFocus && sourceLink ) {

			// Returns focus to the source link for the overlay
			$( sourceLink ).trigger( setFocusEvent );
		}

		// Delete the source link reference
		delete sourceLinks[ overlayId ];
	};

$document.on( "timerpoke.wb " + initEvent + " keydown open" + selector +
	" close" + selector, selector, function( event ) {

	var eventType = event.type,
		which = event.which,
		eventTarget = event.target,
		eventTurrentTarget = event.currentTarget,
		overlayId = eventTurrentTarget.id,
		overlay, $focusable, index, length;

	switch ( eventType ) {
	case "timerpoke":
	case "wb-init":
		init( event );
		break;

	case "open":
		if ( eventTurrentTarget === eventTarget ) {
			openOverlay( overlayId, event.noFocus );
		}
		break;

	case "close":
		if ( eventTurrentTarget === eventTarget ) {
			closeOverlay( overlayId, event.noFocus );
		}
		break;

	default:
		overlay = document.getElementById( overlayId );

		switch ( which ) {

		// Tab key
		case 9:

			// No special tab handling when ignoring outside activity
			if ( overlay.className.indexOf( ignoreOutsideClass ) === -1 ) {
				$focusable = $( overlay ).find( ":focusable:not([tabindex='-1'])" );
				length = $focusable.length;
				index = $focusable.index( event.target ) + ( event.shiftKey ? -1 : 1 );

				if ( index === -1 || index === length ) {
					event.preventDefault();
					$focusable.eq( index === -1 ? length - 1 : 0 )
						.trigger( setFocusEvent );
				}
			}
			break;

		// Escape key
		case 27:
			if ( !event.isDefaultPrevented() ) {
				closeOverlay( overlayId, false, true );
			}
			break;
		}
	}
});

// Handler for clicking on the close button of the overlay
$document.on( "click vclick", "." + closeClass, function( event ) {
	var which = event.which;

	// Ignore middle/right mouse buttons
	if ( !which || which === 1 ) {
		closeOverlay(
			$( event.currentTarget ).closest( selector ).attr( "id" ),
			false,
			true
		);
	}
});

// Handler for clicking on a source link for the overlay
$document.on( "click vclick", "." + linkClass, function( event ) {
	var which = event.which,
		sourceLink = event.currentTarget,
		overlayId = sourceLink.hash.substring( 1 );

	// Ignore middle/right mouse buttons
	if ( !which || which === 1 ) {
		event.preventDefault();

		// Introduce a delay to prevent outside activity detection
		setTimeout(function() {

			// Stores the source link for the overlay
			sourceLinks[ overlayId ] = sourceLink;

			// Opens the overlay
			openOverlay( overlayId );
		}, 1 );
	}
});

// Handler for clicking on a same page link within the overlay to outside the overlay
$document.on( "click vclick", selector + " a[href^='#']", function( event ) {
	var which = event.which,
		eventTarget = event.target,
		href, overlay, linkTarget;

	// Ignore middle/right mouse buttons
	if ( !which || which === 1 ) {
		overlay = $( eventTarget ).closest( selector )[ 0 ];
		href = eventTarget.getAttribute( "href" );
		linkTarget = document.getElementById( href.substring( 1 ) );

		// Ignore same page links to within the overlay
		if ( href.length > 1 && !$.contains( overlay, linkTarget ) ) {

			// Stop propagation of the click event
			if ( event.stopPropagation ) {
				event.stopImmediatePropagation();
			} else {
				event.cancelBubble = true;
			}

			// Close the overlay and set focus to the same page link
			closeOverlay( overlay.id, true );
			$( linkTarget ).trigger( setFocusEvent );
		}
	}
});

// Outside activity detection
$document.on( "click vclick touchstart focusin", "body", function( event ) {
	var eventTarget = event.target,
		which = event.which,
		overlayId, overlay;

	// Ignore middle/right mouse buttons
	if ( !which || which === 1 ) {

		// Close any overlays with outside activity
		for ( overlayId in sourceLinks ) {
			overlay = document.getElementById( overlayId );
			if ( overlay && overlay.getAttribute( "aria-hidden" ) === "false" &&
				eventTarget.id !== overlayId &&
				overlay.className.indexOf( ignoreOutsideClass ) === -1 &&
				!$.contains( overlay, eventTarget ) ) {

				// Close the overlay
				closeOverlay( overlayId );
			}
		}
	}
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, document, wb );

/**
 * @title WET-BOEW Prettify Plugin
 * @overview Wrapper for Google Code Prettify library: https://code.google.com/p/google-code-prettify/
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @patheard
 */
/*
 * Syntax highlighting of source code snippets in an html page using [google-code-prettify](http://code.google.com/p/google-code-prettify/).
 *
 * 1. Apply `class="prettyprint"` to a `pre` or `code` element to apply syntax highlighting. Alternatively use `class="all-pre"` to apply syntax highlighting to all `pre` elements on the page.
 * 2. Apply `class="linenums"` to a `pre` or `code` element to add line numbers. Alternatively use `class="all-linenums"` to all applicable `pre` elements. Specify the starting number by adding `linenums:#` before `linenums`.
 * 3. Add extra language support by applying `class="lang-*"` to each applicable `pre` or `code` element. Supported language syntax CSS classes are as follows:
 *    - lang-apollo
 *    - lang-clj
 *    - lang-css
 *    - lang-dart
 *    - lang-go
 *    - lang-hs
 *    - lang-lisp
 *    - lang-lua
 *    - lang-ml
 *    - lang-n
 *    - lang-proto
 *    - lang-scala
 *    - lang-sql
 *    - lang-tex
 *    - lang-vb
 *    - lang-vhdl
 *    - lang-wiki
 *    - lang-xq
 *    - lang-yaml
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "wb-prettify",
	selector = "." + componentName,
	initEvent = "wb-init" + selector,
	prettyPrintEvent = "prettyprint" + selector,
	$document = wb.doc,

	/*
	 * Plugin users can override these defaults by setting attributes on the html elements that the
	 * selector matches.
	 */
	defaults = {
		linenums: false,
		allpre: false
	},

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector ),
			modeJS = wb.getMode() + ".js",
			deps = [ "site!deps/prettify" + modeJS ],
			$elm, classes, settings, i, len, $pre;

		if ( elm ) {
			$elm = $( elm );
			classes = elm.className.split( " " );

			// Merge default settings with overrides from the selected plugin element. There may be more than one, so don't override defaults globally!
			settings = $.extend( {}, defaults, $elm.data() );

			// Check the element for `lang-*` syntax CSS classes
			for ( i = 0, len = classes.length; i !== len; i += 1 ) {
				if ( classes[ i ].indexOf( "lang-" ) === 0 ) {
					deps.push( "site!deps/" + classes[ i ] + modeJS );
				}
			}

			// CSS class overides of settings
			settings.allpre = settings.allpre || $elm.hasClass( "all-pre" );
			settings.linenums = settings.linenums || $elm.hasClass( "linenums" );

			// Apply global settings
			if ( settings.allpre || settings.linenums ) {
				$pre = $document.find( "pre" );
				if ( settings.allpre ) {
					$pre.addClass( "prettyprint" );
				}
				if ( settings.linenums ) {
					$pre.filter( ".prettyprint" ).addClass( "linenums" );
				}
			}

			// Load the required dependencies and prettify the code once finished
			Modernizr.load({
				load: deps,
				complete: function() {
					$document.trigger( prettyPrintEvent );
				}
			});
		}
	},

	prettifyDone = function() {

		// Identify that initialization has completed
		wb.ready( $document, componentName );
	},

	/*
	 * Invoke the Google pretty print library if it has been initialized
	 * @method prettyprint
	 */
	prettyprint = function( event ) {
		if ( event.namespace === componentName &&
			typeof window.prettyPrint === "function" ) {

			window.prettyPrint( prettifyDone );
		}
	};

// Bind the plugin events
$document
	.on( "timerpoke.wb " + initEvent, selector, init )
	.on( prettyPrintEvent, prettyprint );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Resize
 * @overview Text and window resizing event handler
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @pjackson28
 */
(function( $, window, document, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "wb-rsz",
	selector = "#" + componentName,
	initEvent = "wb-init" + selector,
	$document = wb.doc,
	sizes = [],
	events = [
		"txt-rsz.wb",
		"win-rsz-width.wb",
		"win-rsz-height.wb"
	],

	// Breakpoint names and lower pixel limits
	breakpoints = {
		xxsmallview: 0,
		xsmallview: 480,
		smallview: 768,
		mediumview: 992,
		largeview: 1200,
		xlargeview: 1600
	},
	eventsAll, resizeTest, currentView,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector ),
			localResizeTest;

		if ( elm ) {

			// Set up the DOM element used for resize testing
			localResizeTest = document.createElement( "span" );
			localResizeTest.innerHTML = "&#160;";
			localResizeTest.setAttribute( "id", componentName );
			document.body.appendChild( localResizeTest );
			resizeTest = localResizeTest;

			// Get a snapshot of the current sizes
			sizes = [
				localResizeTest.offsetHeight,
				window.innerWidth || $document.width(),
				window.innerHeight || $document.height()
			];

			// Create a string containing all the events
			eventsAll = events.join( " " );

			// Determine the current view
			viewChange( sizes[ 1 ] );

			// Identify that initialization has completed
			wb.ready( $document, componentName );
		}
	},

	viewChange = function( viewportWidth ) {
		var breakpoint, viewName;

		// Check for a change between views
		for ( breakpoint in breakpoints ) {

			// Determine the current view
			if ( viewportWidth < breakpoints[ breakpoint ] ) {
				break;
			} else {
				viewName = breakpoint;
			}
		}

		// Determine if the current view is different than the previous view
		if ( viewName !== currentView ) {

			// Change the breakpoint class on the html element
			wb.html
				.removeClass( currentView || "" )
				.addClass( viewName );

			// Update the current view
			currentView = viewName;

			// Trigger the view event
			$document.trigger( viewName + ".wb" );
		}
	},

	/**
	 * Tests for text size, window width and window height changes and triggers an event when a change is found
	 * @method test
	 */
	test = function() {
		var currentSizes = [
				resizeTest.offsetHeight,
				window.innerWidth || $document.width(),
				window.innerHeight || $document.height()
			],
			len = currentSizes.length,
			i;

		// Check for a viewport or text size change
		for ( i = 0; i !== len; i += 1 ) {
			if ( currentSizes[ i ] !== sizes[ i ] ) {

				// Change detected so trigger related event
				$document.trigger( events[ i ], currentSizes );

				// Check for a view change
				viewChange( currentSizes[ 1 ] );
			}
		}
		sizes = currentSizes;

		return;
	};

// Bind the init event to the plugin
$document.on( initEvent, init );

// Re-test on each timerpoke
$document.on( "timerpoke.wb", selector, test );

// Initialize the resources
$document.trigger( initEvent );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, document, wb );

/**
 * @title WET-BOEW Session Timeout
 * @overview Helps Web asset owners to provide session timeout and inactivity timeout functionality.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @patheard
 */
(function( $, window, document, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var $modal, $modalLink, countdownInterval, i18n, i18nText,
	$document = wb.doc,
	componentName = "wb-sessto",
	selector = "." + componentName,
	confirmClass = componentName + "-confirm",
	initEvent = "wb-init" + selector,
	resetEvent = "reset" + selector,
	keepaliveEvent = "keepalive" + selector,
	inactivityEvent = "inactivity" + selector,
	dataAttr = componentName,

	/*
	 * Plugin users can override these defaults by setting attributes on the html elements that the
	 * selector matches.
	 * For example, adding the attribute data-option1="false", will override option1 for that plugin instance.
	 */
	defaults = {
		inactivity: 1200000,		// default inactivity period 20 minutes
		reactionTime: 180000,		// default confirmation period of 3 minutes
		sessionalive: 1200000,		// default keepalive period of 20 minutes
		refreshCallbackUrl: null,	// refresh callback if using AJAX keepalive (no default)
		logouturl: "./",			// logout URL once the session has expired
		refreshOnClick: true,		// refresh session if user clicks on the page
		refreshLimit: 200000		// default period of 2 minutes (ajax calls happen only once during this period)
	},

	/**
	 * @function init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector ),
			$elm, settings, onReady;

		if ( elm ) {
			$elm = $( elm );

			// For backwards compatibility where data-wet-boew was used instead of data-wb-sessto
			if ( !$elm.attr( "data-" + componentName ) ) {
				dataAttr = "wet-boew";
			}

			// Merge default settings with overrides from the plugin element
			// and save back to the element for future reference
			settings = $.extend( {}, defaults, window[ componentName ], $elm.data( dataAttr ) );
			$elm.data( dataAttr, settings );

			// Only initialize the i18nText once
			if ( !i18nText ) {
				i18n = wb.i18n;
				i18nText = {
					buttonContinue: i18n( "st-btn-cont" ),
					buttonEnd: i18n( "st-btn-end" ),
					buttonSignin: i18n( "tmpl-signin" ),
					timeoutBegin: i18n( "st-to-msg-bgn" ),
					timeoutEnd: i18n( "st-to-msg-end" ),
					timeoutTitle: i18n( "st-msgbx-ttl" ),
					timeoutAlready: i18n( "st-alrdy-to-msg" )
				};
			}

			onReady = function() {
				// Setup the refresh on click behaviour
				initRefreshOnClick( $elm, settings );

				// Initialize the keepalive and inactive timeouts of the plugin
				$elm.trigger( resetEvent, settings );

				// Identify that initialization has completed
				wb.ready( $elm, componentName );
			};

			// Create the modal dialog
			initModalDialog(onReady);
		}
	},

	/**
	 * Initializes a timeout that triggers an event
	 * @function initEventTimeout
	 * @param {jQuery DOM Element} $elm Element to trigger the event on
	 * @param {string} eventName Name of the event to trigger on setTimeout
	 * @param {mixed} time Time to wait before triggering the event
	 * @param {Object} settings Key-value object
	 */
	initEventTimeout = function( $elm, eventName, time, settings ) {
		// Clear any existing timeout for the event
		clearTimeout( $elm.data( eventName ) );

		// Create the new timeout that will trigger the event
		$elm.data( eventName, setTimeout(function() {
			$elm.trigger( eventName, settings );
		}, parseTime( time ) ) );
	},

	/**
	 * Creates the modal dialog element, appends to the <body> and initializes the lightbox plugin
	 * that is used to create the dialog behaviour.
	 * @function initModalDialog
	 */
	initModalDialog = function( callback ) {
		var modalID = "#" + componentName + "-modal",
			child, modal, temp;

		if ( $document.find( modalID ).length === 0 ) {
				modal = document.createDocumentFragment(),
				temp = document.createElement( "div" );

			// Create the modal dialog.  A temp <div> element is used so that its innerHTML can be set as a string.
			temp.innerHTML = "<a class='wb-lbx lbx-modal mfp-hide' href='#" + componentName + "-modal'></a>" +
				"<section id='" + componentName + "-modal' class='mfp-hide modal-dialog modal-content overlay-def'>" +
				"<header class='modal-header'><h2 class='modal-title'>" + i18nText.timeoutTitle + "</h2></header>" +
				"<div class='modal-body'></div>" +
				"<div class='modal-footer'></div>" +
				"</section>";

			// Get the temporary <div>'s top level children and append to the fragment
			while ( child = temp.firstChild ) {
				modal.appendChild( child );
			}
			document.body.appendChild( modal );

			$modal = $document.find( modalID );

			// Get object references to the modal and its triggering link
			$modalLink = $modal.prev()
				.one( "wb-ready.wb-lbx", callback)
				.trigger( "wb-init.wb-lbx" );
		} else {
			callback();
		}
	},

	/**
	 * Initialize the refresh on click keepalive behaviour. This will cause a `keepalive.wb-sessto`
	 * event to be triggered when the document is clicked, limited by the settings.refreshLimit value.
	 * @function initRefreshOnClick
	 * @param {jQuery DOM Element} $elm DOM element to trigger the event on
	 * @param {Object} settings Key-value object that will be passed when event is triggered.
	 */
	initRefreshOnClick = function( $elm, settings ) {
		if ( settings.refreshOnClick ) {
			$document.on( "click", function( event ) {
				var className = event.target.className,
					lastActivity, currentTime;

				// Ignore clicks when the modal dialog is open
				if ( ( !className || className.indexOf( confirmClass ) === -1 ) &&
					$( ".mfp-ready ." + confirmClass ).length === 0 ) {

					lastActivity = $elm.data( "lastActivity" );
					currentTime = getCurrentTime();
					if ( !lastActivity || ( currentTime - lastActivity ) > settings.refreshLimit ) {
						$elm
							.trigger( resetEvent, settings )
							.trigger( keepaliveEvent, settings );
					}
					$elm.data( "lastActivity", currentTime );
				}
			});
		}
	},

	/**
	 * Keepalive session event handler. Sends the POST request to determine if the session is still alive.
	 * @function keepalive
	 * @param {jQuery Event} event `keepalive.wb-sessto` event that triggered the function call
	 * @param {Object} settings Key-value object
	 */
	keepalive = function( event, settings ) {
		var $elm = $( event.target );
		if ( settings.refreshCallbackUrl !== null ) {
			$.post( settings.refreshCallbackUrl, function( response ) {
				// Session is valid
				if ( response && response.replace( /\s/g, "" ) === "true" ) {
					$elm.trigger( resetEvent, settings );

				// Session has timed out - let the user know they need to sign in again
				} else {

					// End the inactivity timeouts since the session is already kaput
					clearTimeout( $elm.data( inactivityEvent ) );
					clearTimeout( $elm.data( keepaliveEvent ) );

					openModal({
						body: "<p>" + i18nText.timeoutAlready + "</p>",
						buttons: $( "<button type='button' class='" + confirmClass +
							" btn btn-primary'>" + i18nText.buttonSignin + "</button>" )
								.data( "logouturl", settings.logouturl )
					});
				}
			});
		}
	},

	/**
	 * Inactivity check event handler. Displays the modal dialog to allow the user to confirm their activity.
	 * @function inactivity
	 * @param {jQuery Event} event `inactivity.wb-sessto` event that triggered the function call
	 * @param {Object} settings Key-value object
	 */
	inactivity = function( event, settings ) {
		var $buttonContinue, $buttonEnd,
			time = getTime( settings.reactionTime ),
			timeoutBegin = i18nText.timeoutBegin
				.replace( "#min#", "<span class='min'>" + time.minutes + "</span>" )
				.replace( "#sec#", "<span class='sec'>" + time.seconds + "</span>" ),
			buttonStart = "<button type='button' class='",
			buttonEnd = "</button>";

		// Clear the keepalive timeout to avoid double firing of requests
		clearTimeout( $( event.target ).data( keepaliveEvent ) );

		$buttonContinue = $( buttonStart + confirmClass +
			" btn btn-primary'>" + i18nText.buttonContinue + buttonEnd )
				.data( settings )
				.data( "start", getCurrentTime() );
		$buttonEnd = $( buttonStart + confirmClass + " btn btn-default'>" +
			i18nText.buttonEnd + buttonEnd )
				.data( "logouturl", settings.logouturl );

		openModal({
			body: "<p>" + timeoutBegin + "<br />" + i18nText.timeoutEnd + "</p>",
			buttons: [ $buttonContinue, $buttonEnd ],
			open: function() {
				var $minutes = $modal.find( ".min" ),
					$seconds = $modal.find( ".sec" );
				countdownInterval = setInterval(function() {
					if ( countdown( $minutes, $seconds ) ) {
						clearInterval( countdownInterval );

						// Let the user know their session has timed out
						$modal.find( "p" ).text( i18nText.timeoutAlready );
						$buttonContinue.text( i18nText.buttonSignin );
						$buttonEnd.hide();
					}
				}, 1000 );
			}
		});
	},

	/**
	 * Initialize the inactivity and keepalive timeouts of the plugin
	 * @function reset
	 * @param {jQuery Event} event `reset.wb-sessto` event that triggered the function call
	 * @param {Object} settings Key-value object
	 */
	reset = function( event, settings ) {
		var $elm = $( event.target );

		initEventTimeout( $elm, inactivityEvent, settings.inactivity, settings );
		if ( settings.refreshCallbackUrl !== null ) {
			initEventTimeout( $elm, keepaliveEvent, settings.sessionalive, settings );
		}
	},

	/**
	 * Checks if the user wants to keep their session alive.
	 * @function inactivity
	 * @param {jQuery Event} event `confirm.wb-sessto` event that triggered the function call
	 */
	confirm = function( event ) {
		var elm = event.target,
			$elm = $( elm ),
			settings = $elm.data();

		event.preventDefault();
		$.magnificPopup.close();
		clearInterval( countdownInterval );

		// User wants their session maintained
		if ( settings.start !== undefined && ( getCurrentTime() - settings.start ) <= settings.reactionTime ) {
			$( selector )
				.trigger( resetEvent, settings )
				.trigger( keepaliveEvent, settings );

		// Negative confirmation or the user took too long; logout
		} else {
			window.location.href = settings.logouturl;
		}
	},

	/**
	 * Add the modal dialog's content and display it to the user
	 * @function openModal
	 * @param {Object} data Key-value object
	 */
	openModal = function( data ) {

		// Detach the modal to prevent reflows while updating the element
		$modal = $modal.detach();
		$modal.find( ".modal-body" ).html( data.body );
		$modal.find( ".modal-footer" ).empty().append( data.buttons );

		// Re-attach the modal and open the dialog
		$modal = $modal.insertAfter( $modalLink );
		$modalLink.magnificPopup( "open" );

		// Execute the open callback if it exists
		if ( data.open ) {
			data.open();
		}
	},

	/**
	 * Returns the current time in milliseconds
	 * @function getCurrentTime
	 * @returns {integer} Current time in milliseconds
	 */
	getCurrentTime = function() {
		return ( new Date() ).getTime();
	},

	/**
	 * Parses a time value into a milliseconds integer value.
	 * @function parseTime
	 * @param {Mixed} value The time value to parse (integer or string)
	 * @returns {integer} Millisecond integer value parsed from the time value
	 */
	parseTime = function( value ) {
		var result, num, mult,
			powers = {
				ms: 1,
				cs: 10,
				ds: 100,
				s: 1000,
				das: 10000,
				hs: 100000,
				ks: 1000000
			};

		if ( value == null ) {
			return null;
		}

		result = /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/.exec( $.trim( value.toString() ) );
		if ( result[ 2 ] ) {
			num = parseFloat( result[ 1 ] );
			mult = powers[ result[ 2 ] ] || 1;
			return num * mult;
		}
		return value;
	},

	/**
	 * Converts a millisecond value into minutes and seconds
	 * @function getTime
	 * @param {integer} milliseconds The time value in milliseconds
	 * @returns {Object} An object with a seconds and minutes property
	 */
	getTime = function( milliseconds ) {
		var time = { minutes: "", seconds: "" };

		if ( milliseconds != null ) {
			time.minutes = parseInt( ( milliseconds / ( 1000 * 60 ) ) % 60, 10 );
			time.seconds = parseInt( ( milliseconds / 1000 ) % 60, 10 );
		}
		return time;
	},

	/**
	 * Given 2 elements representing minutes and seconds, decrement their time value by 1 second
	 * @function countdown
	 * @param {jQuery DOM Element} $minutes Element that contains the minute value
	 * @param {jQuery DOM Element} $seconds Element that contains the second value
	 * @returns {boolean} Is the countdown finished?
	 */
	countdown = function( $minutes, $seconds ) {
		var minutes = parseInt( $minutes.text(), 10 ),
			seconds = parseInt( $seconds.text(), 10 );

		// Decrement seconds and minutes
		if ( seconds > 0 ) {
			seconds -= 1;
		} else if ( minutes > 0 ) {
			minutes -= 1;
			seconds = 59;
		}

		// Update the DOM elements
		$minutes.text( minutes );
		$seconds.text( seconds );

		return minutes === 0 && seconds === 0;
	};

// Bind the plugin events
$document.on( "timerpoke.wb " + initEvent + " " + keepaliveEvent + " " +
	inactivityEvent + " " + resetEvent, selector, function( event, settings ) {

	var eventType = event.type;

	switch ( eventType ) {
	case "timerpoke":
	case "wb-init":
		init( event );
		break;

	case "keepalive":
		keepalive( event, settings );
		break;

	case "inactivity":
		inactivity( event, settings );
		break;

	case "reset":
		reset( event, settings );
		break;
	}
});

$document.on( "click", "." + confirmClass, confirm );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, document, wb );

/**
 * @title WET-BOEW Share widget
 * @overview Facilitates sharing Web content on social media platforms.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @pjackson28
 */
(function( $, window, document, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "wb-share",
	selector = "." + componentName,
	initEvent = "wb-init" + selector,
	shareLink = "shr-lnk",
	panelCount = 0,
	$document = wb.doc,
	i18n, i18nText,

	/*
	 * Plugin users can override these defaults by setting attributes on the html elements that the
	 * selector matches.
	 */
	defaults = {
		hdLvl: "h2",

		// Supported types are: "page", "video" and "audio"
		type: "page",

		// For custom types
		// custType = " this comment" results in "Share this comment"
		custType: "",

		url: wb.pageUrlParts.href,
		title: document.title || $document.find( "h1:first" ).text(),

		pnlId: "",
		lnkClass: "",
		img: "",
		desc: "",

		// For filtering the sites that area displayed and controlling the order
		// they are displayed. Empty array displays all sites in the default order.
		// Otherwise, it displays the sites in the order in the array using the
		// keys used by the sites object.
		filter: [],

		sites: {

			// The definitions of the available bookmarking sites, in URL use
			// '{u}' for the page URL, '{t}' for the page title, {i} for the image, and '{d}' for the description
			bitly: {
				name: "bitly",
				url: "https://bitly.com/a/bitmarklet?u={u}"
			},
			blogger: {
				name: "Blogger",
				url: "http://www.blogger.com/blog_this.pyra?t=&amp;u={u}&amp;n={t}"
			},
			delicious: {
				name: "Delicious",
				url: "http://delicious.com/post?url={u}&amp;title={t}"
			},
			digg: {
				name: "Digg",
				url: "http://digg.com/submit?phase=2&amp;url={u}&amp;title={t}"
			},
			diigo: {
				name: "Diigo",
				url: "http://www.diigo.com/post?url={u}&amp;title={t}"
			},
			facebook: {
				name: "Facebook",
				url: "http://www.facebook.com/sharer.php?u={u}&amp;t={t}"
			},
			gmail: {
				name: "Gmail",
				url: "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su={t}&body={u}%0A{d}"
			},
			googleplus: {
				name: "Google+",
				url: "https://plus.google.com/share?url={u}&amp;hl=" + document.documentElement.lang
			},
			linkedin: {
				name: "LinkedIn®",
				url: "http://www.linkedin.com/shareArticle?mini=true&amp;url={u}&amp;title={t}&amp;ro=false&amp;summary={d}&amp;source="
			},
			myspace: {
				name: "MySpace",
				url: "http://www.myspace.com/Modules/PostTo/Pages/?u={u}&amp;t={t}"
			},
			pinterest: {
				name: "Pinterest",
				url: "http://www.pinterest.com/pin/create/link/?url={u}&amp;media={i}&amp;description={t}"
			},
			reddit: {
				name: "reddit",
				url: "http://reddit.com/submit?url={u}&amp;title={t}"
			},
			stumbleupon: {
				name: "StumbleUpon",
				url: "http://www.stumbleupon.com/submit?url={u}&amp;title={t}"
			},
			tumblr: {
				name: "tumblr",
				url: "http://www.tumblr.com/share/link?url={u}&amp;name={t}&amp;description={d}"
			},
			twitter: {
				name: "Twitter",
				url: "http://twitter.com/home?status={t}%20{u}"
			},
			yahoomail: {
				name: "Yahoo! Mail",
				url: "http://compose.mail.yahoo.com/?to=&subject={t}&body={u}%0A{d}"
			}
		}
	},

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector ),
			sites, heading, settings, panel, link, $share, $elm,
			pageHref, pageTitle, pageImage, pageDescription,
			siteProperties, url, shareText, id, pnlId, regex,
			filter, i, len, keys, key;

		if ( elm ) {

			// Only initialize the i18nText once
			if ( !i18nText ) {
				i18n = wb.i18n;
				i18nText = {
					shareText: i18n( "shr-txt" ),
					page: i18n( "shr-pg" ),
					video: i18n( "shr-vid" ),
					audio: i18n( "shr-aud" ),
					disclaimer: i18n( "shr-disc" ),
					email: i18n( "email" )
				};

				// Add an email mailto option
				defaults.sites[ i18nText.email ] = {
					name: i18nText.email,
					url: "mailto:?to=&subject={t}&body={u}%0A{d}",
					isMailto: true
				};
			}

			$elm = $( elm );
			settings = $.extend(
				true,
				{},
				defaults,
				window[ componentName ],
				wb.getData( $elm, componentName )
			);
			sites = settings.sites;
			filter = settings.filter;
			heading = settings.hdLvl;

			shareText = i18nText.shareText + ( settings.custType.length !== 0 ? settings.custType : i18nText[ settings.type ] );
			pnlId = settings.pnlId;
			id = "shr-pg" + ( pnlId.length !== 0 ? "-" + pnlId : panelCount );
			pageHref = encodeURIComponent( settings.url );

			regex = /\'|&#39;|&apos;/;
			pageTitle = encodeURIComponent( settings.title )
							.replace( regex, "%27" );
			pageImage = encodeURIComponent( settings.img );
			pageDescription = encodeURIComponent( settings.desc )
								.replace( regex, "%27" );

			// Don't create the panel for the second link (class="link-only")
			if ( elm.className.indexOf( "link-only" ) === -1 ) {
				panel = "<section id='" + id  + "' class='shr-pg mfp-hide modal-dialog modal-content overlay-def" +
					"'><header class='modal-header'><" + heading + " class='modal-title'>" +
					shareText + "</" + heading + "></header><div class='modal-body'>" +
					"<ul class='list-unstyled colcount-xs-2'>";

				// If there is no filter array of site keys, then generate an array of site keys
				if ( !filter || filter.length === 0 ) {
					keys = [];
					for ( key in sites ) {
						if ( sites.hasOwnProperty( key ) ) {
							keys.push( key );
						}
					}
				} else {
					keys = filter;
				}

				// i18n-friendly sort of the site keys
				keys.sort(function( x, y ) {
					return wb.normalizeDiacritics( x ).localeCompare( wb.normalizeDiacritics( y ) );
				});
				len = keys.length;

				// Generate the panel
				for ( i = 0; i !== len; i += 1 ) {
					key = keys[ i ];
					siteProperties = sites[ key ];
					url = siteProperties.url
							.replace( /\{u\}/, pageHref )
							.replace( /\{t\}/, pageTitle )
							.replace( /\{i\}/, pageImage )
							.replace( /\{d\}/, pageDescription );
					panel += "<li><a href='" + url + "' class='" + shareLink +
						" " + ( siteProperties.isMailto ? "email" : key ) +
						" btn btn-default' target='_blank'>" +
						siteProperties.name + "</a></li>";
				}

				panel += "</ul><p class='col-sm-12 shr-dscl'>" + i18nText.disclaimer +
					"</p><div class='clearfix'></div></div></section>";
				panelCount += 1;
			}
			link = "<a href='#" + id + "' aria-controls='" + id +
				"' class='shr-opn wb-lbx " + settings.lnkClass +
				"'><span class='glyphicon glyphicon-share'></span>" +
				shareText + "</a>";

			$share = $( ( panel ? panel : "" ) + link );

			$elm.append( $share );

			$share
				.trigger( "wb-init.wb-lbx" );

			// Identify that initialization has completed
			wb.ready( $elm, componentName );
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, document, wb );

/**
 * @title WET-BOEW Tables
 * @overview Integrates the DataTables plugin into WET providing searching, sorting, filtering, pagination and other advanced features for tables.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @jeresiv
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "wb-tables",
	selector = "." + componentName,
	initEvent = "wb-init" + selector,
	$document = wb.doc,
	idCount = 0,
	i18n, i18nText, defaults,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector ),
			elmId;

		if ( elm ) {
			elmId = elm.id;

			// Ensure there is a unique id on the element
			if ( !elmId ) {
				elmId = componentName + "-id-" + idCount;
				idCount += 1;
				elm.id = elmId;
			}

			// Only initialize the i18nText once
			if ( !i18nText ) {
				i18n = wb.i18n;
				i18nText = {
					aria: {
						sortAscending: i18n( "sortAsc" ),
						sortDescending: i18n( "sortDesc" )
					},
					emptyTable: i18n( "emptyTbl" ),
					info: i18n( "infoEntr" ),
					infoEmpty: i18n( "infoEmpty" ),
					infoFiltered: i18n( "infoFilt" ),
					lengthMenu: i18n( "lenMenu" ),
					loadingRecords: i18n( "load" ),
					paginate: {
						first: i18n( "first" ),
						last: i18n( "last" ),
						next: i18n( "nxt" ),
						previous: i18n( "prv" )
					},
					processing: i18n( "process" ),
					search: i18n( "filter" ),
					thousands: i18n( "info1000" ),
					zeroRecords: i18n( "infoEmpty" )
				};
			}

			defaults = {
				asStripeClasses: [],
				language: i18nText,
				dom: "<'top'ilf>rt<'bottom'p><'clear'>"
			};

			Modernizr.load({
				load: [ "site!deps/jquery.dataTables" + wb.getMode() + ".js" ],
				complete: function() {
					var $elm = $( "#" + elmId ),
						dataTableExt = $.fn.dataTableExt;

					/*
					 * Extend sorting support
					 */
					$.extend( dataTableExt.type.order, {

						// Enable internationalization support in the sorting
						"html-pre": function( a ) {
							return wb.normalizeDiacritics(
								!a ? "" : a.replace ?
									a.replace( /<.*?>/g, "" ).toLowerCase() : a + ""
							);
						},
						"string-case-pre": function( a ) {
							return wb.normalizeDiacritics( a );
						},
						"string-pre": function( a ) {
							return wb.normalizeDiacritics( a );
						},

						// Formatted number sorting
						"formatted-num-asc": function( a, b ) {
							return wb.formattedNumCompare( a, b );
						},
						"formatted-num-desc": function( a, b ) {
							return wb.formattedNumCompare( b, a );
						}
					} );

					/*
					 * Extend type detection
					 */
					// Formatted numbers detection
					// Based on: http://datatables.net/plug-ins/type-detection#formatted_numbers
					dataTableExt.aTypes.unshift(
						function( sData ) {

							// Strip off HTML tags and all non-alpha-numeric characters (except minus sign)
							var deformatted = sData.replace( /<[^>]*>/g, "" ).replace( /[^\d\-\/a-zA-Z]/g, "" );
							if ( $.isNumeric( deformatted ) || deformatted === "-" ) {
								return "formatted-num";
							}
							return null;
						}
					);

					// Remove HTML tags before doing any filtering for formatted numbers
					dataTableExt.type.search[ "formatted-num" ] = function( data ) {
						return data.replace( /<[^>]*>/g, "" );
					};

					// Add the container or the sorting icons
					$elm.find( "th" ).append( "<span class='sorting-cnt'><span class='sorting-icons'></span></span>" );

					// Create the DataTable object
					$elm.dataTable( $.extend( true, {}, defaults, window[ componentName ], wb.getData( $elm, componentName ) ) );
				}
			});
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

// Handle the draw.dt event
$document.on( "init.dt draw.dt", selector, function( event, settings ) {
	var $elm = $( event.target );

	// Update the aria-pressed properties on the pagination buttons
	// Should be pushed upstream to DataTables
	$( ".dataTables_paginate a" )
		.attr( "role", "button" )
		.not( ".previous, .next" )
			.attr( "aria-pressed", "false" )
			.filter( ".current" )
				.attr( "aria-pressed", "true" );

	if ( event.type === "init" ) {

		// Identify that initialization has completed
		wb.ready( $elm, componentName );
	}

	// Identify that the table has been updated
	$elm.trigger( "wb-updated" + selector, [ settings ] );
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Tabbed interface
 * @overview Dynamically stacks multiple sections of content, transforming them into a tabbed interface.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author WET Community
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "wb-tabs",
	selector = "." + componentName,
	initEvent = "wb-init" + selector,
	shiftEvent = "wb-shift" + selector,
	selectEvent = "wb-select" + selector,
	updatedEvent = "wb-updated" + selector,
	setFocusEvent = "setfocus.wb",
	controls = selector + " [role=tablist] a, " + selector + " [role=tablist] .tab-count",
	initialized = false,
	equalHeightClass = "wb-eqht",
	equalHeightOffClass = equalHeightClass + "-off",
	tabsAccordionClass = "tabs-acc",
	nestedTglPanelSelector = "> .tabpanels > details > .tgl-panel",
	activePanel = "-activePanel",
	activateEvent = "click keydown",
	pagePath = wb.pageUrlParts.pathname + "#",
	$document = wb.doc,
	i18n, i18nText,

	// Includes "smallview", "xsmallview" and "xxsmallview"
	smallViewPattern = "smallview",
	isSmallView, oldIsSmallView,

	defaults = {
		excludePlay: false,
		interval: 6,
		updateHash: false
	},

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector, true ),
			hashFocus = false,
			isCarousel = true,
			open = "open",
			$panels, $tablist, activeId, $openPanel, $elm, elmId,
			settings, $panel, i, len, tablist, isOpen,
			newId, positionY, groupClass, $tabPanels;

		if ( elm ) {
			$elm = $( elm );

			// For backwards compatibility. Should be removed in WET v4.1
			if ( $elm.children( ".tabpanels" ).length === 0 ) {
				$elm.children( "[role=tabpanel], details" ).wrapAll( "<div class='tabpanels'/>" );
			}

			$panels = $elm.find( "> .tabpanels > [role=tabpanel], > .tabpanels > details" );
			$tablist = $elm.children( "[role=tablist]" );
			isCarousel = $tablist.length !== 0;
			activeId = wb.jqEscape( wb.pageUrlParts.hash.substring( 1 ) );
			$openPanel = activeId.length !== 0 ? $panels.filter( "#" + activeId ) : undefined;
			elmId = elm.id;
			settings = $.extend(
				true,
				{},
				defaults,
				{
					interval: $elm.hasClass( "slow" ) ?
								9 : $elm.hasClass( "fast" ) ?
									3 : defaults.interval,
					excludePlay: $elm.hasClass( "exclude-play" ),
					updateHash: $elm.hasClass( "update-hash" ),
					playing: $elm.hasClass( "playing" )
				},
				window[ componentName ],
				wb.getData( $elm, componentName )
			);

			try {

				// If the panel was not set by URL hash, then attempt to
				// retrieve from sessionStorage
				if ( !$openPanel || $openPanel.length === 0 ) {
					activeId = sessionStorage.getItem( pagePath + elmId + activePanel );
					if ( activeId ) {
						$openPanel = $panels.filter( "#" + activeId );
					}

				// If the panel was set by URL hash, then store in sessionStorage
				} else {
					hashFocus = true;
					try {
						sessionStorage.setItem( pagePath + elmId + activePanel, activeId );
					} catch ( error ) {
					}
				}
			} catch ( error ) {
			}

			// Determine the current view
			isSmallView = document.documentElement.className.indexOf( smallViewPattern ) !== -1;

			// Only initialize the i18nText once
			if ( !i18nText ) {
				i18n = wb.i18n;
				i18nText = {
					prev: i18n( "prv" ),
					next: i18n( "nxt" ),
					play: i18n( "tab-play" ),
					rotStart: i18n( "tab-rot" ).on,
					rotStop: i18n( "tab-rot" ).off,
					space: i18n( "space" ),
					hyphen: i18n( "hyphen" ),
					pause: i18n( "pause" ),
					tabCount: i18n( "lb-curr")
				};
			}

			// Build the tablist and enhance the panels as needed for details/summary
			if ( !isCarousel ) {
				$elm.addClass( tabsAccordionClass );
				groupClass = elmId + "-grp";
				$tabPanels = $elm.children( ".tabpanels" );
				$panels = $tabPanels.children( "details" );
				len = $panels.length;

				$tabPanels.detach();

				// Ensure there is only one panel open
				// Order of priority is hash, open property, first details
				if ( !$openPanel || $openPanel.length === 0 ) {
					$openPanel = $panels.filter( "[open]" ).first();
					if ( $openPanel.length === 0 ) {
						$openPanel = $panels.eq( 0 );
					}
				}
				$panels.removeAttr( open );
				$openPanel.attr( open, open );

				// Hide the tablist in small view and the summary elements in large view
				tablist = "<ul role='tablist' aria-live='off' class='generated'>";

				for ( i = 0; i !== len; i += 1 ) {
					$panel = $panels.eq( i );
					$panel
						.addClass( groupClass )
						.html(
							$panel.html()
								.replace( /(<\/summary>)/i, "$1<div class='tgl-panel'>" ) +
							"</div>"
						);

					newId = $panel.attr( "id" );
					if ( !newId ) {
						newId = wb.getId();
						$panel.attr( "id", newId );
					}
					isOpen = !!$panel.attr( open );

					if ( isSmallView ) {
						if ( !Modernizr.details ) {
							$panel.toggleClass( "open", isOpen );
						}
					} else {
						$panel.attr({
							role: "tabpanel",
							open: open
						});
						$panel.addClass( ( Modernizr.details ? "" :  open + " " ) +
							"fade " + ( isOpen ? "in" : "out wb-inv" ) );
					}

					tablist += "<li" + ( isOpen ? " class='active'" : "" ) +
						"><a id='" + newId + "-lnk' href='#" + newId + "'>" +
						$panel.children( "summary" ).html() + "</a></li>";
				}

				$tablist = $( tablist + "</ul>" );
				$tabPanels.find( "> details > summary" )
					.addClass( "wb-toggle tgl-tab" )
					.attr( "data-toggle", "{\"parent\": \"#" + elmId +
						"\", \"group\": \"." + groupClass + "\"}" );

				$elm
					.prepend( $tablist )
					.append( $tabPanels )
					.trigger( "wb-init.wb-toggle" );
			} else if ( $openPanel && $openPanel.length !== 0 ) {
				$panels.filter( ".in" )
					.addClass( "out" )
					.removeClass( "in" );
				$openPanel
					.addClass( "in" )
					.removeClass( "out" );
				$tablist.find( ".active" )
					.removeClass( "active" );
				$tablist.find( "a" )
					.filter( "[href$='" + activeId + "']" )
					.parent()
						.addClass( "active" );
			}

			drizzleAria( $panels, $tablist );

			if ( isCarousel ) {

				// Returns true if the tabs should be rotating automatically
				if ( createControls( $tablist, settings ) ) {

					// Register this specific tabs instance for timerpoke.wb events
					wb.add( "#" + elmId + selector );
				}
			}

			// If focus is being set by the URL hash, then ensure the tabs are
			// not above the top of the viewport
			if ( hashFocus ) {

				// Need a slight delay to allow for the reflow
				setTimeout(function() {
					positionY = $tablist.offset().top;
					if ( positionY < document.body.scrollTop ) {
						document.body.scrollTop = positionY;
					}
				}, 1 );
			}

			$elm.data({
				"wb-tabs": {
					panels: $panels,
					tablist: $tablist,
					settings: settings,
					ctime: 0
				}
			});

			initialized = true;
			onResize( $elm );

			// Update the URL hash if needed
			if ( settings.updateHash ) {
				updateHash( $openPanel[ 0 ] );
			}

			// Identify that initialization has completed
			wb.ready( $elm, componentName );
		}
	},

	/**
	 * @method onTimerPoke
	 * @param {jQuery DOM element} $elm The plugin element
	 */
	onTimerPoke = function( $elm ) {
		var data = $elm.data( componentName ),
			delayCurrent = parseFloat( data.ctime ) + 0.5;

		// Check if we need to rotate panels
		if ( parseFloat( data.settings.interval ) <= delayCurrent ) {
			$elm.trigger( shiftEvent );
			delayCurrent = 0;
		}

		data.ctime = delayCurrent;
		$elm.data( componentName, data );
	},

	/**
	 * @method createControls
	 * @param {jQuery DOM element} $tablist The plugin element
	 * @param {object} settings Settings for the tabs instance
	 * @returns {boolean} Whether or not the tabs should be rotating initially
	 */
	createControls = function( $tablist, settings ) {
		var prevText = i18nText.prev,
			nextText = i18nText.next,
			spaceText = i18nText.space,
			excludePlay = settings.excludePlay,
			isPlaying = !excludePlay && settings.playing,
			state = isPlaying ? i18nText.pause : i18nText.play,
			hidden = isPlaying ? i18nText.rotStop : i18nText.rotStart,
			glyphiconStart = "<span class='glyphicon glyphicon-",
			wbInvStart = "<span class='wb-inv'>",
			tabsToggleStart = "<li class='control ",
			btnMiddle = "' href='javascript:;' role='button' title='",
			btnEnd = "</span></a></li> ",
			iconState = glyphiconStart + ( isPlaying ? "pause" : "play" ) + "'></span>",
			$tabs = $tablist.find( "[role=tab]" ),
			currentIndex = $tabs.index( $tabs.filter( "[aria-selected=true]" ) ) + 1,
			i18nTabCount = i18nText.tabCount,
			firstReplaceIndex = i18nTabCount.indexOf( "%" ),
			lastReplaceIndex = i18nTabCount.lastIndexOf( "%" ) + 1,
			prevControl = tabsToggleStart + "prv'><a class='prv" + btnMiddle +
				prevText + "'>" + glyphiconStart + "chevron-left'></span>" +
				wbInvStart + prevText + btnEnd,
			tabCount = tabsToggleStart + " tab-count' tabindex='0'><div>" +
				i18nTabCount.substring( 0, firstReplaceIndex ) +
				"<div class='curr-count'>" +
				i18nTabCount.substring( firstReplaceIndex, lastReplaceIndex )
					.replace( "%curr%", "<span class='curr-index'>" + currentIndex + "</span>" )
					.replace( "%total%", $tabs.length ) +
				"</div>" + i18nTabCount.substring( lastReplaceIndex ) +
				"</div></li>",
			nextControl = tabsToggleStart + "nxt'><a class='nxt" + btnMiddle +
				nextText + "'>" + glyphiconStart + "chevron-right'></span>" +
				wbInvStart + nextText + btnEnd,
			playControl =  tabsToggleStart + "plypause'><a class='plypause" +
				btnMiddle + state + "'>" + iconState + " <span>" + state +
				"</span>" + wbInvStart + spaceText + i18nText.hyphen + spaceText +
				hidden + btnEnd;

		$tablist.prepend( prevControl + tabCount + nextControl );
		if ( !excludePlay ) {
			$tablist.append( playControl );
		}

		return isPlaying;
	},

	/**
	 * @method drizzleAria
	 * @param {jQuery DOM element} $panels Tabpanel groupings
	 * @param {jQuery DOM element} $tablist Pointers to the groupings
	 */
	drizzleAria = function( $panels, $tabList ) {

		// Let's process the elements for aria
		var panels = $panels.get(),
			tabCounter = panels.length - 1,
			listItems = $tabList.children().get(),
			listCounter = listItems.length - 1,
			isDetails = $panels[ 0 ].nodeName.toLowerCase() === "details",
			isActive, item, link, panelId;

		$panels.attr( "tabindex", "-1" );

		for ( ; tabCounter !== -1; tabCounter -= 1 ) {
			item = panels[ tabCounter ];
			isActive = item.className.indexOf( "out" ) === -1;

			if ( !isDetails || !isSmallView ) {
				item.setAttribute( "aria-hidden", isActive ? "false" : "true" );
				item.setAttribute( "aria-expanded", isActive ? "true" : "false" );
			}
			item.setAttribute( "aria-labelledby", item.id + "-lnk" );
		}

		for ( ; listCounter !== -1; listCounter -= 1 ) {
			item = listItems[ listCounter ];
			item.setAttribute( "role", "presentation" );
			isActive = item.className.indexOf( "active" ) !== -1;

			link = item.getElementsByTagName( "a" )[ 0 ];
			panelId = link.getAttribute( "href" ).substring( 1 );

			link.tabIndex = isActive ? "0" : "-1";
			link.setAttribute( "role", "tab" );
			link.setAttribute( "aria-selected", isActive ? "true" : "false" );
			link.setAttribute( "aria-controls", panelId );
			link.id = panelId + "-lnk";
		}
		$tabList.attr( "aria-live", "off" );
	},

	/**
	 * @method updateHash
	 * @param {DOM element} elm Tabpanel to be referenced in the URL hash
	 */
	updateHash = function( elm ) {
		var elmId = elm.id;

		wb.ignoreHashChange = true;
		elm.id += "-off";
		window.location.hash = elmId;
		elm.id = elmId;
		wb.ignoreHashChange = false;
	},

	updateNodes = function( $panels, $controls, $next, $control ) {
		var $tabs = $controls.find( "[role=tab]" ),
			newIndex = $tabs.index( $control ) + 1,
			$currPanel = $panels.filter( ".in" ),
			$container = $next.closest( selector ),
			mPlayers = $currPanel.find( ".wb-mltmd-inited" ).get(),
			mPlayersLen = mPlayers.length,
			mPlayer, i, j, last;

		// Handle the direction of the slide transitions
		if ( $currPanel[ 0 ].className.indexOf( "slide" ) !== -1 ) {
			i = $panels.index( $currPanel );
			j = $panels.index( $next );
			last = $panels.length - 1;

			$panels.toggleClass(
				"reverse",
				( i > j && ( i !== last || j !== 0 ) ) || ( i === 0 && j === last )
			);
		}

		$currPanel
			.removeClass( "in" )
			.addClass( "out" )
			.attr({
				"aria-hidden": "true",
				"aria-expanded": "false"
			});

		// Pause all multimedia players in the current panel
		for ( i = 0; i !== mPlayersLen; i += 1 ) {
			mPlayer = mPlayers[ i ];
			if ( mPlayer.player ) {
				mPlayer.player( "pause" );
			}
		}

		$next
			.removeClass( "out" )
			.addClass( "in" )
			.attr({
				"aria-hidden": "false",
				"aria-expanded": "true"
			});

		$controls
			.find( ".active" )
				.removeClass( "active" )
				.children( "a" )
					.attr({
						"aria-selected": "false",
						tabindex: "-1"
					});

		// Update the Item x of n
		$controls
			.find( ".curr-index" )
				.html( newIndex );

		$control
			.attr({
				"aria-selected": "true",
				tabindex: "0"
			})
			.parent()
				.addClass( "active" );

		// Update sessionStorage with the current active panel
		try {
			sessionStorage.setItem(
				pagePath + $container.attr( "id" ) + activePanel,
				$next.attr( "id" )
			);
		} catch ( error ) {
		}

		// Update the URL hash if needed
		if ( $container.data( componentName ).settings.updateHash ) {
			updateHash( $next[ 0 ] );
		}

		// Identify that the tabbed interface/carousel was updated
		$container.trigger( updatedEvent, [ $next ] );
	},

	/**
	 * @method onPick
	 * @param {jQuery DOM element} $sldr The plugin element
	 * @param {jQuery DOM element} $elm The selected link from the tablist
	 */
	onPick = function( $sldr, $elm ) {
		var data = $sldr.data( componentName ),
			$panels = data.panels,
			$controls = data.tablist,
			$next = $panels.filter( "#" + $elm.attr( "aria-controls" ) );

		updateNodes( $panels, $controls, $next, $elm );
	},

	/**
	 * @method onShift
	 * @param (jQuery event} event Current event
	 * @param {jQuery DOM element} $elm The plugin element
	 */
	onShift = function( event, $elm ) {
		var data = $elm.data( componentName ),
			$panels = data.panels,
			len = $panels.length,
			current = $elm.find( "> .tabpanels > .in" ).prevAll( "[role=tabpanel]" ).length,
			autoCycle = !event.shiftto,
			next = current > len ? 0 : current + ( autoCycle ? 1 : event.shiftto );

		onSelect( $panels[ ( next > len - 1 ) ? 0 : ( next < 0 ) ? len - 1 : next ].id, autoCycle );
	},

	/**
	 * @method onSelect
	 * @param (string) id Id attribute of the panel
	 * @param (boolean) autoCycle Whether change is caused by an auto cycle
	 */
	onSelect = function( id, autoCycle ) {
		var panelSelector = "#" + id,
			$panel = $( panelSelector );

		if ( isSmallView && $panel[ 0 ].nodeName.toLowerCase() === "details" ) {
			$panel.children( "summary" ).trigger( $panel.attr( "open" ) ? setFocusEvent : "click" );
		} else {
			$( panelSelector + "-lnk" )
				.trigger({
					type: "click",
					which: autoCycle ? undefined : 1
				})
				.trigger( setFocusEvent );
		}
	},

	/**
	 * @method onCycle
	 * @param {jQuery DOM element} $elm The plugin element
	 * @param {integer} shifto The item to shift to
	 */
	onCycle = function( $elm, shifto ) {
		$elm.trigger({
			type: shiftEvent,
			shiftto: shifto
		});
	},

	/**
	 * @method onResize
	 * @param {jQuery Object} $currentElm Element being initialized (only during initialization process).
	 */
	onResize = function( $currentElm ) {
		var $elms, $elm, $tabPanels, $details, $tablist, $openDetails, openDetailsId,
			$nonOpenDetails, $active, $summary, i, len, viewChange, isInit;

		if ( initialized ) {
			isSmallView = document.documentElement.className.indexOf( smallViewPattern ) !== -1;
			viewChange = isSmallView !== oldIsSmallView;
			isInit = $currentElm.length ? true : false;

			if ( viewChange ) {
				$elms = isInit ? $currentElm : $( selector );
				len = $elms.length;

				for ( i = 0; i !== len; i += 1 ) {
					$elm = $elms.eq( i );
					$tabPanels = $elm.children( ".tabpanels" );
					$details = $tabPanels.children( "details" );

					if ( $details.length !== 0 ) {
						$tabPanels.detach();
						$summary = $details.children( "summary" );
						$tablist = $elm.children( "ul" );

						if ( isSmallView ) {

							// Switch to small view
							$active = $tablist.find( ".active a" );
							$details
								.removeAttr( "role aria-expanded aria-hidden" )
								.removeClass( "fade out in" )
								.children( ".tgl-panel" )
									.attr( "role", "tabpanel" );
							$openDetails = $details
												.filter( "#" + $active.attr( "href" ).substring( 1 ) )
													.attr( "open", "open" )
													.addClass( "open" );
							$nonOpenDetails = $details.not( $openDetails )
														.removeAttr( "open" )
														.removeClass( "open" );
						} else if ( oldIsSmallView ) {

							// Switch to large view
							$openDetails = $details.filter( "[open]" );
							openDetailsId = $openDetails.attr( "id" );

							$openDetails = ( $openDetails.length === 0 ? $details : $openDetails ).eq( 0 );

							$details
								.attr({
									role: "tabpanel",
									open: "open"
								})
								.not( $openDetails )
									.addClass( "fade out wb-inv" )
									.attr({
										"aria-hidden": "true",
										"aria-expanded": "false"
									});

							$details.children( ".tgl-panel" ).removeAttr( "role" );

							$openDetails
								.addClass( "fade in" )
								.attr({
										"aria-hidden": "false",
										"aria-expanded": "true"
									});
						}

						// Enable equal heights for large view or disable for small view
						if ( isSmallView !== $elm.hasClass( equalHeightOffClass ) ) {
							$elm.toggleClass( equalHeightClass + " " + equalHeightOffClass );
						}

						$summary.attr( "aria-hidden", !isSmallView );
						$tablist.attr( "aria-hidden", isSmallView );

						$elm.append( $tabPanels );

						// Update the tablist role
						if ( isSmallView ) {
							$elm.attr( "role", "tablist" );
						} else if ( oldIsSmallView ) {
							$elm
								.removeAttr( "role" )
								.find( nestedTglPanelSelector ).removeAttr( "role" );

							$elm.find( "> ul [href$='" + openDetailsId + "']" ).trigger( "click" );
						}
					}
				}

				// Need timeout to account for Toggle changes
				if ( isInit && !isSmallView && $elms.hasClass( tabsAccordionClass ) ) {
					setTimeout(function() {
						$elms
							.removeAttr( "role" )
							.find( nestedTglPanelSelector ).removeAttr( "role" );
					}, 1 );
				}
			}

			oldIsSmallView = isSmallView;
		}

		if ( viewChange || isInit ) {

			// Remove wb-inv from regular tabs that were used to prevent FOUC (after 300ms delay)
			setTimeout(function() {
				$( selector + " .tabpanels > details.wb-inv" ).removeClass( "wb-inv" );
			}, 300 );
		}
	};

 // Bind the init event of the plugin
 $document.on( "timerpoke.wb " + initEvent + " " + shiftEvent + " " + selectEvent, selector, function( event ) {
	var eventTarget = event.target,
		eventCurrentTarget = event.currentTarget,
		$elm;

		// Filter out any events triggered by descendants
		if ( eventCurrentTarget === eventTarget ) {
			switch ( event.type ) {
			case "timerpoke":
				$elm = $( eventTarget );
				if ( !$elm.hasClass( componentName + "-inited" ) ) {
					init( event );
				} else if ( $elm.hasClass( "playing" ) ) {
					onTimerPoke( $elm );
				}
				break;

			/*
			 * Init
			 */
			case "wb-init":
				init( event );
				break;

			/*
			 * Change tab panels by a delta
			 */
			case "wb-shift":
				onShift( event, $( eventTarget ) );
				break;

			/*
			 * Select a specific tab panel
			 */
			case "wb-select":
				onSelect( event.id );
				break;
			}
		}

	/*
	 * Since we are working with events we want to ensure that we are being passive about our control,
	 * so returning true allows for events to always continue
	 */
	return true;
 });

 /*
  * Tabs, next, previous and play/pause
  */
 $document.on( activateEvent, controls, function( event ) {
	var which = event.which,
		elm = event.currentTarget,
		className = elm.className,
		spaceText = i18nText.space,
		$elm, $sldr, sldrId, plypause, buttonText, data, isPlaying, isPlayPause;

	// No control, alt or meta keys and only left mouse button, enter key,
	// space bar, escape key and arrow keys
	if ( !( event.ctrlKey || event.altKey || event.metaKey ) &&
			( !which || which === 1 || which === 13 || which === 27 ||
			which === 32 || ( which > 36 && which < 41 ) ) ) {

		// Stop propagation of the activate event
		event.preventDefault();
		if ( event.stopPropagation ) {
			event.stopImmediatePropagation();
		} else {
			event.cancelBubble = true;
		}

		$elm = $( elm );
		$sldr = $elm.closest( selector );
		sldrId = $sldr[ 0 ].id;
		isPlaying = $sldr.hasClass( "playing" ),
		isPlayPause = className.indexOf( "plypause" ) !== -1;

		// Reset ctime to 0
		data = $sldr.data( componentName );
		data.ctime = 0;
		$sldr.data( componentName, data );

		// Stop the slider from playing unless it is already stopped
		// and the play button is activated
		if ( ( isPlaying && which ) || ( isPlayPause && !( which > 36 && which < 41 ) ) ) {
			if ( isPlaying ) {
				wb.remove( "#" + sldrId + selector );
			} else {
				wb.add( "#" + sldrId + selector );
			}

			$sldr.toggleClass( "playing" );
			isPlaying = !isPlaying;
			buttonText = isPlaying ? i18nText.pause : i18nText.play;

			plypause = $sldr.find( "a.plypause" )[ 0 ];
			plypause.setAttribute( "title", buttonText );
			plypause.innerHTML = "<span class='glyphicon glyphicon-" +
				( isPlaying ? "pause" : "play" ) + "'></span> " +
				"<span>" + buttonText + "</span><span class='wb-inv'>" +
				spaceText + i18nText.hyphen + spaceText +
				( isPlaying ? i18nText.rotStop : i18nText.rotStart ) + "</span>";
		}

		// Arrow keys
		if ( which > 36 ) {
			onCycle( $sldr, which < 39 ? -1 : 1 );
			$sldr.find( "> [role=tablist] .active a" ).trigger( setFocusEvent );

		// Not the escape key
		} else if ( which !== 27 ) {

			// If the target is a tab
			if ( elm.getAttribute( "role" ) === "tab" ) {
				onPick( $sldr, $elm );

				// Put focus on the tab panel if the enter key or space bar are used
				if ( which === 13 || which === 32 ) {
					$sldr.find( elm.getAttribute( "href" ) )
						.trigger( setFocusEvent );
				}

			// If the target is next, previous or tab count
			} else if ( !isPlayPause ) {
				onCycle( $sldr, className.indexOf( "prv" ) !== -1 ? -1 : 1 );
			}
		}
	}

	/*
	 * Since we are working with events we want to ensure that we are being passive about our control,
	 * so returning true allows for events to always continue
	 */
	return true;
});

$document.on( activateEvent, selector + " [role=tabpanel]", function( event ) {
	var currentTarget = event.currentTarget,
		which = event.which,
		$container;

	// Stop propagation of the click/keydown event
	if ( event.stopPropagation ) {
		event.stopImmediatePropagation();
	} else {
		event.cancelBubble = true;
	}

	// Ctrl + Up arrow
	if ( event.ctrlKey && event.which === 38 ) {

		// Move focus to the tab or summary element
		if ( isSmallView ) {
			$( currentTarget ).prev().trigger( setFocusEvent );
		} else {
			$( currentTarget )
				.closest( selector )
					.find( "[href$='#" + currentTarget.id + "']" )
						.trigger( setFocusEvent );
		}

	// Left mouse button click or escape key
	} else if ( !which || which === 1 || which === 27 ) {
		$container = $( event.currentTarget ).closest( selector );

		// Stop the carousel
		if ( $container.hasClass( "playing" ) ) {
			$container.find( ".plypause" ).trigger( "click" );
		}
	}
});

// Handling for links to tabs from within a panel
$document.on( "click", selector + " [role=tabpanel] a", function( event ) {
	var currentTarget = event.currentTarget,
		href = currentTarget.getAttribute( "href" ),
		which = event.which,
		$tabpanels, $panel, $summary;

	// Ignore middle and right mouse buttons
	if ( ( !which || which === 1 ) && href.charAt( 0 ) === "#" ) {
		$tabpanels = $( currentTarget ).closest( ".tabpanels" );
		$panel = $tabpanels.children( "#" + wb.jqEscape( href.substring( 1 ) ) );
		if ( $panel.length !== 0 ) {
			event.preventDefault();
			$summary = $panel.children( "summary" );
			if ( $summary.length !== 0 && $summary.attr( "aria-hidden" ) !== "true" ) {
				$summary.trigger( "click" );
			} else {
				$tabpanels.parent().find( href + "-lnk" ).trigger( "click" );
			}
		}
	}
});

// These events only fire at the document level
$document.on( wb.resizeEvents, onResize );

$document.on( activateEvent, selector + " > .tabpanels > details > summary", function( event ) {
	var which = event.which,
		details = event.currentTarget.parentNode,
		$details, $container;

	if ( !( event.ctrlKey || event.altKey || event.metaKey ) &&
		( !which || which === 1 || which === 13 || which === 32 ) ) {

		$details = $( details );

		// Update sessionStorage with the current active panel
		try {
			sessionStorage.setItem(
				pagePath + $details.closest( selector ).attr( "id" ) + activePanel,
				details.id
			);
		} catch ( error ) {
		}

		$container = $details.closest( selector );

		// Update the URL hash if needed
		if ( $container.data( componentName ).settings.updateHash ) {
			updateHash( details );
		}

		// Identify that the tabbed interface was updated
		$container.trigger( updatedEvent, [ $details ] );
	}
});

// Change the panel based upon an external link click
$document.on( "click", ".wb-tabs-ext", function( event ) {
	var which = event.which;

	// Ignore middle and right mouse buttons
	if ( !which || which === 1 ) {
		event.preventDefault();
		onSelect( event.currentTarget.getAttribute( "href" ).substring( 1 ) );
	}
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Text highlighting
 * @overview Automatically highlights certain words on a Web page. The highlighted words can be selected via the query string.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @pjackson28
 */
(function( $, window, document, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "wb-txthl",
	selector = "." + componentName,
	initEvent = "wb-init" + selector,
	$document = wb.doc,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector ),
			params = wb.pageUrlParts.params,
			searchCriteria, newText;

		if ( elm ) {
			if ( event.txthl ) {
				searchCriteria = $.isArray(event.txthl) ? event.txthl.join( "|" ) : event.txthl;
			} else if ( params && params.txthl ) {
				searchCriteria = decodeURIComponent(
					wb.pageUrlParts.params.txthl
						.replace( /^\s+|\s+$|\|+|\"|\(|\)/g, "" ).replace( /\++/g, "|" )
				);
			}

			if ( searchCriteria ) {

				// Make sure that we're not checking for text within a tag; only the text outside of tags.
				searchCriteria = "(?=([^>]*<))([\\s'])?(" + searchCriteria + ")(?!>)";

				newText = elm.innerHTML.replace( new RegExp( searchCriteria, "gi" ), function( match, group1, group2, group3 ) {
					return ( !group2 ? "" : group2 ) + "<span class='txthl'><mark>" + group3 + "</mark></span>";
				});
				elm.innerHTML = newText;
			}

			// Identify that initialization has completed
			wb.ready( $( elm ), componentName );
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, document, wb );

/**
 * @title WET-BOEW Toggle
 * @overview Plugin that allows a link to toggle elements between on and off states.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @patheard
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "wb-toggle",
	selector = "." + componentName,
	selectorPanel = ".tgl-panel",
	selectorTab = ".tgl-tab",
	initEvent = "wb-init" + selector,
	toggleEvent = "toggle" + selector,
	toggledEvent = "toggled" + selector,
	setFocusEvent = "setfocus.wb",
	states = {},
	$document = wb.doc,
	$window = wb.win,

	defaults = {
		stateOn: "on",
		stateOff: "off"
	},

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var link = wb.init( event, componentName, selector, true ),
			$link, data;

		if ( link ) {
			// Merge the elements settings with the defaults
			$link = $( link );
			data = $.extend( {}, defaults, $link.data( "toggle" ) );
			$link.data( "toggle", data );

			// Add aria attributes of the toggle element
			initAria( link, data );

			// Persist toggle state across page loads
			if ( data.persist ) {
				initPersist( $link, data );
			}

			// Toggle behaviour when the page is printed
			if ( data.print ) {
				initPrint( $link, data );
			}

			// Identify that initialization has completed
			wb.ready( $link, componentName );
		}
	},

	/**
	 * Initialize the aria attributes for a given toggle element
	 * @param {DOM element} link The toggle element to initialize
	 * @param {Object} data Simple key/value data object passed when the event was triggered
	 */
	initAria = function( link, data ) {
		var i, len, elm, elms, parent, tabs, tab, panel, isOpen,
			ariaControls = "",
			hasOpen = false;

		// Group toggle elements with a parent are assumed to be a tablist
		if ( data.group != null && data.parent != null ) {
			parent = document.querySelector( data.parent );

			// Check that the tablist widget hasn't already been initialized
			if ( parent.getAttribute( "role" ) !== "tablist" ) {
				parent.setAttribute( "role", "tablist" );
				elms = parent.querySelectorAll( data.group );
				tabs = parent.querySelectorAll( data.group + " " + selectorTab );

				// Initialize the detail/summaries
				$( tabs ).trigger( "wb-init.wb-details" );

				// Set the tab and panel aria attributes
				for ( i = 0, len = elms.length; i !== len; i += 1 ) {
					elm = elms[ i ];
					tab = tabs[ i ];
					panel = elm.querySelector( selectorPanel );

					// Check if the element is toggled on based on the
					// open attribute or "on" CSS class
					isOpen = elm.nodeName.toLowerCase() === "details" ?
						!!elm.getAttribute( "open" ) :
						( " " + tab.className + " " ).indexOf( " " + data.stateOn + " " );
					if ( isOpen ) {
						hasOpen = true;
					}

					if ( !tab.getAttribute( "id" ) ) {
						tab.setAttribute( "id", wb.getId() );
					}
					tab.setAttribute( "role", "tab" );
					tab.setAttribute( "aria-selected", isOpen );
					tab.setAttribute( "tabindex", isOpen ? "0" : "-1" );
					tab.setAttribute( "aria-posinset", i + 1 );
					tab.setAttribute( "aria-setsize", len );

					panel.setAttribute( "role", "tabpanel" );
					panel.setAttribute( "aria-labelledby", tab.getAttribute( "id" ) );
					panel.setAttribute( "aria-expanded", isOpen );
					panel.setAttribute( "aria-hidden", !isOpen );
				}

				// No open panels so put the first summary in the tab order
				if ( !hasOpen ) {
					tabs[ 0 ].setAttribute( "tabindex", "0" );
				}
			}

		// Set the elements this link controls
		} else {
			elms = getElements( link, data );
			for ( i = 0, len = elms.length; i !== len; i += 1 ) {
				elm = elms[ i ];
				if ( !elm.id ) {
					elm.id = wb.getId();
				}
				ariaControls += elm.id + " ";
			}
			link.setAttribute( "aria-controls", ariaControls.slice( 0, -1 ) );
		}
	},

	/**
	 * Initialize open on print behaviour of the toggle element
	 * @param {jQuery Object} $link The toggle element to initialize
	 * @param {Object} data Simple key/value data object passed when the event was triggered
	 */
	initPersist = function( $link, data ) {
		var state,
			link = $link[ 0 ];

		// Store the persistence type and key for later use
		data.persist = data.persist === "session" ? sessionStorage : localStorage;
		data.persistKey = componentName + ( data.group ? data.group : "" ) + link.id;

		// If there's a saved toggle state, trigger the change to that state
		state = data.persist.getItem( data.persistKey );
		if ( state ) {
			$link.trigger( toggleEvent, $.extend( {}, data, { type: state } ) );
		}
	},

	/**
	 * Initialize open on print behaviour of the toggle element
	 * @param {jQuery Object} $link The toggle element to initialize
	 * @param {Object} data Simple key/value data object passed when the event was triggered
	 */
	initPrint = function( $link, data ) {
		var mediaQuery,
			printEvent = "beforeprint";

		$window.on( printEvent, function() {
			$link.trigger( toggleEvent, $.extend( {}, data, { type: data.print } ) );
		});

		// Fallback for browsers that don't support print events
		if ( window.matchMedia ) {
			mediaQuery = window.matchMedia( "print" );
			if ( mediaQuery.addListener ) {
				mediaQuery.addListener( function( query ) {
					if ( query.matches ) {
						$window.trigger( printEvent );
					}
				});
			}
		}
	},

	/**
	 * Click handler for the toggle links
	 * @param {jQuery Event} event The event that triggered this invocation
	 */
	click = function( event ) {
		var $link = $( event.target );

		$link.trigger( toggleEvent, $link.data( "toggle" ) );
		event.preventDefault();

		// Assign focus to eventTarget
		$link.trigger( setFocusEvent );
	},

	/**
	 * Toggles the elements a link controls between the on and off states.
	 * @param {jQuery Event} event The event that triggered this invocation
	 * @param {Object} data Simple key/value data object passed when the event was triggered
	 */
	toggle = function( event, data ) {
		if ( event.namespace === componentName ) {
			var dataGroup, key, $elmsGroup,
				isGroup = !!data.group,
				isPersist = !!data.persist,
				isTablist = isGroup && !!data.parent,
				link = event.currentTarget,
				$link = $( link ),
				stateFrom = getState( $link, data ),
				isToggleOn = stateFrom === data.stateOff,
				stateTo = isToggleOn ? data.stateOn : data.stateOff,
				$elms = isTablist ?	$link.parent( data.group ) : getElements( link, data );

			// Group toggle behaviour: only one element in the group open at a time.
			if ( isGroup ) {

				// Get the grouped elements using data.group as the CSS selector
				// and filter to only retrieve currently open grouped elements
				dataGroup = $.extend( {}, data, { selector: data.group } );
				$elmsGroup = getElements( link, dataGroup ).filter( "." + data.stateOn + ", [open]" );

				// Set the toggle state to "off".  For tab lists, this is stored on the tab element
				setState( isTablist ? $( data.parent ).find( selectorTab ) : $elmsGroup,
					dataGroup, data.stateOff );

				// Toggle all grouped elements to "off"
				$elmsGroup.wb( "toggle", data.stateOff, data.stateOn );
				$elmsGroup.trigger( toggledEvent, {
					isOn: false,
					isTablist: isTablist,
					elms: $elmsGroup
				});

				// Remove all grouped persistence keys
				if ( isPersist ) {
					for ( key in data.persist ) {
						if ( key.indexOf( componentName + data.group ) === 0 ) {
							data.persist.removeItem( key );
						}
					}
				}
			}

			// Set the toggle state. For tab lists, this is set on the tab element
			setState( isTablist ? $link : $elms, data, stateTo );

			// Toggle all elements to the requested state
			$elms.wb( "toggle", stateTo, stateFrom );
			$elms.trigger( toggledEvent, {
				isOn: isToggleOn,
				isTablist: isTablist,
				elms: $elms
			});

			// Store the toggle link's current state if persistence is turned on.
			// Try/catch is required to address exceptions thrown when using BB10 or
			// private browsing in iOS.
			if ( isPersist ) {
				try {
					data.persist.setItem( data.persistKey, stateTo );
				} catch ( error ) {
				}
			}
		}
	},

	/**
	 * Sets the required property and attribute for toggling open/closed a details element
	 * @param {jQuery Event} event The event that triggered this invocation
	 * @param {Object} data Simple key/value data object passed when the event was triggered
	 */
	toggleDetails = function( event, data ) {
		if ( event.namespace === componentName ) {
			var top,
				isOn = data.isOn,
				$elms = data.elms,
				$detail = $( this );

			// Stop propagation of the toggleDetails event
			if ( event.stopPropagation ) {
				event.stopImmediatePropagation();
			} else {
				event.cancelBubble = true;
			}

			// Native details support
			$detail.prop( "open", isOn );

			// Polyfill details support
			if ( !Modernizr.details ) {
				$detail
					.attr( "open", isOn ? null : "open" )
					.find( "summary" ).trigger( "toggle.wb-details" );
			}

			if ( data.isTablist ) {

				// Set the required aria attributes
				$elms.find( selectorTab ).attr({
					"aria-selected": isOn,
					tabindex: isOn ? "0" : "-1"
				});
				$elms.find( selectorPanel ).attr({
					"aria-hidden": !isOn,
					"aria-expanded": isOn
				});

				// Check that the top of the open element is in view.
				if ( isOn && $elms.length === 1 ) {
					top = $elms.offset().top;
					if ( top < $window.scrollTop() ) {
						$window.scrollTop( top );
					}
				}
			}
		}
	},

	/**
	 * Returns the elements a given toggle element controls.
	 * @param {DOM element} link Toggle element that was clicked
	 * @param {Object} data Simple key/value data object passed when the event was triggered
	 * @returns {jQuery Object} DOM elements the toggle link controls
	 */
	getElements = function( link, data ) {
		var selector = data.selector || link,
			parent = data.parent || null;

		return parent !== null ? $( parent ).find( selector ) : $( selector );
	},

	/**
	 * Gets the current toggle state of elements controlled by the given link.
	 * @param {jQuery Object} $link Toggle link that was clicked
	 * @param {Object} data Simple key/value data object passed when the event was triggered
	 */
	getState = function( $link, data ) {
		var parent = data.parent,
			selector = data.selector,
			type = data.type;

		// Get opposite state of the type. Toggle reverses this
		// to the requested state.
		if ( type ) {
			return type === "on" ? data.stateOff : data.stateOn;

		// <details> elements use the open attribute to determine state
		} else if ( $link[ 0 ].nodeName.toLowerCase() === "summary" ) {
			return $link.parent().attr( "open" ) ? data.stateOn : data.stateOff;

		// When no selector, use the data attribute of the link
		} else if ( !selector ) {
			return $link.data( componentName + "-state" ) || data.stateOff;

		// Get the current on/off state of the elements specified by the selector and parent
		} else if ( states.hasOwnProperty( selector ) ) {
			return states[ selector ].hasOwnProperty( parent ) ?
				states[ selector ][ parent ] :
				states[ selector ].all;
		}
		return data.stateOff;
	},

	/*
	 * Sets the current toggle state of elements controlled by the given link.
	 * @param {DOM element} link Toggle link that was clicked
	 * @param {Object} data Simple key/value data object passed when the event was triggered
	 * @param {String} state The current state of the elements: "on" or "off"
	 */
	setState = function( $elms, data, state ) {
		var prop,
			parent = data.parent,
			selector = data.selector,
			elmsState = states[ selector ];

		if ( selector ) {

			// Check the selector object has been created
			if ( !elmsState ) {
				elmsState = { all: data.stateOff };
				states[ selector ] = elmsState;
			}

			// If there's a parent, set its state
			if ( parent ) {
				elmsState[ parent ] = state;

			// No parent means set all states for the given selector. This is
			// because toggle links that apply to the entire DOM also affect
			// links that are restricted by parent.
			} else {
				for ( prop in elmsState ) {
					if ( elmsState.hasOwnProperty( prop ) ) {
						elmsState[ prop ] = state;
					}
				}
			}
		}

		// Store the state on the elements as well. This allows a link to toggle itself.
		$elms.data( componentName + "-state", state );
	};

// Bind the plugin's events
$document.on( "timerpoke.wb " + initEvent + " " + toggleEvent +
	" click", selector, function( event, data ) {

	var eventType = event.type;

	switch ( eventType ) {
	case "click":
		click( event );
		break;

	case "toggle":
		toggle( event, data );
		break;

	case "timerpoke":
	case "wb-init":
		init( event );
		break;
	}
});

$document.on( toggledEvent, "details", toggleDetails );

// Keyboard handling for the accordion
$document.on( "keydown", selectorTab, function( event ) {
	var which = event.which,
		data, $elm, $parent, $group, $newPanel, index;

	if ( !event.ctrlKey && which > 34 && which < 41 ) {
		event.preventDefault();
		$elm = $( event.currentTarget );
		data = $elm.data( "toggle" );
		$parent = $document.find( data.parent );
		$group = $parent.find( data.group );
		index = $group.index( $elm.parent() );

		switch ( which ) {

		// End
		case 35:
			$newPanel = $group.last();
			break;

		// Home
		case 36:
			$newPanel = $group.first();
			break;

		// Left / up arrow
		case 37:
		case 38:
			if ( index === 0 ) {
				$newPanel = $group.last();
			} else {
				$newPanel = $group.eq( index - 1 );
			}
			break;

		// Right / down arrow
		case 39:
		case 40:
			if ( index === $group.length - 1 ) {
				$newPanel = $group.first();
			} else {
				$newPanel = $group.eq( index + 1 );
			}
			break;
		}

		$newPanel
			.children( "summary" )
				.trigger( setFocusEvent );
	}
});

$document.on( "keydown", selectorPanel, function( event ) {

	// Ctrl + Up arrow
	if ( event.ctrlKey && event.which === 38 ) {

		// Move focus to the summary element
		$( event.currentTarget )
			.prev()
				.trigger( setFocusEvent );
	}
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Twitter embedded timeline
 * @overview Helps with implementing Twitter embedded timelines.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @pjackson28
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "wb-twitter",
	selector = "." + componentName,
	initEvent = "wb-init" + selector,
	$document = wb.doc,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var eventTarget = wb.init( event, componentName, selector ),
			protocol = wb.pageUrlParts.protocol;

		if ( eventTarget ) {
			Modernizr.load( {
				load: ( protocol.indexOf( "http" ) === -1 ? "http:" : protocol ) + "//platform.twitter.com/widgets.js",
				complete: function() {

					// Identify that initialization has completed
					wb.ready( $( eventTarget ), componentName );
				}
			});
		}
	};

$document.on( "timerpoke.wb " + initEvent, selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Disable Event
 * @overview Event creates the active offer for users that have disabled the event.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @gc
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the event - meaning that they will be initialized once per page,
 * not once per instance of event on the page.
 */
var componentName = "wb-disable",
	selector = "#wb-tphp",
	$document = wb.doc,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector ),
			nQuery = "?",
			$html = wb.html,
			i18n = wb.i18n,
			pageUrl = wb.pageUrlParts,
			li, param;

		if ( elm ) {
			li = document.createElement( "li" );
			li.className = "wb-slc";

			// Rebuild the query string
			for ( param in pageUrl.params ) {
				if ( pageUrl.params.hasOwnProperty( param ) && param !== "wbdisable" ) {
					nQuery += param + "=" + pageUrl.params[ param ] + "&#38;";
				}
			}

			try {
				if ( wb.isDisabled || ( wb.ie && wb.ielt7 ) ) {
					$html.addClass( "wb-disable" );
					if ( localStorage ) {

						// Store preference for WET plugins and polyfills to be disabled in localStorage
						localStorage.setItem( "wbdisable", "true");
					}

					// Append the Standard version link
					li.innerHTML = "<a class='wb-sl' href='" + nQuery + "wbdisable=false'>" + i18n( "wb-enable" ) + "</a>";

					// Add link to re-enable WET plugins and polyfills
					elm.appendChild( li );
					return true;
				} else {
					$html.addClass( "wb-enable" );

					if ( localStorage ) {

						// Store preference for WET plugins and polyfills to be enabled in localStorage
						localStorage.setItem( "wbdisable", "false" );
					}
				}
			} catch ( error ) {
			}

			// Append the Basic HTML version link version
			li.innerHTML = "<a class='wb-sl' href='" + nQuery + "wbdisable=true'>" + i18n( "wb-disable" ) + "</a>";

			// Add link to disable WET plugins and polyfills
			elm.appendChild( li );

			// Identify that initialization has completed
			wb.ready( $document, componentName );
		}
	};

// Bind the events
$document.on( "timerpoke.wb", selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Focus
 * @overview User agent safe way of assigning focus to an element
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @pjackson28
 */
(function( $, wb ) {
"use strict";

var $document = wb.doc,
	$window = wb.win,
	clickEvents = "click vclick",
	setFocusEvent = "setfocus.wb",
	linkSelector = "a[href]",
	$linkTarget,

	/**
	 * @method processHash
	 */
	processHash = function() {
		var hash = wb.pageUrlParts.hash;

		if ( hash && ( $linkTarget = $( "#" + wb.jqEscape( hash.substring( 1 ) ) ) ).length !== 0 ) {
			$linkTarget.trigger( setFocusEvent );
		}
	};

// Bind the setfocus event
$document.on( setFocusEvent, function( event ) {
	if ( event.namespace === "wb" ) {
		var $elm = $( event.target ),
			$closedParents = $elm.not( "summary" ).parents( "details, [role='tabpanel']" ),
			$closedPanels, $closedPanel, len, i;

		if ( $closedParents.length !== 0 ) {

			// Open any closed ancestor details elements
			$closedParents.not( "[open]" ).children( "summary" ).trigger( "click" );

			// Open any closed tabpanels
			$closedPanels = $closedParents.filter( "[aria-hidden='true']" );
			len = $closedPanels.length;
			for ( i = 0; i !== len; i += 1 ) {
				$closedPanel = $closedPanels.eq( i );
				$closedPanel.closest( ".wb-tabs" )
					.find( "#" + $closedPanel.attr( "aria-labelledby" ) )
						.trigger( "click" );
			}
		}

		// Set the tabindex to -1 (as needed) to ensure the element is focusable
		$elm
			.filter( ":not([tabindex], a[href], button, input, textarea, select)" )
				.attr( "tabindex", "-1" );

		// Assigns focus to an element (delay allows for revealing of hidden content)
		setTimeout(function() {
			$elm.trigger( "focus" );

			var $topBar = $( ".wb-bar-t[aria-hidden=false]" );

			// Ensure the top bar overlay does not conceal the focus target
			if ( $topBar.length !== 0 ) {
				document.documentElement.scrollTop -= $topBar.outerHeight();
			}

			return $elm;
		}, 100 );
	}
});

// Set focus to the target of a deep link from a different page
// (helps browsers that can't set the focus on their own)
$document.on( "wb-ready.wb", processHash );

// Handle any changes to the URL hash after the page has loaded
$window.on( "hashchange", function() {
	wb.pageUrlParts.hash = window.location.hash;
	if ( !wb.ignoreHashChange ) {
		processHash();
	}
});

// Helper for browsers that can't change keyboard and/or event focus on a same page link click
$document.on( clickEvents, linkSelector, function( event ) {
	var testHref = event.currentTarget.getAttribute( "href" );

	// Same page links only
	if ( testHref.charAt( 0 ) === "#" && !event.isDefaultPrevented() &&
		( $linkTarget = $( "#" + wb.jqEscape( testHref.substring( 1 ) ) ) ).length !== 0 ) {
		wb.ignoreHashChange = true;
		$linkTarget.trigger( setFocusEvent );
	}
});

})( jQuery, wb );

/**
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * @title Zebra
 * @overview Apply Zebra stripping on a complex data table and simulate column hovering effect
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @duboisp
 *
 */
(function( $, window, document, wb ) {
"use strict";

/**
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
 var componentName = "wb-zebra",
	selector = "." + componentName,
	hoverColClass = componentName + "-col-hover",
	selectorHoverCol = "." + hoverColClass + " td, " + hoverColClass + " th",
	initEvent = "wb-init" + selector,
	tableParsingEvent = "passiveparse.wb-tableparser",
	tableParsingCompleteEvent = "parsecomplete.wb-tableparser",
	$document = wb.doc,
	idCount = 0,
	i18n, i18nText,

	/**
	 * Main Entry function to apply the complex zebra stripping
	 * @method zebraTable
	 * @param {jQuery DOM element} $elm table element use to apply complex zebra stripping
	 */
	zebraTable = function( $elm ) {
		var i, iLength, tblGroup,

			// Cache the table parsed results
			tblparser = $elm.data().tblparser;

		function addCellClass( arr, className ) {
			var i, iLength;

			for ( i = 0, iLength = arr.length; i !== iLength; i += 1 ) {
				$( arr[ i ].elem ).addClass( className );
			}
		}

		// Key Cell
		if ( tblparser.keycell ) {
			addCellClass( tblparser.keycell, "wb-cell-key" );
		}

		// Description Cell
		if ( tblparser.desccell ) {
			addCellClass( tblparser.desccell, "wb-cell-desc" );
		}

		// Layout Cell
		if ( tblparser.layoutCell ) {
			addCellClass( tblparser.layoutCell, "wb-cell-layout" );
		}

		// Summary Row Group
		if ( tblparser.lstrowgroup ) {
			for ( i = 0, iLength = tblparser.lstrowgroup.length; i !== iLength; i += 1 ) {
				tblGroup = tblparser.lstrowgroup[ i ];
				// Add a class to the row
				if ( tblGroup.type === 3 || tblGroup.row[ 0 ].type === 3 ) {
					$( tblGroup.elem ).addClass( "wb-group-summary" );
				}
			}
		}

		// Summary Column Group
		if ( tblparser.colgroup ) {
			for ( i = 0, iLength = tblparser.colgroup.length; i !== iLength; i += 1 ) {
				tblGroup = tblparser.colgroup[ i ];
				// Add a class to the row
				if ( tblGroup.type === 3 ) {
					$( tblGroup.elem ).addClass( "wb-group-summary" );
				}
			}
		}

		// Identify that initialization has completed
		wb.ready( $elm, componentName );
	},

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector ),
			deps = [
				"site!deps/tableparser" + wb.getMode() + ".js"
			],
			elmId;

		if ( elm ) {
			elmId = elm.id;

			// Ensure there is a unique id on the element
			if ( !elmId ) {
				elmId = componentName + "-id-" + idCount;
				idCount += 1;
				elm.id = elmId;
			}

			// Only initialize the i18nText once
			if ( !i18nText ) {
				i18n = wb.i18n;
				i18nText = {
					tableMention: i18n( "hyphen" ) + i18n( "tbl-txt" ),
					tableFollowing: i18n( "hyphen" ) + i18n( "tbl-dtls" )
				};
			}

			// Load the required dependencies
			Modernizr.load({

				// For loading multiple dependencies
				load: deps,
				complete: function() {

					// Let's parse the table
					$( "#" + elmId ).trigger( tableParsingEvent );
				}
			});
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent + " " + tableParsingCompleteEvent, selector, function( event ) {
	var eventTarget = event.target;

	switch ( event.type ) {

	/*
	 * Init
	 */
	case "timerpoke":
	case "wb-init":
		init( event );
		break;

	/*
	 * Data table parsed
	 */
	case "parsecomplete":
		if ( event.currentTarget === eventTarget ) {
			zebraTable( $( eventTarget ) );
		}
		break;
	}

	/*
	 * Since we are working with events we want to ensure that we are being passive about our control,
	 * so returning true allows for events to always continue
	 */
	return true;
});

// Applying the hover, Simulate Column Hovering Effect
$document.on( "mouseenter focusin", selectorHoverCol, function( event ) {
	var tblparserCell = $( event.currentTarget ).data().tblparser;

	if ( tblparserCell.col && tblparserCell.col.elem ) {
		$( tblparserCell.col.elem ).addClass( "table-hover" );
	}
});

// Removing the hover, Simulate Column Hovering Effect
$document.on( "mouseleave focusout", selectorHoverCol, function( event ) {
	var tblparserCell = $( event.currentTarget ).data().tblparser;

	if ( tblparserCell.col && tblparserCell.col.elem ) {
		$( tblparserCell.col.elem ).removeClass( "table-hover" );
	}
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, document, wb );