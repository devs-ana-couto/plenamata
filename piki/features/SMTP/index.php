<?php
class SMTP {

    function __construct(){

        // Change init mailer
		add_action( 'phpmailer_init', [ $this, 'init' ] );

        // Sender email
        add_filter( 'wp_mail_from', [ $this, 'fromEmail' ] );
    }

    public function init( &$phpmailer ){

        // Debugging
        // if( is_super_admin() ):
        //     $phpmailer->SMTPDebug = 3;
        // endif;

    	// Allways html
		$phpmailer->IsHTML( true );

		// SMTP
        $smtp_options = get_option( 'piki_smtp_options' );

        // Sender
        if( empty( $phpmailer->Sender ) ):
        	if( !empty( $phpmailer->From ) ):
        		$phpmailer->Sender = $phpmailer->From;
        	else:
	        	$phpmailer->Sender = _array_get( $smtp_options, 'sender' );
	        	if( empty( $phpmailer->Sender ) ):
	        		$phpmailer->Sender = get_option( 'admin_email' );
	        	endif;
	        endif;
        endif;

        // Subject
        if( !empty( $phpmailer->Subject ) ):
        	$phpmailer->Subject = '=?UTF-8?B?' . base64_encode( $phpmailer->Subject ) . '?=';
        endif;

        // SMTP
        if( on( $smtp_options, 'status' ) ):

            $phpmailer->isSMTP();
            $phpmailer->Mailer = 'smtp';
            $phpmailer->SMTPAuth = TRUE;
            $phpmailer->SMTPSecure = _array_get( $smtp_options, 'secure', 'none' );
            $phpmailer->Host = _array_get( $smtp_options, 'host' );
            $phpmailer->Port = _array_get( $smtp_options, 'port', 465 );
            $phpmailer->Username = _array_get( $smtp_options, 'username' );
            $phpmailer->Password = _array_geT( $smtp_options, 'password' );

        endif;    	

    }

    // Change from email
    public function fromEmail( $from_email ){
        $options = get_option( 'piki_smtp_options' );
        $alternative = _array_get( $options, 'sender', get_option( 'admin_email' ) );
        return empty( $alternative ) ? $from_email : $alternative;
    }
    
} 
$SMTP = new SMTP();

/*
// Return path do wordpress
function perfil_mail_fix( $phpmailer ) {
    $phpmailer->Sender = get_option( 'admin_email' );
}
add_action( 'phpmailer_init', 'perfil_mail_fix' );    
// Email content type
function perfil_email_content_type(){
    return "text/html";
}
add_filter( 'wp_mail_content_type', 'perfil_email_content_type' );
// Function to change sender address
function wpb_sender_email( $original_email_address ) {
    return 'tim.smith@example.com';
}
// Function to change sender name
function wpb_sender_name( $original_email_from ) {
    return 'Tim Smith';
}
// Hooking up our functions to WordPress filters 
add_filter( 'wp_mail_from', 'wpb_sender_email' );
add_filter( 'wp_mail_from_name', 'wpb_sender_name' );
*/
 
// Página de administração
if( is_admin() ):
    require_once( Piki::path( __FILE__ ) . '/admin.php' );
endif;
