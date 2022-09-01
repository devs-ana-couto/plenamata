<?php
class form {

	var $options = [];
	var $admin = false;
	var $natives = [];

	public function __construct( $options ){

		$this->options = $options;

		// Admin forms
		$this->isAdmin();

		// Mensagem de erro
		if( $this->option( 'error_messages' ) ):
			$this->set_option( 'error_messages', maybe_unserialize( $this->option( 'error_messages' ) ) );
		endif;

		// Parent post
		$this->set_option( 'post_parent', intVal( $this->option( 'post_parent' ) ) );

		// Data type and data table
		if( !$this->option( 'data_type' ) ):
			$this->set_option( 'data_type', 'post' );
		endif;

		// Analisys if has form data
		$this->analiseData();

	}

	public function isAdmin(){

		if( $this->option( 'admin' ) ):

			$this->set_option( 'admin', true );

			// Natives fields

				// Title
				$title = PikiFields::extract_field( 
					$this->options[ 'fields' ], 
					'title', 
					'ftype'
				);
				if( $title ):
					$this->natives[ 'title' ] = $title;
					$this->natives[ 'title' ][ 'required' ] = true;
		        	PikiFields::remove_fields( $this->options[ 'fields' ], 'title' );
		        else:
		        	$this->natives[ 'title' ] = [
		        		'machine_name' => 'title',
		        		'ftype' => 'title',
		        		'required' => true,
		        	];
				endif;

				// Body
				$body = PikiFields::extract_field(
					$this->options[ 'fields' ], 
					'body', 
					'ftype'
				);
				if( $body ):
					$this->natives[ 'body' ] = $body;
		        	PikiFields::remove_fields( $this->options[ 'fields' ], 'body' );
				endif;

				// Excerpt
				$excerpt = PikiFields::extract_field( 
					$this->options[ 'fields' ], 
					'excerpt', 
					'ftype'
				);
				if( $excerpt ):
					$this->natives[ 'excerpt' ] = $excerpt;
		        	PikiFields::remove_fields( $this->options[ 'fields' ], 'excerpt' );
				endif;
						
				// Taxonomies
				$taxes = PikiFields::extractFields( 
					$this->options[ 'fields' ], 
					'taxonomy', 
					'ftype'
				);
				if( !empty( $taxes ) ):

					foreach( $taxes as $tax ):

						$taxkey = $tax[ 'taxonomy' ];

						if( $taxkey == 'category' || $taxkey == 'post_tag' ):
							$this->natives[ $taxkey ] = $tax;
							PikiFields::remove_fields( $this->options[ 'fields' ], $tax[ 'machine_name' ], 'machine_name' );
						endif;
						
					endforeach;

				endif;
		
		endif;

	}

	// Set option
	public function set_option( $key, $value ){
		$this->options[ $key ] = $value;
	}

	// Get option
	public function option( $key, $default = false ){
		return _array_get( $this->options, $key, $default );
	}

	// Analising past data
	private function analiseData(){
		
		// Data
		$item = $this->option( 'item' );
		$data = $this->option( 'data' );

		// If Item is in data value
		if( !$item && ( is_object( $data ) || is_numeric( $data ) ) ):
			$item = $data;
			$data = false;
		endif;
		
		if( !empty( $item ) ):
			$this->set_item( $item );
		endif;
		
		// Item to edit
		$this->set_option( 'item', $item );

		// Data dos campos
		if( $data && $this->option( 'isSettingsForm' ) ):
		
			// Change action
			$this->set_option( 'action', 'edit' );
		
			// Join data wity fields
			$merged_fields = PikiFields::mergeWithData( $this->option( 'fields' ), $data );
			$this->set_option( 'fields', $merged_fields );
		
		endif;

	}

	public function set_item( $item ){

		// Se é passado o ID de um ítem
		if( is_numeric( $item ) ):
			
			// Busca o conteúdo de acordo com o tipo de ítem
			switch ( $this->option( 'data_type' ) ):
				
				// Custom
				case 'custom':
					$this->item = get_custom( $item, $this->option( 'data_table' ) );
				break;
				
				// Usuário
				case 'user':
					$this->item = get_user_by( 'id', $item );
				break;
				
				// Post
				default:
					$this->item = get_post( $item );
				break;
			
			endswitch;
		
		// Se não é um ID
		else:
			$this->item = (object)$item;
		endif;

	}

	// Constroi um formulario
	public function get_rendered_form( $admin = false ){
		
		// Formulário
		$form = $this->get_form( $admin );
		
		// Campos do formulário
		$form[ 'fields' ] = empty( $form[ 'fields' ] ) ? '' : $this->renderizeFields( $form );
		
		return $form;
	
	}

