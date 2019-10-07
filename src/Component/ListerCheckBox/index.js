import React, { Fragment } from 'react';

const ListerCheckBox = props => {
	const { data, name, updateCheckBox, defaultValue } = props;

	let checked = '';
	if ( defaultValue === data ) {
		checked = 'checked';
	} else {
		checked = '';
	}

	return (
		<Fragment>
			<label htmlFor={ data }>
				<input
					type="radio"
					name={ name }
					id={ data }
					value={ data }
					checked={ checked }
					onChange={ e => updateCheckBox( e.target.value ) }
				/>{ ' ' }
				{ data }
			</label>
		</Fragment>
	);
};

export default ListerCheckBox;
