(function( $ ){

    $(function(){

	    $( '.piki-filter-form' ).each(function(event){

	    	var $this = $( this );
	    	var _this = this;

	    	// Todos os campos
	    	this.allFields = $( 'input,textarea,select', $this );

	    	// Campos com ação
	    	this.actionFields = this.allFields.filter( ':checkbox,:radio,select' );

	    	// Se o filtro deve ser submetido quando um campo é alterado
	    	this.submitOnChange = $this.attr( 'submit-onchange' ) === 'true';

	    	if( this.submitOnChange === true ){
		    	this.actionFields.on( 'change', function(event){
		    		$this.submit();
		    	});
	    	}
	    	
	    	// Submissão do filtro
	    	$this.on( 'submit', function(event){
	    		_this.submitFilter();
	    	});
	    	
	    	this.submitFilter = function(){
	    		$.fn.pikiLoader();
	    		this.allFields.each(function(){
	    			var $field = $( this );
	    			if( $field.val() == '' ){
	    				$field.remove();
	    			}
	    		});
	    		return true;
	    	};

	    });

  });

})(jQuery);