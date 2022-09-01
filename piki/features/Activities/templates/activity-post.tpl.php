<?php $post_type = get_post_type_object( $activity->target->post_type ); ?>
<div class="activity clearfix">
	<a href="<?php the_perfil_url( $activity->author ); ?>" class="avatar alignleft">
		<img src="<?php echo PKPerfil::get_avatar( $activity->author->ID ); ?>" />
		<span class="apelido"><?php echo $activity->author->data->user_login; ?></span>
	</a>
	<div class="content comment">
		<?php 
		$txt_title = ( $activity->type_list == 'owers' ? 'Postei' : 'Postou' ) . ' em <strong>' . $post_type->labels->name . '</strong>';
		$txt_title = apply_filters( 'activity_title', $txt_title, $activity );
		?>
		<h3 class="title"><?php echo $txt_title; ?></h3>
		<div class="post-title"><a href="<?php echo get_permalink( $activity->target->ID ); ?>"><?php echo Piki::trim( $activity->target->post_content ); ?></a></a></div>
	</div>
</div>
