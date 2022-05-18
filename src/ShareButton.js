import React from 'react';

export default function ShareButton(props) {
  return (
    <div className={`social-button social-button-${props.platform}`}>
      <a href={props.url} title={props.title} target="_blank" rel="noopener noreferrer">{props.icon}</a>
    </div>
  );
}
