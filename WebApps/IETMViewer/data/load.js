// $(document).ready(function(e) {
//     //$('#Page_content_div').append(Inner_doc_div);
//     // $('#Page_content_div').empty();
//     alert("sss");
//     displayResult('doc_content_div');
// })
function loadXMLDoc(filename)
{
    if (window.ActiveXObject)
    {
        xhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    else
    {
        xhttp = new XMLHttpRequest();
    }
    xhttp.open("GET", filename, false);
    try {xhttp.responseType = "msxml-document"} catch(err) {} // Helping IE11
    xhttp.send("");
    return xhttp.responseXML;
}

function displayResult(divName,filename)
{
    xml = loadXMLDoc(filename);
    xsl = loadXMLDoc("data/cdcatalog.xsl");
// code for IE
    if (window.ActiveXObject || xhttp.responseType == "msxml-document")
    {
        ex = xml.transformNode(xsl);
        document.getElementById(divName).innerHTML = ex;
    }
// code for Chrome, Firefox, Opera, etc.
    else if (document.implementation && document.implementation.createDocument)
    {
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        resultDocument = xsltProcessor.transformToFragment(xml, document);
        document.getElementById(divName).appendChild(resultDocument);
    }
}


$(document).ready(function(e) {
    // $('#Page_content_div').empty();
 
    // $("#manual-demo1").bind("click",function (e) {
    //     $('#Page_content_div').empty();
    //     displayResult('Page_content_div','data/xml/temp1.xml');
    //     //loadBookName();
 
    // });
    // $("#manual-demo2").bind("click",function (e) {
    //     $('#Page_content_div').empty();
    //     displayResult('Page_content_div','data/xml/temp7.xml');
    //     //loadBookName();
 
    // });
    // $("#manual-demo3").bind("click",function (e) {
    //     $('#Page_content_div').empty();
    //     displayResult('Page_content_div','data/xml/temp2.xml');
    //     //loadBookName();
 
    // });
 
 
});