	// Constroi um formulario
	public function get_form(){
        
        $item_id = '';

		// Se temos um post para o form
		if( $this->option( 'item' ) ):
        	
        	// Define a ação de edição
            $this->set_option( 'action', 'edit' );

            // Remove just insert fields
           	PikiFields::remove_fields( $this->options[ 'fields' ], 'termsuse' );

            // Recupera os meta dados do post
            $db_data = PKMeta::db_data( 
            	$this->option( 'item' ), 
            	$this->option( 'fields' ), 
            	$this->option( 'data_type' ), 
            	$this->option( 'data_table' ) 
            );
            $db_data->meta = apply_filters( 
            	'pikiform_post_meta', 
            	$db_data->meta, 
            	$this->options 
            );
            $this->set_option( 'item', $db_data );
            
            // Se existir meta dados para este post
            if( $db_data->meta ):
            	
            	// Faz o merge dos valores com os campos
            	$merged_fields = PikiFields::mergeWithData( $this->option( 'fields' ), $db_data->meta );
	            $this->set_option( 'fields', $merged_fields );
			
			endif;
	        
	        // ID do post
	        $item_id = $db_data->ID;
        
        endif;
        
        // Configurações do formulário
		$form = [ 
			'form_key' => $this->option( 'key' ),
			'fields' => false,
			'title' => $this->option( 'title' ),
			'description' => $this->option( 'description' ),
		];

	 	// Título
	 	$form[ 'title' ] = !empty( $form[ 'title' ] )
	 		? '<div class="form-title">' . $form[ 'title' ] . '</div>'
	 		: false
	 	;
	 	// Descrição
	 	$form[ 'description' ] = !empty( $form[ 'description' ] )
	 		? '<div class="form-description">' . $form[ 'description' ] . '</div>'
	 		: false
	 	;

		// Post status
		$status = $this->option( 'item' ) ? _object_get( $this->option( 'item' ), 'post_status' ) : false;

		// Fields and Steps
		if( $this->option( 'fields' ) ):
        
	        // Permite mudanças nos campos
	        $filtereds_fields = apply_filters( 
	        	'pikiform_change_fields', 
	        	$this->option( 'fields' ), 
	        	$this->option( 'key' ) 
	        );
	        if( !empty( $filtereds_fields ) ):
	        	$this->set_option( 'fields', $filtereds_fields );
	        endif;
			
			// Campos do formulário
			$form[ 'fields' ] = $this->option( 'fields' );

			// Groups
			$form[ 'groups' ] = $this->option( 'groups' );

			// Steppeds forms
			if( $this->option( 'stepped' ) ):

				// Organize fields by step
				$this->set_option( 'steps', $this->getFieldsSteps() );
				$form[ 'steps' ] = $this->option( 'steps' );
		
				// Step field
				$steps_keys = array_keys( $form[ 'steps' ] );
				$step_field = '<input type="hidden" name="form_step" class="form-step" value="'. reset( $steps_keys ) .'">';
			
			endif;
		
		else:

			$step_field = '';

		endif;

		// Header do formulário
		$form[ 'header' ] = '<form ' . $this->getFormAttributes() . '>';

		// Add buttongs
		$add_buttons = '';
		if( on( $this->options, 'preview' ) ):
			$add_buttons = '
				<input type="button" id="form_alter" name="form_alter" class="form-alter-button button button-large" value="Editar" style="display:none;">
			';
		endif;

		// Label do botão submit
		$submit_button_label = ( $this->option( 'action' ) == 'insert' || $status == 'draft' ) ? $this->option( 'submit_button_label', 'Enviar' ) : $this->option( 'edit_button_label', 'Editar' );

		// ID da origem do formulário
		global $post;
		$origin_id = empty( $post ) ? '' : $post->ID;

		// Pid field
		$form_pid = $this->option( 'pid' ) ? '<input type="hidden" name="form_id" id="form_id" class="form-id" value="' . $this->option( 'pid' ) . '">' : '';

		// Form token
		$token = '';
		if( $this->option( 'token' ) ):
			$token = '<input type="hidden" value="'. $this->option( 'token' ) .'" name="' . $this->option( 'key' ) . '[token]" id="' . $this->option( 'key' ) . '_token" autocomplete="off">';
		endif;

		// Recaptcha
		if( $this->option( 'recaptcha_key' ) ):
			$recaptcha = '<div id="'. $this->option( 'key' ) .'-recaptcha" data-recaptcha-key="'. $this->option( 'recaptcha_key' ) .'"></div><input type="hidden" name="'. $this->option( 'key' ) . '[recaptcha]' . '" id="recaptcha" value="" autocomplete="off">';
		endif;

		// Save draft button
		$save_draft_button = '';
		$save_draft_field = '';
		if( $this->option( 'can_save_draft' ) && ( $this->option( 'action' ) == 'insert' || $status == 'draft' ) ):
			$save_draft_button = '<button type="button" name="form_submit_draft" value="save-draft" data-action="save-draft" class="save-draft-button">'. $this->option( 'save_draft_button_label' ) .'</button>';
			$save_draft_field = '<input type="hidden" name="save_draft" value="">';
		endif;

		// Next label for steps
		$next_label = $this->option( 'next_button_label' );

		// Footer do formulário
		$form[ 'footer' ] = '
			<div class="footer-form">
				<button type="button" name="form_submit" id="form_submit" value="'. $submit_button_label .'" title="'. $submit_button_label .'" class="form-save-button button button-primary button-large" rel="'. ( $this->option( 'action' ) == 'insert' ? 'insert' : 'edit' ) .'"'. ( $next_label ? 'data-next-label="'. $next_label .'"' : '' ) .'>'. $submit_button_label .'</button>
				'. $save_draft_button .'
				'. $add_buttons .'
				'. $step_field . '
				'. $form_pid .'
				'. $save_draft_field .'
				<input type="hidden" name="form_key" id="form_key" class="form-key" value="' . $this->option( 'key' ) . '">
				<input type="hidden" name="form_action" id="form-action" class="form-action" value="' . $this->option( 'action' ) . '">
				<input type="hidden" name="item_id" id="item_id" class="item-id" value="'. $item_id .'">
				<input type="hidden" name="item_parent" id="item_parent" class="post-parent" value="'. $this->option( 'post_parent' ) .'">
				<input type="hidden" name="form_style" value="'. $this->option( 'form_style', 'default' ) . '">
				<input type="hidden" name="'. $this->option( 'key' ) .'[origin_id]" id="'. $this->option( 'key' ) .'_origin_id" class="origin-id" value="'. $origin_id .'">
				<input type="hidden" name="form_state" value="'.  $this->option( 'form_state', 'default' ) .'">
				'. $token .'
				'. $recaptcha . '
			</div>
		</form>
		';
		
		return $form;
	}

