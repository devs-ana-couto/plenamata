<?php
// Slug
$slug = _array_get( $args, 'page_slug' ); 
// TItle
$title = _array_get( $args, 'titulo' ); 
// File URL
$file_url = _array_get( $args, 'file_url' );
// Accept label
$accept_label = _array_get( $args, 'accept_label' );
// Reject label
$reject_label = _array_get( $args, 'reject_label' ); ?>
<div id="pklgpd-box" class="floating bottom">

    <div class="wcf">
        
        <div><?php
            
            // Título
            if( $title ): ?>
            <em class="title"><?php echo $title; ?></em><?php 
            endif;
            
            // Texto ?>
            <p><?php echo text::breaklines( _array_get( $args, 'texto' ) ); ?></p>
            
        </div>

        <nav>

            <button data-action="accept-cookies" title="<?php echo $accept_label; ?>" data-action="accept"><?php echo $accept_label; ?></button><?php 

            // Reject button
            if( $reject_label ): ?>
            <button data-action="accept-cookies" title="<?php echo $reject_label; ?>" data-action="reject"><?php echo $reject_label; ?></button><?php 
            endif;

            // Link to privacy politics
            if( $slug ): ?>
            <a href="<?php echo get_site_url( NULL, '/' . trim( $slug, '/' ) ); ?>/" title="<?php echo( _array_get( $args, 'label_link' ) ); ?>"><?php echo( _array_get( $args, 'label_link' ) ); ?></a><?php 
            endif; ?>
            
        </nav>
                
    </div>

    <button type="button" class="close" data-action="close" title="Fechar"></button>

</div><?php