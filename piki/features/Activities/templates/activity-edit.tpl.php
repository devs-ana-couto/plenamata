<?php $post_type = get_post_type_object( $activity->target->post_type ); ?>
<div class="activity clearfix">
	<a href="<?php bloginfo( 'url' ) ?>/perfil/<?php echo $activity->user->user_nicename; ?>/" class="avatar alignleft">
		<img src="<?php echo PKPerfil::get_avatar( $activity->user->ID ); ?>" />
		<span class="apelido"><?php echo $activity->user->data->user_login; ?></span>
	</a>
	<div class="content comment">
		<h3 class="title">Postou em <strong><?php echo $post_type->labels->name; ?></strong></h3>
		<div class="post-title"><a href="<?php echo get_permalink( $activity->target->ID ); ?>"><?php echo Piki::trim( $activity->target->post_content ); ?></a></a></div>
	</div>
</div>