	private function getFormAttributes(){

		// Form action
		$action_url = get_bloginfo( 'url' );
		if( get_option( 'permalink_structure' ) == '' ):
			$action_url .= '/index.php?piki-forms=true&form=' . $this->option( 'key' );
		else:
			$action_url .= '/piki-forms/' . $this->option( 'key' ) . '/';
		endif;
	 	
	 	// Error messages
	 	$attr_error_messages = '';
	 	$error_messages = $this->option( 'error_messages' );
	 	if( $error_messages ):
	 		
	 		foreach ( $error_messages as $key_em => $em ):
	 			
	 			$attr_error_messages .= 'data-message-' . $key_em . '="true" ';

	 			// Settings
	 			if( is_array( $em ) ):
	 				foreach( $em as $_kem => $_em ):
	 					$attr_error_messages .= 'data-message-' . $key_em . '-' . $_kem . '="' . $_em . '" ';
	 				endforeach;
	 			endif;
	 		
	 		endforeach;
	 	
	 	endif;

	 	// Classes
	 	$classes = [
	 		'PikiForm',
	 		'form-' . $this->option( 'key' ),
	 		$this->option( 'classname', '' ),
	 		$this->option( 'action' )
	 	];
	 	if( $this->option( 'isSettingsForm' ) ) $classes[] = ' settings-form';
	 	if( PikiForms::isMaterialize( $this->options ) ) $classes[] = ' materialize';

	 	// Mensagem padrão de erro
	 	$error_message = $this->option( 'error_message', 'Preencha corretamento os campos marcados' );

	 	// Bases
		$return = 'id="'. $this->option( 'key' ) .'" action="' . $action_url . '" method="post" enctype="multipart/form-data" autocomplete="off" data-piki-form="true" rel="' . $this->option( 'key' ) . '" class="'. implode( ' ', $classes ) .'"';

		// Form steps
		if( $this->option( 'stepped' ) ):
			$return .= ' data-stepped="true" total-steps="'. count( $this->option( 'steps' ) ) .'" --steps="'. count( $this->option( 'steps' ) ) .'"';
		endif;

		// Preview
		if( on( $this->options, 'preview' ) ):
			$return .= '--preview="on"';
		endif;

		// Form key
        if( $this->option( 'key' ) ):
            $return .= ' data-form-key="'. $this->option( 'key' ) .'"';
        endif;

        // Post type form
        if( $this->option( 'post_type' ) ):
            $return .= ' data-post-type="'. $this->option( 'post_type' ) .'"';
        endif;

        // Report fields errros
		$return .= " data-errors-fields='" . $this->option( 'error_fields', 'false' ) . "'";
		$return .= " data-errors-fields-location='" . $this->option( 'error_fields_location', 'false' ) . "'";
		
		// Report general errors
		$return .= " data-errors-general='" . $this->option( 'error_general', 'false' ) . "'";
		$return .= " data-errors-general-target='" . $this->option( 'error_general_target', 'false' ) . "'";
		$return .= " data-errors-general-message='" . $this->option( 'error_general_message', 'false' ) . "'";

		// Success
		if( $this->option( 'action' ) == 'insert' ):
			$return .= " data-success-type='" . $this->option( 'success_type', 'false' ) . "'";
			$return .= " data-success-message='" . $this->option( 'success_message', 'false' ) . "'";
			$return .= ' data-success-target="' . $this->option( 'success_target', 'false' ) . '"';
		else:
			$return .= " data-success-type='" . $this->option( 'edit_success_type', 'false' ) . "'";
			$return .= " data-success-message='" . $this->option( 'edit_success_message', 'false' ) . "'";
			$return .= ' data-success-target="' . $this->option( 'edit_success_target', 'false' ) . '"';
		endif;

		// Target
		$redirect = $this->option( 'success_redirect', 'false' );
		if( !empty( $redirect ) ):
			$return .= " data-success-redirect='" . $redirect . "'";
		endif;

		$return .= " data-success-tohide='" . $this->option( 'success_tohide', 'false' ) . "'";
		
		return $return;

	}

