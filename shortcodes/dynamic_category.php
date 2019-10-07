<?php 
/**
 * ShortCodes For Fetching Category
 *
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'init', 'lister_app_dynamic_category_block' );

function lister_app_dynamic_category_block() {
	register_block_type( 'listerapp/dynamiccategory',
		array(
			'attributes' => array(
				'numberOfPost' => array(
					'type' => 'number',
					'default' => -1, 
				),
				'selectedTaxonomy' => array(
					'type' => 'string',
					'default' => '', 
				),
			),
			'editor_script' => 'listerapp-cgb-block-js',
			'render_callback' => 'lister_app_dynamic_category_block_callback'
		)
	);
}

function lister_app_dynamic_category_block_callback( $attributes, $content ) {
	$post_per_page = $attributes && $attributes['numberOfPost'] ? $attributes['numberOfPost'] : -1;
	$chosen_taxonomy = $attributes && $attributes['selectedTaxonomy'] ? $attributes['selectedTaxonomy'] : null;

	$args = array(
		'posts_per_page'   => $post_per_page,
		'category'         => $chosen_taxonomy,
		'orderby'          => 'date',
		'order'            => 'DESC',
		'post_type'        => 'post',
		'post_status'      => 'publish',

	);
	$posts_array = get_posts( $args );

	if ( count( $posts_array ) === 0 ) {
			return 'No posts';
	}
	$output = '';
	foreach ($posts_array as $post) {
		$output .= '<div class="posts-class">';
			$output .= '<a href="'.esc_url( get_permalink($post->ID) ).'">'.$post->post_title.'</a>';
			$output .= '<p>'.$post->post_content.'</p>';
		$output .= '</div>';
	}
	return $output;
}