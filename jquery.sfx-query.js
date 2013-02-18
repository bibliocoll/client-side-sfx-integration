// SFX-Vars:
var isJournal = jQuery("#Materialart:contains('ISS')").text(); // ISSBD and ISSUE only, see headings in edit_doc_999
var issn = jQuery("#ISSN").text();
jQuery("#Materialart").parents("tr").remove(); // fully remove tr with material type (only used for getting the var above)
 
// query only if journal, otherwise do not do anything:
if (isJournal || issn) {
 
var sid = ""; // fill in your SFX-SID
var ip = ""; // fill in your IP
var titelGesamt = jQuery("span[id='Series title']").text();
var titelKat = jQuery("#Title").text();
if (titelGesamt) {
var title = encodeURIComponent(titelGesamt.replace(/\.&nbsp;/g,"")); // encodeURIComponent: essential f. Jquery
} else if (titelKat) {
var title = encodeURIComponent(titelKat.replace(/\.&nbsp;/g,"")); // encodeURIComponent: essential f. Jquery
} else { var title = "";}
 
var jahr = document.getElementById("Year");
if (jahr) {
var date = jahr.innerHTML;
} else {
var date = ""; }
 
var sfxIcon = '<img src="&icon_path/sfx_local.gif" style="border:none"/>';
 
// comment in, if you find it useful (make sure you have the CSS-Ids defined somewhere in your full view)
//var sfxIMG_getFullTxt = "http://my.sfx.server/sfx_local?sid="+sid+"&genre=journal&title="+title+"&issn="+issn+"&date="+date+"&__service_type=getFullTxt&__response_type=image-large";
//var sfxIMG_getSelectedFullTxt = "http://my.sfx.server/sfx_local?sid="+sid+"&genre=journal&title="+title+"&issn="+issn+"&date="+date+"&__service_type=getSelectedFullTxt&__response_type=image-large";
//jQuery("#sfxgetFullTxt").attr("src", sfxIMG_getFullTxt);
//jQuery("#sfxgetSelectedFullTxt").attr("src", sfxIMG_getSelectedFullTxt);
//jQuery("#sfx_block").attr("style", "display:inline");
 
jQuery(document).ready(function(){
// 1. query: getFullTxt + IP
        jQuery.ajax({
                type: "GET",
                url: "http://my.sfx.server/sfx_local?sid="+sid+"&genre=journal&title="+title+"&issn="+issn+"&date="+date+"&__service_type=getFullTxt&__response_type=multi_obj_detailed_xml&sfx.ignore_date_threshold=1&req.ip="+ip,
                dataType: "xml",
                success: function(res){
 if ( jQuery.browser.msie ) {  var target_url = jQuery.xmlDOM(res.responseText).find('target_url:first').text(); 
// jQuery-Plugin "xmlDOM", s. /mpg-js/jquery.xmldom-1.0.js
                                var coverage_statement = jQuery.xmlDOM(res.responseText).find('coverage_statement:first').text();
                                // more targets: read the second and third explicitly:
                                var target_url_2 = jQuery.xmlDOM(res.responseText).find('target:eq(1)').find('target_url').text();
                                var coverage_statement_2 = jQuery.xmlDOM(res.responseText).find('target:eq(1)').find('coverage_statement').text();
                                var target_url_3 = jQuery.xmlDOM(res.responseText).find('target:eq(2)').find('target_url').text();
                                var coverage_statement_3 = jQuery.xmlDOM(res.responseText).find('target:eq(2)').find('coverage_statement').text();
} else { // FF + Konsorten
                                var target_url = jQuery(res.responseText).find('target:first target_url').text();
                                var coverage_statement = jQuery(res.responseText).find('target:first coverage_statement').text();
                                // more targets: read the second and third explicitly:
                                var target_url_2 = jQuery(res.responseText).find('target:eq(1)').find('target_url').text();
                                var coverage_statement_2 = jQuery(res.responseText).find('target:eq(1)').find('coverage_statement').text();
                                var target_url_3 = jQuery(res.responseText).find('target:eq(2)').find('target_url').text();
                                var coverage_statement_3 = jQuery(res.responseText).find('target:eq(2)').find('coverage_statement').text();
}
                        // bind to full view page:
                                if (target_url) {
                                // CSS-ID 'vollanzeige' new in in direct/full-set-head
                                jQuery("#vollanzeige tr:last").after('<tr><td class="td1" width="15%"></td><td class="td1" align="left"><a href="'+target_url+'">'+sfxIcon+'</a>&nbsp;'+coverage_statement+'</td></tr>');
                                jQuery("span[id*='Call']").parents("tr").before('<tr><td class="td1" width="15%"></td><td class="td1" align="left"><a href="'+target_url+'">'+sfxIcon+'</a>&nbsp;'+coverage_statement+'</td></tr>');
                                }
                                if (target_url_2) {
                                jQuery("#vollanzeige tr:last").after('<tr><td class="td1" width="15%"></td><td class="td1" align="left"><a href="'+target_url_2+'">'+sfxIcon+'</a>&nbsp;'+coverage_statement_2+'</td></tr>');
                                jQuery("span[id*='Call']").parents("tr").before('<tr><td class="td1" width="15%"></td><td class="td1" align="left"><a href="'+target_url_2+'">'+sfxIcon+'</a>&nbsp;'+coverage_statement_2+'</td></tr>');
                                }
                                if (target_url_3) {
                                jQuery("#vollanzeige tr:last").after('<tr><td class="td1" width="15%"></td><td class="td1" align="left"><a href="'+target_url_3+'">'+sfxIcon+'</a>&nbsp;'+coverage_statement_3+'</td></tr>');
                                jQuery("span[id*='Call']").parents("tr").before('<tr><td class="td1" width="15%"></td><td class="td1" align="left"><a href="'+target_url_3+'">'+sfxIcon+'</a>&nbsp;'+coverage_statement_3+'</td></tr>');
                                }
                             }
                  });
// 2. query: getSelectedFullTxt + IP
        jQuery.ajax({
                type: "GET",
                url: "http://my.sfx.server/sfx_local?sid="+sid+"&genre=journal&title="+title+"&issn="+issn+"&date="+date+"&__service_type=getSelectedFullTxt&__response_type=multi_obj_detailed_xml&sfx.ignore_date_threshold=1&req.ip="+ip,
                success: function(res){
 if ( jQuery.browser.msie ) {  var target_url = jQuery.xmlDOM(res.responseText).find('target_url:first').text(); 
// jQuery-Plugin "xmlDOM", s. /mpg-js/jquery.xmldom-1.0.js
} else { // FF + Konsorten
                                var target_url = jQuery(res.responseText).find('target_url:first').text();
}
                        // bind to full view page:
                                if (target_url) {
                                jQuery("#vollanzeige tr:last").after('<tr><td class="td1" width="15%"></td><td class="td1" align="left"><a href="'+target_url+'">'+sfxIcon+'</a>&nbsp;EZB/Journal Homepage</td></tr>');
                                jQuery("span[id*='Call']").parents("tr").before('<tr><td class="td1" width="15%"></td><td class="td1" align="left"><a href="'+target_url+'">'+sfxIcon+'</a>&nbsp;EZB/Journal Homepage</td></tr>');
                                }
                             }
                  });
// 3. query: getHolding + IP (EZB)
        jQuery.ajax({
                type: "GET",
                url: "http://my.sfx.server/sfx_local?sid="+sid+"&genre=journal&title="+title+"&issn="+issn+"&date="+date+"&__service_type=getHolding&__response_type=multi_obj_detailed_xml&req.ip="+ip,
                success: function(res){
 if ( jQuery.browser.msie ) {
                                var target_url = jQuery.xmlDOM(res.responseText).find('target_url:first').text(); // jQuery-Plugin "xmlDOM", s. /mpg-js/jquery.xmldom-1.0.js
} else { // FF + Konsorten
                                var target_url = jQuery(res.responseText).find('target_url:first').text();
}
                        // bind to full view page:
                                if (target_url) {
                                jQuery("#vollanzeige tr:last").after('<tr><td class="td1" width="15%"></td><td class="td1" align="left"><a href="'+target_url+'">'+sfxIcon+'</a>&nbsp;EZB/Journal Homepage</td></tr>');
                                jQuery("span[id*='Call']").parents("tr").before('<tr><td class="td1" width="15%"></td><td class="td1" align="left"><a href="'+target_url+'">'+sfxIcon+'</a>&nbsp;EZB/Journal Homepage</td></tr>');
                                }
                             }
                  });
           });
} // end if journal
 
