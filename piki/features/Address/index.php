<?php  
class FieldAddress {
	
	function __construct(){
		add_filter( 'pikifields_list', array( $this, 'add_field' ) );
		add_filter( 'pikifields_autoload', array( $this, 'autoload' ), 10, 2 );
	}

	public function add_field( $fields ){
		$fields[] = 'address';
		return $fields;
	}

	public function autoload( $path, $classname ){
		if( $classname != 'address' ) return $path;
		$path = Piki::path( __FILE__, 'field.inc' );
		return $path;
	}

}
new FieldAddress();
?>
