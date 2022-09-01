import { RichText, InnerBlocks } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

import "./teamBlock.scss";

registerBlockType('jeo-theme/custom-team-block', {
    title: __('Team', "jeo"),
    icon: 'buddicons-buddypress-logo',
    category: 'common',
    keywords: [
        __('Team', 'jeo'),
        __('Members', 'jeo'),
	],
	supports: {
		align: true,
	},
	attributes: {
		title: {
			type: "string",
		},
	},

    edit(props) {
        const {
			className,
			isSelected,
			attributes: {
			  title,
			},
			setAttributes,
        } = props;

        const TEMPLATE =  [['jeo-theme/team-member']];

        return (
			<>
				<div className="team-members">
						<RichText
							tagName="h2"
							className="gallery-title"
							value={ title }
							onChange={ ( title ) => {
								setAttributes( { title } )
							} }
							placeholder={ __( 'Type a team section title', 'jeo' ) } 
						/>
						<InnerBlocks
							allowedBlocks={[ 'jeo-theme/team-member' ]}
							template={TEMPLATE}
						/>
				</div>
			</>
		);
    },

    save: (props) => {
        const {
			className,
			isSelected,
			attributes: {
			  title,
			},
			setAttributes,
		  } = props;


        return (
			<>	
				<div className="team-members">
                    <RichText.Content tagName="h2" value={ title } />
					<div className="team-members--content">
						<InnerBlocks.Content/>
					</div>
				</div>
			</>
		);

    },
});