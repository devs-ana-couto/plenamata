<?php
class valida {

	var $form_id;
	var $form_key;
	var $fields;
	var $data;
	var $posted;
	var $action;
	var $save_values;
	var $item;
	var $isDraft;
	
	public function __construct( $settings ){

		$this->settings = $settings;

		// ID do formulário
		$this->form_id = _array_get( $settings, 'pid' );
		
		// Chave do formulário
		$this->form_key = $settings[ 'key' ];
		
		// Campos do formulário
		$this->fields = $settings[ 'fields' ];

		// Acão que está sendo executada
		$this->action = $settings[ 'action' ];
		
		// Post type
		$this->post_type = isset( $settings[ 'post_type' ] ) && post_type_exists( $settings[ 'post_type' ] ) ? $settings[ 'post_type' ] : false;
		
		// Valores postados
		$this->posted = _array_get( $settings, 'posted' );

		// Ítem 
		$this->item = _array_get( $settings, 'item' );
		
		// Se os valores válidos serão salvos
		if( on( $settings, 'allways_edit' ) && $this->item ):
			$this->save_valids = true;
		endif;

		// Sanvando rascunho
		$this->isDraft = _array_get( $settings, 'saving_draft' );
	
	}

	public function get_validation(){

		// Draft
		if( $this->isDraft ):

			$title = PikiFields::extract_field( $this->fields, 'title', 'ftype' );
			if( !$title ):
			
				return [
		        	'status' => 'success',
		        	'errors' => false,
		        	'valids' => $this->fields,
		        ];
		    
		    else:
		    
		    	$validation = $this->valida( [ $title ], $this->posted );
		    
		    endif;

		// Default validation
		else:
		
			$validation = $this->valida( $this->fields, $this->posted );
		
		endif;

		return $validation;
	
	}

	// Check if is admin submit
	public static function isAdminSubmit(){

		global $pagenow;

		$is_admin_referer = strpos( $_SERVER[ 'HTTP_REFERER' ], get_admin_url() );
		if( $is_admin_referer === 0 && $pagenow == 'admin-ajax.php' ) return true;

		if( is_admin() && $pagenow != 'admin-ajax.php' ) return true;

		return false;

	}

	private static function checkConditionals( $fields ){

		// Each field
		foreach( $fields as $mname => &$field ):

			// Field require option
			$require = _array_get( $field, 'required' );

			// If require is conditional
			if( $require && is_array( $require ) ):

				// Start with false
				$do_require = false;

				// Analisys each requirement
				foreach( $require as $condition ):

					// Field condition name
					$field_name = _array_get( $condition, 'field' );

					// Search by field
					$field_contition = PikiFields::extract_field( $fields, $field_name );
					if( !$field_contition ) continue;

					// Value of condition
					$value = _array_get( $condition, 'value' );

					// Not empty or empty condition
					if( $value == 'notempty' || $value == 'empty' ):

						// Check if field is empty
						$empty = PikiField::is_empty_field( $field_contition );

						// Test condition
						if( ( $value == 'notempty' && !$empty ) || ( $value == 'empty' && $empty ) ):
							$do_require = true;
						endif;

					else:

						$condition_value = _array_get( $field_contition, 'value' );

						if( is_array( $condition_value ) ):
							$do_require = in_array( $value, $condition_value );
						else:
							$do_require = $condition_value == $value;
						endif;

					endif;

				endforeach;
				
				// Define new field condition
				$field[ 'required' ] = $do_require ? true : false;
				
			endif;

		endforeach;

		return $fields;
		

	}

