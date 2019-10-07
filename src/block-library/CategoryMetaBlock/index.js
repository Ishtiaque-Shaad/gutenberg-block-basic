/**
 * BLOCK: listerapp
 *
 * Registering a Category block with Gutenberg.
 * Block to renders and saves the category meta data
 */

// Import Component JS
import ListerSelectBox from '../../Component/ListerSelectBox/index';
import ListerCheckBox from '../../Component/ListerCheckBox/index';
//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { withSelect } = wp.data;
const {
	RichText,
	InspectorControls,
	PanelColorSettings,
	BlockControls,
} = wp.editor;

export default registerBlockType( 'listerapp/dynamiccategorymeta', {
	title: 'ListerApp Dynamic Category Meta',
	icon: 'excerpt-view',
	category: 'common',
	attributes: {
		selectedPostTypes: {
			type: 'string',
			default: '',
		},
		selectedTaxonomy: {
			type: 'string',
			default: '',
		},
	},
	edit: withSelect( ( select, props ) => {
		const {
			attributes: { selectedPostTypes, selectedTaxonomy },
		} = props;

		const { getEntityRecords } = select( 'core' );
		const { getPostTypes, getTaxonomies } = select( 'core' );
		const taxQuery = {
			per_page: -1,
			hide_empty: false,
			post_type: selectedPostTypes,
		};
		const postTypes = getPostTypes();
		const matchedPostType =
			postTypes && postTypes.find( obj => obj.slug === selectedPostTypes );
		let fetchTaxonomy = [];
		if ( matchedPostType ) {
			for ( const key in matchedPostType ) {
				if ( key === 'taxonomies' ) {
					const index = matchedPostType[ key ].indexOf( selectedTaxonomy );
					if ( index !== -1 ) {
						fetchTaxonomy = getEntityRecords(
							'taxonomy',
							selectedTaxonomy,
							taxQuery
						);
					} else {
						fetchTaxonomy = [];
					}
				}
			}
		}
		const taxonomy = fetchTaxonomy;
		return { postTypes, taxonomy };
	} )( props => {
		const {
			postTypes,
			taxonomy,
			className,
			attributes: { selectedPostTypes, selectedTaxonomy },
			setAttributes,
		} = props;

		const tempPostArray = [
			{
				label: 'select a post type',
				value: '',
				taxonomy: '',
			},
		];
		let tempTaxArray = [];

		for ( let i = 0; postTypes && i < postTypes.length; i++ ) {
			const tempOptions = {};
			tempOptions.taxonomy = postTypes[ i ].taxonomies;
			tempOptions.label = postTypes[ i ].name;
			tempOptions.value = postTypes[ i ].slug;
			tempPostArray.push( tempOptions );
		}

		const selectedPostTax = tempPostArray.find(
			o => o.value === selectedPostTypes
		);

		if ( selectedPostTax ) {
			tempTaxArray = selectedPostTax ? selectedPostTax.taxonomy : [];
		}

		if ( ! taxonomy ) {
			return 'Loading...';
		}

		const updatePostFunc = value => {
			setAttributes( { selectedPostTypes: value } );
		};
		const updateTaxFunc = value => {
			setAttributes( { selectedTaxonomy: value } );
		};

		return (
			<Fragment>
				<div>
					{ taxonomy &&
						taxonomy.map( ( single, key ) => {
							const termMetaImage = single ?
								single.metadata.imageupload_60[ 0 ].url :
								'';
							return (
								<div key={ key }>
									<img src={ termMetaImage } alt={ single.name } />
									<a href={ single.link }>{ single.name }</a>
									<span>
										{ single.description } - [ Post Count : { single.count }]
									</span>
								</div>
							);
						} ) }
				</div>
				<InspectorControls>
					<div>
						<ListerSelectBox
							label={ __( 'Select a Post Type : ' ) }
							previousValue={ selectedPostTypes }
							update={ taxValue => updatePostFunc( taxValue ) }
							dataArray={ tempPostArray }
						/>
						<div>
							{ selectedPostTypes !== '' ?
								tempTaxArray &&
								  tempTaxArray.map( ( single, key ) => {
								  	return (
									<div key={ key }>
								  			<ListerCheckBox
											defaultValue={ selectedTaxonomy }
											name="selected-taxonomy"
											data={ single }
											updateCheckBox={ value => updateTaxFunc( value ) }
								  			/>
								  		</div>
								  	);
								  } ) :
								'Choose Post Type!' }{ ' ' }
						</div>
					</div>
				</InspectorControls>
			</Fragment>
		);
	} ),
	save: () => {},
} );
