<?php
class PKRoles{

    private $addfiles;
    private static $options;

    // All roles
    static $roles;

    // Actual role
    static $actualRole;

    // Help base url's
    static $suporte_base = 'https://wordpress.org/support/article/';
    static $codex_base = 'https://codex.wordpress.org/';
    static $ticket_base = 'https://core.trac.wordpress.org/ticket/';
    static $trunk = 'https://core.trac.wordpress.org/ticket/';

    // All capatibilities
    static $caps;

    // Inicia o plugin
    function __construct(){

        // Actual role
        $this::$actualRole = _get( 'role', 'administrator' );

        // Arquivos onde widgets serão ineridos
        $this->addfiles = [ 'user-edit.php', 'user-new.php' ];

        // Options
        $this->options = $this->getOptions();

        // Admin page
        add_action( 'admin_menu', [ $this, 'add_plugin_page' ] );
        add_action( 'admin_init', [ $this, 'page_init' ] );

        // Ajax
        add_action( 'wp_ajax_pikiroles_change_cap', [ $this, 'changeCap' ] );

        // Apenas Admin
        if( is_admin() && on( $this->options, 'multiple' ) ):

            // Salva as roles do usuário
            add_action( 'edit_user_profile_update', [ $this, 'save_user_roles' ] );
            add_action( 'user_register', [ $this, 'save_user_roles' ] );

            // Scripts para as páginas de edição
            add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_styles' ], 10 );

            // Widget para seleção das roles
            add_action( 'edit_user_profile', [ $this, 'multiple_roles_widget' ], 0 );
            add_action( 'user_new_form', [ $this, 'multiple_roles_widget' ], 0 );
            
            // Listagem de usuário no admin
            add_filter( 'manage_users_columns', [ $this, 'roles_colum' ] );
            add_filter( 'manage_users_custom_column', [ $this, 'display_roles_colum' ], 10, 3 );

        endif;

        // Multilínguas
        load_plugin_textdomain( 'pkroles', false, Piki::path( __FILE__ ) . 'languages/' );

    }

