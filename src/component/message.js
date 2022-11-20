import { useEffect } from "react";

const Message = (props) => {


	return (
		<div
			style={{
				position: 'fixed',
				top: '10%',
				left: '50%',
                height: '50px',
                width: '200px',
                backgroundColor: 'white',
			}}>
			<p>{props.content}</p>
		</div>
	);
};

export default Message;
