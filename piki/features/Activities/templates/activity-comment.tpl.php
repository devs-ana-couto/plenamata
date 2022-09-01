<?php 
$voce = !$activity->author_logged ? '' : 'Você ';
$txtcomment = $activity->action == 'edit' ? 'Editou o comentário' : 'Comentou';
if( $voce != '' ):
	$txtcomment = strtolower( $txtcomment );
endif;
?>

<div class="activity clearfix">
	<a href="<?php the_perfil_url( $activity->author ); ?>" class="avatar alignleft">
		<img src="<?php echo PKPerfil::get_avatar( $activity->author->ID ); ?>" />
		<span class="apelido"><?php echo $activity->author->data->user_login; ?></span>
	</a>
	<div class="content comment">
		<h3 class="title"><?php echo $voce . $txtcomment; ?> em  <strong><a href="<?php echo get_permalink( $activity->post->ID ); ?>"><?php echo $activity->post->post_title; ?></a></strong></h3>
		<div class="post-title"><a href="<?php echo get_permalink( $activity->post->ID ); ?>"><?php echo Piki::trim( $activity->post->post_content ); ?></a></a></div>
		<div class="extra-content">
			<h4 class="label">COMENTÁRIO:</h4>
			<div class="excerpt"><?php echo apply_filters( 'the_content', $activity->target->comment_content ) ?></div>
		</div>
	</div>
</div>
