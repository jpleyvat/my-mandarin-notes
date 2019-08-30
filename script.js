class Section {
	constructor(section) {
		this.section = section;

		// Elements asignment
		let [divTittle, div, div2, line, line2, tittle] = [
			this.createDiv(),
			this.createDiv(),
			this.createDiv(),
			this.createDiv(),
			this.createDiv(),
			document.createElement('h1')
		];

		// Class asignments
		divTittle.classList.add('square', 'tittle'),
			div.classList.add('square'),
			div2.classList.add('square'),
			line.classList.add('line'),
			line2.classList.add('line');

		// Element nestings
		div.appendChild(line),
			div2.appendChild(line2),
			tittle.appendChild(
				document.createTextNode(section.id.toUpperCase())
			),
			divTittle.appendChild(div),
			divTittle.appendChild(tittle),
			divTittle.appendChild(div2),
			section.appendChild(divTittle);
	}

	createDiv() {
		return document.createElement('div');
	}

	createNote(hanzi, meaning, pronunciation) {
		let note = this.createDiv();
		note.classList.add('character-note');
		this.section.appendChild(note);

		let noteContent = [
			{
				element: document.createElement('p'),
				elementClass: 'character'
			},
			{
				element: document.createTextNode(meaning),
				elementClass: 'meaning'
			},
			{
				element: document.createTextNode(pronunciation),
				elementClass: 'pronunciation'
			},
			{ element: null, elementClass: 'space' }
		];
		noteContent[0].element.appendChild(
			document.createTextNode(hanzi)
		);

		for (let i = 0; i < noteContent.length; i++) {
			this.appendElement(
				note,
				noteContent[i].element,
				noteContent[i].elementClass
			);
		}
	}

	appendElement(parent, text, classToAdd) {
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
	}
}

// let section = null;
// let note = null;

// function createNode(hanzi, meaning, pronunciation) {
// 	note.classList.add('character-note');

// 	let noteContent = [
// 		{
// 			element: document.createElement('p'),
// 			elementClass: 'character'
// 		},
// 		{
// 			element: document.createTextNode(meaning),
// 			elementClass: 'meaning'
// 		},
// 		{
// 			element: document.createTextNode(pronunciation),
// 			elementClass: 'pronunciation'
// 		},
// 		{ element: null, elementClass: 'space' }
// 	];
// 	noteContent[0].element.appendChild(
// 		document.createTextNode(hanzi)
// 	);

// 	for (let i = 0; i < noteContent.length; i++) {
// 		appendElement(
// 			note,
// 			noteContent[i].element,
// 			noteContent[i].elementClass
// 		);
// 	}
// }

// function appendElement(parent, text, classToAdd) {
// 	let div = document.createElement('div');
// 	div.classList.add('square');
// 	let line = document.createElement('div');
// 	line.classList.add('line');
// 	div.appendChild(line);
// 	if (text) {
// 		div.appendChild(text);
// 	}
// 	if (classToAdd) {
// 		div.classList.add(classToAdd);
// 	}
// 	parent.appendChild(div);
// 	// section.appendChild(parent);
// }

// function createTittle() {
// 	note = document.createElement('div');

// 	let divTittle = document.createElement('div');
// 	divTittle.classList.add('square', 'tittle');

// 	let div = document.createElement('div');
// 	div.id = 'left';
// 	div.classList.add('square');
// 	let div2 = document.createElement('div');
// 	div2.id = 'right';
// 	div2.classList.add('square');

// 	let line = document.createElement('div');
// 	line.classList.add('line');
// 	let line2 = document.createElement('div');
// 	line2.classList.add('line');

// 	let tittle = document.createElement('h1');

// 	div.appendChild(line);
// 	div2.appendChild(line2);
// 	tittle.appendChild(
// 		document.createTextNode(section.id.toUpperCase())
// 	);

// 	divTittle.appendChild(div);
// 	divTittle.appendChild(tittle);
// 	divTittle.appendChild(div2);

// 	// appendElement(divTittle, line, null);

// 	note.appendChild(divTittle);
// 	section.appendChild(note);
// }