    // Capatibilities
    public function getCaps(){

        if( is_null( $this::$caps ) ):

            $caps = [
                // Multisites
                'multisites' => [
                    'label' => 'Administração da rede (multisite)',
                    'caps' => [
                        'setup_network' => [
                            'label' => 'Configurar rede',
                            'desc' => '<ul>
                                <li>é usado para determinar se um usuário pode configurar multisite, ou seja, acessar a página de configuração de rede. Antes de configurar um multisite, o recurso é mapeado para o recurso `manage_options`, para que seja concedido aos administradores. Uma vez que o multisite é configurado, ele é mapeado para `manage_network_options`, para que seja concedido aos administradores de rede. Consulte <a href="[ticket]39206" target="_blank">#39206 para obter informações básicas.</li>
                            </ul>',
                        ],
                        'manage_network' => [
                            'label' => 'Gerenciar rede',
                            'desc' => '<ul>
                                <li>Permite acesso ao menu <a href="[support]multisite-network-administration/" target="_blank">Super Admin</a></li>
                                <li>Permite que o usuário atualize a rede</li>
                            </ul>',
                        ],
                        'manage_sites' => [
                            'label' => 'Gerenciar sites',
                            'desc' => '<ul>
                                <li>Permite acesso ao menu <a href="[codex]Network_Admin#Sites" target="_blank">Sites de rede</a></li>
                                <li>Permite ao usuário adicionar, editar, excluir, arquivar, desarquivar, ativar, desativar, enviar spam e remover spam de novo site/blog na rede</li>
                            </ul>',
                        ],
                        'manage_network_users' => [
                            'label' => 'Gerenciar usuários da rede',
                            'desc' => '<ul>
                                <li>Permite acesso ao menu <a href="[codex]Network_Admin#Users" target="_blank">Usuários da rede</a></li>
                            </ul>',
                        ],
                        'manage_network_themes' => [
                            'label' => 'Gerenciar temas de rede',
                            'desc' => '<ul>
                                <li>Permite acesso ao menu <a href="[codex]Network_Admin#Settings" target="_blank">Opções de rede</a></li>
                            </ul>',
                        ],
                        'manage_network_options' => [
                            'label' => 'Gerenciar opções de rede',
                            'desc' => '<ul>
                                <li>Permite acesso ao menu <a href="[codex]Network_Admin#Settings" target="_blank">Opções de rede</a></li>
                            </ul>',
                        ],
                        'manage_network_plugins' => [
                            'label' => 'Gerenciar plug-ins de rede',
                            'desc' => '<ul>
                                <li>Permite acesso ao menu <a href="[codex]Network_Admin#Plugins" target="_blank">Plugins de rede</a></li>
                            </ul>',
                        ],
                        'upgrade_network' => [
                            'label' => 'Atualizar rede',
                            'desc' => '<ul>
                                <li>é usado para determinar se um usuário pode acessar a página de atualização de rede no administrador de rede. Relacionado a isso, o recurso também é verificado para determinar se deve mostrar o aviso de que uma atualização de rede é necessária. A capacidade não é mapeada, portanto, é concedida apenas a administradores de rede. Consulte <a href="[ticket]39205" target="_blalnk">#39205</a> para obter informações básicas.</li>
                            </ul>',
                        ],
                        'create_sites' => [
                            'label' => 'Criar sites',
                            'desc' => '<ul>
                                <li>Permite que o usuário crie sites na rede</li>
                            </ul>',
                        ],
                        'delete_sites' => [
                            'label' => 'Excluir sites',
                            'desc' => '<ul>
                                <li>Permite que o usuário exclua sites na rede</li>
                            </ul>',
                        ],
                        'delete_site' => [
                            'label' => 'Excluir site',
                            'desc' => '<ul>
                                <li>Permite que o usuário exclua o site atual (somente Multisite).</li>
                            </ul>',
                        ],
                    ]
                ],
                // Adminstration
                'admin' => [
                    'label' => 'Administração geral',
                    'caps' => [
                        'edit_dashboard' => [
                            'label' => 'Editar painel',
                            'desc' => false,
                        ],
                        'export' => [
                            'label' => 'Exportar',
                            'desc' => false,
                        ],
                        'import' => [
                            'label' => 'Importar',
                            'desc' => '<ul>
                                <li>
                                    Permite acesso às opções de <a href="[support]administration-screens/" target="_blank">Telas de administração</a>:
                                    <ul>
                                        <li>Ferramentas > Importar</li>
                                        <li>Ferramentas > Exportar</li>
                                    </ul>
                                </li>
                            </ul>',
                        ],
                        'manage_categories' => [
                            'label' => 'Gerenciar categorias',
                            'desc' => '<ul>
                                <li>
                                    Permite acesso às opções de <a href="[support]administration-screens/" target="_blank">Telas de administração</a>:
                                    <ul>
                                        <li>Posts > Categorias</li>
                                        <li>Links > Categorias</li>
                                    </ul>
                                </li:
                            </ul>',
                        ],
                        'manage_links' => [
                            'label' => 'Gerenciar links',
                            'desc' => '<ul>
                                <li>
                                    Permite acesso às opções de <a href="[support]administration-screens/" target="_blank">Telas de administração</a>:
                                    <ul>
                                        <li>Links</li>
                                        <li>Links > Adicionar Novo</li>
                                    </ul>
                                </li>
                            </ul>',
                        ],
                        'manage_options' => [
                            'label' => 'Gerenciar opções',
                            'desc' => '<ul>
                                <li>
                                    Permite acesso às opções de <a href="[support]administration-screens/" target="_blank">Telas de administração</a>:
                                    <ul>
                                        <li>Configurações > Geral</li>
                                        <li>Configurações > Escrevendo</li>
                                        <li>Configurações > Lendo</li>
                                        <li>Configurações > Discussão</li>
                                        <li>Configurações > Permalinks</li>
                                        <li>Configurações > Diversas</li>
                                    </ul>
                                </li>
                            </ul>',
                        ],
                        'unfiltered_html' => [
                            'label' => 'HTML não filtrado',
                            'desc' => '<ul>
                                <li>Permite ao usuário postar marcação HTML ou mesmo código JavaScript em páginas, posts, comentários e widgets.</li>
                                <li><strong>Observação:</strong> habilitar esta opção para usuários não confiáveis pode resultar na postagem de código malicioso ou mal formatado.</li>
                                <li><strong>Observação:</strong> no WordPress Multisite, apenas Super Admins têm o recurso unfiltered_html.</li>
                            </ul>',
                        ],
                        'update_core' => [
                            'label' => 'Atualizar core',
                            'desc' => false,
                        ],
                        'customize' => [
                            'label' => 'Personalizar',
                            'desc' => '<ul>
                                <li>Permite acesso ao Personalizador.</li>
                            </ul>',
                        ],
                    ],
                ],
                // Users
                'users'=> [
                    'label' => 'Usuários',
                    'caps' => [
                        'create_users' => [
                            'label' => 'Criar usuários',
                            'desc' => '<ul>
                                <li>
                                    Permite a criação de novos usuários.
                                    <ul>
                                        <li>Sem outros recursos, os usuários criados terão a <a href="[support]settings-general-screen/" target="_blank">Nova função padrão de usuário</a> do seu blog.</li>
                                    </ul>
                                </li>
                            </ul>',
                        ],
                        'delete_users' => [
                            'label' => 'Excluir usuários',
                            'desc' => false,
                        ],
                        'edit_users' => [
                            'label' => 'Editar usuários',
                            'desc' => '<ul>
                                <li>
                                    Permite acesso às opções de <a href="[support]administration-screens/" target="_blank">Telas de administração</a>:
                                    <ul>
                                        <li><a href="[support]administration-screens/#users-your-blogging-family" target="_blank">Usuários</a></li>
                                    </ul>
                                </li>
                            </ul>',
                        ],
                        'list_users' => [
                            'label' => 'Listar usuários',
                            'desc' => '<ul>
                                <li>
                                    Permite acesso às opções de <a href="[support]administration-screens/" target="_blank">Telas de administração</a>:
                                    <ul>
                                        <li><a href="[support]administration-screens/#users-your-blogging-family" target="_blank">Usuários</li>
                                    </ul>
                                </li>
                            </ul>',
                        ],
                        'promote_users' => [
                            'label' => 'Promover usuários',
                            'desc' => '<ul>
                                <li>
                                    Habilita a lista suspensa “Alterar função para…” na lista de usuários admin.
                                    <ul>
                                        <li>Isso não depende do recurso `edit_users.</li>
                                    </ul>
                                </li>
                                <li>Habilita o `Adicionar usuário existente para funcionar em instalações em vários sites.</li>
                            </ul>',
                        ],
                        'remove_users' => [
                            'label' => 'Remover usuários',
                            'desc' => false,
                        ],
                    ],
                ],
                // Themes
                'themes' => [
                    'label' => 'Temas',
                    'caps' => [
                        'switch_themes' => [
                            'label' => 'Alternar temas',
                            'desc' => '<ul>
                                <li>
                                    Permite acesso às opções de <a href="[support]administration-screens/" target="_blank">Telas de administração</a>:
                                    <ul>
                                        <li>Aparência</li>
                                        <li>Aparência > Temas</li>
                                    </ul>
                                </li>
                            </ul>',
                        ],
                        'delete_themes' => [
                            'label' => 'Excluir temas',
                            'desc' => false,
                        ],
                        'edit_themes' => [
                            'label' => 'Editar temas',
                            'desc' => '<ul>
                                <li>Permite acesso a Aparência > <a href="[codex]Appearance_Editor_SubPanel" target="_blank">Editor de tema</a> para editar arquivos de tema.</li>
                            </ul>',
                        ],
                        'edit_theme_options' => [
                            'label' => 'Editar opções de tema',
                            'desc' => '<ul>
                                <li>
                                    Permite acesso às opções de <a href="[support]administration-screens/" target="_blank">Telas de administração</a>:
                                    <ul>
                                        <li>Aparência > <a href="https://codex.wordpress.org/Appearance_Widgets_SubPanel" target="">Widgets</a></li>
                                        <li>Aparência > <a href="[support]appearance-menus-screen/" target="">Menus</a></li>
                                        <li>Aparência > <a href="[support]appearance-customize-screen/" target="">Personalizar</a> se forem compatíveis com o tema atual</li>
                                        <li>Aparência > <a href="https://codex.wordpress.org/Appearance_Header_SubPanel" target="">Cabeçalho</a></li>
                                    </ul>
                                </li>
                            </ul>',
                        ],
                        'install_themes' => [
                            'label' => 'Instalar temas',
                            'desc' => '<ul>
                                <li>
                                    Permite acesso às opções de <a href="[support]administration-screens/" target="_blank">Telas de administração</a>:
                                    <ul>
                                        <li>Aparência > Adicionar novos temas</li>
                                    </ul>
                                </li>
                            </ul>',
                        ],
                        'update_themes' => [
                            'label' => 'Atualizar temas',
                            'desc' => false,
                        ],
                        'upload_themes' => [
                            'label' => 'Fazer upload de temas',
                            'desc' => '<ul>
                                <li>Permite que o usuário faça upload de arquivos ZIP de tema do menu <a href="[codex]Network_Admin#Themes/" target="_blank">Temas de rede</a> -> Adicionar novo</li>
                            </ul>',
                        ],
                    ],
                ],
                // Plugins
                'plugins' => [
                    'label' => 'Plugins',
                    'caps' => [
                        'activate_plugins' => [
                            'label' => 'Ativar plugins',
                            'desc' => '<ul>
                                <li>
                                    Permite acesso às opções de <a href="[support]administration-screens/" target="_blank">Telas de administração</a>:
                                    <ul>
                                        <li><a href="[support]administration-screens/#plugins-add-functionality-to-your-blog" target="_blank">Plugins</a></li>
                                    </ul>
                                </li>
                            </ul>',
                        ],
                        'delete_plugins' => [
                            'label' => 'Excluir plugins',
                            'desc' => false,
                        ],
                        'edit_plugins' => [
                            'label' => 'Editar plugins',
                            'desc' => '<ul>
                                <li>
                                    Permite acesso às opções de <a href="[support]administration-screens/" target="_blank">Telas de administração</a>:
                                    <ul>
                                        <li><a href="[support]administration-screens/#plugins-add-functionality-to-your-blog" target="_blank">Plugins</a> > <a href="[support]administration-screens/# plugin-editor" target="_blank">Editor de plugin</a></li>
                                    </ul>
                                </li>
                            </ul>',
                        ],
                        'install_plugins' => [
                            'label' => 'Instalar plug-ins',
                            'desc' => '<ul>
                                <li>
                                    Permite acesso às opções de <a href="[support]administration-screens/" target="_blank">Telas de administração</a>:
                                    <ul>
                                        <li><a href="[support]administration-screens/#plugins-add-functionality-to-your-blog" target="_blank">Plugins</a> > Adicionar novo</li>
                                    </ul>
                                </li>
                            </ul>',
                        ],
                        'update_plugins' => [
                            'label' => 'Atualizar plug-ins',
                            'desc' => false,
                        ],
                        'upload_plugins' => [
                            'label' => 'Fazer upload de plug-ins',
                            'desc' => '<ul>
                                <li>Permite que o usuário faça upload de arquivos ZIP de plug-in do menu Plugins de rede -> Adicionar novo</li>
                            </ul>',
                        ],
                    ],
                ],
                // Files
                'files' => [
                    'label' => 'Arquivos e mídia',
                    'caps' => [
                        'upload_files' => [
                            'label' => 'Fazer upload de arquivos',
                            'desc' => '<ul>
                                <li>
                                    Permite acesso às opções de <a href="[support]administration-screens/">Telas de administração</a>:
                                    <ul>
                                        <li>Media</li>
                                        <li>Media > Adicionar nova</li>
                                    </ul>
                                </li>
                            </ul>',
                        ],
                        'unfiltered_upload' => [
                            'label' => 'Upload não filtrado',
                            'desc' => 'Fazer upload de arquivos não filtrados',
                        ],
                    ],
                ],
                // Pages
                'pages' => [
                    'label' => 'Páginas',
                    'caps' => [
                        'delete_pages' => [
                            'label' => 'Excluir páginas',
                            'desc' => false,
                        ],
                        'delete_others_pages' => [
                            'label' => 'Excluir outras páginas',
                            'desc' => false,
                        ],
                        'delete_published_pages' => [
                            'label' => 'Excluir páginas publicadas',
                            'desc' => false,
                        ],
                        'delete_private_pages' => [
                            'label' => 'Excluir páginas privadas',
                            'desc' => false,
                        ],
                        'edit_others_pages' => [
                            'label' => 'Editar outras páginas',
                            'desc' => false,
                        ],
                        'edit_pages' => [
                            'label' => 'Subir arquivos',
                            'desc' => '<ul>
                                <li>
                                    Permite acesso às opções de <a href="[support]administration-screens/">Telas de administração</a>Telas de administração</a>
                                    <ul>
                                        <li>Páginas</li>
                                        <li>Páginas > Adicionar nova</li>
                                    </ul>
                                </li>
                            </ul>',
                        ],
                        'edit_published_pages' => [
                            'label' => 'Editar páginas publicadas',
                            'desc' => false,
                        ],
                        'edit_private_pages' => [
                            'label' => 'Editar páginas privadas',
                            'desc' => false,
                        ],
                        'publish_pages' => [
                            'label' => 'Publicar páginas',
                            'desc' => false,
                        ],
                        'read_private_pages' => [
                            'label' => 'Ler páginas privadas',
                            'desc' => false,
                        ],
                    ],
                ],
            ];

            // Custom post types
            $types = array_merge(
                [ 'post' => 'post' ],
                get_post_types([ '_builtin' => false ])
            );

            if( !empty( $types ) ):

                // Each post type
                foreach( $types as $ptype ):

                    // Post type
                    $ptype = get_post_type_object( $ptype );
                    if( $ptype->name != 'post' && $ptype->capability_type == 'post' ) continue;

                    // Gender
                    $gender = _object_get( $ptype, 'gender' );

                    $type_caps = [];
                    foreach( $ptype->cap as $type_cap => $custom_cap ):

                        if( in_array( $type_cap, [ 'edit_post', 'read_post', 'delete_post', 'create_posts' ] ) ):
                            continue;
                        endif;

                        switch( $type_cap ):
                            case 'edit_post':
                                $cap_label = 'Editar ' . $ptype->labels->singular_name;
                            break;
                            case 'read_post':
                                $cap_label = 'Ver ' . $ptype->labels->singular_name;
                            break;
                            case 'delete_post':
                                $cap_label = 'Excluir ' . $ptype->labels->singular_name;
                            break;
                            case 'edit_posts':
                                $cap_label = 'Editar ' . $ptype->labels->name;
                            break;
                            case 'edit_others_posts':
                                $cap_label = 'Editar outr'. $gender .'s ' . $ptype->labels->name;
                            break;
                            case 'delete_posts':
                                $cap_label = 'Excluir ' . $ptype->labels->name;
                            break;
                            case 'publish_posts':
                                $cap_label = 'Publicar ' . $ptype->labels->name;
                            break;
                            case 'read_private_posts':
                                $cap_label = 'Ver ' . $ptype->labels->name . ' privad'. $gender .'s';
                            break;
                            case 'read':
                                $cap_label = 'Ver ' . $ptype->labels->name;
                            break;
                            case 'delete_private_posts':
                                $cap_label = 'Excluir ' . $ptype->labels->name . ' privad'. $gender .'s';
                            break;
                            case 'delete_published_posts':
                                $cap_label = 'Excluir ' . $ptype->labels->name . ' publicad'. $gender .'s';
                            break;
                            case 'delete_others_posts':
                                $cap_label = 'Excluir outr'. $gender .'s ' . $ptype->labels->name;
                            break;
                            case 'edit_private_posts':
                                $cap_label = 'Editar ' . $ptype->labels->name . ' privad'. $gender .'s';
                            break;
                            case 'edit_published_posts':
                                $cap_label = 'Editar ' . $ptype->labels->name . ' publicad'. $gender .'s';
                            break;
                            case 'create_posts':
                                $cap_label = 'Criar ' . $ptype->labels->name;
                            break;
                            default:
                            break;
                        endswitch;

                        $type_caps[ $custom_cap  ] = [
                            'label' => $cap_label,
                            'desc' => false
                        ];
                    
                    endforeach;

                    $caps[ $ptype->name ] = [
                        'label' => $ptype->labels->name,
                        'caps' => $type_caps
                    ];
                    
                endforeach;

            endif;

            // Comments
            $caps[ 'comments' ] = [
                'label' => 'Comentários',
                'caps' => [
                    'moderate_comments' => [
                        'label' => 'Moderar comentários',
                        'desc' => '<ul>
                            <li>
                                Permite que os usuários moderem comentários na tela de comentários (embora um usuário precise do recurso <a href="[support]roles-and-capabilities/#edit_posts" target="_blank">edit_posts</a> para acessá-lo)
                            </li>
                        </ul>',
                    ],
                    'edit_comment' => [
                        'label' => 'Editar comentário',
                        'desc' => false,
                    ],
                ],
            ];

            $this::$caps = $caps;

        endif;

        return $this::$caps;

    }

