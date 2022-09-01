<?php
// Arguments
extract( $args ); ?>
<div class="teaser search pager-item <?php echo( $data->thumb ? 'with-thumb' : '' ); ?>"><?php 

	if( $data->thumb ): ?>
	<div class="left">
		<a href="<?php echo $data->url; ?>" class="media-wrapper" title="<?php echo strip_tags( $data->title ); ?>" <?php echo $data->target; ?>>
			<?php echo $data->thumb; ?>" alt="<?php echo $meta[ 'title' ]; ?>
		</a>
	</div><?php
	endif; ?>

	<div class="content">

		<span> 

			<span class="top"><?php 
				// Editoria
				if( $data->editoria ):
					echo plenamata_single_category( $data->meta, true, _array_get( $args, 'editoria' ) );
				endif; ?>
				<em class="date"><?php echo $data->date; ?></em>
			</span>
			
			<a href="<?php echo $data->url; ?>" title="<?php echo strip_tags( $data->title ); ?>" <?php echo $data->target; ?>>
				<h3 class="title"><?php echo $data->title; ?></h3><?php 
				if( $data->excerpt ): ?>
				<em class="excerpt"><?php echo $data->excerpt; ?></em><?php 
				endif; ?>
			</a>

		</span>
		
		<div class="author authors-list"><?php echo $data->author; ?></div>
		
	</div>

</div>