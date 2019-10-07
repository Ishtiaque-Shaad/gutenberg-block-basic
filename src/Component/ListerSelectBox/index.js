import React, { Fragment, useState } from 'react';
import { SelectControl, CheckboxControl } from '@wordpress/components';
import PropTypes from 'prop-types';

const ListerSelectBox = props => {
	const { dataArray, update, previousValue, label } = props;
	const [ data, setData ] = useState( previousValue || '' );
	const handleUpdateData = value => {
		setData( value );
	};
	update( data );
	return (
		<Fragment>
			<SelectControl
				label={ label }
				value={ data }
				onChange={ data => handleUpdateData( data ) }
				options={ dataArray }
			/>
		</Fragment>
	);
};

ListerSelectBox.propTypes = {
	label: PropTypes.string,
	previousValue: PropTypes.string,
	dataArray: PropTypes.array,
	update: PropTypes.func,
};

export default ListerSelectBox;