    // Get options
    public function getOptions(){
        if( is_null( $this->options ) ):
            $this->options = get_option( 'pikiroles_options' );
        endif;
        return $this->options;
    }

    // Get all roles
    public function getRoles(){
        if( empty( $this->roles ) ):
            $this->roles = get_editable_roles();
        endif;
        return $this->roles;
    }

    // Change cap
    public function changeCap(){

        if( !is_user_logged_in() ):
            Piki::error( 'Você precisa se logar para realizar esta ação.' );
        elseif( !current_user_can( 'promote_users' ) ):
            Piki::error( 'Você não tem permissão para executar esta ação.' );
        endif;

        // Options
        $role_name = _post( 'role' );
        $cap_key = _post( 'capability' );
        $status = _post( 'status' );

        if( !$role_name || !$cap_key || !$status ):
            Piki::error( 'Dados incompletos.' );
        endif;

        $role_obj = get_role( $role_name );
        if( empty( $role_obj ) ):
            Piki::error( 'O papel de usuário não existe.' );
        endif;

        // Changing
        if( $status == 'insert' ):
            $role_obj->add_cap( $cap_key );
        else:
            $role_obj->remove_cap( $cap_key );
        endif;

        Piki::success( 'Permissão ' . ( $status == 'insert' ? 'adicionada' : 'removida' ) . ' com sucesso.' );
        
    }

