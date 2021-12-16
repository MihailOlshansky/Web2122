const WEEK = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
const DEFAULT_COLUMNS = 5;
const DEFAULT_ROWS = 5;
const MAX_COLUMNS = 6;
const MAX_ROWS = 11;
const SCHEDULE = 'schedule';
const ROWS = 'rows';
const COLUMNS = 'columns';
const ADD = 'add_';
const DELETE = 'del_';
const DAY = 'day';
const ROW = 'row';

(function() {
    restore()
    rebuild()
    fillFields()
})()


function restore() {
    var rows = localStorage.getItem(ROWS)
    var columns = localStorage.getItem(COLUMNS)

    if (rows == null) {
        localStorage.setItem(ROWS, DEFAULT_ROWS)
        rows = DEFAULT_ROWS
    }

    if (columns == null) {
        localStorage.setItem(COLUMNS, DEFAULT_COLUMNS)
        columns = DEFAULT_COLUMNS;
    }

    if (localStorage.getItem(SCHEDULE) == null) {
        createSchedule()
    }

    document.getElementById(ROWS).value = rows
    document.getElementById(COLUMNS).value = columns
}


function createSchedule() {
    var schedule = []
    for (var i = 0; i < MAX_ROWS; i++) {
        schedule.push([])
        for (var j = 0; j < MAX_COLUMNS; j++) {
            schedule[i].push('')
        }
    }

    localStorage.setItem(SCHEDULE, JSON.stringify(schedule))
}


function rebuild() {
	var rows = document.getElementById(ROWS).value
	var columns = document.getElementById(COLUMNS).value
	
	localStorage.setItem(ROWS, rows)
	localStorage.setItem(COLUMNS, columns)

    var schedule = document.getElementById(SCHEDULE)
    if (schedule.firstChild == null) {
        createEmptySchedule(rows, columns)
    } else {
        reduceSchedule(rows, columns)
        enlargeSchedule( rows, columns)
    }

    addSelections(rows, columns, ADD)
    addSelections(rows, columns, DELETE)
}


function createEmptySchedule(rows, columns) {
    var schedule = document.getElementById(SCHEDULE)
    schedule.innerHTML = ''
    var table = document.createElement('table')

	var titles = document.createElement("tr")
	for(var i = 0; i < columns; i++) {
		var th = document.createElement("th")
		th.appendChild(document.createTextNode(WEEK[i]))
		titles.appendChild(th)
	}
	table.appendChild(titles)
	
	for(i = 0; i < rows; i++) {
		var tr = document.createElement("tr")
		for(var j = 0; j < columns; j++) {
			tr.appendChild(document.createElement("td"))
		}
		table.appendChild(tr)
	}
	
	schedule.appendChild(table)
}

function enlargeSchedule(rows, columns) {
    var schedule = document.getElementById(SCHEDULE)
    var table = schedule.firstChild
	var curRows = table.childNodes.length - 1
	var curColumns = table.firstChild.childNodes.length
	
	for(; curRows < rows; curRows++) {
		var tr = document.createElement("tr")
		for(var j = 0; j < curColumns; j++) {
			tr.appendChild(document.createElement("td"))
		}
		table.appendChild(tr)
	}

	let titles = table.firstChild
	for(var i = curColumns; i < columns; i++) {
		let th = document.createElement("th")
		th.appendChild(document.createTextNode(week[i]))
		titles.appendChild(th)
		for(j = 1; j <= rows; j++) {
			table.childNodes[j].appendChild(document.createElement("td"))
		}
	}
}

function reduceSchedule(rows, columns) {
    var schedule = document.getElementById(SCHEDULE)
    var table = schedule.firstChild
	var curRows = table.childNodes.length - 1
	var curColumns = table.firstChild.childNodes.length
	
	for(; curRows > rows; curRows--) {
		table.removeChild(table.lastChild)
	}

	for(; curColumns > columns; curColumns--) {
		for(var i = 0; i <= rows; i++) {
			table.childNodes[i].removeChild(table.childNodes[i].lastChild)
		}
	}

}

function addSelections(rows, columns, mode) {
    let day_select = document.getElementById(mode + DAY)
	let pos_select = document.getElementById(mode + ROW)
	day_select.innerHTML = ''
	pos_select.innerHTML = ''
	for(var i = 0; i < columns; i++) {
		let opt = document.createElement('option')
		opt.appendChild(document.createTextNode(WEEK[i]))
		day_select.appendChild(opt)
	}
	
	for(var i = 0; i < rows; i++) {
		let opt = document.createElement('option')
		opt.appendChild(document.createTextNode(i + 1))
		pos_select.appendChild(opt)
	}

}


function fillFields() {
    var rows = document.getElementById(ROWS).value
    var columns = document.getElementById(COLUMNS).value
    var schedule = JSON.parse(localStorage.getItem(SCHEDULE))

    var table = document.getElementById(SCHEDULE).firstChild

    for (var i = 0; i < rows + 1; i++) {
        console.log(table.childNodes[i])
        for (var j = 0; j < columns; j++) {
            table.childNodes[i].childNodes[j].appendChild(document.createTextNode(schedule[i][j]))
        }
    }
}


function setNewValue (mode) {
    var table = document.getElementById(SCHEDULE).firstChild

    var column = WEEK.indexOf(document.getElementById(mode + DAY).value)
    var row = document.getElementById(mode + ROW).value

    var item = table.childNodes[row].childNodes[column]
    item.innerHTML = ''
    var new_item = ''
    if (mode == ADD) {
        var new_item_obj = document.getElementById('item')
        new_item = new_item_obj.value
        item.appendChild(document.createTextNode(new_item))
        new_item_obj.value = ''        
    }

    var schedule =JSON.parse(localStorage.getItem(SCHEDULE))
    schedule[row][column] = new_item
    localStorage.setItem(SCHEDULE, JSON.stringify(schedule))
}


function addItem() {
    setNewValue(ADD)
}


function deleteItem() {
    setNewValue(DELETE)
}


function clearSchedule() {
	var rows = document.getElementById(ROWS).value
	var columns = document.getElementById(COLUMNS).value
	
	localStorage.setItem('rows', rows)
	localStorage.setItem('columns', columns)
	
	createEmptySchedule(rows, columns)
	createSchedule()
}