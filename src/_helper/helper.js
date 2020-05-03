import {startSelectedFacets} from '../../src/store/shared/actions'
import nookies from 'nookies'
import Cookies from 'js-cookie';

export function handleCat(category, subCategory, childsubCat, subChildCatId){
    var data
    if(category && subCategory === undefined && childsubCat === undefined && subChildCatId === undefined){
        return data = {
            category : category,
            url : `${category}`
        }
    }else if(category && subCategory && childsubCat === undefined && subChildCatId === undefined){
        return data = {
            category : subCategory,
            url : `${category}/${subCategory}`
        }
    }else if(category && subCategory && childsubCat && subChildCatId === undefined){
        return data = {
            category : childsubCat,
            url : `${category}/${subCategory}/${childsubCat}`
        }
    }
    else if(category && subCategory && childsubCat && subChildCatId){
        return data = {
            category : subChildCatId,
            url : `${category}/${subCategory}/${childsubCat}/${subChildCatId}`
        }
    }
}

export function findValue(array, value){
    var data 
    array.map(s => {
        if(Object.keys(s).includes(value)){
            // console.log(s)
            data = s
        }
    })
    return data
}

export function stringHandle(str){
    var newArray = []
    const array1 = str.split('?')
    const array2 = array1[0].toString().split('/')
    

    newArray["categoryid"] = array2 ? array2[2] : undefined 
    newArray["subcategoryId"] = array2 ?  array2[3] : undefined
    newArray["childCatId"] = array2 ? array2[4] : undefined

    return {...newArray}
}


export function facetValueHandler(facetValues, isServer, store){
    // console.log('checking that value is comming>>>>', facetValues, isServer, store)
    if (facetValues && Array.isArray(facetValues)) {
        let data = {}
        facetValues.map((s) => {
            data = {
                key: s.split(':')[1],
                value: s.split(':')[0],
                isServer: isServer
            }
            store.dispatch(startSelectedFacets(data))
        })
    }
    else if(facetValues && typeof facetValues === "string") {
        const data = {
            key: facetValues.split(':')[1],
            value: facetValues.split(':')[0],
            isServer: isServer
        }
        store.dispatch(startSelectedFacets(data))
    }
    else{
        const data = {
          key : '',
          value : '',
          empty : true
        }
        store.dispatch(startSelectedFacets(data))
    }
}

export const COLOR = ["Blue", "white", "brown", "black", "grey", "red", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen", "Petrol", "Multicolored"];
//export const COLOR = [];
export const SIZE = ["xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl", "oneSize", "24", "24.5", "25", "25.5", "26", "26.5", "27", "27.5", "28", "28.5", "29", "29.5", "30", "30.5", "31", "31.5", "32", "32.5", "33", "33.5", "34", "34.5", "35", "35.5", "36", "36.5", "37", "37.5", "38", "38.5", "39", "39.5", "40", "40.5", "41", "41.5", "42", "42.5", "43", "43.5", "44", "44.5", "45", "45.5", "46", "46.5", "47", "47.5", "48", "48.5", "49", "49.5", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99",  "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120"];


export function trackPageView(url) {
    try {
      window.gtag('config', 'UA-98881321-1', {
        page_location: url
      });
    } catch (error) {
      // silences the error in dev mode
      // and/or if gtag fails to load
    }
}

export function sendDataToTagManager(productObj){
    // console.log('data is comming here', productObj)
    dataLayer.push(productObj)
}


export function parseCookie(req){
    return nookies.get(req) && nookies.get(req).authHeader ? nookies.get(req).authHeader : Cookies.get("authHeader")
}
  