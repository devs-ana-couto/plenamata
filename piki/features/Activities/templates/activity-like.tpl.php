<?php 
if( $activity->type_list == 'owers' ):
	$labels = array( 'like' => 'Curti', 'dislike' => 'Deixei de curtir', 'unlike' => 'Não curti', 'disunlike' => 'Deixei de não curtir'  );
else:
	$labels = array( 'like' => 'Curtiu', 'dislike' => 'Deixou de curtir', 'unlike' => 'Não curtiu', 'disunlike' => 'Deixou de não curtir'  );
endif;
?>
<div class="activity clearfix">
	<a href="<?php the_perfil_url( $activity->author ); ?>" class="avatar alignleft">
		<img src="<?php echo PKPerfil::get_avatar( $activity->author->ID ); ?>" />
		<span class="apelido"><?php echo $activity->author->data->user_login; ?></span>
	</a>
	<div class="content type-1">
		<?php if( $activity->object_type == 'comment' ): ?>
		<h3 class="title"><?php echo $labels[ $activity->action ]; ?> um comentário em <a href="<?php echo get_permalink($activity->post->ID); ?>#comment-<?php echo $activity->target->comment_ID; ?>"><?php echo $activity->post->post_title; ?></a></h3>
		<div class="post-title"><a href="<?php echo get_permalink($activity->post->ID); ?>#comment-<?php echo $activity->target->comment_ID; ?>"><?php echo Piki::trim( $activity->post->post_content ); ?></a></a></div>
		<div class="extra-content">
			<h4 class="label">COMENTÁRIO:</h4>
			<div class="excerpt"><?php echo apply_filters( 'the_content', $activity->target->comment_content ); ?></div>
		</div>
		<?php else: ?>
		<h3 class="title"><?php echo $labels[ $activity->action ]; ?> <a href="<?php echo get_permalink($activity->target->ID); ?>#comment-<?php echo $activity->target->ID; ?>"><?php echo $activity->target->post_title; ?></a></h3>
		<div class="post-title"><a href="<?php echo get_permalink( $activity->target->ID ); ?>"><?php echo Piki::trim( $activity->target->post_content ); ?></a></div>
		<?php endif; ?>
	</div>
</div>
