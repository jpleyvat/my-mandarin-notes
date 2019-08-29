let section = null;
let note = null;

function createNode(hanzi, meaning, pronunciation) {
	note.classList.add('character-note');

	let hanziText = document.createTextNode(hanzi);
	let hanziTag = document.createElement('p');
	hanziTag.appendChild(hanziText);
	let meaningText = document.createTextNode(meaning);
	let pronunciationText = document.createTextNode(pronunciation);
	appendElement(note, hanziTag, 'character');
	appendElement(note, meaningText, 'text');
	appendElement(note, pronunciationText, 'pronunciation');
	appendElement(note, null, 'space');
}

function appendElement(parent, text, classToAdd) {
	let div = document.createElement('div');
	div.classList.add('square');
	let line = document.createElement('div');
	line.classList.add('line');
	div.appendChild(line);
	if (text) {
		div.appendChild(text);
	}
	if (classToAdd) {
		div.classList.add(classToAdd);
	}
	parent.appendChild(div);
	// section.appendChild(parent);
}

function createTittle() {
	note = document.createElement('div');

	let divTittle = document.createElement('div');
	divTittle.classList.add('square', 'tittle');

	let div = document.createElement('div');
	div.id = 'left';
	div.classList.add('square');
	let div2 = document.createElement('div');
	div2.id = 'right';
	div2.classList.add('square');

	let line = document.createElement('div');
	line.classList.add('line');
	let line2 = document.createElement('div');
	line2.classList.add('line');

	let tittle = document.createElement('h1');

	div.appendChild(line);
	div2.appendChild(line2);
	tittle.appendChild(document.createTextNode(section.id.toUpperCase()));

	divTittle.appendChild(div);
	divTittle.appendChild(tittle);
	divTittle.appendChild(div2);

	// appendElement(divTittle, line, null);

	note.appendChild(divTittle);
	section.appendChild(note);
}
