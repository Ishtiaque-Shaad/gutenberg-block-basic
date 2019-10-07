<?php 
/**
 * ShortCodes For Fetching Recent Posts
 *
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


add_action( 'init', 'lister_app_dynamic_post_block' );

function lister_app_dynamic_post_block() {
	register_block_type( 'listerapp/dynamicpost', array(
		'editor_script' => 'listerapp-cgb-block-js',
		'render_callback' => 'lister_app_dynamic_post_block_callback'
	) );
}
function lister_app_dynamic_post_block_callback( $attributes, $content ) {	
    $recent_posts = wp_get_recent_posts( array(
        'numberposts' => $attributes && $attributes['numberOfPost'] ? $attributes['numberOfPost'] : 2,
        'post_status' => 'publish',
		) );
    if ( count( $recent_posts ) === 0 ) {
        return 'No posts';
		}
		$output = '';
		foreach ($recent_posts as $recent_post) {
			$output .= '<div class="posts-class">';
				$output .= '<a href="'.esc_url( get_permalink($recent_post['ID']) ).'">'.$recent_post['post_title'].'</a>';
			$output .= '</div>';
		}
		return $output;
}