	// Do validation
	public function valida( $fields, $values ){
        
        // Permite que outros plugins modifiquem os campos antes de serem validados
        $fields = apply_filters( 'pikiforms_pre_valida', $fields, $this->form_key, $this->action, $values );

        // Campos com os valores inseridos
		$fields = PikiFields::mergeWithData( $fields, $values );

		// Verifica os campos condicionais
		$fields = valida::checkConditionals( $fields );

        // Remove os campos nos formulários do Admin
        if( valida::isAdminSubmit() ):
       		PikiFields::remove_fields( $fields, [ 'title', 'body', 'excerpt', 'taxonomy' ] );
       	endif;

        // Remove just insert fields
       	if( $this->action == 'edit' ):
           	PikiFields::remove_fields( $fields, 'termsuse' );
        endif;
        
        // Array com os erros do form validado
        $errors = array();
        
        // Campos validados positivamente
        $valid_fields = $fields;        

        // Passa pelo array dos campos do tipo de conteudo, e faz a validação dos seus valores
        foreach( $fields as $field_key => $field ):

        	// Campos que não são processados
        	if( on( $field, 'no_proccess' ) ):
        		unset( $valid_fields[ $field_key ] );
        		continue;
        	endif;
        	
        	// Campos que não são validados
        	if( on( $field, 'no_validate' ) ):
        		continue;
        	endif;

        	// Not editable
        	if( 
        		(
        			on( $field, 'lock_edit' )
        			||
        			on( $field, 'just_insert' )
        		)
        		&& 
        		$this->action == 'edit' 
        	):
        		continue;
        	endif;
        	            
            // Action
            $field[ 'form_action' ] = $this->action;

            // Custom method
            $validate_widget = _array_get( $field, 'validation_type', $field[ 'ftype' ] );
            
            // Resultado da validação
            if( method_exists( $validate_widget, 'validate' ) ):
	            $validation = call_user_func( [ $validate_widget, 'validate' ], $field, $this->settings );
            else:
            	$validation = PikiField::validate( $field, $this->settings );
            endif;

            // Confirm value
            $confirm_origin = _array_get( $field, 'confirm_origin' );
            if( $validation === true && $confirm_origin && $field[ 'value' ] != $field[ 'origin_value' ] ):
            	$validation = PikiField::getErrorMessage( $field, 'confirm' );
           	endif;


            // Campo com valor único
            if( $validation === true && on( $field, 'unique' ) ):

				if( method_exists( $field[ 'ftype' ], 'validate_unique' ) ):				
					$validation = call_user_func( [ $field[ 'ftype' ], 'validate_unique' ], $field, $this->settings );
				else:
					$validation = $this->is_unique_value( $field );
				endif;
            
            endif;
            
            // Se o retorno da validação é um array, ele insere os erros no array de erros do form validado
            if( $validation !== true && !empty( $validation ) ):
            	
            	// Campo validado
                $errors[ $field[ 'machine_name' ] ] = [
                	'field' => $field,
                	'error' => $validation
                ];
            	            
            	// Remove o campo do array de campos válidos	
            	unset( $valid_fields[ $field_key ] );

            endif;

        endforeach;

        // Retorno
        $result = [
        	'status' => empty( $result[ 'errors' ] ) ? 'success' : 'error',
        	'errors' => $errors,
        	'valids' => $valid_fields,
        ];

        // Permite que outros plugins alterem a validação
        $_result = apply_filters( 'pikiform_valida', $result, $this->settings, $values );

        if( !empty( $_result ) ):
	        // Status
			$_result[ 'status' ] = empty( $_result[ 'errors' ] ) ? 'success' : 'error';
			// Set new response
        	$result = $_result;
        endif;

        // Return
        return $result;

	}

	// Verifica se o valor do campo já foi cadastrado
	public function is_unique_value( $field ){

		global $wpdb;

		// Field value
		$value = is_array( $field[ 'value' ] ) ? array_shift( $field[ 'value' ] ) : $field[ 'value' ];
		if( method_exists( $field[ 'ftype' ], 'db_encode' ) ):
			$value = call_user_func( [ $field[ 'ftype' ], 'db_encode' ], $field, $value );
		endif;

		// Field name
		$name = _array_get( $field, 'machine_name' );

		// Decode DB for search
		if( method_exists( $field[ 'machine_name' ], 'db_encode' ) ):
		endif;

		// Profile forms
		$isProfile = _array_get( $this->settings, 'perfil' );

		if( empty( $value ) || ( !$isProfile && empty( $this->post_type ) ) ):
			return true;
		endif;

		// Data type
		if( $isProfile ):

			$owner_id = false;

			if( $name == 'user_email' ):

				$user = get_user_by( 'email', $value );
				$owner_id = $user ? $user->ID : false;

			else:

				$owner_id = $wpdb->get_var($wpdb->prepare(
					"SELECT user_id FROM $wpdb->usermeta WHERE meta_key = %s AND meta_value = %s",
					[ $field[ 'machine_name' ], $value ]
				));

			endif;

			if( !empty( $owner_id ) && ( get_current_user_id() != $owner_id ) ):
				return PikiField::getErrorMessage( $field, 'unique' );
			endif;

		else:

			$exists = $wpdb->get_var($wpdb->prepare(
				"SELECT PM.meta_value FROM $wpdb->postmeta as PM LEFT JOIN $wpdb->posts AS PS ON PM.post_id = PS.ID WHERE PM.meta_key='%s' AND PM.meta_value='%s' AND PS.post_type = '%s' limit 1",
				[
					$field[ 'machine_name' ],
					$value,
					$this->post_type
				]
			));

			if( !empty( $exists ) || $exists == $value ):
				return PikiField::getErrorMessage( $field, 'unique' );
			endif;

		endif;

		return true;

	}

