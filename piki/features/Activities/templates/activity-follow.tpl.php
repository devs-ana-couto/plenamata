<?php 
# Visitors
if( $activity->type_list == 'friends' ):

	$perfil_url = get_perfil_url( $activity->author );
	$perfil_apelido = $activity->author->data->user_login;
	$perfil_avatar = PKPerfil::get_avatar( $activity->author );

	$label = $activity->action == 'follow' ? 'Está seguindo ' : 'Deixou de seguir';

	$target_url = get_perfil_url( $activity->target );
	$target_apelido = $activity->target->data->user_login;

else:

	if( $activity->type_list == 'visitor' ):
		$label = $activity->action == 'follow' ? 'Está seguindo ' : 'Deixou de seguir';
	else:
		$label = $activity->action == 'follow' ? 'Você está seguindo' : 'Você deixou de seguir';
	endif;
	
	$perfil_url = get_perfil_url( $activity->target );
	$perfil_apelido = $activity->target->data->user_login;
	$perfil_avatar = PKPerfil::get_avatar( $activity->target );


endif;
?>

	
<div class="activity clearfix">
	<a href="<?php echo $perfil_url; ?>" class="avatar alignleft">
		<img src="<?php echo $perfil_avatar; ?>" class="alignleft" />
		<span class="apelido"><?php echo $perfil_apelido; ?></span>
	</a>
	<div class="content type-1">
		<h3 class="title">
			<?php echo $label; ?>
			<?php if(isset($target_url)): ?>
			<a href="<?php echo $target_url; ?>" title="<?php echo $target_apelido; ?>"><?php echo $target_apelido; ?></a>
			<?php endif; ?>
		</h3>
	</div>
</div>

<?php //echo ( $activity->type_list == 'owers' ? 'Postei' L 'Postou' ); ?>