	public static function get_html_field( $field, $settings ){
		
		// Se o tipo de campo não tem uma classe
		if ( !class_exists( $field[ 'ftype' ] ) ):
			echo 'O Campo do tipo ' . $field[ 'ftype' ] . ' não existe. ';
		endif;
		
		// Ítems que não vão para o formuláro
		if( on( $field, 'noform' ) ):
			return false;
		endif;
		
		// Se tiver apenas um valor, tranformamos em um array
		if( !isset( $field[ 'value' ] ) ):
			$values = array( false );
			$field[ 'value' ] = $values;
		elseif( !is_array( $field[ 'value' ] ) ):
			$values = array( $field[ 'value' ] );
		else:
			$values = $field[ 'value' ];
		endif;
		
		// Se for um fieldset
		if( $field[ 'ftype' ] == 'fieldset' ):
			$itens_return[] = call_user_func( array( $field[ 'ftype' ], 'get_field' ), $field, $settings );
			return $itens_return;
		endif;
		
		// Faz o loop dos ítems do fieldset se o mesmo for multiplo
		$itens_return = array();
		
		// Se não é um fieldset, atribuimos uma chave para o campo único
		if( !isset( $field[ 'field_index' ] ) ):
			$field[ 'field_index' ] = 0;
		endif;
		
		// Faz o loop nos ítems do campo se o mesmo for múltiplo
		if( PikiField::is_multiple( $field ) ):
			
			// Máximo de ítems de um mesmo campo
			$max_items = PikiField::max_items( $field );
			
			// Mínimo de ítems
			$min_items = PikiField::min_items( $field );
			
			// Abertos
			$open_items = PikiField::init_items( $field );
			
			// Mínimo de ítens já abertos
			$toshow = $min_items < 1 ? 1 : $min_items;
			
			// Se o numero de ítens abertos ultrapassa o máximo de ítens
			if( $max_items > 0 && $toshow > $max_items ):
				$toshow = $max_items;
			endif;
			
			// Se o número de ítens abertos é menor do que o especificado, e este número é menor ou igual o máximo
			if( $open_items > $toshow && $open_items <= $max_items ):
				$toshow = $open_items;
			endif;
			$fields_items = '';
			for ( $ff = 0;  $ff < $toshow; $ff++ ):
				$field[ 'item_index' ] = $ff;
				$field[ 'id' ] = PikiField::get_field_id( $field );
				$field[ 'name_html' ] = PikiField::get_field_name( $field );
				$fields_items .= call_user_func( array( $field[ 'ftype' ], 'get_field' ), $field, $settings );
			endfor;
			$itens_return[] = $fields_items;
		
		// Campo único
		else:
			
			$field[ 'id' ] = PikiField::get_field_id( $field );
			$field[ 'name_html' ] = PikiField::get_field_name( $field );
			$itens_return[] = call_user_func( array( $field[ 'ftype' ], 'get_field' ), $field, $settings );
		
		endif;
		
		return $itens_return;
	
	}

