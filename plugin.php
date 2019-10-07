<?php
/**
 * Plugin Name: listerapp — CGB Gutenberg Block Plugin
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: listerapp — is a Gutenberg plugin created via create-guten-block.
 * Author: mrahmadawais, maedahbatool
 * Author URI: https://AhmadAwais.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

/**
 * ShortCode Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'shortcodes/dynamic_post.php';
require_once plugin_dir_path( __FILE__ ) . 'shortcodes/dynamic_category.php';
require_once plugin_dir_path( __FILE__ ) . 'shortcodes/dynamic_category_meta.php';
