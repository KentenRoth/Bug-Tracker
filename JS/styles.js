lastActive = [];

isActive = () => {
	var activeElement = document.activeElement.id;
	var element = document.getElementById(activeElement + 'Input');
	element.classList.add('active');
	lastActive.push(document.activeElement.id + 'Input');
};

notActive = () => {
	const notActive = lastActive[0];
	const element = document.getElementById(notActive);
	element.classList.remove('active');
	lastActive.length = 0;
};