	// Render fields
	private function renderizeFields( $form, $is_group = false ){

		// Returning
		$return = '';

		// Get steps
		$steps = _array_get( $form, 'steps' );

		// Passos do formulário
		if( $steps ):
			
			$steps = '';
			$nav = '';
			$step_index = 1;
			
			foreach ( $form[ 'steps' ] as $key => $step ):

				$nav .= '<a href="#'. $key .'" class="'. $key .'" rel="'. $key .'">';
				$nav .= '	<span class="ico-status">'. $step_index .'</span> ';
				$nav .= '	<span class="txt-status">'. $step[ 'label' ] .'</span> ';
				$nav .= '</a>';

				$step_form = $form;
				$step_form[ 'steps' ] = false;
				$step_form[ 'stepped' ] = false;
				$step_form[ 'fields' ] = $step[ 'fields' ];
				$step_form[ 'form_step' ] = $key;
				
				$steps .= $this->renderizeFields( $step_form );
				
				$step_index++;
			
			endforeach;
			
			$return = '
			<div class="form-fields">
				<div id="form-navigation" class="form-navigation">
					<div class="tabs">' .
						$nav .
					'</div>
				</div>' .
				$steps .
			'</div>';

		else:
			
			// Regiões do formulário
			$regions = array( 'default' => array() );

			// Groups
			$groups = _array_get( $form, 'groups' );
			if( $groups ):
				$form[ 'fields' ] = $this->joinByGroups();
			endif;
			
			foreach( $form[ 'fields' ] as $key => $field ):		

				// Região do campo
				$region = form::get_field_region( $regions, $field );

				if( $field[ 'ftype' ] == 'group' ):

					$group_form = $form;
					$group_form[ 'groups' ] = false;
					$group_form[ 'fields' ] = $field[ 'fields' ];

					$label = _array_get( $field, 'label' );
					
					$field_print = '
					<div class="group-fields '. $field[ 'machine_name' ] .'">' . 
						( $label ? '<em class="group-title">' . $label . '</em>' : '' ) .
						$this->renderizeFields( $group_form, true ) .
					'</div>';

				else:

					// Campos que não aparecem no formulário
					if( on( $field, 'no_form' ) || ( $this->option( 'action' ) == 'edit' && _array_get( $field, 'just_insert' ) ) ):
						continue;
					endif;
					
					// Renderiza o campo
					$field_print = form::renderize_field_form( $field, $this->options );

				endif;
				
				// Aloca o campo na região do form indicada
				$regions[ $region ][] = $field_print;
			
			endforeach;
			
			// Classe css do formulário
			$classform = _array_get( $form, 'classname', '' );

			// HTML
			$htmlform = '';

			if( $is_group ):

				if( count( $regions ) > 1 ):
					foreach ( $regions as $key_reg => $region ):
						$htmlform .= implode( '', $regions[ $key_reg ] );
					endforeach;
				else:
					$htmlform .= implode( '', $regions[ 'default' ] );
				endif;

				return $htmlform;

			else:
			
				if( count( $regions ) > 1 ):
					
					foreach ( $regions as $key_reg => $region ):
						$htmlform .= '<div class="region-' . $key_reg . '">' . implode( '', $regions[ $key_reg ] ) . '</div>';
					endforeach;
				
				else:
					
					$htmlform .= '<div class="region-default ' . $classform . '">' . implode( '', $regions[ 'default' ] ) . '</div>';
				
				endif;
				
				$stepped = _array_get( $form, 'form_step' );
				$class = $stepped ? 'form-step' : 'form-fields';
				
				$id = ( $class == 'form-step') ? ' id="'. $form[ 'form_step' ] .'"' : '';
				
				$return = '<div class="'. $class .'"'. $id .''. ( $stepped ? 'style="display:none"' : '' ) .'>' . $htmlform . '</div>';

			endif;
		
		endif;
			
		// Natives on admin
		$natives = '';
		if( !empty( $this->natives ) ):

			foreach( $this->natives as $native ):

				if( on( $native, 'required' ) ):

					$natives .= '<input type="hidden" data-group="natives" data-ftype="'. $native[ 'ftype' ] .'" data-machine-name="'. $native[ 'machine_name' ] .'" data-label="'. $native[ 'label' ] .'"';

					if( $native[ 'ftype' ] == 'taxonomy' ):

						$natives .= 'data-taxonomy="'. $native[ 'taxonomy' ] .'"';

					else:
						
						$natives .= 'data-minlength="'. _array_get( $native, 'minlength', 'false' ) .'"';
						$natives .= 'data-maxlength="'. _array_get( $native, 'maxlength', 'false' ) .'"';

					endif;

					$natives .= '>';

				endif;
				
			endforeach;

			$return .= $natives;
			
		endif;

		return $return;

	}

	public function joinByGroups(){

		if( !$this->option( 'groups' ) ) return $this->option( 'fields' );

		$return = [];
		$fields = $this->option( 'fields' );

		// Distribute
		foreach( $this->option( 'groups' ) as $kg => $group ):

			if( empty( $group[ 'fields' ] ) ) continue;

			$return[ $kg ] = $group;

			$keyed = [];
			foreach( $group[ 'fields' ] as $field_name ):

				$_field = _array_get( $fields, $field_name );
				
				// Get field
				$keyed[ $field_name ] = $_field;
				unset( $fields[ $field_name ] );

				// Double
				$_double = _array_get( $_field, 'double' );
				if( $_double ):
					$_double_name = _array_get( $_double, 'machine_name' );
					$keyed[ $_double_name ] = _array_get( $fields, $_double_name );
					unset( $fields[ $_double_name ] );
				endif;
			
			endforeach;
			
			$return[ $kg ][ 'fields' ] = $keyed;

		endforeach;

		// Free fields
		if( !empty( $fields ) ):
			foreach( $fields as $kf => $field ):
				$return[ $kf ] = $field;
			endforeach;
		endif;

		// Returning
		return $return;

	}

