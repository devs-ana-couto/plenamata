<?php 
class address extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Endereço' );
	}

	// Configurações específicas do campo
	public static function set_confs( $field ){
		$field[ 'sqlrpc' ] = '%s';
		$field[ 'nowrap' ] = true;
		return $field;
	}

	// Constroi o campo do tipo select 
	public static function get_field( $field ){

        /*
        'endereco' => array(
            'label' => 'Endereço físico',
            'machine_name' => 'endereco',
            'ftype' => 'fieldset',
            'hide_headers' => true,
            'multiple' => array(
                'status' => true,
                'minimo' => '1',
                'maximo' => '9999',
                'abertos' => '1',
                'add_label' => 'Adicionar outro endereço'
            ),
            'subfields' => array(
                'cep' => array(
                    'label' => 'CEP',
                    'machine_name' => 'cep',
                    'required' => true,
                    'ftype' => 'cep',
                ),
                'logradouro' => array(
                    'label' => 'Logradouro',
                    'machine_name' => 'logradouro',
                    'required' => true,
                    'ftype' => 'text',
                    'mask_type' => 'off',
                ),
                'complemento' => array(
                    'label' => 'Complemento',
                    'machine_name' => 'complemento',
                    'required' => true,
                    'ftype' => 'text',
                    'mask_type' => 'off',
                ),
                'bairro' => array(
                    'label' => 'Bairro',
                    'machine_name' => 'bairro',
                    'required' => true,
                    'ftype' => 'text',
                    'mask_type' => 'off',
                ),
                'estado_cidade' => array(
                    'label' => 'Estado/Cidade',
                    'machine_name' => 'estado_cidade',
                    'required' => true,
                    'ftype' => 'ufcidade',
                    'label_to_show' => 'sigla',
                ),
            ),
        ),
        */

		echo( '<pre>' );
		var_dump( '$field' );
		var_dump( $field );
		exit;
		

		// Label do campo
		if( isset( $field[ 'label_inside' ] ) && !empty( $field[ 'label_inside' ] ) ):
			$label = $field[ 'label_inside' ];
		elseif( isset( $field[ 'label' ] ) && !empty( $field[ 'label' ] ) ):
			$label = $field[ 'label' ];
		else:
			$label = is_array( $field[ 'value' ] ) ? $field[ 'value' ][ $field[ 'field_index' ] ] : $field[ 'value' ];
		endif;

		$html = '<input type="button" name="' . $field[ "name_html" ] . '" id="' . $field[ "id" ] . '" value="' . $label . '" title="'. $label . '"';
		
		if( isset( $field[ 'classnames' ] ) && !empty( $field[ 'classnames' ] ) ):
			parent::add_attributes( $field, array( 'class' => $field[ 'classnames' ] ) );
		endif;

		parent::set_attributes( $html, $field );
		
		$html .= " />";
		
		return $html;
	}

	public static function validate( $field, $settings ){
		return true;
	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields( array( 'label', 'machine_name', 'icone' ), true );
		$fields[ 'label_inside' ] = array(
			'label' => 'Texto do botão',
			'machine_name' => 'label_inside',
			'ftype' => 'text',
		);
		$fields[ 'classnames' ] = array(
			'label' => 'Classes (css)',
			'machine_name' => 'classnames',
			'ftype' => 'text',
		);
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}