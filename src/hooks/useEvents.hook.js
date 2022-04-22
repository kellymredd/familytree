// import React from "react";
import http from "../http/http";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection(process.env.DATABASE_URL);

export default function useEvents() {
  function getEvent(id) {
    return http.get({
      url: "/crud",
    });
  }

  function getEvents() {
    return [];
  }

  function createEvent() {
    return [];
  }

  function updateEvent() {
    return [];
  }

  function saveEvent() {
    return [];
  }

  function deleteEvent() {
    return [];
  }

  return {
    getEvent,
    getEvents,
    saveEvent,
    deleteEvent,
  };
}