    // Add options page
    public function add_plugin_page() {

        $this->options = $this->getOptions();
        
        add_submenu_page(
            'piki-dashboard',
            'Roles',
            'Roles',
            'manage_options',
            'piki-roles-settings',
            array( $this, 'create_admin_page' )
        );

    }

    // Options page callback
    public function create_admin_page(){

        // Scripts and CSS
        $this->add_main_files(); ?>

        <div class="wrap">
            <h2>Papéis de usuários:</h2>           
            <form method="post" action="options.php" id="pikiroles"><?php
                // This prints out all hidden setting fields
                settings_fields( 'pikiroles_option_group' );   
                do_settings_sections( 'pikiroles-setting-admin' );
                submit_button(); ?>
            </form>
        </div><?php

    }
    
    // Register and add settings
    public function page_init() {

        global $PIKISHARE_NETWORKS;

        // Configuraçõe gerais
        register_setting(
            'pikiroles_option_group', // Option group
            'pikiroles_options', // Option name
            [
                'sanitize_callback' => [ $this, 'sanitize' ] // Sanitize
            ]
        );

            // Capabilities
            add_settings_section(
                'pikiroles_setting', // ID
                'Permissões para o papel de usuário', // Title
                FALSE, // Callback
                'pikiroles-setting-admin' // Page
            ); 
                // Fields
                add_settings_field(
                    $key, // ID
                    'Selecione um papel de usuário:', // Title 
                    array( $this, 'field_caps'  ), // Callback
                    'pikiroles-setting-admin', // Page
                    'pikiroles_setting',   
                );      

            // Cache Settings
            add_settings_section(
                'pikiroles_multiple_options', // ID
                'Opções de abertura dos links', // Title
                FALSE, // Callback
                'pikiroles-setting-admin' // Page
            ); 
                // Fields
                add_settings_field(
                    'target', // ID
                    '<label for="pikiroles_multiple">Permitir mais de uma role por usuário</label>', // Title 
                    [ $this, 'field_multiple' ], // Callback
                    'pikiroles-setting-admin', // Page
                    'pikiroles_multiple_options' // Section           
                );      
    
    }


