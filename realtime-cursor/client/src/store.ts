import { writable } from "svelte/store";
import { nanoid } from "nanoid";

function debounce(func: () => any | void, timeout = 250) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

interface Position {
  x: number;
  y: number;
}

function connectUsers() {
  const { subscribe, update, set } = writable<Record<string, Position>>({});

  const ws = new WebSocket("ws://localhost:8080");
  ws.onopen = function () {
    console.log("Connection is open.");
  };

  ws.onmessage = function (evt) {
    set(JSON.parse(evt.data));
  };

  ws.onclose = function () {
    console.log("Connection is closed.");
  };

  return {
    subscribe,
    remove: (id: string) => {
      update((users) => {
        const newUsers = { ...users };
        delete newUsers[id];
        return newUsers;
      });
      ws.send(JSON.stringify({ t: "remove", p: id }));
    },
    changePosition: (id: string, position: Position) => {
      update((users) => {
        const newUsers = { ...users };
        newUsers[id] = position;
        ws.send(JSON.stringify({ t: "update", p: { id, position } }));
        return newUsers;
      });
    },
  };
}

export const users = connectUsers();

function newUserId() {
  const newUserId = nanoid();
  sessionStorage.setItem("userId", newUserId);
  return newUserId;
}

function getUserId() {
  let storedUserId = sessionStorage.getItem("userId");
  return storedUserId || newUserId();
}

function connectUserId() {
  const { subscribe, set } = writable<string>(getUserId());

  return {
    subscribe,
    reset: () => set(newUserId()),
  };
}

export const userId = connectUserId();