	// Renderização padrão dos campos de um form
	public static function renderize_fields_form( $form, $settings ){
		
		// Passos do formulário
		$form_steps = self::get_steps( $form[ 'fields' ], $settings );
		
		if( is_array( $form_steps ) && count( $form_steps ) > 1 ):
			
			$steps = '';
			$nav = '';
			$step_desc = 1;
			
			foreach ( $form_steps as $key => $step ):

				$nav .= '<a href="#'. $key .'" class="'. $key .'" rel="'. $key .'">';
				$nav .= '	<span class="ico-status">'. $step_desc .'</span> ';
				$nav .= '	<span class="txt-status">'. $step[ 'confs' ][ 'label' ] .'</span> ';
				$nav .= '</a>';

				$step_form = $form;
				$step_form[ 'fields' ] = $step[ 'fields' ];
				$step_form[ 'form_step' ] = $key;
				
				$steps .= self::renderize_fields_form( $step_form, $settings );
				
				$step_desc++;
			
			endforeach;
			
			return 
				'<div class="form-fields">'.
					'<div id="form-navigation" class="form-navigation">
						<div class="tabs">' .
							$nav .
						'</div>
					</div>'.
					$steps.
				'</div>'
			;
		
		endif;
		
		// Regiões do formulário
		$regions = array( 'default' => array() );
		
		foreach( $form[ 'fields' ] as $key => $field ):

			// Campos que não aparecem no formulário
			if( on( $field, 'no_form' ) ):
				continue;
			endif;
			
			// Região do campo
			$region = self::get_field_region( $regions, $field );
			
			// Renderiza o campo
			$field_print = self::renderize_field_form( $field, $settings );
			
			// Aloca o campo na região do form indicada
			$regions[ $region ][] = $field_print;
		
		endforeach;
		
		// Classe css do formulário
		$classform = _array_get( $form, 'classname', '' );
		
		// HTML
		$htmlform = '';
		if( count( $regions ) > 1 ):
			
			foreach ( $regions as $key_reg => $region ):
				$htmlform .= '<div class="region-' . $key_reg . '">' . implode( '', $regions[ $key_reg ] ) . '</div>';
			endforeach;
		
		else:
			
			$htmlform .= '<div class="region-default ' . $classform . '">' . implode( '', $regions[ 'default' ] ) . '</div>';
		
		endif;
		
		$class = isset( $form[ 'form_step' ] ) ? 'form-step' : 'form-fields';
		
		$id = $class == 'form-step' ? ' id="'. $form[ 'form_step' ] .'"' : '';
		
		return '<div class="'. $class .'"'. $id .'>' . $htmlform . '</div>';
	
	}

	public function getFieldsGroups(){
		return PikiFields::distributeFields( $this->opition( 'groups' ), $this->option( 'fields' ) );
	}

	public function getFieldsSteps(){
		return PikiFields::distributeFields( $this->option( 'steps' ), $this->option( 'fields' ) );
	}

	public static function get_steps( $fields, $settings ){
				
		// Campos dentro dos passos
		$steps = array(
			// Campos sem um passo pai
			'pikiform_first_step' => array( 
				'confs' => array( 
					'label' => 'Início',
			        'machine_name' => 'pikiform_first_step',
				), 
				'fields' => array(),
			),
		);
		
		// Passo atual
		$actual_step = false;
		foreach ( $fields as $key => $field ):

			$fsettings = array_key_exists( 'confs', $field ) ? $field[ 'confs' ] : $field;
			
			// Se o campo é do tipo passo, o coloca como passo atual e atribui um array
			if( $fsettings[ 'ftype' ] == 'step' ):

				$actual_step = $fsettings[ 'machine_name' ];
				$steps[ $actual_step ] = array(
					'confs' => $fsettings,
					'fields' => array(),
				);
			
			// Se um passo já foi detectado, o campo é colocado dentro do último
			elseif( $actual_step !== false ):
			
				$steps[ $actual_step ][ 'fields' ][ $key ] = $field;
			
			// Se nenhum passo foi detectado ainda, é colocado no primeiro passo
			else:
		
				$steps[ 'pikiform_first_step' ][ 'fields' ][ $key ] = $field;
		
			endif;
		
		endforeach;
				
		// Caso não haja nenhum passo, o formulário não tem passos
		if( count( $steps ) == 1 ) return false;
		
		// Se existem campos sem um passo, é colocado no início, como primeiro passo.
		if( count( $steps[ 'pikiform_first_step' ][ 'fields' ] ) == 0 ):
			array_shift( $steps );
		endif;
		
		// Retorna os passos.
		return $steps;
	
	}

