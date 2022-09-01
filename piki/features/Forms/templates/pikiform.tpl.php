<?php 
global $pikiform; 
$post_type_object = get_post_type_object( $pikiform[ 'post_type' ] );
?>
<div id="pikiform-postfield-modal" title="<?php echo $post_type_object->labels->singular_name; ?>"><?php echo $pikiform[ 'html' ]; ?></div>
