!function($){var t={_this:this,$slugbox:!1,$taxbox:!1,$taxoptions:!1,settings:!1,trava:!1,actual:!1,configure:function(){this.$form=$("form#post"),this.$title=$("input#title",this.$form),this.$slugbox=$("#edit-slug-box",this.$form),this.$taxbox=$("#taxonomy-"+this.settings.taxonomy.name),this.$taxoptions=$('input[type="checkbox"]',this.$taxbox),this.$defaultTerm=this.$taxoptions.filter('[value="'+this.settings.term.term_id+'"]'),this.$taxbox.on("change",'input[type="checkbox"]',function(){t.trava!==!0&&(t.trava=!0,void 0===this.$&&(this.$=$(this)),t.change(this))}),this.$slugbox.children().length||this.checkDefault()},change:function(t){t.$.prop("checked")===!0?this.uncheckOthers(t.$.val()):this.checkDefault(),this.chooseTerm(t.$),this.trava=!1},uncheckOthers:function(t){this.$taxoptions.not('[value="'+t+'"]').prop("checked",!1)},checkSiblings:function(t){this.$taxoptions.filter('[value="'+value+'"]').prop("checked",!0)},checkDefault:function(){this.$defaultTerm.prop("checked",!0),this.chooseTerm(this.$defaultTerm)},chooseTerm:function(t){this.actual=t.val(),$.fn.pikiLoader(),$.ajax({url:Piki.ajaxurl,type:"POST",dataType:"HTML",data:{action:"ptl_choose_term",ID:this.settings.post.ID,term_id:this.actual,title:this.$title.val(),samplepermalinknonce:$("#samplepermalinknonce").val()}}).done(function(t){$.fn.pikiLoader("close"),"-1"!==t&&$("#edit-slug-box").html(t)}).fail(function(t,i){$.fn.pikiLoader("close"),$.fn.pikiAlert("Request failed: "+i)})},init:function(){void 0!==Piki.post_type_link&&(this.settings=Piki.post_type_link,$(function(){t.configure()}))}};t.init()}(jQuery);