import { UUID } from "crypto";
import User from "@User";

const users: Record<UUID, User> = {};
export const usersCount = {
	value: 0,
	increment() {
		++this.value;
	},
	decrement() {
		--this.value;
	},
};

export function addUser(user: User) {
	users[user.id] = user;
	usersCount.increment();
}
export function removeUser(user: User) {
	delete users[user.id];
	usersCount.decrement();
}

export default users;
