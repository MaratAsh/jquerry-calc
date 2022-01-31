const calc__exp = $(".calc-expression")[0];
const calc_board_res = $("#calc-ex")[0];
const calc__res = $(".calc-expression-result")[0];

const OPERATION_ADD = 1;
const OPERATION_SUB = 2;
const OPERATION_MUL = 3;
const OPERATION_DIV = 4;

const Operation = {
	SubExpression: 'SubExpression',
	Sqrt: 'Sqrt',
	Power: 'Power',
};

const ElementType = {
	Operator: "Operator",
	Operand: "Operand",
	Operation: "Operation",
	Unknown: "Unknown",
	Operation: "Operation",
	OperationStart: "OperationStart",
	OperationBody: "OperationBody",
	OperationEnd: "OperationEnd",
	OperationPowerValue: "PowerValue",
	OperationPowerExpression: "PowerExpression",
};

var calculator_userspace = {
	sqrt: function (number)
	{
		return number ** 0.5;
	},
	pow: function (number, power)
	{
		let i;
		let result;
		
		i = 0;
		result = 1;
		while (i < power)
		{
			result *= number;
			++i;
		}
		return result;
	}
};

function get_element_type(elem)
{
	if (elem.classList.contains("calc-expression-operand"))
	{
		return (ElementType.Operand);
	}
	else if (elem.classList.contains("calc-expression-operator"))
	{
		return (ElementType.Operator);
	}
	else if (elem.classList.contains("calc-expression-operation"))
	{
		return (ElementType.Operation);
	}
	else if (elem.classList.contains("calc-expression-operation"))
	{
		return (ElementType.Operation);
	}
	else if (elem.classList.contains("calc-expression-operation"))
	{
		return (ElementType.Operation);
	}
	return (ElementType.Unknown);
}

function get_format_expression(elem)
{
	let string_expression = "";
	let elem_type;

	elem_type = get_element_type(elem);
	if (elem_type === ElementType.Operand ||
		elem_type === ElementType.Operator)
		return (elem.innerText)
	else if (elem_type === ElementType.Operation)
	{
		if (elem.value == Operation.Sqrt)
		{
			string_expression += "(" + get_format_expression(elem.childNodes[1]) + ")**(0.5)";
		}
		else if (elem.value == Operation.Power)
		{
			string_expression += "(" + get_format_expression(e.childNodes[1]) + ")**(8)";
		}
		else
			console.log("Unknown value of operation: " + e.value);
	}

	for (let i = 0; i < elem.childNodes.length; ++i)
	{
		let e = elem.childNodes[i];

		//console.dir(e);
		elem_type = get_element_type(e);
		if (elem_type === ElementType.Operand ||
			elem_type === ElementType.Operator)
			string_expression += e.innerText;
		else if (elem_type === ElementType.Operation)
		{
			if (e.value == Operation.Sqrt)
			{
				string_expression += "(" + get_format_expression(e.childNodes[1]) + ")**(0.5)";
			}
			else if (e.value == Operation.Power)
			{
				string_expression += "(" + get_format_expression(e.childNodes[1]) + ")**(8)";
			}
			else
				console.log("Unknown value of operation: " + e.value);
		}
	}
	return string_expression;
}


function preprocess_command()
{
	if (calc__exp.lastElementChild)
	{
		let i = calc__exp.lastElementChild.innerHTML.length - 1;
		while (calc__exp.lastElementChild.innerHTML[i] == " ")
		{
			--i;
		}
		calc__exp.lastElementChild.innerHTML = calc__exp.lastElementChild.innerHTML.slice(0, i + 1);
	}
	else if (calc__exp.innerText == "Enter expression...")
	{
		calc__exp.innerText = "";
	}
	calc_board_res.style.visibility = "hidden";
}

function process_eq()
{
	let expression = get_format_expression(calc__exp);
	
	if (validate_expression(expression))
	{
		let result = "" + custom_eval(expression);
		calc__res.innerHTML = result;
		let h = $(".panel-history").get(0);
		let elem = $('<div class="history-element">\
				<span class="history-expression" onclick="expression_clicked(this);">' + calc__exp.innerHTML + '</span>\
				<span class="history-answer">' + result + '</span>\
			</div>');
		if (h.children.length > 0)
			h.insertBefore(elem.get(0), h.firstChild)
		else
			h.innerHTML = '<div class="history-element">\
				<span class="history-expression" onclick="expression_clicked(this);">' + calc__exp.innerHTML + '</span>\
				<span class="history-answer">' + result + '</span>\
			</div>';
		calc__res.style.visibility = "visible";
	}
	else
	{
		alert("Not valid expression!");
	}
}