    // Capabilities three
    
        public function field_caps(){

            // Role select
            $roles = reset( wp_roles() );
            echo select::get_field([
                'id' => 'role-selection',
                'name_html' => 'role',
                'options' => array_combine( array_keys( $roles ), array_column( $roles, 'name' ) ),
                'value' => $this::$actualRole,
            ]);

            // Actual
            $role = _array_get( $roles, $this::$actualRole );
            $role_caps = $role[ 'capabilities' ];

            // Caps
            $caps_list = $this->getCaps();
            
            echo '<div id="pikiroles-caps" class="piki-sanfona list-caps">';         
            foreach( $caps_list as $kc => $cap ):
                echo '
                <div class="item">
                    <header data-target="'. $kc .'">
                        <a>
                            <h3>'. $cap[ 'label' ] .'</h3>
                        </a>
                    </header>
                    <div class="item-content">
                        <ul>';
                        foreach( $cap[ 'caps' ] as $key => $cap ):
                            
                            $active = on( $role_caps, $key );
                            echo '<li><button type="button" data-cap-key="'. $key .'" class="button '. ( $active ? 'button-primary' : '' ) .'" title="'. ( $active ? 'Remover' : 'Adicionar' ) .' permissão">'. $cap[ 'label' ] .'</button></li>';
                        
                        endforeach;
                        echo '
                        </ul>
                    </div>
                </div>
                ';
            endforeach; 
            echo '
                <input type="hidden" id="role" value="'. $this::$actualRole .'">
            </div>';

        }