	public static function renderize_field_form( $field, $settings = false ){

		$field_print = '';

		// Hide from edition
		if( _array_get( $settings, 'action' ) == 'edit' && on( $field, 'just_insert' ) ):
			return $field_print;
		endif;
		
		// HTML of field
		$field[ 'html' ] = self::get_html_field( $field, $settings );
		
		// Se o campo é printado sem encapsulamento
		if( on( $field, 'nowrap' ) ):
			return implode( '', $field[ 'html' ] );
		endif;

		// Title
		$label = _array_get( $field, 'label' );
		
		// Insere a linha que comporta o campo
		PikiField::add_attributes( $field, array(
			'rel' => $field[ 'machine_name' ],
			'class' => [ 'linha-field', _array_get( $field, 'wrapper_class', '' ), ( !$label ? 'no-title' : false ) ],
		));
		
		// Campo multiplo
		if ( PikiField::is_multiple( $field ) ):
			
			PikiField::add_attributes( 
				$field, 
				[
					'class' => [ 'multiple' ],
					'--maximo' => PikiField::max_items( $field ),
					'--minimo' => PikiField::min_items( $field ),
					'--abertos' => PikiField::init_items( $field ),
				]
			);
		
		endif;

		// Se é um agrupamento de campos
		$is_fieldset = ( $field[ 'ftype' ] == 'fieldset' );
		
		// Se for fieldset, adiciona o ID
		if ( $is_fieldset ):
			PikiField::add_attributes( $field, array(
				'id' => $field[ 'machine_name' ],
			));
		endif;

		// Main tag field
		$field_print = '<div';
		// Conditional showing
		$show_when = _array_get( $field, 'show_when' );
		if( $show_when ):
			$field_print .= " data-show-when='" . json_encode( str_replace( 'empty', '\'\'', $show_when ) ) . "'";
		endif;
		// Specific field attributes
		PikiField::set_attributes( $field_print, $field );
		// Hiding
		if( $show_when || on( $field, 'css_hide' ) ):
			$field_print .= ' style="display:none;"'; 
		endif;
		// Close main tag
		$field_print .= '>';
		
		// Escreve o label do campo
		$label = false;
		$required = '';
		
		// Símbolo required
		if( on( $field, 'required' ) ):
			$required = '<span class="req">*</span>';
		endif;
		
		// Placeholder
		$label_inside = !is_admin() && on( $field, 'label_inside' );
		
		// Se o label deve ser ocultado
		$hide_label = on( $field, 'hide_label' );
		
		// Tooltip
		$tooltip = _array_get( $field, 'tooltip' );
		if( $tooltip ):

			// Tooltip text and location
			if( is_array( $tooltip ) ):

				$tip_content = _array_get( $tooltip, 'content' );
				$tip_location = _array_get( $tooltip, 'location', 'label' );
				$tip_class = _array_get( $tooltip, 'class' );
			
			// Just tolltip text
			else:

				$tip_content = $tooltip;
				$tip_location = _array_get( $settings, 'tips_location', 'label' );
				$tip_class = _array_get( $settings, 'tips_class', '' );
			
			endif;

			$tooltip = '<div class="pktip '. $tip_class .'"><button type="button">?</button><div style="display:none;">'. $tip_content .'</div></div>';
 
		endif;

		// General field label
		$_label_name = _array_get( $field, 'label' );
		// Label to show in form
		$_label_form = _array_get( $field, 'label_form' );

		if( $_label_name || $_label_form ):

			// Special characteres and homem links
			if( $_label_form ):

				$_label = htmlspecialchars_decode( $_label_form );
				$_label = str_replace( '%home%', get_bloginfo( 'url' ), $_label );
			
			else:
			
				$_label = htmlspecialchars_decode( $_label_name );
				$_label = str_replace( '%home%', get_bloginfo( 'url' ), $_label );
			
			endif;

			$field_id = PikiField::get_field_id( $field );
			$label = '<label for="'. $field_id .'"' . ( ( ( !$is_fieldset && $label_inside ) || $hide_label ) ? ' class="hide"' : '' ) .'>';

			if( isset( $field[ 'label_prefix' ] ) ):
				$label .= $field[ 'label_prefix' ];
			endif;

			$label .= $required . ' ' . $_label;
			
			if( isset( $field[ 'label_suffix' ] ) ):
				$label .= '<span class="label-sufix">' . $field[ 'label_suffix' ] . '</span>';
			endif;

			$label .= '</label>';

		endif;

		// Ícone
		$icone = isset( $field[ 'icone' ] ) && !empty( $field[ 'icone' ] ) ? '<i class="icon '. $field[ 'icone' ] . '"></i>' : '';

		// Se existe uma descrição para o campo
		$description = _array_get( $field, 'description' );
		if( !empty( $description ) && !on( $field, 'hide_description' ) ):
			$description = htmlspecialchars_decode( $description );
			$description = str_replace( '%home%', get_bloginfo( 'url' ), $description );
			$description = '<div class="description linha-field-description">'. $description . ( $tooltip && $tip_location == 'description' ? $tooltip : '' ) . '</div>';
		endif;

		// Prefix field and Suffix field
		$_prefix = _array_get( $field, 'prefix', '' );
		
		$_suffix = _array_get( $field, 'suffix', '' );
		if( $_suffix && strpos( $_suffix, '{field_value}' ) !== false ):
			$value = _array_get( $field, 'value' );
			$value = is_array( $value ) ? reset( $value ) : $value;
			$_suffix = str_replace( '{field_value}', $value, $_suffix );
		endif;

		if( PikiForms::isMaterialize( $settings ) ):

			if( method_exists( $field[ 'ftype' ], 'field_render' ) ):
			
				$field_print .= call_user_func( array( $field[ 'ftype' ], 'field_render' ), $html, $field );

			else:

				if( $is_fieldset ):

					// Label
					$field_print .= '<div class="linha-field-label">' . $label . ( $tooltip && $tip_location == 'label' ? $tooltip : '' ) . '</div>';

					// Escreve cada campo
					foreach ( $field[ 'html' ] as $fhtml_key => $fhtml ):
						$field_print .= '<div class="field-item">'. $_prefix . $icone .  $fhtml . $_suffix . $description . '</div>';
					endforeach;

				else:

					$field_print .= $_prefix . $icone;

					if( count( $field[ 'html' ] ) == 1 ):

						$field_print .= '<div class="field-and-label">' . reset( $field[ 'html' ] ) . ( !$hide_label ? $label : '' ) . ( $tooltip && $tip_location == 'label' ? $tooltip : '' ) . '</div>' . $description;

					else:

						foreach( $field[ 'html' ] as $fhtml_key => $fhtml ):
							$field_print .= $fhtml;
						endforeach;
						$field_print .= ( !$hide_label ? $label : '' ) . $tooltip . $description;

					endif;

				endif;

			endif;

		else:

			// Título do campo
			if( ( !$is_fieldset && $label_inside ) || $hide_label || empty( $label ) ):
			
				$label = '';
				$field_print .= $tooltip;
			
			else:
			
				$field_print .= '<div class="linha-field-label">' . $label . ( $tooltip && $tip_location == 'label' ? $tooltip : '' ) . '</div>';
			
			endif;
			
			// Se houver um método alternativo para a renderização do campo
			if( method_exists( $field[ 'ftype' ], 'field_render' ) ):
			
				$field_print .= call_user_func( array( $field[ 'ftype' ], 'field_render' ), $html, $field );
			
			// Se não há, ele renderiza com o formato 'padrão'
			else:
				
				// Escreve cada campo
				foreach ( $field[ 'html' ] as $fhtml_key => $fhtml ):
					$field_print .= '<div class="field-item">'. $_prefix . $icone .  $fhtml . $_suffix . $description . '</div>';
				endforeach;
			
			endif;

		endif;
		
		
		$field_print .= "\r</div>\r";
		return $field_print;
	} 