function process_add()
{
	add_operator_to(calc__exp, OPERATION_ADD);
}

function process_sub()
{
	add_operator_to(calc__exp, OPERATION_SUB);
}

function process_mul()
{
	add_operator_to(calc__exp, OPERATION_MUL);
}

function process_div()
{
	add_operator_to(calc__exp, OPERATION_DIV);
}

function process_point()
{
	if (calc__exp.lastElementChild)
	{
		if (get_element_type(calc__exp.lastElementChild.classList) === ElementType.Operand)
		{
			if (calc__exp.lastElementChild.innerText.indexOf(".") == -1)
				calc__exp.lastElementChild.innerText += ".";
		}
		else if (get_element_type(calc__exp.lastElementChild.classList) === ElementType.Operator)
		{
			process_number(0);
			calc__exp.lastElementChild.innerText += ".";
		}
	}
}

function process_del_in(elem)
{
	if (get_element_type(elem) === ElementType.Operand)
	{
		if (elem.innerText.length > 1)
			elem.innerText = elem.innerText.substr(0, elem.innerText.length - 1);
		else
			elem.remove();
	}
	else if (elem.classList.contains(""))
	{

	}
}

function process_del()
{
	if (calc__exp.lastElementChild)
	{
		if (get_element_type(calc__exp.lastElementChild) === ElementType.Operator)
		{
			calc__exp.lastElementChild.remove();
		}
		else
			process_del_in(calc__exp.lastElementChild);
		if (calc__exp.childNodes.length === 0)
			process_clear();
	}
	else if (calc__exp.childNodes.length == 0)
	{

	}
}

function process_clear()
{
	if (calc__exp.classList.contains("calc-not-active"))
	{

	}
	else
	{
		calc__exp.classList.add("calc-not-active");
		calc__exp.innerHTML = "Enter expression...";
		calc_board_res.style.visibility = "hidden";
	}
}

function create_operand_elem(number)
{
	let newElem = $('<span class="calc-expression-operand">' + number + '</span>')[0];
	return (newElem);
}

function create_operation_elem(operation_type)
{
	let elem = $('<span class="calc-expression-operation">' +
					'<span class="calc-expression-operation-before"></span>' +
					'<span class="calc-expression-operation-body"></span>' +
					'<span class="calc-expression-operation-after"></span>' +
		'</span>')[0];

	elem.value = operation_type;
	elem.childNodes[1].appendChild(
		create_operand_elem("")
	);
	if (operation_type == Operation.SubExpression)
	{
		elem.childNodes[0].innerText = '(';
		elem.childNodes[2].innerText = ')';
		elem.childNodes[1].classList.add("subexp");
	}
	else if (operation_type == Operation.Sqrt)
	{
		elem.childNodes[0].innerText = '√';
		elem.childNodes[2].innerText = '`';
		elem.childNodes[1].classList.add("sqrt");
	}
	else if (operation_type == Operation.Power)
	{
		elem.childNodes[2].appendChild(
			$('<sup></sup>')[0]
		);
		elem.childNodes[1].classList.add("power");
	}
	return (elem);
}

function process_sqrt_elem(elem)
{
	let newElem = create_operation_elem(Operation.Sqrt);

	if (get_element_type(elem.lastElementChild) === ElementType.Operation)
	{
		process_sqrt_elem(elem.childNodes[1]);
	}
	else if (get_element_type(elem.lastElementChild) === ElementType.Operand)
	{
		newElem.childNodes[1].lastElementChild.innerText = elem.lastElementChild.innerText;
		elem.lastElementChild.remove();
		elem.appendChild(newElem);
	}
	else if (get_element_type(elem.lastElementChild) === ElementType.Operator)
	{
		alert('Enter operand first!');
	}
}

function process_power_elem(elem)
{
	let newElem = create_operation_elem(Operation.Power);

	if (get_element_type(elem.lastElementChild) === ElementType.Operation)
	{
		process_power_elem(elem.childNodes[1]);
	}
	else if (get_element_type(elem.lastElementChild.classList) === ElementType.Operand)
	{
		newElem.childNodes[1].lastElementChild.innerText = elem.lastElementChild.innerText;
		elem.lastElementChild.remove();
		elem.appendChild(newElem);
	}
	else if (get_element_type(elem.lastElementChild.classList) === ElementType.Operator)
	{
		alert('Enter operand first!');
	}
}

