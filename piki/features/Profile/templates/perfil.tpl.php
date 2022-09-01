<?php
/**
 * The template for displaying all single posts
 *
 * @package WordPress
 * @subpackage Twenty_Thirteen
 * @since Twenty Thirteen 1.0
 */
get_header();
$usuario = PKPerfil::perfil();
$usuario->total_followers = PKPerfil::total_user_followers( $usuario );
$usuario->total_following = PKPerfil::total_user_following( $usuario );
# Totais
$total_historias = PKPerfil::count_user_posts( $usuario->ID, Historias_ptype );
$total_comentarios = PKPerfil::count_user_comments( $usuario->ID );
?>
<div id="main-content" class="center-full">
    
	<div id="primary" class="full-size content-area">
		
		<h2 class="page-title">
			<?php if( $usuario->current  ): ?>
			Meu perfil
			<?php else: ?>
			Perfil de <?php echo $usuario->data->user_login; ?>
			<?php endif; ?>
		</h2>
		
		<div id="content" class="site-content perfil" role="main">

			<div class="header clearfix">
				<div class="profile">
					<img src="<?php echo $usuario->perfil->avatar; ?>" class="avatar alignleft" />
					<div class="user-info alignleft">
						<div class="clearfix">
							<div class="left alignleft">
								<?php /* ?>
								<p>Nome: <strong><?php echo $usuario->data->display_name; ?></strong></p>
								<p>Email: <strong><?php echo $usuario->data->user_email; ?></strong></p>
								<?php */ ?>
								<p>Apelido: <strong><?php echo $usuario->data->user_login; ?></strong></p>
								<?php if( $usuario->perfil->sexo ): ?>
								<p>Sexo: <strong><?php echo $usuario->perfil->sexo; ?></strong></p>
								<?php endif; ?>
							</div>
							<?php if( $usuario->perfil->show_info === true ): ?>
							<div class="right alignright">
								<?php if( $usuario->perfil->data_de_nascimento ): ?>
								<p>Data de nascimento: <strong><?php echo $usuario->perfil->data_de_nascimento; ?></strong></p>
								<?php endif; ?>
								<?php if( $usuario->perfil->estado_e_cidade ): ?>
								<p>Cidade / Estado: <strong><?php echo $usuario->perfil->estado_e_cidade; ?></strong></p>
								<?php endif; ?>
							</div>
							<?php endif; ?>
						</div>
						<?php if( $usuario->current  ): ?>
						<a href="<?php bloginfo( 'url' ) ?>/cadastro/" class="button clearfix edit-profile">Alterar dados do meu perfil</a>
						<?php 
						elseif( is_user_logged_in() ):
							echo PKPerfil::follow_button( $usuario );
						endif; 
						?>
					</div>
				</div>
				<div class="abstract">
					<p class="activities"><?php echo Piki::plural( $total_historias, 'historia', 'historias' ); ?>&nbsp;&nbsp;|&nbsp;&nbsp;<?php echo Piki::plural( $total_comentarios, 'comentário', 'comentários' ); ?></p>
					<div class="relations">
						<p class="following">Seguindo:
							<?php if( $usuario->total_following == 0 ): ?>
							0
							<?php else: ?>
							<span class="total"><?php echo sprintf( _n( '1 pessoa', '%s pessoas', $usuario->total_following, 'twentythirteen' ), $usuario->total_following ); ?>
							<?php endif; ?>
						</p>
						<p class="followers">Seguidores:
							<?php if( $usuario->total_followers == 0 ): ?>
							0
							<?php else: ?>
							<span class="total"><?php echo sprintf( _n( '1 pessoa', '%s pessoas', $usuario->total_followers, 'twentythirteen' ), $usuario->total_followers ); ?></span>
							<?php endif; ?>
						</p>
					</div>
				</div>
			</div>


			<div class="box-tabs clearfix">


				<div class="navigation clearfix">
					<a href="<?php echo get_bloginfo( 'url' ); ?>/perfil/<?php echo $usuario->data->user_nicename; ?>" class="<?php echo( PKPerfil::is_active_tab( '' ) ? 'active' : '' ); ?>">Atividades</a>
					<?php if( $usuario->current ): ?>
					<a href="<?php echo get_bloginfo( 'url' ); ?>/perfil/<?php echo $usuario->data->user_nicename; ?>/minhas-atividades" class="<?php echo( PKPerfil::is_active_tab( 'minhas-atividades' ) ? 'active' : '' ); ?>">MINHAS ATIVIDADES</a>
					<?php endif; ?>
					<?php if( $usuario->current || ( $usuario->perfil->show_areas_interesse && $usuario->perfil->assuntos_de_interesse ) ): ?>
					<a href="<?php echo get_bloginfo( 'url' ); ?>/perfil/<?php echo $usuario->data->user_nicename; ?>/assuntos-de-interesse" class="<?php echo( PKPerfil::is_active_tab( 'assuntos-de-interesse' ) ? 'active' : '' ); ?>">ASSUNTOS DE INTERESSE</a>
					<?php endif; ?>
				</div>

				<div class="tabs-items">

					<?php if( PKPerfil::is_active_tab( 'assuntos-de-interesse' ) ): ?>
						
						<?php if( $usuario->current || $usuario->perfil->show_areas_interesse ): ?>

						<div class="item-tab assuntos-de-interesse">
							<?php if( $usuario->current ): ?>
							<?php echo do_shortcode( '[pikiforms fid="193"]' ) ?>
							<?php else: ?>
							<ul class="list-assuntos clearfix">

								<?php /*echo('<pre>');
								var_dump( $usuario->perfil->assuntos_de_interesse );
								exit;*/ ?>

								<li class="item"><?php echo implode( '</li><li class="item">', $usuario->perfil->assuntos_de_interesse ); ?></li>
							</ul>
							<?php endif; ?>
						</div>

						<?php endif; ?>

					<?php else: ?>

						<div class="item-tab list-activities">

							<?php
							$type_list = '';
							if( !$usuario->current ):
								$type_list = 'visitor';
							elseif( PKPerfil::is_active_tab( 'minhas-atividades' ) ):
								$type_list = 'owers';
							else:
								$type_list = 'friends';
							endif;
							$activities = Activities::get_activities( $usuario, $type_list );
							if( !empty($activities) ):
								foreach ( $activities as $key => $activty ):
									Activities::call_template_part( $activty );
								endforeach;
							else:
								switch( $type_list ):
									case 'friends':
										echo '<h2>Não há atividades registradas.</h2>';
									break;
									case 'owers':
										echo '<h2>Não há atividades registradas.</h2>';
									break;
									case 'visitor':
										echo '<h2>'. $usuario->user_login .' não possui atividades registradas.</h2>';
									break;
								endswitch;
							endif;
							?>

						</div>

					<?php endif; ?>

				</div>

			</div>
		
		</div><!-- #content -->
	</div><!-- #primary -->

</div><!-- #main-content -->

<?php get_footer(); ?>