	// Recupera o valor postado para um campo
	public static function getPostedFieldValues( $field, $values ){
		
		// Se o campo possuir um método que extrai os valores postados
		if( method_exists( $field[ 'ftype' ], 'posted_values' ) ):
			
			return call_user_func( [ $field[ 'ftype' ], 'posted_values' ], $field, $values );
		
		// Se nenhum dado foi postado para o campo
		elseif( !isset( $values[ $field[ 'machine_name' ] ] ) ):
			
			return 'noposted';
		
		// Retorna os valores postados para o campo
		else:
			
			return $values[ $field[ 'machine_name' ] ];
		
		endif;

	}

	// Verifica se um grupo de campos está vazio
	public function is_empty_fields( $fields, $values ){
		foreach ( $fields as $key => $field ) {
			if( !$this->is_empty_field( $field, $values ) ):
				return false;
			endif;
		}
		return true;
	} 

	// Verifica se um ítem está vazio
	public function is_empty_field( $field, $values ){

		// Se o campo possui um método específico
		if( method_exists( $field[ 'ftype' ], 'is_empty' ) ):
			return call_user_func( [ $field[ 'ftype' ], 'is_empty' ], $field, $values );
		endif;

		// Se o valor não foi postado
		if( !isset( $values[ $field[ 'machine_name' ] ] ) ):
			return true;
		else:
			$item_value = $values[ $field[ 'machine_name' ] ];
		endif;

		// Se um array de valores foi postado
		if( is_array( $item_value ) ):
			if( isset( $field[ 'field_index' ] ) ):
				$item_value = isset( $item_value[ $field[ 'field_index' ] ] ) ? $item_value[ $field[ 'field_index' ] ] : '';
			else:
				$item_value = array_shift( $item_value );
			endif;
		endif;

		// Se o valor agora é vazio
		if( !$item_value || empty( $item_value ) || $item_value == '' ):
			return true;
		endif;

		return false;

	}


	/*

	IMPLEMENTAR !!!

	*/
	public static function remove_errors( &$validation, $to_remove ){

		// Se não há nada a fazer
		if( !$validation || empty( $validation ) || !$to_remove || empty( $to_remove ) ):
			return;
		endif;

		// Se não é array, encapsulamos
		if( !is_array( $to_remove ) ) $to_remove = [ $to_remove ];

		foreach ( $validation as $key => &$item ):

			// Se é um passo de formulário
			if( isset( $item[ 'status' ] ) && isset( $item[ 'errors' ] ) && isset( $item[ 'valids' ] ) ):

				self::remove_errors( $item[ 'errors' ], $to_remove );

				//if( in_array( $key, $fields ) ):

			// Fieldsets
			elseif( isset( $item[ 'field' ] ) && $item[ 'field' ][ 'ftype' ] == 'fieldset' ):

			endif;
			
		endforeach;

	    if( isset( $validation[ 'projeto' ][ 'errors' ][ 'criterios_de_acessiblidade' ] ) ):
            unset( $validation[ 'projeto' ][ 'errors' ][ 'criterios_de_acessiblidade' ] );
        endif;
        if( empty( $validation[ 'projeto' ][ 'errors' ] ) ):
            $validation[ 'projeto' ][ 'status' ] = 'success';
        endif;

	}

}