function process_sqrt()
{
	preprocess_command();

	process_sqrt_elem(calc__exp);
}

function process_power()
{
	preprocess_command();

	return alert("Not working yet!");
	process_sqrt_elem(calc__exp);
}


function process_subexp_start()
{
	preprocess_command();

	return alert("Not working yet!");
}

function process_subexp_end()
{
	preprocess_command();

	return alert("Not working yet!");
}
function is_last_operation(string)
{
	let index = string.length - 1;
	while (string[index] == " ")
		--index;
	if (string[index] == "+" ||
		string[index] == "-" ||
		string[index] == "*" ||
		string[index] == "/")
		return true;
	return false;
}

function custom_eval(string)
{
	return eval(string);
}

function validate_expression(string)
{
	if (string.includes("Enter expression..."))
		return false;
	return true;
}

function add_operator_to(elem, operation_type)
{
	let operation_symbol;
	
	if (operation_type == OPERATION_ADD)
		operation_symbol = "+";
	else if (operation_type == OPERATION_SUB)
		operation_symbol = "-";
	else if (operation_type == OPERATION_MUL)
		operation_symbol = "*";
	else if (operation_type == OPERATION_DIV)
		operation_symbol = "/";
	else
		operation_symbol = ".";

	if (elem.lastElementChild && elem.lastElementChild.classList.contains('calc-expression-operator'))
	{
		elem.lastElementChild.innerText = operation_symbol;
	}
	else
	{
		let newElem = $('<span class="calc-expression-operator">' + operation_symbol + '</span>')[0];
		elem.appendChild(newElem);
	}
}

function process_number_to(elem, number)
{
	if (elem.lastElementChild)
	{
		if (elem.lastElementChild.classList.contains('calc-expression-operator'))
		{
			let newElem = create_operand_elem(number);
			elem.appendChild(newElem);
		}
		else if (elem.lastElementChild.classList.contains('calc-expression-operand'))
		{
			elem.lastElementChild.innerText += number;
		}
		else if (elem.lastElementChild.classList.contains('calc-expression-operation'))
		{
			process_number_to(elem.lastElementChild, number);
		}
	}
	else
	{
		let newElem = create_operand_elem(number);
		elem.appendChild(newElem);
	}
}

function process_number(number)
{
	preprocess_command();
	process_number_to(calc__exp, number);
}

function expression_clicked(elem)
{
	if (elem.parentElement.children.length > 1)
	{
		let result = elem.parentElement.children[1].innerHTML;
		let expression = elem.innerHTML;
		calc__exp.innerHTML = expression;
		calc__exp.parentElement.lastElementChild.innerHTML = result;
	}
}

function process_keyup(e)
{
	// console.dir(e);
	// alert("Key \"" + e.originalEvent.key + "\"");
	if (e.originalEvent.key == "Enter" || e.originalEvent.key == "=")
		process_eq();
	else if (e.originalEvent.key == "Backspace")
		process_del();
	else if (e.originalEvent.key == "Delete")
		process_clear();
	else if (e.originalEvent.key in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
		process_number(e.originalEvent.key);
	else if (e.originalEvent.key == "+")
		process_add();
	else if (e.originalEvent.key == "-")
		process_sub();
	else if (e.originalEvent.key == "*")
		process_mul();
	else if (e.originalEvent.key == "/")
		process_div();
	else
		console.log("Unknown key command: \"" + e.originalEvent.key + "\" (id)");
}

$(document).ready(function () {
	let array_of_digits = [
		'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'
		];
	for (let i = 0; i < array_of_digits.length; ++i)
	{
		$("#button-" + array_of_digits[i]).click(function () {
			process_number(i);
		});
	}

	$("#button-del").click(process_del);
	$("#button-clear").click(process_clear);
	$("#button-eq").click(process_eq);
	$("#button-add").click(process_add);
	$("#button-sub").click(process_sub);
	$("#button-mul").click(process_mul);
	$("#button-div").click(process_div);
	$("#button-point").click(process_point);
	$("#button-sqrt").click(process_sqrt);
	$("#button-power").click(process_power);
	$("#button-subexp-start").click(process_subexp_start);
	$("#button-subexp-end").click(process_subexp_end);
	$(document).keyup(process_keyup);
	process_clear();
});