    // Multiple

        public function field_multiple(){
            echo '<input type="checkbox" id="pikiroles_multiple" name="pikiroles_options[multiple]" value="on"', ( on( $this->options, 'multiple' ) ? ' checked="checked"' : '' ), '">';
        }

    // Sanitize
    public function sanitize( $values ){
        // Multiple roles
        $values[ 'multiple' ] = on( $values, 'multiple' ) ? 'on' : 'off';
        return $values;
    }

    // Scripts para as páginas de edição
    public function admin_enqueue_styles( $handle ) {
        if( in_array( $handle, $this->addfiles ) ):
            wp_add_inline_style( 'pkroles-styles', 'label[for="role"],select#role{display:none;}' );
        endif;
    }

    // Todas as roles
    private function all_roles(){
        static $allroles;
        if( empty( $this->allroles ) ):
            $this->allroles = get_editable_roles();
        endif;
        return $this->allroles;
    }

    public function multiple_roles_widget( $user ) {

        global $pagenow;

        // Roles do usuário
        $user_roles = array();

        // Edição ou criação de usuáro
        $exists = is_object( $user ) && isset( $user->ID );

        // Permissões
        if( ( $exists && !current_user_can( 'edit_user', $user->ID ) ) || ( !$exists && !current_user_can( 'create_users' ) ) ):
            return;
        endif;

        // Todas as roles
        $allroles = $this->getRoles();
        
        // Edição
        if( $exists ):
            $user_roles = array_intersect( array_values( $user->roles ), array_keys( $allroles ) );
        // Criação
        else:
            $user_roles = in_array( $_POST[ 'pkroles_user_roles' ], array_keys( $allroles ) );
        endif; ?>
        <div id="pkroles-widget-wrapper">
            <h3><?php _e( 'User Roles', 'pkroles' ); ?></h3>
            <table class="form-table">
                <tr id="pkroles-widget">
                    <th>
                        <label for="user-roles"><?php _e( 'Roles', 'pkroles' ); ?></label>
                    </th>
                    <td>
                        <?php 
                        foreach ( $allroles as $id => $role ): 
                            $key = 'pkrole-user-role-' . esc_attr( $id );
                            $checked = ( $pagenow == 'user-edit.php' && in_array( $id, $user_roles ) ) ? ' checked="checked"' : '';?>
                            <p><label for="<?php echo $key; ?>"><input type="checkbox" name="pkrole-user-roles[]" id="<?php echo $key; ?>" value="<?php echo esc_attr( $id ); ?>" <?php echo $checked; ?> /><?php echo $role[ 'name' ]; ?></label></p>
                        <?php 
                        endforeach; 
                        wp_nonce_field( 'pkroles_update_roles', 'pkroles_nonce' ); ?>
                    </td>
                </tr>
            </table>
        </div>
        <script type="text/javascript">
            (function($){
                $(function(){
                    var $pkrole_widget = $( 'tr#pkroles-widget' ).first();
                    $( 'select#role' ).parents( 'tr.user-role-wrap' ).replaceWith( $pkrole_widget );
                    $( '#pkroles-widget-wrapper' ).remove();
                });
            })(jQuery);
        </script><?php 
    
    }

