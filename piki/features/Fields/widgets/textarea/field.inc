<?php
class textarea extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Texto com várias linhas' );
	}

	public static function admin_enqueue_scripts(){
		if( is_admin() ):
			wp_enqueue_editor();
		endif;
	}

	// Configurações específicas do campo
	public static function set_confs( $field ){
		$field[ 'sqlrpc' ] = self::getReplacement();
		return $field;
	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// Constroi o campo
	public static function get_field( $field ){

		// Valor do campo
		if( is_array( $field[ 'value' ] ) ):
			$field[ 'value' ] = array_shift( $field[ 'value' ] );
		endif;

		// Remove slashes from serial
		if( !empty( $field[ 'value' ] ) ):
			$field[ 'value' ] = str_replace( '\\', '', $field[ 'value' ] );
			$field[ 'value' ] = stripslashes( $field[ 'value' ] );
		endif;

		// Contador
		if( on( $field, 'show_counter' ) ):

			// Field attributes
			$attributes = [
				'data-show-counter' => 'true',
				'class' => [ 'with-counter' ],
			];
			if( isset( $field[ 'counter_format' ] ) ):
				$attributes[ 'data-counter-format' ] = '#input de #max caracteres';
			endif;
			parent::add_attributes( $field, $attributes );

			// Library
			Piki::add_library( 'counter' );

		endif;

		// HTML Field
		$html_field = '<textarea name="'. $field[ 'name_html' ] .'" id="'. $field[ 'id' ] .'"';
			parent::set_attributes( $html_field, $field );
			$html_field .= '>';
			parent::set_value( $html_field, $field );
			$html_field .= '</textarea>';

		// Campo com editor de HTML
		if( on( $field, 'html_editor' ) ):

			// Classe do campo com editor
			parent::add_attributes( $field, array(
				'class' => array( 'with-html-editor' ),
				'data-html-editor' => 'true'
			));
			
			textarea::add_files();

			return '<div class="ftype-textarea-editor-wrapper">' . $html_field . '</div>';

		// Campo normal
		else:
			
			return $html_field;
		
		endif;

	}

	public static function add_files(){
		Piki::add_library( 'modal' );	    
	    wp_enqueue_script( 'ftype-textarea-scripts', Piki::url( 'scripts.js', __FILE__ ), array( 'jquery' ) );
	}

	// Salva o valor no banco
	public static function save_meta( $field, $ID, $value ){
		// Encode do valor, se houver editor HTML
		if( on( $field, 'html_editor' ) ):
			$value = htmlspecialchars( $value );
		endif;
		// Adiciona o valor no banco
		call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], $value );
	}

	public static function renderize_values( $field, $options = array() ){

		$value = $field[ 'value' ];
		if( empty( $value ) ):
			return '';
		endif;
		
		// HTML editor
		if( on( $field, 'html_editor' ) ):
			$value = htmlspecialchars_decode( $value );
		endif;

		// Apenas texto
		if( on( $options, 'strip_tags' ) ):
			
			// Removendo tag
			$value = strip_tags( $value );
			
			// Cortando o texto
			if( isset( $options[ 'trim' ] ) ):
				
				$value = Piki::trim( $value, 20 );

			endif;

		// Aplicando os filtros de Body
		elseif( on( $options, 'apply_filter' ) ):
			
			$value = apply_filters( 'the_content', $value );
		
		endif;

		// Others text options
		$value = text::apply_options( $value, $options );

		// Separate by new line
		if( isset( $options[ 'make_array' ] ) ):
			return preg_split("/\r\n|\n|\r/", trim( $value ) );
		endif;

		// Separate by new line
		if( isset( $options[ 'make_list' ] ) ):

			$byline = preg_split("/\r\n|\n|\r/", trim( $value ) );

			$ul = '<ul>';
			foreach( $byline as $line ):
				$ul .= '<li>'. trim( $line, ',.!?' ) .'</li>';
			endforeach;
			$ul .= '</ul>';
			
			return $ul;

		endif;
		
		// Fixing autop
		return Piki::fix_autop( $value );
	
	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields(array( 'maxlength' ));
		$fields[ 'html_editor' ] = array(
			'ftype' => 'boolean',
			'label' => 'Usar editor de HTML',
			'hide_label' => true,
			'description' => 'Marcando esta opção, o usuário poderá inserir códigos HTML no campo.',
		);
		$fields[ 'lines_number' ] = array(
			'ftype' => 'number',
			'label' => 'Número de linhas',
		);
		$fields[ 'show_counter' ] = array(
			'ftype' => 'boolean',
			'label' => 'Mostrar contador',
			'hide_label' => true,
			'description' => 'Marcando esta opção, o campo terá um widget que mostra quantos caracteres ainda podem ser inseridos.',
		);
		$fields = PikiFields::add_comum_field( $fields, 'required' );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

	// Tinymce
	public static function tinymce(){
	    $screen = get_current_screen();
	    if ( $screen->base !== 'post' ) return;
	    add_filter( 'mce_external_plugins', [ 'textarea', 'tinymcePlugin' ] );
	    add_filter( 'mce_buttons', [ 'textarea', 'tinymceButtons' ] );
	}
	public static function tinymcePlugin( $plugin_array ){
	    $plugin_array[ 'piki_tinymce' ] = Piki::url( 'tinymce.js', __FILE__ );
	    return $plugin_array;
	}
	public static function tinymceButtons( $buttons ) {
	    $buttons[] = 'mark';
	    $buttons[] = 'cite';
	    return $buttons;
	}
	public static function formatTinyMCE( $in ){
		$in[ 'keep_styles' ] = false;
		$in[ 'paste_as_text' ] = true;
		$in[ 'paste_remove_styles' ] = true;
		$in[ 'paste_remove_spans' ] = true;
		$in[ 'paste_text_use_dialog' ] = true;
		$in[ 'wpautop' ] = true;
	   	$in[ 'block_formats' ] = "Texto=p;Título 3=h3;Título 4=h4;Título 5=h5;Título 6=h6;";
		$in[ 'toolbar1' ] = 'formatselect,bold,italic,underline,mark,cite,bullist,numlist,blockquote,link,unlink,hr,removeformat,undo,redo';
		$in[ 'toolbar2' ] = '';
		return $in;
	}

}
