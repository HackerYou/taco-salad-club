import React from 'react';

export default function ClubItem(props) {
	return <li>{props.data.item} - {props.data.name}</li>
}