    public function save_user_roles( $user_id ) {

        // Nonce
        if( !wp_verify_nonce( _post( 'pkroles_nonce' ), 'pkroles_update_roles' ) ):
            return;
        endif;

        // Permissões
        if( !current_user_can( 'edit_user', $user_id ) ):
            return;
        endif;

        // Usuário postado
        $user = get_user_by( 'id', $user_id );
        
        // Roles postadas
        $posteds_roles = is_array( _post( 'pkrole-user-roles' ) ) ? _post( 'pkrole-user-roles' ) : [];

        // Todas as roles
        $allroles = $this->getRoles();

        // Verifica todas as roles existentes
        foreach( $allroles as $role_key => $role ):

            // Se devemos atribuir a role ao usuário
            if( in_array( $role_key, $posteds_roles ) && ( !isset( $user->caps[ $role_key ] ) || $user->caps[ $role_key ] !== true ) ):
                
                $user->add_role( $role_key );
           
            // Se devemos remover a role do usuário 
            elseif( !in_array( $role_key, $posteds_roles ) && ( isset( $user->caps[ $role_key ] ) && $user->caps[ $role_key ] === true ) ):
                
                $user->remove_role( $role_key );
           
            endif;
       
       endforeach;

    }

    // Adiciona a coluna de multiplas roles na listagem administrativa
    public function roles_colum( $cols ){
        
        // Guarda a coluna de posts
        $posts_colum = isset( $cols[ 'posts' ] ) ? $cols[ 'posts' ] : false;
        
        // Remove a coluna 'role' e a de 'posts'
        unset( $cols[ 'role' ], $cols[ 'posts' ] );
        
        // Adicionamos nossa coluna
        $cols[ 'pkroles' ] = __( 'Roles', 'pkroles' );
        
        // Se tinhamos uma coluna de posts, reinserimos
        if ( $posts_colum ):
            $cols[ 'posts' ] = $posts_colum;
        endif;
        
        return $cols;
    
    }

    // Adiciona a coluna de multiplas roles na listagem administrativa
    public function display_roles_colum( $value, $colum, $user_id ){

        // Apenas a nossa coluna
        if( $colum !== 'pkroles' ):
            return $value;
        endif;

        // Usuário postado
        $user = get_user_by( 'id', $user_id );

        // Todas as roles
        $allroles = $this->getRoles();

        // Labels
        $to_show = array();
        foreach( $user->roles as $user_role ):
            $to_show[] = $allroles[ $user_role ][ 'name' ];
        endforeach;

        // Retorna os labels das roles, implodidos.
        return implode( ', ', $to_show );
    
    }

    // Arquivos principais dos forms
    public function add_main_files(){
        // Libraries
        Piki::add_library( 'message' );
        Piki::add_library( 'sanfona' );
        // Scripts
        wp_enqueue_script( 'pikiroles-scripts', Piki::minified( 'scripts.js', __FILE__ ), array( 'jquery' ), false, true );
        // Forms styles
        wp_enqueue_style( 'pikiroles-styles', Piki::url( 'styles.css', __FILE__ ) );
    }

}

// Inicia
$PKRoles = new PKRoles();

