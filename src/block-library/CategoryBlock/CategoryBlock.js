/**
 * BLOCK: listerapp
 *
 * Registering a Category block with Gutenberg.
 * Block to renders and saves the category
 */

// Import Component JS
import ListerSelectBox from '../../Component/ListerSelectBox/index';

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

export default registerBlockType( 'listerapp/dynamiccategory', {
	title: 'ListerApp Dynamic Category',
	icon: 'list-view',
	category: 'common',
	attributes: {
		numberOfPost: {
			type: 'number',
			default: -1,
		},
		selectedTaxonomy: {
			type: 'string',
			default: '',
		},
	},
	edit: withSelect( ( select, props ) => {
		const {
			attributes: { numberOfPost, selectedTaxonomy },
		} = props;

		const { getEntityRecords } = select( 'core' );
		const { isResolving } = select( 'core/data' );
		const taxQuery = { per_page: -1, hide_empty: false };
		const postQuery = {
			categories: selectedTaxonomy ? selectedTaxonomy : '',
			per_page: numberOfPost ? numberOfPost : -1,
			orderby: 'modified',
			order: 'asc',
			status: 'publish',
		};

		const taxonomy = getEntityRecords( 'taxonomy', 'category', taxQuery );
		const posts = getEntityRecords( 'postType', 'post', postQuery );
		const isRequesting = isResolving(
			'core',
			'getEntityRecords',
			[ 'postType', 'post', postQuery ],
			[ 'taxonomy', 'category', taxQuery ]
		);

		return { taxonomy, posts, isRequesting };
	} )( props => {
		const {
			posts,
			taxonomy,
			className,
			attributes: { numberOfPost, selectedTaxonomy },
			setAttributes,
		} = props;

		const tempArray = [
			{
				label: 'select a taxonomy',
				value: '',
				taxonomy: '',
			},
		];

		for ( let i = 0; taxonomy && i < taxonomy.length; i++ ) {
			const tempOptions = {};
			tempOptions.taxonomy = taxonomy[ i ].taxonomy;
			tempOptions.label = taxonomy[ i ].name;
			tempOptions.value = taxonomy[ i ].id;
			tempArray.push( tempOptions );
		}

		let fetchedPosts = [];

		if ( selectedTaxonomy !== null ) {
			fetchedPosts = posts;
		} else {
			fetchedPosts = [];
		}

		if ( ! fetchedPosts ) {
			return 'Loading...';
		}

		const handlePostNumber = e => {
			setAttributes( { numberOfPost: e.target.value } );
		};

		const updateFunc = value => {
			setAttributes( { selectedTaxonomy: value } );
		};

		return (
			<Fragment>
				{ fetchedPosts && fetchedPosts.length !== 0 ?
					fetchedPosts.map( ( singlePost, i ) => {
						return (
							<div key={ i }>
								<a className={ className } href={ singlePost.link }>
									{ singlePost.title.rendered }
								</a>
								{ singlePost.content.rendered }
							</div>
						);
					  } ) :
					'No Post is Fetched!' }

				<InspectorControls>
					<div>
						Choose Number of Post/Posts
						<input
							type="number"
							value={ numberOfPost }
							onChange={ handlePostNumber }
						/>
					</div>
					<div>
						<ListerSelectBox
							label={ __( 'Select Taxonomy :' ) }
							previousValue={ selectedTaxonomy }
							update={ taxValue => updateFunc( taxValue ) }
							dataArray={ tempArray }
						/>
					</div>
				</InspectorControls>
			</Fragment>
		);
	} ),
	save: () => {
		return null;
	},
} );
