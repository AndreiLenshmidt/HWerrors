'use strict';

class User {

	constructor(fullName, telephone, dateOfBirth) {
		this.fullName = fullName;
		this.telephone = telephone;
		this.dateOfBirth = dateOfBirth;
	}

	getFullName() {
		return this.fullName;
	}
	
	getTelephone() {
		return this.telephone;
	}

	getDateOfBirth() {
		return this.dateOfBirth;
	}
}

class ParseUserInfoError extends Error {

	constructor(message) {
   		super(message); 
    		this.name = "ParseUserInfoError";
	}
}

function inputUserInfo() {
	
	let needRepeatInput = true;
	while(needRepeatInput) {
		try {
			let UserInformation = prompt("Input your: FullName, Telephone number, Date of birth", "");
			if (UserInformation == null) {
				needRepeatInput = false;
				continue;
			}
			if (UserInformation === "") throw new ReferenceError("You entered an empty string, please try again!");
			return deleteStartEndSpaces(UserInformation);
		} catch (error) {
			needRepeatInput = confirm(`${error.name}: ${error.message} Try again?`);
		} 
	}
}

function deleteStartEndSpaces(UserInformation) {

	while(UserInformation.startsWith(" ") || UserInformation.endsWith(" ")) {
		if(UserInformation.startsWith(" ")) {
			UserInformation = UserInformation.slice(1);
			alert(UserInformation);
		}
		if(UserInformation.endsWith(" ")) {
			UserInformation = UserInformation.slice(0, -1);
			alert(UserInformation);
		}
	}

	return UserInformation;
}

function deleteEmptyItems(Array) {
	
	let arr = [];
	for(let item of Array) {
		item !== "" ? arr.push(item) : false; 	
	}

	return arr;
}

function parseUserInfo (UserInformation) {

	let phone;
	let dateOfBirth;
	let fullName = [];

	try {
		let SplitUserInfo = UserInformation.split(" ");
		SplitUserInfo = deleteEmptyItems(SplitUserInfo);
		
		alert(String(SplitUserInfo));

		let phoneError = false;
		let dateOfBirthError = false;
		
		for (let item of SplitUserInfo) {
			if(!isNaN(item) && Number.parseInt(item)) {
				 phone == null ? phone = +item : phoneError = true;
			};
			if(!isNaN(Date.parse(item))) {
				dateOfBirth == null ? dateOfBirth = new Date(item) : dateOfBirthError = true; 
			}
			if(isNaN(item) && isNaN(Date.parse(item))) {
				fullName.push(item);
			}
		}

		if (phone == null) throw new ReferenceError("Enter your phone number");
		if (dateOfBirth == null) throw new ReferenceError("Enter your dateOfBirth");
		if (phoneError) throw new ParseUserInfoError("Phone number entered twice");
		if (dateOfBirthError) throw new ParseUserInfoError("Date of birthr entered twice");
		if ((fullName.length > 3) || (fullName.length < 2)) throw new ParseUserInfoError("Incorrect fullname");
		if(SplitUserInfo.length > 5) throw new ParseUserInfoError(
			"Incorrect data entered, Enter only your: FullName, Telephone number, Date of birth"
		);
		if(SplitUserInfo.length < 4) throw new ParseUserInfoError(
			"Your date incompleted, Enter your: FullName, Telephone number, Date of birth"
		);

		return new User(fullName, phone, dateOfBirth);

	} catch (error) {
		alert(`${error.name}: ${error.message}`);
	}
}

function saveUser (map, user) {

	let key = user.getFullName().join();

	if (map.has(key)) {
		if (Array.isArray(map.get(key))) {
			map.get(key).push(JSON.stringify(user));
		} else { 
			map.set(key, [map.get(key),  JSON.stringify(user)]);
		}
	} else {
		map.set(key, JSON.stringify(user));
	}

	return true;
}

function showUser (map, key) {

	key = key.join();
	console.log(map.get(key));
}

let again = true;
let files = new Map();

while (again) {

	let UserInformation = inputUserInfo();

	if (UserInformation == null)  {
		again = false; 
		continue;
	}

	let user = parseUserInfo(UserInformation);

	try {
		saveUser (files, user);
		showUser(files, user.getFullName());
	} catch (error) {
		console.log(`${error.name}: ${error.message}`);
		continue;
	}

	again = confirm("Continue enter users?");
}