	public static function get_field_region( &$regions, $field ){
		// Field region
		$freg = _array_get( $field, 'region', 'default' );
		// Must be array
		if( !isset( $regions[ $freg ] ) ):
			$regions[ $freg ] = [];
		endif;
		// Response
		return $freg;
	}

	public static function set_custom_options( &$confs, $custom ){
		$confs = array_merge( $confs, $custom );
	}
	
	public static function get_insert_value( $field ){
		
		$value = '';		
		
		if( isset( $field[ 'value' ] ) && $field[ 'value' ] !== false && $field[ 'value' ] != '' ):

			$_index = _array_get( $field, 'field_index', 0 );
			
			if( !is_array( $field[ 'value' ] ) ):
				$value = $field[ 'value' ];
			else:
				if( !isset( $field[ 'value' ][ $_index ] ) ):
					$value = false;
				else:
					$value = $field[ 'value' ][ $_index ];
				endif;
			endif;
		
		elseif( isset( $field[ 'default_value' ] ) && !isempty( $field[ 'default_value' ] ) ):
			
			if( !is_array( $field[ 'default_value' ] ) ):
				$value = $field[ 'default_value' ];
			else:
				$value = is_array( $field[ 'default_value' ] ) ? array_shift( $field[ 'default_value' ] ) : $field[ 'default_value' ];
			endif;
		
		endif;
		
		if( $value === '' ):
			return false;
		else:
			return $value;
		endif;
	
	}
}
