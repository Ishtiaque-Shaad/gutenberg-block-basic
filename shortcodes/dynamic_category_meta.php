<?php 
/**
 * ShortCodes For Fetching Category Meta
 *
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'init', 'lister_app_dynamic_category_meta_block' );

function lister_app_dynamic_category_meta_block() {
	register_block_type( 'listerapp/dynamiccategorymeta',
		array(
			'attributes' => array(
				'selectedPostTypes' => array(
					'type' => 'string',
					'default' => '', 
				),
				'selectedTaxonomy' => array(
					'type' => 'string',
					'default' => '', 
				),
			),
			'editor_script' => 'listerapp-cgb-block-js',
			'render_callback' => 'lister_app_dynamic_category_meta_block_callback'
		)
	);
}

function lister_app_dynamic_category_meta_block_callback( $attributes, $content ) {
	$chosen_postType = $attributes && $attributes['selectedPostTypes'] ? $attributes['selectedPostTypes'] : null;
	$chosen_taxonomy = $attributes && $attributes['selectedTaxonomy'] ? $attributes['selectedTaxonomy'] : null;
  
  $args = array(
    'public'   => true,
  );

	$post_types = get_post_types($args);
	$terms = get_terms( array(
		'taxonomy' => $chosen_taxonomy,
    'hide_empty' => false,
	) );
  
	$html = '';
	foreach ($terms as $single_term) {
		$term_meta_data = get_term_meta($single_term->term_id);
		$html .= '<div class="posts-class">';
			$html .= '<a href="'.esc_url( get_term_link($single_term->term_id) ).'">'.$single_term->name.'</a>';
			foreach ($term_meta_data as $key => $value) {
				$term_data = maybe_unserialize($value[0]);
				switch ($key) {
					case "imageupload_60":
						$img_link = $term_data ? $term_data[0]['url'] : '';
						$html .= '<img src="'.$img_link.'" alt="'.$key.'" />';
						break;
					case "text_97":
						$html .= '<p>'.$term_data.'</p>';
						break;
				}
			}
			$html .= '<p>'.$single_term->description.'</p>';
		$html .= '</div>';
	}
	return $html;
}