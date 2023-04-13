(()=>{let a,e,t,r,i,l,s,o,n,c=!1;function m(a){void 0===e&&(t=document.getElementById("simple-local-avatar-ratings"),e=jQuery(document.getElementById("simple-local-avatar-spinner")),r=document.getElementById("simple-local-avatar-photo"),i=jQuery(t).closest("form").find("input[type=submit]")),"unlock"===a?(c=!1,i.removeAttr("disabled"),e.hide()):(c=!0,i.attr("disabled","disabled"),e.show())}function p(a,e){const t=e.get("control"),r=a.get("width"),i=a.get("height");let l=parseInt(t.params.width,10),s=parseInt(t.params.height,10);const o=l/s;e.set("canSkipCrop",!0);const n=l,c=s;r/i>o?(s=i,l=s*o):(l=r,s=l/o);const m=(r-l)/2,p=(i-s)/2;return{handles:!0,keys:!0,instance:!0,persistent:!0,imageWidth:r,imageHeight:i,minWidth:n>l?l:n,minHeight:c>s?s:c,x1:m,y1:p,x2:l+m,y2:s+p,aspectRatio:`${l}:${s}`}}function d(a,e,i,l){const s={};s.url=a,s.thumbnail_url=a,s.timestamp=_.now(),e&&(s.attachment_id=e),i&&(s.width=i),l&&(s.height=l),m("lock"),jQuery.post(i10n_SimpleLocalAvatars.ajaxurl,{action:"assign_simple_local_avatar_media",media_id:e,user_id:i10n_SimpleLocalAvatars.user_id,_wpnonce:i10n_SimpleLocalAvatars.mediaNonce}).done((function(a){""!==a&&(r.innerHTML=a,jQuery("#simple-local-avatar-remove").show(),t.disabled=!1)})).always((function(){m("unlock")}))}jQuery(document).ready((function(e){s=e("#simple-local-avatar"),l=e("#simple-local-avatar-photo img"),n=l.attr("src"),t=e("#simple-local-avatar-ratings"),r=e("#simple-local-avatar-photo"),e("#simple-local-avatar-media").on("click",(function(e){if(e.preventDefault(),c)return;const i={id:"control-id",params:{flex_width:!0,flex_height:!0,width:200,height:200}};a=wp.media({button:{text:i10n_SimpleLocalAvatars.selectCrop,close:!1},states:[new wp.media.controller.Library({title:i10n_SimpleLocalAvatars.selectCrop,library:wp.media.query({type:"image"}),multiple:!1,date:!1,priority:20,suggestedWidth:200,suggestedHeight:200}),new wp.media.controller.CustomizeImageCropper({imgSelectOptions:p,control:i})]}),a.on("cropped",(function(a){const{url:e}=a;d(e,a.id,a.width,a.height)})),a.on("skippedcrop",(function(a){const e=a.get("url"),t=a.get("width"),r=a.get("height");d(e,a.id,t,r)})),a.on("select",(function(){const e=a.state().get("selection").first().toJSON();var l;i.params.width!==e.width||i.params.height!==e.height||i.params.flex_width||i.params.flex_height?a.setState("cropper"):(e.dst_width=e.width,e.dst_height=e.height,l=e,m("lock"),jQuery.post(i10n_SimpleLocalAvatars.ajaxurl,{action:"assign_simple_local_avatar_media",media_id:l.id,user_id:i10n_SimpleLocalAvatars.user_id,_wpnonce:i10n_SimpleLocalAvatars.mediaNonce}).done((function(a){""!==a&&(r.innerHTML=a,jQuery("#simple-local-avatar-remove").show(),t.disabled=!1,m("unlock"))})).always((function(){m("unlock")})),a.close())})),a.open()})),e("#simple-local-avatar-remove").on("click",(function(a){a.preventDefault(),c||(m("lock"),e.get(i10n_SimpleLocalAvatars.ajaxurl,{action:"remove_simple_local_avatar",user_id:i10n_SimpleLocalAvatars.user_id,_wpnonce:i10n_SimpleLocalAvatars.deleteNonce}).done((function(a){""!==a&&(r.innerHTML=a,e("#simple-local-avatar-remove").hide(),t.disabled=!0)})).always((function(){m("unlock")})))})),s.on("change",(function(a){l.attr("srcset",""),l.attr("height","auto"),URL.revokeObjectURL(o),a.target.files.length>0?(o=URL.createObjectURL(a.target.files[0]),l.attr("src",o)):l.attr("src",n)})),e(document.getElementById("simple-local-avatars-migrate-from-wp-user-avatar")).on("click",(function(a){a.preventDefault(),jQuery.post(i10n_SimpleLocalAvatars.ajaxurl,{action:"migrate_from_wp_user_avatar",migrateFromWpUserAvatarNonce:i10n_SimpleLocalAvatars.migrateFromWpUserAvatarNonce}).always((function(){e(".simple-local-avatars-migrate-from-wp-user-avatar-progress").empty(),e(".simple-local-avatars-migrate-from-wp-user-avatar-progress").text(i10n_SimpleLocalAvatars.migrateFromWpUserAvatarProgress)})).done((function(a){e(".simple-local-avatars-migrate-from-wp-user-avatar-progress").empty();const t=e.parseJSON(a).count;0===t&&e(".simple-local-avatars-migrate-from-wp-user-avatar-progress").text(i10n_SimpleLocalAvatars.migrateFromWpUserAvatarFailure),t>0&&e(".simple-local-avatars-migrate-from-wp-user-avatar-progress").text(i10n_SimpleLocalAvatars.migrateFromWpUserAvatarSuccess+": "+t),setTimeout((function(){e(".simple-local-avatars-migrate-from-wp-user-avatar-progress").empty()}),5e3)}))}));const i=e("#clear_cache_btn"),u=e("#clear_cache_message"),v=e("#simple-local-avatar-default"),g=e("#simple-local-avatar-file-url"),h=e("#simple-local-avatar-file-id");function _(){i.find("span").remove(),i.removeClass("disabled")}function f(a,t){t.step=a,e.ajax({url:i10n_SimpleLocalAvatars.ajaxurl,dataType:"json",data:t,method:"POST",success:function(a){if(a.success)return"done"===a.data.step?(u.text(a.data.message),_()):(u.text(a.data.message),f(parseInt(a.data.step,10),t)),!1;u.text(i10n_SimpleLocalAvatars.clearCacheError),_()},error:function(){u.text(i10n_SimpleLocalAvatars.clearCacheError),_()}})}if(i.on("click",(function(a){a.preventDefault(),i.addClass("disabled"),i.append('<span class="spinner is-active" style="margin-left:5px;margin-right:0;"></span>'),f(1,{action:"sla_clear_user_cache",nonce:i10n_SimpleLocalAvatars.cacheNonce})})),v.click((function(a){a.preventDefault();var t=e(this),r=wp.media({title:i10n_SimpleLocalAvatars.insertMediaTitle,multiple:!1,library:{type:"image"}}).open().on("select",(function(a){var e=r.state().get("selection").first(),i=(e=e.toJSON())?.sizes?.thumbnail?.url;void 0===i&&(i=e.url);var l=t.parent().find("img.avatar");l.show(),l.attr("src",i),l.attr("srcset",i),g.val(i),h.val(e.id)}))})),g.length&&""!==g.val()){var w=g.parent().find("img.avatar");w.attr("src",g.val()),w.attr("srcset",g.val())}""===h.val()&&h.parent().find("img.avatar").hide()}))})();