<?php 
// Args
extract($args);

$categories = get_the_category();
$category = $categories[0];
$subcategories = [];

foreach( $categories as $cat ):
    if( $cat->parent === 0 ):
        $category = $cat;
    else:
        $subcategories[] = $cat;
    endif;
endforeach;

$primary_category = get_post_meta( get_the_ID(), '_yoast_wpseo_primary_category', true );
$primary_category = empty( $primary_category ) ? null : get_category( $primary_category );

$subcategory = $subcategories[0];
if( !empty( $primary_category ) && $category->cat_ID !== $primary_category->cat_ID ):
    $subcategory = $primary_category;
endif;

$is_opinion = ( $category->slug == "_newspack_opinion" || $category->slug == 'opiniao' || $category->slug == 'opinion' ) ? true : false;
$is_initiative = ( $category->slug === 'boas-iniciativas' || $category->slug === 'good-initiatives' ) ? true : false;

// Header
if ($is_initiative): ?>

    <div class="initiative-header">
        <div>
            <div class="initiative-header__category">
                <a href="<?= get_category_link(get_category_by_slug('good-initiatives')) ?>">
                    <?= __('Good Initiatives', 'plenamata') ?>
                </a>
                <?php if (!empty($subcategory)): ?>
                    <span>/</span>
                    <a href="<?= get_category_link($subcategory->cat_ID) ?>">
                        <?= $subcategory->name ?>
                    </a>
                <?php endif; ?>
            </div>
            <h1 class="initiative-header__title"><?= wp_kses_post(get_the_title()) ?></h1>
        </div>
        <div class="initiative-header__thumbnail credited-image-block">
            <div class="image-wrapper">
                <?php the_post_thumbnail() ?>
                <?php if ((class_exists('Newspack_Image_Credits') && !empty(Newspack_Image_Credits::get_media_credit(get_post_thumbnail_id())['credit'])) || !empty(get_post(get_post_thumbnail_id())->post_content)): ?>
                    <div class="image-info-wrapper">
                        <div class="image-meta">
                            <?php if (class_exists('Newspack_Image_Credits')): ?>
                                <p class="description"><?= get_the_post_thumbnail_caption() ?></p>
                                <?php $image_meta = Newspack_Image_Credits::get_media_credit(get_post_thumbnail_id()); ?>
                                <?php if (isset($image_meta['credit_url']) && !empty($image_meta['credit_url'])): ?>
                                    <a href="<?= $image_meta['credit_url'] ?>">
                                <?php endif; ?>
                                <span class="credit">
                                    <?= $image_meta['credit'] ?>
                                    <?php if (isset($image_meta['organization']) && !empty($image_meta['organization'])): ?>
                                        / <?= $image_meta['organization'] ?>
                                    <?php endif; ?>
                                </span>
                                <?php if (isset($image_meta['credit_url']) && !empty($image_meta['credit_url'])): ?>
                                    </a>
                                <?php endif; ?>
                            <?php endif; ?>
                        </div>
                        <span class="image-description-toggle">
                            <i class="fas fa-camera"></i>
                            <i class="fas fa-times"></i>
                        </span>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div><?php 

else: ?>

    <div class="opinion-header"><?php 
        if( $is_opinion): ?>
        <div class="breadcrumb">
            <a href="<?= site_url(); ?>">Home</a> /
            <a href="<?= get_post_type_archive_link('post'); ?>"><?=  __('News', 'plenamata') ?></a> /
            <a href="<?= get_category_link($category->cat_ID); ?>"><?= $category->name ?></a> /
        </div><?php 
        endif; ?>
        <div class="container">
            <h1 class="entry-title">
                <?php echo wp_kses_post(get_the_title()); ?>
            </h1>
        </div>
    </div><?php

endif; ?>

<section id="primary" class="content-area">
	<main id="main" class="site-main">
		<div class="main-content"><?php
			get_template_part( 'contents/single' ); ?>
		</div>
	</main>
</section><?php 

// Relateds
//echo do_shortcode( '[relateds taxonomy="category" total="4" template="components/relateds"]' ); ?>

<?php
// New version
 /*<section class="single--noticia <?php echo( $editoria ? $editoria->slug : '' ); echo( $cover ? ' with-cover' : ' no-cover' );  ?>">

	<article>

		<header class="destaque-single">

			<div class="inner">

				<div>

					<div class="title-editoria">
						<h1><?php echo $title; ?></h1><?php
						echo plenamata_editoria_link( $editoria ); ?>
					</div>

					<div class="foot">
							
						<div class="author-date">
							<i></i>
							<span>
								<em class="author">por <?php the_author( $meta->ID ); ?></em>
								<p><?php echo $date; ?></p><?php 
								if( $updated ): ?>
								<p>(<?php _e( 'Atualizado em', 'amazonia' ); ?> <?php echo $updated; ?>)</p><?php 
								endif; ?>
							</span>
						</div><?php 

						echo do_shortcode( '[pikishare services="twitter,linkedin,facebook,whatsapp" widget_title="Compartilhe nas redes" style="2"]' ) ?>

					</div>
					
				</div><?php

				// Cover
				if( $cover ): ?>
				<span class="media-wrapper"><?php 
					// Image
					echo $cover; ?>
				</span><?php 
				endif; ?>
					
			</div>

		</header>

		<div class="content center"><?php
			// Text content
			echo $meta->render( 'body', [ 'apply_filter' => true ] ); ?>
		</div>

	</article>

</section>*/