<<?php echo( is_admin() ? 'div' : 'form' ); ?> action="<?php echo get_site_url(); ?>" class="search-box">
	<div>
        <button type="button" class="search" data-action="open-search">
        	<i></i>
        	<strong><?php __( 'Buscar', 'amazonia' ); ?></strong>
        </button>
        <input type="text" name="s" value="<?php echo _get('s'); ?>" placeholder="Buscar por">
        <input type="submit" style="display:none;">
        <button class="close" data-action="close-search" title="Fechar busca"><?php __( 'Fechar busca', 'amazonia' ); ?></button>
	</div>
</<?php echo( is_admin() ? 'div' : 'form' ); ?>>